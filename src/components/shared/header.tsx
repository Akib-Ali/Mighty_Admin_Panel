"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from 'next/link';

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <header className="bg-white border-b border-[#E5E7EB] fixed top-0 left-0 right-0 z-40 h-24">
      <div className="h-full flex flex-col">
        {/* Top Bar */}
        <div className="h-14 border-b border-[#E5E7EB] px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <img src="/images/Realty-Logo.png" alt="MW Realty" className="h-[50px]" />
            <span className="text-[#4B5563] text-sm font-medium">Mighty Winners Real Estate</span>
          </Link>
         <div className='flex items-center gap-4'>
         <Button 
            variant="destructive" 
            size="sm" 
            className="bg-[#AB213B] hover:bg-[#96192F] text-sm px-4 h-9 rounded-lg"
          >
            Quick Action
          </Button>
          <div>
            <img src="/images/avatar/avatar.png" alt="avatar" className="w-10 h-10 rounded-full" />
          </div>
         </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex-1 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden text-gray-500 hover:text-gray-600"
            >
              {isSidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <span className="text-[#4B5563] text-sm font-medium">Add Property</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#4B5563]">Welcome back,</span>
            <span className="text-sm font-medium text-[#111827]">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
} 