"use client";

interface TitleProps {
  text: string;
}

export default function Title({ text }: TitleProps) {
  return (
    <div className="w-full flex flex-col items-center gap-4 mb-16">
      <div className="inline-flex flex-col items-center gap-3">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
          {text}
        </h2>
        <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
      </div>
    </div>
  );
}