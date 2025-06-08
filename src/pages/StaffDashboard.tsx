
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Download, Users } from 'lucide-react';
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

  useEffect(() => {
    // Check if user is logged in
    if (!localStorage.getItem('staffLoggedIn')) {
      navigate('/staff');
      return;
    }

    // Load submissions from localStorage
    const savedSubmissions = localStorage.getItem('formSubmissions');
    if (savedSubmissions) {
      setSubmissions(JSON.parse(savedSubmissions));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('staffLoggedIn');
    navigate('/');
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const exportToCSV = () => {
    const headers = ['Full Name', 'Email', 'Phone', 'City', 'Budget', 'Visit Date', 'Property Type', 'Message', 'Submission Date'];
    const csvContent = [
      headers.join(','),
      ...submissions.map(sub => [
        sub.name,
        sub.email,
        sub.phone,
        sub.city,
        sub.budget,
        sub.visitDate,
        sub.propertyType,
        sub.message,
        formatDate(sub.timestamp)
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'villa-inquiries.csv';
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
                onClick={exportToCSV}
                className="flex items-center space-x-2 bg-lodha-gold hover:bg-lodha-gold-dark text-white px-4 py-2 rounded-lg transition-colors"
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
            <h2 className="text-xl font-semibold text-gray-900">Villa Inquiries</h2>
            <p className="text-gray-600 mt-1">Total submissions: {submissions.length}</p>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Visit Date</TableHead>
                  <TableHead>Property Type</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Submission Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                      No submissions yet
                    </TableCell>
                  </TableRow>
                ) : (
                  submissions.map((submission, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{submission.name}</TableCell>
                      <TableCell>{submission.email}</TableCell>
                      <TableCell>{submission.phone}</TableCell>
                      <TableCell>{submission.city}</TableCell>
                      <TableCell>{submission.budget}</TableCell>
                      <TableCell>{submission.visitDate || '-'}</TableCell>
                      <TableCell>{submission.propertyType}</TableCell>
                      <TableCell className="max-w-xs truncate">{submission.message || '-'}</TableCell>
                      <TableCell>{formatDate(submission.timestamp)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
