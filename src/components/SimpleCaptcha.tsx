
import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface SimpleCaptchaProps {
  onVerify: (isVerified: boolean) => void;
}

const SimpleCaptcha = ({ onVerify }: SimpleCaptchaProps) => {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState('');

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setUserInput('');
    setError('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleVerify = () => {
    if (userInput.toUpperCase() === captchaText) {
      setError('');
      onVerify(true);
    } else {
      setError('Incorrect captcha. Please try again.');
      generateCaptcha();
      onVerify(false);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border">
      <h3 className="text-lg font-semibold text-lodha-green mb-4">Verify You're Human</h3>
      
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-white border-2 border-gray-300 px-4 py-2 rounded font-mono text-xl tracking-widest select-none">
          {captchaText}
        </div>
        <button
          type="button"
          onClick={generateCaptcha}
          className="p-2 text-lodha-gold hover:text-lodha-gold-dark transition-colors"
          title="Refresh Captcha"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      <div className="space-y-3">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter the text above"
          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-lodha-gold focus:border-lodha-gold transition-all duration-300"
        />
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <button
          type="button"
          onClick={handleVerify}
          className="bg-lodha-gold hover:bg-lodha-gold-dark text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300"
        >
          Verify Captcha
        </button>
      </div>
    </div>
  );
};

export default SimpleCaptcha;
