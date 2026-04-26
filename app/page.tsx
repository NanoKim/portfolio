"use client";

import { useEffect, useState } from "react";
import { Header } from "./shared/ui/Header";
import { Wallpaper } from "./shared/ui/Wallpaper";
import { ScrollIndicator } from "./shared/ui/ScrollIndicator";
import { RightDock } from "./shared/ui/RightDock";

import { Intro } from "./widgets/Intro";
import { Roadmap } from "./widgets/Roadmap";
import { Section3 } from "./widgets/Section3";
import { Section4 } from "./widgets/Section4";
import { SECTIONS } from "@/app/shared/constants/sections";

const sections = SECTIONS.map((s) => s.id);

export default function Home() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  // =========================
  // 1. URL → active 초기 세팅
  // =========================
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setActive(hash);

      const el = document.getElementById(hash);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // =========================
  // 2. IntersectionObserver
  // =========================
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;

            setActive(id);

            // 🔥 URL sync 핵심
            window.history.replaceState(null, "", `#${id}`);
          }
        });
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <Header active={active} open={open} setOpen={setOpen} />
      <Wallpaper />
      <ScrollIndicator active={active} sections={sections} />
      <RightDock open={open} />

      <Intro />
      <Roadmap />
      <Section3 />
      <Section4 />
    </main>
  );
}