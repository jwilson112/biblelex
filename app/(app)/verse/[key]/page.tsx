'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase/client';
import { useKidsMode } from '@/context/KidsModeContext';
import Link from 'next/link';

interface VerseText {
  translation_slug: string;
  translation_name: string;
  verse_text: string;
}

export default function VersePage() {
  const params = useParams();
  const key = params.key as string;
  const supabase = createBrowserClient();
  const { kidsMode } = useKidsMode();
  const [texts, setTexts] = useState<VerseText[]>([]);

  useEffect(() => {
    async function loadVerse() {
      const { data } = await supabase.rpc('get_verse_full', {
        p_verse_key: key,
      });
      setTexts(data || []);
    }
    loadVerse();
  }, [supabase, key]);

  return (
    <main className={`max-w-4xl mx-auto p-6 ${kidsMode ? 'text-lg' : ''}`}>
      <h1 className={`font-bold mb-4 ${kidsMode ? 'text-3xl' : 'text-2xl'}`}>
        {key}
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        {texts.map((t) => (
          <section key={t.translation_slug} className="border rounded p-4">
            <h2 className="font-semibold mb-2">{t.translation_name}</h2>
            <p className="leading-relaxed">{t.verse_text}</p>
          </section>
        ))}
      </div>

      {!kidsMode && (
        <div className="mt-6 flex gap-4">
          <Link
            href={`/lexicon?verse=${key}`}
            className="text-blue-600 underline"
          >
            View original languages & lexicon
          </Link>
          <Link
            href={`/search?q=${encodeURIComponent(key)}`}
            className="text-blue-600 underline"
          >
            Search this reference
          </Link>
        </div>
      )}
    </main>
  );
}
