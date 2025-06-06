
import { MapPin } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-lodha-green text-white py-2 px-6">
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        <div className="flex items-center space-x-2">
          <MapPin size={14} className="text-lodha-gold" />
          <span className="text-xs font-medium">Dombivli East, Mumbai</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
