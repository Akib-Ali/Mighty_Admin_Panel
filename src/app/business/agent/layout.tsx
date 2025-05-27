// app/admin/layout.tsx
"use client"
import React from "react";
import AdminHeader from "@/components/bussiness-agent/AdminHeader";
import AdminSidebar from "@/components/bussiness-agent/AdminSidebar";
import ReactQueryProvider from "@/lib/reactQueryClient";




export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex flex-col flex-1">
        <AdminHeader />
        {/* <main className="p-4"> */}
         <ReactQueryProvider>
            {children}

         </ReactQueryProvider>
        
          {/* </main> */}
      </div>
    </div>
  );
}
