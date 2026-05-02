"use client";

import { Menu } from "./Menu";

type Props = {
  active: string;
  open: boolean;
  setOpen: (v: boolean) => void;
};

export function Header({ active, open, setOpen }: Props) {
  const handleLogoClick = () => {
    window.location.href = "/";
  };

  return (
    <>
      <header className="fixed top-6 left-0 right-0 flex justify-center z-[50]">
        <div className="w-full max-w-4xl px-6">
          <div
            className="relative w-full flex items-center justify-between gap-4 px-5 py-3 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            style={{
              background: "rgba(15, 15, 25, 0.4)",
              borderRadius: "9999px",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: "9999px",
                padding: "1px",
                background: "linear-gradient(90deg, #3b82f6, #a855f7, #3b82f6)",
                backgroundSize: "200% 100%",
                animation: "border-wave 4s linear infinite",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "destination-out",
                maskComposite: "exclude",
              }}
            />

            <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: "9999px" }}>
              <div className="absolute top-0 -left-[100%] w-full h-full animate-flow-light bg-gradient-to-r from-transparent via-blue-400/20 to-transparent z-0" />
            </div>

            <div className="absolute inset-0 z-0 opacity-30">
              <div className="absolute left-1/4 top-0 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
              <div className="absolute left-1/4 bottom-0 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            </div>

            <div
              onClick={handleLogoClick}
              className="relative z-30 flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <img src="/logo.png" className="w-6 h-6 sm:w-7 sm:h-7" alt="Logo" />
              <span className="bg-gradient-to-r from-blue-300 via-white to-purple-300 bg-clip-text text-transparent font-bold text-sm sm:text-base tracking-tight">
                NanoKim's portfolio
              </span>
            </div>

            <div className="relative z-30 hidden sm:flex items-center gap-6 text-xs sm:text-sm whitespace-nowrap">
              <div className="flex items-center gap-1.5 text-white/50 hover:text-blue-400 transition-colors">
                <img src="/icon/logo_call.svg" className="w-3.5 h-3.5 opacity-50" alt="Call" />
                <span className="font-light tracking-wide">+82 10 9190 7946</span>
              </div>
              <div className="hidden md:flex items-center gap-1.5 text-white/50 hover:text-purple-400 transition-colors">
                <img src="/icon/logo_email.svg" className="w-3.5 h-3.5 opacity-50" alt="Email" />
                <span className="font-light tracking-wide">kjyyy7341@gmail.com</span>
              </div>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="relative z-30 text-white/40 hover:text-white transition-all duration-300 p-2"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          </div>
        </div>
      </header>

      <Menu open={open} setOpen={setOpen} active={active} />

      <style jsx global>{`
        @keyframes border-wave {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes flow-light {
          0% { transform: translateX(0); }
          100% { transform: translateX(200%); }
        }
        .animate-flow-light {
          animation: flow-light 4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}