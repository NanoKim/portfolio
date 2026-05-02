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
    const items = sideMenuRef.current?.querySelectorAll(".menu-item");
    items?.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (item as HTMLElement).style.setProperty("--m-x", `${x}px`);
      (item as HTMLElement).style.setProperty("--m-y", `${y}px`);
    });
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-xl z-40 transition-opacity duration-700 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        id="side-menu"
        ref={sideMenuRef}
        onMouseMove={handleMouseMove}
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] z-50 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] 
          transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] 
          flex flex-col overflow-hidden bg-slate-950 border-l border-white/5
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <Wallpaper variant="dark" />

        <div className="flex items-center justify-between p-10 relative z-10">
          <span className="bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent font-black text-2xl tracking-tighter">
            NanoKim
          </span>
          <button
            onClick={handleClose}
            className="text-white/50 hover:text-white transition-all p-2 hover:bg-white/10 rounded-full duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-4 px-8 py-4 relative z-10">
          {menuSections.map((item, index) => {
            const isActive = active === item.id;
            return (
              <div
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`menu-item group relative min-h-[72px] flex items-center px-8 rounded-3xl cursor-pointer transition-all duration-500 overflow-hidden
                ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
                style={{
                  transitionDelay: visible ? `${index * 60}ms` : "0ms",
                }}
              >
                <div className={`absolute inset-0 border rounded-3xl transition-colors duration-500 ${
                  isActive ? "border-transparent" : "border-white/[0.25]"
                }`} />

                <div 
                  className={`absolute inset-0 transition-opacity duration-700 rounded-3xl ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-70"
                  }`}
                  style={{
                    padding: '2px',
                    background: 'linear-gradient(var(--angle), #3b82f6, #a855f7, #3b82f6)',
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "destination-out",
                    maskComposite: "exclude",
                    animation: 'rotate-gradient 6s linear infinite',
                  }}
                />

                <div 
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    padding: '2px',
                    background: `radial-gradient(100px circle at var(--m-x) var(--m-y), #60a5fa, transparent 100%)`,
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "destination-out",
                    maskComposite: "exclude",
                  }}
                />

                <div className="flex items-center justify-between w-full relative z-20">
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-mono transition-colors duration-500 ${
                      isActive 
                        ? "text-blue-400" 
                        : "text-white/50 group-hover:text-blue-400/80"
                    }`}>
                      0{index + 1}
                    </span>
                    <span className={`text-xl font-light tracking-wide transition-all duration-500 ${
                      isActive 
                      ? "text-blue-200 font-medium translate-x-2" 
                      : "text-white/60 group-hover:text-white group-hover:translate-x-2"
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  
                  <div className={`transition-all duration-500 transform ${
                    isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"
                  }`}>
                    {isActive ? (
                      <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-10 relative z-10">
          <div className={`transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Social
              direction="row"
              visible={visible}
              baseDelay={500}
              tooltipSide="top"
            />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes rotate-gradient {
          to {
            --angle: 360deg;
          }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </>
  );
}