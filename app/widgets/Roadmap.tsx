"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Title from "../components/Title";

type Item = {
  id: string;
  view: string;
  title: string;
  desc: string;
};

export function Roadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [path, setPath] = useState("");
  const [isMdUp, setIsMdUp] = useState(false);

  const items: Item[] = [
    { id: "A", view: "2021.03 ~ 2023.11", title: "온더", desc: "GM팀 재무/회계 프로세스 경험 기반 실무 이해 확보" },
    { id: "B", view: "2023.11 ~ 2024.05", title: "KH 정보교육원", desc: "공공데이터 융합 자바 프로그래밍 언어 활용 이수" },
    { id: "C", view: "2024.05", title: "로이솔루션", desc: "개발팀 입사" },
    { id: "D", view: "2024.05 ~ 2024.11", title: "카카오뱅크", desc: "예산 자산 시스템 고도화 구축" },
    { id: "E", view: "2024.12 ~ 2025.02", title: "키움증권", desc: "연결회계 시스템 고도화 구축" },
    { id: "F", view: "2025.03 ~ 2025.12", title: "카카오뱅크", desc: "책무구조도 운영 시스템 구축" },
    { id: "G", view: "2026.01 ~ 2026.04", title: "로이솔루션", desc: "고가용성(HA) 금융 책무구조도 관리 솔루션 구축" },
    { id: "H", view: "2026.04", title: "유브갓프렌즈", desc: "개발팀 입사" },
    { id: "I", view: "2026.04 ~ 現", title: "신한카드", desc: "상시 감시 시스템 구축" },
  ];

  const pathOrder = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsMdUp(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const computePath = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const getPoint = (el: HTMLDivElement) => {
      const rect = el.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top,
      };
    };
    const points = pathOrder
      .map((id) => cardRefs.current[id])
      .filter(Boolean)
      .map((el) => getPoint(el as HTMLDivElement));
    if (points.length < 2) return;
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const midY = (prev.y + curr.y) / 2;
      d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
    }
    setPath(d);
  };

  useLayoutEffect(() => {
    const raf = requestAnimationFrame(() => computePath());
    return () => cancelAnimationFrame(raf);
  }, [isMdUp]);

  useLayoutEffect(() => {
    const handleResize = () => requestAnimationFrame(() => computePath());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getItemById = (id: string | null) => items.find((item) => item.id === id);

  return (
    <section id="roadmap" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32">
      <Title text="Experience" />
      <div ref={containerRef} className="relative w-full max-w-5xl" style={{ isolation: "isolate" }}>
        {isMdUp && (
          <svg 
            className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 ${path ? "opacity-100" : "opacity-0"}`} 
            style={{ zIndex: -1 }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8">
                   <animate attributeName="stop-color" values="#3b82f6;#a855f7;#3b82f6" dur="3s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#a855f7">
                   <animate attributeName="stop-color" values="#a855f7;#3b82f6;#a855f7" dur="3s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8">
                   <animate attributeName="stop-color" values="#3b82f6;#a855f7;#3b82f6" dur="3s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            <path
              d={path}
              stroke="url(#lineGradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="12 6"
              className="animate-[dash_30s_linear_infinite]"
            />
          </svg>
        )}

        <div className={`flex flex-col gap-10 relative z-10 ${!isMdUp ? "items-start" : ""}`}>
          {isMdUp ? (
            [
              ["A", "B", "C"],
              [null, null, "D"],
              ["G", "F", "E"],
              ["H", null, null],
              ["I", null, null],
            ].map((row, rIdx) => (
              <div key={rIdx} className="grid grid-cols-3 items-center">
                {row.map((id, cIdx) => {
                  const item = id ? getItemById(id) : null;
                  if (!item) return <div key={cIdx} />;
                  return (
                    <div
                      key={cIdx}
                      ref={(el) => { cardRefs.current[item.id] = el; }}
                      className={`flex ${
                        cIdx === 0 ? "justify-start" : cIdx === 1 ? "justify-center" : "justify-end"
                      }`}
                    >
                      <RoadmapCard item={item} />
                    </div>
                  );
                })}
              </div>
            ))
          ) : (
            <div className="relative flex flex-col gap-8 items-center w-full">
              {items.map((item) => (
                <div
                  key={item.id}
                  ref={(el) => { cardRefs.current[item.id] = el; }}
                  className="relative flex flex-col items-center w-full z-10"
                >
                  <RoadmapCard item={item} compact />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes border-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes dash {
          to { stroke-dashoffset: -1000; }
        }
        .animate-border-gradient {
          background-size: 200% auto;
          animation: border-gradient 6s ease infinite;
        }
      `}</style>
    </section>
  );
}

function RoadmapCard({
  item,
  compact,
}: {
  item: Item;
  compact?: boolean;
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
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`${compact ? "w-full" : "w-64"} relative p-[1px] rounded-xl group transition-all duration-500 hover:-translate-y-1 shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-border-gradient opacity-75 group-hover:opacity-0 transition-opacity duration-500" />
      
      <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_25%,#3b82f6_50%,#a855f7_75%,transparent_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_3s_linear_infinite] transition-opacity duration-500" />

      <div className="relative h-full p-5 bg-slate-950/95 backdrop-blur-xl rounded-[11px] overflow-hidden z-10">
        <div 
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
          style={{
            background: `radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.15), transparent 60%)`
          }}
        />

        <div className="relative z-20">
          <div className="flex items-start justify-between">
            <h3 className="text-white font-bold text-sm group-hover:text-blue-400 transition-colors duration-300">
              {item.title}
            </h3>
            {!compact && (
              <span className="text-[10px] text-white/70 uppercase tracking-wider">
                {item.view}
              </span>
            )}
          </div>

          <div className="w-8 h-[1px] bg-white/20 my-3 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-700" />

          <p className="text-white/80 text-sm leading-relaxed">
            {item.desc}
          </p>

          {compact && (
            <p className="text-[10px] text-white/50 mt-3 uppercase tracking-tight">
              {item.view}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}