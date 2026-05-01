import { Logo } from "../components/Logo";

export function Intro() {
  return (
    <section
      id="intro"
      className="min-h-screen flex items-center justify-center px-6 pt-30"
    >
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-10">
        
        <div className="shrink-0">
          <Logo size="xl" />
        </div>

        <div className="flex flex-col gap-6 text-center md:text-left">
          
          <div className="space-y-3">
            <h1 className="text-2xl md:text-4xl font-bold leading-snug">
              비즈니스 요구사항을 명확한 코드로 풀어내는<br />
              실전형 개발자{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold">
                김재영
              </span>
              입니다.
            </h1>
          </div>

          <div className="flex flex-col gap-3 text-sm md:text-base text-white/80">
            
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <img src="/icon/logo_location.svg" className="w-5 h-5" />
              <span>서울시 광진구</span>
            </div>

            <div className="flex items-center gap-2 justify-center md:justify-start">
              <img src="/icon/logo_call.svg" className="w-5 h-5" />
              <span>+82 10 9190 7946</span>
            </div>

            <div className="flex items-center gap-2 justify-center md:justify-start">
              <img src="/icon/logo_email.svg" className="w-5 h-5" />
              <span>kjyyy7341@gmail.com</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {[
              "빠른 이해력",
              "끝까지 책임지는 실행력",
              "금융 도메인 실무 경험",
            ].map((text, i) => (
              <span
                key={text}
                className="
                  px-3 py-1 text-xs rounded-full
                  bg-gradient-to-r from-blue-500/20 to-purple-500/20
                  border border-white/10
                  text-white/80
                  backdrop-blur-md
                "
                style={{
                  animationDelay: `${i * 100}ms`,
                }}
              >
                {text}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}