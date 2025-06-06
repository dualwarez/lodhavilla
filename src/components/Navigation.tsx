
import { useState } from 'react';
import { Menu, X, Search, MessageCircle } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="font-playfair text-2xl md:text-3xl font-bold text-lodha-green">
              LODHA
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-lodha-green hover:text-lodha-gold transition-colors">
              OUR STORY
            </a>
            <a href="#amenities" className="text-lodha-green hover:text-lodha-gold transition-colors">
              OUR IMPACT
            </a>
            <a href="#location" className="text-lodha-green hover:text-lodha-gold transition-colors">
              OUR PROJECTS
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-lodha-green hover:text-lodha-gold transition-colors">
              <MessageCircle size={20} />
              <span>CHAT</span>
            </button>
            <button className="flex items-center space-x-2 text-lodha-green hover:text-lodha-gold transition-colors">
              <Search size={20} />
              <span>SEARCH</span>
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X size={24} className="text-lodha-green" />
            ) : (
              <Menu size={24} className="text-lodha-green" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              <a href="#about" className="text-lodha-green hover:text-lodha-gold transition-colors">
                OUR STORY
              </a>
              <a href="#amenities" className="text-lodha-green hover:text-lodha-gold transition-colors">
                OUR IMPACT
              </a>
              <a href="#location" className="text-lodha-green hover:text-lodha-gold transition-colors">
                OUR PROJECTS
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
