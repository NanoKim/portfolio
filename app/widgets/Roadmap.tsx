import { useLayoutEffect, useRef, useState } from "react";

type Item = {
  id: string;
  view: string;
  title: string;
  desc: string;
};

export function Roadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [path, setPath] = useState("");
  const [isMdUp, setIsMdUp] = useState(false);

  const items: Item[] = [
    { id: "A", view: "2021.03 ~ 2023.11", title: "온더", desc: "GM팀 재무/회계 프로세스 경험 기반 실무 이해 확보" },
    { id: "B", view: "2023.11 ~ 2024.05", title: "KH 정보교육원", desc: "공공데이터 융합 자바 프로그래밍 언어 활용 이수" },
    { id: "C", view: "2024.05", title: "로이솔루션", desc: "개발팀 입사" },
    { id: "D", view: "2024.05 ~ 2024.11", title: "카카오뱅크", desc: "예산 자산 시스템 고도화 구축" },
    { id: "E", view: "2024.12 ~ 2025.02", title: "키움증권", desc: "연결회계 시스템 고도화 구축" },
    { id: "F", view: "2025.03 ~ 2025.12", title: "카카오뱅크", desc: "책무구조도 운영 시스템 구축" },
    { id: "G", view: "2026.01 ~ 2026.04", title: "로이솔루션", desc: "고가용성(HA) 금융 책무구조도 관리 솔루션 구축" },
    { id: "H", view: "2026.04", title: "유브갓프렌즈", desc: "개발팀 입사" },
    { id: "I", view: "2026.04 ~ 現", title: "신한카드", desc: "상시 감시 시스템 구축" },
  ];

  const pathOrder = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");

    const update = () => setIsMdUp(mq.matches);

    update();
    mq.addEventListener("change", update);

    return () => mq.removeEventListener("change", update);
  }, []);

  const computePath = () => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();

    const getPoint = (el: HTMLDivElement) => {
      const rect = el.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top,
      };
    };

    const points = pathOrder
      .map((id) => cardRefs.current[id])
      .filter(Boolean)
      .map((el) => getPoint(el as HTMLDivElement));

    if (points.length < 2) return;

    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];

      const midY = (prev.y + curr.y) / 2;

      d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
    }

    setPath(d);
  };

  useLayoutEffect(() => {
    const raf = requestAnimationFrame(() => {
      computePath();
    });

    return () => cancelAnimationFrame(raf);
  }, [isMdUp]);

  useLayoutEffect(() => {
    const handleResize = () => {
      requestAnimationFrame(() => {
        computePath();
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getItemById = (id: string | null) =>
    items.find((item) => item.id === id);

  return (
    <section id="roadmap" className="relative min-h-screen flex items-center justify-center px-6 py-32">
      <div ref={containerRef} className="relative w-full max-w-5xl">

        {isMdUp && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path
              d={path}
              stroke="rgba(99,102,241,0.6)"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        )}

        <div className={`flex flex-col gap-10 relative z-10 ${!isMdUp ? "items-start" : ""}`}>

          {isMdUp ? (
            [
              ["A", "B", "C"],
              [null, null, "D"],
              ["G", "F", "E"],
              ["H", null, null],
              ["I", null, null],
            ].map((row, rIdx) => (
              <div key={rIdx} className="grid grid-cols-3 items-center">
                {row.map((id, cIdx) => {
                  const item = id ? getItemById(id) : null;
                  if (!item) return <div key={cIdx} />;

                  return (
                    <div
                      key={cIdx}
                      ref={(el) => {
                        cardRefs.current[item.id] = el;
                      }}
                      className={`flex ${
                        cIdx === 0
                          ? "justify-start"
                          : cIdx === 1
                          ? "justify-center"
                          : "justify-end"
                      }`}
                    >
                      <Card item={item} />
                    </div>
                  );
                })}
              </div>
            ))
          ) : (
            <div className="relative flex flex-col gap-8 items-center w-full">
              <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-[rgba(99,102,241,0.6)]" />

              {items.map((item) => (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardRefs.current[item.id] = el;
                  }}
                  className="relative flex flex-col items-center w-full"
                >
                  <div className="absolute left-1/2 -translate-x-1/2 top-6 w-3 h-3 rounded-full bg-indigo-400" />

                  <div className="flex justify-center w-full">
                    <Card item={item} compact />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Card({
  item,
  compact,
}: {
  item: { view: string; title: string; desc: string };
  compact?: boolean;
}) {
  return (
    <div className={compact ? "w-full" : "w-60"}>
      
      <div
        className="
          rounded-[14px]
          bg-white/5 backdrop-blur-md
          p-5 shadow-lg
          relative
        "
      >
        <div className="absolute inset-0 rounded-[14px] pointer-events-none shadow-[inset_0_0_0_1px_rgba(99,102,241,0.8)]" />

        <div className="flex items-start justify-between">
          <h3 className="text-white font-semibold text-sm">
            {item.title}
          </h3>

          {!compact && (
            <span className="text-xs text-white/50">
              {item.view}
            </span>
          )}
        </div>

        <p className="text-white/60 text-sm mt-3">
          {item.desc}
        </p>

        {compact && (
          <p className="text-xs text-white/40 mt-2">
            {item.view}
          </p>
        )}
      </div>

    </div>
  );
}