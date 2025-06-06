
const DevelopmentsSection = () => {
  const developments = [
    {
      image: "/api/placeholder/400/300",
      title: "Thoughtful Design",
      description: "Recognising the profound impact of design and service on well-being, we create thoughtful and purposeful living spaces."
    },
    {
      image: "/api/placeholder/400/300", 
      title: "Crafted Experiences",
      description: "Committed to surpassing expectations, our carefully crafted events and experiences ensure an enriched and empowered lifestyle."
    },
    {
      image: "/api/placeholder/400/300",
      title: "Sustainable Living",
      description: "We are creating homes and workspaces for an ever-changing tomorrow, where luxury and sustainability can co-exist in perfect harmony."
    }
  ];

  return (
    <section className="py-20 bg-lodha-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-lodha-green mb-4">
            Creating the world's <em className="text-lodha-gold">finest</em> developments
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {developments.map((dev, index) => (
            <div key={index} className="group animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                <div className="h-48 bg-gradient-to-br from-lodha-green-light to-lodha-green"></div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-semibold text-lodha-green mb-3">
                    {dev.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {dev.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DevelopmentsSection;
