import { useRef, useEffect } from "react";

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  twinkle: number;
  twinkleSpeed: number;
}

export default function ConstellationBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const stars: Star[] = [];
    const STAR_COUNT = 120;
    const CONNECTION_DIST = 150;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          radius: Math.random() * 1.5 + 0.3,
          opacity: Math.random() * 0.5 + 0.1,
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.01 + 0.003,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // draw connections
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.08;
            ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }

      // draw stars
      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        s.twinkle += s.twinkleSpeed;

        if (s.x < 0) s.x = canvas.width;
        if (s.x > canvas.width) s.x = 0;
        if (s.y < 0) s.y = canvas.height;
        if (s.y > canvas.height) s.y = 0;

        const alpha = s.opacity * (0.5 + Math.sin(s.twinkle) * 0.5);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
        ctx.fill();

        // glow
        if (s.radius > 1) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 212, 255, ${alpha * 0.08})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();
    window.addEventListener("resize", () => { resize(); init(); });

    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="constellation-canvas" />;
}
