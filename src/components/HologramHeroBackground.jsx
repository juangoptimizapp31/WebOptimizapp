import React, { forwardRef } from 'react';
import AnimatedParticleWave from './hero/AnimatedParticleWave';

const HologramHeroBackground = forwardRef((props, ref) => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#020B1B] hero-v2-background-gradient">
      
      {/* Halo azul inferior izquierdo donde aparece la malla */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full opacity-50 blur-[120px] pointer-events-none -left-[150px] -bottom-[150px]"
        style={{
          background: 'radial-gradient(circle, rgba(36, 107, 253, 0.16) 0%, rgba(2,11,27,0) 70%)'
        }}
      />

      {/* Viñeta oscura discreta en los bordes */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, transparent 45%, rgba(2,11,27,0.85) 100%)'
        }}
      />

      {/* Malla animada en el borde inferior izquierdo (52% de ancho, 40% de alto) */}
      <div className="absolute bottom-0 left-0 w-[52%] h-[40%] pointer-events-none z-1">
        <AnimatedParticleWave ref={ref} />
      </div>
    </div>
  );
});

HologramHeroBackground.displayName = 'HologramHeroBackground';

export default HologramHeroBackground;
