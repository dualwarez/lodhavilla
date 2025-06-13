
import { useState } from 'react';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';

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

interface DataTableProps {
  submissions: FormSubmission[];
  isLoading: boolean;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const DataTable = ({ submissions, isLoading, searchTerm, onSearchChange }: DataTableProps) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  // Filter submissions based on search term
  const filteredSubmissions = submissions.filter(submission =>
    Object.values(submission).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort submissions by date
  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  // Paginate submissions
  const totalPages = Math.ceil(sortedSubmissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSubmissions = sortedSubmissions.slice(startIndex, startIndex + itemsPerPage);

  const toggleSort = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Reset to page 1 when search changes
  useState(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search across all columns..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lodha-green focus:border-transparent"
        />
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>
          Showing {paginatedSubmissions.length} of {filteredSubmissions.length} submissions
          {searchTerm && ` (filtered from ${submissions.length} total)`}
        </span>
        <span>Page {currentPage} of {totalPages || 1}</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
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
              <TableHead className="w-[180px]">
                <button
                  onClick={toggleSort}
                  className="flex items-center space-x-1 hover:text-lodha-green transition-colors"
                >
                  <span>Submission Date</span>
                  {sortOrder === 'desc' ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedSubmissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-12">
                  <div className="text-gray-500">
                    {filteredSubmissions.length === 0 && submissions.length > 0 ? (
                      <div>
                        <p className="text-lg mb-2">No results found</p>
                        <p className="text-sm">Try adjusting your search terms</p>
                      </div>
                    ) : submissions.length === 0 ? (
                      <div>
                        <p className="text-lg mb-2">No submissions yet</p>
                        <p className="text-sm">Form submissions will appear here automatically</p>
                      </div>
                    ) : null}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedSubmissions.map((submission) => (
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default DataTable;
