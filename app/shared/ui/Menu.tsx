"use client";

import { useEffect, useState, useRef } from "react";
import { Wallpaper } from "@/app/shared/ui/Wallpaper";
import { SECTIONS } from "@/app/shared/constants/sections";
import { Social } from "@/app/shared/ui/Social";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  active: string;
};

const menuSections = SECTIONS.filter((s) => s.isMenu);

export function Menu({ open, setOpen, active }: Props) {
  const [visible, setVisible] = useState(false);
  const sideMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
      const timer = setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#side-menu") && !target.closest("#menu-btn")) {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setOpen(false), 700);
  };

  const handleMenuClick = (id: string) => {
    setVisible(false);
    setTimeout(() => {
      setOpen(false);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", `#${id}`);
      }
    }, 600);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sideMenuRef.current) return;
    const rect = sideMenuRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    sideMenuRef.current.style.setProperty("--mouse-x", `${x}px`);
    sideMenuRef.current.style.setProperty("--mouse-y", `${y}px`);

    const items = sideMenuRef.current.querySelectorAll(".menu-item");
    items.forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      const ix = e.clientX - itemRect.left;
      const iy = e.clientY - itemRect.top;
      (item as HTMLElement).style.setProperty("--m-x", `${ix}px`);
      (item as HTMLElement).style.setProperty("--m-y", `${iy}px`);
    });
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-md z-40 transition-opacity duration-700 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        id="side-menu"
        ref={sideMenuRef}
        onMouseMove={handleMouseMove}
        className={`fixed top-0 right-0 h-full w-full sm:w-[380px] z-50 shadow-2xl 
          transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] 
          flex flex-col overflow-hidden bg-slate-950
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="absolute inset-0 bg-slate-950/90 z-[-1]" />
        <Wallpaper variant="dark" />

        <div className="absolute right-0 top-0 w-[3px] h-full bg-gradient-to-b from-blue-600 via-purple-500 to-cyan-500 animate-gradient-y z-20" />

        <div className="flex items-center justify-between p-8 relative z-10 border-b border-white/10 bg-slate-950/40 backdrop-blur-sm">
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent font-black text-2xl tracking-tighter uppercase">
            NanoKim
          </span>
          <button
            onClick={handleClose}
            className="text-white/40 hover:text-white transition-all p-2 hover:rotate-180 duration-500"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-3 px-6 py-10 relative z-10">
          {menuSections.map((item, index) => {
            const isActive = active === item.id;
            return (
              <div
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`menu-item group relative min-h-[68px] flex items-center px-6 rounded-2xl cursor-pointer transition-all duration-700 
                ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}
                style={{
                  transitionDelay: visible
                    ? `${index * 80}ms`
                    : `${(menuSections.length - index) * 50}ms`,
                }}
              >
                {/* --- 자연스러운 물결 테두리 효과 영역 --- */}
                <div className="absolute inset-0 rounded-2xl p-[1.5px] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   {/* 회전하는 빛의 파편 */}
                  <div className="absolute inset-[-200%] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0deg,transparent_120deg,#3b82f6_150deg,#a855f7_180deg,#3b82f6_210deg,transparent_240deg)]" />
                </div>
                
                {/* 내부 배경 레이어 (테두리 두께만큼 안쪽으로 배치) */}
                <div className="absolute inset-[1.5px] bg-slate-950/95 rounded-[calc(1rem-1px)] z-0 group-hover:bg-slate-900/90 transition-colors duration-500" />
                {/* 기본 상태 보더 */}
                <div className="absolute inset-0 border border-white/5 rounded-2xl group-hover:border-transparent transition-colors z-0" />

                <div 
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                  style={{
                    background: `radial-gradient(180px circle at var(--m-x) var(--m-y), rgba(59, 130, 246, 0.2), transparent 70%)`
                  }}
                />

                <div className={`absolute inset-0 transition-opacity duration-500 z-10 ${
                  isActive ? "bg-blue-500/10 opacity-100" : "opacity-0 group-hover:opacity-100"
                }`} />

                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 shadow-[2px_0_15px_rgba(59,130,246,0.5)] z-20 rounded-l-2xl" />
                )}

                <div className="flex items-center justify-between w-full relative z-20">
                  <span className={`text-lg font-medium transition-all duration-500 ${
                    isActive 
                    ? "text-blue-400 font-bold scale-105 origin-left" 
                    : "text-white/50 group-hover:text-white group-hover:translate-x-2"
                  }`}>
                    {item.label}
                  </span>
                  
                  <div className={`w-2 h-2 rounded-full transition-all duration-700 ${
                    isActive 
                    ? "bg-blue-400 shadow-[0_0_15px_#3b82f6] scale-100" 
                    : "bg-white/10 scale-0 group-hover:scale-100 group-hover:bg-blue-400/50"
                  }`} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-10 relative z-10 border-t border-white/10 bg-slate-950/80 backdrop-blur-xl">
          <div className={`transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <Social
              direction="row"
              visible={visible}
              baseDelay={menuSections.length * 80 + 200}
              tooltipSide="top"
            />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradient-y {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 0% 100%; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-gradient-y {
          background-size: 100% 200%;
          animation: gradient-y 6s ease infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </>
  );
}