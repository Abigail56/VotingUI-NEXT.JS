'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FaUndo } from 'react-icons/fa';
import TallyBoard from './TallyBoard';
import VotingForm from './VotingForm';
import BallotCounter from './BallotCounter';
import WinnerBanner from './WinnerBanner';
import { fetchVotesStatus, submitVote, resetBallotBox, ApiError } from '@/lib/api';

type VotesStatus = {
  votes: Array<{ voter: string; candidate: string; castAt: string }>;
  count: number;
  isFull: boolean;
};

export default function VotingApp() {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [justVoted, setJustVoted] = useState<{ voter: string; candidate: string } | null>(null);

  const { data, isLoading, isError } = useQuery<VotesStatus>({
    queryKey: ['votes-status'],
    queryFn: fetchVotesStatus,
    refetchInterval: 4000, // picks up ballots cast from other browser tabs/devices
  });

  const mutation = useMutation({
    mutationFn: ({ voter, candidate }: { voter: string; candidate: string }) =>
      submitVote(voter, candidate),
    onMutate: () => setErrorMessage(null),
    onSuccess: (status, variables) => {
      queryClient.setQueryData(['votes-status'], status);
      setJustVoted({ voter: variables.voter, candidate: variables.candidate });
    },
    onError: (err) => {
      setErrorMessage(err instanceof ApiError ? err.message : 'Could not reach the ballot box.');
    },
  });

  const resetMutation = useMutation({
    mutationFn: resetBallotBox,
    onSuccess: (status) => {
      queryClient.setQueryData(['votes-status'], status);
      setErrorMessage(null);
      setJustVoted(null);
    },
  });

  const votes: VotesStatus['votes'] = data?.votes ?? [];
  const votedNames = new Set<string>(votes.map((v: VotesStatus['votes'][number]) => v.voter));
  const isFull = data?.isFull ?? false;

  return (
    <main className="relative z-1 min-h-screen flex flex-col items-center px-4 py-12 sm:py-16">
      <header className="flex flex-col items-center text-center gap-2 mb-9 max-w-md">
        <span className="text-4xl text-orange-500 tracking-[0.25em] uppercase text-brass font-medium">
          WELCOME TO:
        </span>
        <h1 className="font-display text-navy text-2xl font-medium p-6 sm:text leading-tight">
          HACKATHON&nbsp;VOTING SYSTEM, WHERE YOUR VOTE COUNTS
        </h1>
        <p className="text-ink/60 text-s leading-relaxed">
           <span className="text-[#cb2900] text-xl font-bold">INSTRUCTION:</span> 20 registered voters, one man-one vote. Choose your name, write in a
          candidate of your choice, and cast your vote.
        </p>
      </header>

      {isLoading ? (
        <p className="text-ink/50 text-sm">Opening the voting system…</p>
      ) : isError ? (
        <p className="text-sm text-stamp">Couldn&apos;t load the ballot box. Refresh to try again.</p>
      ) : (
        <div className="w-full max-w-3xl flex flex-col items-center gap-9">
          <BallotCounter count={data?.count ?? 0} />
          {(isFull || true) && <WinnerBanner votes={votes} />}

          <div className="w-full grid md:grid-cols-2 gap-6 items-start">
            <div className="bg-paper border-2 border-navy/15 rounded-md shadow-[3px_3px_0_0_#C9BFA6] overflow-hidden">
              <VotingForm
                votedNames={votedNames}
                isFull={isFull}
                isPending={mutation.isPending}
                errorMessage={errorMessage}
                justVoted={justVoted}
                onSubmitAction={(voter, candidate) => mutation.mutate({ voter, candidate })}
              />
            </div>

            <TallyBoard votes={votes} />
          </div>

          <button
            type="button"
            onClick={() => {
              if (confirm('Reset the ballot box and clear all 20 votes? This is for demo purposes.')) {
                resetMutation.mutate();
              }
            }}
            className="inline-flex items-center gap-1.5 text-[11px] text-ink/40 hover:text-stamp transition-colors mt-2"
          >
            <FaUndo size={10} aria-hidden="true" />
            Reset ballot box (demo)
          </button>
        </div>
      )}
    </main>
  );
}