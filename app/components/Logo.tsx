"use client";

import { Allura } from "next/font/google";

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
});

type LogoProps = {
  size?: "sm" | "md" | "lg" | "xl";
};

const sizeMap: Record<NonNullable<LogoProps["size"]>, string> = {
  sm: "text-3xl md:text-4xl",
  md: "text-5xl md:text-6xl",
  lg: "text-6xl md:text-7xl",
  xl: "text-7xl md:text-8xl",
};

export function Logo({ size = "lg" }: LogoProps) {
  const sizeClass = sizeMap[size];

  return (
    <p
      className={`
        ${allura.className}
        ${sizeClass}
        mb-1 leading-none
        bg-gradient-to-r from-pink-200 to-violet-300
        bg-clip-text text-transparent
        drop-shadow-[0_0_10px_rgba(200,150,255,0.4)]
        tracking-tight
      `}
    >
      NanoKim
    </p>
  );
}