import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const RealTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Real testimonials section - placeholder for future customer reviews
  const testimonials = [
    {
      id: 1,
      name: "Customer Review",
      occasion: "Custom Order",
      rating: 5,
      text: "We'd love to hear about your experience with Betti's Sweets! Your feedback helps us continue creating beautiful, delicious cakes for special occasions.",
      image: "/IMG_4972.jpg", // Using the actual cake image as placeholder
      cakeImage: "/IMG_4972.jpg"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating 
            ? 'fill-[#fbbf24] text-[#fbbf24]' 
            : 'text-[#e5e7eb]'
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-14 scroll-mt-28 lg:scroll-mt-[112px]">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="bg-white border border-[#f2e8db] rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-5">
          <h2 className="text-[1.6rem] font-semibold mb-4 text-[#2b2222]">
            Customer Reviews
          </h2>
          
          <p className="text-[var(--text-dark)] leading-6 mb-8">
            We're building our collection of customer reviews. If you've ordered from Betti's Sweets, 
            we'd love to hear about your experience!
          </p>

          {/* Main Testimonial Display */}
          <div 
            className="relative overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Testimonial Content */}
                    <div className="order-2 lg:order-1">
                      <div className="relative">
                        <Quote className="absolute -top-2 -left-2 w-8 h-8 text-[var(--rose)] opacity-20" />
                        <blockquote className="text-lg leading-relaxed text-[var(--text-dark)] mb-6 pl-6">
                          "{testimonial.text}"
                        </blockquote>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#faf7f2] to-[#f5f0e8] flex items-center justify-center">
                          <span className="text-2xl">👤</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[var(--text-dark)]">
                            {testimonial.name}
                          </h4>
                          <p className="text-[var(--text-muted)] text-sm mb-2">
                            {testimonial.occasion}
                          </p>
                          <div className="flex gap-1">
                            {renderStars(testimonial.rating)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cake Image */}
                    <div className="order-1 lg:order-2">
                      <div className="aspect-[4/3] rounded-[12px] overflow-hidden shadow-lg">
                        <img
                          src={testimonial.cakeImage}
                          alt="Betti's Sweets cake creation"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows - Only show if more than one testimonial */}
            {testimonials.length > 1 && (
              <>
                <button
                  onClick={prevTestimonial}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-6 h-6 text-[var(--text-dark)]" />
                </button>
                
                <button
                  onClick={nextTestimonial}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-6 h-6 text-[var(--text-dark)]" />
                </button>
              </>
            )}
          </div>

          {/* Dots Indicator - Only show if more than one testimonial */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-[var(--rose)] scale-125'
                      : 'bg-[#e5e7eb] hover:bg-[var(--rose)] hover:bg-opacity-50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Call to Action for Reviews */}
          <div className="mt-12 p-6 bg-gradient-to-r from-[#faf7f2] to-[#f5f0e8] rounded-[12px] text-center">
            <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-2">
              Share Your Experience
            </h3>
            <p className="text-[var(--text-muted)] mb-4">
              Have you ordered a custom cake from Betti's Sweets? We'd love to hear about your experience and showcase your special celebration!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="#contact" 
                className="px-6 py-3 btn-gradient rounded-[10px] text-[var(--text-dark)] font-medium whitespace-nowrap inline-block"
              >
                Leave a Review
              </a>
              <a 
                href="https://www.instagram.com/bettis_sweets/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 border border-[#e9dfd2] rounded-[10px] text-[var(--text-dark)] font-medium hover:bg-[#faf7f2] transition-colors whitespace-nowrap inline-block"
              >
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealTestimonials;
