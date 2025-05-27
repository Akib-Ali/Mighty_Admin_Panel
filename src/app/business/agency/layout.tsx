// app/admin/layout.tsx
"use client"
import React from "react";
import Sidebar from "@/components/business-agency/sidebar";
import Header from "@/components/business-agency/topbar";
import ReactQueryProvider from "@/lib/reactQueryClient";

export default function AgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <ReactQueryProvider>
          {children}

        </ReactQueryProvider>
      </div>
    </div>
  );
}
