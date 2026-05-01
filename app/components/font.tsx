import { Gamja_Flower, Nanum_Pen_Script, Nanum_Brush_Script } from "next/font/google";

export const gamjaFlower = Gamja_Flower({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const nanumPen = Nanum_Pen_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const nanumBrush = Nanum_Brush_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const fonts = {
  cute: gamjaFlower.className,
  soft: nanumPen.className,
  neat: nanumBrush.className,
};