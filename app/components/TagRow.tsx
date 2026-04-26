type TagRowProps = {
  items: string[];
};

export function TagRow({ items }: TagRowProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {items.map((item, idx) => (
        <span
          key={idx}
          className="
            px-2.5 py-0.5 text-[11px] font-medium
            rounded-full
            bg-gradient-to-r from-blue-500/20 to-purple-500/20
            border border-white/10
            text-white/80
            backdrop-blur-md
          "
        >
          {item}
        </span>
      ))}
    </div>
  );
}