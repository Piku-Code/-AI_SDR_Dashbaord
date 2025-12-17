import { Lightbulb } from "lucide-react";

const insights = [
  {
    title: "Follow-up #2 at Day 4 performs best",
    description:
      "Your Day-4 follow-up got 26% more replies. Consider moving other follow-ups earlier.",
    priority: "High",
    priorityColor: "bg-blue-100 text-blue-700",
  },
  {
    title: "Subject lines under 7 words drive 18% more opens",
    description:
      "Short, direct subject lines are working better across all campaigns.",
    priority: "High",
    priorityColor: "bg-blue-100 text-blue-700",
  },
  {
    title: "Tuesday 10 AM sends show highest engagement",
    description: "Emails sent on Tuesday mornings have a 22% higher open rate.",
    priority: "Medium",
    priorityColor: "bg-green-100 text-green-700",
  },
];

export default function AIInsights() {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm mb-5">
      <div className="flex items-center gap-2 mb-4 sm:mb-5">
        <Lightbulb size={18} className="text-purple-500 sm:w-5 sm:h-5" />
        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">AI Insights & Suggestions</h3>
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
            <div className="flex items-start justify-between gap-3 sm:gap-4 mb-1.5 sm:mb-2">
              <h4 className="font-semibold text-gray-900 text-[13px] sm:text-sm leading-snug">
                {insight.title}
              </h4>
              <span
                className={`px-1.5 sm:px-2 py-0.5 ${insight.priorityColor} text-[9px] sm:text-[10px] font-semibold rounded-full flex-shrink-0`}
              >
                {insight.priority}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-gray-500 mb-2.5 sm:mb-3 leading-relaxed">{insight.description}</p>
            <div className="flex items-center gap-2">
              <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#2563eb] text-white text-[11px] sm:text-xs font-medium rounded-lg hover:bg-blue-600 transition-colors">
                Apply to Playbook
              </button>
              <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-gray-200 text-gray-700 text-[11px] sm:text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors">
                View Data
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

