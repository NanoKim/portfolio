import { StackS } from "@/app/shared/constants/stacks";
import { Star } from "@/app/components/Star";

type StackLevel = "A" | "B" | "C";

const levelMeta = {
  A: {
    title: "자신 있습니다",
    glow: "from-indigo-500 via-blue-500 to-cyan-400",
    value: 93,
  },
  B: {
    title: "문제 없이 다룹니다",
    glow: "from-blue-500 via-cyan-400 to-sky-400",
    value: 80,
  },
  C: {
    title: "더 잘해질 수 있습니다",
    glow: "from-purple-500 via-pink-500 to-indigo-400",
    value: 68,
  },
};

function SkillChip({ name }: { name: string }) {
  return (
    <div className="relative inline-flex px-3 py-1.5">

      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          border: "1px solid transparent",
          backgroundImage:
            "linear-gradient(to right, #3b82f6, #a855f7)",
          backgroundOrigin: "border-box",
          backgroundClip: "border-box",
          WebkitMask:
            "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude",
        }}
      />

      <span className="relative text-xs text-white/80">
        {name}
      </span>

    </div>
  );
}

function StackField({ level }: { level: StackLevel }) {
  const items = StackS.filter((s) => s.lev === level);
  const meta = levelMeta[level];

  return (
    <div className="relative rounded-2xl p-6 overflow-hidden">

      <div
        className={`
          absolute inset-0 opacity-25 blur-3xl
          bg-transparent
        `}
      />

      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          border: "1px solid transparent",
          backgroundImage:
            "linear-gradient(to bottom right, #3b82f6, #a855f7)",
          backgroundOrigin: "border-box",
          backgroundClip: "border-box",
          WebkitMask:
            "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude",
        }}
      />

      <div className="relative flex items-center justify-between mb-6">
        <h3 className="text-white/90 text-sm font-semibold">
          {meta.title}
        </h3>

        <div className="flex items-center gap-3">
          <Star value={meta.value} />
        </div>
      </div>

      <div className="
        relative flex flex-wrap gap-2
        justify-center md:justify-start
      ">
        {items.map((item) => (
          <SkillChip key={item.id} name={item.id} />
        ))}
      </div>

    </div>
  );
}

export function Stack() {
  return (
    <section
      id="stack"
      className="min-h-screen flex items-center justify-center px-4 py-20"
    >
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">

        <StackField level="A" />
        <StackField level="B" />
        <StackField level="C" />

      </div>
    </section>
  );
}