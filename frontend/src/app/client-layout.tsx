"use client";

import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      {children}
    </SidebarProvider>
  );
}