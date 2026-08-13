import Link from 'next/link';
import { AppHeader } from '@/components/header/AppHeader';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold">BibleLex</h1>
          <p className="text-lg">
            Deep Bible study with original languages, parallel translations, and
            AI-assisted insights.
          </p>

          <div className="flex gap-4">
            <Link
              href="/search"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Search
            </Link>
            <Link
              href="/verse/JHN.3.16"
              className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded"
            >
              Sample Verse
            </Link>
          </div>

          <section className="pt-8">
            <h2 className="text-xl font-semibold mb-2">Features</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Multiple translations (public domain + licensed)</li>
              <li>Hebrew & Greek with Strong's numbers</li>
              <li>Word-level lexicon lookup</li>
              <li>Cross-references and commentaries</li>
              <li>Bookmarks, highlights, reading plans</li>
              <li>Kids mode for family-friendly study</li>
            </ul>
          </section>
        </div>
      </main>
      <footer className="border-t py-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Hebrew & Greek data from STEP Bible •
        <Link href="/licenses" className="underline ml-1">Licenses</Link> •
        <Link href="/about" className="underline ml-1">About</Link>
      </footer>
    </div>
  );
}
