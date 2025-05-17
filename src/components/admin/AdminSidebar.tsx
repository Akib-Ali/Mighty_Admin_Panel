
'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import {
  ChevronRight,
  ChevronDown,
  Menu,
  LayoutDashboard,
  List,
  FileBarChart2,
  BarChart3,
  Languages,
  HelpCircle,
  Pencil
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function AdminSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(prev => (prev === menu ? null : menu));
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={cn(
          'bg-white shadow h-screen p-4 flex flex-col justify-between transition-all duration-300 relative',
          isSidebarOpen ? 'w-64' : 'w-20'
        )}
      >
        <div>
          {/* Logo */}


          <div className="flex items-center justify-start mb-4">
            {isSidebarOpen ? (
              <Image src="/images/Realty-Logo.png" alt="Logo" width={80} height={30} />
            ) : (
              <Image src="/images/Realty-Logo.png" alt="Logo" width={50} height={30} />
            )}
          </div>
          <hr></hr>


          {/* Navigation */}
          <nav className="space-y-2">
            {/* Overview */}
            <a
              href="/admin/overview"
              className="flex items-center bg-red-700 text-white px-2 py-2 rounded font-medium text-black hover:bg-red-700 hover:text-white group mt-4"
            >
              <LayoutDashboard className="w-5 h-5 mr-2 text-white group-hover:text-white" />
              {isSidebarOpen && <span>Overview</span>}
            </a>

            {/* Listing */}
            <div>
              <button
                className="flex items-center justify-between w-full text-left px-2 py-2 rounded font-medium text-black hover:bg-red-700 hover:text-white group"
                onClick={() => toggleMenu("listing")}
              >
                <span className="flex items-center">
                  <List className="w-5 h-5 mr-2 text-red-700 group-hover:text-white" />
                  {isSidebarOpen && <span>Listing</span>}
                </span>

                {openMenu === "listing" ? (
                  <ChevronDown className="w-4 h-4 text-red-700 group-hover:text-white" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-red-700 group-hover:text-white" />
                )}

              </button>

              {openMenu === "listing" && isSidebarOpen && (
                <ul className="ml-6 mt-1 space-y-1 text-sm text-gray-700">
                  <li>
                    <a
                      href="/admin/listing/manage"
                      className="block px-2 py-1 rounded hover:bg-red-700 hover:text-white transition-colors"
                    >
                      Manage Listing
                    </a>
                  </li>
                  <li>
                    <a
                      href="/admin/listing-inventory"
                      className="block px-2 py-1 rounded hover:bg-red-700 hover:text-white transition-colors"
                    >
                      Listing Inventory
                    </a>
                  </li>
                </ul>
              )}
            </div>

            {/* Report */}
            <div>
              <button
                className="flex items-center justify-between w-full text-left px-2 py-2 rounded font-medium text-black hover:bg-red-700 hover:text-white group"
                onClick={() => toggleMenu("report")}
              >
                <span className="flex items-center">
                  <FileBarChart2 className="w-5 h-5 mr-2 text-red-700 group-hover:text-white" />
                  {isSidebarOpen && <span>Report</span>}
                </span>
                {isSidebarOpen &&
                  (openMenu === "report" ? (
                    <ChevronDown className="w-4 h-4 text-red-700 group-hover:text-white" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-red-700 group-hover:text-white" />
                  ))}
              </button>
              {openMenu === "report" && isSidebarOpen && (
                <ul className="ml-6 mt-1 space-y-1 text-sm text-gray-700">
                  <li>
                    <a
                      href="/admin/report/manage"
                      className="block px-2 py-1 rounded hover:bg-red-700 hover:text-white transition-colors"
                    >
                      Manage Report
                    </a>
                  </li>
                </ul>
              )}
            </div>

            {/* Insight */}
            <div>
              <button
                className="flex items-center justify-between w-full text-left px-2 py-2 rounded font-medium text-black hover:bg-red-700 hover:text-white group"
                onClick={() => toggleMenu("insight")}
              >
                <span className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-red-700 group-hover:text-white" />
                  {isSidebarOpen && <span>Insight</span>}
                </span>
                {isSidebarOpen &&
                  (openMenu === "insight" ? (
                    <ChevronDown className="w-4 h-4 text-red-700 group-hover:text-white" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-red-700 group-hover:text-white" />
                  ))}
              </button>
              {openMenu === "insight" && isSidebarOpen && (
                <ul className="ml-6 mt-1 space-y-1 text-sm text-gray-700">
                  <li>
                    <a
                      href="/admin/insight/manage"
                      className="block px-2 py-1 rounded hover:bg-red-700 hover:text-white transition-colors"
                    >
                      Manage Insight
                    </a>
                  </li>
                </ul>
              )}
            </div>

            {/* Add Property */}
            <a
              href="/admin/property/add"
              className="flex items-center px-2 py-2 rounded font-medium text-black hover:bg-red-700 hover:text-white group"
            >
              <Pencil className="w-5 h-5 mr-2 text-red-700 group-hover:text-white" />
              {isSidebarOpen && <span>Add Property</span>}
            </a>
          </nav>
        </div>

        {/* Bottom Settings and Toggle */}
        <div className="space-y-2 border-t pt-4 relative">
          <a
            href="/admin/language"
            className="flex items-center px-2 py-2 rounded font-medium text-black hover:bg-red-700 hover:text-white group"
          >
            <Languages className="w-5 h-5 mr-2 text-red-700 group-hover:text-white" />
            {isSidebarOpen && <span>Language Change</span>}
          </a>

          <a
            href="/admin/support"
            className="flex items-center px-2 py-2 rounded font-medium text-black hover:bg-red-700 hover:text-white group"
          >
            <HelpCircle className="w-5 h-5 mr-2 text-red-700 group-hover:text-white" />
            {isSidebarOpen && <span>Help & Support</span>}
          </a>

          {/* Toggle Button at bottom right */}
          <Button
            variant="ghost"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute -top-14 right-2"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </aside>
    </div>
  );
}


