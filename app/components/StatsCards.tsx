import { TrendingUp, MessageSquare, Calendar, Activity } from "lucide-react";

const stats = [
  {
    label: "Emails Sent",
    value: "12,340",
    change: "+8%",
    icon: TrendingUp,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    changeColor: "text-blue-500",
    labelColor: "text-blue-500",
  },
  {
    label: "Replies",
    value: "1,240",
    change: "+12%",
    icon: MessageSquare,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    changeColor: "text-orange-500",
    labelColor: "text-orange-500",
  },
  {
    label: "Meetings Booked",
    value: "123",
    change: "+15%",
    icon: Calendar,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
    changeColor: "text-green-500",
    labelColor: "text-green-500",
  },
  {
    label: "Reply Rate",
    value: "10.1%",
    change: "+2.3%",
    icon: Activity,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
    changeColor: "text-rose-500",
    labelColor: "text-rose-500",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <div
              className={`w-10 h-10 sm:w-11 sm:h-11 ${stat.iconBg} rounded-xl flex items-center justify-center`}
            >
              <stat.icon size={18} className={`${stat.iconColor} sm:w-5 sm:h-5`} />
            </div>
            <span className={`${stat.changeColor} text-xs sm:text-sm font-semibold`}>
              {stat.change}
            </span>
          </div>
          <p className={`${stat.labelColor} text-[11px] sm:text-xs font-medium mb-0.5`}>{stat.label}</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

