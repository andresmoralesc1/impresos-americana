"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <main className="w-full min-h-screen">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
      <MobileStickyBar />
      <FloatingWhatsApp />
    </>
  );
}
