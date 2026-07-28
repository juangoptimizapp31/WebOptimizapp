import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, GitBranch, Users, BotMessageSquare, BarChart3, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ServicesParticleBackground from './services/ServicesParticleBackground';
import { MobileSnapCarousel, useMediaQuery } from './ui/MobileSnapCarousel';
import ServicesBottomCTA from './services/ServicesBottomCTA';

const servicesData = [
  {
    id: 1,
    icon: CreditCard,
    title: "SmartCard",
    desc: "Presencia digital inteligente para presentar servicios, captar contactos y activar seguimiento comercial.",
    tags: ["Captación", "Presencia", "Seguimiento"]
  },
  {
    id: 2,
    icon: GitBranch,
    title: "Automatización",
    desc: "Flujos que conectan formularios, CRM, WhatsApp, correos, tareas y reportes para eliminar fricción operativa.",
    tags: ["Workflows", "Integraciones", "Eficiencia"]
  },
  {
    id: 3,
    icon: Users,
    title: "CRM Inteligente",
    desc: "Gestión de leads, clientes y oportunidades con trazabilidad comercial y visibilidad del pipeline.",
    tags: ["Pipeline", "Leads", "Ventas"]
  },
  {
    id: 4,
    icon: BotMessageSquare,
    title: "Asistente Virtual",
    desc: "Atención 24/7, respuestas frecuentes, captura de datos y calificación de leads con apoyo de IA.",
    tags: ["24/7", "IA", "Atención"]
  },
  {
    id: 5,
    icon: BarChart3,
    title: "Business Analytics",
    desc: "Dashboards y métricas para medir ventas, campañas, operación y comportamiento del cliente.",
    tags: ["Dashboards", "KPIs", "Decisiones"]
  }
];

