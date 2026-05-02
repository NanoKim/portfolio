"use client";

import { useEffect, useState } from "react";
import { Header } from "./shared/ui/Header";
import { Wallpaper } from "./shared/ui/Wallpaper";
import { Cursor } from "./shared/ui/Cursor";
import { ScrollIndicator } from "./shared/ui/ScrollIndicator";
import { RightDock } from "./shared/ui/RightDock";
import { Landing } from "./widgets/Landing";

import { Intro } from "./widgets/Intro";
import { Roadmap } from "./widgets/Roadmap";
import { Inventory } from "./widgets/Inventory";
import { Stack } from "./widgets/Stack";
import { Attitude } from "./widgets/Attitude";
import { Contact } from "./widgets/Contact";

import { SECTIONS } from "@/app/shared/constants/sections";
import { FadeIn } from "./shared/ui/FadeIn";

const sections = SECTIONS.map((s) => s.id);

export default function Home() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    document.body.style.overflow = entered ? "auto" : "hidden";
  }, [entered]);

  useEffect(() => {
    if (!entered) return;

    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setActive(hash);
      const el = document.getElementById(hash);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, [entered]);

  useEffect(() => {
    if (!entered) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActive(id);
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
  }, [entered]);

  return (
    <>
      <Cursor />

      {!entered ? (
        <div className="fixed inset-0 z-50">
          <Landing onEnter={() => setEntered(true)} />
        </div>
      ) : (
        <main>
          <Header active={active} open={open} setOpen={setOpen} />
          <Wallpaper />
          <ScrollIndicator active={active} sections={sections} />
          <RightDock open={open} />

          <FadeIn><Intro /></FadeIn>
          <FadeIn><Roadmap /></FadeIn>
          <FadeIn><Inventory /></FadeIn>
          <FadeIn><Stack /></FadeIn>
          <FadeIn><Attitude /></FadeIn>
          <FadeIn><Contact /></FadeIn>
        </main>
      )}
    </>
  );
}