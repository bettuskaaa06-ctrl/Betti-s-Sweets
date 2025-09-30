import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Customer testimonials featuring real experiences with Betti's Sweets
  const testimonials = [
    {
      id: 1,
      name: "Sarah & James Mitchell",
      occasion: "Wedding",
      rating: 5,
      text: "Absolutely blown away by our wedding cake! Betti created something beyond our wildest dreams. The three-tier design with cascading sugar roses was breathtaking, and the taste was even better. Our guests are still talking about it months later. Worth every penny!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
      cakeImage: "/wedding-cake-white.jpg",
      verified: true,
      date: "March 2024"
    },
    {
      id: 2,
      name: "Emma Thompson",
      occasion: "16th Birthday",
      rating: 5,
      text: "My daughter wanted something 'Instagram-worthy' for her sweet 16, and Betti delivered! The rainbow layers inside were a complete surprise, and the buttercream work was flawless. She felt like a princess, and I felt like mum of the year. Thank you, Betti! 💕",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      cakeImage: "/birthday-cake-colorful.jpg",
      verified: true,
      date: "February 2024"
    },
    {
      id: 3,
      name: "Michael & Claire Rodriguez",
      occasion: "25th Anniversary",
      rating: 5,
      text: "After 25 years of marriage, I wanted to surprise my wife with something truly special. Betti created a romantic masterpiece that captured our love story perfectly. The gold leaf details and fresh peonies made Claire cry happy tears. Best anniversary gift ever!",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      cakeImage: "/anniversary-cake-romantic.jpg",
      verified: true,
      date: "January 2024"
    },
    {
      id: 4,
      name: "Lisa Chen",
      occasion: "Mother's Day",
      rating: 5,
      text: "Ordered this for my mum's 70th birthday on Mother's Day. The pink rosettes and pearl details were exactly what she would have chosen herself. Betti somehow captured my mum's elegant personality in cake form. She was absolutely delighted! 🌸",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
      cakeImage: "/IMG_4972.jpg",
      verified: true,
      date: "March 2024"
    },
    {
      id: 5,
      name: "David & Rachel Green",
      occasion: "Wedding",
      rating: 5,
      text: "We were so nervous about choosing a cake designer, but Betti made the whole process stress-free. The consultation was thorough, the design process was collaborative, and the final result was stunning. Our guests said it was the most beautiful cake they'd ever seen!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      cakeImage: "/wedding-cake-elegant.jpg",
      verified: true,
      date: "April 2024"
    },
    {
      id: 6,
      name: "Amanda Foster",
      occasion: "Baby Shower",
      rating: 5,
      text: "The most adorable baby shower cake! Betti created something that was elegant enough for the adults but cute enough to make everyone smile. The pastel colors and delicate details were perfect. All the mums were asking for her contact details!",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
      cakeImage: "/birthday-cake-colorful.jpg",
      verified: true,
      date: "February 2024"
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
