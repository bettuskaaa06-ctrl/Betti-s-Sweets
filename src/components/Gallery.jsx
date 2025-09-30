import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Filter, Search } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Actual cake portfolio featuring Betti's work
  const cakePortfolio = [
    {
      id: 1,
      src: '/IMG_4972.jpg',
      alt: 'Mother\'s Day Celebration Cake',
      title: 'Mother\'s Day Celebration Cake',
      category: 'celebration',
      occasion: 'Mother\'s Day',
      description: 'Beautiful pink buttercream rosette cake with gold accents, pearls, and delicate decorative elements. Perfect for celebrating special mothers.',
      tags: ['mothers-day', 'pink', 'buttercream', 'gold', 'pearls', 'celebration']
    },
    {
      id: 2,
      src: '/wedding-cake-elegant.jpg',
      alt: 'Luxury Wedding Cake with Sugar Flowers',
      title: 'Luxury Wedding Cake with Sugar Flowers',
      category: 'wedding',
      occasion: 'Wedding',
      description: 'Tall, elegant multi-tier wedding cake featuring intricate sugar flowers, delicate piping, and luxurious white fondant finish.',
      tags: ['wedding', 'white', 'sugar-flowers', 'multi-tier', 'elegant', 'luxury']
    },
    {
      id: 3,
      src: '/birthday-cake-colorful.jpg',
      alt: 'Colorful Birthday Celebration Cake',
      title: 'Colorful Birthday Celebration Cake',
      category: 'birthday',
      occasion: 'Birthday',
      description: 'Vibrant rainbow sprinkle cake with colorful buttercream layers, perfect for making birthday celebrations extra special.',
      tags: ['birthday', 'colorful', 'sprinkles', 'rainbow', 'buttercream', 'celebration']
    },
    {
      id: 4,
      src: '/anniversary-cake-romantic.jpg',
      alt: 'Romantic Anniversary Cake',
      title: 'Romantic Anniversary Cake',
      category: 'anniversary',
      occasion: 'Anniversary',
      description: 'Elegant two-tier anniversary cake with romantic floral decorations, gold accents, and personalized design elements.',
      tags: ['anniversary', 'romantic', 'floral', 'gold', 'elegant', 'two-tier']
    },
    {
      id: 5,
      src: '/wedding-cake-white.jpg',
      alt: 'Classic White Wedding Cake',
      title: 'Classic White Wedding Cake',
      category: 'wedding',
      occasion: 'Wedding',
      description: 'Timeless white wedding cake with cascading sugar roses, pearl details, and classic elegant design perfect for traditional ceremonies.',
      tags: ['wedding', 'white', 'roses', 'pearls', 'classic', 'traditional']
    }
  ];

  const categories = [
    { value: 'all', label: 'All Cakes' },
    { value: 'wedding', label: 'Wedding Cakes' },
    { value: 'birthday', label: 'Birthday Cakes' },
    { value: 'anniversary', label: 'Anniversary Cakes' },
    { value: 'celebration', label: 'Special Occasions' }
  ];

  const filteredCakes = cakePortfolio.filter(cake => {
    const matchesFilter = filter === 'all' || cake.category === filter;
    const matchesSearch = searchTerm === '' || 
      cake.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cake.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction) => {
    const currentIndex = filteredCakes.findIndex(cake => cake.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredCakes.length;
    } else {
      newIndex = currentIndex === 0 ? filteredCakes.length - 1 : currentIndex - 1;
    }
    
    setSelectedImage(filteredCakes[newIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, filteredCakes]);

  return (
    <section id="gallery" className="py-14 scroll-mt-28 lg:scroll-mt-[112px]">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="bg-white border border-[#f2e8db] rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-5">
          <h2 className="text-[1.6rem] font-semibold mb-6 text-[#2b2222]">
            Our Cake Portfolio
          </h2>
          
          <p className="text-[var(--text-dark)] leading-6 mb-6">
            Browse through our collection of custom-made cakes. Each creation is unique and crafted with love for special occasions.
          </p>

          {/* Search and Filter Controls */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search cakes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-[#e9dfd2] rounded-[10px] bg-white text-base"
              />
            </div>
            
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-3 border border-[#e9dfd2] rounded-[10px] bg-white hover:bg-[#faf7f2] transition-colors"
              >
                <Filter className="w-5 h-5" />
                <span>{categories.find(cat => cat.value === filter)?.label}</span>
              </button>
              
              {isFilterOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-[#e9dfd2] rounded-[10px] shadow-lg z-10 min-w-[200px]">
                  {categories.map(category => (
                    <button
                      key={category.value}
                      onClick={() => {
                        setFilter(category.value);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-[#faf7f2] transition-colors first:rounded-t-[10px] last:rounded-b-[10px] ${
                        filter === category.value ? 'bg-[#faf7f2] font-medium' : ''
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCakes.map((cake) => (
              <div
                key={cake.id}
                className="group cursor-pointer bg-white rounded-[12px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1"
                onClick={() => openModal(cake)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={cake.src}
                    alt={cake.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[var(--text-dark)] mb-2">{cake.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm mb-2">{cake.occasion}</p>
                  <p className="text-[var(--text-dark)] text-sm leading-5">{cake.description}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredCakes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[var(--text-muted)] text-lg">No cakes found matching your criteria.</p>
              <button
                onClick={() => {
                  setFilter('all');
                  setSearchTerm('');
                }}
                className="mt-4 px-6 py-3 btn-gradient rounded-full text-[var(--text-dark)] font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation Buttons */}
            {filteredCakes.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-8 h-8 text-white" />
                </button>
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-8 h-8 text-white" />
                </button>
              </>
            )}

            {/* Image and Details */}
            <div className="bg-white rounded-[12px] overflow-hidden max-h-full flex flex-col lg:flex-row">
              <div className="lg:w-2/3">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </div>
              <div className="lg:w-1/3 p-6 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-[var(--text-dark)] mb-3">
                  {selectedImage.title}
                </h3>
                <p className="text-[var(--rose)] font-medium mb-3">{selectedImage.occasion}</p>
                <p className="text-[var(--text-dark)] leading-6 mb-4">
                  {selectedImage.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedImage.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#faf7f2] text-[var(--text-muted)] text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
