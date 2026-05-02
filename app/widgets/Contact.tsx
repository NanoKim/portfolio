"use client";

import { useEffect, useState, useRef } from "react";

export function Contact() {
  const [lastUpdate, setLastUpdate] = useState("");

  useEffect(() => {
    const today = new Date();
    setLastUpdate(`${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = document.querySelectorAll(".contact-card-wrapper");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
      (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
    });
  };

  return (
    <section
      id="contact"
      className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 py-32 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl w-full text-center space-y-16 relative z-10">
        <div className="space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-blue-400 uppercase tracking-[0.3em] mb-4">
            Available for New Projects
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-tight">
            Let's build something <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
              meaningful together.
            </span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed break-keep font-light">
            단순히 코드를 짜는 것을 넘어, 사용자에게 닿는 가치를 고민합니다. 
            <br />
            따뜻한 제안이나 날카로운 조언 모두 환영합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <ContactCard 
            label="Phone" 
            value="010-9190-7946" 
            icon="/icon/logo_call.svg" 
            href="tel:01091907946"
          />
          <ContactCard 
            label="Email" 
            value="kjyyy7341@gmail.com" 
            icon="/icon/logo_email.svg" 
            href="mailto:kjyyy7341@gmail.com"
          />
        </div>

        <div className="pt-20 flex flex-col items-center gap-4">
          <div className="flex items-center gap-4 text-[10px] text-white/60 tracking-[0.4em] uppercase font-medium">
            <span className="w-8 h-[1px] bg-white/30" />
            Last Updated {lastUpdate}
            <span className="w-8 h-[1px] bg-white/30" />
          </div>
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
    </section>
  );
}

function ContactCard({ label, value, icon, href }: { label: string; value: string; icon: string; href: string }) {
  return (
    <div className="contact-card-wrapper relative p-[1px] rounded-[24px] group overflow-hidden transition-all duration-500 hover:-translate-y-1 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_auto] animate-gradient opacity-75 group-hover:opacity-0 transition-opacity duration-500" />
      
      <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_25%,#3b82f6_50%,#a855f7_75%,transparent_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_3s_linear_infinite] transition-opacity duration-500" />

      <a
        href={href}
        className="relative flex flex-col items-center justify-center gap-4 p-8 rounded-[23px] bg-slate-950/95 backdrop-blur-xl transition-all duration-500 overflow-hidden h-full z-10"
      >
        <div 
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.25), transparent 40%)`
          }}
        />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4 group-hover:scale-105 transition-transform duration-500">
            <img src={icon} className="w-4 h-4 opacity-90 group-hover:opacity-100 transition-opacity" alt={label} />
            <p className="text-[11px] text-white/80 uppercase tracking-[0.2em] font-semibold group-hover:text-blue-400 transition-colors">
              {label}
            </p>
          </div>
          <p className="text-white text-lg font-light tracking-tight group-hover:text-white/100 transition-colors">
            {value}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </a>
    </div>
  );
}