export type Vote = {
  voter: string;
  candidate: string;
  castAt: string;
};

export type VotesStatus = {
  votes: Vote[];
  count: number;
  remaining: number;
  isFull: boolean;
};

export type TallyRow = {
  key: string;
  candidate: string;
  count: number;
};