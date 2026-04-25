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
      <div className="relative w-[2px] h-60 bg-gray-200 rounded-full">
        {activeIndex !== -1 && (
          <div
            className="absolute left-0 w-full bg-blue-500 rounded-full transition-all duration-300"
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