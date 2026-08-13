'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@/lib/supabase/client';
import { useKidsMode } from '@/context/KidsModeContext';
import Link from 'next/link';

interface SearchResult {
  verse_id: number;
  verse_key: string;
  snippet: string;
}

export default function SearchPage() {
  const supabase = createBrowserClient();
  const { kidsMode } = useKidsMode();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (q: string) => {
    setQuery(q);
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    const { data } = await supabase.rpc('search_verses', {
      query: q,
      limit_count: 50,
    });
    setResults((data as SearchResult[]) || []);
    setLoading(false);
  };

  return (
    <main className={`max-w-4xl mx-auto p-6 ${kidsMode ? 'text-lg' : ''}`}>
      <h1 className={`font-bold mb-4 ${kidsMode ? 'text-3xl' : 'text-2xl'}`}>
        Search
      </h1>
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search verses..."
          className={`flex-1 border rounded px-3 py-2 dark:bg-gray-900 ${
            kidsMode ? 'text-lg py-3' : ''
          }`}
        />
      </div>

      {loading && <div>Loading...</div>}

      {!loading && results.length === 0 && query && (
        <div>No results found.</div>
      )}

      {!loading && results.length > 0 && (
        <ul className="space-y-3">
          {results.map((r) => (
            <li key={r.verse_id} className="border rounded p-3">
              <Link
                href={`/verse/${r.verse_key}`}
                className="font-semibold text-blue-600"
              >
                {r.verse_key}
              </Link>
              <p className="mt-1 text-sm">{r.snippet}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
