import { useState } from 'react';
import { Phone, Mail, User, MapPin, Calendar, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SimpleCaptcha from './SimpleCaptcha';
import ThankYouPage from './ThankYouPage';

const EnquiryForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    budget: '',
    propertyType: '',
    visitDate: '',
    message: ''
  });
  
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const saveToLocalStorage = (data: any): boolean => {
    try {
      const existingData = localStorage.getItem('villaLeads');
      const leads = existingData ? JSON.parse(existingData) : [];
      leads.push(data);
      localStorage.setItem('villaLeads', JSON.stringify(leads));
      console.log('Lead data saved to localStorage successfully');
      return true;
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (!isCaptchaVerified) {
      e.preventDefault();
      toast({
        title: "Verification Required",
        description: "Please complete the captcha verification.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.name || !formData.phone) {
      e.preventDefault();
      toast({
        title: "Required Fields Missing",
        description: "Please fill in your name and phone number.",
        variant: "destructive",
      });
      return;
    }

    // Save to localStorage before form submission
    const submissionData = {
      ...formData,
      timestamp: new Date().toISOString(),
      project: 'Lodha Villa Imperio',
      source: 'Website Lead Form'
    };

    const localStorageSaved = saveToLocalStorage(submissionData);
    
    if (!localStorageSaved) {
      e.preventDefault();
      toast({
        title: "Error",
        description: "Unable to save your information. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Let the form submit naturally to FormSubmit.co
    // The form will redirect or show thank you page
    setTimeout(() => {
      setShowThankYou(true);
    }, 1000);

    toast({
      title: "Form Submitted Successfully!",
      description: "Your inquiry has been sent. We'll contact you within 2 hours.",
    });
  };

  const handleBackToHome = () => {
    setShowThankYou(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      city: '',
      budget: '',
      propertyType: '',
      visitDate: '',
      message: ''
    });
    setIsCaptchaVerified(false);
    setIsLoading(false);
  };

  if (showThankYou) {
    return <ThankYouPage onBackToHome={handleBackToHome} />;
  }

  return (
    <section id="enquire" className="py-20 bg-gradient-to-br from-lodha-cream to-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-lodha-gold font-medium text-xs tracking-wider uppercase">Exclusive Opportunity</span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-lodha-green mt-3 mb-4">
            Book Your <em className="text-lodha-gold">Private</em> Site Visit
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience luxury living firsthand. Schedule your exclusive tour of Lodha Villa Imperio and discover your dream home.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <form onSubmit={handleSubmit} action="https://formsubmit.co/el/letado" method="POST" className="space-y-6">
            {/* FormSubmit Configuration Fields */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="New Villa Inquiry - Lodha Villa Imperio" />
            <input type="hidden" name="_template" value="table" />
            
            {/* Project Information - Hidden Fields */}
            <input type="hidden" name="project" value="Lodha Villa Imperio" />
            <input type="hidden" name="source" value="Website Lead Form" />
            <input type="hidden" name="timestamp" value={new Date().toISOString()} />
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <label htmlFor="name" className="block text-sm font-semibold text-lodha-green mb-2">
                  <User size={16} className="inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-lodha-gold focus:border-lodha-gold transition-all duration-300"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="relative">
                <label htmlFor="phone" className="block text-sm font-semibold text-lodha-green mb-2">
                  <Phone size={16} className="inline mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-lodha-gold focus:border-lodha-gold transition-all duration-300"
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              <div className="relative">
                <label htmlFor="email" className="block text-sm font-semibold text-lodha-green mb-2">
                  <Mail size={16} className="inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-lodha-gold focus:border-lodha-gold transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="relative">
                <label htmlFor="city" className="block text-sm font-semibold text-lodha-green mb-2">
                  <MapPin size={16} className="inline mr-2" />
                  Current City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-lodha-gold focus:border-lodha-gold transition-all duration-300"
                  placeholder="Mumbai, Delhi, Pune..."
                />
              </div>

              <div className="relative">
                <label htmlFor="budget" className="block text-sm font-semibold text-lodha-green mb-2">
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-lodha-gold focus:border-lodha-gold transition-all duration-300"
                >
                  <option value="">Select Budget Range</option>
                  <option value="2-3 Crores">₹2-3 Crores</option>
                  <option value="3-4 Crores">₹3-4 Crores</option>
                  <option value="4-5 Crores">₹4-5 Crores</option>
                  <option value="5+ Crores">₹5+ Crores</option>
                </select>
              </div>

              <div className="relative">
                <label htmlFor="propertyType" className="block text-sm font-semibold text-lodha-green mb-2">
                  <Home size={16} className="inline mr-2" />
                  Villa Type Preference
                </label>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-lodha-gold focus:border-lodha-gold transition-all duration-300"
                >
                  <option value="">Select Villa Type</option>
                  <option value="3 BHK Villa">3 BHK Villa</option>
                  <option value="4 BHK Villa">4 BHK Villa</option>
                  <option value="Duplex Villa">Duplex Villa</option>
                  <option value="Premium Villa">Premium Villa</option>
                </select>
              </div>

              <div className="relative">
                <label htmlFor="visitDate" className="block text-sm font-semibold text-lodha-green mb-2">
                  <Calendar size={16} className="inline mr-2" />
                  Preferred Visit Date
                </label>
                <input
                  type="date"
                  id="visitDate"
                  name="visitDate"
                  value={formData.visitDate}
                  onChange={(e) => setFormData({...formData, visitDate: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-lodha-gold focus:border-lodha-gold transition-all duration-300"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold text-lodha-green mb-2">
                  Additional Requirements
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-lodha-gold focus:border-lodha-gold transition-all duration-300 resize-none"
                  placeholder="Please let us know any specific requirements or questions you have about the villas..."
                ></textarea>
              </div>
            </div>

            <SimpleCaptcha onVerify={setIsCaptchaVerified} />

            <button
              type="submit"
              disabled={!isCaptchaVerified || isLoading}
              className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl ${
                isCaptchaVerified && !isLoading
                  ? 'bg-lodha-gold hover:bg-lodha-gold-dark text-white'
                  : 'bg-gray-400 text-gray-600 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                'Book Exclusive Site Visit'
              )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              🔒 Your information is secure and will only be used to contact you about villa viewing.
              <br />
              📞 Our team will call you within 2 hours to confirm your visit.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EnquiryForm;
