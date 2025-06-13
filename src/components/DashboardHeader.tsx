
import { LogOut, Download, Users, RefreshCw } from 'lucide-react';

interface DashboardHeaderProps {
  submissionsCount: number;
  lastRefresh: Date;
  isLoading: boolean;
  onRefresh: () => void;
  onExport: () => void;
  onLogout: () => void;
}

const DashboardHeader = ({
  submissionsCount,
  lastRefresh,
  isLoading,
  onRefresh,
  onExport,
  onLogout
}: DashboardHeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <Users className="text-lodha-green" size={24} />
            <h1 className="font-playfair text-xl sm:text-2xl font-bold text-lodha-green">Staff Dashboard</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onRefresh}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
              disabled={isLoading}
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
            <button
              onClick={onExport}
              className="flex items-center space-x-2 bg-lodha-gold hover:bg-lodha-gold-dark text-white px-3 py-2 rounded-lg transition-colors text-sm"
              disabled={submissionsCount === 0}
            >
              <Download size={16} />
              <span>Export CSV</span>
            </button>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
