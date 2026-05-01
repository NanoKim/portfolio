"use client";

import { Logo } from "../components/Logo";
import { fonts } from "../components/Font";

export function Intro() {
  return (
    <section
      id="intro"
      className="min-h-screen flex flex-col items-center justify-center px-6"
    >
      <div className="w-full max-w-4xl flex flex-col items-center gap-14 text-center">
        
        <div className="shrink-0 animate-fade-in">
          <Logo size="xl" />
        </div>

        <div className="flex flex-col items-center">
          <h1 
            className={`
              ${fonts.cute} 
              text-3xl md:text-5xl 
              leading-relaxed md:leading-snug
              tracking-tight
            `}
          >
            <span 
              className="
                bg-gradient-to-tr from-slate-400 via-slate-300 to-blue-200
                bg-clip-text text-transparent 
                drop-shadow-[0_0_15px_rgba(148,163,184,0.1)]
              "
            >
              비즈니스 요구사항을 명확한 코드로 풀어내는<br className="hidden md:block" />
              실전형 개발자
            </span>
            
            <span className="relative inline-block mx-3">
              <span className="bg-gradient-to-r from-[#4facfe] to-[#8a2be2] bg-clip-text text-transparent font-bold">
                김재영
              </span>
            </span>

            <span 
              className="
                bg-gradient-to-tr from-slate-400 via-slate-300 to-blue-200
                bg-clip-text text-transparent
              "
            >
              입니다.
            </span>
          </h1>
        </div>

      </div>
    </section>
  );
}