import { useEffect, useState } from 'react';
import { Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleInstagramClick = (e) => {
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

  const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
      <path d="M16 3c.3 1.8 1.4 3.2 3.4 3.7v3.1c-1.3 .1-2.6-.3-3.8-1V14a5 5 0 1 1-4-4.9V13" strokeWidth="1.4"/>
    </svg>
  );

  return (
    <footer className="border-t border-[#f1e7db] bg-white py-6 pb-12 lg:pb-12">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-5 lg:gap-5">
          {/* Brand & Legal */}
          <div>
            <div className="script text-[28px] text-[var(--rose)] mb-2">
              Betti's Sweets
            </div>
            <p className="text-[#86766a] text-[0.9rem] leading-5">
              © {currentYear} Betti's Sweets • <a href="https://www.bettissweets.co.uk/" className="hover:text-[var(--rose)] transition-colors">www.bettissweets.co.uk</a>
              <br />
              Salford • Manchester, UK • Collection only
            </p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-[1.2rem] font-semibold mb-3 text-[#2b2222]">Follow</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleInstagramClick}
                className="flex items-center gap-2 px-4 py-3 border border-[#eadfce] rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] text-[var(--text-dark)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
                <span>Instagram</span>
              </button>

              <a
                href="https://www.facebook.com/share/15rjNJViaL/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 border border-[#eadfce] rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] text-[var(--text-dark)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
                <span>Facebook</span>
              </a>

              <a
                href="https://www.tiktok.com/@bettis.sweets"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 border border-[#eadfce] rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] text-[var(--text-dark)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all duration-200"
                aria-label="TikTok"
              >
                <TikTokIcon />
                <span>TikTok</span>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[1.2rem] font-semibold mb-3 text-[#2b2222]">Contact</h3>
            <div className="text-[#86766a] text-[0.9rem] leading-5 space-y-1">
              <p>hello@bettissweets.co.uk (general via form)</p>
              <p>cakes@bettissweets.co.uk (orders via estimator)</p>
              <p>+44 7761 297615</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
