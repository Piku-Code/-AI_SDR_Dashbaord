const activities = [
  {
    status: "success",
    text: "Email sent to John @Acme",
    time: "2h ago",
  },
  {
    status: "success",
    text: "Meeting booked with Alice @XYZ Corp",
    time: "3h ago",
  },
  {
    status: "success",
    text: "Reply received from Sarah @TechCo",
    time: "4h ago",
  },
  {
    status: "warning",
    text: 'Campaign "SaaS Outreach" paused',
    time: "5h ago",
  },
  {
    status: "error",
    text: "Email bounced: invalid@example.com",
    time: "6h ago",
  },
];

const statusColors: Record<string, string> = {
  success: "bg-green-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
};

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm mb-5">
      <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Recent Activity</h3>
      <div className="space-y-1">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 sm:py-2.5"
          >
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0 ${
                  statusColors[activity.status]
                }`}
              />
              <span className="text-[13px] sm:text-sm text-gray-700 truncate">{activity.text}</span>
            </div>
            <span className="text-[11px] sm:text-xs text-gray-400 flex-shrink-0 ml-3">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

