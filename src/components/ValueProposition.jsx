import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Cloud, BrainCircuit, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';
import "./value-proposition/ValueProposition.css";

const CARD_TRANSITION = {
  duration: 0.72,
  ease: [0.22, 1, 0.36, 1],
};

const SvgGlowDefs = ({ prefix }) => (
  <defs>
    <linearGradient id={`${prefix}-panel`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#12366f" stopOpacity="0.95" />
      <stop offset="55%" stopColor="#0874f7" stopOpacity="0.86" />
      <stop offset="100%" stopColor="#04295e" stopOpacity="0.96" />
    </linearGradient>
    <linearGradient id={`${prefix}-panel-dark`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#0d3268" />
      <stop offset="100%" stopColor="#041b3c" />
    </linearGradient>
    <linearGradient id={`${prefix}-edge`} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#1c79ff" />
      <stop offset="50%" stopColor="#65c8ff" />
      <stop offset="100%" stopColor="#1a73ff" />
    </linearGradient>
    <radialGradient id={`${prefix}-halo`} cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#1f8dff" stopOpacity="0.54" />
      <stop offset="58%" stopColor="#0d58d2" stopOpacity="0.17" />
      <stop offset="100%" stopColor="#082348" stopOpacity="0" />
    </radialGradient>
    <filter id={`${prefix}-glow`} x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="4.2" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id={`${prefix}-strong-glow`} x="-120%" y="-120%" width="340%" height="340%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
);

const DataPulse = ({ path, duration = '3.4s', begin = '0s', color = '#9ad9ff', radius = 2.7 }) => (
  <circle r={radius} fill={color} className="solutions-v4-data-dot">
    <animateMotion dur={duration} begin={begin} repeatCount="indefinite" path={path} />
    <animate
      attributeName="opacity"
      values="0;1;1;0"
      keyTimes="0;0.14;0.82;1"
      dur={duration}
      begin={begin}
      repeatCount="indefinite"
    />
  </circle>
);

const IsometricLayer = ({ cx, cy, width, height, depth, delay }) => {
  const left = cx - width / 2;
  const right = cx + width / 2;
  const top = cy - height / 2;
  const bottom = cy + height / 2;

  return (
    <g className="solutions-v4-cloud-layer" style={{ animationDelay: delay }}>
      <polygon
        points={`${left},${cy} ${cx},${bottom} ${cx},${bottom + depth} ${left},${cy + depth}`}
        fill="url(#cloud-panel-dark)"
        stroke="rgba(38,130,255,.75)"
        strokeWidth="1.1"
      />
      <polygon
        points={`${cx},${bottom} ${right},${cy} ${right},${cy + depth} ${cx},${bottom + depth}`}
        fill="#06285a"
        stroke="rgba(57,155,255,.82)"
        strokeWidth="1.1"
      />
      <polygon
        points={`${cx},${top} ${right},${cy} ${cx},${bottom} ${left},${cy}`}
        fill="url(#cloud-panel)"
        fillOpacity="0.72"
        stroke="url(#cloud-edge)"
        strokeWidth="1.8"
        filter="url(#cloud-glow)"
      />
      <polygon
        points={`${cx},${top + 8} ${right - 20},${cy} ${cx},${bottom - 8} ${left + 20},${cy}`}
        fill="rgba(35,142,255,.14)"
        stroke="rgba(112,204,255,.34)"
        strokeWidth="0.8"
      />
    </g>
  );
};

const ServerTower = ({ x, y, scale = 1, mirror = false, delay = '0s' }) => {
  const w = 27;
  const h = 52;
  const d = 10;
  const top = mirror
    ? `${x},${y} ${x + w},${y} ${x + w - d},${y - 7} ${x - d},${y - 7}`
    : `${x},${y} ${x + w},${y} ${x + w + d},${y - 7} ${x + d},${y - 7}`;
  const side = mirror
    ? `${x},${y} ${x - d},${y - 7} ${x - d},${y + h - 7} ${x},${y + h}`
    : `${x + w},${y} ${x + w + d},${y - 7} ${x + w + d},${y + h - 7} ${x + w},${y + h}`;

  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale}) translate(${-x} ${-y})`}
      className="solutions-v4-server"
      style={{ animationDelay: delay }}
    >
      <polygon points={top} fill="#0e4a91" stroke="#2f97ff" strokeWidth="1" />
      <polygon points={side} fill="#031a39" stroke="#1763b8" strokeWidth="1" />
      <rect x={x} y={y} width={w} height={h} rx="2" fill="url(#cloud-panel-dark)" stroke="#258dff" strokeWidth="1.2" />
      {[10, 18, 26, 34, 42].map((offset, i) => (
        <g key={offset}>
          <rect x={x + 5} y={y + offset} width="14" height="2" rx="1" fill="rgba(65,158,255,.55)" />
          <circle
            cx={x + 22}
            cy={y + offset + 1}
            r="1.25"
            fill="#7bcaff"
            className="solutions-v4-server-led"
            style={{ animationDelay: `${i * 0.26}s` }}
          />
        </g>
      ))}
    </g>
  );
};

const EdgeDevice = ({ x, y, mirror = false, delay = '0s' }) => (
  <g className="solutions-v4-server" style={{ animationDelay: delay }}>
    <polygon
      points={`${x},${y} ${x + 45},${y} ${x + 45 + (mirror ? -8 : 8)},${y - 7} ${x + (mirror ? -8 : 8)},${y - 7}`}
      fill="#0f4d94"
      stroke="#258cff"
      strokeWidth="1"
    />
    <rect x={x} y={y} width="45" height="16" rx="3" fill="#05234c" stroke="#2387f7" strokeWidth="1.1" />
    <rect x={x + 8} y={y + 5} width="18" height="2.2" rx="1" fill="#2999ff" />
    <circle cx={x + 35} cy={y + 6} r="1.6" fill="#75c9ff" className="solutions-v4-server-led" />
    <circle cx={x + 35} cy={y + 11} r="1.2" fill="#2076e5" className="solutions-v4-server-led" />
  </g>
);

const CloudArchitectureVisual = () => {
  const links = [
    'M230 168 C185 170 142 155 101 134',
    'M230 168 C275 170 318 155 359 134',
    'M230 181 C165 188 111 201 68 217',
    'M230 181 C295 188 349 201 392 217',
    'M230 193 C194 213 160 231 127 244',
    'M230 193 C266 213 300 231 333 244',
  ];

  return (
    <div className="solution-visual-v4 solution-visual-v4--cloud" aria-hidden="true">
      <svg viewBox="0 0 460 260" preserveAspectRatio="xMidYMid meet">
        <SvgGlowDefs prefix="cloud" />
        <pattern id="cloud-grid" width="34" height="17" patternUnits="userSpaceOnUse">
          <path d="M0 8.5 L17 0 L34 8.5 L17 17 Z" fill="none" stroke="rgba(43,121,220,.23)" strokeWidth="0.65" />
        </pattern>
        <clipPath id="cloud-grid-clip">
          <polygon points="230,76 448,181 230,258 12,181" />
        </clipPath>

        <ellipse cx="230" cy="145" rx="190" ry="113" fill="url(#cloud-halo)" opacity="0.54" />
        <g clipPath="url(#cloud-grid-clip)">
          <rect x="0" y="70" width="460" height="190" fill="url(#cloud-grid)" />
        </g>

        <g>
          {links.map((d, index) => (
            <g key={d}>
              <path d={d} fill="none" stroke="rgba(35,112,222,.42)" strokeWidth="1.15" strokeDasharray="3 5" />
              <path
                d={d}
                fill="none"
                stroke="rgba(86,181,255,.95)"
                strokeWidth="1.7"
                strokeDasharray="10 46"
                className="solutions-v4-flow-line"
                style={{ animationDelay: `${-index * 0.52}s`, animationDuration: `${2.8 + index * 0.17}s` }}
              />
              <DataPulse path={d} duration={`${3.1 + index * 0.22}s`} begin={`${-index * 0.48}s`} />
            </g>
          ))}
        </g>

        <ServerTower x={78} y={118} scale={0.78} delay="-0.4s" />
        <ServerTower x={347} y={118} scale={0.78} mirror delay="-1.3s" />
        <ServerTower x={38} y={163} scale={1.02} delay="-0.9s" />
        <ServerTower x={395} y={163} scale={1.02} mirror delay="-1.8s" />
        <EdgeDevice x={93} y={231} delay="-0.6s" />
        <EdgeDevice x={322} y={231} mirror delay="-1.5s" />

        <g className="solutions-v4-cloud-shape">
          <ellipse cx="230" cy="61" rx="83" ry="41" fill="rgba(20,112,255,.27)" filter="url(#cloud-strong-glow)" />
          <path
            d="M164 84 C151 84 141 74 141 62 C141 50 151 40 164 39 C169 22 184 12 203 14 C214 1 233 -2 249 6 C266 4 281 15 287 30 C305 31 318 44 318 59 C318 74 306 85 290 85 Z"
            fill="url(#cloud-panel)"
            stroke="#59c2ff"
            strokeWidth="2.2"
            filter="url(#cloud-glow)"
          />
          <path
            d="M160 78 C153 76 149 70 149 63 C149 54 156 47 168 46 C175 29 188 21 204 23 C214 11 232 9 244 17 C260 15 272 25 276 38"
            fill="none"
            stroke="rgba(190,235,255,.7)"
            strokeWidth="2.7"
            strokeLinecap="round"
          />
        </g>

        <g>
          <line x1="230" y1="86" x2="230" y2="127" stroke="rgba(82,181,255,.36)" strokeWidth="1.7" strokeDasharray="4 5" />
          <line x1="230" y1="86" x2="230" y2="127" stroke="#83d1ff" strokeWidth="2" strokeDasharray="7 34" className="solutions-v4-flow-line" />
          <DataPulse path="M230 86 L230 127" duration="2.15s" begin="-0.5s" radius="3" />
        </g>

        <IsometricLayer cx={230} cy={127} width={92} height={30} depth={7} delay="-0.1s" />
        <IsometricLayer cx={230} cy={146} width={126} height={40} depth={9} delay="-0.55s" />
        <IsometricLayer cx={230} cy={168} width={165} height={52} depth={11} delay="-1s" />
        <IsometricLayer cx={230} cy={193} width={205} height={64} depth={13} delay="-1.45s" />

        <g className="solutions-v4-core">
          <ellipse cx="230" cy="169" rx="48" ry="25" fill="url(#cloud-halo)" opacity="0.8" />
          <circle cx="230" cy="169" r="7" fill="#e3f7ff" filter="url(#cloud-strong-glow)" />
          <circle cx="230" cy="169" r="17" fill="none" stroke="rgba(91,197,255,.58)" strokeWidth="1.3" className="solutions-v4-core-ring" />
          <circle cx="230" cy="169" r="27" fill="none" stroke="rgba(37,126,255,.22)" strokeWidth="1" className="solutions-v4-core-ring solutions-v4-core-ring--late" />
        </g>

        {[
          [101, 134], [359, 134], [68, 217], [392, 217], [127, 244], [333, 244],
          [165, 192], [295, 192], [188, 222], [272, 222],
        ].map(([cx, cy], index) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="2.8" fill="#5cb8ff" className="solutions-v4-node" style={{ animationDelay: `${-index * 0.27}s` }} />
            <circle cx={cx} cy={cy} r="6.7" fill="none" stroke="rgba(58,150,255,.24)" strokeWidth="1" className="solutions-v4-node-ring" style={{ animationDelay: `${-index * 0.39}s` }} />
          </g>
        ))}
      </svg>
    </div>
  );
};

const gearPoints = (cx, cy, innerRadius, outerRadius, teeth = 12) => {
  const points = [];
  const steps = teeth * 4;
  for (let i = 0; i < steps; i += 1) {
    const angle = -Math.PI / 2 + (Math.PI * 2 * i) / steps;
    const phase = i % 4;
    const radius = phase === 0 || phase === 1 ? outerRadius : innerRadius;
    points.push(`${cx + Math.cos(angle) * radius},${cy + Math.sin(angle) * radius}`);
  }
  return points.join(' ');
};

const AutomationVisual = () => {
  const routes = [
    'M82 142 H153 C165 142 174 132 174 120 V112 H198',
    'M272 105 H331 V67 H378',
    'M272 126 H351 C363 126 372 136 372 148 V185 H397',
    'M103 151 C135 191 174 202 226 202 H344 C363 202 372 190 372 175',
  ];

  return (
    <div className="solution-visual-v4 solution-visual-v4--automation" aria-hidden="true">
      <svg viewBox="0 0 460 260" preserveAspectRatio="xMidYMid meet">
        <SvgGlowDefs prefix="auto" />
        <ellipse cx="238" cy="132" rx="155" ry="103" fill="url(#auto-halo)" opacity="0.52" />

        {Array.from({ length: 34 }).map((_, i) => {
          const x = 48 + ((i * 47) % 365);
          const y = 35 + ((i * 31) % 185);
          return <circle key={i} cx={x} cy={y} r={i % 5 === 0 ? 1.5 : 1} fill="#2d80e7" opacity={0.13 + (i % 4) * 0.05} />;
        })}

        {routes.map((d, index) => (
          <g key={d}>
            <path d={d} fill="none" stroke="rgba(45,125,235,.5)" strokeWidth="1.35" strokeDasharray={index === 3 ? '3 5' : undefined} />
            <path
              d={d}
              fill="none"
              stroke="rgba(92,190,255,.95)"
              strokeWidth="1.9"
              strokeDasharray="11 58"
              className="solutions-v4-flow-line"
              style={{ animationDelay: `${-index * 0.7}s`, animationDuration: `${2.7 + index * 0.35}s` }}
            />
            <DataPulse path={d} duration={`${3 + index * 0.32}s`} begin={`${-index * 0.58}s`} />
          </g>
        ))}

        <g className="solutions-v4-node-box solutions-v4-auto-robot">
          <rect x="39" y="105" width="74" height="74" rx="14" fill="url(#auto-panel-dark)" stroke="#348fff" strokeWidth="1.6" filter="url(#auto-glow)" />
          <line x1="76" y1="123" x2="76" y2="114" stroke="#73c8ff" strokeWidth="2" />
          <circle cx="76" cy="111" r="3" fill="#73c8ff" />
          <rect x="56" y="126" width="40" height="30" rx="9" fill="#0b3b78" stroke="#62b9ff" strokeWidth="1.5" />
          <circle cx="69" cy="140" r="3" fill="#a4e1ff" />
          <circle cx="83" cy="140" r="3" fill="#a4e1ff" />
          <path d="M68 149 Q76 154 84 149" fill="none" stroke="#5cb8ff" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="52" y1="137" x2="47" y2="137" stroke="#469fff" strokeWidth="2" />
          <line x1="100" y1="137" x2="105" y2="137" stroke="#469fff" strokeWidth="2" />
        </g>

        <g className="solutions-v4-node-box solutions-v4-auto-center">
          <rect x="175" y="77" width="102" height="102" rx="18" fill="url(#auto-panel-dark)" stroke="#45a7ff" strokeWidth="1.8" filter="url(#auto-glow)" />
          <rect x="185" y="87" width="82" height="82" rx="14" fill="rgba(7,37,78,.75)" stroke="rgba(83,171,255,.28)" />
          <polygon points={gearPoints(226, 128, 25, 34, 12)} fill="url(#auto-panel)" stroke="#7dccff" strokeWidth="1.4" className="solutions-v4-gear" />
          <circle cx="226" cy="128" r="16" fill="#071d3e" stroke="#57b7ff" strokeWidth="2" />
          <circle cx="226" cy="128" r="7" fill="#7fcfff" filter="url(#auto-strong-glow)" />
        </g>

        <g className="solutions-v4-node-box">
          <rect x="347" y="31" width="76" height="72" rx="14" fill="url(#auto-panel-dark)" stroke="#378fff" strokeWidth="1.5" filter="url(#auto-glow)" />
          <circle cx="385" cy="53" r="9" fill="#70bfff" />
          <path d="M367 86 C369 72 379 68 385 68 C392 68 401 72 403 86" fill="none" stroke="#70bfff" strokeWidth="3" strokeLinecap="round" />
        </g>

        <g className="solutions-v4-node-box">
          <rect x="350" y="163" width="76" height="73" rx="14" fill="url(#auto-panel-dark)" stroke="#378fff" strokeWidth="1.5" filter="url(#auto-glow)" />
          <ellipse cx="388" cy="184" rx="18" ry="7" fill="#0d4b91" stroke="#69beff" strokeWidth="1.5" />
          <path d="M370 184 V210 C370 214 378 218 388 218 C398 218 406 214 406 210 V184" fill="#072a59" stroke="#69beff" strokeWidth="1.5" />
          <ellipse cx="388" cy="198" rx="18" ry="7" fill="none" stroke="#4aa8f9" strokeWidth="1.25" />
          <ellipse cx="388" cy="210" rx="18" ry="7" fill="none" stroke="#4aa8f9" strokeWidth="1.25" />
        </g>

        {[[153, 142], [174, 112], [331, 67], [351, 126], [372, 185], [226, 202]].map(([cx, cy], index) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="3.2" fill="#7ccaff" className="solutions-v4-node" style={{ animationDelay: `${-index * 0.43}s` }} />
            <circle cx={cx} cy={cy} r="7" fill="none" stroke="rgba(62,158,255,.3)" className="solutions-v4-node-ring" />
          </g>
        ))}
      </svg>
    </div>
  );
};

const MiniBars = ({ x, y, values, width, height, className = '' }) => {
  const gap = 7;
  const barWidth = (width - gap * (values.length - 1)) / values.length;
  return (
    <g className={className}>
      {values.map((value, index) => {
        const barHeight = (value / 100) * height;
        return (
          <rect
            key={`${x}-${index}`}
            x={x + index * (barWidth + gap)}
            y={y + height - barHeight}
            width={barWidth}
            height={barHeight}
            rx="2"
            fill={index % 3 === 0 ? '#1d63d5' : index % 3 === 1 ? '#2e8cff' : '#1751af'}
            className="solutions-v4-data-bar"
            style={{ animationDelay: `${index * 0.11}s` }}
          />
        );
      })}
    </g>
  );
};

const DataGrowthVisual = () => {
  const linePath = 'M34 91 L55 74 L76 83 L98 55 L119 73 L142 49 L164 60 L189 34 L213 46 L238 24';

  return (
    <div className="solution-visual-v4 solution-visual-v4--data" aria-hidden="true">
      <svg viewBox="0 0 460 260" preserveAspectRatio="xMidYMid meet">
        <SvgGlowDefs prefix="data" />
        <ellipse cx="230" cy="132" rx="190" ry="112" fill="url(#data-halo)" opacity="0.4" />
        <rect x="44" y="27" width="372" height="205" rx="16" fill="#061b39" stroke="rgba(64,131,218,.3)" strokeWidth="1.4" />
        <rect x="56" y="39" width="360" height="193" rx="13" fill="rgba(7,27,58,.68)" stroke="rgba(73,143,226,.12)" />

        <g className="solutions-v4-dashboard-panel">
          <rect x="68" y="51" width="228" height="91" rx="9" fill="#0b2750" stroke="rgba(73,137,216,.17)" />
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1="82" y1={68 + i * 17} x2="282" y2={68 + i * 17} stroke="rgba(69,126,196,.16)" strokeWidth="1" />
          ))}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line key={i} x1={83 + i * 39} y1="62" x2={83 + i * 39} y2="130" stroke="rgba(69,126,196,.1)" strokeWidth="1" />
          ))}
          <path d={linePath} fill="none" stroke="#4ba9ff" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" className="solutions-v4-data-line" filter="url(#data-glow)" />
          <path d={`${linePath} L238 130 L34 130 Z`} fill="rgba(41,137,255,.09)" />
          {[34, 76, 119, 164, 213, 238].map((cx, index) => (
            <circle key={cx} cx={cx} cy={[91, 83, 73, 60, 46, 24][index]} r="2.4" fill="#8bd4ff" />
          ))}
        </g>

        <g className="solutions-v4-dashboard-panel">
          <rect x="307" y="51" width="97" height="91" rx="9" fill="#0b2750" stroke="rgba(73,137,216,.17)" />
          <MiniBars x={321} y={69} width={69} height={56} values={[30, 62, 43, 78, 59, 86, 71]} />
        </g>

        <g className="solutions-v4-dashboard-panel">
          <rect x="68" y="153" width="105" height="64" rx="9" fill="#0b2750" stroke="rgba(73,137,216,.17)" />
          <MiniBars x={82} y={166} width={77} height={39} values={[34, 57, 76, 48, 88, 65]} />
        </g>

        <g className="solutions-v4-dashboard-panel">
          <rect x="183" y="153" width="102" height="64" rx="9" fill="#0b2750" stroke="rgba(73,137,216,.17)" />
          <circle cx="234" cy="185" r="22" fill="none" stroke="#123462" strokeWidth="8" />
          <circle
            cx="234"
            cy="185"
            r="22"
            fill="none"
            stroke="#3f9dff"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="138.2"
            strokeDashoffset="44.2"
            transform="rotate(-90 234 185)"
            className="solutions-v4-donut"
            filter="url(#data-glow)"
          />
          <text x="234" y="190" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="700">68%</text>
        </g>

        <g className="solutions-v4-dashboard-panel">
          <rect x="296" y="153" width="108" height="64" rx="9" fill="#0b2750" stroke="rgba(73,137,216,.17)" />
          {[0, 1, 2].map((i) => (
            <g key={i} className="solutions-v4-status-row" style={{ animationDelay: `${i * 0.28}s` }}>
              <circle cx="313" cy={169 + i * 17} r="5" fill="#2f87f4" />
              <circle cx="313" cy={169 + i * 17} r="2" fill="#9ad9ff" />
              <rect x="324" y={166 + i * 17} width={47 - i * 7} height="4" rx="2" fill="#24466d" />
              <rect x="324" y={172 + i * 17} width={29 + i * 4} height="2" rx="1" fill="#173653" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

const DigitalWave = () => {
  const points = useMemo(() => {
    const generated = [];
    for (let row = 0; row < 10; row += 1) {
      for (let col = 0; col < 24; col += 1) {
        const x = col * 48;
        const y = row * 15 + Math.sin(col * 0.55 + row * 0.8) * 12;
        generated.push({ x, y, opacity: 0.1 + ((row + col) % 5) * 0.04 });
      }
    }
    return generated;
  }, []);

  return (
    <svg className="solutions-v4-wave" viewBox="0 0 1150 180" preserveAspectRatio="none" aria-hidden="true">
      <g>
        {Array.from({ length: 10 }).map((_, row) => (
          <path
            key={row}
            d={Array.from({ length: 24 })
              .map((__, col) => {
                const x = col * 48;
                const y = row * 15 + Math.sin(col * 0.55 + row * 0.8) * 12;
                return `${col === 0 ? 'M' : 'L'}${x},${y}`;
              })
              .join(' ')}
            fill="none"
            stroke="rgba(35,112,225,.19)"
            strokeWidth="0.8"
          />
        ))}
        {points.map((point, index) => (
          <circle
            key={`${point.x}-${point.y}`}
            cx={point.x}
            cy={point.y}
            r={index % 17 === 0 ? 2 : 1.15}
            fill="#2f85ee"
            opacity={point.opacity}
            className={index % 17 === 0 ? 'solutions-v4-wave-node' : undefined}
          />
        ))}
      </g>
    </svg>
  );
};

const SolutionCard = ({ icon: Icon, title, description, tags, visual, delay = 0, isActive = true }) => (
  <motion.article
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.18 }}
    transition={{ ...CARD_TRANSITION, delay }}
    className={`solution-card-v4 ${isActive ? 'solution-card-v4--active' : 'solution-card-v4--inactive'}`}
  >
    <div className="solution-card-v4__shine" />
    {visual}

    <div className="solution-card-v4__copy">
      <div className="solution-card-v4__icon" aria-hidden="true">
        <Icon size={36} strokeWidth={1.7} />
      </div>
      <div className="solution-card-v4__text">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>

    <div className="solution-card-v4__tags">
      {tags.map((tag) => (
        <span key={tag} className="solution-card-v4__tag">
          <i aria-hidden="true" />
          {tag}
        </span>
      ))}
    </div>
  </motion.article>
);

const ValueProposition = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);

  const cards = [
    {
      icon: Cloud,
      title: 'Cloud & Arquitectura',
      description: 'Migración, infraestructura, seguridad, escalabilidad y optimización para una operación estable y controlada.',
      tags: ['Migración cloud', 'Seguridad', 'FinOps', 'Escalabilidad'],
      visual: <CloudArchitectureVisual />,
    },
    {
      icon: BrainCircuit,
      title: 'AI & Automatización',
      description: 'Flujos inteligentes, asistentes y procesos integrados para reducir tareas manuales y acelerar la operación.',
      tags: ['Automatización', 'Asistentes IA', 'CRM', 'Integraciones'],
      visual: <AutomationVisual />,
    },
    {
      icon: BarChart3,
      title: 'Data & Growth',
      description: 'Dashboards, business analytics y métricas accionables para tomar mejores decisiones comerciales y operativas.',
      tags: ['Analytics', 'Dashboards', 'KPIs', 'Trazabilidad'],
      visual: <DataGrowthVisual />,
    },
  ];

  const handleScroll = useCallback(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const scrollLeft = track.scrollLeft;
    const trackWidth = track.offsetWidth;
    const centerPosition = scrollLeft + trackWidth / 2;

    const cardsNodes = Array.from(track.children);
    let closestIndex = 0;
    let minDistance = Infinity;

    cardsNodes.forEach((node, index) => {
      const nodeCenter = node.offsetLeft + node.offsetWidth / 2;
      const distance = Math.abs(nodeCenter - centerPosition);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  }, [activeIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (track) {
      let isThrottled = false;
      const onScroll = () => {
        if (!isThrottled) {
          window.requestAnimationFrame(() => {
            handleScroll();
            isThrottled = false;
          });
          isThrottled = true;
        }
      };
      track.addEventListener('scroll', onScroll, { passive: true });
      return () => track.removeEventListener('scroll', onScroll);
    }
  }, [handleScroll]);

  const scrollToCard = (index) => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const cardsNodes = Array.from(track.children);
    if (cardsNodes[index]) {
      const node = cardsNodes[index];
      // Centrar la tarjeta en la vista del track
      const scrollPosition = node.offsetLeft - (track.offsetWidth / 2) + (node.offsetWidth / 2);
      track.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="solutions-v4-section">
      <div className="solutions-v4-background" aria-hidden="true">
        <div className="solutions-v4-orb solutions-v4-orb--top" />
        <div className="solutions-v4-orb solutions-v4-orb--bottom" />
        <DigitalWave />
      </div>

      <div className="solutions-v4-shell">
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={CARD_TRANSITION}
          className="solutions-v4-header"
        >
          <p className="solutions-v4-eyebrow">Líneas de solución</p>
          <h2>
            Tres frentes para convertir
            <br />
            complejidad en crecimiento medible.
          </h2>
          <p className="solutions-v4-lead">
            Integramos arquitectura, automatización y analítica para construir
            <br className="solutions-v4-desktop-break" /> una operación más eficiente, conectada y escalable.
          </p>
        </motion.header>

        <div className="mobile-carousel">
          <div className="solutions-v4-grid mobile-carousel-track" ref={trackRef}>
            {cards.map((card, index) => (
              <SolutionCard key={card.title} {...card} delay={index * 0.12} isActive={index === activeIndex} />
            ))}
          </div>

          <div className="mobile-carousel-controls">
            <button 
              className="mobile-carousel-btn"
              aria-label="Tarjeta anterior" 
              onClick={() => scrollToCard(activeIndex - 1)}
              disabled={activeIndex === 0}
            >
              <ChevronLeft size={24} />
            </button>
            <div className="mobile-carousel-dots" role="tablist" aria-label="Navegación de tarjetas">
              {cards.map((_, idx) => (
                <button
                  key={idx}
                  role="tab"
                  aria-selected={idx === activeIndex}
                  aria-label={`Ir a tarjeta ${idx + 1} de ${cards.length}`}
                  className={`mobile-carousel-dot ${idx === activeIndex ? 'active' : ''}`}
                  onClick={() => scrollToCard(idx)}
                />
              ))}
            </div>
            <button 
              className="mobile-carousel-btn"
              aria-label="Siguiente tarjeta" 
              onClick={() => scrollToCard(activeIndex + 1)}
              disabled={activeIndex === cards.length - 1}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="solutions-v4-strategy-row">
          <div className="solutions-v4-wire solutions-v4-wire--left" aria-hidden="true">
            <span className="solutions-v4-wire__dot solutions-v4-wire__dot--outer" />
            <span className="solutions-v4-wire__pulse" />
            <span className="solutions-v4-wire__dot solutions-v4-wire__dot--inner" />
          </div>

          <div className="solutions-v4-strategy">
            Una estrategia integral: infraestructura sólida + procesos inteligentes + decisiones basadas en datos.
          </div>

          <div className="solutions-v4-wire solutions-v4-wire--right" aria-hidden="true">
            <span className="solutions-v4-wire__dot solutions-v4-wire__dot--inner" />
            <span className="solutions-v4-wire__pulse" />
            <span className="solutions-v4-wire__dot solutions-v4-wire__dot--outer" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;