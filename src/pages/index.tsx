import Head from 'next/head';
import VotingApp from '../components/VotingApp';

export default function Home() {
  return (
    <>
      <Head>
        <title>HACKATHON VOTING SYSTEM</title>
        <meta name="description" content="A single-precinct voting system for 20 registered voters." />
      </Head>
      <VotingApp />
    </>
  );
}