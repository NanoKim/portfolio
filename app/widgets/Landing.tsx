"use client";

import { Logo } from "../components/Logo";
import { Wallpaper } from "@/app/shared/ui/Wallpaper";
import { useRef } from "react";

type Props = {
  onEnter: () => void;
};

export function Landing({ onEnter }: Props) {
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
    <div className="h-screen w-full flex items-center justify-center relative overflow-hidden text-white">
      <div className="absolute inset-0 z-0">
        <Wallpaper />
      </div>

      <div className="relative z-10 text-center space-y-6">
        <Logo />

        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className="relative p-[1px] rounded-[6px] group overflow-hidden transition-all duration-500 hover:scale-105 inline-block mt-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_auto] animate-gradient opacity-75 group-hover:opacity-0 transition-opacity duration-500" />
          
          <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_25%,#3b82f6_50%,#a855f7_75%,transparent_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_3s_linear_infinite] transition-opacity duration-500" />

          <button
            onClick={onEnter}
            className="relative px-8 py-3 rounded-[5px] text-white/80 bg-black/90 backdrop-blur-xl transition-all duration-300 cursor-pointer block z-10 font-medium tracking-wider overflow-hidden"
          >
            <div 
              className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
              style={{
                background: `radial-gradient(120px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.3), transparent 70%)`
              }}
            />
            <span className="relative z-20">VIEW PORTFOLIO</span>
          </button>
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
        .animate-gradient {
          animation: gradient 6s ease infinite;
        }
      `}</style>
    </div>
  );
}