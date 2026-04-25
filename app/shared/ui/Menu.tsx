"use client";

import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  active: string;
};

const sections = ["section1", "section2", "section3", "section4"];

export function Menu({ open, setOpen, active }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => setVisible(true), 50);
    } else {
      setVisible(false);
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 500);
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

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      setOpen(false);
    }, 600);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-700 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        id="side-menu"
        className={`fixed top-0 right-0 h-full w-full sm:w-80 bg-white z-50 shadow-xl transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <span className="font-bold text-lg">NanoKim</span>
          <button
            onClick={handleClose}
            className="text-xl p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col gap-6 px-6 mt-6">
          {sections.map((id, index) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={handleClose}
              className={`text-lg transition-all duration-500 ${
                active === id
                  ? "text-blue-500 font-semibold"
                  : "hover:text-blue-500"
              } ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: visible
                  ? `${index * 80}ms`
                  : `${(sections.length - index) * 80 + 200}ms`,
              }}
            >
              {id}
            </a>
          ))}
        </div>

        <div className="p-6 flex gap-6">
          {[
            { href: "https://github.com/NanoKim", src: "/logo_github.svg" },
            { href: "https://www.linkedin.com/in/nanokim/", src: "/logo_linkedin.svg" },
            { href: "mailto:kjyyy7341@gmail.com", src: "/logo_email.svg" },
          ].map((item, index) => (
            <a
              key={item.src}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              className={`transition-all duration-500 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: visible
                  ? `${(sections.length + index) * 80}ms`
                  : `${(3 - index) * 80}ms`,
              }}
            >
              <img src={item.src} className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}