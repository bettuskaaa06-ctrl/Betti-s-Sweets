import { Instagram } from 'lucide-react';

const FloatingInstagram = () => {
  const handleClick = (e) => {
    e.preventDefault();
    const isMobile = /iphone|ipad|ipod|android/i.test(navigator.userAgent);
    const appURL = 'instagram://user?username=betti_sweets';
    const webURL = 'https://www.instagram.com/betti_sweets/?utm_source=qr';

    if (isMobile) {
      // Try to open the app first
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = appURL;
      document.body.appendChild(iframe);

      // Fallback to web after delay
      setTimeout(() => {
        window.open(webURL, '_blank', 'noopener');
        if (iframe.parentNode) {
          iframe.parentNode.removeChild(iframe);
        }
      }, 800);
    } else {
      // Desktop - go straight to web
      window.open(webURL, '_blank', 'noopener');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed right-[18px] bottom-[18px] lg:right-[18px] lg:bottom-[18px] z-[60] flex items-center gap-2.5 px-4 py-3.5 rounded-full border border-[#f0cdb9] btn-gradient text-[var(--text-dark)] shadow-[0_12px_28px_rgba(0,0,0,0.14)] hover:-translate-y-0.5 transition-all duration-200 floating"
      aria-label="Open Instagram profile"
      style={{
        bottom: 'max(18px, calc(18px + env(safe-area-inset-bottom)))'
      }}
    >
      <Instagram className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
      <span className="font-bold">Instagram</span>
    </button>
  );
};

export default FloatingInstagram;
