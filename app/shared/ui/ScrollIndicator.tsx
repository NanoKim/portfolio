"use client";

type Props = {
  active: string;
  sections: string[];
};

export function ScrollIndicator({ active, sections }: Props) {
  const activeIndex = sections.indexOf(active);

  const segmentHeight = 100 / sections.length;
  const top = activeIndex * segmentHeight;

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex items-center">
      <div className="relative w-[2px] h-60 bg-white/10 rounded-full">
        {activeIndex !== -1 && (
          <div
            className="absolute left-0 w-full rounded-full transition-all duration-500 ease-in-out
            bg-gradient-to-b from-blue-600 via-indigo-500 to-violet-600
            shadow-[0_0_12px_rgba(37,99,235,0.8)]"
            style={{
              top: `${top}%`,
              height: `${segmentHeight}%`,
            }}
          />
        )}
      </div>
    </div>
  );
}