"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  MessageCircle,
  Sparkles,
  Box,
} from "lucide-react";
import { IALogo } from "./Logo";
import { SampleBoxModal } from "./SampleBoxModal";
import { CommandMenu } from "./CommandMenu";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [cartCount] = useState(1); // Sample kit in cart

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global Cmd+K / Ctrl+K Omnibox shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandMenuOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Servicios", href: "/servicios" },
    { name: "Proyectos", href: "/proyectos" },
    { name: "Cotizador", href: "/cotizador", isHighlight: true },
    { name: "Catálogo", href: "/catalogo" },
    { name: "Plantillas", href: "/plantillas" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#121212]/92 backdrop-blur-md border-b border-white/10 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link
              href="/"
              className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] rounded-lg p-1"
            >
              <IALogo size="md" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-white font-semibold"
                        : "text-zinc-300 hover:text-white"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#E30613] rounded-full shadow-[0_0_8px_#E30613]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons & CTA */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Search Omnibox Trigger */}
              <button
                type="button"
                onClick={() => setCommandMenuOpen(true)}
                aria-label="Buscar producto o sustrato (Cmd+K)"
                className="p-2 text-zinc-300 hover:text-white hover:bg-white/5 rounded-full transition-colors flex items-center gap-1.5"
                title="Buscador global Omnibox (Cmd+K)"
              >
                <Search className="w-5 h-5" />
                <span className="hidden xl:inline-flex items-center text-[10px] font-mono bg-white/10 text-zinc-300 px-1.5 py-0.5 rounded border border-white/10">
                  ⌘K
                </span>
              </button>

              {/* Sample Box Kit Trigger */}
              <button
                type="button"
                onClick={() => setSampleModalOpen(true)}
                aria-label="Solicitar kit de muestras físicas (Sample Box)"
                className="relative p-2 text-zinc-300 hover:text-white hover:bg-white/5 rounded-full transition-colors flex items-center gap-1.5"
                title="Pedir Muestrario Físico a Domicilio"
              >
                <Box className="w-5 h-5 text-[#E30613]" />
                <span className="hidden xl:inline text-xs font-mono text-zinc-300">Muestras</span>
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#E30613] text-[10px] font-bold text-white rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* High-impact Americana Red CTA Button */}
              <Link
                href="/cotizador"
                className="relative group overflow-hidden bg-[#E30613] hover:bg-[#C50510] text-white font-montserrat font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg shadow-[0_0_20px_rgba(227,6,19,0.45)] hover:shadow-[0_0_30px_rgba(227,6,19,0.7)] transition-all duration-300 flex items-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-white/80 group-hover:rotate-12 transition-transform" />
                  Cotizar Ahora
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              </Link>

              {/* Direct WhatsApp Call */}
              <a
                href="https://wa.me/573163200181?text=Hola%20Impresos%20Americana,%20deseo%20asesor%C3%ADa%20para%20un%20proyecto%20gr%C3%A1fico."
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 rounded-lg transition-colors flex items-center justify-center"
                title="Llamar o chatear por WhatsApp (+57 316 320 0181)"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile Hamburger & Actions (Active below 1024px) */}
            <div className="flex lg:hidden items-center space-x-1.5 sm:space-x-2">
              <button
                type="button"
                onClick={() => setCommandMenuOpen(true)}
                className="p-2.5 text-zinc-300 hover:text-white rounded-lg focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Buscar productos (Cmd+K)"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link
                href="/cotizador"
                className="bg-[#E30613] hover:bg-[#C50510] text-white text-xs font-montserrat font-bold px-3 py-2 rounded-lg min-h-[40px] flex items-center"
              >
                Cotizar
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 text-zinc-300 hover:text-white rounded-lg focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Abrir menú de navegación"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay with Safe Area and Smooth Scrolling */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#121212]/98 backdrop-blur-2xl pt-24 px-5 sm:px-6 flex flex-col justify-between pb-8 overflow-y-auto lg:hidden"
          >
            <div className="space-y-4">
              <div className="border-b border-white/10 pb-4 mb-3">
                <p className="text-[11px] font-mono uppercase text-zinc-400 tracking-widest mb-2">
                  Menú Principal
                </p>
                <div className="flex flex-col space-y-1">
                  {navLinks.map((link) => {
                    const isActive =
                      link.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(link.href);

                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-lg sm:text-xl font-montserrat font-bold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-between min-h-[48px] ${
                          isActive
                            ? "text-[#E30613] bg-red-950/20"
                            : "text-zinc-200 hover:bg-white/5"
                        }`}
                      >
                        <span>{link.name}</span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-[#E30613]" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Sample Box Trigger inside mobile menu */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSampleModalOpen(true);
                }}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-left hover:bg-white/10 transition-colors min-h-[48px]"
              >
                <div className="flex items-center gap-2.5">
                  <Box className="w-5 h-5 text-[#E30613]" />
                  <div>
                    <span className="text-xs font-montserrat font-bold text-white block">
                      Pedir Muestrario Físico (Sample Box)
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      Muestras reales a domicilio
                    </span>
                  </div>
                </div>
                <span className="text-xs text-red-400 font-bold">Solicitar →</span>
              </button>

              <div className="bg-[#1E1E24] p-4 rounded-xl border border-white/10">
                <p className="text-[11px] text-zinc-400 mb-1 font-mono uppercase">
                  Atención Directa Cali & Nacional
                </p>
                <a
                  href="tel:+576028854000"
                  className="text-sm font-semibold text-white hover:text-red-400 transition-colors block"
                >
                  PBX Planta: (602) 885-4000
                </a>
                <p className="text-xs text-zinc-400 mt-0.5">Lun - Vie: 7:30 AM - 5:30 PM</p>
              </div>
            </div>

            <div className="space-y-3 pt-6 mt-4 border-t border-white/10">
              <Link
                href="/cotizador"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 bg-[#E30613] hover:bg-[#C50510] text-white font-montserrat font-bold text-center text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(227,6,19,0.4)] flex items-center justify-center min-h-[48px]"
              >
                Configurar Cotización Online
              </Link>
              <a
                href="https://wa.me/573163200181?text=Hola%20Impresos%20Americana,%20deseo%20asesor%C3%ADa%20inmediata."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#1E1E24] hover:bg-[#272730] text-emerald-400 border border-emerald-500/30 font-montserrat font-semibold text-center text-xs rounded-xl flex items-center justify-center gap-2 min-h-[48px]"
              >
                <MessageCircle className="w-4 h-4" />
                Asesoría WhatsApp Inmediata
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Physical Swatchbook Sample Box Modal */}
      <SampleBoxModal
        isOpen={sampleModalOpen}
        onClose={() => setSampleModalOpen(false)}
      />

      {/* Global Omnibox Search Command Menu (Cmd+K) */}
      <CommandMenu
        isOpen={commandMenuOpen}
        onClose={() => setCommandMenuOpen(false)}
        onOpenSampleModal={() => setSampleModalOpen(true)}
      />
    </>
  );
}
