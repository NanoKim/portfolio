import { StackS } from "@/app/shared/constants/stacks";

type StackLevel = "A" | "B" | "C";

function StackGrid({ level }: { level: StackLevel }) {
  const filtered = StackS.filter((item) => item.lev === level);

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
      {filtered.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center gap-1"
        >
          <img
            src={`/${item.path}`}
            alt={item.id}
            className="w-10 h-10 object-contain"
          />
          <span className="text-xs text-gray-400">
            {item.id}
          </span>
        </div>
      ))}
    </div>
  );
}

function CutBorderCard({
  title,
  level,
}: {
  title: string;
  level: StackLevel;
}) {
  return (
    <div className="relative rounded-xl bg-transparent">

      <div className="absolute inset-0 rounded-xl pointer-events-none shadow-[0_0_0_1px_rgba(99,102,241,0.6),0_0_0_1px_rgba(59,130,246,0.6),0_0_0_1px_rgba(168,85,247,0.6)]" />

      <div className="relative rounded-xl p-4 pt-6 bg-transparent">

        <div className="absolute -top-2 left-4 px-2 text-xs font-semibold text-[#f3f3f3]
          backdrop-blur-md rounded-md border border-white/10">
          {title}
        </div>

        <StackGrid level={level} />

      </div>
    </div>
  );
}

export function Stack() {
  return (
    <section
      id="stack"
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <CutBorderCard title="자신 있습니다" level="A" />
        <CutBorderCard title="문제 없이 다룹니다" level="B" />
        <CutBorderCard title="더 잘해질 수 있습니다" level="C" />

      </div>
    </section>
  );
}