// components/shared/ClientLayout.tsx
"use client";

import { usePathname } from "next/navigation";
import { MainNav } from "@/components/shared/main-nav";
import { Toaster } from "sonner";
import ReactQueryProvider from "@/lib/reactQueryClient";
import SiteFooter from "@/components/shared/site-footer";
import Header from "@/components/shared/header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isCustomLayout = pathname === "/add-property";

  return (
    <ReactQueryProvider>
      {isCustomLayout ? <Header /> : <MainNav />}
      <Toaster
        duration={5000}
        position="top-right"
        richColors
        closeButton
        visibleToasts={5}
        expand
      />
      {children}
      {!isCustomLayout && <SiteFooter />}
    </ReactQueryProvider>
  );
}
