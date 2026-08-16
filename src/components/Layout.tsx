import type { Metadata } from 'next';
import { Roboto_Slab, Work_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import Providers from '@/components/providers';

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

export const metadata: Metadata = {
  title: 'Ballot Box — 20-Voter Election',
  description: 'A single-precinct voting system for 20 registered voters.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body paper-grain min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}