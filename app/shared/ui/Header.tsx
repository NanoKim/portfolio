"use client";

import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl">
        <div className="flex items-center justify-between px-5 py-3 rounded-full bg-white/70 backdrop-blur-md shadow-md border border-gray-200">
          
          <div className="font-bold text-lg">
            Nano’s Portfolio
          </div>

          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#section1" className="hover:text-blue-500">Section1</a>
            <a href="#section2" className="hover:text-blue-500">Section2</a>
            <a href="#section3" className="hover:text-blue-500">Section3</a>
            <a href="#section4" className="hover:text-blue-500">Section4</a>
            <a href="#section5" className="hover:text-blue-500">Section5</a>
          </nav>

          <button 
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[90%] bg-white rounded-xl shadow-md border p-4 flex flex-col gap-4 md:hidden z-40">
          <a href="#section1">Section1</a>
          <a href="#section2">Section2</a>
          <a href="#section3">Section3</a>
          <a href="#section4">Section4</a>
          <a href="#section5">Section5</a>
        </div>
      )}
    </>
  );
}