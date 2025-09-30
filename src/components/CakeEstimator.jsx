import { useState, useEffect, useCallback } from 'react';
import { Info, Upload, Send, CreditCard } from 'lucide-react';

const CakeEstimator = () => {
  // Pricing configuration
  const sizeBase = { "6": 65, "8": 85, "10": 115, "12": 145 };
  const extraCost = { flowers: 18, gold: 15, topper: 20, textured: 12 };
  const RUSH_THRESHOLD_DAYS = 3;
  const SIZE_KEY = 'betti_pref_stack';

  // Form state
  const [formData, setFormData] = useState({
    stack: '8',
    flavour: 'Vanilla sponge',
    filling: 'Vanilla buttercream',
    extras: [],
    date: '',
    sameAll: true,
    inspoFiles: []
  });

  // UI state
  const [totals, setTotals] = useState({
    total: 0,
    deposit: 0,
    balance: 0
  });
  const [showRushWarning, setShowRushWarning] = useState(false);
  const [showCustomWarning, setShowCustomWarning] = useState(false);
  const [helpPanels, setHelpPanels] = useState({});
  const [tierSelections, setTierSelections] = useState({});

  // Helper functions
  const gbp = (n) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n);

  const parseStack = (val) => {
    if (!val || val === 'custom') return [];
    return val.split('+').filter(Boolean);
  };

  const workingDaysBetween = (start, end) => {
    const a = new Date(start);
    a.setHours(0, 0, 0, 0);
    const b = new Date(end);
    b.setHours(0, 0, 0, 0);
    if (b <= a) return 0;
    
    let days = 0;
    const d = new Date(a);
    while (d < b) {
      d.setDate(d.getDate() + 1);
      const dow = d.getDay();
      if (dow !== 0 && dow !== 6) days++;
    }
    return days;
  };

  // Calculate totals
  const calculateTotals = useCallback(() => {
    const sizes = parseStack(formData.stack);
    if (sizes.length === 0) {
      setTotals({ total: 0, deposit: 0, balance: 0 });
      return;
    }

    let baseTotal = 0;
    sizes.forEach(size => {
      baseTotal += sizeBase[size] || 0;
    });

    // Add extras
    let extrasTotal = 0;
    formData.extras.forEach(extra => {
      if (extra === 'custom') {
        extrasTotal += 25; // Custom pricing
      } else {
        extrasTotal += extraCost[extra] || 0;
      }
    });

    const total = baseTotal + extrasTotal;
    const deposit = Math.round(total * 0.5 * 100) / 100;
    const balance = total - deposit;

    setTotals({ total, deposit, balance });
  }, [formData.stack, formData.extras]);

  // Update rush warning
  const updateRushWarning = useCallback(() => {
    if (!formData.date) {
      setShowRushWarning(false);
      return;
    }

    const selected = new Date(formData.date + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const wd = workingDaysBetween(today, selected);
    setShowRushWarning(wd < RUSH_THRESHOLD_DAYS);
  }, [formData.date]);

  // Update custom warning
  const updateCustomWarning = useCallback(() => {
    const hasCustom = formData.extras.includes('custom') || 
                     formData.flavour.toLowerCase().includes('custom') ||
                     formData.filling.toLowerCase().includes('custom') ||
                     Object.values(tierSelections).some(tier => 
                       tier.flavour?.toLowerCase().includes('custom') ||
                       tier.filling?.toLowerCase().includes('custom')
                     );
    setShowCustomWarning(hasCustom);
  }, [formData.extras, formData.flavour, formData.filling, tierSelections]);

  // Effects
  useEffect(() => {
    calculateTotals();
  }, [calculateTotals]);

  useEffect(() => {
    updateRushWarning();
  }, [updateRushWarning]);

  useEffect(() => {
    updateCustomWarning();
  }, [updateCustomWarning]);

  useEffect(() => {
    // Set minimum date to today
    const today = new Date();
    const minDate = today.toISOString().split('T')[0];
    if (!formData.date || formData.date < minDate) {
      setFormData(prev => ({ ...prev, date: minDate }));
    }
  }, []);

  // Event handlers
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'stack') {
      // Save preference
      try {
        localStorage.setItem(SIZE_KEY, value);
      } catch (e) {
        // Fallback to cookie
        const days = 180;
        const d = new Date();
        d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${SIZE_KEY}=${encodeURIComponent(value)}; expires=${d.toUTCString()}; path=/; SameSite=Lax; Secure`;
      }
    }
  };

  const handleExtrasChange = (extra, checked) => {
    setFormData(prev => ({
      ...prev,
      extras: checked 
        ? [...prev.extras, extra]
        : prev.extras.filter(e => e !== extra)
    }));
  };

  const toggleHelpPanel = (panelId) => {
    setHelpPanels(prev => ({
      ...prev,
      [panelId]: !prev[panelId]
    }));
  };

  const handleFileUpload = (files) => {
    setFormData(prev => ({
      ...prev,
      inspoFiles: [...prev.inspoFiles, ...Array.from(files)]
    }));
  };

  const sizes = parseStack(formData.stack);
  const isMultiTier = sizes.length > 1;

  return (
    <section id="estimator" className="py-14 scroll-mt-28 lg:scroll-mt-[112px]">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="bg-white border border-[#f2e8db] rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-5">
          <h2 className="text-[1.6rem] font-semibold mb-4 text-[#2b2222]">
            Design Your Cake — Price Estimator
          </h2>

          <form className="space-y-6">
            {/* Tiers & Sizes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label htmlFor="stack" className="font-semibold text-[0.95rem]">
                    Tiers & sizes
                  </label>
                  <button
                    type="button"
                    className="flex items-center justify-center w-6 h-6 rounded-full border border-[#e0d6c8] bg-white text-[var(--text-muted)] text-xs font-bold"
                    onClick={() => toggleHelpPanel('stackHelp')}
                    title="Serving & tiers info"
                  >
                    <Info className="w-3 h-3" />
                  </button>
                </div>
                
                <select
                  id="stack"
                  value={formData.stack}
                  onChange={(e) => handleInputChange('stack', e.target.value)}
                  className="w-full p-3 border border-[#e9dfd2] rounded-[10px] bg-white text-base"
                  required
                >
                  {/* 1-tier */}
                  <option value="6">6" — serves ~6–10 (3 layers)</option>
                  <option value="8">8" — serves ~12–20 (4 layers)</option>
                  <option value="10">10" — serves ~22–28 (4 layers)</option>
                  <option value="12">12" — serves ~30–38 (4 layers)</option>
                  
                  {/* 2-tier */}
                  <option value="6+8">2-tier: 6"+8"</option>
                  <option value="6+10">2-tier: 6"+10"</option>
                  <option value="8+10">2-tier: 8"+10"</option>
                  <option value="8+12">2-tier: 8"+12"</option>
                  <option value="10+12">2-tier: 10"+12"</option>
                  
                  {/* 3-tier */}
                  <option value="6+8+10">3-tier: 6"+8"+10"</option>
                  <option value="6+8+12">3-tier: 6"+8"+12"</option>
                  <option value="8+10+12">3-tier: 8"+10"+12"</option>
                  
                  {/* 4-tier */}
                  <option value="6+8+10+12">4-tier: 6"+8"+10"+12"</option>
                  
                  {/* Custom */}
                  <option value="custom">Custom (please specify in notes)</option>
                </select>

                {helpPanels.stackHelp && (
                  <div className="mt-2 text-[0.9rem] text-[#7a6f66] bg-[#fff8f0] border border-[#f1e7db] rounded-[10px] p-3">
                    <p><strong>Serving sizes:</strong> Approximate portions for dessert-sized slices.</p>
                    <p><strong>Layers:</strong> Individual sponge sections within each tier.</p>
                    <p><strong>Tiers:</strong> Separate cake levels stacked on top of each other.</p>
                  </div>
                )}
              </div>

              {/* Collection Date */}
              <div>
                <label htmlFor="date" className="block font-semibold text-[0.95rem] mb-2">
                  Collection date
                </label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border border-[#e9dfd2] rounded-[10px] bg-white text-base"
                  required
                />
                
                {showRushWarning && (
                  <div className="mt-2 text-[0.95rem] bg-[#ffe9ef] border border-[#f5c9d1] text-[#7a3a46] rounded-[10px] p-3">
                    <strong>Rush order:</strong> Less than 3 working days notice.
                    <small className="block text-[#8d4a53]">
                      Additional fee may apply. We'll confirm availability.
                    </small>
                  </div>
                )}
              </div>
            </div>

            {/* Flavours & Fillings */}
            {!isMultiTier || formData.sameAll ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="flavour" className="block font-semibold text-[0.95rem] mb-2">
                    Sponge flavour
                  </label>
                  <select
                    id="flavour"
                    value={formData.flavour}
                    onChange={(e) => handleInputChange('flavour', e.target.value)}
                    className="w-full p-3 border border-[#e9dfd2] rounded-[10px] bg-white text-base"
                    required
                  >
                    <option value="Vanilla sponge">Vanilla sponge</option>
                    <option value="Chocolate sponge">Chocolate sponge</option>
                    <option value="Lemon sponge">Lemon sponge</option>
                    <option value="Red velvet">Red velvet</option>
                    <option value="Carrot cake">Carrot cake</option>
                    <option value="Custom flavour">Custom flavour</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="filling" className="block font-semibold text-[0.95rem] mb-2">
                    Filling
                  </label>
                  <select
                    id="filling"
                    value={formData.filling}
                    onChange={(e) => handleInputChange('filling', e.target.value)}
                    className="w-full p-3 border border-[#e9dfd2] rounded-[10px] bg-white text-base"
                    required
                  >
                    <option value="Vanilla buttercream">Vanilla buttercream</option>
                    <option value="Chocolate buttercream">Chocolate buttercream</option>
                    <option value="Strawberry jam & cream">Strawberry jam & cream</option>
                    <option value="Lemon curd">Lemon curd</option>
                    <option value="Salted caramel">Salted caramel</option>
                    <option value="Custom filling">Custom filling</option>
                  </select>
                </div>
              </div>
            ) : null}

            {/* Multi-tier same/different toggle */}
            {isMultiTier && (
              <div className="mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.sameAll}
                    onChange={(e) => handleInputChange('sameAll', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Same flavour & filling for all tiers</span>
                </label>
              </div>
            )}

            {/* Extras */}
            <div>
              <label className="block font-semibold text-[0.95rem] mb-2">
                Extras (optional)
              </label>
              <div className="flex flex-wrap gap-3">
                {[
                  { key: 'flowers', label: 'Fresh flowers (+£18)', value: 'flowers' },
                  { key: 'gold', label: 'Gold/metallic accents (+£15)', value: 'gold' },
                  { key: 'topper', label: 'Custom cake topper (+£20)', value: 'topper' },
                  { key: 'textured', label: 'Textured buttercream (+£12)', value: 'textured' },
                  { key: 'custom', label: 'Custom design (quote on request)', value: 'custom' }
                ].map(extra => (
                  <label key={extra.key} className="flex items-center gap-2 border border-[#e9dfd2] rounded-full px-3 py-2 bg-white cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.extras.includes(extra.value)}
                      onChange={(e) => handleExtrasChange(extra.value, e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm whitespace-nowrap">{extra.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Custom warning */}
            {showCustomWarning && (
              <div className="text-[0.95rem] bg-[#ffe9ef] border border-[#f5c9d1] text-[#7a3a46] rounded-[10px] p-3">
                <strong>Custom elements selected:</strong> Final pricing will be confirmed after design consultation.
                <small className="block text-[#8d4a53]">
                  The estimate below shows base pricing only.
                </small>
              </div>
            )}

            {/* Inspiration Upload */}
            <div>
              <label className="block font-semibold text-[0.95rem] mb-2">
                Inspiration photos (optional)
              </label>
              <div className="border-2 border-dashed border-[#e9dfd2] rounded-[10px] p-6 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-[var(--text-muted)]" />
                <p className="text-sm text-[var(--text-muted)] mb-2">
                  Upload images of cakes you like or design ideas
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                  id="inspoUpload"
                />
                <label
                  htmlFor="inspoUpload"
                  className="inline-block px-4 py-2 bg-[var(--blush)] text-[var(--text-dark)] rounded-full cursor-pointer hover:bg-[var(--peach)] transition-colors"
                >
                  Choose Files
                </label>
              </div>
              {formData.inspoFiles.length > 0 && (
                <div className="mt-2 text-sm text-[var(--text-muted)]">
                  {formData.inspoFiles.length} file(s) selected
                </div>
              )}
            </div>

            {/* Totals */}
            <div className="border-t border-[#f0e6da] pt-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <div className="border border-[#f0e6da] rounded-[12px] p-3.5 bg-[#fff8f0]">
                  <h3 className="text-[1rem] font-semibold mb-1.5 text-[#2b2222]">Total Price</h3>
                  <div className="text-xl font-bold text-[var(--rose)]">{gbp(totals.total)}</div>
                  
                  <details className="mt-2.5 text-[0.95rem]">
                    <summary className="cursor-pointer list-none text-[#6b5e5e] underline underline-offset-[3px]">
                      What's included in the base price?
                    </summary>
                    <div className="mt-2 bg-white border border-[#f1e7db] rounded-[10px] p-3 text-[#6b5e5e]">
                      <ul className="ml-4 mt-1 mb-1 p-0 text-sm">
                        <li>Standard buttercream finish (smooth or softly textured)</li>
                        <li>House pastel palette (simple colour scheme)</li>
                        <li>Standard height: 6" = 3 layers; 8"/10"/12" = 4 layers</li>
                        <li>One flavour & one filling per tier</li>
                        <li>Short inscription (optional)</li>
                        <li>Standard cake board & presentation box</li>
                        <li>Basic internal supports for tiered cakes</li>
                        <li>Design chat via messages to confirm details</li>
                      </ul>
                      <small>
                        Upgrades like fresh florals, metallic accents, custom toppers, sculpted textures, 
                        complex palettes, special structures, or intricate piping are priced as extras.
                      </small>
                    </div>
                  </details>
                </div>

                <div className="border border-[#f0e6da] rounded-[12px] p-3.5 bg-[#fff8f0]">
                  <h3 className="text-[1rem] font-semibold mb-1.5 text-[#2b2222]">50% Deposit</h3>
                  <div className="text-lg font-semibold">{gbp(totals.deposit)}</div>
                </div>

                <div className="border border-[#f0e6da] rounded-[12px] p-3.5 bg-[#fff8f0]">
                  <h3 className="text-[1rem] font-semibold mb-1.5 text-[#2b2222]">Actions</h3>
                  <div className="flex flex-wrap gap-3 pt-3.5">
                    <a
                      href="#contact"
                      className="flex items-center gap-2 px-4 py-3 border border-[#eadfce] rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] text-[var(--text-dark)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all duration-200"
                      title="Contact us for deposit payment"
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>Request deposit link</span>
                    </a>

                    <a
                      href={`mailto:bettissweets@example.com?subject=Cake%20Estimate&body=Hi, I'd like to request a quote for a custom cake.\n\nCollection Date: ${formData.date || 'Not specified'}\nCake Size: ${formData.stack || 'Not specified'}\nSponge: ${formData.flavour || 'Not specified'}\nFilling: ${formData.filling || 'Not specified'}\nExtras: ${formData.extras.length > 0 ? formData.extras.join(', ') : 'None'}\n\nEstimated Total: £${totals.total}\nDeposit (50%): £${totals.deposit}\n\nThank you!`}
                      className="flex items-center gap-2 px-4 py-3 btn-gradient rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.06)] text-[var(--text-dark)] font-medium"
                      title="Email your estimate to Betti's Sweets"
                    >
                      <Send className="w-5 h-5" />
                      <span>Email estimate</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[var(--text-muted)] text-[0.9rem] mt-4">
              A 50% deposit is required to secure the order. One invoice; balance due on collection. 
              Collection only (no delivery).
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CakeEstimator;

