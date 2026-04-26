"use client";

import { useEffect, useState } from "react";
import { Header } from "./shared/ui/Header";
import { Wallpaper } from "./shared/ui/Wallpaper";
import { ScrollIndicator } from "./shared/ui/ScrollIndicator";
import { RightDock } from "./shared/ui/RightDock";

import { Intro } from "./widgets/Intro";
import { Section2 } from "./widgets/Section2";
import { Section3 } from "./widgets/Section3";
import { Section4 } from "./widgets/Section4";
import { SECTIONS } from "@/app/shared/constants/sections";

const sections = SECTIONS.map((s) => s.id);

export default function Home() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
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
      <Section2 />
      <Section3 />
      <Section4 />
    </main>
  );
}