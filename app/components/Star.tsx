"use client";

type StarProps = {
  value: number;
};

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

function StarIcon({
  fillPercent,
  id,
}: {
  fillPercent: number;
  id: string;
}) {
  return (
    <div className="relative w-5 h-5">
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/20" fill="currentColor">
        <path d="M12 17.3l-6.18 3.73 1.64-7.03L2 9.24l7.19-.61L12 2l2.81 6.63 7.19.61-5.46 4.76 1.64 7.03z" />
      </svg>

      <div
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: `${fillPercent}%` }}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5">
          <defs>
            <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>

          <path
            d="M12 17.3l-6.18 3.73 1.64-7.03L2 9.24l7.19-.61L12 2l2.81 6.63 7.19.61-5.46 4.76 1.64 7.03z"
            fill={`url(#grad-${id})`}
          />
        </svg>
      </div>
    </div>
  );
}

export function Star({ value }: StarProps) {
  const safeValue = clamp(value, 0, 100);

  return (
    <div className="flex items-center gap-[2px]">
      {Array.from({ length: 5 }).map((_, i) => {
        const start = i * 20;
        const end = (i + 1) * 20;

        const fillPercent =
          safeValue >= end
            ? 100
            : safeValue <= start
            ? 0
            : ((safeValue - start) / 20) * 100;

        const id = `star-${i}`;

        return (
          <StarIcon key={i} fillPercent={fillPercent} id={id} />
        );
      })}
    </div>
  );
}