export default function UsageFooter() {
  const used = 2500;
  const total = 3000;
  const percentage = (used / total) * 100;

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] sm:text-sm font-medium text-gray-700">
              Monthly Email Usage
            </span>
            <span className="text-[13px] sm:text-sm text-gray-500 sm:hidden lg:inline">
              {used.toLocaleString()} / {total.toLocaleString()}
            </span>
          </div>
          <div className="w-full h-2 sm:h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden sm:inline lg:hidden text-sm text-gray-500">
            {used.toLocaleString()} / {total.toLocaleString()}
          </span>
          <button className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 bg-[#2563eb] text-white text-[13px] sm:text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors">
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );
}

