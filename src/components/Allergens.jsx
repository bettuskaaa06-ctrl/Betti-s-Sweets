const Allergens = () => {
  return (
    <section id="allergens" className="py-14 scroll-mt-28 lg:scroll-mt-[112px]">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="bg-white border border-[#f2e8db] rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-5">
          <h2 className="text-[1.6rem] font-semibold mb-4 text-[#2b2222]">
            Allergens & Dietary Information
          </h2>
          
          <p className="text-[var(--text-dark)] leading-6 mb-2.5">
            Because we have children with allergies in our own family, we know how important this is and always do our very best to cater for special requirements. Every request is handled with care — but as a small studio, we can't guarantee that our cakes are completely free from traces of allergens.
          </p>
          
          <p className="text-[var(--text-dark)] leading-6 mb-2.5">
            If you or a loved one have specific dietary needs, please let us know when ordering and we'll do everything we can to make your cake safe and enjoyable.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Allergens;
