import Link from 'next/link';
import { FooterAttribution } from '@/components/attribution/FooterAttribution';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <nav className="max-w-6xl mx-auto p-4 flex gap-4 items-center">
          <Link href="/" className="font-bold">
            BibleLex
          </Link>
          <Link href="/search" className="text-sm">
            Search
          </Link>
          <Link href="/verse/JHN.3.16" className="text-sm">
            Verse
          </Link>
          <Link href="/lexicon" className="text-sm">
            Lexicon
          </Link>
          <Link href="/translations" className="text-sm">
            Translations
          </Link>
          <Link href="/licenses" className="text-sm">
            Licenses
          </Link>
          <Link href="/about" className="text-sm">
            About
          </Link>
        </nav>
      </header>
      
      <div className="flex-1">
        {children}
      </div>
      
      <FooterAttribution />
    </div>
  );
}