const ServicesCatalog = () => {
  const [selectedService, setSelectedService] = useState(null);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [pulsingIndex, setPulsingIndex] = useState(0);

  // Auto-pulse animation sequence every 6 seconds
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const interval = setInterval(() => {
      setPulsingIndex((prev) => (prev + 1) % servicesData.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="servicios"
      className="relative w-full min-h-[100vh] min-h-[100svh] flex flex-col justify-between overflow-hidden pt-[135px] pb-[55px] bg-[#020B1B] z-10 services-v2-section"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <style>{`
          .services-v2-section {
            background:
              radial-gradient(circle at 18% 35%, rgba(25, 91, 196, 0.12), transparent 40%),
              radial-gradient(circle at 82% 42%, rgba(27, 100, 220, 0.11), transparent 42%),
              linear-gradient(145deg, #020b1b 0%, #041126 55%, #020918 100%);
          }
        `}</style>
      </div>

      {/* Undulating side wave dots networks */}
      <ServicesParticleBackground />

      {/* Content wrapper */}
      <div className="relative z-10 w-[calc(100%-140px)] max-w-[1480px] mx-auto flex flex-col justify-between h-full flex-grow gap-8">

        {/* Left-Aligned Header Block */}
        <div className="text-left flex flex-col">
          <span className="text-[17px] font-semibold text-[#3b82f6] tracking-wide block mb-3 uppercase">
            Soluciones
          </span>
          <h2 className="text-[42px] sm:text-[45px] xl:text-[50px] font-extrabold text-white leading-[1.2] tracking-tight max-w-[850px]">
            Soluciones concretas para
            <br className="hidden sm:inline" />
            {' '}operación, automatización y crecimiento.
          </h2>
          <p className="text-[18px] sm:text-[20px] text-[#A6B2C6] font-normal leading-[1.55] mt-4.5 max-w-[800px]">
            Cada solución responde a una necesidad real de negocio y puede implementarse de forma independiente o integrada dentro de una estrategia mayor.
          </p>
        </div>

        {/* Conditional Rendering for Grid/Carousel */}
        {isMobile ? (
          <>
            <style dangerouslySetInnerHTML={{
              __html: `
            .service-mobile-card {
              display: flex;
              flex-direction: column;
              align-items: stretch;
              width: 100%;
              min-width: 0;
              height: auto;
              min-height: 390px;
              padding: 24px 20px 20px;
              overflow: hidden;
              box-sizing: border-box;
            }
            .service-mobile-title {
              font-size: 22px;
              line-height: 1.2;
              white-space: normal;
              overflow-wrap: normal;
              word-break: normal;
              width: 100%;
              max-width: 100%;
              min-width: 0;
              box-sizing: border-box;
              margin: 0;
            }
            .service-mobile-desc {
              font-size: 15px;
              line-height: 1.55;
              white-space: normal;
              overflow: visible;
              text-overflow: clip;
              word-break: normal;
              overflow-wrap: break-word;
              width: 100%;
              max-width: 100%;
              min-width: 0;
              box-sizing: border-box;
              margin-top: 12px;
              margin-bottom: 0;
            }
            .service-mobile-tags {
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
              width: 100%;
              max-width: 100%;
              min-width: 0;
              margin-top: auto;
              padding-top: 20px;
            }
            .service-mobile-tag {
              flex: 0 1 auto;
              max-width: 100%;
              min-width: 0;
              white-space: normal;
              overflow-wrap: break-word;
            }
          `}} />
            <MobileSnapCarousel
              ariaLabel="Catálogo de soluciones"
              trackClassName=""
              cardClassName=""
            >
              {servicesData.map((service, index) => {
                const isPulsing = pulsingIndex === index;
                const isHovered = activeCardIndex === index;
                return (
                  <div
                    key={service.id}
                    onMouseEnter={() => setActiveCardIndex(index)}
                    onMouseLeave={() => setActiveCardIndex(null)}
                    onClick={() => setSelectedService(service)}
                    className="relative rounded-2xl transition-all duration-300 hover:translate-y-[-3px] cursor-pointer group select-none service-mobile-card"
                    style={{
                      background: 'linear-gradient(145deg, rgba(13, 35, 65, 0.91), rgba(7, 24, 47, 0.96))',
                      border: isHovered || isPulsing ? '1px solid rgba(96, 165, 250, 0.42)' : '1px solid rgba(71, 127, 198, 0.20)',
                      boxShadow: isHovered || isPulsing
                        ? '0 18px 48px rgba(0, 10, 32, 0.32), 0 0 20px rgba(59, 130, 246, 0.15)'
                        : '0 16px 38px rgba(0, 8, 28, 0.25), inset 0 1px 0 rgba(105, 164, 230, 0.035)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none rounded-2xl" />
                    <div className="flex justify-start">
                      <div
                        className="w-[70px] h-[70px] rounded-full border flex items-center justify-center text-[#246bfd] transition-all duration-300"
                        style={{
                          borderColor: isHovered || isPulsing ? 'rgba(74, 168, 255, 0.65)' : 'rgba(36, 107, 253, 0.3)',
                          background: 'rgba(5, 22, 45, 0.9)',
                          boxShadow: isHovered || isPulsing ? '0 0 15px rgba(36, 107, 253, 0.4)' : 'none'
                        }}
                      >
                        <service.icon className="w-8 h-8 text-[#3b82f6]" />
                      </div>
                    </div>
                    <div className="flex flex-col mt-4">
                      <h3 className="text-white font-bold service-mobile-title">
                        {service.title}
                      </h3>
                      <p className="text-[#A6B2C6] service-mobile-desc">
                        {service.desc}
                      </p>
                    </div>
                    <div className="service-mobile-tags border-t border-white/5">
                      {service.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-[7px] border text-[12px] text-slate-300 font-medium flex items-center justify-center service-mobile-tag"
                          style={{ borderColor: 'rgba(36, 107, 253, 0.22)', background: 'rgba(7, 23, 45, 0.4)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </MobileSnapCarousel>
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-5 items-stretch w-full mt-4">
            {servicesData.map((service, index) => {
              const isPulsing = pulsingIndex === index;
              const isHovered = activeCardIndex === index;

              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveCardIndex(index)}
                  onMouseLeave={() => setActiveCardIndex(null)}
                  onClick={() => setSelectedService(service)}
                  className="relative rounded-2xl p-5 flex flex-col justify-between h-[355px] transition-all duration-300 hover:translate-y-[-3px] cursor-pointer group select-none"
                  style={{
                    background: 'linear-gradient(145deg, rgba(13, 35, 65, 0.91), rgba(7, 24, 47, 0.96))',
                    border: isHovered || isPulsing ? '1px solid rgba(96, 165, 250, 0.42)' : '1px solid rgba(71, 127, 198, 0.20)',
                    boxShadow: isHovered || isPulsing
                      ? '0 18px 48px rgba(0, 10, 32, 0.32), 0 0 20px rgba(59, 130, 246, 0.15)'
                      : '0 16px 38px rgba(0, 8, 28, 0.25), inset 0 1px 0 rgba(105, 164, 230, 0.035)'
                  }}
                >
                  {/* Visual hover sweep line */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none rounded-2xl" />

                  {/* Circular Icon */}
                  <div className="flex justify-start">
                    <div
                      className="w-[74px] h-[74px] rounded-full border flex items-center justify-center text-[#246bfd] transition-all duration-300"
                      style={{
                        borderColor: isHovered || isPulsing ? 'rgba(74, 168, 255, 0.65)' : 'rgba(36, 107, 253, 0.3)',
                        background: 'rgba(5, 22, 45, 0.9)',
                        boxShadow: isHovered || isPulsing ? '0 0 15px rgba(36, 107, 253, 0.4)' : 'none'
                      }}
                    >
                      <service.icon className="w-9 h-9 text-[#3b82f6]" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col mt-4 flex-grow">
                    <h3 className="text-[21px] xl:text-[23px] font-bold text-white leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-[15px] xl:text-[16px] text-[#A6B2C6] leading-[1.55] mt-2.5">
                      {service.desc}
                    </p>
                  </div>

                  {/* Short blue indicator line */}
                  <div
                    className="w-10 h-[2px] rounded-full mt-4 transition-all duration-300"
                    style={{
                      background: '#246bfd',
                      boxShadow: '0 0 8px rgba(36, 107, 253, 0.65)'
                    }}
                  />

                  {/* Bottom tags */}
                  <div className="flex gap-1.5 justify-between mt-5 pt-1 border-t border-white/5">
                    {service.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 h-[30px] rounded-[7px] border text-[12px] text-slate-300 font-medium flex items-center justify-center shrink-0"
                        style={{
                          borderColor: 'rgba(36, 107, 253, 0.22)',
                          background: 'rgba(7, 23, 45, 0.4)'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA horizontal box */}
        <ServicesBottomCTA />

      </div>

      {/* Preserved Dialog detail modal */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-2xl bg-[#0a0f1e] border-white/10 p-0 overflow-hidden shadow-2xl">
          {selectedService && (
            <div className="relative">
              {/* Header image area */}
              <div className="relative h-48 w-full bg-[#07172d] flex items-center justify-start px-8">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] to-transparent opacity-80" />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-blue-500/20 backdrop-blur-md border border-blue-500/30 text-blue-400">
                    <selectedService.icon className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">
                    {selectedService.title}
                  </h2>
                </div>
              </div>

              {/* Description */}
              <div className="p-8">
                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                  {selectedService.desc}
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => {
                      setSelectedService(null);
                      window.dispatchEvent(new CustomEvent('openEvalModal'));
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-6 px-8 rounded-xl flex items-center gap-2 group transition-all"
                  >
                    Solicitar información
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedService(null)}
                    className="border-white/10 hover:bg-white/5 text-gray-400 py-6 px-8 rounded-xl"
                  >
                    Cerrar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </section>
  );
};

export default ServicesCatalog;