import type { Metadata } from 'next';
import './globals.css';
import { KidsModeProvider } from '@/context/KidsModeContext';

export const metadata: Metadata = {
  title: 'BibleLex – Deep Bible Study',
  description:
    'Cross-platform Bible study with original languages, parallel translations, and AI-assisted insights.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <KidsModeProvider>{children}</KidsModeProvider>
      </body>
    </html>
  );
}
