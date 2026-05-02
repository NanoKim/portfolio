"use client";

import { Menu } from "./Menu";

type Props = {
  active: string;
  open: boolean;
  setOpen: (v: boolean) => void;
};

export function Header({ active, open, setOpen }: Props) {
  const handleLogoClick = () => {
    window.location.href = "https://portfolio-nine-bay-43.vercel.app/";
  };

  return (
    <>
      <header className="fixed top-6 left-0 right-0 flex justify-center z-[50]">
        <div className="w-full max-w-4xl px-6">
          <div
            className="relative w-full flex items-center justify-between gap-4 px-5 py-3 backdrop-blur-md shadow-md"
            style={{
              background: "transparent",
              borderRadius: "9999px",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "9999px",
                padding: "1px",
                background: "linear-gradient(90deg, #3b82f6, #a855f7)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "destination-out",
                maskComposite: "exclude",
                pointerEvents: "none",
              }}
            />

            <div 
              onClick={handleLogoClick}
              className="relative z-30 flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              <img src="/logo.png" className="w-6 h-6 sm:w-7 sm:h-7" alt="Logo" />
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold text-sm sm:text-base">
                NanoKim's portfolio
              </span>
            </div>

            <div className="relative z-30 hidden sm:flex items-center gap-3 text-xs sm:text-sm whitespace-nowrap">
              <div className="flex items-center gap-1">
                <img src="/icon/logo_call.svg" className="w-4 h-4" alt="Call" />
                <span>+82 10 9190 7946</span>
              </div>
              <div className="hidden md:flex items-center gap-1">
                <img src="/icon/logo_email.svg" className="w-4 h-4" alt="Email" />
                <span>kjyyy7341@gmail.com</span>
              </div>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="
                relative z-30 text-xl sm:text-2xl p-2 flex-shrink-0 cursor-pointer transition-all duration-300
                hover:bg-gradient-to-r hover:from-cyan-400 hover:to-purple-500
                hover:bg-clip-text hover:text-transparent
                active:scale-90
              "
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      <Menu open={open} setOpen={setOpen} active={active} />
    </>
  );
}