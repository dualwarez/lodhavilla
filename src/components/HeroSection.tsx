
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/9a977a37-48b1-4cbb-a6c9-dd0e02512b3d.png')`
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
        <div className="mb-6">
          <div className="inline-block bg-lodha-gold/20 backdrop-blur-sm px-4 py-2 rounded-full border border-lodha-gold/30 mb-4">
            <span className="text-lodha-gold-light font-medium text-xs tracking-wider">EXCLUSIVE LAUNCH</span>
          </div>
        </div>
        
        <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-shadow animate-fade-in leading-tight">
          LODHA VILLA
          <br />
          <span className="text-lodha-gold-light">IMPERIO</span>
        </h1>
        
        <p className="text-lg md:text-2xl mb-4 text-lodha-gold-light font-light animate-fade-in tracking-wide" style={{ animationDelay: '0.3s' }}>
          Where Luxury Meets Legacy
        </p>
        
        <p className="text-base md:text-lg mb-10 leading-relaxed animate-fade-in max-w-3xl mx-auto font-light" style={{ animationDelay: '0.6s' }}>
          Experience the pinnacle of sophisticated living in Dombivli East. 
          Magnificent villas designed for those who appreciate the finer things in life.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <a 
            href="#enquire" 
            className="inline-block bg-lodha-gold hover:bg-lodha-gold-dark text-white px-8 py-3 rounded-lg font-semibold text-base transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            Book Site Visit
          </a>
          <button className="inline-block border-2 border-white text-white hover:bg-white hover:text-lodha-green px-8 py-3 rounded-lg font-semibold text-base transition-all duration-300">
            Download Brochure
          </button>
        </div>
        
        <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-lodha-gold mb-1">40+</div>
            <div className="text-xs text-gray-300">Years of Excellence</div>
          </div>
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-lodha-gold mb-1">50+</div>
            <div className="text-xs text-gray-300">Iconic Projects</div>
          </div>
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-lodha-gold mb-1">₹2.5L Cr+</div>
            <div className="text-xs text-gray-300">Sales Value</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
