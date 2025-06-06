
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/256e2ced-a1af-4dbd-a6e4-52f4691b5134.png')`
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-shadow animate-fade-in">
          LODHA VILLA PREMIUM
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-lodha-gold-light animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Redefining Luxury Living in Dombivli
        </p>
        <p className="text-lg md:text-xl mb-12 leading-relaxed animate-fade-in" style={{ animationDelay: '0.6s' }}>
          Experience the timeless legacy of Lodha Villas - where every detail reflects an elevated lifestyle.
        </p>
        <div className="animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <a 
            href="#enquire" 
            className="inline-block bg-lodha-gold hover:bg-lodha-gold-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Enquire Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
