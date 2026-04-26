import { SECTIONS } from "@/app/shared/constants/projects";
import { TagRow } from "../components/TagRow";

export function Inventory() {
  return (
    <section id="inventory" className="min-h-screen flex items-center justify-center px-4 bg-[#070a0f]">
      <div
        className="
          grid gap-4 sm:gap-6
          w-full max-w-5xl
          grid-cols-[repeat(auto-fill,minmax(330px,1fr))]
        "
      >
        {SECTIONS.map((item, i) => (
          <div
            key={i}
            className="
              w-full rounded-xl p-[1px]
              bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500
            "
          >
            <div className="h-full rounded-xl bg-[#111827] shadow-[0_10px_40px_rgba(0,0,0,0.5)] p-5 text-white space-y-3">

              <div className="flex justify-between items-start">
                <div className="text-sm sm:text-base font-semibold">
                  {item.title}
                </div>

                <div className="text-xs">
                  {item.period}
                </div>
              </div>

              <div className="flex gap-1 text-xs border-t border-white/10 pt-2">
                <span className="w-1/2">Customer</span>
                <span className="w-1/2">Affiliation</span>
              </div>

              <div className="flex gap-1 text-sm">
                <span className="w-1/2"><TagRow items={[item.customer]} /></span>
                <span className="w-1/2"><TagRow items={[item.affiliation]} /></span>
              </div>

              <div className="flex gap-1 text-xs border-t border-white/10 pt-2">
                <span className="w-1/2">역할</span>
                <span className="w-1/2">담당</span>
              </div>

              <div className="flex gap-1 text-sm">
                <span className="w-1/2"><TagRow items={item.role} /></span>
                <span className="w-1/2"><TagRow items={item.charge} /></span>
              </div>

              <div className="flex gap-1 text-xs border-t border-white/10 pt-2">
                <span className="w-1/2">Language</span>
                <span className="w-1/2">Frontend</span>
              </div>

              <div className="flex gap-1 text-sm">
                <span className="w-1/2"><TagRow items={item.language} /></span>
                <span className="w-1/2"><TagRow items={item.frontend} /></span>
              </div>

              <div className="flex gap-1 text-xs border-t border-white/10 pt-2">
                <span className="w-1/2">Backend</span>
                <span className="w-1/2">Database</span>
              </div>

              <div className="flex gap-1 text-sm">
                <span className="w-1/2"><TagRow items={item.backend} /></span>
                <span className="w-1/2"><TagRow items={item.database} /></span>
              </div>

              <div className="border-t border-white/10 pt-2 text-xs">
                ETC
              </div>
              <div className="text-sm leading-relaxed">
                <TagRow items={item.etc} />
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}