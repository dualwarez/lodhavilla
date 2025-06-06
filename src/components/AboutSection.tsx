
const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-lodha-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <div className="mb-8">
              <span className="text-lodha-gold font-medium text-sm tracking-wider uppercase">About Lodha Group</span>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-lodha-green mt-4 mb-6 leading-tight">
                India's Leading Real Estate Developer
              </h2>
            </div>
            
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
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
            
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-lodha-gold mb-2">40+</div>
                <div className="text-sm text-gray-600 uppercase tracking-wide">Years of Excellence</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-lodha-gold mb-2">100K+</div>
                <div className="text-sm text-gray-600 uppercase tracking-wide">Happy Families</div>
              </div>
            </div>
          </div>
          
          <div className="animate-slide-in-right">
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-lodha-green to-lodha-green-light rounded-2xl shadow-2xl"></div>
              <div className="absolute -bottom-6 -right-6 w-3/4 h-3/4 bg-lodha-gold/20 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
