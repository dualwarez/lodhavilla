
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Download, Users, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import DataTable from '@/components/DataTable';

interface FormSubmission {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  city: string | null;
  budget: string | null;
  visit_date: string | null;
  property_type: string | null;
  message: string | null;
  project: string;
  source: string;
  created_at: string;
}

const StaffDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const loadSubmissions = async () => {
    console.log('Loading submissions from Supabase...');
    
    try {
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        toast({
          title: "Error loading data",
          description: "Failed to load submissions from database. Check console for details.",
          variant: "destructive",
        });
        
        // Fallback to localStorage
        const savedSubmissions = localStorage.getItem('formSubmissions');
        if (savedSubmissions) {
          const parsedSubmissions = JSON.parse(savedSubmissions);
          setSubmissions(parsedSubmissions);
        } else {
          setSubmissions([]);
        }
      } else {
        console.log('Loaded submissions from Supabase:', data);
        setSubmissions(data || []);
        setLastRefresh(new Date());
      }
    } catch (error) {
      console.error('Error loading submissions:', error);
      toast({
        title: "Error",
        description: "Failed to connect to database. Using local data if available.",
        variant: "destructive",
      });
      
      // Fallback to localStorage
      try {
        const savedSubmissions = localStorage.getItem('formSubmissions');
        if (savedSubmissions) {
          const parsedSubmissions = JSON.parse(savedSubmissions);
          setSubmissions(parsedSubmissions);
        } else {
          setSubmissions([]);
        }
      } catch (localError) {
        console.error('Error loading from localStorage:', localError);
        setSubmissions([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check if user is logged in
    if (!localStorage.getItem('staffLoggedIn')) {
      navigate('/staff');
      return;
    }

    loadSubmissions();

    // Set up real-time subscription for new submissions
    const channel = supabase
      .channel('form_submissions_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'form_submissions'
        },
        (payload) => {
          console.log('New submission received:', payload.new);
          setSubmissions(prev => [payload.new as FormSubmission, ...prev]);
          setLastRefresh(new Date());
          toast({
            title: "New submission received",
            description: `Form submitted by ${(payload.new as FormSubmission).name}`,
          });
        }
      )
      .subscribe();

    // Set up an interval to refresh data every 30 seconds as backup
    const interval = setInterval(loadSubmissions, 30000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [navigate, toast]);

  const handleLogout = () => {
    localStorage.removeItem('staffLoggedIn');
    navigate('/');
  };

  const exportToCSV = () => {
    if (submissions.length === 0) {
      toast({
        title: "No data to export",
        description: "There are no submissions to export.",
        variant: "destructive",
      });
      return;
    }

    const headers = ['Full Name', 'Email', 'Phone', 'City', 'Budget', 'Visit Date', 'Property Type', 'Message', 'Project', 'Source', 'Submission Date'];
    const csvContent = [
      headers.join(','),
      ...submissions.map(sub => [
        sub.name || '',
        sub.email || '',
        sub.phone || '',
        sub.city || '',
        sub.budget || '',
        sub.visit_date || '',
        sub.property_type || '',
        sub.message || '',
        sub.project || '',
        sub.source || '',
        new Date(sub.created_at).toLocaleString('en-IN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Asia/Kolkata'
        })
      ].map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `villa-inquiries-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Export successful",
      description: `Exported ${submissions.length} submissions to CSV`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <Users className="text-lodha-green" size={24} />
              <h1 className="font-playfair text-xl sm:text-2xl font-bold text-lodha-green">Staff Dashboard</h1>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={loadSubmissions}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                disabled={isLoading}
              >
                <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
                <span>Refresh</span>
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center space-x-2 bg-lodha-gold hover:bg-lodha-gold-dark text-white px-3 py-2 rounded-lg transition-colors text-sm"
                disabled={submissions.length === 0}
              >
                <Download size={16} />
                <span>Export CSV</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 sm:p-6 border-b">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Villa Inquiries</h2>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  Total submissions: <span className="font-semibold text-lodha-green">{submissions.length}</span>
                  {isLoading && <span className="ml-2 text-blue-600">(Loading...)</span>}
                </p>
              </div>
              {submissions.length > 0 && (
                <div className="text-xs sm:text-sm text-gray-500">
                  Last updated: {lastRefresh.toLocaleTimeString('en-IN')}
                </div>
              )}
            </div>
          </div>

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
