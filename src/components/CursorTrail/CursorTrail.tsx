import { useEffect, useRef } from 'react';

interface Trail {
  x: number;
  y: number;
  alpha: number;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailsRef = useRef<Trail[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Add trail point
      trailsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        alpha: 1,
      });

      // Limit trail length
      if (trailsRef.current.length > 20) {
        trailsRef.current.shift();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw trails
      trailsRef.current.forEach((trail, index) => {
        trail.alpha -= 0.05;

        if (trail.alpha > 0) {
          const size = 8 - index * 0.3;
          ctx.save();
          ctx.globalAlpha = trail.alpha;
          
          // Gradient circle
          const gradient = ctx.createRadialGradient(trail.x, trail.y, 0, trail.x, trail.y, size);
          gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
          gradient.addColorStop(0.5, 'rgba(255, 192, 203, 0.8)');
          gradient.addColorStop(1, 'rgba(255, 192, 203, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(trail.x, trail.y, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      // Remove faded trails
      trailsRef.current = trailsRef.current.filter(t => t.alpha > 0);

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
