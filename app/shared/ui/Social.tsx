"use client";

type Props = {
  direction?: "row" | "col";
  visible?: boolean;
  baseDelay?: number;
};

const LINKS = [
  { id: "github", href: "https://github.com/NanoKim", src: "/icon/logo_github.svg" },
  { id: "linkedin", href: "https://www.linkedin.com/in/nanokim/", src: "/icon/logo_linkedin.svg" },
  { id: "email", href: "mailto:kjyyy7341@gmail.com", src: "/icon/logo_email.svg" },
];

export function Social({ direction = "row", visible = true, baseDelay = 0 }: Props) {
  return (
    <div className={`flex ${direction === "col" ? "flex-col gap-7" : "flex-row gap-6"}`}>
      {LINKS.map((link, index) => (
        <a
          key={link.id}
          href={link.href}
          target={link.href.startsWith("http") ? "_blank" : undefined}
          rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className={`transition-all duration-500 hover:scale-110 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: visible 
              ? `${baseDelay + index * 80}ms` 
              : `${(LINKS.length - 1 - index) * 80}ms`
          }}
        >
          <img src={link.src} className={`${direction === "col" ? "w-5 h-5" : "w-6 h-6"}`} alt={link.id} />
        </a>
      ))}
    </div>
  );
}