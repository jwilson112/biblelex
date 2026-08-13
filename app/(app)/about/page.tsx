import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">About BibleLex</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">What is BibleLex?</h2>
        <p className="text-gray-700 dark:text-gray-300">
          BibleLex is a cross-platform Bible study app designed for deep original language study.
          It provides access to multiple Bible translations, Hebrew and Greek texts with Strong's numbers,
          morphological parsing, and lexicon definitions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Features</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Multiple Bible translations (public domain and licensed)</li>
          <li>Hebrew and Greek texts with Strong's numbers</li>
          <li>Word-by-word morphological parsing</li>
          <li>Lexicon definitions (BDB for Hebrew, Abbott-Smith for Greek)</li>
          <li>Cross-references and commentaries</li>
          <li>Bookmarks, highlights, and reading plans</li>
          <li>Full-text search across all translations</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Data Sources</h2>
        <div className="space-y-3">
          <div className="border rounded p-4">
            <h3 className="font-semibold">STEP Bible Data</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Hebrew and Greek texts with Strong's numbers and morphology.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              License: CC BY 4.0 – Creative Commons Attribution 4.0 International
            </p>
            <a
              href="https://github.com/STEPBible/STEPBible-Data"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm mt-2 inline-block"
            >
              View STEPBible Repository →
            </a>
          </div>

          <div className="border rounded p-4">
            <h3 className="font-semibold">Public Domain Translations</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              KJV, ASV, WEB, YLT, Darby, BBE, DRA, Geneva, and more.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Technology</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Built with Next.js 14, Supabase (PostgreSQL, Auth, Realtime), and Tailwind CSS.
          Deployed on Vercel for fast, global performance.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">License</h2>
        <p className="text-gray-700 dark:text-gray-300">
          BibleLex source code is proprietary. All rights reserved.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Bible texts and lexicon data are subject to their respective licenses.
          See the <Link href="/licenses" className="text-blue-600 underline">Licenses</Link> page for details.
        </p>
      </section>

      <div className="mt-8">
        <Link href="/" className="text-blue-600 underline">
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
