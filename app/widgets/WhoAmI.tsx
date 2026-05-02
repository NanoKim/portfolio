"use client";

import { useEffect, useState, useRef } from "react";
import Title from "@/app/components/Title";

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return { count, elementRef };
}

function MetricCard({
  item,
  label,
  suffix,
  desc,
}: {
  item: any;
  label: string;
  suffix: string;
  desc: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={(el) => {
        cardRef.current = el;
        item.elementRef.current = el;
      }}
      onMouseMove={handleMouseMove}
      className="relative p-[1px] rounded-3xl group overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 bg-[length:200%_auto] animate-gradient opacity-40 group-hover:opacity-0 transition-opacity duration-500" />
      <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_25%,#3b82f6_50%,#a855f7_75%,transparent_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_3s_linear_infinite] transition-opacity duration-500" />

      <div className="relative p-10 rounded-[23px] bg-slate-950/90 backdrop-blur-3xl h-full flex flex-col z-10 overflow-hidden">
        <div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-500"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.1), transparent 40%)`,
          }}
        />

        <div className="relative z-10 mb-8">
          <p className="text-blue-500 text-xs font-black tracking-[0.3em] uppercase">
            {label}
          </p>
        </div>

        <div className="relative z-10 mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-bold text-white tracking-tighter group-hover:scale-110 transition-transform duration-500 origin-left inline-block">
              {item.count}
            </span>
            <span className="text-xl text-slate-500 font-medium">{suffix}</span>
          </div>
        </div>

        <div className="relative z-10 mt-auto">
          <p className="text-slate-400 font-light leading-snug break-keep">
            {desc}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </div>
    </div>
  );
}

export function WhoAmI() {
  const exp = useCountUp(2);
  const projects = useCountUp(5);
  const domain = useCountUp(99);

  const metrics = [
    {
      item: exp,
      label: "Full-Stack Dev",
      suffix: "Years",
      desc: "프론트부터 백엔드까지, 금융권 전 계층 아키텍처 설계.",
    },
    {
      item: projects,
      label: "Core Projects",
      suffix: "Cases+",
      desc: "1금융권 대규모 시스템 트래픽 대응 및 실전 운영 경험.",
    },
    {
      item: domain,
      label: "Technical Depth",
      suffix: "%",
      desc: "복잡한 비즈니스 요건을 빈틈없는 코드로 구현하는 완결성.",
    },
  ];

  const keywords = ["Stability", "Scalability", "Optimization", "Fintech"];

  return (
    <section id="whoami" className="relative min-h-screen py-32 px-6 overflow-hidden">
      <Title text="Who am I?" />
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-24 text-center space-y-10 flex flex-col items-center">
          <p className="text-slate-400 text-lg md:text-xl font-light max-w-2xl mx-auto break-keep">
            단순한 구현을 넘어 <span className="text-white font-medium">풀스택 엔지니어링</span>으로 비즈니스의 정답을 제시합니다.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            {keywords.map((kw, i) => (
              <div key={i} className="relative group">
                <div 
                  className="absolute inset-0 rounded-full p-[1px] transition-all duration-700"
                  style={{
                    background: "linear-gradient(90deg, #3b82f6, #a855f7, #3b82f6, #a855f7)",
                    backgroundSize: "300% 100%",
                    animation: "border-wave 4s linear infinite",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "destination-out",
                    maskComposite: "exclude",
                  }}
                />
                <div className="absolute inset-0 rounded-full bg-blue-500/0 group-hover:bg-blue-500/10 blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                <div className="relative px-6 py-2 rounded-full transition-transform duration-300 group-hover:scale-105 flex items-center gap-2">
                  <span className="text-blue-400 font-black text-sm">#</span>
                  <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-300 group-hover:text-white transition-colors duration-300">
                    {kw}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {metrics.map((m, i) => (
            <MetricCard key={i} item={m.item} label={m.label} suffix={m.suffix} desc={m.desc} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes border-wave {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
        .animate-gradient {
          animation: gradient 6s ease infinite;
        }
        .break-keep { word-break: keep-all; }
      `}</style>
    </section>
  );
}