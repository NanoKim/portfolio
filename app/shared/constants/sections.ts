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
    id: "collaboration",
    label: "Collaboration",
    isMenu: false,
  },
  {
    id: "section2",
    label: "About",
    isMenu: true,
  },
  {
    id: "section3",
    label: "Projects",
    isMenu: true,
  },
  {
    id: "section4",
    label: "Contact",
    isMenu: true,
  },
];