const MAX_VOTES = 20;

export default function BallotCounter({ count }: { count: number }) {
  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-[11px] tracking-[0.2em] text-navy/70 font-medium uppercase">
        Vote cast
      </span>

      <div className="flex items-center gap-1.5" role="status" aria-live="polite">
        <div className="bg-navy text-paper text-2xl px-3 py-1.5 rounded-sm shadow-[2px_2px_0_0_#8C6D2F]">
          {pad(count)}
        </div>
        <span className="font-mono text-lg text-ink/50 px-0.5">/</span>
        <div className="bg-paper-dark text-navy text-2xl px-3 py-1.5 rounded-sm border-2 border-navy/20">
          {pad(MAX_VOTES)}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-0.75 max-w-70" aria-hidden="true">
        {Array.from({ length: MAX_VOTES }).map((_, i) => (
          <span
            key={i}
            className={`h-3 w-1.5 rounded-[1px] transition-colors duration-300 ${
              i < count ? 'bg-stamp' : 'bg-line'
            }`}
          />
        ))}
      </div>
    </div>
  );
}