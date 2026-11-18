"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Share2, Check } from "lucide-react";
import { motion } from "framer-motion";
import { triggerHaptic } from "@/lib/haptics";

interface PageHeaderProps {
  badge: string;
  title: string;
  description: string;
  breadcrumbs: { label: string; href?: string }[];
}

export function PageHeader({ badge, title, description, breadcrumbs }: PageHeaderProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    triggerHaptic(10);
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-b from-zinc-50/90 via-white to-zinc-50/40 border-b border-zinc-200/80">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-red-500/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumbs & Share Row */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 flex-wrap">
            <Link href="/" className="hover:text-zinc-950 transition-colors">
              Inicio
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-zinc-950 transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-zinc-900 font-semibold">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono text-zinc-500 hover:text-zinc-900 bg-white hover:bg-zinc-100 border border-zinc-200 transition-all shadow-2xs"
            title="Copiar enlace de esta página"
            aria-label="Copiar enlace de esta página"
          >
            {copiedLink ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Copiado</span>
              </>
            ) : (
              <>
                <Share2 className="w-3 h-3 text-zinc-400" />
                <span>Compartir</span>
              </>
            )}
          </button>
        </div>

        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[11px] font-mono font-bold text-red-800 mb-4 shadow-2xs"
        >
          <span className="w-2 h-2 rounded-full bg-[#E30613] animate-pulse" />
          {badge}
        </motion.div>

        {/* Title & Description */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black uppercase text-zinc-950 tracking-tight leading-tight max-w-4xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-3 text-zinc-600 text-sm sm:text-base max-w-2xl leading-relaxed font-normal"
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
}
