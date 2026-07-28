import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Inicio", href: "#inicio" },
    { label: "Servicios", href: "#soluciones" },
    { label: "Soluciones", href: "#propuesta" },
    { label: "Método", href: "#beneficios" },
    { label: "Casos de uso", href: "#confianza" },
    { label: "Contacto", href: "#contacto" },
  ];

  const handleEvaluar = () => {
    setMobileOpen(false);
    window.dispatchEvent(new CustomEvent("openEvalModal"));
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent flex justify-center w-full"
    >
      {/* ── Expanded Navbar Bar ─────────────────────────────── */}
      <div className="w-[calc(100%-56px)] max-w-[1680px] h-[110px] lg:h-[120px] flex items-center justify-between mx-auto">
        
        {/* LOGO + BRAND */}
        <div className="flex items-center min-w-0">
          <img
            src="https://i.imgur.com/bAdU5VB.png"
            alt="OptimizApp Solutions SAS"
            className="w-[275px] h-[82px] object-contain"
            style={{ filter: 'drop-shadow(0 0 6px rgba(59,130,246,0.20))' }}
          />
        </div>

        {/* NAV LINKS — centered and well-distributed */}
        <nav className="hidden xl:flex items-center justify-center gap-10">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="
                text-[15px] xl:text-[16px] font-semibold text-slate-300
                transition-all duration-300
                hover:text-[#4A93FF] hover:-translate-y-[1px]
              "
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          {/* CTA button */}
          <Button
            onClick={handleEvaluar}
            className="
              hidden sm:flex
              w-[226px] h-[52px]
              rounded-[13px]
              bg-[#246BFD]
              text-white font-semibold text-[15px]
              shadow-lg shadow-[#246BFD]/25
              hover:translate-y-[-2px]
              transition-all duration-300
              border-none
            "
          >
            Evaluar mi escenario
          </Button>

          {/* Hamburger — mobile / tablet */}
          <button
            className="xl:hidden p-2 text-white hover:text-[#4A93FF] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menú"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ────────────────────────────────────── */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="xl:hidden absolute top-[100px] left-4 right-4 rounded-2xl bg-[#060d1f]/95 backdrop-blur-xl border border-[#4d7ebe]/14 shadow-xl overflow-hidden"
        >
          <nav className="flex flex-col p-4 gap-1">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl text-slate-300 hover:text-blue-400 hover:bg-white/5 transition-all font-semibold"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={handleEvaluar}
              className="mt-2 w-full h-[52px] rounded-xl bg-[#246BFD] text-white font-semibold text-center"
            >
              Evaluar mi escenario
            </button>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
