import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "horizontal" | "stacked" | "mark-only";
  theme?: "dark" | "light" | "white";
  size?: "sm" | "md" | "lg" | "xl";
}

export function IALogoMark({
  className = "w-10 h-10",
}: {
  className?: string;
  showSpeedLines?: boolean;
}) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <Image
        src="/logo-ia.png"
        alt="Logo Impresos Americana"
        width={96}
        height={64}
        priority
        className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(227,6,19,0.3)] transition-transform duration-200 group-hover:scale-105"
      />
    </div>
  );
}

export function IALogo({
  className = "",
  variant = "horizontal",
  size = "md",
}: LogoProps) {
  const sizeMap = {
    sm: { mark: "w-8 h-8", textPrimary: "text-sm", textSub: "text-[10px]" },
    md: { mark: "w-10 h-10", textPrimary: "text-base", textSub: "text-xs" },
    lg: { mark: "w-12 h-12", textPrimary: "text-lg", textSub: "text-sm" },
    xl: { mark: "w-16 h-16", textPrimary: "text-2xl", textSub: "text-base" },
  };

  const { mark, textPrimary, textSub } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <IALogoMark className={mark} />
      {variant !== "mark-only" && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-montserrat font-black tracking-wider uppercase text-white ${textPrimary}`}
          >
            IMPRESOS
          </span>
          <span
            className={`font-montserrat font-bold tracking-[0.22em] uppercase text-white/90 mt-0.5 ${textSub}`}
          >
            AMERICANA
          </span>
        </div>
      )}
    </div>
  );
}
