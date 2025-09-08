/* Footer year */
document.getElementById('year').textContent = new Date().getFullYear();

/* Mobile menu toggle */
const burgerBtn = document.querySelector('.burger');
if (burgerBtn) {
  burgerBtn.addEventListener('click', () => {
    const menu = document.getElementById('primary-menu');
    menu.classList.toggle('open');
    burgerBtn.setAttribute('aria-expanded', menu.classList.contains('open'));
  });
}

/* Close mobile menu on nav tap */
document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', () => {
    const menu = document.getElementById('primary-menu');
    menu.classList.remove('open');
    burgerBtn && burgerBtn.setAttribute('aria-expanded', 'false');
  });
});

/* —— Estimator logic —— */

/* Pricing per tier size */
const sizeBase = { "6": 65, "8": 85, "10": 115, "12": 145 };
const extraCost= { flowers: 18, gold: 15, topper: 20, textured: 12 }; // 'custom' priced later
const SIZE_KEY = 'betti_pref_stack'; // persist chosen stack

/* Elements */
const els = {
  stack:  document.getElementById('stack'),
  flavour:document.getElementById('flavour'),
  filling:document.getElementById('filling'),
  extras: document.getElementById('extras'),
  date:   document.getElementById('date'),

  total:   document.getElementById('total'),
  deposit: document.getElementById('deposit'),
  balance: document.getElementById('balance'),
  totalField:   document.getElementById('totalField'),
  depositField: document.getElementById('depositField'),
  balanceField: document.getElementById('balanceField'),

  btnDeposit: document.getElementById('btnDeposit'),
  btnBalance: document.getElementById('btnBalance'),

  inspoUpload: document.getElementById('inspoUpload'),
  inspoPreview: document.getElementById('inspoPreview'),

  rushWarn: document.getElementById('rushWarn'),
  customWarn: document.getElementById('customWarn'),

  sameAllWrap: document.getElementById('sameAllWrap'),
  sameAll: document.getElementById('sameAll'),
  tierPerFlavour: document.getElementById('tierPerFlavour'),
  globalFlavourWrap: document.getElementById('globalFlavourWrap'),
  globalFillingWrap: document.getElementById('globalFillingWrap')
};

