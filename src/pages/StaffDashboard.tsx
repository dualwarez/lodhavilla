
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
  const { submissions, isLoading, lastRefresh, loadSubmissions } = useSubmissions();
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

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        submissionsCount={submissions.length}
        lastRefresh={lastRefresh}
        isLoading={isLoading}
        onRefresh={loadSubmissions}
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

        {/* Debug Information */}
        <div className="mt-4 p-4 bg-gray-100 rounded-lg text-xs text-gray-600">
          <details>
            <summary className="cursor-pointer font-medium">Debug Information</summary>
            <div className="mt-2 space-y-1">
              <p>Total submissions in state: {submissions.length}</p>
              <p>Data source: Supabase database with real-time updates</p>
              <p>Last refresh: {lastRefresh.toLocaleString('en-IN')}</p>
              <p>Current search: {searchTerm || 'None'}</p>
            </div>
          </details>
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
