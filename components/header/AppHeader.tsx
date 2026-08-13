'use client';

import Link from 'next/link';
import { useKidsMode } from '@/context/KidsModeContext';

export function AppHeader() {
  const { kidsMode, setKidsMode } = useKidsMode();

  return (
    <header className="border-b bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-bold text-lg">
            BibleLex
          </Link>
          <nav className="hidden sm:flex gap-4 text-sm">
            <Link href="/search" className="hover:underline">Search</Link>
            <Link href="/verse/JHN.3.16" className="hover:underline">Verse</Link>
            <Link href="/lexicon" className="hover:underline">Lexicon</Link>
            <Link href="/translations" className="hover:underline">Translations</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={kidsMode}
              onChange={(e) => setKidsMode(e.target.checked)}
              className="h-4 w-4"
            />
            Kids
          </label>
          <Link
            href="/admin"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
