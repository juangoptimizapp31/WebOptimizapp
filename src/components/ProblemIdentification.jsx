import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MousePointerClick, Puzzle, CloudCog, Database, Users, User, Target
} from 'lucide-react';
import ProblemParticleField from './problem/ProblemParticleField';
import ProblemDiagnosticDashboard from './problem/ProblemDiagnosticDashboard';

const problemsList = [
  {
    num: 1,
    icon: MousePointerClick,
    title: 'Procesos manuales',
    desc: 'Tareas repetitivas que consumen tiempo y frenan al equipo.'
  },
  {
    num: 2,
    icon: Puzzle,
    title: 'Herramientas desconectadas',
    desc: 'CRM, formularios, mensajería y reportes sin integración.'
  },
  {
    num: 3,
    icon: CloudCog,
    title: 'Costos cloud sin control',
    desc: 'Infraestructura sobredimensionada o mal optimizada.'
  },
  {
    num: 4,
    icon: Database,
    title: 'Datos dispersos',
    desc: 'Información crítica repartida entre plataformas y hojas de cálculo.'
  },
  {
    num: 5,
    icon: Users,
    title: 'Baja trazabilidad comercial',
    desc: 'Difícil seguimiento de leads, clientes y oportunidades.'
  },
  {
    num: 6,
    icon: User,
    title: 'Dependencia operativa',
    desc: 'La operación depende demasiado de tareas humanas y conocimiento informal.'
  }
];

const ProblemIdentification = () => {
  const [pulseIdx, setPulseIdx] = useState(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Periodic subtle activation pulse on one of the six cards
    const interval = setInterval(() => {
      const targetIdx = Math.floor(Math.random() * problemsList.length);
      setPulseIdx(targetIdx);
      setTimeout(() => setPulseIdx(null), 1200);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="relative w-full min-h-[100vh] min-h-[100svh] flex items-center justify-center overflow-x-hidden pt-16 pb-16 bg-[#020B1B] z-10 problem-v2-background-gradient"
    >
      {/* Background Mesh (Behind Left Cards) */}
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] pointer-events-none z-1">
        <ProblemParticleField />
      </div>

      {/* Two Column Grid */}
      <div className="relative z-10 w-[calc(100%-80px)] max-w-[1540px] mx-auto flex flex-col xl:flex-row items-start justify-between gap-[38px] xl:gap-[48px] h-full">
        
        {/* Left Column: Commercial content (42%) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full xl:w-[42%] flex flex-col z-10"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#246bfd] shadow-[0_0_8px_#246bfd]" />
            <span className="text-[16px] font-semibold text-[#246bfd] tracking-wide block">
              El problema
            </span>
          </div>

          {/* Title */}
          <h2 className="text-[34px] sm:text-[38px] xl:text-[42px] font-extrabold text-[#F8FAFC] leading-[1.18] tracking-tight">
            La tecnología debería acelerar
            <br className="hidden xl:inline" />
            {' '}tu empresa, no volverla más
            <br className="hidden xl:inline" />
            {' '}compleja.
          </h2>

          {/* Description */}
          <p className="text-[17px] sm:text-[18px] text-[#A6B2C6] font-normal leading-[1.45] mt-3.5 mb-6 max-w-[590px]">
            Muchas empresas crecen con procesos manuales, herramientas desconectadas y poca visibilidad operativa. El resultado es más fricción, más costo y menos capacidad de decisión.
          </p>

          {/* Six Problem Cards List */}
          <div className="flex flex-col gap-2.5 w-full">
            {problemsList.map((p, idx) => {
              const IconComponent = p.icon;
              const isPulsing = pulseIdx === idx;

              return (
                <div
                  key={p.num}
                  className="w-full h-[82px] rounded-[12px] px-4 flex items-center gap-3 transition-all duration-300 hover:translate-y-[-2px] group"
                  style={{
                    background: isPulsing 
                      ? 'linear-gradient(145deg, rgba(19, 44, 76, 0.85), rgba(11, 31, 56, 0.90))'
                      : 'linear-gradient(145deg, rgba(14, 36, 66, 0.84), rgba(8, 25, 49, 0.90))',
                    border: isPulsing
                      ? '1px solid rgba(96, 165, 250, 0.38)'
                      : '1px solid rgba(74, 128, 197, 0.16)',
                    boxShadow: '0 12px 30px rgba(0, 8, 25, 0.18), inset 0 1px 0 rgba(91, 150, 226, 0.035)'
                  }}
                >
                  {/* Number Circle */}
                  <div 
                    className="w-7 h-7 rounded-full border flex items-center justify-center text-[13px] font-bold text-slate-400 shrink-0 transition-colors duration-300"
                    style={{ borderColor: 'rgba(64, 133, 224, 0.32)' }}
                  >
                    {p.num}
                  </div>

                  {/* Icon Square Wrapper */}
                  <div className="w-9 h-9 rounded-lg bg-[#07172d] border border-[#246bfd]/20 flex items-center justify-center text-[#246bfd] shrink-0 group-hover:text-[#60a5fa] group-hover:shadow-[0_0_8px_rgba(36,107,253,0.3)] transition-all">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Text Details */}
                  <div className="flex flex-col min-w-0">
                    <span className="text-[14px] xl:text-[15px] font-bold text-white leading-tight">{p.title}</span>
                    <span className="text-[11px] xl:text-[12px] text-[#A6B2C6] leading-snug mt-0.5 truncate">{p.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column: Dashboard (58%) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="w-full xl:w-[58%] flex flex-col gap-4.5 z-10"
        >
          {/* Diagnostic Dashboard */}
          <ProblemDiagnosticDashboard />

          {/* Solution Franja Inferior */}
          <div 
            className="w-full h-[78px] rounded-[14px] px-5 flex items-center gap-3.5 mt-1"
            style={{
              background: 'linear-gradient(145deg, rgba(13, 34, 62, 0.68), rgba(7, 23, 45, 0.78))',
              border: '1px solid rgba(73, 121, 183, 0.22)'
            }}
          >
            <div className="w-9 h-9 rounded-full bg-[#246bfd]/10 flex items-center justify-center text-[#246bfd] shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <p className="text-[14px] xl:text-[15px] font-medium text-white leading-tight">
              Ordenamos la complejidad para recuperar <span className="text-[#60a5fa] font-bold">control, eficiencia y visibilidad.</span>
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ProblemIdentification;
