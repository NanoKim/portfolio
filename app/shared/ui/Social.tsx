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
};

const LINKS = [
  { id: "location", href: "#", src: "/icon/logo_location.svg" },
  { id: "github", href: "https://github.com/NanoKim", src: "/icon/logo_github.svg" },
  { id: "linkedin", href: "https://www.linkedin.com/in/nanokim/", src: "/icon/logo_linkedin.svg" },
  { id: "email", href: "mailto:kjyyy7341@gmail.com", src: "/icon/logo_email.svg" },
];

export function Social({ direction = "row", visible = true, baseDelay = 0 }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = (e: React.MouseEvent, id: string) => {
    if (id === "location") {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <>
      <div className={`flex ${direction === "col" ? "flex-col gap-7" : "flex-row gap-6"}`}>
        {LINKS.map((link, index) => (
          <a
            key={link.id}
            href={link.href}
            onClick={(e) => handleAction(e, link.id)}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className={`transition-all duration-500 hover:scale-110 cursor-pointer ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDelay: visible 
                ? `${baseDelay + index * 80}ms` 
                : `${(LINKS.length - 1 - index) * 80}ms`
            }}
          >
            <img src={link.src} className={`${direction === "col" ? "w-5 h-5" : "w-6 h-6"}`} alt={link.id} />
          </a>
        ))}
      </div>

      <Popup isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col items-center justify-center p-2">
          <img 
            src="/location.png" 
            alt="Location Map" 
            className="w-full h-auto rounded-lg"
          />
          <p className="mt-4 text-sm font-medium text-zinc-500">서울시 광진구</p>
        </div>
      </Popup>
    </>
  );
}