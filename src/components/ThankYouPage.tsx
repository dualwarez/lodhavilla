
import { Check, Home } from 'lucide-react';

interface ThankYouPageProps {
  onBackToHome: () => void;
}

const ThankYouPage = ({ onBackToHome }: ThankYouPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lodha-green to-lodha-green-light flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-green-600" />
          </div>
          
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-lodha-green mb-4">
            Thank You for Your Interest!
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            Your inquiry has been successfully submitted for
          </p>
          
          <h2 className="font-playfair text-2xl font-bold text-lodha-gold mb-8">
            Lodha Villa Imperio
          </h2>
        </div>

        <div className="bg-lodha-gold/10 rounded-2xl p-6 mb-8">
          <h3 className="font-semibold text-lodha-green text-lg mb-3">What Happens Next?</h3>
          <div className="space-y-3 text-gray-600">
            <p>✓ Our representative will contact you within 2 hours</p>
            <p>✓ We'll schedule your exclusive site visit</p>
            <p>✓ You'll receive detailed project information</p>
            <p>✓ Special offers and pricing will be shared</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-500">
            For immediate assistance, please call us directly
          </p>
          
          <button
            onClick={onBackToHome}
            className="bg-lodha-gold hover:bg-lodha-gold-dark text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2 mx-auto"
          >
            <Home size={20} />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
