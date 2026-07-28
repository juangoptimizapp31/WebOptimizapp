import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, ClipboardList, MessageCircle, Phone, 
  Users, Megaphone, Table, Receipt, Headphones, BarChart3, 
  Unlink, TriangleAlert, Crosshair, TrendingDown, Clock3, Eye 
} from 'lucide-react';
import { MobileSnapCarousel, useMediaQuery } from '../ui/MobileSnapCarousel';

const ProblemDiagnosticDashboard = () => {
  const containerRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const diagramRef = useRef(null);
  
  // Visibility states
  const [isVisible, setIsVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Interactive hovers
  const [hoveredSource, setHoveredSource] = useState(null);
  const [hoveredSystem, setHoveredSystem] = useState(null);
  const [hoveredResult, setHoveredResult] = useState(null);
  const [hoveredCentral, setHoveredCentral] = useState(false);

  // Card flash sweep animation triggers (for sweep-active class)
  const [sweptCard, setSweptCard] = useState(null); // 'web', 'crm', etc.

  // Mouse radial glow
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isMouseOverDiagram, setIsMouseOverDiagram] = useState(false);

  // Telemetry updates / highlights from cycles
  const [unlinkStatus, setUnlinkStatus] = useState('blue'); // 'blue', 'flash-red', 'flash-blue'
  const [highlightedSystem, setHighlightedSystem] = useState(null);
  const [highlightedResult, setHighlightedResult] = useState(null);
  
  // Multiple concurrent traveling particles
  const [activeParticles, setActiveParticles] = useState([
    { id: 0, pathIdx: 0, delay: 0 },
    { id: 1, pathIdx: 5, delay: 400 },
    { id: 2, pathIdx: 10, delay: 800 },
    { id: 3, pathIdx: 15, delay: 1200 },
    { id: 4, pathIdx: 22, delay: 1600 },
    { id: 5, pathIdx: 31, delay: 2000 }
  ]);

  // Metrics states (interpolated changes but values fixed: 68%, 2.4, -38%)
  const [metricFriccionData, setMetricFriccionData] = useState([38, 34, 32, 35, 42, 49, 51, 48, 40]);
  const [metricTiempoData, setMetricTiempoData] = useState([20, 25, 23, 28, 22, 29, 27, 24, 28]);
  const [metricVisibilidadData, setMetricVisibilidadData] = useState([40, 36, 45, 38, 42, 39, 48, 44, 42]);
  
  const [pulseFriccion, setPulseFriccion] = useState(false);
  const [pulseTiempo, setPulseTiempo] = useState(false);
  const [pulseVisibilidad, setPulseVisibilidad] = useState(false);

  const timersRef = useRef([]);

  const addTimeout = (callback, delay) => {
    const id = setTimeout(callback, delay);
    timersRef.current.push(id);
    return id;
  };

  // Coordinates & Connections list (X, Y based on viewBox 760x360)
  const connections = [
    // Web / Landing (0) -> CRM, Marketing, Hojas, BI
    { id: 0, fromType: 'source', fromId: 0, toType: 'system', toId: 'crm', path: "M 75 45 C 130 45, 170 45, 225 45" },
    { id: 1, fromType: 'source', fromId: 0, toType: 'system', toId: 'marketing', path: "M 75 45 C 160 45, 280 45, 405 45" },
    { id: 2, fromType: 'source', fromId: 0, toType: 'system', toId: 'hojas', path: "M 75 45 C 140 45, 160 135, 225 145" },
    { id: 3, fromType: 'source', fromId: 0, toType: 'system', toId: 'bi', path: "M 75 45 C 160 70, 260 180, 405 245" },
    
    // Formularios (1) -> CRM, Hojas, Facturación, BI
    { id: 4, fromType: 'source', fromId: 1, toType: 'system', toId: 'crm', path: "M 75 125 C 130 125, 170 55, 225 45" },
    { id: 5, fromType: 'source', fromId: 1, toType: 'system', toId: 'hojas', path: "M 75 125 C 130 125, 170 145, 225 145" },
    { id: 6, fromType: 'source', fromId: 1, toType: 'system', toId: 'facturacion', path: "M 75 125 C 180 125, 280 145, 405 145" },
    { id: 7, fromType: 'source', fromId: 1, toType: 'system', toId: 'bi', path: "M 75 125 C 180 125, 280 245, 405 245" },

    // WhatsApp (2) -> CRM, Marketing, Soporte, Hojas
    { id: 8, fromType: 'source', fromId: 2, toType: 'system', toId: 'crm', path: "M 75 205 C 140 205, 160 65, 225 45" },
    { id: 9, fromType: 'source', fromId: 2, toType: 'system', toId: 'marketing', path: "M 75 205 C 170 205, 280 110, 405 45" },
    { id: 10, fromType: 'source', fromId: 2, toType: 'system', toId: 'soporte', path: "M 75 205 C 130 205, 170 245, 225 245" },
    { id: 11, fromType: 'source', fromId: 2, toType: 'system', toId: 'hojas', path: "M 75 205 C 130 205, 170 155, 225 145" },

    // Llamadas (3) -> CRM, Soporte, Hojas, BI
    { id: 12, fromType: 'source', fromId: 3, toType: 'system', toId: 'crm', path: "M 75 285 C 140 285, 160 100, 225 45" },
    { id: 13, fromType: 'source', fromId: 3, toType: 'system', toId: 'soporte', path: "M 75 285 C 130 285, 170 245, 225 245" },
    { id: 14, fromType: 'source', fromId: 3, toType: 'system', toId: 'hojas', path: "M 75 285 C 130 285, 170 165, 225 145" },
    { id: 15, fromType: 'source', fromId: 3, toType: 'system', toId: 'bi', path: "M 75 285 C 180 285, 280 245, 405 245" },

    // Systems -> Unlink
    { id: 16, fromType: 'system', fromId: 'crm', toType: 'unlink', path: "M 315 55 Q 365 70 365 140" },
    { id: 17, fromType: 'system', fromId: 'marketing', toType: 'unlink', path: "M 415 55 Q 365 70 365 140" },
    { id: 18, fromType: 'system', fromId: 'hojas', toType: 'unlink', path: "M 315 155 H 335" },
    { id: 19, fromType: 'system', fromId: 'facturacion', toType: 'unlink', path: "M 415 155 H 395" },
    { id: 20, fromType: 'system', fromId: 'soporte', toType: 'unlink', path: "M 315 255 Q 365 240 365 210" },
    { id: 21, fromType: 'system', fromId: 'bi', toType: 'unlink', path: "M 415 255 Q 365 240 365 210" },

    // Systems -> Results
    { id: 22, fromType: 'system', fromId: 'crm', toType: 'result', toId: 0, path: "M 315 45 C 400 30, 480 30, 595 45" },
    { id: 23, fromType: 'system', fromId: 'crm', toType: 'result', toId: 2, path: "M 315 45 C 400 90, 480 180, 595 205" },

    { id: 24, fromType: 'system', fromId: 'marketing', toType: 'result', toId: 0, path: "M 505 45 C 530 45, 560 45, 595 45" },
    { id: 25, fromType: 'system', fromId: 'marketing', toType: 'result', toId: 1, path: "M 505 45 C 530 60, 550 100, 595 125" },
    { id: 26, fromType: 'system', fromId: 'marketing', toType: 'result', toId: 3, path: "M 505 45 C 550 80, 520 220, 595 285" },

    { id: 27, fromType: 'system', fromId: 'hojas', toType: 'result', toId: 0, path: "M 315 155 C 390 120, 470 70, 595 45" },
    { id: 28, fromType: 'system', fromId: 'hojas', toType: 'result', toId: 2, path: "M 315 155 C 410 155, 470 185, 595 205" },

    { id: 29, fromType: 'system', fromId: 'facturacion', toType: 'result', toId: 1, path: "M 505 155 C 530 155, 550 135, 595 125" },
    { id: 30, fromType: 'system', fromId: 'facturacion', toType: 'result', toId: 2, path: "M 505 155 C 530 170, 550 190, 595 205" },

    { id: 31, fromType: 'system', fromId: 'soporte', toType: 'result', toId: 1, path: "M 315 255 C 400 255, 470 160, 595 125" },
    { id: 32, fromType: 'system', fromId: 'soporte', toType: 'result', toId: 3, path: "M 315 255 C 400 255, 470 270, 595 285" },

    { id: 33, fromType: 'system', fromId: 'bi', toType: 'result', toId: 2, path: "M 505 245 C 530 245, 550 220, 595 205" },
    { id: 34, fromType: 'system', fromId: 'bi', toType: 'result', toId: 3, path: "M 505 245 C 530 255, 550 275, 595 285" }
  ];

  // Mouse move handler for coordinate glow
  const handleMouseMove = (e) => {
    if (!diagramRef.current) return;
    const rect = diagramRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 760,
      y: ((e.clientY - rect.top) / rect.height) * 360
    });
  };

  // IntersectionObserver
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

    return () => observer.disconnect();
  }, []);

  // Coordinated Telemetry Cycle Loop
  useEffect(() => {
    setIsLoaded(true);
    if (!isVisible) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let cycleIndex = 0;

    const runTelemetryCycle = () => {
      const step = cycleIndex % 4;

      if (step === 0) {
        // CICLO 1: Web -> CRM -> Unlink (fail) -> Datos Duplicados -> Visibilidad Limitada
        setHighlightedSystem('crm');
        addTimeout(() => setUnlinkStatus('flash-red'), 1200);
        addTimeout(() => setUnlinkStatus('blue'), 1750);
        addTimeout(() => setHighlightedResult(0), 2200);
        addTimeout(() => {
          setPulseVisibilidad(true);
          setMetricVisibilidadData([40, 32, 45, 30, 42, 35, 48, 38, 45]);
          addTimeout(() => setPulseVisibilidad(false), 900);
        }, 3000);
        addTimeout(() => {
          setHighlightedResult(null);
          setHighlightedSystem(null);
        }, 4500);

      } else if (step === 1) {
        // CICLO 2: Formularios -> Hojas -> Unlink -> Decisiones parciales -> Visibilidad
        setHighlightedSystem('hojas');
        addTimeout(() => setUnlinkStatus('flash-red'), 1200);
        addTimeout(() => setUnlinkStatus('blue'), 1750);
        addTimeout(() => setHighlightedResult(2), 2200);
        addTimeout(() => {
          setPulseVisibilidad(true);
          setMetricVisibilidadData([38, 35, 42, 33, 45, 36, 49, 41, 43]);
          addTimeout(() => setPulseVisibilidad(false), 900);
        }, 3000);
        addTimeout(() => {
          setHighlightedResult(null);
          setHighlightedSystem(null);
        }, 4500);

      } else if (step === 2) {
        // CICLO 3: WhatsApp -> CRM + Soporte -> Respuestas lentas -> Tiempo perdido
        setHighlightedSystem('soporte');
        addTimeout(() => setHighlightedResult(1), 1800);
        addTimeout(() => {
          setPulseTiempo(true);
          setMetricTiempoData([20, 29, 23, 31, 22, 33, 27, 28, 30]);
          addTimeout(() => setPulseTiempo(false), 900);
        }, 2600);
        addTimeout(() => {
          setHighlightedResult(null);
          setHighlightedSystem(null);
        }, 4000);

      } else if (step === 3) {
        // CICLO 4: Llamadas -> Soporte + BI -> Oportunidades perdidas -> Fricción operativa
        setHighlightedSystem('bi');
        addTimeout(() => setHighlightedResult(3), 1800);
        addTimeout(() => {
          setPulseFriccion(true);
          setMetricFriccionData([40, 36, 33, 37, 45, 52, 50, 46, 39]);
          addTimeout(() => setPulseFriccion(false), 900);
        }, 2600);
        addTimeout(() => {
          setHighlightedResult(null);
          setHighlightedSystem(null);
        }, 4000);
      }

      cycleIndex += 1;
    };

    runTelemetryCycle();
    const interval = setInterval(runTelemetryCycle, 6000);

    return () => {
      clearInterval(interval);
      timersRef.current.forEach(id => clearTimeout(id));
      timersRef.current = [];
    };
  }, [isVisible]);

  // Hover filters for highlighting connections
  const isPathHighlighted = (conn, idx) => {
    // If a specific card is hovered, highlight connections linked directly to it
    if (hoveredSource !== null) {
      return conn.fromType === 'source' && conn.fromId === hoveredSource;
    }
    if (hoveredSystem !== null) {
      return conn.toId === hoveredSystem || (conn.fromType === 'system' && conn.fromId === hoveredSystem);
    }
    if (hoveredResult !== null) {
      return conn.toType === 'result' && conn.toId === hoveredResult;
    }
    if (hoveredCentral) {
      return conn.toType === 'unlink' || conn.fromType === 'system';
    }

    // Default flow: index matching active particles
    return activeParticles.some(p => p.pathIdx === idx);
  };

  const triggerCardSweep = (key) => {
    setSweptCard(key);
    addTimeout(() => setSweptCard(null), 700);
  };


  if (isMobile) {
    return (
      <div 
        ref={containerRef}
        className="relative w-full rounded-[14px] p-4 flex flex-col text-white font-sans overflow-hidden select-none bg-[#09152b] border border-[#246bfd]/20"
      >
        <div className="text-[13px] font-bold text-[#F8FAFC] mb-4 mt-2 text-center tracking-wider">FUENTES</div>
        <MobileSnapCarousel cardClassName="w-[calc(100%-38px)] min-w-[286px]" ariaLabel="Fuentes">
          {[
            { icon: Globe, label: 'Web / Landing', id: 0, key: 'web' },
            { icon: ClipboardList, label: 'Formularios', id: 1, key: 'form' },
            { icon: MessageCircle, label: 'WhatsApp / Email', id: 2, key: 'whatsapp' },
            { icon: Phone, label: 'Llamadas', id: 3, key: 'calls' }
          ].map(f => (
            <div key={f.id} className="flex flex-col items-center justify-center p-4 h-[80px] bg-[#102644]/72 border border-[#4d7ebe]/14 rounded-[12px] shadow-md">
              <f.icon className="w-6 h-6 text-[#246bfd] mb-2" />
              <span className="text-[13px] font-medium">{f.label}</span>
            </div>
          ))}
        </MobileSnapCarousel>

        <div className="flex justify-center my-4">
          <div className="w-[2px] h-[30px] bg-gradient-to-b from-[#246bfd]/40 to-[#246bfd]/10" />
        </div>

        <div className="flex justify-center mb-4 relative z-20">
          <div className={`w-[72px] h-[72px] rounded-full bg-[#07172d] border flex items-center justify-center transition-all ${unlinkStatus === 'flash-red' || hoveredCentral ? 'border-[#ff4d3d] shadow-[0_0_18px_rgba(255,77,61,0.55)] scale-105' : 'border-[#246bfd]/40 shadow-[0_0_12px_rgba(36,107,253,0.3)]'}`}>
             <div className="absolute inset-1.5 rounded-full border border-[#246bfd]/25 animate-ping" style={{ animationDuration: '4s' }} />
             <Unlink className={`w-6 h-6 transition-colors ${unlinkStatus === 'flash-red' || hoveredCentral ? 'text-[#ff4d3d]' : 'text-white'}`} />
          </div>
        </div>

        <div className="flex justify-center my-4">
          <div className="w-[2px] h-[30px] bg-gradient-to-t from-[#246bfd]/40 to-[#246bfd]/10" />
        </div>

        <div className="text-[13px] font-bold text-[#F8FAFC] mb-4 text-center tracking-wider">SISTEMAS DESCONECTADOS</div>
        <MobileSnapCarousel cardClassName="w-[calc(100%-38px)] min-w-[286px]" ariaLabel="Sistemas">
          {[
            { icon: Users, label: 'CRM', id: 'crm', key: 'crm' },
            { icon: Megaphone, label: 'Marketing', id: 'marketing', key: 'mkt' },
            { icon: Table, label: 'Hojas de cálculo', id: 'hojas', key: 'sheets' },
            { icon: Receipt, label: 'Facturación', id: 'facturacion', key: 'billing' },
            { icon: Headphones, label: 'Soporte', id: 'soporte', key: 'support' },
            { icon: BarChart3, label: 'BI / Reportes', id: 'bi', key: 'bi' }
          ].map(s => {
             const isActive = highlightedSystem === s.id;
             return (
              <div key={s.id} className={`flex flex-col items-center justify-center p-4 h-[80px] ${isActive ? 'bg-[#15345a] border-[#60A5FA]' : 'bg-[#102644]/72 border-[#4d7ebe]/14'} border rounded-[12px] shadow-md transition-all`}>
                <s.icon className={`w-6 h-6 ${isActive ? 'text-[#60A5FA] animate-pulse' : 'text-[#246bfd]'} mb-2`} />
                <span className="text-[13px] font-medium">{s.label}</span>
              </div>
             );
          })}
        </MobileSnapCarousel>

        <div className="flex justify-center my-4">
          <div className="w-[2px] h-[30px] bg-gradient-to-b from-[#246bfd]/40 to-[#ff4d3d]/30" />
        </div>

        <div className="text-[13px] font-bold text-[#F8FAFC] mb-4 text-center tracking-wider">RESULTADOS</div>
        <MobileSnapCarousel cardClassName="w-[calc(100%-38px)] min-w-[286px]" ariaLabel="Resultados">
          {[
            { text: 'Datos duplicados e inconsistentes', key: 'res1' },
            { text: 'Respuestas lentas y sin contexto', key: 'res2' },
            { text: 'Decisiones con información parcial', key: 'res3' },
            { text: 'Oportunidades que se pierden', key: 'res4' }
          ].map((r, i) => {
             const isAlert = highlightedResult === i;
             return (
              <div key={i} className={`flex flex-col items-center justify-center p-4 h-[80px] ${isAlert ? 'bg-[#291212]' : 'bg-[#1a0f12]'} border ${isAlert ? 'border-[#ff4d3d]' : 'border-[#ff4d3d]/30'} rounded-[12px] shadow-md transition-all`}>
                <TriangleAlert className={`w-6 h-6 text-[#ff4d3d] mb-2 ${isAlert ? 'brightness-125 scale-110' : ''}`} />
                <span className="text-[12px] font-medium text-center">{r.text}</span>
              </div>
             );
          })}
        </MobileSnapCarousel>

        <div className="w-full h-[1px] bg-[#4b78b4]/20 my-8" />

        <span className="text-[15px] font-bold text-[#F8FAFC] mb-4 block text-center">
          Impacto en el negocio
        </span>
        <MobileSnapCarousel cardClassName="w-[calc(100%-38px)] min-w-[286px] h-[170px]" ariaLabel="Impacto">
          {/* Tarjeta 1 */}
          <div className="bg-[#102644]/72 border border-[#4d7ebe]/14 rounded-[12px] p-4 flex flex-col justify-between h-[160px]">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-[#ff4d3d] tracking-wider uppercase">Fricción operativa</span>
              <TrendingDown className={`w-5 h-5 text-[#ff4d3d] ${pulseFriccion ? 'animate-ping' : ''}`} />
            </div>
            <div className="my-2">
              <span className="text-[28px] font-extrabold text-[#F8FAFC]">68%</span>
              <p className="text-[11px] text-[#A6B2C6] leading-tight mt-1">Procesos con intervención manual</p>
            </div>
            <div className="w-full h-8 mt-1 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d={`M 0 12 L 15 ${metricFriccionData[0] * 0.3} L 30 ${metricFriccionData[1] * 0.3} L 45 ${metricFriccionData[2] * 0.3} L 60 ${metricFriccionData[3] * 0.3} L 75 ${metricFriccionData[4] * 0.3} L 100 15`} fill="none" stroke="#ff4d3d" strokeWidth="1.8" style={{ transition: 'd 0.8s ease-in-out' }} />
                <circle cx="100" cy="15" r="1.5" fill="#ff4d3d" className={pulseFriccion ? 'animate-ping' : ''} />
              </svg>
            </div>
          </div>

          {/* Tarjeta 2 */}
          <div className="bg-[#102644]/72 border border-[#4d7ebe]/14 rounded-[12px] p-4 flex flex-col justify-between h-[160px]">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-[#eab308] tracking-wider uppercase">Tiempo perdido</span>
              <Clock3 className={`w-5 h-5 text-[#eab308] ${pulseTiempo ? 'animate-bounce' : ''}`} />
            </div>
            <div className="my-2">
              <span className="text-[28px] font-extrabold text-[#F8FAFC]">2.4 h/día</span>
              <p className="text-[11px] text-[#A6B2C6] leading-tight mt-1">En tareas repetitivas y traspasos</p>
            </div>
            <div className="w-full h-8 mt-1 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d={`M 0 5 L 15 ${metricTiempoData[0] * 0.5} L 30 ${metricTiempoData[1] * 0.5} L 45 ${metricTiempoData[2] * 0.5} L 60 ${metricTiempoData[3] * 0.5} L 75 ${metricTiempoData[4] * 0.5} L 100 18`} fill="none" stroke="#eab308" strokeWidth="1.8" style={{ transition: 'd 0.8s ease-in-out' }} />
                <circle cx="100" cy="18" r="1.5" fill="#eab308" />
              </svg>
            </div>
          </div>

          {/* Tarjeta 3 */}
          <div className="bg-[#102644]/72 border border-[#4d7ebe]/14 rounded-[12px] p-4 flex flex-col justify-between h-[160px]">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-[#246bfd] tracking-wider uppercase">Visibilidad limitada</span>
              <Eye className={`w-5 h-5 text-[#246bfd] ${pulseVisibilidad ? 'brightness-150' : ''}`} />
            </div>
            <div className="my-2">
              <span className="text-[28px] font-extrabold text-[#F8FAFC]">-38%</span>
              <p className="text-[11px] text-[#A6B2C6] leading-tight mt-1">De información accionable</p>
            </div>
            <div className="w-full h-8 mt-1 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d={`M 0 16 L 15 ${metricVisibilidadData[0] * 0.3} L 30 ${metricVisibilidadData[1] * 0.3} L 45 ${metricVisibilidadData[2] * 0.3} L 60 ${metricVisibilidadData[3] * 0.3} L 75 ${metricVisibilidadData[4] * 0.3} L 100 4`} fill="none" stroke="#246bfd" strokeWidth="1.8" style={{ transition: 'd 0.8s ease-in-out' }} />
                <circle cx="100" cy="4" r="1.5" fill="#246bfd" />
              </svg>
            </div>
          </div>
        </MobileSnapCarousel>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="w-full xl:h-[750px] rounded-[18px] p-0 flex flex-col justify-between text-white font-sans select-none relative"
    >
      {/* Tenue scanline de escaneo horizontal */}
      <div 
        className="absolute top-0 bottom-0 w-[60px] opacity-[0.045] pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to right, transparent, #246BFD, transparent)',
          animation: 'problem-scan-horizontal 10s infinite linear'
        }}
      />
      
      <style>{`
        @keyframes problem-scan-horizontal {
          0% { left: -10%; }
          100% { left: 110%; }
        }
      `}</style>

      {/* DIAGRAMA PRINCIPAL */}
      <div 
        ref={diagramRef}
        className="relative h-[395px] flex flex-col justify-between overflow-hidden rounded-[14px] p-4.5"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsMouseOverDiagram(true)}
        onMouseLeave={() => {
          setIsMouseOverDiagram(false);
          setMousePos({ x: -1000, y: -1000 });
        }}
        style={{
          background: 'linear-gradient(145deg, rgba(13, 34, 62, 0.68), rgba(7, 23, 45, 0.78))',
          border: '1px solid rgba(73, 121, 183, 0.10)'
        }}
      >
        {/* Glow de fondo detrás de los sistemas */}
        <div 
          className="absolute w-[240px] h-[240px] rounded-full opacity-40 blur-[80px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            background: 'radial-gradient(circle, rgba(36, 107, 253, 0.22) 0%, transparent 70%)'
          }}
        />

        {/* Capa de Conexiones SVG absolutas */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-1" viewBox="0 0 760 360" preserveAspectRatio="none">
          <defs>
            <radialGradient id="cursorGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#246bfd" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#246bfd" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Mouse Radial Glow Halo (70px - 120px radial glow under lines) */}
          {isMouseOverDiagram && (
            <circle cx={mousePos.x} cy={mousePos.y} r="100" fill="url(#cursorGlow)" />
          )}

          {/* 1. Línea Base y 2. Segmento Luminoso Móvil */}
          {connections.map((conn, idx) => {
            const isHighlighted = isPathHighlighted(conn, idx);
            const isAnyHovered = hoveredSource !== null || hoveredSystem !== null || hoveredResult !== null || hoveredCentral;

            let strokeColor = "rgba(44, 120, 255, 0.38)";
            if (isHighlighted) {
              strokeColor = "rgba(96, 165, 250, 0.95)";
            } else if (isAnyHovered) {
              strokeColor = "rgba(44, 120, 255, 0.12)";
            }

            return (
              <g key={conn.id}>
                <path
                  d={conn.path}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={isHighlighted ? "1.6" : "1.2"}
                  strokeDasharray="4 6"
                  className="transition-colors duration-300"
                />
                
                {/* Segmento luminoso móvil (CSS infinite animations) */}
                {isHighlighted && isLoaded && (
                  <path
                    d={conn.path}
                    fill="none"
                    stroke="rgba(96, 165, 250, 0.95)"
                    strokeWidth="2.2"
                    strokeDasharray="14 76"
                    className="problem-dashboard-flow-path"
                    style={{
                      animationDuration: idx % 2 === 0 ? '2.3s' : '3.4s',
                      animationDelay: `-${(idx % 4) * 0.7}s`
                    }}
                  />
                )}
              </g>
            );
          })}

          <style>{`
            .problem-dashboard-flow-path {
              stroke-linecap: round;
              filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.8));
              animation: problem-dashboard-flow infinite linear;
            }
            @keyframes problem-dashboard-flow {
              from { stroke-dashoffset: 90; }
              to { stroke-dashoffset: 0; }
            }
          `}</style>

          {/* 3. Partículas viajeras con animateMotion */}
          {isLoaded && connections.map((conn, idx) => {
            const isHighlighted = isPathHighlighted(conn, idx);
            if (!isHighlighted) return null;

            return (
              <circle key={`particle-${conn.id}`} r="3.2" fill="#60a5fa" style={{ filter: 'drop-shadow(0 0 6px #246bfd)' }}>
                <animateMotion dur="2.2s" repeatCount="indefinite" path={conn.path} />
              </circle>
            );
          })}

          {/* Puntos de conexión fijos */}
          <circle cx="75" cy="45" r="2.5" fill="#60A5FA" />
          <circle cx="75" cy="125" r="2.5" fill="#60A5FA" />
          <circle cx="75" cy="205" r="2.5" fill="#60A5FA" />
          <circle cx="75" cy="285" r="2.5" fill="#60A5FA" />
          <circle cx="225" cy="45" r="2.5" fill="#60A5FA" />
          <circle cx="405" cy="45" r="2.5" fill="#60A5FA" />
          <circle cx="225" cy="145" r="2.5" fill="#60A5FA" />
          <circle cx="405" cy="145" r="2.5" fill="#60A5FA" />
          <circle cx="225" cy="245" r="2.5" fill="#60A5FA" />
          <circle cx="405" cy="245" r="2.5" fill="#60A5FA" />
          <circle cx="595" cy="45" r="2.5" fill="#FF5A47" />
          <circle cx="595" cy="125" r="2.5" fill="#FF5A47" />
          <circle cx="595" cy="205" r="2.5" fill="#FF5A47" />
          <circle cx="595" cy="285" r="2.5" fill="#FF5A47" />
        </svg>

        {/* Encabezados Abiertos */}
        <div className="flex text-[12px] font-bold text-[#A6B2C6] tracking-wider z-10 relative pt-1">
          <span className="w-[23%] text-left pl-3">FUENTES</span>
          <span className="w-[50%] text-center">SISTEMAS DESCONECTADOS</span>
          <span className="w-[27%] text-right pr-3">RESULTADOS</span>
        </div>

        {/* Grid de Contenido */}
        <div className="grid grid-cols-10 items-stretch h-[310px] mt-3 z-10 relative">
          
          {/* COLUMNA 1: Fuentes (23%) */}
          <div className="col-span-2.3 flex flex-col justify-between pr-3 h-full">
            {[
              { icon: Globe, label: 'Web / Landing', id: 0, key: 'web' },
              { icon: ClipboardList, label: 'Formularios', id: 1, key: 'form' },
              { icon: MessageCircle, label: 'WhatsApp / Email', id: 2, key: 'whatsapp' },
              { icon: Phone, label: 'Llamadas', id: 3, key: 'calls' }
            ].map((f) => (
              <div 
                key={f.id} 
                className={`flex items-center gap-2 px-3 py-2 rounded-[11px] h-[52px] cursor-pointer transition-all duration-300 hover:translate-y-[-1px] problem-dashboard-card-sweep ${
                  sweptCard === f.key ? 'problem-dashboard-card-sweep-active' : ''
                }`}
                onMouseEnter={() => {
                  setHoveredSource(f.id);
                  triggerCardSweep(f.key);
                }}
                onMouseLeave={() => setHoveredSource(null)}
                style={{
                  background: hoveredSource === f.id
                    ? 'linear-gradient(145deg, rgba(19, 44, 76, 0.85), rgba(11, 31, 56, 0.90))'
                    : 'linear-gradient(145deg, rgba(17, 42, 75, 0.78), rgba(11, 30, 56, 0.86))',
                  border: hoveredSource === f.id
                    ? '1px solid rgba(96, 165, 250, 0.38)'
                    : '1px solid rgba(79, 132, 199, 0.14)',
                  boxShadow: '0 10px 30px rgba(0, 8, 24, 0.16)'
                }}
              >
                <f.icon className="w-4.5 h-4.5 text-[#246bfd] shrink-0" />
                <span className="text-[12px] font-medium text-white tracking-tight">{f.label}</span>
              </div>
            ))}
          </div>

          {/* COLUMNA 2: Sistemas Desconectados (50%) */}
          <div className="col-span-5 px-5 relative flex items-center justify-center">
            
            <div className="grid grid-cols-2 gap-x-12 gap-y-4 w-full z-10">
              {[
                { icon: Users, label: 'CRM', id: 'crm', key: 'crm' },
                { icon: Megaphone, label: 'Marketing', id: 'marketing', key: 'mkt' },
                { icon: Table, label: 'Hojas de cálculo', id: 'hojas', key: 'sheets' },
                { icon: Receipt, label: 'Facturación', id: 'facturacion', key: 'billing' },
                { icon: Headphones, label: 'Soporte', id: 'soporte', key: 'support' },
                { icon: BarChart3, label: 'BI / Reportes', id: 'bi', key: 'bi' }
              ].map((s) => {
                const isActive = highlightedSystem === s.id || hoveredSystem === s.id;
                
                return (
                  <div 
                    key={s.id}
                    className={`flex items-center gap-2 px-3 py-2 rounded-[11px] h-[52px] w-[140px] cursor-pointer transition-all duration-300 problem-dashboard-card-sweep ${
                      isActive ? 'problem-dashboard-card-sweep-active' : ''
                    }`}
                    onMouseEnter={() => {
                      setHoveredSystem(s.id);
                      triggerCardSweep(s.key);
                    }}
                    onMouseLeave={() => setHoveredSystem(null)}
                    style={{
                      background: isActive
                        ? 'linear-gradient(145deg, rgba(19, 44, 76, 0.85), rgba(11, 31, 56, 0.90))'
                        : 'linear-gradient(145deg, rgba(17, 42, 75, 0.78), rgba(11, 30, 56, 0.86))',
                      border: isActive
                        ? '1px solid rgba(96, 165, 250, 0.38)'
                        : '1px solid rgba(79, 132, 199, 0.14)',
                      boxShadow: '0 10px 30px rgba(0, 8, 24, 0.16)'
                    }}
                  >
                    <s.icon className={`w-4.5 h-4.5 text-[#246bfd] shrink-0 ${isActive ? 'animate-pulse' : ''}`} />
                    <span className="text-[12px] font-medium text-white">{s.label}</span>
                  </div>
                );
              })}
            </div>

            {/* NODO CENTRAL DE DESCONEXIÓN (68px a 78px de diámetro) */}
            <div 
              className={`absolute w-[72px] h-[72px] rounded-full bg-[#07172d] border flex items-center justify-center z-20 cursor-pointer transition-all duration-300 ${
                unlinkStatus === 'flash-red' || hoveredCentral
                  ? 'border-[#ff4d3d] shadow-[0_0_18px_rgba(255,77,61,0.55)] scale-105' 
                  : unlinkStatus === 'flash-blue'
                  ? 'border-[#60a5fa] shadow-[0_0_15px_rgba(96,165,250,0.45)]'
                  : 'border-[#246bfd]/40 shadow-[0_0_12px_rgba(36,107,253,0.3)]'
              }`}
              onMouseEnter={() => {
                setHoveredCentral(true);
                setUnlinkStatus('flash-red');
              }}
              onMouseLeave={() => {
                setHoveredCentral(false);
                setUnlinkStatus('blue');
              }}
            >
              <div className="absolute inset-1.5 rounded-full border border-[#246bfd]/25 animate-ping" style={{ animationDuration: '4s' }} />
              <Unlink className={`w-6 h-6 transition-colors duration-300 ${unlinkStatus === 'flash-red' || hoveredCentral ? 'text-[#ff4d3d]' : 'text-white'}`} />
              <div className="absolute inset-0 rounded-full border border-dashed border-[#246bfd]/20 scale-115 animate-spin" style={{ animationDuration: '15s' }} />
            </div>
          </div>

          {/* COLUMNA 3: Resultados (27%) */}
          <div className="col-span-2.7 flex flex-col justify-between pl-3 h-full">
            {[
              { text: 'Datos duplicados\ne inconsistentes', key: 'res1' },
              { text: 'Respuestas lentas\ny sin contexto', key: 'res2' },
              { text: 'Decisiones con\ninformación parcial', key: 'res3' },
              { text: 'Oportunidades\nque se pierden', key: 'res4' }
            ].map((r, i) => {
              const isAlert = highlightedResult === i || hoveredResult === i;

              return (
                <div 
                  key={i} 
                  className={`flex items-center gap-2 px-3 py-2 rounded-[11px] h-[52px] cursor-pointer transition-all duration-300 problem-dashboard-card-sweep ${
                    isAlert ? 'problem-dashboard-card-sweep-active' : ''
                  }`}
                  onMouseEnter={() => {
                    setHoveredResult(i);
                    triggerCardSweep(r.key);
                  }}
                  onMouseLeave={() => setHoveredResult(null)}
                  style={{
                    background: isAlert
                      ? 'linear-gradient(145deg, rgba(35, 17, 30, 0.82), rgba(20, 11, 21, 0.88))'
                      : 'linear-gradient(145deg, rgba(17, 42, 75, 0.78), rgba(11, 30, 56, 0.86))',
                    border: isAlert
                      ? '1px solid rgba(255, 77, 61, 0.35)'
                      : '1px solid rgba(79, 132, 199, 0.14)',
                    boxShadow: isAlert
                      ? '0 10px 30px rgba(255, 77, 61, 0.12)'
                      : '0 10px 30px rgba(0, 8, 24, 0.16)'
                  }}
                >
                  <TriangleAlert className={`w-4.5 h-4.5 text-[#ff4d3d] shrink-0 ${isAlert ? 'brightness-125' : ''}`} />
                  <span className="text-[11px] xl:text-[12px] font-medium text-white whitespace-pre-line leading-tight">{r.text}</span>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* IMPACTO EN EL NEGOCIO */}
      <div className="mt-3.5 z-10 relative">
        <span className="text-[13px] xl:text-[14px] font-bold text-[#F8FAFC] mb-2.5 block">
          Impacto en el negocio
        </span>

        <div className="grid grid-cols-3 gap-3.5">
          {/* Tarjeta 1: Fricción Operativa */}
          <div 
            className="bg-[#102644]/72 border rounded-[12px] p-3 flex flex-col justify-between h-[156px] transition-all hover:translate-y-[-2px] duration-300"
            style={{ borderColor: 'rgba(79, 132, 199, 0.14)' }}
          >
            <div className="flex justify-between items-start">
              <span className="text-[9.5px] font-bold text-[#ff4d3d] tracking-wider uppercase">Fricción operativa</span>
              <TrendingDown className={`w-4.5 h-4.5 text-[#ff4d3d] ${pulseFriccion ? 'animate-ping' : ''}`} />
            </div>
            <div className="my-1.5">
              <span className="text-[25px] font-extrabold text-[#F8FAFC]">68%</span>
              <p className="text-[9.5px] text-[#A6B2C6] leading-tight mt-0.5">Procesos con intervención manual</p>
            </div>
            <div className="w-full h-8 mt-1 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path 
                  d={`M 0 12 L 15 ${metricFriccionData[0] * 0.3} L 30 ${metricFriccionData[1] * 0.3} L 45 ${metricFriccionData[2] * 0.3} L 60 ${metricFriccionData[3] * 0.3} L 75 ${metricFriccionData[4] * 0.3} L 100 15`} 
                  fill="none" 
                  stroke="#ff4d3d" 
                  strokeWidth="1.8" 
                  style={{ transition: 'd 0.8s ease-in-out' }}
                />
                <circle cx="100" cy="15" r="1.5" fill="#ff4d3d" className={pulseFriccion ? 'animate-ping' : ''} />
              </svg>
            </div>
          </div>

          {/* Tarjeta 2: Tiempo Perdido */}
          <div 
            className="bg-[#102644]/72 border rounded-[12px] p-3 flex flex-col justify-between h-[156px] transition-all hover:translate-y-[-2px] duration-300"
            style={{ borderColor: 'rgba(79, 132, 199, 0.14)' }}
          >
            <div className="flex justify-between items-start">
              <span className="text-[9.5px] font-bold text-[#eab308] tracking-wider uppercase">Tiempo perdido</span>
              <Clock3 className={`w-4.5 h-4.5 text-[#eab308] ${pulseTiempo ? 'animate-bounce' : ''}`} />
            </div>
            <div className="my-1.5">
              <span className="text-[25px] font-extrabold text-[#F8FAFC]">2.4 h/día</span>
              <p className="text-[9.5px] text-[#A6B2C6] leading-tight mt-0.5">En tareas repetitivas y traspasos</p>
            </div>
            <div className="w-full h-8 mt-1 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path 
                  d={`M 0 5 L 15 ${metricTiempoData[0] * 0.5} L 30 ${metricTiempoData[1] * 0.5} L 45 ${metricTiempoData[2] * 0.5} L 60 ${metricTiempoData[3] * 0.5} L 75 ${metricTiempoData[4] * 0.5} L 100 18`} 
                  fill="none" 
                  stroke="#eab308" 
                  strokeWidth="1.8" 
                  style={{ transition: 'd 0.8s ease-in-out' }}
                />
                <circle cx="100" cy="18" r="1.5" fill="#eab308" />
              </svg>
            </div>
          </div>

          {/* Tarjeta 3: Visibilidad Limitada */}
          <div 
            className="bg-[#102644]/72 border rounded-[12px] p-3 flex flex-col justify-between h-[156px] transition-all hover:translate-y-[-2px] duration-300"
            style={{ borderColor: 'rgba(79, 132, 199, 0.14)' }}
          >
            <div className="flex justify-between items-start">
              <span className="text-[9.5px] font-bold text-[#246bfd] tracking-wider uppercase">Visibilidad limitada</span>
              <Eye className={`w-4.5 h-4.5 text-[#246bfd] ${pulseVisibilidad ? 'brightness-150' : ''}`} />
            </div>
            <div className="my-1.5">
              <span className="text-[25px] font-extrabold text-[#F8FAFC]">-38%</span>
              <p className="text-[9.5px] text-[#A6B2C6] leading-tight mt-0.5">De información accionable</p>
            </div>
            <div className="w-full h-8 mt-1 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path 
                  d={`M 0 16 L 15 ${metricVisibilidadData[0] * 0.3} L 30 ${metricVisibilidadData[1] * 0.3} L 45 ${metricVisibilidadData[2] * 0.3} L 60 ${metricVisibilidadData[3] * 0.3} L 75 ${metricVisibilidadData[4] * 0.3} L 100 4`} 
                  fill="none" 
                  stroke="#246bfd" 
                  strokeWidth="1.8" 
                  style={{ transition: 'd 0.8s ease-in-out' }}
                />
                <circle cx="100" cy="4" r="1.5" fill="#246bfd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProblemDiagnosticDashboard;
