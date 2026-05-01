"use client";

import { useEffect, useRef } from "react";

export function Wallpaper({ variant = "space" }: { variant?: "space" | "dark" }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const mouse = { x: 0, y: 0 };

    let width = 0;
    let height = 0;

    let stars: Star[] = [];
    let meteors: Meteor[] = [];

    const STAR_COUNT = 180;

    class Star {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      speed: number;
      opacity: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 1.5;
        this.speed = Math.random() * 0.3 + 0.05;
        this.opacity = Math.random();

        const colors = [
          "255,255,255",
          "180,150,255",
          "150,200,255",
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const maxDist = 120;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          this.x += dx * force * 0.05;
          this.y += dy * force * 0.05;
        } else {
          this.x += (this.baseX - this.x) * 0.02;
          this.y += (this.baseY - this.y) * 0.02;
        }

        this.y += this.speed;

        if (this.y > height) {
          this.y = 0;
          this.x = Math.random() * width;
          this.baseX = this.x;
          this.baseY = this.y;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class Meteor {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height * 0.3;
        this.length = Math.random() * 80 + 50;
        this.speed = Math.random() * 6 + 6;
        this.opacity = 1;
      }

      update() {
        this.x -= this.speed;
        this.y += this.speed * 0.6;
        this.opacity -= 0.01;
      }

      draw() {
        const tailX = this.x + this.length;
        const tailY = this.y - this.length * 0.6;

        const gradient = ctx.createLinearGradient(
          this.x,
          this.y,
          tailX,
          tailY
        );

        gradient.addColorStop(0, `rgba(255,255,255,${this.opacity})`);
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }

      isDead() {
        return this.opacity <= 0;
      }
    }

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width;
      canvas.height = height;

      stars = [];
      meteors = [];

      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push(new Star());
      }

      mouse.x = width / 2;
      mouse.y = height / 2;
    };

    const handleResize = () => init();
    const handleMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouse);

    init();

    function drawBackground() {
      if (variant === "dark") {
        const gradient = ctx.createRadialGradient(
          width / 2,
          height / 2,
          0,
          width / 2,
          height / 2,
          width
        );

        gradient.addColorStop(0, "#050505");
        gradient.addColorStop(0.5, "#020202");
        gradient.addColorStop(1, "#000000");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        return;
      }

      const gradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        0,
        width * 0.5,
        height * 0.5,
        width
      );

      gradient.addColorStop(0, "#1a1035");
      gradient.addColorStop(0.4, "#0b0a20");
      gradient.addColorStop(1, "#02030a");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const aurora = ctx.createRadialGradient(
        width * 0.5,
        height * 0.3,
        0,
        width * 0.5,
        height * 0.3,
        width * 0.6
      );

      aurora.addColorStop(0, "rgba(120,80,255,0.25)");
      aurora.addColorStop(0.5, "rgba(80,150,255,0.15)");
      aurora.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = aurora;
      ctx.fillRect(0, 0, width, height);

      const nebula = ctx.createRadialGradient(
        width * 0.3,
        height * 0.6,
        0,
        width * 0.3,
        height * 0.6,
        width * 0.5
      );

      nebula.addColorStop(0, "rgba(200,100,255,0.15)");
      nebula.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, width, height);
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      drawBackground();

      stars.forEach((s) => {
        s.update();
        s.draw();
      });

      if (Math.random() < 0.006) {
        meteors.push(new Meteor());
      }

      meteors.forEach((m, i) => {
        m.update();
        m.draw();
        if (m.isDead()) meteors.splice(i, 1);
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
    />
  );
}