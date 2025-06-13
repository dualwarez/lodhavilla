
interface DashboardStatsProps {
  submissionsCount: number;
  lastRefresh: Date;
  isLoading: boolean;
}

const DashboardStats = ({ submissionsCount, lastRefresh, isLoading }: DashboardStatsProps) => {
  return (
    <div className="p-4 sm:p-6 border-b">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Villa Inquiries</h2>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Total submissions: <span className="font-semibold text-lodha-green">{submissionsCount}</span>
            {isLoading && <span className="ml-2 text-blue-600">(Loading...)</span>}
          </p>
        </div>
        {submissionsCount > 0 && (
          <div className="text-xs sm:text-sm text-gray-500">
            Last updated: {lastRefresh.toLocaleTimeString('en-IN')}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardStats;
