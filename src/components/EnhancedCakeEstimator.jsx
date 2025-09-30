import { useState, useEffect } from 'react';
import { Calendar, AlertTriangle, Upload, X, Eye, Palette, Layers } from 'lucide-react';

const EnhancedCakeEstimator = () => {
  const [formData, setFormData] = useState({
    tiers: [{ size: '8', layers: 4 }],
    collectionDate: '',
    rushOrder: false,
    sponge: 'vanilla',
    filling: 'buttercream',
    extras: [],
    inspirationPhotos: [],
    designNotes: ''
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [previewColors, setPreviewColors] = useState(['#f8f4f0', '#e8ddd4']);

  // Enhanced pricing structure
  const tierPrices = {
    '6': 45,
    '8': 65,
    '10': 85,
    '12': 105
  };

  const extraPrices = {
    'fresh-flowers': 18,
    'gold-accents': 15,
    'custom-topper': 20,
    'textured-buttercream': 12,
    'custom-design': 0, // Quote on request
    'chocolate-drip': 10,
    'macarons': 25,
    'fresh-fruit': 15,
    'edible-glitter': 8
  };

  const spongeOptions = [
    { value: 'vanilla', label: 'Classic Vanilla', premium: false },
    { value: 'chocolate', label: 'Rich Chocolate', premium: false },
    { value: 'lemon', label: 'Zesty Lemon', premium: false },
    { value: 'red-velvet', label: 'Red Velvet', premium: true },
    { value: 'carrot', label: 'Spiced Carrot', premium: false },
    { value: 'coffee', label: 'Coffee & Walnut', premium: true },
    { value: 'strawberry', label: 'Fresh Strawberry', premium: true }
  ];

  const fillingOptions = [
    { value: 'buttercream', label: 'Classic Buttercream', premium: false },
    { value: 'cream-cheese', label: 'Cream Cheese', premium: false },
    { value: 'chocolate-ganache', label: 'Chocolate Ganache', premium: true },
    { value: 'fruit-compote', label: 'Fruit Compote', premium: false },
    { value: 'salted-caramel', label: 'Salted Caramel', premium: true },
    { value: 'lemon-curd', label: 'Lemon Curd', premium: true }
  ];

  const colorPalettes = [
    { name: 'Classic White', colors: ['#ffffff', '#f8f4f0'] },
    { name: 'Blush Pink', colors: ['#fdf2f8', '#f9a8d4'] },
    { name: 'Sage Green', colors: ['#f0f9f0', '#86efac'] },
    { name: 'Lavender', colors: ['#f3f4f6', '#c084fc'] },
    { name: 'Champagne Gold', colors: ['#fef3c7', '#fbbf24'] },
    { name: 'Dusty Blue', colors: ['#eff6ff', '#93c5fd'] }
  ];

  const calculatePrice = () => {
    let basePrice = 0;
    
    // Calculate tier prices
    formData.tiers.forEach(tier => {
      basePrice += tierPrices[tier.size] || 0;
    });

    // Add extra costs
    formData.extras.forEach(extra => {
      basePrice += extraPrices[extra] || 0;
    });

    // Premium sponge/filling surcharge
    const selectedSponge = spongeOptions.find(s => s.value === formData.sponge);
    const selectedFilling = fillingOptions.find(f => f.value === formData.filling);
    
    if (selectedSponge?.premium) basePrice += 10;
    if (selectedFilling?.premium) basePrice += 8;

    // Rush order surcharge
    if (formData.rushOrder) {
      basePrice += Math.round(basePrice * 0.3); // 30% surcharge
    }

    setTotalPrice(basePrice);
  };

  useEffect(() => {
    calculatePrice();
  }, [formData]);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTier = () => {
    if (formData.tiers.length < 4) {
      setFormData(prev => ({
        ...prev,
        tiers: [...prev.tiers, { size: '6', layers: 3 }]
      }));
    }
  };

  const removeTier = (index) => {
    if (formData.tiers.length > 1) {
      setFormData(prev => ({
        ...prev,
        tiers: prev.tiers.filter((_, i) => i !== index)
      }));
    }
  };

  const updateTier = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      tiers: prev.tiers.map((tier, i) => 
        i === index ? { ...tier, [field]: value } : tier
      )
    }));
  };

  const toggleExtra = (extra) => {
    setFormData(prev => ({
      ...prev,
      extras: prev.extras.includes(extra)
        ? prev.extras.filter(e => e !== extra)
        : [...prev.extras, extra]
    }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newPhotos = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }));
    
    setFormData(prev => ({
      ...prev,
      inspirationPhotos: [...prev.inspirationPhotos, ...newPhotos]
    }));
  };

  const removePhoto = (photoId) => {
    setFormData(prev => ({
      ...prev,
      inspirationPhotos: prev.inspirationPhotos.filter(photo => photo.id !== photoId)
    }));
  };

  const CakePreview = () => (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-6 rounded-[12px] border">
      <h4 className="font-semibold mb-4 flex items-center gap-2">
        <Eye className="w-5 h-5" />
        Cake Preview
      </h4>
      
      {/* Color Palette Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Color Palette</label>
        <div className="grid grid-cols-3 gap-2">
          {colorPalettes.map((palette, index) => (
            <button
              key={index}
              onClick={() => setPreviewColors(palette.colors)}
              className={`p-2 rounded-lg border-2 transition-all ${
                JSON.stringify(previewColors) === JSON.stringify(palette.colors)
                  ? 'border-[var(--rose)]'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex gap-1 mb-1">
                {palette.colors.map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="text-xs text-gray-600">{palette.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Visual Cake Representation */}
      <div className="flex flex-col items-center space-y-2">
        {formData.tiers.map((tier, index) => {
          const sizeMultiplier = {
            '6': 0.6,
            '8': 0.8,
            '10': 1.0,
            '12': 1.2
          };
          
          const width = 120 * sizeMultiplier[tier.size];
          const height = 20 + (tier.layers * 8);
          
          return (
            <div
              key={index}
              className="rounded-lg shadow-md border-2 flex items-center justify-center text-sm font-medium transition-all duration-300"
              style={{
                width: `${width}px`,
                height: `${height}px`,
                background: `linear-gradient(135deg, ${previewColors[0]}, ${previewColors[1] || previewColors[0]})`,
                borderColor: previewColors[1] || previewColors[0]
              }}
            >
              {tier.size}" • {tier.layers} layers
            </div>
          );
        })}
        
        {/* Decorative elements based on extras */}
        <div className="flex flex-wrap gap-2 mt-4 text-xs">
          {formData.extras.includes('fresh-flowers') && (
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">🌸 Fresh Flowers</span>
          )}
          {formData.extras.includes('gold-accents') && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">✨ Gold Accents</span>
          )}
          {formData.extras.includes('custom-topper') && (
            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full">🎂 Custom Topper</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section id="enhanced-estimator" className="py-14 scroll-mt-28 lg:scroll-mt-[112px]">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="bg-white border border-[#f2e8db] rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-5">
          <h2 className="text-[1.6rem] font-semibold mb-6 text-[#2b2222]">
            Enhanced Cake Designer
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Configuration Panel */}
            <div className="space-y-6">
              {/* Tiers & Sizes */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Tiers & Sizes
                </h3>
                
                {formData.tiers.map((tier, index) => (
                  <div key={index} className="flex items-center gap-3 mb-3 p-3 border border-[#e9dfd2] rounded-[10px]">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">
                        Tier {index + 1} Size
                      </label>
                      <select
                        value={tier.size}
                        onChange={(e) => updateTier(index, 'size', e.target.value)}
                        className="w-full p-2 border border-[#e9dfd2] rounded-[8px] bg-white text-sm"
                      >
                        <option value="6">6" (serves 12-15)</option>
                        <option value="8">8" (serves 20-25)</option>
                        <option value="10">10" (serves 35-40)</option>
                        <option value="12">12" (serves 50-55)</option>
                      </select>
                    </div>
                    
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">Layers</label>
                      <select
                        value={tier.layers}
                        onChange={(e) => updateTier(index, 'layers', parseInt(e.target.value))}
                        className="w-full p-2 border border-[#e9dfd2] rounded-[8px] bg-white text-sm"
                      >
                        <option value={3}>3 layers</option>
                        <option value={4}>4 layers</option>
                        <option value={5}>5 layers</option>
                      </select>
                    </div>
                    
                    {formData.tiers.length > 1 && (
                      <button
                        onClick={() => removeTier(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-[8px] transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                
                {formData.tiers.length < 4 && (
                  <button
                    onClick={addTier}
                    className="w-full p-3 border-2 border-dashed border-[#e9dfd2] rounded-[10px] text-[var(--text-muted)] hover:border-[var(--rose)] hover:text-[var(--rose)] transition-colors"
                  >
                    + Add Another Tier
                  </button>
                )}
              </div>

              {/* Collection Date */}
              <div>
                <label className="block font-semibold text-[0.95rem] mb-2">
                  Collection Date
                </label>
                <input
                  type="date"
                  value={formData.collectionDate}
                  onChange={(e) => updateFormData('collectionDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border border-[#e9dfd2] rounded-[10px] bg-white text-base"
                />
                {formData.rushOrder && (
                  <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-[8px] flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-800">
                      <strong>Rush order:</strong> Less than 3 working days notice. Additional fee may apply.
                    </div>
                  </div>
                )}
              </div>

              {/* Sponge Flavour */}
              <div>
                <label className="block font-semibold text-[0.95rem] mb-2">
                  Sponge Flavour
                </label>
                <select
                  value={formData.sponge}
                  onChange={(e) => updateFormData('sponge', e.target.value)}
                  className="w-full p-3 border border-[#e9dfd2] rounded-[10px] bg-white text-base"
                >
                  {spongeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label} {option.premium ? '(+£10)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filling */}
              <div>
                <label className="block font-semibold text-[0.95rem] mb-2">
                  Filling
                </label>
                <select
                  value={formData.filling}
                  onChange={(e) => updateFormData('filling', e.target.value)}
                  className="w-full p-3 border border-[#e9dfd2] rounded-[10px] bg-white text-base"
                >
                  {fillingOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label} {option.premium ? '(+£8)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Enhanced Extras */}
              <div>
                <label className="block font-semibold text-[0.95rem] mb-3">
                  Extras (optional)
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: 'fresh-flowers', label: 'Fresh flowers', price: 18 },
                    { id: 'gold-accents', label: 'Gold/metallic accents', price: 15 },
                    { id: 'custom-topper', label: 'Custom cake topper', price: 20 },
                    { id: 'textured-buttercream', label: 'Textured buttercream', price: 12 },
                    { id: 'chocolate-drip', label: 'Chocolate drip effect', price: 10 },
                    { id: 'macarons', label: 'Macaron decoration', price: 25 },
                    { id: 'fresh-fruit', label: 'Fresh fruit decoration', price: 15 },
                    { id: 'edible-glitter', label: 'Edible glitter', price: 8 },
                    { id: 'custom-design', label: 'Custom design (quote on request)', price: 0 }
                  ].map(extra => (
                    <label key={extra.id} className="flex items-center gap-3 p-3 border border-[#e9dfd2] rounded-[8px] hover:bg-[#faf7f2] transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.extras.includes(extra.id)}
                        onChange={() => toggleExtra(extra.id)}
                        className="w-4 h-4 text-[var(--rose)] border-[#e9dfd2] rounded focus:ring-[var(--rose)]"
                      />
                      <span className="flex-1">{extra.label}</span>
                      <span className="font-medium text-[var(--rose)]">
                        {extra.price > 0 ? `+£${extra.price}` : 'Quote'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Inspiration Photos */}
              <div>
                <label className="block font-semibold text-[0.95rem] mb-2">
                  Inspiration photos (optional)
                </label>
                <div className="border-2 border-dashed border-[#e9dfd2] rounded-[10px] p-6 text-center hover:border-[var(--rose)] transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-2" />
                    <p className="text-[var(--text-muted)]">
                      Click to upload images or drag and drop
                    </p>
                  </label>
                </div>
                
                {formData.inspirationPhotos.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    {formData.inspirationPhotos.map(photo => (
                      <div key={photo.id} className="relative group">
                        <img
                          src={photo.url}
                          alt={photo.name}
                          className="w-full h-20 object-cover rounded-[8px]"
                        />
                        <button
                          onClick={() => removePhoto(photo.id)}
                          className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Design Notes */}
              <div>
                <label className="block font-semibold text-[0.95rem] mb-2">
                  Design Notes
                </label>
                <textarea
                  value={formData.designNotes}
                  onChange={(e) => updateFormData('designNotes', e.target.value)}
                  placeholder="Tell us about your vision, color preferences, theme, or any special requirements..."
                  rows={4}
                  className="w-full p-3 border border-[#e9dfd2] rounded-[10px] bg-white text-base resize-y"
                />
              </div>
            </div>

            {/* Preview and Pricing Panel */}
            <div className="space-y-6">
              {/* Toggle Preview */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center gap-2 px-4 py-2 border border-[#e9dfd2] rounded-[10px] hover:bg-[#faf7f2] transition-colors"
                >
                  <Palette className="w-5 h-5" />
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </button>
              </div>

              {/* Cake Preview */}
              {showPreview && <CakePreview />}

              {/* Pricing Summary */}
              <div className="bg-gradient-to-br from-[#faf7f2] to-[#f5f0e8] p-6 rounded-[12px] border">
                <h3 className="text-lg font-semibold mb-4">Price Summary</h3>
                
                <div className="space-y-3 mb-4">
                  {formData.tiers.map((tier, index) => (
                    <div key={index} className="flex justify-between">
                      <span>Tier {index + 1} ({tier.size}" - {tier.layers} layers)</span>
                      <span>£{tierPrices[tier.size]}</span>
                    </div>
                  ))}
                  
                  {formData.extras.map(extra => (
                    extraPrices[extra] > 0 && (
                      <div key={extra} className="flex justify-between">
                        <span>{extra.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                        <span>£{extraPrices[extra]}</span>
                      </div>
                    )
                  ))}
                  
                  {formData.rushOrder && (
                    <div className="flex justify-between text-amber-600">
                      <span>Rush order surcharge (30%)</span>
                      <span>£{Math.round((totalPrice / 1.3) * 0.3)}</span>
                    </div>
                  )}
                </div>
                
                <div className="border-t border-[#e9dfd2] pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total Price</span>
                    <span className="text-[var(--rose)]">£{totalPrice}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div>
                      <div className="font-semibold">50% Deposit</div>
                      <div className="text-[var(--rose)]">£{Math.round(totalPrice / 2)}</div>
                    </div>
                    <div>
                      <div className="font-semibold">Balance on Collection</div>
                      <div className="text-[var(--rose)]">£{totalPrice - Math.round(totalPrice / 2)}</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <button className="w-full py-3 btn-gradient rounded-full text-[var(--text-dark)] font-medium">
                    Request Deposit Link
                  </button>
                  <button className="w-full py-3 border border-[#e9dfd2] rounded-full text-[var(--text-dark)] font-medium hover:bg-[#faf7f2] transition-colors">
                    Submit Estimate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedCakeEstimator;
