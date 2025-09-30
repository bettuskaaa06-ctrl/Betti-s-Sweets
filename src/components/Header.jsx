import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerTop, setHeaderTop] = useState(0);

  useEffect(() => {
    const updateHeaderTop = () => {
      const bannerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--banner-h')) || 0;
      setHeaderTop(bannerHeight);
    };

    updateHeaderTop();
    window.addEventListener('resize', updateHeaderTop);
    // Also listen for changes in the banner itself, as its height might change dynamically
    const observer = new MutationObserver(updateHeaderTop);
    const banner = document.querySelector('.temp-banner');
    if (banner) {
      observer.observe(banner, { attributes: true, childList: true, subtree: true });
    }

    return () => {
      window.removeEventListener('resize', updateHeaderTop);
      observer.disconnect();
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header 
      className="sticky z-50 header-glare bg-[rgba(255,248,240,0.85)] backdrop-blur-glass border-b border-[#f1e7db]"
      style={{ top: `${headerTop}px` }}
    >
      <div className="max-w-[1200px] mx-auto px-5 flex items-center justify-between h-20 lg:h-24">
        {/* Brand */}
        <div className="flex items-center gap-2.5 mr-auto">
          <div 
            className="h-[75px] lg:h-[90px] w-auto overflow-visible"
            aria-hidden="true"
          >
            <img 
              src="logo.svg" 
              alt="Betti's Sweets - Custom Made Artisan Cakes" 
              width="800" 
              height="400"
              className="h-full w-auto object-contain transform-gpu"
              style={{
                imageRendering: 'auto'
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'logo-complete-hd.png';
              }}
            />
          </div>
          <div className="hidden wordmark" aria-hidden="true">
            Betti's Sweets
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block" aria-label="Primary">
          <ul className="flex gap-[18px] list-none p-0 m-0">
            <li>
              <a 
                href="#home" 
                className="block py-2 px-2.5 rounded-[10px] hover:bg-white hover:border hover:border-[#f0e6da] transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#gallery" 
                className="block py-2 px-2.5 rounded-[10px] hover:bg-white hover:border hover:border-[#f0e6da] transition-colors"
              >
                Gallery
              </a>
            </li>
            <li>
              <a 
                href="#estimator" 
                className="block py-2 px-2.5 rounded-[10px] hover:bg-white hover:border hover:border-[#f0e6da] transition-colors"
              >
                Design Your Cake
              </a>
            </li>
            <li>
              <a 
                href="#testimonials" 
                className="block py-2 px-2.5 rounded-[10px] hover:bg-white hover:border hover:border-[#f0e6da] transition-colors"
              >
                Reviews
              </a>
            </li>

            <li>
              <a 
                href="#contact" 
                className="block py-2 px-2.5 rounded-[10px] hover:bg-white hover:border hover:border-[#f0e6da] transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden border-0 bg-transparent p-2.5 leading-none text-[var(--rose)] ml-4"
          aria-label="Open menu"
          aria-controls="primary-menu"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="w-7 h-7 stroke-[1.8]" />
          ) : (
            <Menu className="w-7 h-7 stroke-[1.8]" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-[#fff8f0] border-b border-[#f1e7db] p-3.5" aria-label="Primary">
          <ul id="primary-menu" className="grid gap-2 list-none p-0 m-0 max-h-[70vh] overflow-auto">
            <li>
              <a 
                href="#home" 
                className="block py-2 px-2.5 rounded-[10px] hover:bg-white hover:border hover:border-[#f0e6da] transition-colors"
                onClick={closeMenu}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#gallery" 
                className="block py-2 px-2.5 rounded-[10px] hover:bg-white hover:border hover:border-[#f0e6da] transition-colors"
                onClick={closeMenu}
              >
                Gallery
              </a>
            </li>
            <li>
              <a 
                href="#estimator" 
                className="block py-2 px-2.5 rounded-[10px] hover:bg-white hover:border hover:border-[#f0e6da] transition-colors"
                onClick={closeMenu}
              >
                Design Your Cake
              </a>
            </li>
            <li>
              <a 
                href="#testimonials" 
                className="block py-2 px-2.5 rounded-[10px] hover:bg-white hover:border hover:border-[#f0e6da] transition-colors"
                onClick={closeMenu}
              >
                Reviews
              </a>
            </li>

            <li>
              <a 
                href="#contact" 
                className="block py-2 px-2.5 rounded-[10px] hover:bg-white hover:border hover:border-[#f0e6da] transition-colors"
                onClick={closeMenu}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
