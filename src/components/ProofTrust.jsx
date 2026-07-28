import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CircleDollarSign, Clock3, BarChart3, UserRound, Zap, Cloud } from 'lucide-react';
import { MobileSnapCarousel, useMediaQuery } from './ui/MobileSnapCarousel';

import ResultMiniChart from './results/ResultMiniChart';
import ResultsSummaryBar from './results/ResultsSummaryBar';
import ResultsParticleWave from './results/ResultsParticleWave';

const resultsData = [
  {
    id: 'costos',
    title: "Costos optimizados",
    desc: "Identificación de gasto innecesario y mejor uso de recursos cloud.",
    icon: CircleDollarSign
  },
  {
    id: 'procesos',
    title: "Procesos más ágiles",
    desc: "Menor tiempo invertido en tareas manuales y repetitivas.",
    icon: Clock3
  },
  {
    id: 'visibilidad',
    title: "Visibilidad operativa",
    desc: "Tableros y métricas para entender qué está pasando y dónde actuar.",
    icon: BarChart3
  },
  {
    id: 'trazabilidad',
    title: "Trazabilidad comercial",
    desc: "Seguimiento claro de leads, clientes y oportunidades.",
    icon: UserRound
  },
  {
    id: 'automatizacion',
    title: "Automatización útil",
    desc: "Más consistencia en procesos, atención y seguimiento.",
    icon: Zap
  },
  {
    id: 'escalar',
    title: "Base para escalar",
    desc: "Infraestructura, flujos y datos preparados para crecimiento sostenible.",
    icon: Cloud
  }
];

