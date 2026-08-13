import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

async function getTranslations() {
  const supabase = createClient();
  const { data } = await supabase
    .from('translations')
    .select('id, slug, name, license_type, attribution, license_text')
    .order('name');
  return data || [];
}

export default async function LicensesPage() {
  const translations = await getTranslations();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Licenses & Attributions</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">STEPBible Data</h2>
        <div className="border rounded p-4 bg-blue-50 dark:bg-blue-900/20">
          <p className="mb-2">
            <strong>Source:</strong> STEPBible (www.STEPBible.org)
          </p>
          <p className="mb-2">
            <strong>License:</strong> Creative Commons Attribution 4.0 International (CC BY 4.0)
          </p>
          <p className="mb-2">
            <strong>Credit:</strong> &quot;STEP Bible&quot; – Hebrew and Greek texts with Strong's numbers, morphology, and lexicons.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Data created initially by Tyndale House Cambridge, now curated by STEPBible.org.
            Used under CC BY 4.0 license.
          </p>
          <a
            href="https://github.com/STEPBible/STEPBible-Data"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline mt-2 inline-block"
          >
            View STEPBible Data Repository →
          </a>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Bible Translations</h2>
        <div className="space-y-3">
          {translations.map((t) => (
            <div
              key={t.id}
              className="border rounded p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{t.name}</h3>
                  {t.attribution && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {t.attribution}
                    </p>
                  )}
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    t.license_type === 'public_domain'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}
                >
                  {t.license_type === 'public_domain' ? 'Public Domain' : 'Licensed'}
                </span>
              </div>
              {t.license_text && (
                <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
                  {t.license_text}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Lexicon Sources</h2>
        <div className="space-y-3">
          <div className="border rounded p-4">
            <h3 className="font-semibold">Brown-Driver-Briggs (BDB) Hebrew Lexicon</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Public domain. Abridged version via STEPBible.
            </p>
          </div>
          <div className="border rounded p-4">
            <h3 className="font-semibold">Abbott-Smith Greek Lexicon</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Public domain. Via STEPBible.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-8">
        <Link href="/" className="text-blue-600 underline">
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
