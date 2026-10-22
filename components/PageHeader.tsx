"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  badge: string;
  title: string;
  description: string;
  breadcrumbs: { label: string; href?: string }[];
}

export function PageHeader({ badge, title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="relative pt-32 pb-16 overflow-hidden bg-faceted-pattern border-b border-white/10">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-[#E30613]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumbs */}
        <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            Inicio
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-zinc-200 font-semibold">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-[11px] font-mono font-bold text-red-300 mb-4 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#E30613] animate-pulse" />
          {badge}
        </div>

        {/* Title & Description */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black uppercase text-white tracking-tight leading-tight max-w-4xl">
          {title}
        </h1>
        <p className="mt-3 text-zinc-300 text-sm sm:text-base max-w-2xl leading-relaxed font-normal">
          {description}
        </p>
      </div>
    </div>
  );
}
