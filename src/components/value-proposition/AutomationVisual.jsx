import React from 'react';

const AutomationVisual = () => {
  return (
    <div className="w-full h-[250px] flex items-center justify-center relative overflow-hidden select-none">
      <svg 
        viewBox="0 0 500 280" 
        className="w-full h-full"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="centralGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#246bfd" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#246bfd" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Glow */}
        <circle cx="250" cy="140" r="90" fill="url(#centralGlow)" />

        {/* Connecting Lines (Straight paths with rounded corners) */}
        <g stroke="#246bfd" strokeWidth="1.8" strokeDasharray="4 4" opacity="0.6">
          <path d="M 250 140 H 120" />
          <path d="M 250 140 C 310 140, 320 80, 380 80" />
          <path d="M 250 140 C 310 140, 320 200, 380 200" />
          {/* Secondary branching lines */}
          <path d="M 120 140 C 120 180, 200 210, 250 210" />
        </g>

        {/* Traveling Particles */}
        <circle r="3.5" fill="#60a5fa" style={{ filter: 'drop-shadow(0 0 5px #246bfd)' }}>
          <animateMotion dur="2.4s" repeatCount="indefinite" path="M 250 140 H 120" />
        </circle>
        <circle r="3.5" fill="#60a5fa" style={{ filter: 'drop-shadow(0 0 5px #246bfd)' }}>
          <animateMotion dur="2.8s" repeatCount="indefinite" path="M 250 140 C 310 140, 320 80, 380 80" />
        </circle>
        <circle r="3.5" fill="#60a5fa" style={{ filter: 'drop-shadow(0 0 5px #246bfd)' }}>
          <animateMotion dur="2.6s" repeatCount="indefinite" path="M 250 140 C 310 140, 320 200, 380 200" />
        </circle>

        {/* Central Gear Node (120px wide) */}
        <g transform="translate(250, 140)">
          <rect x="-60" y="-35" width="120" height="70" rx="16" fill="#07172d" stroke="#60a5fa" strokeWidth="2.2" style={{ filter: 'drop-shadow(0 0 10px rgba(96,165,250,0.3))' }} />
          
          <g className="animate-spin" style={{ animationDuration: '14s' }}>
            <circle cx="0" cy="0" r="24" fill="#07172d" stroke="#246bfd" strokeWidth="1.8" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <rect 
                key={i} 
                x="-5" 
                y="-32" 
                width="10" 
                height="10" 
                rx="2" 
                fill="#07172d" 
                stroke="#246bfd" 
                strokeWidth="1.5" 
                transform={`rotate(${angle})`} 
              />
            ))}
            <circle cx="0" cy="0" r="10" fill="#1e293b" />
          </g>
        </g>

        {/* Node 1: Robot/Asistente (Left) - 72px wide */}
        <g transform="translate(48, 104)">
          <rect x="0" y="0" width="72" height="72" rx="16" fill="#0c1f3a" stroke="#246bfd" strokeWidth="1.8" />
          {/* Detailed Robot face */}
          <g transform="translate(16, 16)">
            <rect x="3" y="10" width="34" height="24" rx="7" fill="#07172d" stroke="#60a5fa" strokeWidth="1.8" />
            <circle cx="13" cy="22" r="3" fill="#60a5fa" />
            <circle cx="27" cy="22" r="3" fill="#60a5fa" />
            <line x1="16" y1="28" x2="24" y2="28" stroke="#60a5fa" strokeWidth="1.5" />
            <rect x="0" y="17" width="3" height="10" rx="1" fill="#60a5fa" />
            <rect x="37" y="17" width="3" height="10" rx="1" fill="#60a5fa" />
            <line x1="20" y1="10" x2="20" y2="3" stroke="#60a5fa" strokeWidth="1.8" />
            <circle cx="20" cy="2" r="2" fill="#60a5fa" />
          </g>
        </g>

        {/* Node 2: User (Top Right) - 72px wide */}
        <g transform="translate(380, 44)">
          <rect x="0" y="0" width="72" height="72" rx="16" fill="#0c1f3a" stroke="#246bfd" strokeWidth="1.8" />
          <g transform="translate(16, 16)">
            <circle cx="20" cy="13" r="9" fill="#07172d" stroke="#60a5fa" strokeWidth="2" />
            <path d="M 6 35 C 6 26, 34 26, 34 35 Z" fill="#07172d" stroke="#60a5fa" strokeWidth="2" />
          </g>
        </g>

        {/* Node 3: Database (Bottom Right) - 72px wide */}
        <g transform="translate(380, 164)">
          <rect x="0" y="0" width="72" height="72" rx="16" fill="#0c1f3a" stroke="#246bfd" strokeWidth="1.8" />
          <g transform="translate(19, 16)">
            <path d="M 0 6 C 0 2, 34 2, 34 6 L 34 13 C 34 17, 0 17, 0 13 Z" fill="#07172d" stroke="#60a5fa" strokeWidth="1.8" />
            <path d="M 0 17 C 0 13, 34 13, 34 17 L 34 24 C 34 28, 0 28, 0 24 Z" fill="#07172d" stroke="#60a5fa" strokeWidth="1.8" />
            <path d="M 0 28 C 0 24, 34 24, 34 28 L 34 35 C 34 39, 0 39, 0 35 Z" fill="#07172d" stroke="#60a5fa" strokeWidth="1.8" />
          </g>
        </g>

      </svg>
    </div>
  );
};

export default AutomationVisual;
