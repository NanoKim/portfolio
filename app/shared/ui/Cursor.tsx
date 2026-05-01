"use client";

import { useEffect, useState } from "react";
import { Spread } from "./Spread";

export function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <Spread />
      <div
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          position: "fixed",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          
          background: "radial-gradient(circle, #ffffff 20%, #ff007f 80%)",
          
          boxShadow: `
            0 0 5px 1px #fff,
            0 0 10px 2px #ff007f,
            0 0 20px 4px #ff00ff,
            0 0 35px 8px rgba(255, 0, 127, 0.3)
          `,
          
          transition: "transform 0.08s ease-out",
        }}
      />
    </>
  );
}