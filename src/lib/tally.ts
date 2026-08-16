import type { Vote, TallyRow } from './types';

/**
 * Groups votes by candidate name, case- and whitespace-insensitively, keeping
 * the casing of the first vote as the display label. Sorted by count desc,
 * then alphabetically for ties.
 */
export function aggregateVotes(votes: Vote[]): TallyRow[] {
  const map = new Map<string, TallyRow>();

  for (const vote of votes) {
    const key = vote.candidate.trim().toLowerCase();
    if (!key) continue;
    const existing = map.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(key, { key, candidate: vote.candidate.trim(), count: 1 });
    }
  }

  return Array.from(map.values()).sort(
    (a, b) => b.count - a.count || a.candidate.localeCompare(b.candidate)
  );
}