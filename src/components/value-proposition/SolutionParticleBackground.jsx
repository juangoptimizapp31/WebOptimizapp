import React, { useEffect, useRef } from 'react';

const SolutionParticleBackground = () => {
  const canvasRef = useRef(null);
  const stateRef = useRef({
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

    const handleVisibility = () => {
      stateRef.current.isActive = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

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
      const w = state.width;
      const h = state.height;

      if (!state.reducedMotion) {
        state.time += 0.003;
      }

      // Draw left corner wave
      ctx.lineWidth = 0.5;
      const cols = 15;
      const rows = 8;
      const gap = 16;

      // Left wave (bottom left)
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const baseX = c * gap + 30;
          const baseY = h - (r * gap) - 30;
          
          let waveY = 0;
          if (!state.reducedMotion) {
            waveY = Math.sin(state.time + baseX * 0.02 + baseY * 0.015) * 6;
          }

          const x = baseX;
          const y = baseY + waveY;

          // Fade out towards center and top
          const distFromLeft = x / (w * 0.35);
          const distFromBottom = (h - y) / (h * 0.35);
          const alpha = Math.max(0, (1 - distFromLeft) * (1 - distFromBottom) * 0.3);

          if (alpha > 0.01) {
            ctx.fillStyle = `rgba(36, 107, 253, ${alpha})`;
            ctx.beginPath();
            ctx.arc(x, y, 1.2, 0, Math.PI * 2);
            ctx.fill();

            // Suttle connection lines
            if (c < cols - 1) {
              ctx.strokeStyle = `rgba(36, 107, 253, ${alpha * 0.25})`;
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(x + gap, y);
              ctx.stroke();
            }
          }
        }
      }

      // Right wave (bottom right)
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const baseX = w - (c * gap) - 30;
          const baseY = h - (r * gap) - 30;

          let waveY = 0;
          if (!state.reducedMotion) {
            waveY = Math.sin(state.time + (w - baseX) * 0.02 + baseY * 0.015) * 6;
          }

          const x = baseX;
          const y = baseY + waveY;

          const distFromRight = (w - x) / (w * 0.35);
          const distFromBottom = (h - y) / (h * 0.35);
          const alpha = Math.max(0, (1 - distFromRight) * (1 - distFromBottom) * 0.3);

          if (alpha > 0.01) {
            ctx.fillStyle = `rgba(36, 107, 253, ${alpha})`;
            ctx.beginPath();
            ctx.arc(x, y, 1.2, 0, Math.PI * 2);
            ctx.fill();

            if (c < cols - 1) {
              ctx.strokeStyle = `rgba(36, 107, 253, ${alpha * 0.25})`;
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(x - gap, y);
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      mediaQuery.removeEventListener('change', handleMotionChange);
      document.removeEventListener('visibilitychange', handleVisibility);
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

export default SolutionParticleBackground;
