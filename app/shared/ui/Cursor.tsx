"use client";

import { useEffect, useState } from "react";
import { Spread } from "./Spread";

export function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();

    const updatePosition = (x: number, y: number) => {
      setPosition({ x, y });
    };

    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchMove);
    };
  }, []);

  return (
    <>
      <Spread />
      {!isMobile && (
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
              0 0 12px 2px #ff007f,
              0 0 25px 5px rgba(255, 0, 255, 0.4),
              0 0 40px 10px rgba(138, 43, 226, 0.2)
            `,
            transition: "transform 0.06s ease-out",
          }}
        />
      )}
    </>
  );
}