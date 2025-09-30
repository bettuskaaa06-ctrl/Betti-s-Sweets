import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import CakeEstimator from './components/CakeEstimator';

import Gallery from './components/Gallery';
import RealTestimonials from './components/RealTestimonials';

import FAQ from './components/FAQ';
import Allergens from './components/Allergens';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingInstagram from './components/FloatingInstagram';
import TemporaryBanner from './components/TemporaryBanner';
import './App.css';

function App() {
  useEffect(() => {
    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Betti's Sweets",
      "image": "https://www.bettissweets.co.uk/og-hero.jpg",
      "url": "https://www.bettissweets.co.uk/",
      "telephone": "+44 7761 297615",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Salford",
        "addressRegion": "Greater Manchester",
        "addressCountry": "GB"
      },
      "servesCuisine": "Bakery",
      "areaServed": "Manchester",
      "sameAs": [
        "https://www.instagram.com/betti_sweets/",
        "https://www.facebook.com/share/15rjNJViaL/?mibextid=wwXIfr",
        "https://www.tiktok.com/@bettis.sweets"
      ]
    };

    // Create and append script tag for structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      <TemporaryBanner />
      <Header />
      <Hero />
      <About />
      <Gallery />
      <CakeEstimator />

      <RealTestimonials />

      <FAQ />
      <Allergens />
      <Contact />
      <Footer />
      <FloatingInstagram />
    </div>
  );
}

export default App;
