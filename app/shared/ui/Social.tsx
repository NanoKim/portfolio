"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const Popup = dynamic(() => import("@/app/components/Popup"), {
  ssr: false,
});

type Props = {
  direction?: "row" | "col";
  visible?: boolean;
  baseDelay?: number;
  tooltipSide?: "left" | "top";
};

const LINKS = [
  { id: "location", label: "거주지", href: "#", src: "/icon/logo_location.svg" },
  { id: "github", label: "깃허브", href: "https://github.com/NanoKim", src: "/icon/logo_github.svg" },
  { id: "linkedin", label: "링크드인", href: "https://www.linkedin.com/in/nanokim/", src: "/icon/logo_linkedin.svg" },
  { id: "email", label: "이메일", href: "mailto:kjyyy7341@gmail.com", src: "/icon/logo_email.svg" },
];

export function Social({ direction = "row", visible = true, baseDelay = 0, tooltipSide = "top" }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleAction = (e: React.MouseEvent, id: string) => {
    if (id === "location") {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  const tooltipStyles = {
    left: "right-full mr-3 top-1/2 -translate-y-1/2",
    top: "bottom-full mb-3 left-1/2 -translate-x-1/2",
  };

  return (
    <>
      <div className={`flex ${direction === "col" ? "flex-col gap-7" : "flex-row gap-6"}`}>
        {LINKS.map((link, index) => (
          <div
            key={link.id}
            className="relative group"
            onMouseEnter={() => setHoveredId(link.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <a
              href={link.href}
              onClick={(e) => handleAction(e, link.id)}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`block transition-all duration-500 hover:scale-110 cursor-pointer ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: visible
                  ? `${baseDelay + index * 80}ms`
                  : `${(LINKS.length - 1 - index) * 80}ms`,
              }}
            >
              <img src={link.src} className={`${direction === "col" ? "w-5 h-5" : "w-6 h-6"}`} alt={link.id} />
            </a>

            <div
              className={`absolute pointer-events-none whitespace-nowrap px-2 py-1 rounded bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs transition-all duration-300 ${
                tooltipStyles[tooltipSide]
              } ${hoveredId === link.id ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              {link.label}
            </div>
          </div>
        ))}
      </div>

      <Popup isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col items-center justify-center p-2">
          <img src="/location.png" alt="Location Map" className="w-full h-auto rounded-lg" />
          <p className="mt-4 text-sm font-medium text-zinc-500">서울시 광진구</p>
        </div>
      </Popup>
    </>
  );
}