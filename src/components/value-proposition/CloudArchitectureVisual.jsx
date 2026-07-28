import React from "react";

const IsoLayer = ({
  cx,
  cy,
  width,
  height,
  depth,
  delay = "0s",
  opacity = 1,
}) => {
  const left = cx - width / 2;
  const right = cx + width / 2;
  const top = cy - height / 2;
  const bottom = cy + height / 2;

  const topFace = `${cx},${top} ${right},${cy} ${cx},${bottom} ${left},${cy}`;

  const leftFace = `
    ${left},${cy}
    ${cx},${bottom}
    ${cx},${bottom + depth}
    ${left},${cy + depth}
  `;

  const rightFace = `
    ${cx},${bottom}
    ${right},${cy}
    ${right},${cy + depth}
    ${cx},${bottom + depth}
  `;

  return (
    <g
      className="ca-layer"
      style={{
        animationDelay: delay,
        opacity,
      }}
    >
      <polygon
        points={leftFace}
        fill="url(#ca-layer-side-left)"
        stroke="rgba(42,144,255,0.72)"
        strokeWidth="1.2"
      />

      <polygon
        points={rightFace}
        fill="url(#ca-layer-side-right)"
        stroke="rgba(42,144,255,0.82)"
        strokeWidth="1.2"
      />

      <polygon
        points={topFace}
        fill="url(#ca-layer-top)"
        stroke="#38a8ff"
        strokeWidth="1.8"
        filter="url(#ca-soft-glow)"
      />

      <polygon
        points={`
          ${cx},${top + 9}
          ${right - 19},${cy}
          ${cx},${bottom - 9}
          ${left + 19},${cy}
        `}
        fill="rgba(35,133,255,0.13)"
        stroke="rgba(95,190,255,0.38)"
        strokeWidth="0.8"
      />

      <ellipse
        cx={cx}
        cy={cy + 1}
        rx={Math.max(9, width * 0.08)}
        ry={Math.max(4, height * 0.08)}
        fill="#a7dcff"
        opacity="0.85"
        filter="url(#ca-strong-glow)"
      />
    </g>
  );
};

