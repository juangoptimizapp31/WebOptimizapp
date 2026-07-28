import React, { useEffect, useRef } from 'react';

const MethodParticleWave = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const nodes = [];
    const numNodes = 28;
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * (width * 0.45),
        y: height - 250 + Math.random() * 250,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2 + 1,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const resize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', resize);

    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Render bottom-left tech mesh nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Keep inside bottom left 45% of width
        if (node.x < 0 || node.x > width * 0.45) node.vx *= -1;
        if (node.y < height - 280 || node.y > height) node.vy *= -1;

        // Wave oscillation offset
        const yOffset = Math.sin(time + node.phase) * 6;

        // Calculate opacity (fade towards center right and top)
        const xFade = Math.max(0, 1 - (node.x / (width * 0.45)));
        const yFade = Math.max(0, (node.y - (height - 280)) / 280);
        const fade = xFade * yFade;

        const pulse = 0.5 + Math.sin(time * 2 + node.phase) * 0.4;

        ctx.fillStyle = `rgba(36, 107, 253, ${fade * pulse * 0.5})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y + yOffset, node.r + pulse * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render lines between nodes
      ctx.lineWidth = 0.85;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const avgX = (nodes[i].x + nodes[j].x) / 2;
            const avgY = (nodes[i].y + nodes[j].y) / 2;
            
            const xFade = Math.max(0, 1 - (avgX / (width * 0.45)));
            const yFade = Math.max(0, (avgY - (height - 280)) / 280);
            const fade = xFade * yFade;

            ctx.strokeStyle = `rgba(36, 107, 253, ${fade * (1 - dist / 100) * 0.22})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y + Math.sin(time + nodes[i].phase) * 6);
            ctx.lineTo(nodes[j].x, nodes[j].y + Math.sin(time + nodes[j].phase) * 6);
            ctx.stroke();
          }
        }
      }

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
      style={{ opacity: 0.8 }}
    />
  );
};

export default MethodParticleWave;
