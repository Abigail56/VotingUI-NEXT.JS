'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { FaCheck, FaLock, FaStamp, FaUserCheck } from 'react-icons/fa';

const VOTERS = [
 'Austin', 
 'Kosi', 
 'Rita', 
 'Charsel', 
 'Ifeanyi',
 'Amara', 
 'Stephine', 
 'Lilian', 
 'Chidinma', 
 'Loveth',
 'Victor', 
 'Bonaveature', 
 'Anthony', 
 'James', 
 'David',
 'Majesty', 
 'Gabriel', 
 'Peter', 
 'Abigail', 
 'Christopher',
];

type Props = {
  votedNames: Set<string>;
  isFull: boolean;
  isPending: boolean;
  errorMessage: string | null;
  justVoted: { voter: string; candidate: string } | null;
  onSubmitAction: (voter: string, candidate: string) => void;
};

export default function VotingForm({
  votedNames,
  isFull,
  isPending,
  errorMessage,
  justVoted,
  onSubmitAction,
}: Props) {
  const [voter, setVoter] = useState('');
  const [candidate, setCandidate] = useState('');
  const [showStamp, setShowStamp] = useState(false);

  useEffect(() => {
    if (!justVoted) return;
    setVoter('');
    setCandidate('');
    setShowStamp(true);
    const timer = setTimeout(() => setShowStamp(false), 1500);
    return () => clearTimeout(timer);
  }, [justVoted]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!voter || !candidate.trim() || isFull || isPending) return;
    onSubmitAction(voter, candidate.trim());
  };

  const canSubmit = voter !== '' && candidate.trim() !== '' && !isFull && !isPending;

  if (isFull) {
    return (
      <div className="flex flex-col items-center text-center gap-3 py-10 px-6">
        <FaLock className="text-navy/50" size={22} aria-hidden="true" />
        <h2 className="font-display text-navy text-xl">Polls are closed</h2>
        <p className="text-ink/60 text-sm max-w-xs leading-relaxed">
          All 20 registered voters have casted their votes. See the tally board for the final count.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col gap-5 p-6 sm:p-7">
      {showStamp && justVoted && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center bg-paper/80 backdrop-blur-[1px] rounded-md"
          role="status"
        >
          <div className="flex flex-col items-center gap-2 animate-stamp text-stamp">
            <div className="flex items-center gap-2 border-[3px] border-stamp rounded-md px-5 py-2.5 rotate-[-10deg]">
              <FaStamp size={20} aria-hidden="true" />
              <span className="font-display text-xl tracking-wide">VOTE CAST</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="voter" className="text-xs font-medium tracking-wide uppercase text-navy/70">
          Registered voters
        </label>
        <div className="relative">
          <FaUserCheck
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy/40"
            size={14}
            aria-hidden="true"
          />
          <select
            id="voter"
            value={voter}
            onChange={(e) => setVoter(e.target.value)}
            disabled={isPending}
            required
            className="w-full appearance-none rounded-sm border border-navy/25 bg-paper pl-9 pr-8 py-2.5 text-s text-ink focus:border-navy disabled:opacity-60"
          >
            <option value="" disabled>
              Select your name…
            </option>
            {VOTERS.map((name) => {
              const hasVoted = votedNames.has(name);
              return (
                <option key={name} value={name} disabled={hasVoted}>
                  {name}
                  {hasVoted ? ' — already voted' : ''}
                </option>
              );
            })}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-navy/40 text-xs">
            ▾
          </span>
        </div>
        <p className="text-s text-ink/50">
          {votedNames.size} of {VOTERS.length} names on the roll have voted.
        </p>
      </div>

      <div className="perforation my-0.5" role="presentation" />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="candidate" className="text-s font-medium tracking-wide uppercase text-navy/70">
          Candidate
        </label>
        <input
          id="candidate"
          type="text"
          value={candidate}
          onChange={(e) => setCandidate(e.target.value)}
          disabled={isPending}
          placeholder="Type the candidate's name"
          maxLength={60}
          required
          className="w-full rounded-sm text-s border border-navy/25 bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:border-navy disabled:opacity-60"
        />
      </div>

      {errorMessage && (
        <p
          role="alert"
          className="text-sm text-stamp bg-stamp/10 border border-stamp/30 rounded-sm px-3 py-2"
        >
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-sm bg-navy text-paper font-medium text-sm py-3 transition-colors hover:bg-navy-light disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <FaCheck size={13} aria-hidden="true" />
        {isPending ? 'Casting ballot…' : 'Cast vote'}
      </button>
    </form>
  );
}