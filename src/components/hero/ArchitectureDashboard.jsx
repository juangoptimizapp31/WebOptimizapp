import React, { useState, useEffect, useRef } from 'react';
import { Cloud, BrainCircuit, Users, Settings, BarChart3, Eye, Zap, CircleDollarSign, ShieldCheck } from 'lucide-react';
import { MobileSnapCarousel, useMediaQuery } from '../ui/MobileSnapCarousel';

const ArchitectureDashboard = () => {
  const containerRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 767px)');
  
  // Visibility and activity states
  const [isVisible, setIsVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [livePulse, setLivePulse] = useState(false);

  // Card activation states for the coordinated flow
  const [activeCard, setActiveCard] = useState(null);
  const [activeSignal, setActiveSignal] = useState(null);

  // Line chart states
  const [lineData, setLineData] = useState([22, 45, 38, 62, 55, 88]);
  const [hoveredLinePoint, setHoveredLinePoint] = useState(null);
  const [lineEndPulse, setLineEndPulse] = useState(false);

  // Donut states
  const [donutVal, setDonutVal] = useState(68);
  const [donutPulse, setDonutPulse] = useState(false);
  const [isHoveredDonut, setIsHoveredDonut] = useState(false);

  // Bar chart states
  const [barHeights, setBarHeights] = useState([
    { computo: 55, storage: 40, net: 30 },
    { computo: 65, storage: 50, net: 35 },
    { computo: 50, storage: 45, net: 60 },
    { computo: 70, storage: 60, net: 40 },
    { computo: 80, storage: 65, net: 50 },
    { computo: 95, storage: 85, net: 70 }
  ]);
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);
  const [highlightedBarGroup, setHighlightedBarGroup] = useState(null);

  // Refs for timers and intervals to clear them properly
  const timersRef = useRef([]);

  // Add a timer helper
  const addTimeout = (callback, delay) => {
    const id = setTimeout(callback, delay);
    timersRef.current.push(id);
    return id;
  };

  // IntersectionObserver to pause/resume animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle document visibility change
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsVisible(false);
      } else {
        // Double check if element is actually in viewport
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
          setIsVisible(inViewport);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  // Coordinated Real-Time Data Simulation Loop
  useEffect(() => {
    setIsLoaded(true);

    if (!isVisible) return;

    // Prefers-reduced-motion check
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const runCoordinatedCycle = () => {
      // 1. Live indicator pulse
      setLivePulse(true);
      addTimeout(() => setLivePulse(false), 800);

      // 2. Pulse traveling from Cloud -> IA -> CRM
      setActiveCard('cloud');
      
      addTimeout(() => {
        setActiveCard('ia');
      }, 1000);

      addTimeout(() => {
        setActiveCard('crm');
      }, 2000);

      // 3. Line chart data update
      addTimeout(() => {
        const states = [
          [22, 45, 38, 62, 55, 88],
          [25, 35, 48, 55, 68, 86],
          [20, 40, 36, 65, 50, 91]
        ];
        const nextState = states[Math.floor(Math.random() * states.length)];
        setLineData(nextState);
        setLineEndPulse(true);
        addTimeout(() => setLineEndPulse(false), 1200);
      }, 2500);

      // 4. Pulse traveling from CRM -> Automation -> Analytics
      addTimeout(() => {
        setActiveCard('automation');
      }, 3500);

      // 5. Donut chart fluctuation (68% -> 65% -> 68%)
      addTimeout(() => {
        let current = 68;
        const interval = setInterval(() => {
          current -= 1;
          setDonutVal(current);
          if (current <= 64) {
            clearInterval(interval);
            // Count back up to 68
            const upInterval = setInterval(() => {
              current += 1;
              setDonutVal(current);
              if (current >= 68) {
                clearInterval(upInterval);
                setDonutPulse(true);
                addTimeout(() => setDonutPulse(false), 800);
              }
            }, 100);
          }
        }, 100);
      }, 4200);

      addTimeout(() => {
        setActiveCard('analytics');
      }, 5000);

      // 6. Bar chart height fluctuation
      addTimeout(() => {
        const targetMonthIdx = Math.floor(Math.random() * 5); // fluctuate Ene-May, keep Jun high
        setHighlightedBarGroup(targetMonthIdx);
        
        setBarHeights(prev => {
          const next = [...prev];
          const variation = () => Math.floor(Math.random() * 14) - 7; // -7% to +7%
          next[targetMonthIdx] = {
            computo: Math.max(30, Math.min(90, prev[targetMonthIdx].computo + variation())),
            storage: Math.max(25, Math.min(85, prev[targetMonthIdx].storage + variation())),
            net: Math.max(20, Math.min(80, prev[targetMonthIdx].net + variation()))
          };
          return next;
        });

        addTimeout(() => setHighlightedBarGroup(null), 1500);
      }, 6000);

      // 7. Pulse on signals
      addTimeout(() => {
        const signalIds = ['vis', 'auto', 'roi', 'control'];
        const chosen = signalIds[Math.floor(Math.random() * signalIds.length)];
        setActiveSignal(chosen);
        addTimeout(() => setActiveSignal(null), 1500);
      }, 7200);

      // Reset card activity glow
      addTimeout(() => {
        setActiveCard(null);
      }, 8200);
    };

    // Run first cycle immediately
    runCoordinatedCycle();

    // Loop every 10 seconds
    const loopInterval = setInterval(runCoordinatedCycle, 10000);

    return () => {
      clearInterval(loopInterval);
      timersRef.current.forEach(id => clearTimeout(id));
      timersRef.current = [];
    };
  }, [isVisible]);

  // SVG Line Chart coordinates computation
  const getLinePath = () => {
    const points = lineData;
    // Map data points into 100x50 SVG box
    return `M 3 ${50 - points[0] * 0.45} C 22 ${50 - points[1] * 0.45} 41 ${50 - points[2] * 0.45} 60 ${50 - points[3] * 0.45} S 79 ${50 - points[4] * 0.45} 97 ${50 - points[5] * 0.45}`;
  };

  const cards = [
    {
      id: 'cloud',
      icon: Cloud,
      title: 'Cloud',
      desc: 'Infraestructura\nescalable y segura',
      delay: '0.1s'
    },
    {
      id: 'ia',
      icon: BrainCircuit,
      title: 'IA',
      desc: 'Modelos y analítica\ninteligente',
      delay: '0.4s'
    },
    {
      id: 'crm',
      icon: Users,
      title: 'CRM',
      desc: 'Relación y gestión\nde clientes',
      delay: '0.7s'
    },
    {
      id: 'automation',
      icon: Settings,
      title: 'Automation',
      desc: 'Procesos eficientes\ny sin fricción',
      delay: '1.0s'
    },
    {
      id: 'analytics',
      icon: BarChart3,
      title: 'Analytics',
      desc: 'Datos que impulsan\ndecisiones',
      delay: '1.3s'
    }
  ];

  const linePoints = [
    { month: 'Ene', value: '22%' },
    { month: 'Feb', value: '45%' },
    { month: 'Mar', value: '38%' },
    { month: 'Abr', value: '62%' },
    { month: 'May', value: '55%' },
    { month: 'Jun', value: '88%' }
  ];

  const barData = [
    { month: 'Ene', computo: 55, storage: 40, net: 30 },
    { month: 'Feb', computo: 65, storage: 50, net: 35 },
    { month: 'Mar', computo: 50, storage: 45, net: 60 },
    { month: 'Abr', computo: 70, storage: 60, net: 40 },
    { month: 'May', computo: 80, storage: 65, net: 50 },
    { month: 'Jun', computo: 95, storage: 85, net: 70 }
  ];

  const currentPath = getLinePath();


  if (isMobile) {
    return (
      <div 
        ref={containerRef}
        className="relative w-full rounded-[14px] p-4 flex flex-col gap-[32px] text-white font-sans overflow-hidden select-none bg-[#09152b] border border-[#246bfd]/20"
      >
        <div className="absolute top-0 bottom-0 w-[80px] opacity-[0.06] pointer-events-none z-10" style={{ background: 'linear-gradient(to right, transparent, #246BFD, transparent)', animation: 'hero-scan-horizontal 9s infinite linear' }} />
        <style>{`
          @keyframes hero-scan-horizontal { 0% { left: -10%; } 100% { left: 110%; } }
          .live-dot-pulse { animation: live-pulse 2s infinite ease-in-out; }
          @keyframes live-pulse { 0%, 100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.4); opacity: 1; box-shadow: 0 0 8px #246BFD; } }
        `}</style>

        <div className="flex items-center justify-between z-20">
          <h3 className="text-[18px] font-bold tracking-tight text-[#F8FAFC]">Arquitectura integrada para resultados medibles</h3>
          <div className="flex items-center gap-1.5 bg-[#246bfd]/10 border border-[#246bfd]/20 px-2 py-0.5 rounded-full shrink-0">
            <span className={`w-1.5 h-1.5 rounded-full bg-[#60A5FA] live-dot-pulse ${livePulse ? 'brightness-150' : ''}`} />
            <span className="text-[9px] font-bold text-[#60A5FA] uppercase tracking-wider">En vivo</span>
          </div>
        </div>

        {/* 1A. Módulos */}
        <div className="z-20 relative">
          <MobileSnapCarousel cardClassName="w-[calc(100%-38px)] min-w-[286px] h-[210px]" ariaLabel="Módulos">
            {cards.map(card => {
              const IconComponent = card.icon;
              const isGlowing = activeCard === card.id;
              return (
                <div key={card.id} className={`hero-dashboard-card rounded-[13px] p-4 flex flex-col justify-center items-center text-center h-[180px] transition-all duration-300 ${isGlowing ? 'border-[#246bfd]/50 bg-[#132b4c]/78 shadow-[0_0_15px_rgba(36,107,253,0.25)]' : 'bg-[#0f213a] border border-[#246bfd]/20'}`}>
                  <div className={`w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-[#60A5FA] ${isGlowing ? 'brightness-125 shadow-[0_0_10px_rgba(96,165,250,0.4)]' : ''}`}>
                    <IconComponent className={`w-6 h-6 transition-transform duration-500 ${isGlowing && card.id === 'automation' ? 'rotate-180' : ''}`} />
                  </div>
                  <span className="text-[16px] font-bold text-[#F8FAFC] mt-4">{card.title}</span>
                  <span className="text-[13px] text-[#A6B2C6] mt-2 whitespace-pre-line leading-tight">{card.desc}</span>
                  <div className={`w-8 h-[2px] rounded-full mt-4 transition-colors duration-300 ${isGlowing ? 'bg-[#60A5FA]' : 'bg-[#246BFD]/70'}`} />
                </div>
              );
            })}
          </MobileSnapCarousel>
        </div>

        {/* 1B. Métricas */}
        <div className="z-20 relative">
          <h4 className="text-[16px] font-bold text-white mb-4">Métricas operativas</h4>
          <MobileSnapCarousel cardClassName="w-[calc(100%-38px)] min-w-[286px] h-[250px]" ariaLabel="Métricas">
            {/* Panel 1: Línea */}
            <section className="bg-[#102644]/72 border border-[#4d7ebe]/14 rounded-[13px] p-4 h-full flex flex-col">
              <div className="flex justify-between items-start w-full mb-4">
                <span className="text-[14px] font-bold text-[#F8FAFC]">Operación en tiempo real</span>
                <span className="text-[9px] font-semibold text-[#60A5FA] bg-blue-500/10 px-1.5 py-0.5 rounded-full shrink-0">↑ 28% vs. mes anterior</span>
              </div>
              <div className="flex-1 flex items-center relative w-full h-[150px]">
                <div className="text-[9px] text-[#94A3B8] flex flex-col justify-between h-full pr-1.5 border-r border-[#4b78b4]/12 shrink-0">
                  <span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span>
                </div>
                <div className="flex-1 h-full relative pl-1 overflow-visible">
                  <svg className="w-full h-[120px]" viewBox="0 0 100 65" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="realtimeGradMob" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#246bfd" stopOpacity="0.32" /><stop offset="100%" stopColor="#246bfd" stopOpacity="0.0" /></linearGradient>
                    </defs>
                    <line x1="0" y1="12" x2="100" y2="12" stroke="rgba(93, 147, 218, 0.08)" strokeWidth="0.5" />
                    <line x1="0" y1="24" x2="100" y2="24" stroke="rgba(93, 147, 218, 0.08)" strokeWidth="0.5" />
                    <line x1="0" y1="36" x2="100" y2="36" stroke="rgba(93, 147, 218, 0.08)" strokeWidth="0.5" />
                    <line x1="0" y1="48" x2="100" y2="48" stroke="rgba(93, 147, 218, 0.08)" strokeWidth="0.5" />
                    {isLoaded && <path d={`${currentPath} L 97 50 L 3 50 Z`} fill="url(#realtimeGradMob)" style={{ transition: 'd 1s ease-in-out' }} />}
                    {isLoaded && <path d={currentPath} fill="none" stroke="#246bfd" strokeWidth="2.2" strokeLinecap="round" style={{ transition: 'd 1s ease-in-out' }} />}
                    {isLoaded && <circle r="1.8" fill="#60A5FA"><animateMotion dur="4.5s" repeatCount="indefinite" path={currentPath} /></circle>}
                    <text x="3" y="60" fill="#94A3B8" fontSize="6.5" textAnchor="middle">Ene</text><text x="22" y="60" fill="#94A3B8" fontSize="6.5" textAnchor="middle">Feb</text><text x="41" y="60" fill="#94A3B8" fontSize="6.5" textAnchor="middle">Mar</text><text x="60" y="60" fill="#94A3B8" fontSize="6.5" textAnchor="middle">Abr</text><text x="79" y="60" fill="#94A3B8" fontSize="6.5" textAnchor="middle">May</text><text x="97" y="60" fill="#94A3B8" fontSize="6.5" textAnchor="middle">Jun</text>
                  </svg>
                </div>
              </div>
            </section>

            {/* Panel 2: Donut */}
            <section className="bg-[#102644]/72 border border-[#4d7ebe]/14 rounded-[13px] p-4 h-full flex flex-col items-center">
              <span className="text-[14px] font-bold text-[#F8FAFC] self-start w-full">Procesos automatizados</span>
              <div className="relative w-[130px] h-[130px] flex items-center justify-center flex-1 my-2">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(10, 27, 52, 0.5)" strokeWidth="3.2" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#246bfd" strokeWidth="3.2" strokeDasharray={`${donutVal} ${100 - donutVal}`} strokeDashoffset="0" strokeLinecap="round" className={`transition-all duration-300 ${donutPulse ? 'brightness-125' : ''}`} style={{ filter: 'drop-shadow(0 0 4px rgba(36,107,253,0.4))' }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[28px] font-extrabold text-[#F8FAFC] leading-none">{donutVal}%</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#60A5FA] bg-blue-500/10 px-3 py-1 rounded-full text-center shrink-0">
                + 18% vs. trimestre anterior
              </span>
            </section>

            {/* Panel 3: Barras */}
            <section className="bg-[#102644]/72 border border-[#4d7ebe]/14 rounded-[13px] p-4 h-full flex flex-col">
              <div className="flex justify-between items-start w-full">
                <span className="text-[14px] font-bold text-[#F8FAFC]">Uso de la nube</span>
                <div className="flex flex-col gap-1 text-[9px] text-[#A6B2C6] shrink-0">
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#246bfd]" /><span>Cómputo</span></div>
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#45a0ff]" /><span>Alm.</span></div>
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#183a6f]" /><span>Red</span></div>
                </div>
              </div>
              <div className="flex-1 flex items-end justify-between gap-3 mt-4 pb-1 border-b border-[#4b78b4]/12 w-full h-[150px]">
                {barHeights.map((bar, idx) => (
                  <div key={idx} className="flex-1 flex flex-col justify-end items-center h-full gap-[2px]">
                    <div className="w-full flex gap-[1px] items-end h-[85%]">
                      <div className="flex-1 bg-[#246bfd] rounded-t-[1px] transition-all duration-700" style={{ height: isLoaded ? `${bar.computo}%` : '0%' }} />
                      <div className="flex-1 bg-[#45a0ff] rounded-t-[1px] transition-all duration-700" style={{ height: isLoaded ? `${bar.storage}%` : '0%' }} />
                      <div className="flex-1 bg-[#183a6f] rounded-t-[1px] transition-all duration-700" style={{ height: isLoaded ? `${bar.net}%` : '0%' }} />
                    </div>
                    <span className="text-[9px] text-[#94A3B8] mt-2 font-bold">{barData[idx].month}</span>
                  </div>
                ))}
              </div>
            </section>
          </MobileSnapCarousel>
        </div>

        {/* 1C. Señales Clave */}
        <div className="z-20 relative">
          <h4 className="text-[16px] font-bold text-white mb-4">Señales clave</h4>
          <MobileSnapCarousel cardClassName="w-[calc(100%-38px)] min-w-[286px] h-[130px]" ariaLabel="Señales Clave">
            {[
              { id: 'vis', icon: Eye, title: 'Visibilidad operativa', desc: 'Monitorea todo tu entorno tecnológico en tiempo real.' },
              { id: 'auto', icon: Zap, title: 'Automatización', desc: 'Menos tareas manuales, más productividad.' },
              { id: 'roi', icon: CircleDollarSign, title: 'ROI', desc: 'Decisiones basadas en datos que maximizan resultados.' },
              { id: 'control', icon: ShieldCheck, title: 'Control', desc: 'Gobernanza, seguridad y cumplimiento asegurados.' }
            ].map(signal => {
              const IconComp = signal.icon;
              const isActive = activeSignal === signal.id;
              return (
                <div key={signal.id} className={`bg-[#102644]/72 border ${isActive ? 'border-[#60A5FA]/40' : 'border-[#4d7ebe]/14'} rounded-[13px] p-4 h-full flex flex-col transition-all`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-[#0a1b34] flex items-center justify-center ${isActive ? 'border-[#246bfd]/50 text-[#60A5FA] shadow-[0_0_10px_rgba(36,107,253,0.4)]' : 'text-blue-400 border-[#4d7ebe]/12'}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className={`text-[14px] font-bold ${isActive ? 'text-blue-400' : 'text-[#F8FAFC]'}`}>{signal.title}</span>
                  </div>
                  <p className="text-[12px] text-[#94A3B8] leading-relaxed">{signal.desc}</p>
                </div>
              );
            })}
          </MobileSnapCarousel>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full xl:w-[845px] xl:h-[742px] rounded-[14px] hero-dashboard-panel p-4 flex flex-col justify-between text-white font-sans overflow-hidden select-none"
    >
      
      {/* Scanner laser bar running horizontally */}
      <div 
        className="absolute top-0 bottom-0 w-[80px] opacity-[0.06] pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to right, transparent, #246BFD, transparent)',
          animation: 'hero-scan-horizontal 9s infinite linear'
        }}
      />
      
      <style>{`
        @keyframes hero-scan-horizontal {
          0% { left: -10%; }
          100% { left: 110%; }
        }
        .live-dot-pulse {
          animation: live-pulse 2s infinite ease-in-out;
        }
        @keyframes live-pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.4); opacity: 1; box-shadow: 0 0 8px #246BFD; }
        }
      `}</style>

      {/* Header with live data reception indicator */}
      <div className="pl-4 pt-1 mb-2 flex items-center justify-between z-20">
        <h3 className="text-[17px] xl:text-[18px] font-bold tracking-tight text-[#F8FAFC]">
          Arquitectura integrada para resultados medibles
        </h3>
        
        {/* Live reception indicator */}
        <div className="flex items-center gap-1.5 bg-[#246bfd]/10 border border-[#246bfd]/20 px-2 py-0.5 rounded-full mr-2">
          <span className={`w-1.5 h-1.5 rounded-full bg-[#60A5FA] live-dot-pulse ${livePulse ? 'brightness-150' : ''}`} />
          <span className="text-[9px] font-bold text-[#60A5FA] uppercase tracking-wider">En vivo</span>
        </div>
      </div>

      {/* FILA SUPERIOR: Tarjetas conectadas */}
      <div className="relative hero-dashboard-top-row mb-3 z-10">
        {cards.map((card, idx) => {
          const IconComponent = card.icon;
          const isGlowing = activeCard === card.id;
          
          return (
            <React.Fragment key={card.id}>
              {/* Tarjeta */}
              <div 
                className={`hero-dashboard-card rounded-[13px] p-3 xl:p-3.5 flex flex-col justify-between items-center text-center relative z-20 transition-all duration-300 ${
                  isGlowing 
                    ? 'border-[#246bfd]/50 bg-[#132b4c]/78 shadow-[0_0_15px_rgba(36,107,253,0.25)] translate-y-[-2px]' 
                    : 'hero-dashboard-card-hover hover:-translate-y-[3px]'
                }`}
              >
                {/* Icon with breathe glow */}
                <div className={`w-10.5 h-10.5 rounded-xl bg-blue-500/10 flex items-center justify-center text-[#60A5FA] ${isGlowing ? 'brightness-125 shadow-[0_0_10px_rgba(96,165,250,0.4)]' : 'hero-icon-active'}`}>
                  <IconComponent 
                    className={`w-5.5 h-5.5 transition-transform duration-500 ${isGlowing && card.id === 'automation' ? 'rotate-180' : ''}`} 
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center mt-2">
                  <span className="text-[14px] xl:text-[15px] font-bold text-[#F8FAFC] block">{card.title}</span>
                  <span className="text-[10px] xl:text-[11px] text-[#A6B2C6] mt-1 whitespace-pre-line leading-tight">
                    {card.desc}
                  </span>
                </div>
                <div className={`w-8 h-[2px] rounded-full mt-1.5 transition-colors duration-300 ${isGlowing ? 'bg-[#60A5FA]' : 'bg-[#246BFD]/70'}`} />
              </div>

              {/* Conectores */}
              {idx < cards.length - 1 && (
                <div 
                  className="absolute hidden md:flex items-center z-10 pointer-events-none"
                  style={{
                    left: `calc(${(idx + 1) * 20}% - 14px)`,
                    width: '28px',
                    top: '40px',
                    height: '2px'
                  }}
                >
                  <div className="h-[1px] w-full bg-[#4d7ebe]/20 relative">
                    <span className={`absolute -left-0.5 -top-[2px] w-1.5 h-1.5 rounded-full transition-colors duration-300 ${activeCard === card.id ? 'bg-[#60A5FA] scale-125' : 'bg-[#2F74FF]'}`} />
                    <span className={`absolute -right-0.5 -top-[2px] w-1.5 h-1.5 rounded-full transition-colors duration-300 ${activeCard === cards[idx+1].id ? 'bg-[#60A5FA] scale-125' : 'bg-[#2F74FF]'}`} />
                    <span className="hero-pulse-dot" style={{ animationDelay: card.delay }} />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* FILA INTERMEDIA: Tres gráficos distribuidos */}
      <div className="hero-dashboard-metrics mb-3.5 z-10">
        
        {/* PANEL 1: Operación en tiempo real */}
        <section className="hero-dashboard-metric-panel">
          <div className="flex justify-between items-start w-full">
            <span className="text-[13px] xl:text-[14px] font-bold text-[#F8FAFC]">Operación en tiempo real</span>
            <span className="text-[9px] font-semibold text-[#60A5FA] bg-blue-500/10 px-1.5 py-0.5 rounded-full whitespace-nowrap">
              ↑ 28% vs. mes anterior
            </span>
          </div>

          <div className="flex-1 flex items-center relative mt-3 h-[135px] w-full">
            {/* Eje Vertical */}
            <div className="text-[9px] text-[#94A3B8] flex flex-col justify-between h-full pr-1.5 border-r border-[#4b78b4]/12 select-none shrink-0">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>

            {/* Gráfico SVG */}
            <div className="flex-1 h-full relative pl-1 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 100 65" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="realtimeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#246bfd" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#246bfd" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Líneas horizontales de guía */}
                <line x1="0" y1="12" x2="100" y2="12" stroke="rgba(93, 147, 218, 0.08)" strokeWidth="0.5" />
                <line x1="0" y1="24" x2="100" y2="24" stroke="rgba(93, 147, 218, 0.08)" strokeWidth="0.5" />
                <line x1="0" y1="36" x2="100" y2="36" stroke="rgba(93, 147, 218, 0.08)" strokeWidth="0.5" />
                <line x1="0" y1="48" x2="100" y2="48" stroke="rgba(93, 147, 218, 0.08)" strokeWidth="0.5" />
                
                {/* Área bajo la línea con transición CSS */}
                {isLoaded && (
                  <path
                    d={`${currentPath} L 97 50 L 3 50 Z`}
                    fill="url(#realtimeGrad)"
                    style={{ transition: 'd 1s ease-in-out' }}
                  />
                )}
                
                {/* Línea principal */}
                {isLoaded && (
                  <path
                    d={currentPath}
                    fill="none"
                    stroke="#246bfd"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    style={{ transition: 'd 1s ease-in-out' }}
                  />
                )}

                {/* Punto luminoso viajero que recorre la línea nativamente */}
                {isLoaded && (
                  <circle r="1.8" fill="#60A5FA">
                    <animateMotion dur="4.5s" repeatCount="indefinite" path={currentPath} />
                  </circle>
                )}

                {/* Meses en nodos SVG independientes */}
                <text x="3" y="60" fill="#94A3B8" fontSize="6.5" textAnchor="middle">Ene</text>
                <text x="22" y="60" fill="#94A3B8" fontSize="6.5" textAnchor="middle">Feb</text>
                <text x="41" y="60" fill="#94A3B8" fontSize="6.5" textAnchor="middle">Mar</text>
                <text x="60" y="60" fill="#94A3B8" fontSize="6.5" textAnchor="middle">Abr</text>
                <text x="79" y="60" fill="#94A3B8" fontSize="6.5" textAnchor="middle">May</text>
                <text x="97" y="60" fill="#94A3B8" fontSize="6.5" textAnchor="middle">Jun</text>
              </svg>

              {/* Puntos interactivos hoverable */}
              {isLoaded && (
                <div className="absolute inset-0 pl-1 pr-1 pb-[15px] flex items-center justify-between pointer-events-auto">
                  {[
                    { left: '3%', value: lineData[0] },
                    { left: '22%', value: lineData[1] },
                    { left: '41%', value: lineData[2] },
                    { left: '60%', value: lineData[3] },
                    { left: '79%', value: lineData[4] },
                    { left: '97%', value: lineData[5] }
                  ].map((pos, idx) => {
                    const topPercent = 75 - pos.value * 0.65;
                    return (
                      <div
                        key={idx}
                        className="absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer group z-30"
                        style={{ left: pos.left, top: `${topPercent}%` }}
                        onMouseEnter={() => setHoveredLinePoint(idx)}
                        onMouseLeave={() => setHoveredLinePoint(null)}
                      >
                        <div className={`w-2.5 h-2.5 rounded-full bg-[#45A0FF] border border-white/20 transition-all duration-200 group-hover:scale-130 ${idx === 5 && lineEndPulse ? 'animate-ping' : ''}`} />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tooltip */}
              {hoveredLinePoint !== null && (
                <div 
                  className="absolute bg-[#0c1f3a] border border-[#246bfd]/40 rounded px-2 py-1 text-[10px] text-white z-40 shadow-xl pointer-events-none -translate-x-1/2 -translate-y-[45px]"
                  style={{
                    left: `${(hoveredLinePoint / 5) * 82 + 9}%`,
                    top: '72px'
                  }}
                >
                  <span className="font-bold">{linePoints[hoveredLinePoint].month}:</span> {lineData[hoveredLinePoint]}%
                </div>
              )}
            </div>
          </div>
        </section>

        {/* PANEL 2: Procesos automatizados */}
        <section 
          className="hero-dashboard-metric-panel items-center cursor-pointer"
          onMouseEnter={() => setIsHoveredDonut(true)}
          onMouseLeave={() => setIsHoveredDonut(false)}
        >
          <span className="text-[13px] xl:text-[14px] font-bold text-[#F8FAFC] self-start w-full">Procesos automatizados</span>

          <div className="relative w-[105px] h-[105px] xl:w-[115px] xl:h-[115px] flex items-center justify-center flex-1 min-h-0 my-1 hover:brightness-110 transition-all duration-300">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="none"
                stroke="rgba(10, 27, 52, 0.5)"
                strokeWidth="3.2"
              />
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="none"
                stroke="#246bfd"
                strokeWidth="3.2"
                strokeDasharray={`${donutVal} ${100 - donutVal}`}
                strokeDashoffset="0"
                strokeLinecap="round"
                className={`transition-all duration-300 ${donutPulse ? 'brightness-125' : ''}`}
                style={{ filter: 'drop-shadow(0 0 4px rgba(36,107,253,0.4))' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[23px] xl:text-[25px] font-extrabold text-[#F8FAFC] leading-none">{donutVal}%</span>
              {isHoveredDonut && (
                <span className="text-[8px] text-[#60A5FA] mt-1 uppercase font-bold tracking-wider">Activo</span>
              )}
            </div>
          </div>

          <span className="text-[10px] xl:text-[11px] font-bold text-[#60A5FA] bg-blue-500/10 px-2.5 py-0.5 rounded-full text-center shrink-0">
            {isHoveredDonut ? "Procesamiento actualizado" : "+ 18% vs. trimestre anterior"}
          </span>
        </section>

        {/* PANEL 3: Uso de la nube */}
        <section className="hero-dashboard-metric-panel">
          <div className="flex justify-between items-start w-full">
            <span className="text-[13px] xl:text-[14px] font-bold text-[#F8FAFC]">Uso de la nube</span>
            {/* Leyenda */}
            <div className="flex gap-1.5 text-[8.5px] text-[#A6B2C6] mt-0.5 select-none shrink-0">
              <div className="flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#246bfd]" />
                <span>Cómputo</span>
              </div>
              <div className="flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#45a0ff]" />
                <span>Alm.</span>
              </div>
              <div className="flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#183a6f]" />
                <span>Red</span>
              </div>
            </div>
          </div>

          {/* Gráfico de Barras */}
          <div className="flex-1 flex items-end justify-between gap-2 xl:gap-3 mt-4 h-[115px] border-b border-[#4b78b4]/12 pb-1 relative w-full">
            {barHeights.map((bar, idx) => {
              const isHighlighted = highlightedBarGroup === idx || hoveredBarIndex === idx;
              const isOtherHovered = hoveredBarIndex !== null && hoveredBarIndex !== idx;

              return (
                <div 
                  key={idx} 
                  className={`flex-1 flex flex-col justify-end items-center h-full gap-[2px] cursor-pointer group transition-opacity duration-300 ${
                    isOtherHovered ? 'opacity-35' : 'opacity-100'
                  }`}
                  onMouseEnter={() => setHoveredBarIndex(idx)}
                  onMouseLeave={() => setHoveredBarIndex(null)}
                >
                  <div className="w-full flex gap-[1.5px] items-end h-[75%]">
                    <div 
                      className={`flex-1 bg-[#246bfd] rounded-t-[1px] transition-all duration-700 ease-in-out ${isHighlighted ? 'brightness-125 shadow-[0_0_6px_#246bfd]' : ''}`} 
                      style={{ height: isLoaded ? `${bar.computo}%` : '0%' }} 
                    />
                    <div 
                      className={`flex-1 bg-[#45a0ff] rounded-t-[1px] transition-all duration-700 ease-in-out ${isHighlighted ? 'brightness-125 shadow-[0_0_6px_#45a0ff]' : ''}`} 
                      style={{ height: isLoaded ? `${bar.storage}%` : '0%' }} 
                    />
                    <div 
                      className={`flex-1 bg-[#183a6f] rounded-t-[1px] transition-all duration-700 ease-in-out ${isHighlighted ? 'brightness-125' : ''}`} 
                      style={{ height: isLoaded ? `${bar.net}%` : '0%' }} 
                    />
                  </div>
                  <span className="text-[8.5px] text-[#94A3B8] mt-1 select-none font-bold">{barData[idx].month}</span>
                </div>
              );
            })}

            {/* Tooltip */}
            {hoveredBarIndex !== null && (
              <div 
                className="absolute bg-[#0c1f3a] border border-[#45a0ff]/40 rounded px-2.5 py-1.5 text-[9px] text-white z-40 shadow-xl pointer-events-none -translate-x-1/2 -translate-y-[85px]"
                style={{
                  left: `${(hoveredBarIndex / 5) * 80 + 10}%`,
                  top: '65px'
                }}
              >
                <div className="font-bold text-center border-b border-white/10 pb-0.5 mb-1">{barData[hoveredBarIndex].month}</div>
                <div className="flex justify-between gap-2 text-[#60A5FA]">Cómputo: <span className="text-white">{barHeights[hoveredBarIndex].computo}%</span></div>
                <div className="flex justify-between gap-2 text-[#45A0FF]">Alm: <span className="text-white">{barHeights[hoveredBarIndex].storage}%</span></div>
                <div className="flex justify-between gap-2 text-[#94A3B8]">Red: <span className="text-white">{barHeights[hoveredBarIndex].net}%</span></div>
              </div>
            )}
          </div>
        </section>

      </div>

      {/* FILA INFERIOR: Señales clave */}
      <div className="bg-[#102644]/72 border border-[#4d7ebe]/14 rounded-[13px] p-4 flex flex-col justify-between relative z-10">
        <span className="text-[13px] xl:text-[14px] font-bold text-[#F8FAFC] mb-3 self-start">Señales clave</span>

        <div className="hero-dashboard-bottom-row">
          {/* Bloque 1 */}
          <div className={`flex flex-col gap-2 pr-2 transition-all duration-300 hover:translate-y-[-2px] group ${activeSignal === 'vis' ? 'translate-y-[-2px]' : ''}`}>
            <div className="flex items-center gap-2">
              <div className={`w-8.5 h-8.5 rounded-lg bg-[#0a1b34] flex items-center justify-center text-blue-400 border border-[#4d7ebe]/12 group-hover:border-[#246bfd]/40 group-hover:text-[#60A5FA] group-hover:shadow-[0_0_8px_rgba(36,107,253,0.3)] transition-all ${
                activeSignal === 'vis' ? 'border-[#246bfd]/50 text-[#60A5FA] shadow-[0_0_10px_rgba(36,107,253,0.4)]' : ''
              }`}>
                <Eye className="w-4.5 h-4.5" />
              </div>
              <span className={`text-[12px] xl:text-[13px] font-bold transition-colors ${activeSignal === 'vis' ? 'text-blue-400' : 'text-[#F8FAFC] group-hover:text-blue-400'}`}>
                Visibilidad operativa
              </span>
            </div>
            <p className="text-[10px] xl:text-[11px] text-[#94A3B8] leading-relaxed pl-0.5">
              Monitorea todo tu entorno tecnológico en tiempo real.
            </p>
          </div>

          {/* Bloque 2 */}
          <div className={`flex flex-col gap-2 px-2 border-l transition-all duration-300 hover:translate-y-[-2px] group ${activeSignal === 'auto' ? 'translate-y-[-2px]' : ''} ${activeSignal === 'auto' ? 'border-[#60A5FA]/40' : 'border-[#5584c2]/16'}`}>
            <div className="flex items-center gap-2">
              <div className={`w-8.5 h-8.5 rounded-lg bg-[#0a1b34] flex items-center justify-center text-blue-400 border border-[#4d7ebe]/12 group-hover:border-[#246bfd]/40 group-hover:text-[#60A5FA] group-hover:shadow-[0_0_8px_rgba(36,107,253,0.3)] transition-all ${
                activeSignal === 'auto' ? 'border-[#246bfd]/50 text-[#60A5FA] shadow-[0_0_10px_rgba(36,107,253,0.4)]' : ''
              }`}>
                <Zap className="w-4.5 h-4.5" />
              </div>
              <span className={`text-[12px] xl:text-[13px] font-bold transition-colors ${activeSignal === 'auto' ? 'text-blue-400' : 'text-[#F8FAFC] group-hover:text-blue-400'}`}>
                Automatización
              </span>
            </div>
            <p className="text-[10px] xl:text-[11px] text-[#94A3B8] leading-relaxed pl-0.5">
              Menos tareas manuales, más productividad.
            </p>
          </div>

          {/* Bloque 3 */}
          <div className={`flex flex-col gap-2 px-2 border-l transition-all duration-300 hover:translate-y-[-2px] group ${activeSignal === 'roi' ? 'translate-y-[-2px]' : ''} ${activeSignal === 'roi' ? 'border-[#60A5FA]/40' : 'border-[#5584c2]/16'}`}>
            <div className="flex items-center gap-2">
              <div className={`w-8.5 h-8.5 rounded-lg bg-[#0a1b34] flex items-center justify-center text-blue-400 border border-[#4d7ebe]/12 group-hover:border-[#246bfd]/40 group-hover:text-[#60A5FA] group-hover:shadow-[0_0_8px_rgba(36,107,253,0.3)] transition-all ${
                activeSignal === 'roi' ? 'border-[#246bfd]/50 text-[#60A5FA] shadow-[0_0_10px_rgba(36,107,253,0.4)]' : ''
              }`}>
                <CircleDollarSign className="w-4.5 h-4.5" />
              </div>
              <span className={`text-[12px] xl:text-[13px] font-bold transition-colors ${activeSignal === 'roi' ? 'text-blue-400' : 'text-[#F8FAFC] group-hover:text-blue-400'}`}>
                ROI
              </span>
            </div>
            <p className="text-[10px] xl:text-[11px] text-[#94A3B8] leading-relaxed pl-0.5">
              Decisiones basadas en datos que maximizan resultados.
            </p>
          </div>

          {/* Bloque 4 */}
          <div className={`flex flex-col gap-2 px-2 border-l transition-all duration-300 hover:translate-y-[-2px] group ${activeSignal === 'control' ? 'translate-y-[-2px]' : ''} ${activeSignal === 'control' ? 'border-[#60A5FA]/40' : 'border-[#5584c2]/16'}`}>
            <div className="flex items-center gap-2">
              <div className={`w-8.5 h-8.5 rounded-lg bg-[#0a1b34] flex items-center justify-center text-blue-400 border border-[#4d7ebe]/12 group-hover:border-[#246bfd]/40 group-hover:text-[#60A5FA] group-hover:shadow-[0_0_8px_rgba(36,107,253,0.3)] transition-all ${
                activeSignal === 'control' ? 'border-[#246bfd]/50 text-[#60A5FA] shadow-[0_0_10px_rgba(36,107,253,0.4)]' : ''
              }`}>
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
              <span className={`text-[12px] xl:text-[13px] font-bold transition-colors ${activeSignal === 'control' ? 'text-blue-400' : 'text-[#F8FAFC] group-hover:text-blue-400'}`}>
                Control
              </span>
            </div>
            <p className="text-[10px] xl:text-[11px] text-[#94A3B8] leading-relaxed pl-0.5">
              Gobernanza, seguridad y cumplimiento asegurados.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ArchitectureDashboard;
