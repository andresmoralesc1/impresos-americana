import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BentoGrid } from "@/components/BentoGrid";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import { RealProductsCatalog } from "@/components/RealProductsCatalog";
import { FinishComparator } from "@/components/FinishComparator";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { DielineTemplates } from "@/components/DielineTemplates";
import { ProcessSection } from "@/components/ProcessSection";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#121212] text-white selection:bg-[#E30613] selection:text-white pb-16 lg:pb-0">
      {/* Navigation & Header */}
      <Navbar />

      {/* Main Commercial Platform Experience */}
      <main>
        {/* 1. Hero Section with 3D Mockups & Faceted Backdrop */}
        <Hero />

        {/* 2. Bento Grid Showcase ('Nuestro Trabajo en Acción' matching Image 2) */}
        <BentoGrid />

        {/* 3. Live Interactive Quote Configurator with 3D WebGL Orbit & COP Pricing */}
        <QuoteCalculator />

        {/* 4. Real Products Catalog & Official PDF Downloads Center */}
        <RealProductsCatalog />

        {/* 5. Interactive Finish Comparator (Matte vs. Spot UV Slider) */}
        <FinishComparator />

        {/* 6. Proven Retail ROI & Industrial Case Studies */}
        <CaseStudiesSection />

        {/* 7. Prepress Template Center & Mechanical Dieline Downloads */}
        <DielineTemplates />

        {/* 8. Industrial Capabilities & Colombian Substrate Matrix */}
        <CapabilitiesSection />

        {/* 9. Industrial Workflow & Trust Pipeline */}
        <ProcessSection />
      </main>

      {/* Footer with DIAN Electronic Invoicing & Local Cali Address */}
      <Footer />

      {/* Mobile Floating Sticky Conversion Bar */}
      <MobileStickyBar />

      {/* Persistent Floating WhatsApp Help & Direct Sales Button */}
      <FloatingWhatsApp />
    </div>
  );
}
