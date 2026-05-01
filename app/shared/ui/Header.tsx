"use client";

import { Menu } from "./Menu";

type Props = {
  active: string;
  open: boolean;
  setOpen: (v: boolean) => void;
};

export function Header({ active, open, setOpen }: Props) {
  return (
    <>
      <header className="fixed top-6 left-0 right-0 flex justify-center z-50">
        <div
          className="
          w-full max-w-4xl flex items-center justify-between gap-6 px-6 py-3
          rounded-full backdrop-blur-md shadow-md
          border border-transparent
          "
          style={{
            background: "transparent",
            border: "1px solid transparent",
            borderRadius: "9999px",
            boxShadow:
              "0 0 0 1px rgba(99, 102, 241, 0.9), 0 0 0 2px rgba(168, 85, 247, 0.7) inset, 0 0 12px rgba(139, 92, 246, 0.4)",
          }}
        >
          <div className="flex items-center gap-2 whitespace-nowrap flex-shrink-0">
            <img
              src="/logo.png"
              alt="logo"
              className="w-7 h-7"
            />
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold">
              NanoKim's portfolio
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs sm:text-sm whitespace-nowrap">
            
            <div className="flex items-center gap-1 sm:hidden">
              <img
                src="/icon/logo_call.svg"
                alt="phone"
                className="w-4 h-4"
              />
              <span>+82 10 9190 7946</span>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <div className="flex items-center gap-1">
                <img
                  src="/icon/logo_call.svg"
                  alt="phone"
                  className="w-4 h-4"
                />
                <span>+82 10 9190 7946</span>
              </div>

              <div className="flex items-center gap-1">
                <img
                  src="/icon/logo_email.svg"
                  alt="email"
                  className="w-4 h-4"
                />
                <span>kjyyy7341@gmail.com</span>
              </div>

            </div>

          </div>

          <button
            id="menu-btn"
            onClick={() => setOpen(true)}
            className="
              text-2xl p-2 cursor-pointer transition
              text-[var(--text-color)]
              hover:bg-gradient-to-r hover:from-blue-300 hover:to-indigo-400
              hover:bg-clip-text hover:text-transparent
            "
          >
            ☰
          </button>
        </div>
      </header>

      <Menu open={open} setOpen={setOpen} active={active} />
    </>
  );
}