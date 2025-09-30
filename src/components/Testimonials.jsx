import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sample testimonials - in a real implementation, this would come from a CMS or API
  const testimonials = [
    {
      id: 1,
      name: "Sarah & James Mitchell",
      occasion: "Wedding",
      rating: 5,
      text: "Betti created the most stunning wedding cake for our special day. Not only was it absolutely beautiful with intricate sugar flowers, but it tasted incredible too. Every guest was asking where we got it from. The attention to detail was phenomenal, and Betti was so lovely to work with throughout the whole process.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
      cakeImage: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Emma Thompson",
      occasion: "Birthday",
      rating: 5,
      text: "I ordered a custom birthday cake for my daughter's 16th, and Betti exceeded all expectations. The design was exactly what we discussed, and the flavour combination of lemon and elderflower was divine. My daughter was over the moon, and it made her day extra special.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      cakeImage: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      occasion: "Anniversary",
      rating: 5,
      text: "For our 25th wedding anniversary, I wanted something really special. Betti created a beautiful two-tier cake that perfectly captured our love story. The gold accents and fresh flowers were exactly what I had envisioned. My wife was moved to tears - it was perfect.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      cakeImage: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      name: "Lisa Chen",
      occasion: "Baby Shower",
      rating: 5,
      text: "The baby shower cake was absolutely adorable! Betti managed to create something that was both elegant and cute, which is exactly what I was hoping for. The soft pastel colours and delicate decorations were perfect. All the mums at the party were so impressed.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
      cakeImage: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=200&fit=crop"
    },
    {
      id: 5,
      name: "David & Rachel Green",
      occasion: "Corporate Event",
      rating: 5,
      text: "We needed a professional-looking cake for our company's 10th anniversary celebration. Betti delivered exactly what we needed - elegant, sophisticated, and delicious. The branding was incorporated beautifully, and it was the centrepiece of our event. Highly recommended for corporate functions.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      cakeImage: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=300&h=200&fit=crop"
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
    if (!isAutoPlaying) return;

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
            What Our Customers Say
          </h2>
          
          <p className="text-[var(--text-dark)] leading-6 mb-8">
            Don't just take our word for it. Here's what our customers have to say about their experience with Betti's Sweets.
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
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
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
                          alt={`${testimonial.occasion} cake`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
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
          </div>

          {/* Dots Indicator */}
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

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-[#f1e7db]">
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--rose)] mb-2">150+</div>
              <div className="text-[var(--text-muted)]">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--rose)] mb-2">5.0</div>
              <div className="text-[var(--text-muted)]">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--rose)] mb-2">98%</div>
              <div className="text-[var(--text-muted)]">Would Recommend</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
