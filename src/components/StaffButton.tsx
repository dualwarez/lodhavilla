
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StaffButton = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => navigate('/staff')}
        className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2"
        title="Staff Login"
      >
        <Users size={20} />
        <span className="text-sm font-medium">Staff</span>
      </button>
    </div>
  );
};

export default StaffButton;
