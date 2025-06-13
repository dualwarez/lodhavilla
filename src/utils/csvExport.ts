
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

export const exportToCSV = (submissions: FormSubmission[]) => {
  if (submissions.length === 0) {
    return { success: false, message: "No data to export" };
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
  
  return { 
    success: true, 
    message: `Exported ${submissions.length} submissions to CSV` 
  };
};
