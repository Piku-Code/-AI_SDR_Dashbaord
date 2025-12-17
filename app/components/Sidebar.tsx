"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Inbox,
  FileText,
  Target,
  BookOpen,
  Settings,
  Wifi,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Inbox, label: "Inbox" },
  { icon: FileText, label: "Drafts" },
  { icon: Target, label: "Campaigns" },
  { icon: BookOpen, label: "Playbooks" },
  { icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#1a365d] rounded-lg text-white shadow-lg"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-[140px] bg-[#1a365d] flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Close button mobile */}
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-5">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-base">A</span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">TEST</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2.5 py-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg mb-0.5 transition-all text-[13px] ${
                item.active
                  ? "bg-[#2563eb] text-white shadow-sm"
                  : "text-blue-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon size={17} strokeWidth={1.8} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* AURA Status */}
        <div className="px-2.5 pb-5">
          <div className="bg-white/10 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                <Wifi size={13} className="text-white" />
              </div>
              <span className="text-white font-semibold text-xs">AURA</span>
            </div>
            <p className="text-blue-200 text-[10px] leading-tight pl-9">
              Analyzing your leads...
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

