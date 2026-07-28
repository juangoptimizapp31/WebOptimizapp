import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Shield, BarChart3, ArrowUpRight, Search, Map, Cog, TrendingUp, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MethodParticleWave from './work-method/MethodParticleWave';
import { MobileSnapCarousel, useMediaQuery } from './ui/MobileSnapCarousel';

const WorkMethod = () => {
  const [activeStep, setActiveStep] = useState(0);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);

  // Auto-progression sequence loop for the steps (Diagnóstico -> Roadmap -> Implementación -> Optimización)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !isVisible) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2800);

    return () => clearInterval(interval);
  }, [isVisible]);

  // Visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleDiagnostico = () => {
    window.dispatchEvent(new CustomEvent('openEvalModal'));
  };

  const stepsData = [
    {
      id: 1,
      title: "Diagnóstico",
      desc: "Evaluamos procesos, herramientas, datos e infraestructura para identificar oportunidades de mejora.",
      icon: Search
    },
    {
      id: 2,
      title: "Roadmap",
      desc: "Priorizamos iniciativas por impacto, esfuerzo, dependencia y retorno esperado.",
      icon: Map
    },
    {
      id: 3,
      title: "Implementación",
      desc: "Ejecutamos por fases con entregables claros, integración progresiva y validación continua.",
      icon: Cog
    },
    {
      id: 4,
      title: "Optimización",
      desc: "Medimos, ajustamos y escalamos con base en datos operativos y comerciales.",
      icon: TrendingUp
    }
  ];

  const principles = [
    { label: "Quick wins", icon: Zap },
    { label: "Gobernanza", icon: Shield },
    { label: "Medición continua", icon: BarChart3 },
    { label: "Escalabilidad", icon: ArrowUpRight }
  ];

  return (
    <section 
      ref={containerRef}
      id="contacto"
      className="relative w-full min-h-[100vh] min-h-[100svh] flex flex-col justify-between overflow-hidden pt-[145px] pb-[40px] bg-[#020B1B] z-10 work-method-v2-section"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <style>{`
          .work-method-v2-section {
            background:
              radial-gradient(circle at 18% 48%, rgba(28, 91, 190, 0.13), transparent 42%),
              radial-gradient(circle at 76% 46%, rgba(29, 91, 185, 0.08), transparent 45%),
              linear-gradient(145deg, #020b1b 0%, #041126 55%, #020918 100%);
          }
        `}</style>
      </div>

      {/* Side digital network wave */}
      <MethodParticleWave />

      {/* Content wrapper */}
      <div className="relative z-10 w-[calc(100%-120px)] max-w-[1510px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-[75px] items-stretch flex-grow">
        
        {/* Left Column (40%) */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[480px]">
          <div>
            <span className="text-[17px] font-semibold text-[#3b82f6] tracking-wide block mb-5 uppercase">
              Método de trabajo
            </span>
            <h2 className="text-[44px] sm:text-[48px] xl:text-[50px] font-extrabold text-white leading-[1.2] tracking-tight">
              Un proceso claro para
              <br />
              transformar complejidad
              <br />
              en ejecución.
            </h2>
            <p className="text-[19px] sm:text-[21px] text-[#A6B2C6] font-normal leading-[1.5] mt-5">
              No implementamos tecnología al azar. Trabajamos por etapas para reducir riesgo, acelerar entregables y construir resultados sostenibles.
            </p>
          </div>

          {/* Principles Panel */}
          <div 
            className="w-full rounded-[17px] p-6 flex flex-col justify-between h-[290px] mt-6 border select-none"
            style={{
              background: 'linear-gradient(145deg, rgba(12, 34, 64, 0.88), rgba(7, 24, 47, 0.94))',
              borderColor: 'rgba(74, 130, 200, 0.20)'
            }}
          >
            {principles.map((p, i) => (
              <div 
                key={p.label}
                className="flex items-center justify-between py-2 border-b border-blue-500/10 last:border-0 hover:bg-blue-500/5 px-2 rounded-lg transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <p.icon 
                    className="w-7 h-7 text-[#246bfd] transition-all group-hover:scale-110" 
                    style={{ filter: 'drop-shadow(0 0 5px rgba(36,107,253,0.3))' }}
                  />
                  <span className="text-[18px] xl:text-[20px] font-semibold text-white">
                    {p.label}
                  </span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-500 opacity-0 group-hover:opacity-100 transition-all" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (60%) */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-6">
          {isMobile ? (
            <>
            <style dangerouslySetInnerHTML={{__html: `
              .method-mobile-card {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                min-width: 0;
                max-width: 100%;
                min-height: 360px;
                height: auto;
                padding: 28px 22px 30px;
                box-sizing: border-box;
                overflow: hidden;
                text-align: center;
              }
              .method-mobile-title {
                width: 100%;
                max-width: 100%;
                margin: 0 0 12px;
                font-size: 24px;
                line-height: 1.2;
                text-align: center;
                white-space: normal;
                overflow: visible;
                text-overflow: clip;
                word-break: normal;
              }
              .method-mobile-description {
                width: 100%;
                max-width: 100%;
                margin: 0;
                font-size: 15px;
                line-height: 1.55;
                text-align: center;
                white-space: normal;
                overflow: visible;
                text-overflow: clip;
                overflow-wrap: break-word;
              }
              .method-mobile-cta-wrapper {
                width: 100%;
                display: flex;
                justify-content: center;
                margin-top: 30px;
                padding-bottom: 20px;
                position: relative;
                z-index: 10;
              }
              .method-mobile-cta-btn {
                width: min(100%, 320px);
                min-height: 56px;
                height: auto;
                padding: 14px 18px;
              }
            `}} />
            <div className="w-full relative max-w-full">
              <MobileSnapCarousel 
                ariaLabel="Pasos del Método de Trabajo" 
                trackClassName=""
                cardClassName=""
              >
                {stepsData.map((step, index) => {
                  const isActive = activeStep === index;
                  return (
                    <div
                      key={step.id}
                      onClick={() => setActiveStep(index)}
                      className="relative rounded-2xl transition-all duration-300 hover:translate-y-[-2px] cursor-pointer z-10 group method-mobile-card"
                      style={{
                        background: isActive 
                          ? 'linear-gradient(145deg, rgba(14, 38, 72, 0.88), rgba(9, 28, 56, 0.94))'
                          : 'linear-gradient(145deg, rgba(12, 32, 61, 0.82), rgba(7, 23, 46, 0.91))',
                        border: isActive 
                          ? '1px solid rgba(96, 165, 250, 0.35)' 
                          : '1px solid rgba(73, 125, 194, 0.15)'
                      }}
                    >
                      <div 
                        className="w-[52px] h-[52px] shrink-0 rounded-full flex items-center justify-center border text-[24px] font-semibold transition-all duration-300 mb-[18px]"
                        style={{
                          background: '#041126',
                          borderColor: isActive ? '#60a5fa' : 'rgba(36, 107, 253, 0.35)',
                          color: '#fff',
                          boxShadow: isActive ? '0 0 14px rgba(96, 165, 250, 0.5)' : 'none'
                        }}
                      >
                        {step.id}
                      </div>

                      <div 
                        className="w-[86px] h-[86px] shrink-0 rounded-full flex items-center justify-center border transition-all duration-300 mb-[24px]"
                        style={{
                          borderColor: isActive ? 'rgba(74, 168, 255, 0.65)' : 'rgba(36, 107, 253, 0.25)',
                          background: 'rgba(5, 22, 45, 0.9)',
                          boxShadow: isActive ? '0 0 15px rgba(36, 107, 253, 0.4)' : 'none'
                        }}
                      >
                        <step.icon className="w-10 h-10 text-[#3b82f6]" />
                      </div>

                      <h3 className="text-white font-bold method-mobile-title">
                        {step.title}
                      </h3>
                      <p className="text-[#A6B2C6] method-mobile-description">
                        {step.desc}
                      </p>
                    </div>
                  );
                })}
              </MobileSnapCarousel>

              {/* Action button correctly extracted OUTSIDE the carousel tracks and controls */}
              <div className="method-mobile-cta-wrapper">
                <Button
                  onClick={handleDiagnostico}
                  className="method-mobile-cta-btn rounded-[12px] bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[17px] flex items-center justify-center gap-2 transition-all hover:translate-y-[-1px] shadow-[0_4px_16px_rgba(37,99,235,0.32)] whitespace-normal h-auto leading-tight text-center"
                >
                  <CalendarDays className="w-5 h-5 shrink-0 text-white" />
                  <span>Solicitar diagnóstico inicial</span>
                </Button>
              </div>
            </div>
            </>
          ) : (
            <div className="relative flex flex-col gap-3">
              
              {/* Connecting Vertical Line behind numbers */}
              <div 
                className="absolute left-[28px] top-6 bottom-6 w-[2px] z-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, #246bfd 0%, rgba(36,107,253,0.15) 100%)',
                  boxShadow: '0 0 6px rgba(36, 107, 253, 0.45)'
                }}
              />

              {/* Steps loop */}
              {stepsData.map((step, index) => {
                const isActive = activeStep === index;
                
                return (
                  <div
                    key={step.id}
                    onClick={() => setActiveStep(index)}
                    className="relative rounded-2xl p-5 pl-1 flex items-center justify-start h-[145px] transition-all duration-300 hover:translate-y-[-2px] cursor-pointer z-10 group"
                    style={{
                      background: isActive 
                        ? 'linear-gradient(145deg, rgba(14, 38, 72, 0.88), rgba(9, 28, 56, 0.94))'
                        : 'linear-gradient(145deg, rgba(12, 32, 61, 0.82), rgba(7, 23, 46, 0.91))',
                      border: isActive 
                        ? '1px solid rgba(96, 165, 250, 0.35)' 
                        : '1px solid rgba(73, 125, 194, 0.15)'
                    }}
                  >
                    <div className="grid grid-cols-12 items-center w-full gap-4">
                      
                      {/* Circle number (Col-span 2) */}
                      <div className="col-span-2 flex justify-center z-10">
                        <div 
                          className="w-[56px] h-[56px] rounded-full flex items-center justify-center border text-[28px] font-semibold transition-all duration-300"
                          style={{
                            background: '#041126',
                            borderColor: isActive ? '#60a5fa' : 'rgba(36, 107, 253, 0.35)',
                            color: '#fff',
                            boxShadow: isActive ? '0 0 14px rgba(96, 165, 250, 0.5)' : 'none'
                          }}
                        >
                          {step.id}
                        </div>
                      </div>

                      {/* Circle Icon (Col-span 3) */}
                      <div className="col-span-3 flex justify-center">
                        <div 
                          className="w-[96px] h-[96px] rounded-full flex items-center justify-center border transition-all duration-300"
                          style={{
                            borderColor: isActive ? 'rgba(74, 168, 255, 0.65)' : 'rgba(36, 107, 253, 0.25)',
                            background: 'rgba(5, 22, 45, 0.9)',
                            boxShadow: isActive ? '0 0 15px rgba(36, 107, 253, 0.4)' : 'none'
                          }}
                        >
                          <step.icon className="w-10 h-10 text-[#3b82f6]" />
                        </div>
                      </div>

                      {/* Text values (Col-span 7) */}
                      <div className="col-span-7 flex flex-col justify-center text-left">
                        <h3 className="text-[24px] font-bold text-white leading-tight">
                          {step.title}
                        </h3>
                        <p className="text-[17px] text-[#A6B2C6] leading-[1.45] mt-1.5">
                          {step.desc}
                        </p>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Action button */}
          {!isMobile && (
            <div className="flex justify-center mt-3">
              <Button
                onClick={handleDiagnostico}
                className="w-full max-w-[335px] h-[58px] rounded-[12px] bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[18px] flex items-center justify-center gap-3 transition-all hover:translate-y-[-1px] shadow-[0_4px_16px_rgba(37,99,235,0.32)]"
              >
                <CalendarDays className="w-5 h-5 text-white" />
                Solicitar diagnóstico inicial
              </Button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default WorkMethod;
