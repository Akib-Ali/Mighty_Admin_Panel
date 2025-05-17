"use client";

import React, { useState } from "react";
import { 
  LayoutDashboard, 
  ClipboardList,
  FileBarChart,
  LineChart,
  Plus,
  Globe,
  HelpCircle,
  ChevronRight
} from "lucide-react";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const [isOpen, setIsOpen] = useState(true);

  const sidebarItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: "Overview", active: false },
    { icon: <ClipboardList className="w-5 h-5" />, label: "Listings", active: false },
    { icon: <FileBarChart className="w-5 h-5" />, label: "Reports", active: false },
    { icon: <LineChart className="w-5 h-5" />, label: "Insights", active: false },
    { icon: <Plus className="w-5 h-5" />, label: "Add Property", active: true },
  ];

  const bottomSidebarItems = [
    { icon: <Globe className="w-5 h-5" />, label: "Language Change" },
    { icon: <HelpCircle className="w-5 h-5" />, label: "Help & Support" },
  ];

  return (
    <>
      <div 
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed top-24 left-0 w-[240px] bg-white h-[calc(100vh-96px)] border-r border-[#E5E7EB] transition-transform duration-200 ease-in-out z-30 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent`}
      >
        <div className="flex flex-col h-full">
          {/* Navigation Items */}
          <nav className="flex-1 py-5">
            <ul className="space-y-1 px-3">
              {sidebarItems.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg ${
                      item.active 
                        ? 'bg-[#AB213B] text-white' 
                        : 'text-[#4B5563] hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {item.active && <ChevronRight className="w-4 h-4" />}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom Items */}
          <div className="py-5 border-t border-[#E5E7EB]">
            <ul className="space-y-1 px-3">
              {bottomSidebarItems.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-[#4B5563] hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar; 