import { useState } from 'react';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample blog posts - in a real implementation, this would come from a CMS or API
  const blogPosts = [
    {
      id: 1,
      title: "The Art of Sugar Flowers: Creating Edible Masterpieces",
      excerpt: "Learn the delicate techniques behind crafting beautiful sugar flowers that look almost too good to eat. From roses to peonies, discover the secrets of edible artistry.",
      content: "Sugar flowers are one of the most elegant decorations you can add to any cake...",
      category: "techniques",
      author: "Betti",
      date: "2024-03-15",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop",
      tags: ["sugar flowers", "techniques", "decoration", "wedding cakes"]
    },
    {
      id: 2,
      title: "Seasonal Flavour Pairings: Spring Edition",
      excerpt: "Discover the perfect flavour combinations for spring celebrations. From lemon elderflower to strawberry basil, explore fresh and vibrant taste profiles.",
      content: "Spring brings a wonderful opportunity to experiment with fresh, light flavours...",
      category: "flavours",
      author: "Betti",
      date: "2024-03-10",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=400&fit=crop",
      tags: ["spring", "flavours", "seasonal", "pairings"]
    },
    {
      id: 3,
      title: "Behind the Scenes: A Day in Our Cake Studio",
      excerpt: "Take a peek behind the curtain and see what goes into creating your custom cakes. From early morning prep to the final decorative touches.",
      content: "Every day in our studio starts before dawn with the gentle hum of ovens warming up...",
      category: "behind-scenes",
      author: "Betti",
      date: "2024-03-05",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      tags: ["studio", "process", "behind-scenes", "daily life"]
    },
    {
      id: 4,
      title: "Caring for Your Custom Cake: Storage and Serving Tips",
      excerpt: "Make sure your beautiful custom cake stays fresh and looks perfect for your special day. Essential tips for storage, transport, and serving.",
      content: "Your custom cake is a work of art, and like any masterpiece, it needs proper care...",
      category: "tips",
      author: "Betti",
      date: "2024-02-28",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&h=400&fit=crop",
      tags: ["care", "storage", "tips", "serving"]
    },
    {
      id: 5,
      title: "Trending Wedding Cake Designs for 2024",
      excerpt: "Stay ahead of the curve with the latest wedding cake trends. From minimalist elegance to bold geometric patterns, discover what's popular this year.",
      content: "Wedding cake trends are constantly evolving, and 2024 brings some exciting new directions...",
      category: "trends",
      author: "Betti",
      date: "2024-02-20",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600&h=400&fit=crop",
      tags: ["wedding", "trends", "2024", "design"]
    }
  ];

  const categories = [
    { value: 'all', label: 'All Posts' },
    { value: 'techniques', label: 'Techniques' },
    { value: 'flavours', label: 'Flavours' },
    { value: 'tips', label: 'Tips & Care' },
    { value: 'trends', label: 'Trends' },
    { value: 'behind-scenes', label: 'Behind the Scenes' }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <section id="blog" className="py-14 scroll-mt-28 lg:scroll-mt-[112px]">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="bg-white border border-[#f2e8db] rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-5">
          <h2 className="text-[1.6rem] font-semibold mb-4 text-[#2b2222]">
            Baking Stories & Tips
          </h2>
          
          <p className="text-[var(--text-dark)] leading-6 mb-6">
            Discover the art and science behind our cakes. From baking techniques to design inspiration, 
            we share our passion for creating edible masterpieces.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                  selectedCategory === category.value
                    ? 'bg-[var(--rose)] text-white border-[var(--rose)]'
                    : 'bg-white text-[var(--text-dark)] border-[#e9dfd2] hover:border-[var(--rose)] hover:text-[var(--rose)]'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="group bg-white rounded-[12px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                
                <div className="p-6">
                  {/* Meta Information */}
                  <div className="flex items-center gap-4 text-[var(--text-muted)] text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title and Excerpt */}
                  <h3 className="text-xl font-semibold text-[var(--text-dark)] mb-3 group-hover:text-[var(--rose)] transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-[var(--text-dark)] leading-6 mb-4">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-[#faf7f2] text-[var(--text-muted)] text-xs rounded-full"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More Button */}
                  <button className="inline-flex items-center gap-2 text-[var(--rose)] font-medium hover:gap-3 transition-all duration-200">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[var(--text-muted)] text-lg">No posts found in this category.</p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="mt-4 px-6 py-3 btn-gradient rounded-full text-[var(--text-dark)] font-medium"
              >
                View All Posts
              </button>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="mt-12 p-6 bg-gradient-to-r from-[#faf7f2] to-[#f5f0e8] rounded-[12px] text-center">
            <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-2">
              Stay Updated
            </h3>
            <p className="text-[var(--text-muted)] mb-4">
              Get the latest baking tips, seasonal recipes, and behind-the-scenes stories delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 border border-[#e9dfd2] rounded-[10px] bg-white text-base"
              />
              <button className="px-6 py-3 btn-gradient rounded-[10px] text-[var(--text-dark)] font-medium whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
