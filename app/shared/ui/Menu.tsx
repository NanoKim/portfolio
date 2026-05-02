"use client";

import { useEffect, useState } from "react";
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

  const handleMenuClick = (id: string) => {
    setVisible(false);
    setTimeout(() => {
      setOpen(false);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        window.history.pushState(null, "", `#${id}`);
      }
    }, 500);
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
        className={`fixed top-0 right-0 h-full w-full sm:w-80 z-50 shadow-xl 
          transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] 
          flex flex-col
          sm:border-l sm:border-white/10
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <Wallpaper variant="dark" />

        <div className="flex items-center justify-between p-4">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold text-lg">NanoKim</span>
          <button onClick={handleClose} className="text-xl p-1 cursor-pointer">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col gap-6 px-6 mt-6">
          {menuSections.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`text-lg transition-all duration-500 ${
                active === item.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold"
                  : "text-white/80 hover:text-white hover:scale-105"
              } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{
                transitionDelay: visible
                  ? `${index * 80}ms`
                  : `${(menuSections.length - index) * 80 + 200}ms`,
              }}
            >
              {item.label}
            </div>
          ))}
        </div>

        <div className="p-6">
          <Social
            direction="row"
            visible={visible}
            baseDelay={menuSections.length * 80}
            tooltipSide="top"
          />
        </div>
      </div>
    </>
  );
}