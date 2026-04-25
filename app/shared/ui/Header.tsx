"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu } from "./Menu";

type Props = {
  active: string;
};

export function Header({ active }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-6 left-0 right-0 flex justify-center z-50">
        <div className="w-full max-w-4xl flex items-center justify-between gap-6 px-6 py-3 rounded-full bg-white/70 backdrop-blur-md shadow-md border border-gray-200">

          <div className="flex items-center gap-2 whitespace-nowrap flex-shrink-0">
            <Image
              src="/logo.png"
              alt="logo"
              width={30}
              height={30}
            />
            <span className="font-bold text-lg">
              NanoKim's portfolio
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
            
            <div className="flex items-center gap-1 sm:hidden">
              <Image
                src="/logo_call.svg"
                alt="phone"
                width={14}
                height={14}
              />
              <span>+82 10 9190 7946</span>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Image
                  src="/logo_call.svg"
                  alt="phone"
                  width={16}
                  height={16}
                />
                <span>+82 10 9190 7946</span>
              </div>

              <div className="flex items-center gap-1">
                <Image
                  src="/logo_email.svg"
                  alt="email"
                  width={16}
                  height={16}
                />
                <span>kjyyy7341@gmail.com</span>
              </div>

            </div>

          </div>

          <button
            id="menu-btn"
            onClick={() => setOpen(true)}
            className="text-2xl p-2 transition cursor-pointer hover:text-blue-500"
          >
            ☰
          </button>

        </div>
      </header>

      <Menu open={open} setOpen={setOpen} active={active} />
    </>
  );
}