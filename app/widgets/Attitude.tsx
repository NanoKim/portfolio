"use client";

import { fonts } from "@/app/components/Font";

const LEFT_ITEMS = [
  { title: "몰입 & 실행", desc: "빠르게 맥락을 파악하고, 바로 실행으로 연결합니다. 중간에 멈추지 않고 결과로 증명합니다.", point: "실행" },
  { title: "책임감", desc: "맡은 일은 끝까지 가져갑니다. 문제 해결까지가 업무라고 생각합니다.", point: "끝까지" },
  { title: "디테일", desc: "작은 차이가 결과를 바꾼다고 믿습니다. 완성도를 끝까지 끌어올립니다.", point: "작은 차이" },
];

const RIGHT_ITEMS = [
  { title: "커뮤니케이션", desc: "설득·경청·공감을 기반으로 팀의 의사결정 속도를 높입니다.", point: "속도" },
  { title: "합리적 사고", desc: "고집보다 더 나은 방향을 선택합니다. 좋은 의견은 빠르게 수용합니다.", point: "수용" },
  { title: "팀에 주는 가치", desc: "개인의 속도가 아닌, 팀 전체의 생산성을 높이는 개발자입니다.", highlight: true },
];

export function Attitude() {
  const commonGradient = "bg-gradient-to-tr from-slate-400 via-slate-300 to-blue-200 bg-clip-text text-transparent";

  return (
    <section id="attitude" className="py-20 px-6 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col gap-10 md:gap-14">
        
        <div className="text-center space-y-4">
          <h2 className={`${fonts.cute} text-2xl md:text-4xl font-bold leading-tight break-keep`}>
            <span className={commonGradient}>결국 결과를 만드는 건 </span>
            <span className="text-blue-400">태도</span>
            <span className={commonGradient}>라고 믿습니다</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base break-keep">
            빠르게 이해하고, 끝까지 책임지며, 팀의 속도를 높입니다
          </p>
        </div>

        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-0 lg:min-h-[550px]">
          
          <div className="w-full lg:w-[320px] xl:w-[350px] flex flex-col gap-8 lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 z-20">
            {LEFT_ITEMS.map((item, i) => (
              <div 
                key={i} 
                className={`flex gap-4 items-start lg:flex-row-reverse lg:text-right transition-all duration-500
                  ${i === 0 ? 'lg:-translate-x-2 lg:-translate-y-14' : i === 2 ? 'lg:-translate-x-2 lg:translate-y-14' : 'lg:-translate-x-24'}`}
              >
                <div className="shrink-0 w-8 h-8 rounded-full border border-blue-500/60 flex items-center justify-center text-blue-400 font-bold text-sm bg-blue-500/10 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                  {i + 1}
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-bold text-slate-100">{item.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed break-keep">
                    {item.desc.split(item.point).map((part, index, array) => (
                      <span key={index}>
                        {part}
                        {index < array.length - 1 && <span className="text-blue-400 font-semibold">{item.point}</span>}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex relative w-[420px] h-[420px] items-center justify-center shrink-0">
            <div 
              className="absolute inset-0 rounded-full translate-x-[-12%]"
              style={{
                background: 'transparent',
                maskImage: 'linear-gradient(to right, transparent 0%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 100%)',
                border: '3px solid rgba(59, 130, 246, 0.8)',
              }}
            />
            
            <div 
              className="absolute inset-0 rounded-full translate-x-[12%]"
              style={{
                background: 'transparent',
                maskImage: 'linear-gradient(to left, transparent 0%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to left, transparent 0%, black 100%)',
                border: '3px solid rgba(168, 85, 247, 0.8)',
              }}
            />
            
            <div className="z-30 flex flex-col items-center gap-3">
               <div className="relative w-24 h-24 filter drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                 <img 
                    src="/nano.png" 
                    alt="Nano Logo" 
                    className="object-contain"
                 />
               </div>
               <span className="text-xl font-black tracking-[0.3em] bg-gradient-to-r from-blue-400 via-white to-purple-400 bg-clip-text text-transparent uppercase ml-[0.3em]">Nano</span>
            </div>
          </div>

          <div className="w-full lg:w-[320px] xl:w-[350px] flex flex-col gap-8 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 z-20">
            {RIGHT_ITEMS.map((item, i) => (
              <div 
                key={i} 
                className={`flex gap-4 items-start transition-all duration-500
                  ${i === 0 ? 'lg:translate-x-2 lg:-translate-y-14' : i === 2 ? 'lg:translate-x-2 lg:translate-y-14' : 'lg:translate-x-24'}`}
              >
                <div className="shrink-0 w-8 h-8 rounded-full border border-purple-500/60 flex items-center justify-center text-purple-400 font-bold text-sm bg-purple-500/10 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                  {i + 1}
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-bold text-slate-100">{item.title}</h4>
                  <div className="text-sm text-slate-400 leading-relaxed break-keep">
                    {item.highlight ? (
                      <>
                        개인의 속도가 아닌, <span className="text-purple-400 font-bold">팀 전체의 생산성을 높이는 개발자</span>입니다.
                      </>
                    ) : (
                      item.desc.split(item.point!).map((part, index, array) => (
                        <span key={index}>
                          {part}
                          {index < array.length - 1 && <span className="text-purple-400 font-semibold">{item.point}</span>}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pt-8 md:pt-12">
          <div className={`${fonts.cute} space-y-6`}>
            <p className="text-2xl md:text-4xl leading-tight font-bold break-keep">
              <span className={commonGradient}>잘하는 개발자보다</span><br />
              <span className="bg-gradient-to-r from-[#4facfe] to-[#8a2be2] bg-clip-text text-transparent">
                “같이 일하고 싶은 개발자”
              </span>
              <span className={commonGradient}>가 되겠습니다</span>
            </p>
            <div className="space-y-1">
              <p className={`text-sm md:text-lg font-light tracking-wide break-keep ${commonGradient}`}>
                그리고 그 선택이 옳았다는 것을
              </p>
              <p className={`text-base md:text-xl font-bold ${commonGradient}`}>
                결과로 증명하겠습니다
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}