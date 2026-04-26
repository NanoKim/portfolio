"use client";

type Props = {
  open: boolean;
};

export function RightDock({ open }: Props) {
  return (
    <div
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-7 transition-opacity duration-300 ${
        open ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <a
        href="https://github.com/NanoKim"
        target="_blank"
        className="hover:scale-110 transition"
      >
        <img src="/logo_github.svg" className="w-5 h-5" />
      </a>

      <a
        href="https://www.linkedin.com/in/nanokim/"
        target="_blank"
        className="hover:scale-110 transition"
      >
        <img src="/logo_linkedin.svg" className="w-5 h-5" />
      </a>

      <a
        href="mailto:kjyyy7341@gmail.com"
        className="hover:scale-110 transition"
      >
        <img src="/logo_email.svg" className="w-5 h-5" />
      </a>
    </div>
  );
}