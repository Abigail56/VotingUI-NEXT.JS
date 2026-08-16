import { FaClipboardList, FaCrown } from 'react-icons/fa';

type Vote = any;

const aggregateVotes = (votes: Vote[]): Array<{ key: string; candidate: string; count: number }> => {
  const tally: Record<string, number> = {};
  votes.forEach((vote) => {
    if (vote.candidate) {
      tally[vote.candidate] = (tally[vote.candidate] || 0) + 1;
    }
  });
  return Object.entries(tally)
    .map(([candidate, count]) => ({ key: candidate, candidate, count }))
    .sort((a, b) => b.count - a.count);
};

export default function TallyBoard({ votes }: { votes: Vote[] }) {
  const rows: Array<{ key: string; candidate: string; count: number }> = aggregateVotes(votes);
  const leaderCount = rows[0]?.count ?? 0;

  return (
    <section
      aria-labelledby="tally-heading"
      className="bg-paper-dark/70 border border-navy/15 rounded-md p-5 sm:p-6"
    >
      <div className="flex items-center gap-2.5 mb-5">
        <FaClipboardList className="text-navy/70 shrink-0" size={16} aria-hidden="true" />
        <h2 id="tally-heading" className="font-display text-navy text-lg tracking-tight">
          Tally board
        </h2>
      </div>

      {rows.length === 0 ? (
        <p className="text-ink/60 text-sm leading-relaxed">
          No votes cast yet. Once the first vote is in, its candidate opens the tally.
        </p>
      ) : (
        <ul className="flex flex-col divide-y divide-line/70">
          {rows.map((row) => {
            const isLeader = row.count === leaderCount && leaderCount > 0;
            return (
              <li
                key={row.key}
                className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-2 min-w-0">
                  {isLeader && (
                    <FaCrown className="text-brass shrink-0" size={13} aria-label="Leading candidate" />
                  )}
                  <span className="font-body font-medium text-ink truncate">{row.candidate}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-navy font-semibold text-sm w-5 text-right">
                    {row.count}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}