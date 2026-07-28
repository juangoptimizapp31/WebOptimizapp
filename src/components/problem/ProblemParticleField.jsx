import React, { useEffect, useRef } from 'react';

const ProblemParticleField = () => {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    points: [],
    width: 0,
    height: 0,
    time: 0,
    reducedMotion: false,
    isActive: true,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    stateRef.current.reducedMotion = mediaQuery.matches;
    const handleMotionChange = (e) => {
      stateRef.current.reducedMotion = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    const handleVisibilityChange = () => {
      stateRef.current.isActive = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      stateRef.current.width = rect.width;
      stateRef.current.height = rect.height;
      initGrid(rect.width, rect.height);
    };

    const initGrid = (w, h) => {
      const points = [];
      const cols = 22;
      const rows = 12;
      
      for (let c = 0; c < cols; c++) {
        points[c] = [];
        for (let r = 0; r < rows; r++) {
          points[c][r] = {
            baseX: (c / (cols - 1)) * w * 1.1 - (w * 0.05),
            baseY: h * 0.2 + (r / (rows - 1)) * h * 0.8,
            x: 0,
            y: 0,
            alpha: 0
          };
        }
      }
      stateRef.current.points = points;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationFrameId;
    
    const render = () => {
      if (!stateRef.current.isActive) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, stateRef.current.width, stateRef.current.height);

      const state = stateRef.current;
      const points = state.points;
      const w = state.width;
      const h = state.height;

      if (!state.reducedMotion) {
        state.time += 0.005; // Slow undulating movement
      }

      const cols = points.length;
      if (cols === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      const rows = points[0].length;

      // Update positions
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const pt = points[c][r];
          
          let waveY = 0;
          if (!state.reducedMotion) {
            waveY = Math.sin(state.time + pt.baseX * 0.015 + pt.baseY * 0.01) * 10;
          }

          pt.x = pt.baseX;
          pt.y = pt.baseY + waveY;

          // Determine opacity: fade towards right and top
          const fadeRight = Math.max(0, 1 - (pt.baseX / w));
          const fadeTop = Math.max(0, pt.baseY / h);
          pt.alpha = Math.min(1, fadeRight * fadeTop * 0.45);
        }
      }

      // Draw grid lines
      ctx.lineWidth = 0.7;
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const pt = points[c][r];
          
          if (pt.alpha <= 0.01) continue;

          if (c < cols - 1) {
            const nextPt = points[c + 1][r];
            const avgAlpha = (pt.alpha + nextPt.alpha) * 0.5;
            if (avgAlpha > 0.01) {
              ctx.strokeStyle = `rgba(59, 130, 246, ${avgAlpha * 0.18})`;
              ctx.beginPath();
              ctx.moveTo(pt.x, pt.y);
              ctx.lineTo(nextPt.x, nextPt.y);
              ctx.stroke();
            }
          }

          if (r < rows - 1) {
            const nextPt = points[c][r + 1];
            const avgAlpha = (pt.alpha + nextPt.alpha) * 0.5;
            if (avgAlpha > 0.01) {
              ctx.strokeStyle = `rgba(59, 130, 246, ${avgAlpha * 0.18})`;
              ctx.beginPath();
              ctx.moveTo(pt.x, pt.y);
              ctx.lineTo(nextPt.x, nextPt.y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw points
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const pt = points[c][r];
          if (pt.alpha <= 0.01) continue;

          const isBright = (c + r) % 5 === 0;
          const pointAlpha = isBright ? pt.alpha * 0.8 : pt.alpha * 0.5;
          const color = isBright ? 'rgba(96, 165, 250, ' : 'rgba(36, 107, 253, ';

          ctx.fillStyle = `${color}${pointAlpha})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, isBright ? 2 : 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      mediaQuery.removeEventListener('change', handleMotionChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-1"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default ProblemParticleField;
