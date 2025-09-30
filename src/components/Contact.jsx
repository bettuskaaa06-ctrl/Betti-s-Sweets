import { useState } from 'react';
import { Phone, MessageCircle, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission would be handled by Netlify in production
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="py-14 scroll-mt-28 lg:scroll-mt-[112px]">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="bg-white border border-[#f2e8db] rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-5">
          <h2 className="text-[1.6rem] font-semibold mb-6 text-[#2b2222]">
            Get in touch
          </h2>
          
          {/* Quick Contact Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <a
              href="tel:+447761297615"
              className="flex items-center gap-2 px-4 py-3 border border-[#eadfce] rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] text-[var(--text-dark)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all duration-200"
              aria-label="Call Betti's Sweets"
            >
              <Phone className="w-5 h-5" />
              <span className="font-bold">Call</span>
            </a>

            <a
              href="https://wa.me/447761297615"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 border border-[#eadfce] rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] text-[var(--text-dark)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all duration-200"
              aria-label="Open WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-bold">WhatsApp</span>
            </a>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block font-semibold text-[0.95rem] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  autoComplete="name"
                  className="w-full p-3 border border-[#e9dfd2] rounded-[10px] bg-white text-base"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block font-semibold text-[0.95rem] mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  autoComplete="tel"
                  placeholder="+44 7…"
                  className="w-full p-3 border border-[#e9dfd2] rounded-[10px] bg-white text-base"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block font-semibold text-[0.95rem] mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                required
                rows={4}
                className="w-full p-3 border border-[#e9dfd2] rounded-[10px] bg-white text-base resize-y"
              />
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 btn-gradient rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.06)] text-[var(--text-dark)] font-medium"
              >
                <Send className="w-5 h-5" />
                Send
              </button>
            </div>

            <p className="text-[var(--text-muted)] text-[0.9rem]">
              We typically reply within 1–2 working days.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
