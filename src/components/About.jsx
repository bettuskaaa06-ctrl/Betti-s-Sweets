const About = () => {
  return (
    <section id="about" className="py-14 scroll-mt-28 lg:scroll-mt-[112px]">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="bg-white border border-[#f2e8db] rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-5">
          <h2 className="text-[1.6rem] font-semibold mb-4 text-[#2b2222]">
            About Us
          </h2>
          
          <p className="text-[var(--text-dark)] leading-6 mb-2.5">
            With over a decade of experience in creating custom cakes, we felt it was time to begin our own journey — and so, Betti's Sweets was born. I'm Betti, the baker behind the brand, and together with my team we run a small cake studio in Salford, Manchester.
          </p>
          
          <p className="text-[var(--text-dark)] leading-6 mb-2.5">
            Every cake is baked to order, with flavour pairings that are thoughtfully balanced and never overly sweet. Our passion is bringing your ideas to life with cakes that are as beautiful as they are delicious.
          </p>
          
          <p className="text-[var(--text-dark)] leading-6 mb-2.5">
            We also do our best to accommodate most dietary needs and allergies.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
