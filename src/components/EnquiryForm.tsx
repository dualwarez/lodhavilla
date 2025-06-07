
import { useState } from 'react';
import { Phone, Mail, User, MapPin, Calendar, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EnquiryForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    visitDate: '',
    budget: '',
    propertyType: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log('Submitting lead data for Lodha Villa Imperio:', formData);
    
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzj2K_rxb0sSpZQI41JjUnFfwO9DYf_JamfkudDEcJEO1jxy6lBItmn1gowDDBeLDQhgA/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          project: 'Lodha Villa Imperio',
          timestamp: new Date().toISOString(),
          source: 'Website Lead Form'
        })
      });

      console.log('Form submitted successfully to Google Apps Script');
      
      toast({
        title: "Thank You for Sharing Your Interest!",
        description: "Our representative will reach you soon to assist with your villa requirements.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        visitDate: '',
        budget: '',
        propertyType: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Thank You for Your Interest!",
        description: "Our representative will reach you soon. If urgent, please call us directly.",
      });
      
      // Reset form even on error since we're using no-cors
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        visitDate: '',
        budget: '',
        propertyType: '',
        message: ''
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="enquire" className="py-24 luxury-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-lodha-gold-light font-medium text-sm tracking-wider uppercase">Exclusive Opportunity</span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Reserve Your Dream Villa
          </h2>
          <p className="text-xl text-lodha-gold-light max-w-3xl mx-auto">
            Join the exclusive list of discerning buyers. Limited villas available in this prestigious development.
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 form-glow shadow-2xl">
          <div className="text-center mb-8">
            <h3 className="font-playfair text-2xl font-bold text-lodha-green mb-2">Get Exclusive Access</h3>
            <p className="text-gray-600">Fill in your details for priority booking and special offers</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <label htmlFor="name" className="block text-sm font-semibold text-lodha-green mb-3">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lodha-gold" size={20} />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-lodha-gold focus:border-lodha-gold transition-all duration-300 text-lg"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="phone" className="block text-sm font-semibold text-lodha-green mb-3">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lodha-gold" size={20} />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-lodha-gold focus:border-lodha-gold transition-all duration-300 text-lg"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-semibold text-lodha-green mb-3">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lodha-gold" size={20} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-lodha-gold focus:border-lodha-gold transition-all duration-300 text-lg"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="city" className="block text-sm font-semibold text-lodha-green mb-3">
                  Current City
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lodha-gold" size={20} />
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-lodha-gold focus:border-lodha-gold transition-all duration-300 text-lg"
                    placeholder="Mumbai"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="relative">
                <label htmlFor="propertyType" className="block text-sm font-semibold text-lodha-green mb-3">
                  Villa Type
                </label>
                <div className="relative">
                  <Home className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lodha-gold" size={20} />
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-lodha-gold focus:border-lodha-gold transition-all duration-300 text-lg appearance-none"
                  >
                    <option value="">Select Villa Type</option>
                    <option value="3bhk">3 BHK Villa</option>
                    <option value="4bhk">4 BHK Villa</option>
                    <option value="premium">Premium Villa</option>
                  </select>
                </div>
              </div>

              <div className="relative">
                <label htmlFor="budget" className="block text-sm font-semibold text-lodha-green mb-3">
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-lodha-gold focus:border-lodha-gold transition-all duration-300 text-lg"
                >
                  <option value="">Select Budget</option>
                  <option value="2-3cr">₹2-3 Crores</option>
                  <option value="3-4cr">₹3-4 Crores</option>
                  <option value="4-5cr">₹4-5 Crores</option>
                  <option value="5cr+">₹5+ Crores</option>
                </select>
              </div>

              <div className="relative">
                <label htmlFor="visitDate" className="block text-sm font-semibold text-lodha-green mb-3">
                  Preferred Visit Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lodha-gold" size={20} />
                  <input
                    type="date"
                    id="visitDate"
                    name="visitDate"
                    value={formData.visitDate}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-lodha-gold focus:border-lodha-gold transition-all duration-300 text-lg"
                  />
                </div>
              </div>
            </div>

            <div className="relative">
              <label htmlFor="message" className="block text-sm font-semibold text-lodha-green mb-3">
                Additional Requirements
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-lodha-gold focus:border-lodha-gold transition-all duration-300 resize-none text-lg"
                placeholder="Tell us about your specific requirements, preferred amenities, or any questions..."
              ></textarea>
            </div>

            <div className="text-center pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-lodha-gold hover:bg-lodha-gold-dark text-white px-16 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Book Exclusive Site Visit'}
              </button>
              <p className="text-sm text-gray-500 mt-6">
                🔒 Your information is completely secure. Our representative will contact you within 2 hours.
              </p>
              <p className="text-xs text-gray-400 mt-2">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EnquiryForm;
