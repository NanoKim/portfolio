export type Section = {
  id: string;
  label: string;
  isMenu: boolean;
};

export const SECTIONS: Section[] = [
  {
    id: "intro",
    label: "Intro",
    isMenu: true,
  },
  {
    id: "roadmap",
    label: "Experience",
    isMenu: true,
  },
  {
    id: "inventory",
    label: "Inventory",
    isMenu: true,
  },
  {
    id: "stack",
    label: "Stack",
    isMenu: true,
  },
  {
    id: "attitude",
    label: "Attitude",
    isMenu: true,
  },
];