
import { useState } from 'react';
import { Phone, Mail, User, MapPin, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EnquiryForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    visitDate: '',
    budget: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    toast({
      title: "Enquiry Submitted Successfully!",
      description: "Our team will contact you within 24 hours.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      city: '',
      visitDate: '',
      budget: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="enquire" className="py-20 luxury-gradient">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
            Enquire Now
          </h2>
          <p className="text-lodha-gold-light text-lg">
            Take the first step towards your dream home at Lodha Villa Premium
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 form-glow">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium text-lodha-green mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lodha-gold focus:border-lodha-gold transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="phone" className="block text-sm font-medium text-lodha-green mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lodha-gold focus:border-lodha-gold transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-lodha-green mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lodha-gold focus:border-lodha-gold transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="city" className="block text-sm font-medium text-lodha-green mb-2">
                  Current City
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lodha-gold focus:border-lodha-gold transition-colors"
                    placeholder="Mumbai"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <label htmlFor="visitDate" className="block text-sm font-medium text-lodha-green mb-2">
                  Preferred Visit Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="date"
                    id="visitDate"
                    name="visitDate"
                    value={formData.visitDate}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lodha-gold focus:border-lodha-gold transition-colors"
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="budget" className="block text-sm font-medium text-lodha-green mb-2">
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lodha-gold focus:border-lodha-gold transition-colors"
                >
                  <option value="">Select Budget Range</option>
                  <option value="1-2cr">₹1-2 Crores</option>
                  <option value="2-3cr">₹2-3 Crores</option>
                  <option value="3-5cr">₹3-5 Crores</option>
                  <option value="5cr+">₹5+ Crores</option>
                </select>
              </div>
            </div>

            <div className="relative">
              <label htmlFor="message" className="block text-sm font-medium text-lodha-green mb-2">
                Additional Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lodha-gold focus:border-lodha-gold transition-colors resize-none"
                placeholder="Tell us about your requirements..."
              ></textarea>
            </div>

            <div className="text-center pt-6">
              <button
                type="submit"
                className="bg-lodha-gold hover:bg-lodha-gold-dark text-white px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Submit Enquiry
              </button>
              <p className="text-sm text-gray-500 mt-4">
                * Our team will contact you within 24 hours to schedule your site visit
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EnquiryForm;