const ProofTrust = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  if (isMobile) {
    return (
      <section className="relative w-full min-h-[100vh] min-h-[100svh] flex flex-col justify-between overflow-x-clip pt-[120px] pb-[40px] bg-[#020B1B] z-10 results-v2-section">
        <div className="absolute inset-0 pointer-events-none z-0">
          <style>{`
            .results-v2-section {
              background:
                radial-gradient(circle at 18% 70%, rgba(23, 89, 194, 0.14), transparent 42%),
                radial-gradient(circle at 78% 40%, rgba(28, 93, 196, 0.08), transparent 44%),
                linear-gradient(145deg, #020b1b 0%, #041126 55%, #020918 100%);
            }
          `}</style>
        </div>

        <ResultsParticleWave />

        <div className="relative z-10 w-full px-4 mx-auto flex flex-col h-full flex-grow">
          <div className="text-center flex flex-col items-center mb-[30px]">
            <span className="text-[14px] font-semibold text-[#3b82f6] tracking-wide block mb-[12px] uppercase">
              Resultados esperados
            </span>
            <h2 className="text-[32px] font-extrabold text-white leading-[1.2] tracking-tight">
              Más control. Más eficiencia. Mejores decisiones.
            </h2>
            <p className="text-[15px] text-[#A6B2C6] font-normal leading-[1.5] mt-[16px]">
              Cada intervención busca generar visibilidad, eficiencia operativa y capacidad de crecimiento medible.
            </p>
          </div>

          <div className="w-full max-w-full relative">
            <MobileSnapCarousel cardClassName="w-[calc(100%-16px)] min-w-[290px] h-[340px]" ariaLabel="Resultados">
              {resultsData.map((item) => (
                <div
                  key={item.id}
                  className="relative rounded-[14px] p-5 h-full flex flex-col group select-none overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, rgba(12, 34, 63, 0.86), rgba(7, 24, 47, 0.94))',
                    border: '1px solid rgba(72, 127, 197, 0.17)',
                    boxShadow: '0 15px 35px rgba(0, 8, 28, 0.20)'
                  }}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-[48px] h-[48px] shrink-0 rounded-full flex items-center justify-center" style={{ background: 'rgba(15, 35, 70, 0.6)', border: '1px solid rgba(59, 130, 246, 0.25)' }}>
                        <item.icon className="w-6 h-6 text-[#3b82f6]" />
                      </div>
                      <h3 className="text-[18px] font-bold text-white leading-tight">{item.title}</h3>
                    </div>
                    <p className="text-[14px] text-[#A6B2C6] leading-relaxed mb-4 flex-grow">{item.desc}</p>
                    <div className="w-full h-[120px] relative mt-auto border-t border-[#487fc5]/20 pt-4 flex items-center justify-center">
                      <ResultMiniChart type={item.id} />
                    </div>
                  </div>
                </div>
              ))}
            </MobileSnapCarousel>
          </div>

          <div className="mt-8">
            <ResultsSummaryBar />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="relative w-full min-h-[100vh] min-h-[100svh] flex flex-col justify-between overflow-x-clip pt-[140px] pb-[55px] bg-[#020B1B] z-10 results-v2-section"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <style>{`
          .results-v2-section {
            background:
              radial-gradient(circle at 18% 70%, rgba(23, 89, 194, 0.14), transparent 42%),
              radial-gradient(circle at 78% 40%, rgba(28, 93, 196, 0.08), transparent 44%),
              linear-gradient(145deg, #020b1b 0%, #041126 55%, #020918 100%);
          }
        `}</style>
      </div>

      {/* Side digital network wave */}
      <ResultsParticleWave />

      {/* Main Content Container */}
      <div className="relative z-10 w-[calc(100%-150px)] max-w-[1375px] mx-auto flex flex-col h-full flex-grow">
        
        {/* Header Center */}
        <div className="text-center flex flex-col items-center mb-[36px]">
          <motion.span 
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[17px] font-semibold text-[#3b82f6] tracking-wide block mb-[18px] uppercase"
          >
            Resultados esperados
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[42px] xl:text-[47px] font-extrabold text-white leading-[1.2] tracking-tight"
          >
            Más control. Más eficiencia. Mejores decisiones.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[19px] xl:text-[20px] text-[#A6B2C6] font-normal leading-[1.5] mt-[20px] max-w-[760px]"
          >
            Cada intervención busca generar visibilidad, eficiencia operativa y capacidad de crecimiento medible. Los resultados dependen del punto de partida y del alcance implementado.
          </motion.p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] w-full relative z-10">
          {resultsData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.08 }}
              className="relative rounded-[14px] p-[23px] h-[170px] transition-all duration-300 hover:translate-y-[-2px] group select-none overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(12, 34, 63, 0.86), rgba(7, 24, 47, 0.94))',
                border: '1px solid rgba(72, 127, 197, 0.17)',
                boxShadow: '0 15px 35px rgba(0, 8, 28, 0.20), inset 0 1px 0 rgba(100, 160, 228, 0.035)'
              }}
            >
              {/* Hover sweep light */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div 
                className="grid h-full items-center gap-[16px]"
                style={{ gridTemplateColumns: '56px minmax(0, 1fr) 145px' }}
              >
                {/* 1. Icon */}
                <div className="flex justify-center shrink-0">
                  <div 
                    className="w-[56px] h-[56px] rounded-full flex items-center justify-center transition-all duration-300 group-hover:border-[rgba(59,130,246,0.5)] group-hover:shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                    style={{
                      background: 'rgba(15, 35, 70, 0.6)',
                      border: '1px solid rgba(59, 130, 246, 0.25)',
                    }}
                  >
                    <item.icon className="w-[29px] h-[29px] text-[#3b82f6] group-hover:text-[#60a5fa] transition-colors" />
                  </div>
                </div>

                {/* 2. Text */}
                <div className="flex flex-col justify-center text-left">
                  <h3 className="text-[18px] font-bold text-white leading-[1.25]">
                    {item.title}
                  </h3>
                  <p className="text-[15px] text-[#A6B2C6] leading-[1.5] mt-[8px]">
                    {item.desc}
                  </p>
                </div>

                {/* 3. Mini Chart */}
                <div className="h-full w-full flex items-center justify-end shrink-0 group-hover:brightness-110 transition-all duration-500">
                  <div className="w-[145px] h-[75px] relative">
                    <ResultMiniChart type={item.id} />
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Benefits Bar */}
        <ResultsSummaryBar />

      </div>
    </section>
  );
};

export default ProofTrust;