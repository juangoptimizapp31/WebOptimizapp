import React, { useEffect, useRef } from 'react';

const ResultsParticleWave = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const nodes = [];
    const numNodes = 40;
    
    // Distribute nodes in the bottom left 42% area
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * (width * 0.42),
        y: height - 180 + Math.random() * 180,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.8,
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
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce within bottom-left zone
        if (node.x < 0 || node.x > width * 0.42) node.vx *= -1;
        if (node.y < height - 220 || node.y > height) node.vy *= -1;

        const yOffset = Math.sin(time * 0.8 + node.phase) * 8;

        // Fade out towards right (42%) and top
        const xFade = Math.max(0, 1 - (node.x / (width * 0.42)));
        const yFade = Math.max(0, (node.y - (height - 220)) / 220);
        const fade = xFade * yFade;

        const pulse = 0.5 + Math.sin(time * 2 + node.phase) * 0.5;

        ctx.fillStyle = `rgba(36, 107, 253, ${fade * pulse * 0.6})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y + yOffset, node.r + pulse * 0.6, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.lineWidth = 0.7;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            const avgX = (nodes[i].x + nodes[j].x) / 2;
            const avgY = (nodes[i].y + nodes[j].y) / 2;
            
            const xFade = Math.max(0, 1 - (avgX / (width * 0.42)));
            const yFade = Math.max(0, (avgY - (height - 220)) / 220);
            const fade = xFade * yFade;

            ctx.strokeStyle = `rgba(36, 107, 253, ${fade * (1 - dist / 90) * 0.25})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y + Math.sin(time * 0.8 + nodes[i].phase) * 8);
            ctx.lineTo(nodes[j].x, nodes[j].y + Math.sin(time * 0.8 + nodes[j].phase) * 8);
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
      style={{ opacity: 0.85 }}
    />
  );
};

export default ResultsParticleWave;
