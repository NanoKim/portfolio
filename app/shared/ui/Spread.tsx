"use client";

import { useEffect, useRef } from "react";

const COLORS = [
  { c: "255, 0, 127", s: 1.0 },   // Neon Pink
  { c: "255, 0, 255", s: 0.6 },   // Magenta
  { c: "138, 43, 226", s: 1.4 },  // Blue Violet (우주 배경과 연결점)
  { c: "255, 255, 255", s: 0.4 }   // White highlight
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
        x: x + (Math.random() - 0.5) * 25,
        y: y + (Math.random() - 0.5) * 25,
        vx: (Math.random() - 0.5) * (isFine ? 1.8 : 0.9),
        vy: (Math.random() - 0.5) * (isFine ? 1.8 : 0.9),
        size: isFine ? Math.random() * 0.7 + 0.3 : Math.random() * p.s + 1.2,
        life: 1.0,
        decay: isFine ? Math.random() * 0.035 + 0.012 : Math.random() * 0.018 + 0.006,
        color: p.c,
        isFine
      };
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "screen";

      trailsRef.current = trailsRef.current.filter(t => {
        t.x += t.vx; t.y += t.vy;
        t.vx *= 0.99; t.vy *= 0.99;
        t.life -= t.decay;
        if (t.life <= 0) return false;

        const size = t.isFine ? t.size : t.size * (1 + (1 - t.life) * 0.6);
        const grad = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, size * (t.isFine ? 2.5 : 7));
        const alpha = t.life * (t.isFine ? 0.9 : 0.5);
        
        grad.addColorStop(0, `rgba(${t.color}, ${alpha})`);
        grad.addColorStop(0.4, `rgba(${t.color}, ${alpha * 0.3})`);
        grad.addColorStop(1, "transparent");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(t.x, t.y, size * (t.isFine ? 2.5 : 7), 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      frameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // 핑크/마젠타 비중을 높여서 커서와 어울리게 생성
      for (let i = 0; i < 4; i++) {
        trailsRef.current.push(createTrail(e.clientX, e.clientY, false));
      }
      for (let i = 0; i < 6; i++) {
        trailsRef.current.push(createTrail(e.clientX, e.clientY, true));
      }
    };

    window.addEventListener("resize", init);
    window.addEventListener("mousemove", handleMouseMove);
    init();
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-[9998]" />;
}