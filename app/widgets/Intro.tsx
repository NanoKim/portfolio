"use client";

import { Gowun_Batang } from "next/font/google";
import { Logo } from "../components/Logo";
import { TagRow } from "../components/TagRow";

const gowunBatang = Gowun_Batang({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export function Intro() {
  return (
    <section
      id="intro"
      className="min-h-screen flex items-center justify-center px-6 pt-30"
    >
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-10">
        
        <div className="shrink-0">
          <Logo size="xl" />
        </div>

        <div className="flex flex-col gap-6 text-center md:text-left">
          
          <div className="space-y-4">
            <h1 
              className={`
                ${gowunBatang.className} 
                text-2xl md:text-4xl 
                leading-relaxed md:leading-snug
                tracking-normal
              `}
            >
              <span 
                className="
                  bg-gradient-to-b from-zinc-200 via-slate-300 to-slate-500
                  bg-clip-text text-transparent 
                  drop-shadow-[0_0_8px_rgba(255,255,255,0.08)]
                "
              >
                비즈니스 요구사항을 명확한 코드로 풀어내는<br />
                실전형 개발자
              </span>
              
              <span className="relative inline-block mx-2">
                <span className="bg-gradient-to-r from-[#4facfe] to-[#8a2be2] bg-clip-text text-transparent font-bold">
                  김재영
                </span>
              </span>

              <span 
                className="
                  bg-gradient-to-b from-zinc-200 via-slate-300 to-slate-500
                  bg-clip-text text-transparent
                "
              >
                입니다.
              </span>
            </h1>
          </div>

          <div className="flex flex-col gap-3 text-sm md:text-base text-white/70">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <img src="/icon/logo_location.svg" className="w-5 h-5 opacity-70" alt="Location" />
              <span>서울시 광진구</span>
            </div>

            <div className="flex items-center gap-2 justify-center md:justify-start">
              <img src="/icon/logo_call.svg" className="w-5 h-5 opacity-70" alt="Call" />
              <span>+82 10 9190 7946</span>
            </div>

            <div className="flex items-center gap-2 justify-center md:justify-start">
              <img src="/icon/logo_email.svg" className="w-5 h-5 opacity-70" alt="Email" />
              <span>kjyyy7341@gmail.com</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <TagRow items={["빠른 이해력"]} />
            <TagRow items={["끝까지 책임지는 실행력"]} />
            <TagRow items={["금융 도메인 실무 경험"]} />
          </div>

        </div>
      </div>
    </section>
  );
}