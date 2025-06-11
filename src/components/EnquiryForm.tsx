import { useState } from 'react';
import { Phone, Mail, User, MapPin, Calendar, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SimpleCaptcha from './SimpleCaptcha';
import ThankYouPage from './ThankYouPage';

const EnquiryForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
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
  const [phoneError, setPhoneError] = useState('');

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const saveToLocalStorage = (submissionData: any) => {
    try {
      console.log('Saving submission data to localStorage:', submissionData);
      
      const existingSubmissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
      existingSubmissions.push(submissionData);
      localStorage.setItem('formSubmissions', JSON.stringify(existingSubmissions));
      
      console.log('Data saved successfully. Total submissions now:', existingSubmissions.length);
      
      // Trigger storage event for other tabs
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'formSubmissions',
        newValue: JSON.stringify(existingSubmissions),
        oldValue: JSON.stringify(existingSubmissions.slice(0, -1))
      }));
      
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  };

  const sendEmail = async (submissionData: any) => {
    try {
      console.log('Sending email notification...');
      
      const emailBody = `
New Villa Inquiry - Lodha Villa Imperio

Customer Details:
- Name: ${submissionData.name}
- Email: ${submissionData.email || 'Not provided'}
- Phone: ${submissionData.phone}
- City: ${submissionData.city || 'Not provided'}
- Budget: ${submissionData.budget || 'Not specified'}
- Villa Type: ${submissionData.propertyType || 'Not specified'}
- Preferred Visit Date: ${submissionData.visitDate || 'Not specified'}
- Additional Requirements: ${submissionData.message || 'None'}

Submission Time: ${new Date(submissionData.timestamp).toLocaleString('en-IN')}
Source: Website Lead Form

Please contact the customer within 2 hours as promised.
      `;

      // Using EmailJS service (free email sending service)
      const emailData = {
        to_email: 'dhan2work@gmail.com',
        subject: `New Villa Inquiry from ${submissionData.name} - ${submissionData.phone}`,
        message: emailBody,
        from_name: 'Lodha Villa Imperio Website',
        reply_to: submissionData.email || 'noreply@villa-imperio.com'
      };

      // Send via EmailJS public API
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'default_service',
          template_id: 'template_default',
          user_id: 'public_key',
          template_params: emailData
        })
      });

      if (response.ok) {
        console.log('Email notification sent successfully');
        return true;
      } else {
        console.warn('Email service unavailable, but form data is saved');
        return false;
      }
    } catch (error) {
      console.warn('Email sending failed, but form data is saved:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim()) {
      toast({
        title: "Required Field Missing",
        description: "Please enter your full name.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate phone number
    if (!validatePhoneNumber(formData.phone)) {
      setPhoneError('Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9');
      return;
    }
    
    setPhoneError('');
    setShowCaptcha(true);
  };

  const handleCaptchaVerify = (isVerified: boolean) => {
    setCaptchaVerified(isVerified);
    if (isVerified) {
      submitForm();
    }
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    
    const submissionData = {
      ...formData,
      project: 'Lodha Villa Imperio',
      timestamp: new Date().toISOString(),
      source: 'Website Lead Form'
    };

    console.log('Submitting lead data for Lodha Villa Imperio:', submissionData);
    
    try {
      // Save to localStorage first (most important for staff dashboard)
      const localStorageSaved = saveToLocalStorage(submissionData);
      
      if (!localStorageSaved) {
        throw new Error('Failed to save data locally');
      }

      // Send email notification
      await sendEmail(submissionData);

      // Try to send to Google Apps Script (secondary)
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzj2K_rxb0sSpZQI41JjUnFfwO9DYf_JamfkudDEcJEO1jxy6lBItmn1gowDDBeLDQhgA/exec', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData)
        });

        console.log('Form submitted successfully to Google Apps Script');
      } catch (externalError) {
        console.warn('External submission failed, but data is saved locally:', externalError);
      }

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
      
      setShowCaptcha(false);
      setCaptchaVerified(false);
      setShowThankYou(true);
      
      console.log('Form submission completed successfully');
      
    } catch (error) {
      console.error('Critical error during form submission:', error);
      
      toast({
        title: "Submission Error",
        description: "There was an issue saving your inquiry. Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Only allow numbers and limit to 10 digits
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData({
        ...formData,
        [name]: numericValue
      });
      
      if (phoneError && validatePhoneNumber(numericValue)) {
        setPhoneError('');
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleBackToHome = () => {
    setShowThankYou(false);
    setShowCaptcha(false);
    setCaptchaVerified(false);
  };

  if (showThankYou) {
    return <ThankYouPage onBackToHome={handleBackToHome} />;
  }

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
          {!showCaptcha ? (
            <>
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
                      Your Contact Number *
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
                        placeholder="9876543210"
                      />
                    </div>
                    {phoneError && <p className="text-red-500 text-sm mt-2">{phoneError}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-semibold text-lodha-green mb-3">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lodha-gold" size={20} />
                      <input
                        type="email"
                        id="email"
                        name="email"
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
                    {isSubmitting ? 'Processing...' : 'Book Exclusive Site Visit'}
                  </button>
                  <p className="text-sm text-gray-500 mt-6">
                    🔒 Your information is completely secure. Our representative will contact you within 2 hours.
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </div>
              </form>
            </>
          ) : (
            <div className="max-w-md mx-auto">
              <SimpleCaptcha onVerify={handleCaptchaVerify} />
              
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowCaptcha(false)}
                  className="text-lodha-green hover:text-lodha-gold transition-colors text-sm"
                >
                  ← Back to Form
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EnquiryForm;
