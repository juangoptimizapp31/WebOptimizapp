import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ResultMiniChart = ({ type }) => {
  const [tick, setTick] = useState(0);

  // Periodic subtle updates for the charts
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const interval = setInterval(() => {
      setTick(prev => prev + 1);
    }, 3500 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  const renderCostos = () => (
    <svg viewBox="0 0 160 80" className="w-full h-full overflow-visible">
      {/* 5 descending bars */}
      {[0, 1, 2, 3, 4].map((i) => {
        const height = 55 - i * 10 + (tick % 2 === 0 && i === 2 ? 4 : 0);
        return (
          <motion.rect
            key={`bar-${i}`}
            x={10 + i * 28}
            y={70 - height}
            width={12}
            height={height}
            fill="#1e3a8a"
            initial={{ height: 0, y: 70 }}
            animate={{ height, y: 70 - height }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="transition-all duration-700"
          />
        );
      })}
      {/* Dotted line */}
      <motion.polyline
        points="16,10 44,22 72,30 100,42 128,52"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
        strokeDasharray="4, 4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <circle cx="16" cy="10" r="3" fill="#3b82f6" />
      <motion.circle 
        cx="128" 
        cy="52" 
        r="3.5" 
        fill="#60a5fa" 
        animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  );

  const renderProcesos = () => (
    <svg viewBox="0 0 160 80" className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id="procesosGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
          <stop offset="100%" stopColor="rgba(59, 130, 246, 0.0)" />
        </linearGradient>
      </defs>
      <motion.path
        d="M 10 70 L 30 65 L 50 50 L 70 55 L 90 40 L 110 30 L 130 15 L 145 5 L 145 75 L 10 75 Z"
        fill="url(#procesosGrad)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />
      <motion.polyline
        points="10,70 30,65 50,50 70,55 90,40 110,30 130,15 145,5"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <motion.circle 
        cx="145" 
        cy="5" 
        r="4" 
        fill="#60a5fa" 
        animate={{ scale: [1, 1.3, 1], filter: ["blur(0px)", "blur(2px)", "blur(0px)"] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </svg>
  );

  const renderVisibilidad = () => {
    const heights = [
      25 + (tick % 3 === 0 ? 5 : 0),
      40 + (tick % 3 === 1 ? -4 : 0),
      60 + (tick % 3 === 2 ? 3 : 0),
      55
    ];
    return (
      <svg viewBox="0 0 160 80" className="w-full h-full overflow-visible">
        {heights.map((h, i) => (
          <motion.rect
            key={`vis-${i}`}
            x={20 + i * 30}
            y={70 - h}
            width={14}
            height={h}
            fill={i === 2 ? "#3b82f6" : "#1e3a8a"}
            initial={{ height: 0, y: 70 }}
            animate={{ height: h, y: 70 - h }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            className="transition-all duration-1000"
          />
        ))}
      </svg>
    );
  };

  const renderTrazabilidad = () => {
    const lines = [
      { y: 20, len: 120, pos: (tick % 4) * 30 + 15 },
      { y: 35, len: 90, pos: ((tick + 1) % 3) * 30 + 15 },
      { y: 50, len: 130, pos: ((tick + 2) % 4) * 30 + 15 },
      { y: 65, len: 100, pos: ((tick + 3) % 3) * 30 + 15 }
    ];
    return (
      <svg viewBox="0 0 160 80" className="w-full h-full overflow-visible">
        {lines.map((line, i) => (
          <g key={`trace-${i}`}>
            <rect x="15" y={line.y - 2} width={line.len} height="4" fill="#1e3a8a" rx="2" />
            <motion.circle 
              cx={15 + line.pos} 
              cy={line.y} 
              r="4" 
              fill="#3b82f6" 
              animate={{ cx: 15 + line.pos }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </g>
        ))}
      </svg>
    );
  };

  const renderAutomatizacion = () => (
    <svg viewBox="0 0 160 80" className="w-full h-full overflow-visible">
      {/* Nodes */}
      <rect x="65" y="10" width="30" height="15" fill="#1e3a8a" rx="3" />
      <rect x="25" y="50" width="30" height="15" fill="#1e3a8a" rx="3" />
      <rect x="105" y="50" width="30" height="15" fill="#1e3a8a" rx="3" />
      <rect x="120" y="25" width="20" height="12" fill="#1e3a8a" rx="2" />
      
      {/* Lines */}
      <path d="M 80 25 C 80 40, 40 40, 40 50" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3,3" />
      <path d="M 80 25 C 80 40, 120 40, 120 50" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3,3" />
      <path d="M 55 57 L 105 57" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3,3" />
      
      {/* Traveling pulses */}
      <motion.circle r="2.5" fill="#60a5fa"
        animate={{
          pathLength: [0, 1],
          offsetDistance: ["0%", "100%"]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        style={{ offsetPath: "path('M 80 25 C 80 40, 40 40, 40 50')" }}
      />
      <motion.circle r="2.5" fill="#60a5fa"
        animate={{
          offsetDistance: ["0%", "100%"]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
        style={{ offsetPath: "path('M 80 25 C 80 40, 120 40, 120 50')" }}
      />
    </svg>
  );

  const renderEscalar = () => (
    <svg viewBox="0 0 160 80" className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id="escalarGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
          <stop offset="100%" stopColor="rgba(59, 130, 246, 0.0)" />
        </linearGradient>
      </defs>
      <motion.path
        d="M 10 70 Q 100 60, 140 10 L 140 75 L 10 75 Z"
        fill="url(#escalarGrad)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />
      <motion.path
        d="M 10 70 Q 100 60, 140 10"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeIn" }}
      />
      <motion.circle 
        cx="140" 
        cy="10" 
        r="4" 
        fill="#60a5fa" 
        animate={{ scale: [1, 1.4, 1], filter: ["blur(0px)", "blur(3px)", "blur(0px)"] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </svg>
  );

  const charts = {
    costos: renderCostos,
    procesos: renderProcesos,
    visibilidad: renderVisibilidad,
    trazabilidad: renderTrazabilidad,
    automatizacion: renderAutomatizacion,
    escalar: renderEscalar
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      {charts[type]()}
    </div>
  );
};

export default ResultMiniChart;
