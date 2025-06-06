
import { Phone, Mail, MapPin } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-lodha-green text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-8 mb-4 md:mb-0">
          <div className="flex items-center space-x-2">
            <Phone size={16} className="text-lodha-gold" />
            <span className="text-sm">+91 98765 43210</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail size={16} className="text-lodha-gold" />
            <span className="text-sm">info@lodhavilla.com</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin size={16} className="text-lodha-gold" />
          <span className="text-sm">Dombivli, Mumbai</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
