"use client";

import { useEffect, useRef } from "react";

const COLORS = [
  { c: "255, 0, 127", s: 1.0 },
  { c: "255, 0, 255", s: 0.6 },
  { c: "138, 43, 226", s: 1.4 },
  { c: "255, 255, 255", s: 0.4 }
];

export function Spread() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const trailsRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let frameId: number;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    function createTrail(x: number, y: number, isFine = false) {
      const p = COLORS[Math.floor(Math.random() * COLORS.length)];
      return {
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * (isFine ? 1.5 : 0.7),
        vy: (Math.random() - 0.5) * (isFine ? 1.5 : 0.7),
        size: isFine ? Math.random() * 0.5 + 0.2 : Math.random() * p.s + 1.0,
        life: 1.0,
        decay: isFine ? Math.random() * 0.04 + 0.015 : Math.random() * 0.02 + 0.008,
        color: p.c,
        isFine
      };
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "screen";

      trailsRef.current = trailsRef.current.filter(t => {
        t.x += t.vx; t.y += t.vy;
        t.life -= t.decay;
        if (t.life <= 0) return false;

        const size = t.isFine ? t.size : t.size * (1 + (1 - t.life) * 0.5);
        const grad = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, size * 5);
        const alpha = t.life * (t.isFine ? 0.8 : 0.4);
        
        grad.addColorStop(0, `rgba(${t.color}, ${alpha})`);
        grad.addColorStop(1, "transparent");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(t.x, t.y, size * 5, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      frameId = requestAnimationFrame(animate);
    };

    const handleInput = (x: number, y: number) => {
      for (let i = 0; i < 2; i++) trailsRef.current.push(createTrail(x, y, false));
      for (let i = 0; i < 3; i++) trailsRef.current.push(createTrail(x, y, true));
    };

    const onMouseMove = (e: MouseEvent) => handleInput(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleInput(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("resize", init);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    
    init();
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-[9998]" />;
}