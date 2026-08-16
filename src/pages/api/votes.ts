import type { NextApiRequest, NextApiResponse } from 'next';
import { readVotes, castVote, resetVotes } from '../../lib/vote';
import { MAX_VOTES } from '../../lib/voters';
import type { Vote } from '../../lib/types';

function withStatus(votes: Vote[]) {
  return {
    votes,
    count: votes.length,
    remaining: Math.max(0, MAX_VOTES - votes.length),
    isFull: votes.length >= MAX_VOTES,
  };
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      return res.status(200).json(withStatus(readVotes()));
    }

    case 'POST': {
      const body = req.body ?? {};
      if (typeof body.voter !== 'string' || typeof body.candidate !== 'string') {
        return res.status(400).json({ error: 'Request must include voter and candidate.' });
      }

      const result = castVote(body.voter, body.candidate);
      if (!result.ok) {
        return res.status(result.status).json({ error: result.error });
      }

      return res.status(201).json(withStatus(result.votes));
    }

    case 'DELETE': {
      return res.status(200).json(withStatus(resetVotes()));
    }

    default: {
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      return res.status(405).json({ error: `Method ${req.method} not allowed.` });
    }
  }
}