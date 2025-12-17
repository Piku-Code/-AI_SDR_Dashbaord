import { Bell, Upload, Plus } from "lucide-react";

export default function Header() {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pt-14 lg:pt-0">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-[26px] font-bold text-gray-900 leading-tight">
          Good morning, Admin 👋
        </h1>
        <p className="text-gray-500 text-[13px] mt-1">
          Here&apos;s how your AI SDR performed in the last 7 days.
        </p>
      </div>
      <div className="flex items-center gap-2.5">
        <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
          <Bell size={17} className="text-gray-600" />
        </button>
        <button className="flex items-center gap-2 px-3.5 py-2 bg-white rounded-lg text-gray-700 font-medium text-[13px] shadow-sm hover:shadow-md transition-shadow border border-gray-100">
          <Upload size={15} />
          <span className="hidden sm:inline">Upload Leads</span>
        </button>
        <button className="flex items-center gap-1.5 px-3.5 py-2 bg-[#2563eb] rounded-lg text-white font-medium text-[13px] shadow-sm hover:bg-blue-600 transition-colors">
          <Plus size={15} strokeWidth={2.5} />
          <span className="whitespace-nowrap">New Campaign</span>
        </button>
      </div>
    </header>
  );
}

