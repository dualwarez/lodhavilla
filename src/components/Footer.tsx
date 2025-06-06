
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-lodha-green text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h3 className="font-playfair text-2xl font-bold mb-4 text-lodha-gold">
              LODHA VILLA PREMIUM
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Experience the timeless legacy of Lodha Villas in Dombivli. Where luxury meets lifestyle, creating beautiful spaces for elevated living.
            </p>
            <div className="flex space-x-4">
              <Facebook size={24} className="text-lodha-gold hover:text-white cursor-pointer transition-colors" />
              <Twitter size={24} className="text-lodha-gold hover:text-white cursor-pointer transition-colors" />
              <Instagram size={24} className="text-lodha-gold hover:text-white cursor-pointer transition-colors" />
              <Youtube size={24} className="text-lodha-gold hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lodha-gold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About Project</a></li>
              <li><a href="#location" className="text-gray-300 hover:text-white transition-colors">Location</a></li>
              <li><a href="#amenities" className="text-gray-300 hover:text-white transition-colors">Amenities</a></li>
              <li><a href="#enquire" className="text-gray-300 hover:text-white transition-colors">Enquire Now</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lodha-gold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-lodha-gold" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-lodha-gold" />
                <span className="text-gray-300">info@lodhavilla.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-lodha-gold" />
                <span className="text-gray-300">Dombivli, Mumbai</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-lodha-green-light pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2024 Lodha Group. All rights reserved.
            </p>
            <p className="text-gray-300 text-sm">
              RERA Registration: Available on website
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
