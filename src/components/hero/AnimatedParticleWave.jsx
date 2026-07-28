import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

const AnimatedParticleWave = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    points: [],
    explosions: [],
    width: 0,
    height: 0,
    mouseX: -9999,
    mouseY: -9999,
    targetMouseX: -9999,
    targetMouseY: -9999,
    time: 0,
    reducedMotion: false,
    isActive: true,
  });

  // Expose interaction methods to parent
  useImperativeHandle(ref, () => ({
    handleMouseMove: (clientX, clientY) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      stateRef.current.targetMouseX = clientX - rect.left;
      stateRef.current.targetMouseY = clientY - rect.top;
    },
    handleMouseLeave: () => {
      stateRef.current.targetMouseX = -9999;
      stateRef.current.targetMouseY = -9999;
    },
    triggerExplosion: (clientX, clientY) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      if (x >= 0 && x <= stateRef.current.width && y >= 0 && y <= stateRef.current.height) {
        createExplosion(x, y);
      }
    }
  }));

  const createExplosion = (x, y) => {
    const particleCount = Math.floor(Math.random() * 9) + 14; // 14 to 22 particles
    const explosionParticles = [];
    
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2.8 + 1.2;
      explosionParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1.0,
        color: Math.random() > 0.4 ? 'rgba(59, 130, 246, ' : 'rgba(96, 165, 250, ',
        size: Math.random() * 2.2 + 1.2
      });
    }

    stateRef.current.explosions.push({
      x,
      y,
      radius: 0,
      maxRadius: Math.random() * 35 + 45,
      opacity: 1.0,
      particles: explosionParticles,
      duration: Math.random() * 400 + 600, // 600ms to 1000ms
      startTime: Date.now()
    });
  };

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
      const cols = 32;
      const rows = 16;
      
      for (let c = 0; c < cols; c++) {
        points[c] = [];
        for (let r = 0; r < rows; r++) {
          points[c][r] = {
            baseX: (c / (cols - 1)) * w * 1.15 - (w * 0.08),
            baseY: h * 0.15 + (r / (rows - 1)) * h * 0.9,
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

    let explosionTimeout;
    const scheduleExplosion = () => {
      const delay = Math.random() * 2200 + 2800; // 2.8 to 5 seconds
      explosionTimeout = setTimeout(() => {
        if (stateRef.current.isActive && !stateRef.current.reducedMotion) {
          const w = stateRef.current.width;
          const h = stateRef.current.height;
          const rx = Math.random() * w * 0.75;
          const ry = h * 0.25 + Math.random() * h * 0.65;
          createExplosion(rx, ry);
        }
        scheduleExplosion();
      }, delay);
    };
    scheduleExplosion();

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

      state.mouseX += (state.targetMouseX - state.mouseX) * 0.1;
      state.mouseY += (state.targetMouseY - state.mouseY) * 0.1;

      if (!state.reducedMotion) {
        state.time += 0.009;
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
            waveY = Math.sin(state.time * 2.2 + pt.baseX * 0.01 + pt.baseY * 0.007) * 16;
            waveY += Math.cos(state.time * 1.3 + pt.baseX * 0.004) * 9;
          }

          let pushX = 0;
          let pushY = 0;
          if (state.mouseX > -5000) {
            const dx = pt.baseX - state.mouseX;
            const dy = (pt.baseY + waveY) - state.mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 100;
            if (dist < radius) {
              const force = (radius - dist) / radius;
              pushX = (dx / dist) * force * 18;
              pushY = (dy / dist) * force * 18;
            }
          }

          pt.x = pt.baseX + pushX;
          pt.y = pt.baseY + waveY + pushY;

          // Determine opacity: fade towards right and top
          const fadeRight = Math.max(0, 1.05 - (pt.baseX / w));
          const fadeTop = Math.max(0, (pt.baseY / h) * 1.15 - 0.15);
          pt.alpha = Math.min(1, fadeRight * fadeTop * 0.9);
        }
      }

      // Draw grid lines with boosted visibility (35%-55% more visible)
      ctx.lineWidth = 0.85;
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const pt = points[c][r];
          
          if (pt.alpha <= 0.01) continue;

          // Connect horizontally
          if (c < cols - 1) {
            const nextPt = points[c + 1][r];
            const avgAlpha = (pt.alpha + nextPt.alpha) * 0.5;
            if (avgAlpha > 0.01) {
              ctx.strokeStyle = `rgba(59, 130, 246, ${avgAlpha * 0.35})`;
              ctx.beginPath();
              ctx.moveTo(pt.x, pt.y);
              ctx.lineTo(nextPt.x, nextPt.y);
              ctx.stroke();
            }
          }

          // Connect vertically
          if (r < rows - 1) {
            const nextPt = points[c][r + 1];
            const avgAlpha = (pt.alpha + nextPt.alpha) * 0.5;
            if (avgAlpha > 0.01) {
              ctx.strokeStyle = `rgba(59, 130, 246, ${avgAlpha * 0.35})`;
              ctx.beginPath();
              ctx.moveTo(pt.x, pt.y);
              ctx.lineTo(nextPt.x, nextPt.y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw points with boosted visibility
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const pt = points[c][r];
          if (pt.alpha <= 0.01) continue;

          const isBright = (c + r) % 6 === 0;
          const pointAlpha = isBright ? pt.alpha * 0.95 : pt.alpha * 0.72;
          const color = isBright ? 'rgba(96, 165, 250, ' : 'rgba(36, 107, 253, ';

          ctx.fillStyle = `${color}${pointAlpha})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, isBright ? 2.2 : 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw explosions (rings & particles)
      const now = Date.now();
      state.explosions = state.explosions.filter(exp => {
        const elapsed = now - exp.startTime;
        const pct = Math.min(elapsed / exp.duration, 1);
        
        if (pct >= 1) return false;

        const ringRadius = exp.maxRadius * pct;
        const ringAlpha = (1 - pct) * 0.75;
        ctx.strokeStyle = `rgba(59, 130, 246, ${ringAlpha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(exp.x, exp.y, ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        const flashRadius = Math.max(0, 10 * (1 - pct * 2.5));
        if (flashRadius > 0) {
          ctx.fillStyle = `rgba(147, 197, 253, ${(1 - pct * 2.5) * 0.95})`;
          ctx.beginPath();
          ctx.arc(exp.x, exp.y, flashRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        exp.particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha = 1 - pct;
          ctx.fillStyle = `${p.color}${p.alpha * 0.95})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });

        return true;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(explosionTimeout);
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
});

AnimatedParticleWave.displayName = 'AnimatedParticleWave';

export default AnimatedParticleWave;
