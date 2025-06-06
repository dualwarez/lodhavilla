
import { MapPin, Clock, Train, Car, Plane, GraduationCap, Building, ShoppingBag, Heart } from 'lucide-react';

const LocationSection = () => {
  const locations = [
    { icon: Train, name: "Dombivli Railway Station", time: "5 minutes", category: "transport" },
    { icon: Train, name: "Airoli via Tunnel Road", time: "20 minutes", category: "transport" },
    { icon: Train, name: "Mulund Station", time: "25 minutes", category: "transport" },
    { icon: Plane, name: "Navi Mumbai Airport", time: "35 minutes", category: "transport" },
    { icon: Building, name: "Jupiter Hospital", time: "10 minutes", category: "healthcare" },
    { icon: ShoppingBag, name: "Xperia Mall", time: "8 minutes", category: "shopping" },
    { icon: GraduationCap, name: "Top Schools & Colleges", time: "5-15 minutes", category: "education" },
    { icon: Heart, name: "Kalyan Dombivli Municipal Corporation", time: "10 minutes", category: "civic" }
  ];

  return (
    <section id="location" className="py-24 bg-lodha-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-lodha-gold font-medium text-sm tracking-wider uppercase">Strategic Location</span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-lodha-green mt-4 mb-6">
            Connected to Everything <br />
            <em className="text-lodha-gold">That Matters</em>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Perfectly positioned in Dombivli East for seamless connectivity to Mumbai's key destinations and lifestyle amenities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="animate-fade-in">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="font-playfair text-2xl font-semibold text-lodha-green mb-6">
                Premium Connectivity
              </h3>
              <div className="space-y-4">
                {locations.map((location, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-lodha-cream/50 rounded-xl hover:bg-lodha-cream transition-all duration-300 group">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-lodha-gold/20 rounded-lg group-hover:bg-lodha-gold/30 transition-colors">
                        <location.icon size={20} className="text-lodha-green" />
                      </div>
                      <span className="text-gray-800 font-medium">{location.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={16} className="text-lodha-gold" />
                      <span className="text-lodha-green font-semibold">{location.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button className="bg-lodha-gold hover:bg-lodha-gold-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
                View on Google Maps
              </button>
            </div>
          </div>

          <div className="animate-slide-in-right">
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-lodha-green-light to-lodha-green rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <MapPin size={64} className="text-lodha-gold mx-auto mb-6" />
                  <h3 className="font-playfair text-3xl font-bold mb-4">Dombivli East</h3>
                  <p className="text-lg opacity-90">
                    The heart of the rapidly developing eastern corridor of Mumbai Metropolitan Region
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-3/4 h-3/4 bg-lodha-gold/20 rounded-2xl -z-10"></div>
            </div>
            
            <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
              <h4 className="font-semibold text-lodha-green mb-4">Investment Highlights</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-lodha-gold rounded-full"></div>
                  <span>Rapidly appreciating real estate market</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-lodha-gold rounded-full"></div>
                  <span>Excellent social infrastructure</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-lodha-gold rounded-full"></div>
                  <span>Upcoming development projects</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
