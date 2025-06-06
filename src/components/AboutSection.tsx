
const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-lodha-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="mb-6">
              <span className="text-lodha-gold font-medium text-xs tracking-wider uppercase">About Lodha Group</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-lodha-green mt-3 mb-4 leading-tight">
                India's Leading Real Estate Developer
              </h2>
            </div>
            
            <div className="space-y-4 text-gray-700 text-base leading-relaxed">
              <p>
                For over four decades, Lodha Group has been synonymous with luxury, innovation, and excellence in real estate development. We have transformed skylines and redefined urban living across India.
              </p>
              
              <p>
                Our developments are more than just homes – they are architectural marvels that blend timeless design with modern amenities, creating spaces where luxury meets comfort.
              </p>
              
              <p className="text-lodha-green font-semibold">
                Now bringing our legacy of excellence to Dombivli East with Lodha Villa Imperio – where every detail reflects sophistication.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center p-4 bg-white rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-lodha-gold mb-1">40+</div>
                <div className="text-xs text-gray-600 uppercase tracking-wide">Years of Excellence</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-lodha-gold mb-1">100K+</div>
                <div className="text-xs text-gray-600 uppercase tracking-wide">Happy Families</div>
              </div>
            </div>
          </div>
          
          <div className="animate-slide-in-right">
            <div className="relative">
              <div 
                className="aspect-[4/5] rounded-2xl shadow-2xl bg-cover bg-center"
                style={{
                  backgroundImage: `url('/lovable-uploads/2e6bd672-a002-4565-959e-ecaf2e394644.png')`
                }}
              ></div>
              <div className="absolute -bottom-4 -right-4 w-3/4 h-3/4 bg-lodha-gold/20 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
