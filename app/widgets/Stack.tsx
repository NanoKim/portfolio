"use client";

import { StackS } from "@/app/shared/constants/stacks";
import { Star } from "@/app/components/Star";
import { useRef } from "react";

type StackLevel = "A" | "B" | "C";

const levelMeta = {
  A: {
    title: "자신 있습니다",
    glow: "from-indigo-500 via-blue-500 to-cyan-400",
    value: 93,
  },
  B: {
    title: "문제 없이 다룹니다",
    glow: "from-blue-500 via-cyan-400 to-sky-400",
    value: 80,
  },
  C: {
    title: "더 잘해질 수 있습니다",
    glow: "from-purple-500 via-pink-500 to-indigo-400",
    value: 68,
  },
};

function SkillChip({ name }: { name: string }) {
  return (
    <div className="relative inline-flex px-3 py-1.5 group/chip">
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          border: "1px solid transparent",
          backgroundImage: "linear-gradient(to right, rgba(59, 130, 246, 0.6), rgba(168, 85, 247, 0.6))",
          backgroundOrigin: "border-box",
          backgroundClip: "border-box",
          WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude",
        }}
      />
      <span className="relative text-xs text-white/90 group-hover/chip:text-white transition-colors">
        {name}
      </span>
    </div>
  );
}

function StackField({ level }: { level: StackLevel }) {
  const items = StackS.filter((s) => s.lev === level);
  const meta = levelMeta[level];
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
      className="stack-card-wrapper relative p-[1px] rounded-2xl group overflow-hidden transition-all duration-500 hover:-translate-y-1 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_auto] animate-gradient opacity-75 group-hover:opacity-0 transition-opacity duration-500" />
      
      <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_25%,#3b82f6_50%,#a855f7_75%,transparent_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_3s_linear_infinite] transition-opacity duration-500" />

      <div className="relative p-7 rounded-[15px] bg-slate-950/95 backdrop-blur-xl h-full overflow-hidden z-10">
        <div 
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.25), transparent 40%)`
          }}
        />

        <div className="relative z-10 flex items-center justify-between mb-8">
          <h3 className="text-white text-sm font-bold tracking-tight group-hover:text-blue-400 transition-colors">
            {meta.title}
          </h3>
          <Star value={meta.value} />
        </div>

        <div className="relative z-10 flex flex-wrap gap-2 justify-center md:justify-start">
          {items.map((item) => (
            <SkillChip key={item.id} name={item.id} />
          ))}
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </div>
    </div>
  );
}

export function Stack() {
  return (
    <section
      id="stack"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
    >
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        <StackField level="A" />
        <StackField level="B" />
        <StackField level="C" />
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
        .animate-gradient {
          animation: gradient 6s ease infinite;
        }
      `}</style>
    </section>
  );
}