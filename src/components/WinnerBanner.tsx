import { FaTrophy } from 'react-icons/fa';
import { aggregateVotes } from '../lib/tally';
import type { Vote } from '../lib/types';

export default function WinnerBanner({ votes }: { votes: Vote[] }) {
  const rows = aggregateVotes(votes);
  if (rows.length === 0) return null;

  const topCount = rows[0].count;
  const winners = rows.filter((r) => r.count === topCount);
  const isTie = winners.length > 1;

  return (
    <div className="w-full max-w-3xl bg-navy text-paper text-s rounded-md p-6 sm:p-7 flex flex-col items-center gap-2 text-center shadow-[3px_3px_0_0_#C9BFA6]">
      <FaTrophy className="text-brass" size={22} aria-hidden="true" />
      <span className="text-[11px] tracking-[0.25em] uppercase text-paper/60 font-medium">
        {isTie ? 'Election result — tie' : 'Election result'}
      </span>

      {isTie ? (
        <>
          <h2 className="font-display text-2xl sm:text-3xl">
            {winners.map((w) => w.candidate).join(' & ')}
          </h2>
          <p className="text-paper/70 text-sm">
            Tied at {topCount} vote{topCount === 1 ? '' : 's'} each.
          </p>
        </>
      ) : (
        <>
          <h2 className="font-display text-2xl sm:text-3xl">{winners[0].candidate}</h2>
          <p className="text-paper/70 text-sm">
            Won with {topCount} vote{topCount === 1 ? '' : 's'} out of {votes.length}.
          </p>
        </>
      )}
    </div>
  );
}