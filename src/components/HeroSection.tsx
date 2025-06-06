
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/256e2ced-a1af-4dbd-a6e4-52f4691b5134.png')`
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="inline-block bg-lodha-gold/20 backdrop-blur-sm px-6 py-2 rounded-full border border-lodha-gold/30 mb-6">
            <span className="text-lodha-gold-light font-medium text-sm tracking-wider">EXCLUSIVE LAUNCH</span>
          </div>
        </div>
        
        <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-shadow animate-fade-in leading-tight">
          LODHA VILLA
          <br />
          <span className="text-lodha-gold-light">IMPERIO</span>
        </h1>
        
        <p className="text-xl md:text-3xl mb-6 text-lodha-gold-light font-light animate-fade-in tracking-wide" style={{ animationDelay: '0.3s' }}>
          Where Luxury Meets Legacy
        </p>
        
        <p className="text-lg md:text-xl mb-12 leading-relaxed animate-fade-in max-w-3xl mx-auto font-light" style={{ animationDelay: '0.6s' }}>
          Experience the pinnacle of sophisticated living in Dombivli East. 
          Magnificent villas designed for those who appreciate the finer things in life.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <a 
            href="#enquire" 
            className="inline-block bg-lodha-gold hover:bg-lodha-gold-dark text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            Book Site Visit
          </a>
          <button className="inline-block border-2 border-white text-white hover:bg-white hover:text-lodha-green px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
            Download Brochure
          </button>
        </div>
        
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-lodha-gold mb-2">40+</div>
            <div className="text-sm text-gray-300">Years of Excellence</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-lodha-gold mb-2">50+</div>
            <div className="text-sm text-gray-300">Iconic Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-lodha-gold mb-2">₹2.5L Cr+</div>
            <div className="text-sm text-gray-300">Sales Value</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
