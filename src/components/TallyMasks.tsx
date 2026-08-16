export default function TallyMarks({ count }: { count: number }) {
  const groups: number[] = [];
  let remaining = count;
  while (remaining > 0) {
    const size = Math.min(5, remaining);
    groups.push(size);
    remaining -= size;
  }

  if (groups.length === 0) {
    return <span className="text-ink/30 text-sm">—</span>;
  }

  return (
    <div className="flex items-center gap-1.75" aria-hidden="true">
      {groups.map((size, gi) => (
        <div key={gi} className="relative flex items-end gap-0.75 h-4.5">
          {Array.from({ length: Math.min(size, 4) }).map((_, i) => (
            <span key={i} className="w-[2.5px] h-4.25 bg-ink/80 rounded-[1px]" />
          ))}
          {size === 5 && (
            <span className="absolute -left-0.5 top-0.5 w-4.75 h-[2.5px] bg-stamp rotate-[-32deg] origin-left rounded-[1px]" />
          )}
        </div>
      ))}
    </div>
  );
}