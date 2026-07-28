import React from 'react';
import { Button } from '@/components/ui/button';

const ServicesBottomCTA = () => {
  const handleHablarConExperto = () => {
    window.dispatchEvent(new CustomEvent('openEvalModal'));
  };

  const handleExplorarSoluciones = () => {
    const el = document.getElementById('soluciones');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="relative w-full rounded-2xl border border-blue-500/22 overflow-hidden mt-9 z-10 flex flex-col md:grid md:grid-cols-12 items-center min-h-[125px] p-6 gap-6 md:gap-4 select-none"
      style={{
        background: 'linear-gradient(135deg, rgba(11, 30, 57, 0.90) 0%, rgba(5, 17, 36, 0.94) 100%)',
        boxShadow: '0 16px 40px rgba(0, 5, 18, 0.28)'
      }}
    >
      {/* Column 1: Nodes network visual (Left 2.5 columns on desktop) */}
      <div className="hidden md:flex md:col-span-3 h-full items-center justify-start overflow-hidden relative opacity-75">
        <svg viewBox="0 0 200 90" className="w-full h-full max-w-[190px]">
          {/* Connecting lines */}
          <line x1="20" y1="30" x2="70" y2="15" stroke="rgba(36,107,253,0.3)" strokeWidth="1" />
          <line x1="20" y1="30" x2="60" y2="55" stroke="rgba(36,107,253,0.3)" strokeWidth="1" />
          <line x1="70" y1="15" x2="130" y2="25" stroke="rgba(36,107,253,0.3)" strokeWidth="1" />
          <line x1="60" y1="55" x2="130" y2="25" stroke="rgba(36,107,253,0.3)" strokeWidth="1" />
          <line x1="60" y1="55" x2="110" y2="75" stroke="rgba(36,107,253,0.3)" strokeWidth="1" />
          <line x1="130" y1="25" x2="180" y2="50" stroke="rgba(36,107,253,0.3)" strokeWidth="1" />
          <line x1="110" y1="75" x2="180" y2="50" stroke="rgba(36,107,253,0.3)" strokeWidth="1" />

          {/* Animated node pulses */}
          <circle cx="20" cy="30" r="3.5" fill="#246bfd" className="animate-ping" style={{ animationDuration: '3.5s' }} />
          <circle cx="20" cy="30" r="2.5" fill="#60a5fa" />

          <circle cx="70" cy="15" r="4.5" fill="#246bfd" className="animate-ping" style={{ animationDuration: '4.5s' }} />
          <circle cx="70" cy="15" r="3" fill="#60a5fa" />

          <circle cx="60" cy="55" r="3.5" fill="#246bfd" className="animate-ping" style={{ animationDuration: '4s' }} />
          <circle cx="60" cy="55" r="2.5" fill="#60a5fa" />

          <circle cx="130" cy="25" r="5" fill="#246bfd" className="animate-ping" style={{ animationDuration: '5s' }} />
          <circle cx="130" cy="25" r="3.5" fill="#93c5fd" />

          <circle cx="110" cy="75" r="3.5" fill="#246bfd" className="animate-ping" style={{ animationDuration: '3s' }} />
          <circle cx="110" cy="75" r="2.5" fill="#60a5fa" />

          <circle cx="180" cy="50" r="4" fill="#246bfd" className="animate-ping" style={{ animationDuration: '4.2s' }} />
          <circle cx="180" cy="50" r="3" fill="#60a5fa" />
        </svg>
      </div>

      {/* Column 2: Text Description (Middle col-span on desktop) */}
      <div className="w-full md:col-span-5 text-left flex flex-col justify-center">
        <h4 className="text-[19px] xl:text-[20px] font-bold text-white leading-tight">
          Elige la solución que impulsa tu negocio hoy.
        </h4>
        <p className="text-[15px] xl:text-[16px] text-[#A6B2C6] leading-snug mt-1.5 font-medium">
          O conversemos sobre cómo integrarlas para lograr mayor impacto.
        </p>
      </div>

      {/* Column 3: Action Buttons (Right 4 columns on desktop) */}
      <div className="w-full md:col-span-4 flex flex-col sm:flex-row gap-3.5 justify-end items-center">
        <Button 
          onClick={handleExplorarSoluciones}
          className="w-full sm:w-[200px] h-[52px] rounded-[10px] bg-blue-600 hover:bg-blue-500 hover:translate-y-[-1px] text-white font-semibold transition-all shadow-[0_4px_16px_rgba(37,99,235,0.22)]"
        >
          Explorar soluciones
        </Button>
        <Button 
          onClick={handleHablarConExperto}
          variant="outline"
          className="w-full sm:w-[210px] h-[52px] rounded-[10px] border-blue-500/35 hover:border-blue-500/70 hover:bg-blue-500/10 hover:translate-y-[-1px] text-blue-400 font-semibold transition-all"
        >
          Hablar con un experto
        </Button>
      </div>

    </div>
  );
};

export default ServicesBottomCTA;
