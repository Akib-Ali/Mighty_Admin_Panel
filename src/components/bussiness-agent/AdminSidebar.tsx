
'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Menu,
  LayoutDashboard,
  List,
  FileBarChart2,
  BarChart3,
  Languages,
  HelpCircle,
  Pencil,
  UserCog
} from 'lucide-react';
import { Home } from "lucide-react";
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
          <div className="flex items-center justify-between mb-4">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/business/agent/" className="flex items-center">
                <Image
                  src="/images/Realty-Logo.png"
                  alt="Logo"
                  width={isSidebarOpen ? 80 : 70}
                  height={30}
                  style={{ objectFit: "contain" }}
                  priority
                />
              </Link>
            </div>

            {/* Toggle Button */}
            <Button
              variant="ghost"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="ml-2 p-2"
            >
              {isSidebarOpen ? (
                <ChevronLeft className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </Button>
          </div>

          <hr></hr>


          {/* Navigation */}
          <nav className="space-y-2">
            <Link
              href="/business/agent"
              className="flex items-center  text-black px-2 py-2 rounded font-medium text-black hover:bg-primary hover:text-white group mt-4"
            >
              <LayoutDashboard className="w-5 h-5 mr-2 text-primary group-hover:text-white" />
              {isSidebarOpen && <span>Overview</span>}
            </Link>

            {/* Listing */}
            <div>
              <button
                className="flex items-center justify-between w-full text-left px-2 py-2 rounded font-medium text-black hover:bg-primary hover:text-white group"
                onClick={() => toggleMenu("listing")}
              >
                <span className="flex items-center">
                  <List className="w-5 h-5 mr-2 text-primary group-hover:text-white" />
                  {isSidebarOpen && <span>Listing</span>}
                </span>

                {openMenu === "listing" ? (
                  <ChevronDown className="w-4 h-4 text-primary group-hover:text-white" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-primary group-hover:text-white" />
                )}

              </button>

              {openMenu === "listing" && isSidebarOpen && (
                <ul className="ml-6 mt-1 space-y-1 text-sm text-gray-700">
                  <li>
                    <Link
                      href="/business/agent/property-managements"
                      className="block px-2 py-1 rounded hover:bg-primary hover:text-white transition-colors"
                    >
                      Property Management

                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/business/agent/property-catalogues"
                      className="block px-2 py-1 rounded hover:bg-primary hover:text-white transition-colors"
                    >
                      Property Catalogue
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* Report */}
            <div>
              <button
                className="flex items-center justify-between w-full text-left px-2 py-2 rounded font-medium text-black hover:bg-primary hover:text-white group"
                onClick={() => toggleMenu("report")}
              >
                <span className="flex items-center">
                  <FileBarChart2 className="w-5 h-5 mr-2 text-primary group-hover:text-white" />
                  {isSidebarOpen && <span>Report</span>}
                </span>
                {isSidebarOpen &&
                  (openMenu === "report" ? (
                    <ChevronDown className="w-4 h-4 text-primary group-hover:text-white" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-primary group-hover:text-white" />
                  ))}
              </button>
              {openMenu === "report" && isSidebarOpen && (
                <ul className="ml-6 mt-1 space-y-1 text-sm text-gray-700">
                  <li>
                    <Link
                      href="/admin/report/manage"
                      className="block px-2 py-1 rounded hover:bg-primary hover:text-white transition-colors"
                    >
                      Manage Report
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* Insight */}
            <div>
              <button
                className="flex items-center justify-between w-full text-left px-2 py-2 rounded font-medium text-black hover:bg-primary hover:text-white group"
                onClick={() => toggleMenu("insight")}
              >
                <span className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-primary group-hover:text-white" />
                  {isSidebarOpen && <span>Insight</span>}
                </span>
                {isSidebarOpen &&
                  (openMenu === "insight" ? (
                    <ChevronDown className="w-4 h-4 text-primary group-hover:text-white" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-primary group-hover:text-white" />
                  ))}
              </button>
              {openMenu === "insight" && isSidebarOpen && (
                <ul className="ml-6 mt-1 space-y-1 text-sm text-primary">
                  <li>
                    <a
                      href="/admin/insight/manage"
                      className="block px-2 py-1 rounded hover:bg-primary hover:text-white transition-colors"
                    >
                      Manage Insight
                    </a>
                  </li>
                </ul>
              )}
            </div>

            <hr></hr>

            <Button
              asChild
              className={cn(
                "bg-primary hover:bg-primary text-white font-semibold transition-all duration-300",
                isSidebarOpen ? "w-[200px]" : "w-[50px] px-3 justify-center"
              )}
            >
              <Link href="/business/agent/add-property" className="flex items-center gap-2 justify-center">
                <Home className="w-5 h-5" />
                {isSidebarOpen && <span>Add Property</span>}
              </Link>
            </Button>
          </nav>
        </div>

        {/* Bottom Settings and Toggle */}
        <div className="space-y-2 border-t pt-4 relative">

          <Link
            href="/business/agent/manage-profile"
            className="flex items-center px-2 py-2 rounded font-medium text-black hover:bg-primary hover:text-white group"
          >
            <UserCog className="w-5 h-5 mr-2 text-primary group-hover:text-white" />
            {isSidebarOpen && <span>Manage Profile</span>}
          </Link>
          <Link
            href="/admin/language"
            className="flex items-center px-2 py-2 rounded font-medium text-black hover:bg-primary hover:text-white group"
          >
            <Languages className="w-5 h-5 mr-2 text-primary group-hover:text-white" />
            {isSidebarOpen && <span>Language Change</span>}
          </Link>

          <Link
            href="/admin/support"
            className="flex items-center px-2 py-2 rounded font-medium text-black hover:bg-primary hover:text-white group"
          >
            <HelpCircle className="w-5 h-5 mr-2 text-primary  group-hover:text-white" />
            {isSidebarOpen && <span>Help & Support</span>}
          </Link>
        </div>
      </aside>
    </div>
  );
}


