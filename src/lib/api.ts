import type { VotesStatus } from './types';

export type { VotesStatus };

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function parseOrThrow(res: Response) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(data.error ?? 'Something went wrong.', res.status);
  }
  return data;
}

export async function fetchVotesStatus(): Promise<VotesStatus> {
  const res = await fetch('/api/votes', { cache: 'no-store' });
  return parseOrThrow(res);
}

export async function submitVote(voter: string, candidate: string): Promise<VotesStatus> {
  const res = await fetch('/api/votes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ voter, candidate }),
  });
  return parseOrThrow(res);
}

export async function resetBallotBox(): Promise<VotesStatus> {
  const res = await fetch('/api/votes', { method: 'DELETE' });
  return parseOrThrow(res);
}

export async function fetchVoters(): Promise<{ voters: string[] }> {
  const res = await fetch('/api/voters', { cache: 'no-store' });
  return parseOrThrow(res);
}

export async function addVoter(name: string): Promise<{ voters: string[] }> {
  const res = await fetch('/api/voters', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  return parseOrThrow(res);
}