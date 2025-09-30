import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState({ 0: true }); // First item open by default

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqItems = [
    {
      question: "Difference between sponge layers and cake tiers",
      answer: "Sponge layers are the individual cake sections stacked with filling inside a single cake. Tiers are separate cakes stacked on top of each other to create a taller, multilevel cake."
    },
    {
      question: "Lead time",
      answer: "Typical lead time is 5–10 days. Rush orders may be possible (fee applies if under 3 full working days)."
    },
    {
      question: "Dietary",
      answer: "All of our cakes are made with reduced sugar for a balanced flavour. Because our kitchen also works with common allergens (gluten, eggs, dairy, nuts), we can't guarantee complete absence, but we always do our best to accommodate requests."
    },
    {
      question: "Payments",
      answer: "50% deposit secures your booking; remaining 50% due on collection under the same invoice."
    },
    {
      question: "Collection only",
      answer: "Orders are strictly collection only. We currently do not offer home delivery."
    },
    {
      question: "Location",
      answer: "Salford • Manchester, UK."
    }
  ];

  return (
    <section id="faq" className="py-14 scroll-mt-28 lg:scroll-mt-[112px]">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="bg-white border border-[#f2e8db] rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-5">
          <h2 className="text-[1.6rem] font-semibold mb-6 text-[#2b2222]">
            FAQ & Policies
          </h2>
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-[#f1e7db] last:border-b-0 pb-4 last:pb-0">
                <button
                  className="w-full text-left flex items-center justify-between py-2 hover:text-[var(--rose)] transition-colors"
                  onClick={() => toggleItem(index)}
                  aria-expanded={openItems[index] || false}
                >
                  <strong className="text-[var(--text-dark)] pr-4">{item.question}</strong>
                  {openItems[index] ? (
                    <ChevronUp className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0" />
                  )}
                </button>
                
                {openItems[index] && (
                  <div className="mt-2 text-[var(--text-dark)] leading-6 animate-in fade-in duration-200">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
