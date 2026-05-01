"use client";

import { useEffect, useRef } from "react";

const STAR_COUNT = 480;
const COLORS = {
  stars: ["255,255,255", "180,150,255", "150,200,255"],
  meteors: ["64,224,208", "30,144,255", "155,89,255"]
};

export function Wallpaper({ variant = "space" }: { variant?: "space" | "dark" }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let stars: any[] = [];
    let meteors: any[] = [];
    let mouse = { x: 0, y: 0 };
    let frameId: number;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: STAR_COUNT }, createStar);
    };

    function createStar() {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      return {
        x, y, baseX: x, baseY: y,
        size: Math.random() * 1.5,
        speed: Math.random() * 0.3 + 0.05,
        baseOpacity: Math.random() * 0.7 + 0.1,
        twinkle: Math.random() * 0.02,
        color: COLORS.stars[Math.floor(Math.random() * COLORS.stars.length)]
      };
    }

    function createMeteor() {
      return {
        x: Math.random() * canvas.width + 200,
        y: Math.random() * canvas.height * 0.4,
        len: Math.random() * 100 + 70,
        speed: Math.random() * 8 + 7,
        opacity: 1,
        color: COLORS.meteors[Math.floor(Math.random() * COLORS.meteors.length)]
      };
    }

    const drawBackground = () => {
      const { width: w, height: h } = canvas;
      if (variant === "dark") {
        const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w);
        ["#050505", "#020202", "#000000"].forEach((c, i) => g.addColorStop(i * 0.5, c));
        ctx.fillStyle = g;
      } else {
        const g1 = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.5, w);
        g1.addColorStop(0, "#1a1035"); g1.addColorStop(0.4, "#0b0a20"); g1.addColorStop(1, "#02030a");
        ctx.fillStyle = g1;
        ctx.fillRect(0, 0, w, h);

        const g2 = ctx.createLinearGradient(0, h * 0.3, w, h * 0.7);
        g2.addColorStop(0, "transparent"); g2.addColorStop(0.5, "rgba(138, 43, 226, 0.08)"); g2.addColorStop(1, "transparent");
        ctx.fillStyle = g2;
      }
      ctx.fillRect(0, 0, w, h);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground();

      stars.forEach(s => {
        const dx = s.x - mouse.x, dy = s.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const f = (120 - dist) / 120;
          s.x += dx * f * 0.05; s.y += dy * f * 0.05;
        } else {
          s.x += (s.baseX - s.x) * 0.02; s.y += (s.baseY - s.y) * 0.02;
        }
        s.y += s.speed;
        if (s.y > canvas.height) s.y = 0;
        
        ctx.beginPath();
        ctx.fillStyle = `rgba(${s.color}, ${s.baseOpacity + Math.sin(Date.now() * s.twinkle * 0.1) * 0.3})`;
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (Math.random() < 0.008) meteors.push(createMeteor());
      meteors = meteors.filter(m => {
        m.x -= m.speed; m.y += m.speed * 0.6; m.opacity -= 0.015;
        if (m.opacity <= 0) return false;
        
        const grad = ctx.createLinearGradient(m.x, m.y, m.x + m.len, m.y - m.len * 0.6);
        grad.addColorStop(0, `rgba(${m.color}, ${m.opacity})`);
        grad.addColorStop(1, "transparent");
        ctx.strokeStyle = grad; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(m.x + m.len, m.y - m.len * 0.6); ctx.stroke();
        return true;
      });

      frameId = requestAnimationFrame(animate);
    };

    const handleMouse = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("resize", init);
    window.addEventListener("mousemove", handleMouse);
    
    init();
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [variant]);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10 bg-black" />;
}