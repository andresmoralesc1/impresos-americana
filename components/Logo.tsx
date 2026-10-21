import React from "react";

interface LogoProps {
  className?: string;
  variant?: "horizontal" | "stacked" | "mark-only";
  theme?: "dark" | "light" | "white";
  size?: "sm" | "md" | "lg" | "xl";
}

export function IALogoMark({
  className = "w-10 h-10",
  showSpeedLines = true,
}: {
  className?: string;
  showSpeedLines?: boolean;
}) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_10px_rgba(227,6,19,0.3)]"
      >
        {/* Speed / dynamic accent lines in red */}
        {showSpeedLines && (
          <g opacity="0.85">
            <line
              x1="30"
              y1="140"
              x2="55"
              y2="115"
              stroke="#E30613"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="20"
              y1="150"
              x2="45"
              y2="125"
              stroke="#E30613"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <line
              x1="155"
              y1="38"
              x2="180"
              y2="14"
              stroke="#E30613"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="165"
              y1="48"
              x2="190"
              y2="24"
              stroke="#E30613"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Lowercase 'i' element: Red circular dot */}
        <circle cx="78" cy="44" r="14" fill="#E30613" />

        {/* Lowercase 'i' stem: Slanted red bar with rounded corners */}
        <path
          d="M62 66L42 114C40.5 117.5 42.5 121.5 46.5 122.5L62 126C65.5 127 69 124.5 70.5 121L90 73C91.5 69.5 89.5 65.5 85.5 64.5L70 61C66.5 60 63 62.5 62 66Z"
          fill="#E30613"
        />

        {/* Uppercase 'A' geometric body */}
        <path
          d="M96 28C99 23 105 20 111 20H132C140 20 147 25 151 32L182 88C185 94 185 101 182 107L167 132C163 138 156 142 148 142H88C80 142 74 136 74 128V126C74 121 78 116 83 116H142L154 94H114L105 110H86L116 52H128L144 80H160L135 36H114L96 28Z"
          fill="#FFFFFF"
          className="transition-colors duration-200"
        />

        {/* Inner triangular counter-space of 'A' */}
        <path
          d="M125 56L142 82H118L125 56Z"
          fill="#121212"
        />
      </svg>
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
