import React, { useEffect, useState } from 'react';

const DataGrowthVisual = () => {
  const [donutOffset, setDonutOffset] = useState(220);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDonutOffset(220 - (220 * 0.68));
      return;
    }

    const timer = setTimeout(() => {
      setDonutOffset(220 - (220 * 0.68));
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-[250px] flex items-center justify-center relative overflow-hidden select-none">
      
      {/* Dashboard container (370px to 410px wide, 215px to 245px high) */}
      <div 
        className="w-[380px] h-[225px] rounded-xl p-3 flex flex-col justify-between text-white"
        style={{
          background: 'linear-gradient(145deg, rgba(10, 31, 61, 0.95), rgba(5, 21, 44, 0.97))',
          border: '1px solid rgba(65, 128, 206, 0.16)',
          boxShadow: '0 12px 30px rgba(0, 8, 24, 0.18), inset 0 1px 0 rgba(104, 161, 230, 0.04)'
        }}
      >
        {/* Row 1: Line Chart (67% width) & Bar Chart (33% width) */}
        <div className="grid grid-cols-12 gap-2.5 h-[96px]">
          {/* Top Left: Line chart with grid */}
          <div className="col-span-8 bg-[#0b1f3a]/60 border border-[#246bfd]/10 rounded-lg p-2 flex flex-col justify-between overflow-hidden relative">
            {/* Grid lines inside */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none p-2.5 opacity-[0.08] z-0">
              <div className="border-b border-[#246bfd] w-full" />
              <div className="border-b border-[#246bfd] w-full" />
              <div className="border-b border-[#246bfd] w-full" />
            </div>

            {/* Horizontal & Vertical Axes */}
            <div className="absolute bottom-2 left-2 right-2 h-px bg-slate-500/30 z-10" />
            <div className="absolute top-2 bottom-2 left-2 w-px bg-slate-500/30 z-10" />

            <div className="w-full h-[70px] mt-1 relative z-20 pl-1">
              <svg className="w-full h-full" viewBox="0 0 120 40" preserveAspectRatio="none">
                {/* Area under the line */}
                <path 
                  d="M 0 35 L 15 25 L 30 30 L 45 15 L 65 25 L 85 10 L 100 20 L 120 5 L 120 40 L 0 40 Z" 
                  fill="rgba(96, 165, 250, 0.08)"
                />
                {/* 8 bends line */}
                <path 
                  d="M 0 35 L 15 25 L 30 30 L 45 15 L 65 25 L 85 10 L 100 20 L 120 5" 
                  fill="none" 
                  stroke="#60a5fa" 
                  strokeWidth="2.2" 
                />
                <circle cx="120" cy="5" r="2.2" fill="#60a5fa" className="animate-ping" />
                <circle cx="120" cy="5" r="1.5" fill="#fff" />
              </svg>
            </div>
          </div>

          {/* Top Right: Bar Chart (7-9 bars) */}
          <div className="col-span-4 bg-[#0b1f3a]/60 border border-[#246bfd]/10 rounded-lg p-2.5 flex flex-col justify-between overflow-hidden">
            <div className="flex items-end justify-between gap-1 h-[70px] w-full px-1 mt-1">
              {[45, 80, 55, 90, 75, 40, 65, 85].map((h, i) => (
                <div 
                  key={i} 
                  className="w-2 bg-[#246bfd]/30 rounded-t-[2px] transition-all duration-1000"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Bar Chart 2 (32%), Donut (35%), Indicators (33%) */}
        <div className="grid grid-cols-10 gap-2.5 h-[96px]">
          {/* Bottom Left: Bar Chart 2 */}
          <div className="col-span-3 bg-[#0b1f3a]/60 border border-[#246bfd]/10 rounded-lg p-2.5 flex flex-col justify-between overflow-hidden">
            <div className="flex items-end justify-between gap-1.5 h-[70px] w-full px-1 mt-1">
              {[30, 45, 65, 85, 55].map((h, i) => (
                <div 
                  key={i} 
                  className="w-2.5 bg-[#60a5fa]/40 rounded-t-[2px]"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* Bottom Middle: Donut */}
          <div className="col-span-4 bg-[#0b1f3a]/60 border border-[#246bfd]/10 rounded-lg p-2 flex items-center justify-center overflow-hidden">
            <div className="relative w-15 h-15 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                <circle 
                  cx="40" 
                  cy="40" 
                  r="35" 
                  stroke="rgba(36,107,253,0.15)" 
                  strokeWidth="7.5" 
                  fill="none" 
                />
                <circle 
                  cx="40" 
                  cy="40" 
                  r="35" 
                  stroke="#60a5fa" 
                  strokeWidth="7.5" 
                  strokeDasharray="220" 
                  strokeDashoffset={donutOffset} 
                  fill="none" 
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 1.5s ease-in-out' }}
                />
              </svg>
              <span className="absolute text-[13px] font-extrabold text-white">68%</span>
            </div>
          </div>

          {/* Bottom Right: Indicators Panel */}
          <div className="col-span-3 bg-[#0b1f3a]/60 border border-[#246bfd]/10 rounded-lg p-2.5 flex flex-col justify-center gap-2.5 overflow-hidden">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#60a5fa] shrink-0" />
                <div className="flex flex-col gap-1 w-full">
                  <div className="h-1.5 w-12 bg-slate-500/50 rounded-full" />
                  <div className="h-1 w-8 bg-slate-600/30 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default DataGrowthVisual;
