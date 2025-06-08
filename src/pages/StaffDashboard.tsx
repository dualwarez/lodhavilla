
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Download, Users, RefreshCw } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface FormSubmission {
  name: string;
  email: string;
  phone: string;
  city: string;
  budget: string;
  visitDate: string;
  propertyType: string;
  message: string;
  timestamp: string;
}

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadSubmissions = () => {
    setIsLoading(true);
    console.log('Loading submissions from localStorage...');
    
    try {
      const savedSubmissions = localStorage.getItem('formSubmissions');
      console.log('Raw localStorage data:', savedSubmissions);
      
      if (savedSubmissions) {
        const parsedSubmissions = JSON.parse(savedSubmissions);
        console.log('Parsed submissions:', parsedSubmissions);
        setSubmissions(parsedSubmissions);
      } else {
        console.log('No submissions found in localStorage');
        setSubmissions([]);
      }
    } catch (error) {
      console.error('Error loading submissions:', error);
      setSubmissions([]);
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

    // Listen for storage changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'formSubmissions') {
        console.log('Storage change detected, reloading submissions...');
        loadSubmissions();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
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

    const headers = ['Full Name', 'Email', 'Phone', 'City', 'Budget', 'Visit Date', 'Property Type', 'Message', 'Submission Date'];
    const csvContent = [
      headers.join(','),
      ...submissions.map(sub => [
        sub.name || '',
        sub.email || '',
        sub.phone || '',
        sub.city || '',
        sub.budget || '',
        sub.visitDate || '',
        sub.propertyType || '',
        sub.message || '',
        formatDate(sub.timestamp)
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
                  <TableHead className="w-[180px]">Submission Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-12">
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
                  submissions
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                    .map((submission, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{submission.name || '-'}</TableCell>
                        <TableCell className="break-all">{submission.email || '-'}</TableCell>
                        <TableCell>{submission.phone || '-'}</TableCell>
                        <TableCell>{submission.city || '-'}</TableCell>
                        <TableCell>{submission.budget || '-'}</TableCell>
                        <TableCell>{submission.visitDate || '-'}</TableCell>
                        <TableCell>{submission.propertyType || '-'}</TableCell>
                        <TableCell className="max-w-xs">
                          <div className="truncate" title={submission.message}>
                            {submission.message || '-'}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {formatDate(submission.timestamp)}
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
              <p>localStorage key exists: {localStorage.getItem('formSubmissions') ? 'Yes' : 'No'}</p>
              <p>Last refresh: {new Date().toLocaleString('en-IN')}</p>
            </div>
          </details>
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
