import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Roboto_Slab, Work_Sans, IBM_Plex_Mono } from 'next/font/google';
import Providers from '@/components/providers';
import '@/styles/globals.css';

const display = Roboto_Slab({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-display',
});

const body = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} font-body paper-grain min-h-screen`}>
      <Head>
        <title>Ballot Box — 20-Voter Election</title>
        <meta name="description" content="A single-precinct voting system for 20 registered voters." />
      </Head>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </div>
  );
}