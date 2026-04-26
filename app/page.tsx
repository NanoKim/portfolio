"use client";

import { useEffect, useState } from "react";
import { Header } from "./shared/ui/Header";
import { Wallpaper } from "./shared/ui/Wallpaper";
import { ScrollIndicator } from "./components/ScrollIndicator";
import { RightDock } from "./components/RightDock";

import { Section1 } from "./widgets/section1/Section1";
import { Section2 } from "./widgets/section2/Section2";
import { Section3 } from "./widgets/section3/Section3";
import { Section4 } from "./widgets/section4/Section4";

const sections = ["section1", "section2", "section3", "section4"];

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

      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </main>
  );
}