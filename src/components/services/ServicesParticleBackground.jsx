import React, { useEffect, useRef } from 'react';

const ServicesParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Left grid nodes
    const leftNodes = [];
    const numLeftNodes = 22;
    for (let i = 0; i < numLeftNodes; i++) {
      leftNodes.push({
        x: Math.random() * 320,
        y: Math.random() * height,
        ox: Math.random() * 320,
        oy: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 2 + 1.2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
        pulseVal: Math.random() * Math.PI,
      });
    }

    // Right wave points
    const rightPoints = [];
    const numRows = 7;
    const numCols = 15;
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        rightPoints.push({
          row: r,
          col: c,
          baseX: width - 360 + c * 26,
          baseY: 40 + r * 22,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    const resize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      
      // Recalculate right points base positions
      rightPoints.forEach(p => {
        p.baseX = width - 360 + p.col * 26;
      });
    };

    window.addEventListener('resize', resize);

    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Left Node Network (Fade out towards center)
      leftNodes.forEach((node) => {
        node.pulseVal += node.pulseSpeed;
        node.x += node.vx;
        node.y += node.vy;

        // Bounce left nodes inside boundaries
        if (node.x < 0 || node.x > 380) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Calculate opacity based on x-coordinate (fade towards center)
        const fade = Math.max(0, 1 - (node.x / 380));
        const pulse = 0.5 + Math.sin(node.pulseVal) * 0.4;
        
        ctx.fillStyle = `rgba(36, 107, 253, ${fade * pulse * 0.65})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r + pulse * 0.8, 0, Math.PI * 2);
        ctx.fill();
      });

      // Connections between left nodes
      ctx.lineWidth = 0.85;
      for (let i = 0; i < leftNodes.length; i++) {
        for (let j = i + 1; j < leftNodes.length; j++) {
          const dx = leftNodes[i].x - leftNodes[j].x;
          const dy = leftNodes[i].y - leftNodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const avgX = (leftNodes[i].x + leftNodes[j].x) / 2;
            const fade = Math.max(0, 1 - (avgX / 380));
            ctx.strokeStyle = `rgba(36, 107, 253, ${fade * (1 - dist / 110) * 0.28})`;
            ctx.beginPath();
            ctx.moveTo(leftNodes[i].x, leftNodes[i].y);
            ctx.lineTo(leftNodes[j].x, leftNodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Right Side Undulating Grid/Wave
      rightPoints.forEach((p) => {
        const x = p.baseX + Math.sin(time + p.phase) * 8;
        const y = p.baseY + Math.cos(time * 0.8 + p.phase) * 12 + Math.sin(time + p.col * 0.4) * 8;
        
        // Fade out as it goes left (fade out towards center)
        const leftLimit = width - 400;
        const fade = Math.max(0, Math.min(1, (x - leftLimit) / 360));
        const pulse = 0.6 + Math.sin(time * 1.5 + p.phase) * 0.35;

        ctx.fillStyle = `rgba(96, 165, 250, ${fade * pulse * 0.45})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.6 + pulse * 0.6, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
};

export default ServicesParticleBackground;