const Server = ({
  x,
  y,
  scale = 1,
  flip = false,
  delay = "0s",
}) => {
  const frontWidth = 34;
  const height = 58;
  const sideWidth = 12;

  const sidePoints = flip
    ? `
        ${x},${y}
        ${x - sideWidth},${y - 7}
        ${x - sideWidth},${y + height - 7}
        ${x},${y + height}
      `
    : `
        ${x + frontWidth},${y}
        ${x + frontWidth + sideWidth},${y - 7}
        ${x + frontWidth + sideWidth},${y + height - 7}
        ${x + frontWidth},${y + height}
      `;

  const topPoints = flip
    ? `
        ${x},${y}
        ${x + frontWidth},${y}
        ${x + frontWidth - sideWidth},${y - 7}
        ${x - sideWidth},${y - 7}
      `
    : `
        ${x},${y}
        ${x + frontWidth},${y}
        ${x + frontWidth + sideWidth},${y - 7}
        ${x + sideWidth},${y - 7}
      `;

  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale}) translate(${-x} ${-y})`}
      className="ca-server"
      style={{ animationDelay: delay }}
      filter="url(#ca-server-shadow)"
    >
      <polygon
        points={topPoints}
        fill="url(#ca-server-top)"
        stroke="#2d94ff"
        strokeWidth="1.2"
      />

      <polygon
        points={sidePoints}
        fill="url(#ca-server-side)"
        stroke="rgba(40,134,242,0.75)"
        strokeWidth="1.1"
      />

      <rect
        x={x}
        y={y}
        width={frontWidth}
        height={height}
        rx="2"
        fill="url(#ca-server-front)"
        stroke="#2994ff"
        strokeWidth="1.4"
      />

      {[11, 20, 29, 38, 47].map((offset, index) => (
        <g key={offset}>
          <rect
            x={x + 6}
            y={y + offset}
            width="18"
            height="2.4"
            rx="1.2"
            fill="rgba(65,158,255,0.55)"
          />

          <circle
            cx={x + 28}
            cy={y + offset + 1.2}
            r="1.45"
            fill="#6fc4ff"
            className="ca-server-led"
            style={{
              animationDelay: `${index * 0.28}s`,
            }}
          />
        </g>
      ))}
    </g>
  );
};

const FrontModule = ({ x, y, flip = false, delay = "0s" }) => {
  const width = 48;
  const height = 18;
  const depth = 9;

  return (
    <g
      className="ca-module"
      style={{ animationDelay: delay }}
      filter="url(#ca-server-shadow)"
    >
      <polygon
        points={`
          ${x},${y}
          ${x + width},${y}
          ${x + width + (flip ? -depth : depth)},${y - depth}
          ${x + (flip ? -depth : depth)},${y - depth}
        `}
        fill="url(#ca-server-top)"
        stroke="#278fff"
        strokeWidth="1.1"
      />

      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="3"
        fill="url(#ca-module-front)"
        stroke="#2994ff"
        strokeWidth="1.2"
      />

      <rect
        x={x + 9}
        y={y + 6}
        width="21"
        height="2.5"
        rx="1.25"
        fill="#2694ff"
      />

      <circle
        cx={x + 38}
        cy={y + 7.5}
        r="1.8"
        fill="#79caff"
        className="ca-server-led"
      />

      <circle
        cx={x + 38}
        cy={y + 12}
        r="1.4"
        fill="#217cff"
        className="ca-server-led"
        style={{ animationDelay: delay }}
      />
    </g>
  );
};

const DataParticle = ({
  path,
  duration = "3s",
  begin = "0s",
  radius = 2.7,
}) => (
  <circle
    r={radius}
    fill="#a8ddff"
    filter="url(#ca-particle-glow)"
    className="ca-data-particle"
  >
    <animateMotion
      dur={duration}
      begin={begin}
      repeatCount="indefinite"
      path={path}
    />
    <animate
      attributeName="opacity"
      values="0;1;1;0"
      keyTimes="0;0.15;0.82;1"
      dur={duration}
      begin={begin}
      repeatCount="indefinite"
    />
  </circle>
);

const CloudArchitectureVisual = () => {
  const connections = [
    {
      d: "M260 185 C215 184 175 173 137 151",
      delay: "-0.4s",
      duration: "3.3s",
    },
    {
      d: "M260 185 C305 184 344 174 382 151",
      delay: "-1.8s",
      duration: "3.8s",
    },
    {
      d: "M260 196 C193 204 137 211 91 223",
      delay: "-2.3s",
      duration: "3.1s",
    },
    {
      d: "M260 196 C328 204 383 211 430 223",
      delay: "-0.9s",
      duration: "3.6s",
    },
    {
      d: "M260 205 C219 224 181 242 146 257",
      delay: "-1.4s",
      duration: "3.4s",
    },
    {
      d: "M260 205 C301 224 339 242 374 257",
      delay: "-2.8s",
      duration: "3.9s",
    },
  ];

  return (
    <div className="cloud-architecture-visual">
      <svg
        viewBox="0 0 520 300"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Arquitectura cloud conectada con servidores y capas de infraestructura"
      >
        <defs>
          <radialGradient id="ca-background-glow">
            <stop offset="0%" stopColor="#197dff" stopOpacity="0.28" />
            <stop offset="48%" stopColor="#0b4cb0" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#061b37" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="ca-core-glow">
            <stop offset="0%" stopColor="#d5f1ff" stopOpacity="1" />
            <stop offset="22%" stopColor="#55bfff" stopOpacity="0.95" />
            <stop offset="62%" stopColor="#116cff" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#0b4ab2" stopOpacity="0" />
          </radialGradient>

          <linearGradient
            id="ca-cloud-gradient"
            x1="0"
            y1="0"
            x2="0.8"
            y2="1"
          >
            <stop offset="0%" stopColor="#42b5ff" />
            <stop offset="35%" stopColor="#1685ff" />
            <stop offset="72%" stopColor="#0759db" />
            <stop offset="100%" stopColor="#063b91" />
          </linearGradient>

          <linearGradient
            id="ca-cloud-highlight"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#bce7ff" stopOpacity="0.72" />
            <stop offset="48%" stopColor="#57bdff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1681ff" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="ca-layer-top" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#163d78" stopOpacity="0.8" />
            <stop offset="47%" stopColor="#1175dc" stopOpacity="0.62" />
            <stop offset="100%" stopColor="#092d5c" stopOpacity="0.86" />
          </linearGradient>

          <linearGradient
            id="ca-layer-side-left"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#075dcc" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#031b3b" stopOpacity="0.94" />
          </linearGradient>

          <linearGradient
            id="ca-layer-side-right"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#0f80ed" stopOpacity="0.86" />
            <stop offset="100%" stopColor="#05214a" stopOpacity="0.96" />
          </linearGradient>

          <linearGradient
            id="ca-server-front"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#0b4c9b" />
            <stop offset="50%" stopColor="#082f68" />
            <stop offset="100%" stopColor="#051a38" />
          </linearGradient>

          <linearGradient
            id="ca-server-side"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#0b3978" />
            <stop offset="100%" stopColor="#03152d" />
          </linearGradient>

          <linearGradient
            id="ca-server-top"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#176fc9" />
            <stop offset="100%" stopColor="#062451" />
          </linearGradient>

          <linearGradient
            id="ca-module-front"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#0b4e9d" />
            <stop offset="100%" stopColor="#041c3c" />
          </linearGradient>

          <pattern
            id="ca-isometric-grid"
            width="40"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 10 L20 0 L40 10 L20 20 Z"
              fill="none"
              stroke="rgba(48,126,225,0.24)"
              strokeWidth="0.7"
            />
          </pattern>

          <filter
            id="ca-soft-glow"
            x="-80%"
            y="-80%"
            width="260%"
            height="260%"
          >
            <feGaussianBlur stdDeviation="2.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter
            id="ca-strong-glow"
            x="-150%"
            y="-150%"
            width="400%"
            height="400%"
          >
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                0 0 0 0 0.05
                0 0 0 0 0.55
                0 0 0 0 1
                0 0 0 1 0
              "
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter
            id="ca-particle-glow"
            x="-300%"
            y="-300%"
            width="700%"
            height="700%"
          >
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter
            id="ca-server-shadow"
            x="-70%"
            y="-70%"
            width="240%"
            height="240%"
          >
            <feDropShadow
              dx="0"
              dy="7"
              stdDeviation="7"
              floodColor="#00132f"
              floodOpacity="0.75"
            />
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="2.5"
              floodColor="#147dff"
              floodOpacity="0.28"
            />
          </filter>

          <clipPath id="ca-ground-clip">
            <polygon points="260,104 504,211 260,296 16,211" />
          </clipPath>
        </defs>

        <ellipse
          cx="260"
          cy="155"
          rx="205"
          ry="132"
          fill="url(#ca-background-glow)"
        />

        <g clipPath="url(#ca-ground-clip)" opacity="0.9">
          <rect
            x="0"
            y="89"
            width="520"
            height="220"
            fill="url(#ca-isometric-grid)"
          />

          <ellipse
            cx="260"
            cy="207"
            rx="195"
            ry="74"
            fill="none"
            stroke="rgba(34,119,230,0.12)"
            strokeWidth="1"
          />
        </g>

        <g className="ca-connections">
          {connections.map((connection, index) => (
            <g key={connection.d}>
              <path
                d={connection.d}
                fill="none"
                stroke="rgba(37,117,225,0.4)"
                strokeWidth="1.25"
                strokeDasharray="3 5"
              />

              <path
                d={connection.d}
                fill="none"
                stroke="rgba(74,168,255,0.92)"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeDasharray="9 45"
                className="ca-flow-line"
                style={{
                  animationDuration: connection.duration,
                  animationDelay: connection.delay,
                }}
              />

              <DataParticle
                path={connection.d}
                duration={connection.duration}
                begin={`${index * -0.45}s`}
              />
            </g>
          ))}
        </g>

        <Server
          x={105}
          y={121}
          scale={0.78}
          delay="-0.4s"
        />
        <Server
          x={374}
          y={121}
          scale={0.78}
          flip
          delay="-1.2s"
        />
        <Server
          x={58}
          y={166}
          scale={1}
          delay="-0.9s"
        />
        <Server
          x={428}
          y={166}
          scale={1}
          flip
          delay="-1.8s"
        />

        <FrontModule
          x={112}
          y={245}
          delay="-0.7s"
        />
        <FrontModule
          x={360}
          y={245}
          flip
          delay="-1.6s"
        />

        <g className="ca-cloud">
          <ellipse
            cx="260"
            cy="78"
            rx="92"
            ry="48"
            fill="rgba(13,102,255,0.22)"
            filter="url(#ca-strong-glow)"
          />

          <path
            d="
              M190 101
              C175 101 164 89 164 75
              C164 62 174 51 188 49
              C194 30 211 18 232 20
              C244 6 266 1 284 10
              C303 9 320 21 327 38
              C346 39 360 54 360 72
              C360 89 346 102 328 102
              Z
            "
            fill="url(#ca-cloud-gradient)"
            stroke="#56c1ff"
            strokeWidth="2.2"
            filter="url(#ca-soft-glow)"
          />

          <path
            d="
              M190 95
              C181 94 175 87 174 78
              C174 69 181 62 192 61
              C199 41 215 31 235 33
              C247 19 268 17 282 26
              C299 25 312 36 316 50
            "
            fill="none"
            stroke="url(#ca-cloud-highlight)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.88"
          />
        </g>

        <g className="ca-cloud-to-core">
          <line
            x1="260"
            y1="103"
            x2="260"
            y2="147"
            stroke="rgba(82,181,255,0.35)"
            strokeWidth="2"
            strokeDasharray="4 5"
          />

          <line
            x1="260"
            y1="103"
            x2="260"
            y2="147"
            stroke="#81ceff"
            strokeWidth="2.3"
            strokeDasharray="7 38"
            className="ca-vertical-flow"
            filter="url(#ca-soft-glow)"
          />

          <circle
            r="3.4"
            fill="#ddf5ff"
            filter="url(#ca-particle-glow)"
          >
            <animateMotion
              dur="2.1s"
              repeatCount="indefinite"
              path="M260 103 L260 147"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              dur="2.1s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        <IsoLayer
          cx={260}
          cy={151}
          width={102}
          height={34}
          depth={8}
          delay="-0.1s"
        />

        <IsoLayer
          cx={260}
          cy={169}
          width={140}
          height={45}
          depth={10}
          delay="-0.55s"
        />

        <IsoLayer
          cx={260}
          cy={190}
          width={181}
          height={58}
          depth={12}
          delay="-1s"
        />

        <IsoLayer
          cx={260}
          cy={214}
          width={224}
          height={70}
          depth={14}
          delay="-1.45s"
        />

        <g className="ca-core">
          <ellipse
            cx="260"
            cy="190"
            rx="54"
            ry="27"
            fill="url(#ca-core-glow)"
            opacity="0.55"
            className="ca-core-halo"
          />

          <circle
            cx="260"
            cy="189"
            r="6"
            fill="#e4f7ff"
            filter="url(#ca-strong-glow)"
          />

          <circle
            cx="260"
            cy="189"
            r="14"
            fill="none"
            stroke="rgba(91,197,255,0.6)"
            strokeWidth="1.4"
            className="ca-core-ring"
          />

          <circle
            cx="260"
            cy="189"
            r="24"
            fill="none"
            stroke="rgba(37,126,255,0.24)"
            strokeWidth="1"
            className="ca-core-ring ca-core-ring-delayed"
          />
        </g>

        {[
          [137, 151],
          [382, 151],
          [91, 223],
          [430, 223],
          [146, 257],
          [374, 257],
          [188, 207],
          [332, 207],
          [213, 237],
          [307, 237],
        ].map(([cx, cy], index) => (
          <g key={`${cx}-${cy}`}>
            <circle
              cx={cx}
              cy={cy}
              r="3.1"
              fill="#5cb8ff"
              filter="url(#ca-particle-glow)"
              className="ca-grid-node"
              style={{
                animationDelay: `${index * -0.31}s`,
              }}
            />

            <circle
              cx={cx}
              cy={cy}
              r="7"
              fill="none"
              stroke="rgba(58,150,255,0.25)"
              strokeWidth="1"
              className="ca-grid-node-ring"
              style={{
                animationDelay: `${index * -0.42}s`,
              }}
            />
          </g>
        ))}
      </svg>

      <style>{`
        .cloud-architecture-visual {
          position: relative;
          width: 100%;
          height: 255px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          isolation: isolate;
        }

        .cloud-architecture-visual::before {
          content: "";
          position: absolute;
          inset: 5% 8% 0;
          z-index: -1;
          border-radius: 50%;
          background:
            radial-gradient(
              circle at 50% 32%,
              rgba(30, 125, 255, 0.18),
              rgba(13, 67, 150, 0.07) 38%,
              transparent 70%
            );
          filter: blur(12px);
          opacity: 0.9;
          animation: ca-background-breath 5.5s ease-in-out infinite;
        }

        .cloud-architecture-visual svg {
          width: 100%;
          height: 100%;
          display: block;
          overflow: visible;
        }

        .ca-cloud {
          transform-box: fill-box;
          transform-origin: center;
          animation: ca-cloud-breathe 4.8s ease-in-out infinite;
        }

        .ca-layer {
          transform-box: fill-box;
          transform-origin: center;
          animation: ca-layer-light 4.4s ease-in-out infinite;
        }

        .ca-flow-line,
        .ca-vertical-flow {
          animation-name: ca-data-flow;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .ca-vertical-flow {
          animation-duration: 2.1s;
        }

        .ca-server,
        .ca-module {
          transform-box: fill-box;
          transform-origin: center;
          animation: ca-device-receive 4.8s ease-in-out infinite;
        }

        .ca-server-led {
          animation: ca-led-pulse 2.4s ease-in-out infinite;
        }

        .ca-core-halo {
          transform-box: fill-box;
          transform-origin: center;
          animation: ca-core-pulse 3.2s ease-in-out infinite;
        }

        .ca-core-ring {
          transform-box: fill-box;
          transform-origin: center;
          animation: ca-ring-expand 3.1s ease-out infinite;
        }

        .ca-core-ring-delayed {
          animation-delay: 1.25s;
        }

        .ca-grid-node {
          animation: ca-node-pulse 2.8s ease-in-out infinite;
        }

        .ca-grid-node-ring {
          transform-box: fill-box;
          transform-origin: center;
          animation: ca-ring-expand-small 3.4s ease-out infinite;
        }

        .cloud-architecture-visual:hover .ca-flow-line {
          animation-duration: 1.65s !important;
          stroke: rgba(110, 205, 255, 1);
          stroke-width: 2.2;
        }

        .cloud-architecture-visual:hover .ca-cloud {
          filter: brightness(1.13);
        }

        .cloud-architecture-visual:hover .ca-layer {
          filter: brightness(1.16);
        }

        .cloud-architecture-visual:hover::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: -35%;
          width: 28%;
          pointer-events: none;
          z-index: 5;
          opacity: 0;
          transform: skewX(-18deg);
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(92, 190, 255, 0.13),
              transparent
            );
          animation: ca-hover-sweep 900ms ease-out forwards;
        }

        @keyframes ca-background-breath {
          0%,
          100% {
            opacity: 0.72;
            transform: scale(0.96);
          }

          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        @keyframes ca-cloud-breathe {
          0%,
          100% {
            transform: translateY(0) scale(0.985);
            filter: brightness(0.96);
          }

          50% {
            transform: translateY(-2px) scale(1.025);
            filter: brightness(1.12);
          }
        }

        @keyframes ca-layer-light {
          0%,
          100% {
            filter: brightness(0.87);
          }

          45%,
          65% {
            filter: brightness(1.18);
          }
        }

        @keyframes ca-data-flow {
          from {
            stroke-dashoffset: 60;
          }

          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes ca-device-receive {
          0%,
          70%,
          100% {
            filter: brightness(0.92);
          }

          78% {
            filter: brightness(1.28)
              drop-shadow(0 0 7px rgba(48, 146, 255, 0.62));
          }
        }

        @keyframes ca-led-pulse {
          0%,
          100% {
            opacity: 0.35;
          }

          48% {
            opacity: 1;
            filter: drop-shadow(0 0 4px #53b5ff);
          }
        }

        @keyframes ca-core-pulse {
          0%,
          100% {
            opacity: 0.38;
            transform: scale(0.78);
          }

          50% {
            opacity: 0.82;
            transform: scale(1.18);
          }
        }

        @keyframes ca-ring-expand {
          0% {
            opacity: 0.7;
            transform: scale(0.55);
          }

          80%,
          100% {
            opacity: 0;
            transform: scale(1.55);
          }
        }

        @keyframes ca-ring-expand-small {
          0% {
            opacity: 0.6;
            transform: scale(0.45);
          }

          75%,
          100% {
            opacity: 0;
            transform: scale(1.75);
          }
        }

        @keyframes ca-node-pulse {
          0%,
          100% {
            opacity: 0.38;
          }

          50% {
            opacity: 1;
            filter: drop-shadow(0 0 5px #3ca4ff);
          }
        }

        @keyframes ca-hover-sweep {
          0% {
            left: -35%;
            opacity: 0;
          }

          12% {
            opacity: 1;
          }

          88% {
            opacity: 0.7;
          }

          100% {
            left: 112%;
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cloud-architecture-visual *,
          .cloud-architecture-visual::before,
          .cloud-architecture-visual::after {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CloudArchitectureVisual;