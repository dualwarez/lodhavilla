
import { useState } from 'react';
import { Menu, X, MapPin, Phone, Mail } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img 
              src="/lovable-uploads/3e44318b-c5cb-4096-b5ed-9447a8149154.png" 
              alt="Lodha Preferred Partner" 
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-lodha-green px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-lodha-green px-3 py-2 text-sm font-medium transition-colors"
              >
                Our Story
              </button>
              <button
                onClick={() => scrollToSection('developments')}
                className="text-gray-700 hover:text-lodha-green px-3 py-2 text-sm font-medium transition-colors"
              >
                Developments
              </button>
              <button
                onClick={() => scrollToSection('location')}
                className="text-gray-700 hover:text-lodha-green px-3 py-2 text-sm font-medium transition-colors"
              >
                Location
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-lodha-green text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-lodha-green-dark transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-lodha-green p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-lodha-green block px-3 py-2 text-base font-medium w-full text-left"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-lodha-green block px-3 py-2 text-base font-medium w-full text-left"
              >
                Our Story
              </button>
              <button
                onClick={() => scrollToSection('developments')}
                className="text-gray-700 hover:text-lodha-green block px-3 py-2 text-base font-medium w-full text-left"
              >
                Developments
              </button>
              <button
                onClick={() => scrollToSection('location')}
                className="text-gray-700 hover:text-lodha-green block px-3 py-2 text-base font-medium w-full text-left"
              >
                Location
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-lodha-green text-white block px-3 py-2 rounded-lg text-base font-medium w-full text-left hover:bg-lodha-green-dark transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
