"use client";

import { Social } from "@/app/shared/ui/Social";

type Props = {
  open: boolean;
};

export function RightDock({ open }: Props) {
  return (
    <div
      className={`hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 transition-opacity duration-300 ${
        open ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <Social direction="col" />
    </div>
  );
}