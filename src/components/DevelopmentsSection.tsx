
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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-lodha-gold font-medium text-sm tracking-wider uppercase">Project Highlights</span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-lodha-green mt-4 mb-6">
            Crafted for the <em className="text-lodha-gold">Extraordinary</em>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every element of Lodha Villa Imperio is designed to exceed expectations and deliver an unparalleled living experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="bg-gradient-to-br from-lodha-cream to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 h-full">
                <div className="text-4xl mb-6 text-center">{feature.icon}</div>
                <h3 className="font-playfair text-xl font-semibold text-lodha-green mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <button className="bg-lodha-green hover:bg-lodha-green-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
            View Floor Plans
          </button>
        </div>
      </div>
    </section>
  );
};

export default DevelopmentsSection;
