
import { MapPin, Clock, Train, Car, Plane, GraduationCap, Building, ShoppingBag } from 'lucide-react';

const LocationSection = () => {
  const locations = [
    { icon: Train, name: "Airoli via the Airoli-Katai Tunnel Road*", time: "20 minutes" },
    { icon: Train, name: "Mulund via the Airoli-Katai Tunnel Road*", time: "30 minutes" },
    { icon: Train, name: "Bullet Train Station*", time: "10 minutes" },
    { icon: Building, name: "Jupiter Hospital", time: "15 minutes" },
    { icon: ShoppingBag, name: "Xperia Mall", time: "15 minutes" },
    { icon: GraduationCap, name: "Shri Ram Universal School", time: "4 minutes" },
    { icon: Plane, name: "Navi Mumbai International Airport, via the upcoming DP road*", time: "15 minutes" }
  ];

  return (
    <section id="location" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="animate-fade-in">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-lodha-green mb-6">
              Explore the neighbourhood
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Located in a well-connected part of Palava, this development enjoys seamless access to key destinations across MMR.
            </p>
            <button className="border border-lodha-gold text-lodha-green px-6 py-3 rounded-lg hover:bg-lodha-gold hover:text-white transition-all duration-300">
              View Location
            </button>
          </div>

          <div className="animate-slide-in-right">
            <div className="space-y-4">
              {locations.map((location, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-lodha-cream/50 rounded-lg hover:bg-lodha-cream transition-colors">
                  <div className="flex items-center space-x-3">
                    <location.icon size={20} className="text-lodha-gold" />
                    <span className="text-gray-800">{location.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-gray-500" />
                    <span className="text-gray-600 font-medium">{location.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 text-lodha-gold hover:text-lodha-gold-dark font-medium underline">
              View More
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Note: All distances stated in minutes are estimated travel time on 2-wheeler during normal traffic.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