/* Currency */
function gbp(n){ return new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP'}).format(n); }

/* Info buttons (click + long-press) */
(function setupInfoButtons(){
  document.querySelectorAll('.info-btn').forEach(btn=>{
    const targetId = btn.getAttribute('data-target');
    const panel = targetId ? document.getElementById(targetId) : null;
    if (!panel) return;
    const toggle = (force)=>{
      const willOpen = typeof force==='boolean' ? force : !panel.classList.contains('open');
      panel.classList.toggle('open', willOpen);
      btn.setAttribute('aria-expanded', String(willOpen));
    };
    btn.addEventListener('click', ()=>toggle());
    let pressTimer;
    btn.addEventListener('touchstart', ()=>{ pressTimer=setTimeout(()=>toggle(true),500); }, {passive:true});
    ['touchend','touchcancel'].forEach(evt=> btn.addEventListener(evt, ()=>clearTimeout(pressTimer)));
  });
})();

/* Rush warning (no checkbox, just info) */
const RUSH_THRESHOLD_DAYS = 3;
function updateRushWarning(){
  const val = els.date?.value;
  if (!val){ els.rushWarn.style.display='none'; return; }
  const selected = new Date(val + 'T00:00:00');
  const today = new Date(); today.setHours(0,0,0,0);
  const wd = workingDaysBetween(today, selected);
  els.rushWarn.style.display = wd < RUSH_THRESHOLD_DAYS ? 'block' : 'none';
}

/* Parse stack like "6+8+10" → ["6","8","10"] */
function parseStack(val){
  if (!val || val==='custom') return [];
  return val.split('+').filter(Boolean);
}

/* Save / restore stack preference */
function saveStackPref(val){
  try{ localStorage.setItem(SIZE_KEY, val); }catch(_){}
  try{
    const days=180;
    const d=new Date(); d.setTime(d.getTime()+days*24*60*60*1000);
    document.cookie = SIZE_KEY+"="+encodeURIComponent(val)+"; expires="+d.toUTCString()+"; path=/; SameSite=Lax; Secure";
  }catch(_){}
}
function readStackPref(){
  try{
    const v = localStorage.getItem(SIZE_KEY);
    if (v) return v;
  }catch(_){}
  try{
    const m = document.cookie.match(new RegExp('(?:^|; )'+SIZE_KEY+'=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  }catch(_){}
  return null;
}

/* Build per-tier flavour/filling UI */
function buildTierUI(sizes){
  els.tierPerFlavour.innerHTML = '';
  if (!sizes || sizes.length <= 1) { els.tierPerFlavour.style.display='none'; return; }

  const wrap = document.createElement('div');
  wrap.className = 'tier-ff';

  sizes.forEach((sz, idx)=>{
    const box = document.createElement('div');
    box.className = 'box';
    const title = document.createElement('h4');
    title.textContent = `Tier ${idx+1} — ${sz}"`;
    const flavLabel = document.createElement('label');
    flavLabel.textContent = 'Sponge flavour';
    flavLabel.setAttribute('for', `tier_flav_${idx}`);
    const flavSel = document.createElement('select');
    flavSel.id = `tier_flav_${idx}`;
    flavSel.name = `Tier ${idx+1} Flavour (${sz}")`;
    // clone options from global flavour
    [...els.flavour.options].forEach(o=>{
      const opt = document.createElement('option');
      opt.value = o.value || o.textContent;
      opt.textContent = o.textContent;
      flavSel.appendChild(opt);
    });

    const fillLabel = document.createElement('label');
    fillLabel.textContent = 'Filling';
    fillLabel.setAttribute('for', `tier_fill_${idx}`);
    const fillSel = document.createElement('select');
    fillSel.id = `tier_fill_${idx}`;
    fillSel.name = `Tier ${idx+1} Filling (${sz}")`;
    // clone options from global filling
    [...els.filling.options].forEach(o=>{
      const opt = document.createElement('option');
      opt.value = o.value || o.textContent;
      opt.textContent = o.textContent;
      fillSel.appendChild(opt);
    });

    // mark for custom detection
    flavSel.classList.add('tier-select');
    fillSel.classList.add('tier-select');

    // structure
    const inner = document.createElement('div');
    inner.style.display='grid';
    inner.style.gridTemplateColumns='repeat(2,minmax(0,1fr))';
    inner.style.gap='10px';
    inner.appendChild(flavLabel);
    inner.appendChild(fillLabel);
    inner.appendChild(flavSel);
    inner.appendChild(fillSel);

    box.appendChild(title);
    box.appendChild(inner);
    wrap.appendChild(box);
  });

  els.tierPerFlavour.appendChild(wrap);
  els.tierPerFlavour.style.display='block';

  // recalc on per-tier changes
  els.tierPerFlavour.querySelectorAll('select').forEach(sel=>{
    sel.addEventListener('change', ()=>calc());
  });
}

/* Show/hide global vs per-tier flavour/filling controls */
function updateTierControls(){
  const stackVal = els.stack.value;
  const sizes = parseStack(stackVal);
  const multi = sizes.length > 1;

  els.sameAllWrap.style.display = multi ? '' : 'none';

  if (!multi){
    // single-tier: always use global controls
    els.globalFlavourWrap.style.display='';
    els.globalFillingWrap.style.display='';
    els.tierPerFlavour.style.display='none';
    return;
  }

  // multi-tier:
  if (els.sameAll.checked){
    // use global
    els.globalFlavourWrap.style.display='';
    els.globalFillingWrap.style.display='';
    els.tierPerFlavour.style.display='none';
  } else {
    // per-tier
    els.globalFlavourWrap.style.display='none';
    els.globalFillingWrap.style.display='none';
    buildTierUI(sizes);
  }
}

/* Local YYYY-MM-DD (no UTC rollover) */
function localISODate(d){
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const day = String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
}

/* Calculator */
function calc(){
  const stackVal = els.stack.value;
  const sizes = parseStack(stackVal);

  // base from sizes
  let total = 0;
  sizes.forEach(s => { if(sizeBase[s]) total += sizeBase[s]; });

  // extras
  const selectedExtras = [...els.extras.selectedOptions].map(o=>o.value);
  selectedExtras.forEach(key=>{
    if (extraCost[key]) total += extraCost[key];
    // 'custom' has no automatic cost
  });

  // Check for any "custom" selections (global or per-tier)
  let anyCustom = (stackVal === 'custom') ||
                  els.flavour.value === 'custom' ||
                  els.filling.value === 'custom' ||
                  selectedExtras.includes('custom');

  // include per-tier selections when visible
  const tierSelEls = document.querySelectorAll('#tierPerFlavour .tier-select');
  tierSelEls.forEach(sel=>{
    if (sel.value === 'custom') anyCustom = true;
  });

  els.customWarn.style.display = anyCustom ? 'block' : 'none';

  // Deposit / balance
  const deposit = Math.round((total*0.5)*100)/100;
  const balance = Math.max(total - deposit, 0);

  els.total.textContent   = gbp(total);
  els.deposit.textContent = gbp(deposit);
  els.balance.textContent = gbp(balance);

  els.totalField.value   = total.toFixed(2);
  els.depositField.value = deposit.toFixed(2);
  els.balanceField.value = balance.toFixed(2);

  // Quote summary for links
  const stackLabel = (stackVal==='custom')
    ? 'Custom stack'
    : (sizes.length ? sizes.map(s=>`${s}"`).join(' + ') : 'Custom stack');

  const summary = `Cake estimate: ${gbp(total)} (Deposit ${gbp(deposit)}, Balance ${gbp(balance)}) — Stack ${stackLabel}.`;

  const wa = `https://wa.me/447761297615?text=${encodeURIComponent('Hello! '+summary+' Please send me a secure payment link.')}`;
  const mail = `mailto:cakes@bettissweets.co.uk?subject=${encodeURIComponent('Deposit link request')}&body=${encodeURIComponent(summary+'\n\nNotes: ')}`;
  els.btnDeposit.href = wa;
  els.btnBalance.href = mail;
}

/* Date: prevent past + default to today (local) */
if (els.date) {
  const today = new Date(); today.setHours(0,0,0,0);
  const iso = localISODate(today);
  els.date.min = iso;
  if (!els.date.value) els.date.value = iso;  // default show today
  els.date.addEventListener('change', ()=>{ updateRushWarning(); calc(); });
}

/* Inspo upload preview */
els.inspoUpload?.addEventListener('change', ()=>{
  els.inspoPreview.innerHTML = '';
  const file = els.inspoUpload.files?.[0];
  if(file){
    const url = URL.createObjectURL(file);
    const img = new Image(); img.src = url; img.alt = 'Uploaded inspiration';
    img.style.maxHeight='100px'; img.style.borderRadius='8px'; img.style.border='1px solid #eadfce';
    els.inspoPreview.appendChild(img);
  }
});

/* Persist chosen stack */
els.stack.addEventListener('change', ()=>{
  saveStackPref(els.stack.value);
  updateTierControls();
  calc();
});

/* Same-for-all toggle */
els.sameAll.addEventListener('change', ()=>{
  updateTierControls();
  calc();
});

/* Restore stack on load (if present & valid) */
(function restorePref(){
  const saved = readStackPref();
  if (!saved) return;
  const opt = [...els.stack.options].find(o=>o.value===saved);
  if (opt){ els.stack.value = saved; }
})();

/* Recalc on flavour/filling/extras change */
['change','input'].forEach(evt=>{
  document.getElementById('estimator').addEventListener(evt, calc, true);
});

/* Init */
updateTierControls();
updateRushWarning();
calc();


/* === Estimator: disallow past dates (hard clamp) === */
(function(){
  var dateEl  = document.getElementById('date');
  var formEl  = document.getElementById('estForm');

  if (!dateEl) return;

  // Local YYYY-MM-DD (no UTC rollover)
  function localISODate(d){
    var y = d.getFullYear();
    var m = String(d.getMonth()+1).padStart(2,'0');
    var day = String(d.getDate()).padStart(2,'0');
    return y + '-' + m + '-' + day;
  }

  // Today (local) as min
  var today = new Date(); today.setHours(0,0,0,0);
  var minISO = localISODate(today);

  // Set native min + clamp current value if needed
  dateEl.setAttribute('min', minISO);
  if (!dateEl.value || dateEl.value < minISO) dateEl.value = minISO;

  // Clamp helper (prevents past via typing/paste/picker)
  function clampToMin() {
    if (dateEl.value && dateEl.value < minISO) {
      dateEl.value = minISO;
      dateEl.setCustomValidity('Please choose today or a future date.');
    } else {
      dateEl.setCustomValidity('');
    }
    // Reuse your existing recalcs if present
    if (typeof updateRushWarning === 'function') updateRushWarning();
    if (typeof calc === 'function') calc();
  }

  // Enforce on all common interactions
  dateEl.addEventListener('change', clampToMin);
  dateEl.addEventListener('input', clampToMin);
  dateEl.addEventListener('blur', clampToMin);
  dateEl.addEventListener('paste', function(){ setTimeout(clampToMin, 0); });

  // Final guard on submit
  if (formEl) {
    formEl.addEventListener('submit', function(e){
      if (dateEl.value < minISO) {
        e.preventDefault();
        clampToMin();
        dateEl.reportValidity();
      }
    });
  }

  // Initial sync (in case markup had a past default)
  clampToMin();
})();


/* === Instagram button: desktop-safe deep link + robust fallback === */
(function(){
  var IG_USERNAME = 'betti_sweets';
  var appURL = 'instagram://user?username=' + IG_USERNAME;
  var webURL = 'https://www.instagram.com/' + IG_USERNAME + '/?utm_source=qr';

  // True if iOS or Android (can handle the app scheme)
  var isMobile = /iphone|ipad|ipod|android/i.test(navigator.userAgent);

  function openIG(e){
    e.preventDefault();
    // If mobile, try app first; otherwise go straight to web.
    if (isMobile) {
      // Try to open the app…
      var opened = false;
      // Create a hidden iframe trick for older mobile browsers
      var iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = appURL;
      document.body.appendChild(iframe);

      // After a short delay, fall back to web (app not installed)
      setTimeout(function(){
        if (!opened) window.open(webURL, '_blank', 'noopener');
        // cleanup
        iframe.parentNode && iframe.parentNode.removeChild(iframe);
      }, 800);

      // Best-effort flag (most browsers won’t let us detect success reliably)
      opened = true;
    } else {
      // Desktop → just open the web profile
      window.open(webURL, '_blank', 'noopener');
    }
  }

  // Hook both the footer link and the floating FAB (if present)
  var linkSelectors = [
    'a[href^="instagram://user?username="]',
    'a.fab-ig'
  ];
  document.querySelectorAll(linkSelectors.join(',')).forEach(function(a){
    // Normalise attributes for safety
    a.setAttribute('rel','noopener');
    a.setAttribute('target','_blank');

    // Desktop: rewrite href to web
    if (!isMobile) {
      a.setAttribute('href', webURL);
    } else {
      // Mobile: keep deeplink in href
      a.setAttribute('href', appURL);
    }

    // One robust handler for both
    a.addEventListener('click', openIG, {passive:false});
  });
})();


