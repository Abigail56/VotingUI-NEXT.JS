# Hackathon Voting System

A single-precinct voting application built with Next.js, TypeScript, Tailwind CSS, and React Query. It supports voter registration, one-vote-per-voter enforcement, and a live tally board.

**Live demo:** https://voting-ui-next-js.vercel.app/

## Features

- Dynamic registered-voter roll
- Server-side enforcement of one vote per registered voter
- Live tally board with a leader indicator
- Winner banner when all votes have been cast
- File-backed persistence

## Tech stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Query

## Run locally

**Requirements:** Node.js and npm.

```bash
git clone https://github.com/Abigail56/VotingUI-NEXT.JS.git
cd VotingUI-NEXT.JS
npm install
npm run dev
```

Open http://localhost:3000.

## Available scripts

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm start        # Serve the production build
npm run lint     # Run lint checks (if configured)
```

## Important note

This project is a demonstration voting application, not a production election system. Production voting requires stronger identity verification, auditing, security review, durable infrastructure, and legally compliant procedures.
