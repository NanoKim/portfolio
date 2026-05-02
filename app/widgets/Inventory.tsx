"use client";

import { SECTIONS } from "@/app/shared/constants/projects";
import { TagRow } from "../components/TagRow";
import { useRef } from "react";
import Title from "../components/Title";

function InventoryCard({ item }: { item: any }) {
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
      className="inventory-card-wrapper relative p-[1px] rounded-xl group overflow-hidden transition-all duration-500 hover:-translate-y-1 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-[length:200%_auto] animate-gradient opacity-75 group-hover:opacity-0 transition-opacity duration-500" />
      
      <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_25%,#3b82f6_50%,#a855f7_75%,transparent_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_3s_linear_infinite] transition-opacity duration-500" />

      <div className="relative h-full p-5 text-white bg-slate-950/95 backdrop-blur-xl rounded-[11px] overflow-hidden space-y-3 z-10">
        <div 
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.2), transparent 40%)`
          }}
        />

        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div className="text-sm sm:text-base font-semibold group-hover:text-blue-400 transition-colors">
              {item.title}
            </div>
            <div className="text-[10px] text-white/60 uppercase tracking-wider">
              {item.period}
            </div>
          </div>

          <div className="flex gap-1 text-[10px] border-t border-white/20 pt-2 mt-2 text-white/70 uppercase font-bold">
            <span className="w-1/2">Customer</span>
            <span className="w-1/2">Affiliation</span>
          </div>
          <div className="flex gap-1 text-sm mt-1">
            <span className="w-1/2"><TagRow items={[item.customer]} /></span>
            <span className="w-1/2"><TagRow items={[item.affiliation]} /></span>
          </div>

          <div className="flex gap-1 text-[10px] border-t border-white/20 pt-2 mt-2 text-white/70 uppercase font-bold">
            <span className="w-1/2">역할</span>
            <span className="w-1/2">담당</span>
          </div>
          <div className="flex gap-1 text-sm mt-1">
            <span className="w-1/2"><TagRow items={item.role || []} /></span>
            <span className="w-1/2"><TagRow items={item.charge || []} /></span>
          </div>

          <div className="flex gap-1 text-[10px] border-t border-white/20 pt-2 mt-2 text-white/70 uppercase font-bold">
            <span className="w-1/2">Language</span>
            <span className="w-1/2">Frontend</span>
          </div>
          <div className="flex gap-1 text-sm mt-1">
            <span className="w-1/2"><TagRow items={item.language || []} /></span>
            <span className="w-1/2"><TagRow items={item.frontend || []} /></span>
          </div>

          <div className="flex gap-1 text-[10px] border-t border-white/20 pt-2 mt-2 text-white/70 uppercase font-bold">
            <span className="w-1/2">Backend</span>
            <span className="w-1/2">Database</span>
          </div>
          <div className="flex gap-1 text-sm mt-1">
            <span className="w-1/2"><TagRow items={item.backend || []} /></span>
            <span className="w-1/2"><TagRow items={item.database || []} /></span>
          </div>

          <div className="border-t border-white/20 pt-2 mt-2 text-[10px] text-white/70 uppercase font-bold">
            ETC
          </div>
          <div className="text-sm leading-relaxed mt-1">
            <TagRow items={item.etc || []} />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </div>
    </div>
  );
}

export function Inventory() {
  return (
    <section id="inventory" className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <Title text="Inventory" />
      <div className="grid gap-4 sm:gap-6 w-full max-w-5xl grid-cols-[repeat(auto-fill,minmax(330px,1fr))]">
        {SECTIONS.map((item, i) => (
          <InventoryCard key={i} item={item} />
        ))}
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