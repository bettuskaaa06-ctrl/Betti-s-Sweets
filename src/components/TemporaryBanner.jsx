import { useEffect, useRef } from 'react';

const TemporaryBanner = () => {
  const bannerRef = useRef(null);

  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    const setBannerHeight = () => {
      document.documentElement.style.setProperty(
        '--banner-h',
        `${banner.offsetHeight}px`
      );
    };

    setBannerHeight();
    window.addEventListener('resize', setBannerHeight);

    return () => {
      window.removeEventListener('resize', setBannerHeight);
    };
  }, []);

  return (
    <div ref={bannerRef} className="temp-banner">
      🚧 Our website is still baking!<br />
      In the meantime, we’d love to hear from you.<br />
      <a href="#contact" className="banner-btn">
        Contact us for orders or enquiries.
      </a>
    </div>
  );
};

export default TemporaryBanner;

