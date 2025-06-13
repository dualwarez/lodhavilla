
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useSubmissions } from '@/hooks/useSubmissions';
import { exportToCSV } from '@/utils/csvExport';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardStats from '@/components/DashboardStats';
import DataTable from '@/components/DataTable';

const StaffDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { submissions, isLoading, lastRefresh, loadSubmissions, debugInfo } = useSubmissions();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Check if user is logged in
    if (!localStorage.getItem('staffLoggedIn')) {
      navigate('/staff');
      return;
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('staffLoggedIn');
    navigate('/');
  };

  const handleExport = () => {
    const result = exportToCSV(submissions);
    
    if (result.success) {
      toast({
        title: "Export successful",
        description: result.message,
      });
    } else {
      toast({
        title: "No data to export",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  const handleForceRefresh = () => {
    toast({
      title: "Force refresh triggered",
      description: "Reloading data from database...",
    });
    loadSubmissions();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        submissionsCount={submissions.length}
        lastRefresh={lastRefresh}
        isLoading={isLoading}
        onRefresh={handleForceRefresh}
        onExport={handleExport}
        onLogout={handleLogout}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <DashboardStats
            submissionsCount={submissions.length}
            lastRefresh={lastRefresh}
            isLoading={isLoading}
          />

          <div className="p-4 sm:p-6">
            <DataTable 
              submissions={submissions}
              isLoading={isLoading}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>
        </div>

        {/* Enhanced Debug Information */}
        <div className="mt-4 p-4 bg-gray-100 rounded-lg text-xs text-gray-600">
          <details>
            <summary className="cursor-pointer font-medium">🔧 Debug Information & Connection Test</summary>
            <div className="mt-2 space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800">📊 Current State:</h4>
                  <p>Total submissions in state: {submissions.length}</p>
                  <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
                  <p>Last refresh: {lastRefresh.toLocaleString('en-IN')}</p>
                  <p>Current search: {searchTerm || 'None'}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">🔗 Connection Info:</h4>
                  <p>Supabase URL: https://vhexgzptfskdmzxzroij.supabase.co</p>
                  <p>Table: form_submissions</p>
                  <p>Real-time: Active</p>
                  <p>Auto-refresh: Every 30s</p>
                </div>
              </div>
              
              {debugInfo && (
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-800">🐛 Latest Query Debug:</h4>
                  <div className="bg-white p-3 rounded border text-xs overflow-auto">
                    <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
                  </div>
                </div>
              )}
              
              <div className="mt-4">
                <button
                  onClick={handleForceRefresh}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                  disabled={isLoading}
                >
                  🔄 Force Refresh Data
                </button>
              </div>
            </div>
          </details>
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
