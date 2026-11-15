"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Boxes } from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";

interface ProductHighlight {
  name: string;
  category: string;
  image: string;
  spec: string;
  minQty: string;
}

export function ProductShowcase() {
  const products: ProductHighlight[] = [
    {
      name: "Termo Digital LED 500ml",
      category: "Bebidas & Tecnología",
      image: "/images/real/termo-aislado.jpg",
      spec: "Sensor táctil de temperatura en tapa • Acero inoxidable doble pared",
      minQty: "Desde 25 uds",
    },
    {
      name: "Libretas Ejecutivas Soft-Touch",
      category: "Escritura & Papelería",
      image: "/images/real/libretas-colores.jpg",
      spec: "Pasta dura con tacto aterciopelado • 8 colores corporativos disponibles",
      minQty: "Desde 50 uds",
    },
    {
      name: "Esferos Metálicos con Grabado Láser",
      category: "Artículos de Escritorio",
      image: "/images/real/esferos-metalicos.jpg",
      spec: "Cuerpo de aluminio anodizado • Marcación láser de alta precisión",
      minQty: "Desde 100 uds",
    },
    {
      name: "Kit Corporativo & Cajas Rígidas",
      category: "Empaques de Bienvenida",
      image: "/images/real/kit-corporativo.jpg",
      spec: "Caja rígida imantada con nido interior • Termo, libreta y esfero a juego",
      minQty: "Desde 20 uds",
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-zinc-200/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E30613] font-bold mb-2">
              <Boxes className="w-3.5 h-3.5" />
              <span>CATÁLOGO DE PRODUCTOS & MERCHANDISING</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-montserrat font-black uppercase text-zinc-950 tracking-tight">
              ARTÍCULOS CON MARCA CORPORATIVA
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-xl">
              Referencias en inventario listas para marcar con serigrafía, tampografía, sublimación o grabado láser directo.
            </p>
          </div>

          <Link
            href="/catalogo"
            onClick={() => triggerHaptic(8)}
            className="inline-flex items-center justify-center gap-2 text-xs font-montserrat font-bold uppercase tracking-wider text-[#E30613] hover:text-[#C50510] transition-colors shrink-0 py-2.5 px-4.5 rounded-xl bg-red-50 hover:bg-red-100/70 border border-red-200 min-h-[44px] w-full sm:w-auto shadow-xs"
          >
            <span>Explorar catálogo completo (+50 referencias)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Real Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item, idx) => (
            <Link
              key={idx}
              href="/catalogo"
              onClick={() => triggerHaptic(6)}
              className="group rounded-3xl bg-zinc-50/60 border border-zinc-200/80 hover:border-zinc-300 transition-all duration-300 p-5 flex flex-col justify-between hover:bg-white hover:shadow-lg"
            >
              <div>
                {/* Real Product Image Stage */}
                <div className="relative h-48 w-full rounded-2xl bg-white border border-zinc-200/70 overflow-hidden mb-4 flex items-center justify-center p-3 shadow-inner">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[10px] font-mono text-emerald-800 font-bold shadow-xs">
                    {item.minQty}
                  </div>
                </div>

                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-1 font-semibold">
                  {item.category}
                </span>

                <h3 className="font-montserrat font-bold text-sm text-zinc-950 group-hover:text-[#E30613] transition-colors mb-2 leading-snug">
                  {item.name}
                </h3>

                <p className="text-[11px] text-zinc-600 leading-relaxed font-sans mb-4">
                  {item.spec}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-200/60 flex items-center justify-between text-[11px] font-mono text-[#E30613] group-hover:text-[#C50510] transition-colors font-bold uppercase">
                <span>Ver detalles</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
