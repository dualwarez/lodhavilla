
const DevelopmentsSection = () => {
  const features = [
    {
      title: "Premium Villas",
      description: "Spacious 3 & 4 BHK villas with private gardens, designed for those who appreciate exclusivity and grandeur.",
      icon: "🏰"
    },
    {
      title: "World-Class Amenities",
      description: "Resort-style clubhouse, infinity pool, landscaped gardens, and recreational facilities for the entire family.",
      icon: "🌟"
    },
    {
      title: "Prime Location",
      description: "Strategically located in Dombivli East with excellent connectivity to Mumbai and major business hubs.",
      icon: "📍"
    },
    {
      title: "Luxury Interiors", 
      description: "Premium fittings, modular kitchens, and designer bathrooms with attention to every luxurious detail.",
      icon: "✨"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-lodha-gold font-medium text-xs tracking-wider uppercase">Project Highlights</span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-lodha-green mt-3 mb-4">
            Crafted for the <em className="text-lodha-gold">Extraordinary</em>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Every element of Lodha Villa Imperio is designed to exceed expectations and deliver an unparalleled living experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="group animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="bg-gradient-to-br from-lodha-cream to-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 h-full">
                <div className="text-3xl mb-4 text-center">{feature.icon}</div>
                <h3 className="font-playfair text-lg font-semibold text-lodha-green mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* New amenities section with uploaded images */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="relative group">
            <div 
              className="aspect-[4/3] rounded-2xl shadow-xl bg-cover bg-center transform transition-transform duration-500 group-hover:scale-105"
              style={{
                backgroundImage: `url('/lovable-uploads/e819d777-f1e2-4bb9-9f19-8b115a447e9d.png')`
              }}
            >
              <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="font-playfair text-xl font-bold mb-2">Sports & Recreation</h3>
                <p className="text-sm">Professional tennis courts and recreational facilities</p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div 
              className="aspect-[4/3] rounded-2xl shadow-xl bg-cover bg-center transform transition-transform duration-500 group-hover:scale-105"
              style={{
                backgroundImage: `url('/lovable-uploads/a63d4e30-c473-402a-a26c-16a91043a09e.png')`
              }}
            >
              <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="font-playfair text-xl font-bold mb-2">Luxury Clubhouse</h3>
                <p className="text-sm">Elegant dining and leisure spaces with premium amenities</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <button className="bg-lodha-green hover:bg-lodha-green-dark text-white px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 transform hover:scale-105 shadow-xl">
            View Floor Plans
          </button>
        </div>
      </div>
    </section>
  );
};

export default DevelopmentsSection;
