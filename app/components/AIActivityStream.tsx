import {
  Wifi,
  Eye,
  RefreshCw,
  AlertTriangle,
  PauseCircle,
  Zap,
} from "lucide-react";

const activities = [
  {
    icon: Zap,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    title: "Generated 42 drafts using Playbook v1.0",
    time: "2 min ago",
    status: "In Progress",
    statusColor: "bg-blue-100 text-blue-600",
    cardBg: "bg-purple-50/70",
    completed: false,
  },
  {
    icon: Eye,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    title: "Identified 6 positive replies from recent campaigns",
    time: "8 min ago",
    status: null,
    cardBg: "bg-green-50/70",
    completed: true,
  },
  {
    icon: RefreshCw,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "Recommends adjusting Follow-up #2 timing",
    time: "15 min ago",
    status: "Needs Review",
    statusColor: "bg-orange-100 text-orange-600",
    cardBg: "bg-blue-50/70",
    completed: false,
  },
  {
    icon: AlertTriangle,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    title: "Flagged 12 low-quality emails for your review",
    time: "22 min ago",
    status: "Action Required",
    statusColor: "bg-red-100 text-red-600",
    cardBg: "bg-amber-50/70",
    completed: false,
  },
  {
    icon: PauseCircle,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    title: "Paused sending due to inbox warming schedule",
    time: "1 hour ago",
    status: null,
    cardBg: "bg-red-50/70",
    completed: false,
  },
];

export default function AIActivityStream() {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm mb-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 sm:mb-5">
        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center">
          <Wifi size={16} className="text-white sm:w-[18px] sm:h-[18px]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">AI Activity Stream</h3>
            <span className="px-2 py-0.5 bg-green-100 text-green-600 text-[9px] sm:text-[10px] font-semibold rounded-full">
              Live
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-gray-500">
            AURA is working in the background
          </p>
        </div>
      </div>

      {/* Activity Items */}
      <div className="space-y-2.5 sm:space-y-3">
        {activities.map((activity, index) => (
          <div
            key={index}
            className={`${activity.cardBg} rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-start gap-2.5 sm:gap-3`}
          >
            <div
              className={`w-7 h-7 sm:w-8 sm:h-8 ${activity.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}
            >
              <activity.icon size={14} className={`${activity.iconColor} sm:w-4 sm:h-4`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] sm:text-sm font-medium text-gray-900 mb-1 leading-snug">
                {activity.title}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] sm:text-xs text-gray-500 flex items-center gap-1">
                  <span className="opacity-80">🕐</span> {activity.time}
                </span>
                {activity.completed && (
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                )}
                {activity.status && (
                  <span
                    className={`px-1.5 sm:px-2 py-0.5 ${activity.statusColor} text-[9px] sm:text-[10px] font-semibold rounded-full`}
                  >
                    {activity.status}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-4 sm:mt-5 p-3 sm:p-4 bg-amber-50 rounded-lg sm:rounded-xl flex items-start gap-2.5 sm:gap-3">
        <span className="text-base sm:text-lg">💡</span>
        <p className="text-[13px] sm:text-sm text-gray-700 leading-relaxed">
          <span className="font-semibold">AURA Summary:</span> I&apos;ve drafted
          64 emails, sent 18, and detected 2 positive replies. Your outreach is
          on track.
        </p>
      </div>
    </div>
  );
}

