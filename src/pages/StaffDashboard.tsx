
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Download, Users, RefreshCw } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

  const loadSubmissions = async () => {
    setIsLoading(true);
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

    // Set up an interval to refresh data every 30 seconds
    const interval = setInterval(loadSubmissions, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('staffLoggedIn');
    navigate('/');
  };

  const formatDate = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleString('en-IN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Kolkata'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return timestamp;
    }
  };

  const exportToCSV = () => {
    if (submissions.length === 0) {
      alert('No data to export');
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
        formatDate(sub.created_at)
      ].map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `villa-inquiries-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Users className="text-lodha-green" size={24} />
              <h1 className="font-playfair text-2xl font-bold text-lodha-green">Staff Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={loadSubmissions}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                disabled={isLoading}
              >
                <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
                <span>Refresh</span>
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center space-x-2 bg-lodha-gold hover:bg-lodha-gold-dark text-white px-4 py-2 rounded-lg transition-colors"
                disabled={submissions.length === 0}
              >
                <Download size={16} />
                <span>Export CSV</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Villa Inquiries</h2>
                <p className="text-gray-600 mt-1">
                  Total submissions: {submissions.length}
                  {isLoading && <span className="ml-2 text-blue-600">(Loading...)</span>}
                </p>
              </div>
              {submissions.length > 0 && (
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleTimeString('en-IN')}
                </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Full Name</TableHead>
                  <TableHead className="w-[200px]">Email</TableHead>
                  <TableHead className="w-[120px]">Phone</TableHead>
                  <TableHead className="w-[100px]">City</TableHead>
                  <TableHead className="w-[120px]">Budget</TableHead>
                  <TableHead className="w-[120px]">Visit Date</TableHead>
                  <TableHead className="w-[120px]">Property Type</TableHead>
                  <TableHead className="w-[200px]">Message</TableHead>
                  <TableHead className="w-[100px]">Project</TableHead>
                  <TableHead className="w-[100px]">Source</TableHead>
                  <TableHead className="w-[180px]">Submission Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={11} className="text-center py-12">
                      <div className="text-gray-500">
                        {isLoading ? (
                          <div className="flex items-center justify-center space-x-2">
                            <RefreshCw size={20} className="animate-spin" />
                            <span>Loading submissions...</span>
                          </div>
                        ) : (
                          <div>
                            <p className="text-lg mb-2">No submissions yet</p>
                            <p className="text-sm">Form submissions will appear here automatically</p>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  submissions.map((submission) => (
                    <TableRow key={submission.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{submission.name || '-'}</TableCell>
                      <TableCell className="break-all">{submission.email || '-'}</TableCell>
                      <TableCell>{submission.phone || '-'}</TableCell>
                      <TableCell>{submission.city || '-'}</TableCell>
                      <TableCell>{submission.budget || '-'}</TableCell>
                      <TableCell>{submission.visit_date || '-'}</TableCell>
                      <TableCell>{submission.property_type || '-'}</TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate" title={submission.message || ''}>
                          {submission.message || '-'}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{submission.project || '-'}</TableCell>
                      <TableCell className="text-sm">{submission.source || '-'}</TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {formatDate(submission.created_at)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Debug Information */}
        <div className="mt-4 p-4 bg-gray-100 rounded-lg text-xs text-gray-600">
          <details>
            <summary className="cursor-pointer font-medium">Debug Information</summary>
            <div className="mt-2">
              <p>Total submissions in state: {submissions.length}</p>
              <p>Data source: Supabase database</p>
              <p>Last refresh: {new Date().toLocaleString('en-IN')}</p>
            </div>
          </details>
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
