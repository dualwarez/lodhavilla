
import { MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-lodha-green text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="font-playfair text-xl font-bold mb-3 text-lodha-gold">
              LODHA VILLA IMPERIO
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed text-sm">
              Experience the timeless legacy of Lodha Villas in Dombivli. Where luxury meets lifestyle, creating beautiful spaces for elevated living.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lodha-gold mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors text-sm">About Project</a></li>
              <li><a href="#location" className="text-gray-300 hover:text-white transition-colors text-sm">Location</a></li>
              <li><a href="#amenities" className="text-gray-300 hover:text-white transition-colors text-sm">Amenities</a></li>
              <li><a href="#enquire" className="text-gray-300 hover:text-white transition-colors text-sm">Enquire Now</a></li>
              <li><a href="/staff" className="text-gray-300 hover:text-white transition-colors text-sm">Staff Login</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-lodha-green-light pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-xs mb-2 md:mb-0">
              © 2024 Lodha Group. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <MapPin size={12} className="text-lodha-gold" />
              <span className="text-gray-300 text-xs">Dombivli East, Mumbai</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
