import fs from 'fs';
import path from 'path';
import { VOTERS, MAX_VOTES } from './voters';
import type { Vote } from './types';

const isVoterName = (value: string): boolean => VOTERS.includes(value);

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'votes.json');

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
}

export function readVotes(): Vote[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeVotes(votes: Vote[]) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(votes, null, 2), 'utf-8');
}

export type VoteResult =
  | { ok: true; votes: Vote[] }
  | { ok: false; status: number; error: string };

/** Casts a ballot, enforcing: known voter, one vote per voter, 20-vote cap. */
export function castVote(voterRaw: string, candidateRaw: string): VoteResult {
  const voter = voterRaw.trim();
  const candidate = candidateRaw.trim();

  if (!voter || !candidate) {
    return { ok: false, status: 400, error: 'Select a voter and enter a candidate name.' };
  }
  if (!isVoterName(voter)) {
    return { ok: false, status: 400, error: 'That name is not on the electoral roll.' };
  }

  const votes = readVotes();

  if (votes.length >= MAX_VOTES) {
    return { ok: false, status: 403, error: 'Voting is closed — all 20 ballots have been cast.' };
  }
  if (votes.some((v) => v.voter === voter)) {
    return { ok: false, status: 409, error: `${voter} has already voted.` };
  }

  const updated = [...votes, { voter, candidate, castAt: new Date().toISOString() }];
  writeVotes(updated);
  return { ok: true, votes: updated };
}

export function resetVotes(): Vote[] {
  writeVotes([]);
  return [];
}