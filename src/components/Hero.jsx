import { useEffect, useRef } from 'react';

const Hero = () => {
  const glassRef = useRef(null);

  useEffect(() => {
    const glass = glassRef.current;
    if (!glass) return;

    const handlePointerMove = (e) => {
      const rect = glass.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      glass.style.setProperty('--shine-x', x.toFixed(2));
      glass.style.setProperty('--shine-y', y.toFixed(2));
    };

    glass.addEventListener('pointermove', handlePointerMove);
    return () => glass.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <>
      {/* Hidden LCP hint for hero background */}
      <img 
        src="/IMG_4972.jpg" 
        alt="" 
        width="1200" 
        height="800" 
        decoding="async" 
        fetchPriority="high" 
        aria-hidden="true" 
        className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden"
        style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
      />

      <main 
        id="home" 
        className="hero relative isolate border-b border-[#f1e7db]"
        role="main"
        style={{
          backgroundImage: `
            url('/IMG_4972.jpg'),
            radial-gradient(1000px 400px at 10% -10%, #ffe9ef 0, rgba(0,0,0,0) 60%),
            radial-gradient(800px 350px at 90% -20%, #ffe0d1 0, rgba(0,0,0,0) 60%),
            linear-gradient(180deg, #fff8f0 0, #fff 50%, #fff8f0 100%)
          `,
          backgroundSize: 'cover, cover, cover, cover',
          backgroundPosition: 'center, center, center, center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-[30px] items-center py-10 lg:py-[40px_20px_30px]">
          <div 
            ref={glassRef}
            className="glass p-[18px] mx-auto lg:mx-0 w-[calc(100vw-40px)] max-w-[720px] lg:w-auto lg:max-w-none"
          >
            <span className="inline-block bg-gradient-to-r from-[var(--blush)] to-[var(--peach)] px-3 py-1.5 rounded-full font-semibold border border-[#f3d5c4] text-sm">
              Salford • Manchester, UK
            </span>
            
            <h1 className="text-[clamp(28px,5vw,44px)] leading-[1.15] my-3 lg:my-[0.8rem] font-normal">
              Custom made artisan cakes
            </h1>
            
            <div className="script text-[clamp(22px,4.2vw,32px)] text-[var(--rose)] whitespace-nowrap overflow-hidden text-ellipsis lg:whitespace-normal lg:overflow-visible lg:text-clip lg:leading-[1.25]">
              Freshly baked for you.
            </div>
            
            <p className="text-[var(--text-muted)] text-[0.9rem] my-2.5 lg:my-[0.6rem]">
              Celebrate every occasion with a handmade cake—just a few clicks away.
            </p>
            
            <div className="flex gap-3 flex-wrap mt-[18px]">
              <a 
                className="btn-gradient inline-block border border-[#eadfce] bg-white rounded-full px-[18px] py-3 shadow-[0_10px_30px_rgba(0,0,0,0.06)] text-[var(--text-dark)] no-underline font-medium transition-all duration-200"
                href="#estimator"
              >
                Design your cake
              </a>
            </div>
          </div>
          
          <div aria-hidden="true" className="hidden lg:block"></div>
        </div>
      </main>
    </>
  );
};

export default Hero;
