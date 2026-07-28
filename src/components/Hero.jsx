import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EvaluarModal from "@/components/EvaluarModal";
import EvaluarModal2 from "@/components/EvaluarModal2";
import EvaluarModal3 from "@/components/EvaluarModal3";
import HologramHeroBackground from "@/components/HologramHeroBackground";
import ArchitectureDashboard from "./hero/ArchitectureDashboard";

const Hero = () => {
  const [step, setStep] = useState(0);
  const waveRef = useRef(null);
  const containerRef = useRef(null);

  // Listen to Navbar global event
  useEffect(() => {
    const open = () => setStep(1);
    window.addEventListener("openEvalModal", open);
    return () => window.removeEventListener("openEvalModal", open);
  }, []);

  // Filter and forward events to AnimatedParticleWave
  const handleContainerMouseMove = (e) => {
    if (!waveRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if within lower-left area (approx. 52% width, bottom 40% height)
    const isLowerLeft = x < rect.width * 0.52 && y > rect.height * 0.6;
    const isInteractive = e.target.closest('button, a, input, select, textarea, [role="button"]');

    if (isLowerLeft && !isInteractive) {
      waveRef.current.handleMouseMove(e.clientX, e.clientY);
    } else {
      waveRef.current.handleMouseLeave();
    }
  };

  const handleContainerMouseLeave = () => {
    if (waveRef.current) {
      waveRef.current.handleMouseLeave();
    }
  };

  const handleContainerClick = (e) => {
    if (!waveRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const isLowerLeft = x < rect.width * 0.52 && y > rect.height * 0.6;
    const isInteractive = e.target.closest('button, a, input, select, textarea, [role="button"]');

    if (isLowerLeft && !isInteractive) {
      waveRef.current.triggerExplosion(e.clientX, e.clientY);
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleContainerMouseMove}
      onMouseLeave={handleContainerMouseLeave}
      onClick={handleContainerClick}
      className="relative w-full min-h-[100vh] min-h-[100svh] flex items-center justify-center overflow-x-hidden pt-[125px] pb-12 xl:py-0 bg-[#020B1B] z-10"
    >
      {/* Background radial gradients & mesh */}
      <HologramHeroBackground ref={waveRef} />

      {/* Expanded Grid Wrapper */}
      <div className="relative z-10 w-[calc(100%-64px)] max-w-[1680px] mx-auto flex flex-col xl:flex-row items-start justify-between gap-8 xl:gap-12 h-full">
        
        {/* Left Column: Commercial content (44%) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full xl:w-[44%] pt-4 xl:pt-[185px] flex flex-col z-20"
        >
          {/* Eyebrow */}
          <span className="text-[17px] font-medium text-[#2F74FF] mb-[22px] tracking-wide block">
            Cloud · IA · Automatización · Datos
          </span>

          {/* Title - exactly three lines in desktop */}
          <h1 className="text-[34px] sm:text-[42px] xl:text-[45px] font-extrabold text-[#F8FAFC] leading-[1.28] tracking-tight">
            Arquitectura Cloud, IA y
            <br className="hidden xl:inline" />
            {' '}automatización para empresas
            <br className="hidden xl:inline" />
            {' '}que necesitan crecer con control.
          </h1>

          {/* Description */}
          <p className="text-[18px] sm:text-[20px] text-[#A6B2C6] font-normal leading-[1.55] mt-[26px] max-w-[620px]">
            Diagnosticamos, ordenamos y optimizamos tu operación tecnológica para reducir complejidad, automatizar procesos y convertir datos en decisiones de negocio.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 mt-[35px] mb-[45px]">
            <Button
              onClick={() => setStep(1)}
              className="w-full sm:w-[236px] h-[58px] rounded-[11px] bg-[#246BFD] hover:translate-y-[-1px] text-white font-semibold text-[16px] shadow-lg shadow-[#246BFD]/20 border-none transition-all duration-300"
            >
              Evaluar mi escenario
            </Button>
            <a
              href="#soluciones"
              className="w-full sm:w-[220px] h-[58px] rounded-[11px] border border-[#246BFD]/50 hover:border-[#60A5FA] hover:bg-[#246BFD]/5 flex items-center justify-center text-[#246BFD] hover:text-[#60A5FA] font-semibold text-[16px] transition-all duration-300"
            >
              Ver soluciones
            </a>
          </div>

          {/* Bottom Indicators - Single line distribution in desktop */}
          <div className="flex flex-wrap xl:flex-nowrap items-center justify-between w-full gap-x-4 gap-y-3">
            {[
              "Diagnóstico inicial",
              "Hoja de ruta",
              "Implementación por etapas",
              "Optimización continua"
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-2 text-white shrink-0">
                <CheckCircle2 className="w-[18px] h-[18px] text-[#246BFD] fill-[#246BFD]/10" />
                <span className="text-[13px] xl:text-[14px] font-medium text-slate-300">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Dashboard (56%) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="w-full xl:w-[56%] pt-4 xl:pt-[145px] flex justify-end z-20"
        >
          <ArchitectureDashboard />
        </motion.div>
      </div>

      {/* Preservation of original modals and flow */}
      <EvaluarModal
        open={step === 1}
        setOpen={(v) => !v && setStep(0)}
        onNext={(d) => { console.log("Paso 1:", d); setStep(2); }}
      />
      <EvaluarModal2
        open={step === 2}
        setOpen={(v) => !v && setStep(0)}
        onBack={() => setStep(1)}
        onNext={(d) => { console.log("Paso 2:", d); setStep(3); }}
      />
      <EvaluarModal3
        open={step === 3}
        setOpen={(v) => !v && setStep(0)}
        onBack={() => setStep(2)}
        onSubmit={(d) => { console.log("Paso 3:", d); setStep(0); }}
      />
    </section>
  );
};

export default Hero;
