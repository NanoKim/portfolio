"use client";

import { Logo } from "../components/Logo";
import { Wallpaper } from "@/app/shared/ui/Wallpaper";

type Props = {
  onEnter: () => void;
};

export function Landing({ onEnter }: Props) {
  return (
    <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black text-white">

      <div className="absolute inset-0 z-0">
        <Wallpaper />
      </div>

      <div className="relative z-10 text-center space-y-6">
        <Logo />

        <button
          onClick={onEnter}
          className="mt-6 px-8 py-3 rounded-[6px] text-white/80
          border border-transparent
          [border-image:linear-gradient(90deg,#a855f7,#06b6d4)_1]
          bg-transparent
          outline outline-[1px] outline-white/20
          transition-all duration-300
          hover:scale-105 hover:shadow-[0_0_15px_rgba(120,120,255,0.4)]
          cursor-pointer"
        >
          VIEW PORTFOLIO
        </button>
      </div>
    </div>
  );
}