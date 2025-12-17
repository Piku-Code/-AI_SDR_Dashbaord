"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const engagementData = [
  { day: "Mon", emails: 450, meetings: 40, replies: 80 },
  { day: "Tue", emails: 380, meetings: 45, replies: 65 },
  { day: "Wed", emails: 420, meetings: 35, replies: 90 },
  { day: "Thu", emails: 350, meetings: 50, replies: 75 },
  { day: "Fri", emails: 280, meetings: 30, replies: 60 },
  { day: "Sat", emails: 150, meetings: 20, replies: 40 },
  { day: "Sun", emails: 120, meetings: 25, replies: 35 },
];

const playbookData = [
  { name: "SaaS Demo v2", value: 14, fill: "#3b82f6" },
  { name: "Healthcare Connect", value: 11, fill: "#60a5fa" },
];

export default function Charts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-5">
      {/* Engagement Over Time */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">
          Engagement Over Time
        </h3>
        <div className="h-52 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={engagementData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#9ca3af" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#9ca3af" }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  fontSize: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="emails"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5 }}
                name="Emails Sent"
              />
              <Line
                type="monotone"
                dataKey="meetings"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ fill: "#22c55e", strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5 }}
                name="Meetings"
              />
              <Line
                type="monotone"
                dataKey="replies"
                stroke="#f97316"
                strokeWidth={2}
                dot={{ fill: "#f97316", strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5 }}
                name="Replies"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-3 sm:mt-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-[11px] sm:text-xs text-gray-500">Emails Sent</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="text-[11px] sm:text-xs text-gray-500">Meetings</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            <span className="text-[11px] sm:text-xs text-gray-500">Replies</span>
          </div>
        </div>
      </div>

      {/* Top Performing Playbooks */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">
          Top Performing Playbooks
        </h3>
        <div className="h-52 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={playbookData} barSize={50} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#9ca3af" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#9ca3af" }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

