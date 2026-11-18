"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, MessageCircle, Box } from "lucide-react";
import { IALogo } from "./Logo";
import { SampleBoxModal } from "./SampleBoxModal";
import { CommandMenu } from "./CommandMenu";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [sampleModalOpen, setSampleModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Global Keyboard shortcuts: Cmd+K / Ctrl+K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandMenuOpen((prev) => !prev);
      } else if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Servicios", href: "/servicios" },
    { name: "Proyectos", href: "/proyectos" },
    { name: "Catálogo", href: "/catalogo" },
    { name: "Plantillas", href: "/plantillas" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? "h-14 sm:h-16 bg-white/90 backdrop-blur-md border-b border-zinc-200/70 shadow-xs"
            : "h-16 sm:h-18 bg-white/70 backdrop-blur-sm border-b border-zinc-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] rounded-lg transition-transform"
            aria-label="Impresos Americana - Inicio"
          >
            <IALogo size="md" theme="light" />
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Navegación principal"
            className="hidden lg:flex items-center space-x-1 xl:space-x-2"
          >
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-150 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] ${
                    isActive
                      ? "text-zinc-950 font-semibold"
                      : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#E30613] rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Clean Search + Minimalist CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Minimalist Search Button */}
            <button
              type="button"
              onClick={() => setCommandMenuOpen(true)}
              aria-label="Buscar producto o sustrato (Cmd+K)"
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-500 hover:text-zinc-900 bg-zinc-100/60 hover:bg-zinc-100 rounded-full border border-zinc-200/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]"
              title="Buscador global Omnibox (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-xs font-normal text-zinc-500">Buscar</span>
              <kbd className="inline-flex items-center text-[10px] font-mono text-zinc-400 bg-white px-1.5 py-0.5 rounded border border-zinc-200/80 leading-none">
                ⌘K
              </kbd>
            </button>

            {/* Minimalist Primary CTA */}
            <Link
              href="/cotizador"
              className="inline-flex items-center justify-center px-4.5 py-2 text-xs font-montserrat font-bold uppercase tracking-wider text-white bg-[#E30613] hover:bg-[#C50510] rounded-full transition-all duration-200 shadow-xs hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E30613]"
            >
              Cotizar
            </Link>
          </div>

          {/* Mobile Actions: Clean Search + Hamburger */}
          <div className="flex lg:hidden items-center space-x-1">
            <button
              type="button"
              onClick={() => setCommandMenuOpen(true)}
              className="p-2 text-zinc-600 hover:text-zinc-950 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Buscar productos (Cmd+K)"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-800 hover:text-zinc-950 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={mobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación móvil"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl pt-20 px-6 flex flex-col justify-between pb-8 overflow-y-auto lg:hidden shadow-2xl"
          >
            <div className="space-y-4">
              <div className="border-b border-zinc-100 pb-4 mb-2">
                <p className="text-[10px] font-mono uppercase text-zinc-400 tracking-widest mb-2 font-semibold">
                  Navegación
                </p>
                <div className="flex flex-col space-y-1">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={pathname === "/" ? "page" : undefined}
                    className={`text-base font-montserrat font-bold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-between min-h-[44px] ${
                      pathname === "/"
                        ? "text-[#E30613] bg-red-50/70"
                        : "text-zinc-800 hover:bg-zinc-50"
                    }`}
                  >
                    <span>Inicio</span>
                    {pathname === "/" && <span className="w-1.5 h-1.5 rounded-full bg-[#E30613]" />}
                  </Link>

                  {navLinks.map((link) => {
                    const isActive = pathname.startsWith(link.href);

                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        aria-current={isActive ? "page" : undefined}
                        className={`text-base font-montserrat font-bold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-between min-h-[44px] ${
                          isActive
                            ? "text-[#E30613] bg-red-50/70"
                            : "text-zinc-800 hover:bg-zinc-50"
                        }`}
                      >
                        <span>{link.name}</span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#E30613]" />}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Sample Box Trigger */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSampleModalOpen(true);
                }}
                className="w-full p-3 rounded-xl bg-zinc-50/80 border border-zinc-200/80 flex items-center justify-between text-left hover:bg-zinc-100 transition-colors min-h-[48px]"
              >
                <div className="flex items-center gap-2.5">
                  <Box className="w-4 h-4 text-[#E30613]" />
                  <div>
                    <span className="text-xs font-montserrat font-bold text-zinc-900 block">
                      Pedir Muestrario Físico (Sample Box)
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      Muestras reales a domicilio en Colombia
                    </span>
                  </div>
                </div>
                <span className="text-xs text-[#E30613] font-bold">Pedir →</span>
              </button>

              <div className="bg-zinc-50/80 p-3.5 rounded-xl border border-zinc-200/80 text-xs">
                <p className="text-[10px] text-zinc-400 mb-0.5 font-mono uppercase font-semibold">
                  Atención Directa Cali & Nacional
                </p>
                <a
                  href="tel:+576028854000"
                  className="font-semibold text-zinc-800 hover:text-[#E30613] transition-colors block"
                >
                  PBX: (602) 885-4000
                </a>
                <p className="text-[11px] text-zinc-500 mt-0.5">Lun - Vie: 7:30 AM - 5:30 PM</p>
              </div>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-zinc-100">
              <Link
                href="/cotizador"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-[#E30613] hover:bg-[#C50510] text-white font-montserrat font-bold text-center text-xs uppercase tracking-wider rounded-xl shadow-xs flex items-center justify-center min-h-[44px]"
              >
                Configurar Cotización Online
              </Link>
              <a
                href="https://wa.me/573163200181?text=Hola%20Impresos%20Americana,%20deseo%20asesor%C3%ADa%20inmediata."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-montserrat font-semibold text-center text-xs rounded-xl flex items-center justify-center gap-2 min-h-[44px]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                Asesoría WhatsApp
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
