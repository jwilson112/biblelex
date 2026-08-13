'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@/lib/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ContentTable } from '@/components/admin/ContentTable';
import Link from 'next/link';

interface Devotional {
  id: number;
  slug: string;
  title: string;
  reading_reference: string | null;
  audience: string;
  tags: string[] | null;
  published_at: string;
}

export default function DevotionalsListPage() {
  const supabase = createBrowserClient();
  const [devotionals, setDevotionals] = useState<Devotional[]>([]);

  useEffect(() => {
    async function loadDevotionals() {
      const { data } = await supabase
        .from('devotionals')
        .select('id, slug, title, reading_reference, audience, tags, published_at')
        .order('published_at', { ascending: false });
      setDevotionals(data || []);
    }
    loadDevotionals();
  }, [supabase]);

  const columns = [
    { header: 'Title', key: 'title' as const },
    { header: 'Reference', key: 'reading_reference' as const },
    { header: 'Audience', key: 'audience' as const },
    {
      header: 'Tags',
      render: (d: Devotional) => (d.tags || []).join(', '),
    },
    {
      header: 'Published',
      render: (d: Devotional) =>
        new Date(d.published_at).toLocaleDateString(),
    },
  ];

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Devotionals</h1>
        <Link
          href="/admin/content/devotionals/new"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add Devotional
        </Link>
      </div>

      <ContentTable
        columns={columns}
        data={devotionals}
        searchPlaceholder="Search devotionals..."
      />
    </AdminLayout>
  );
}
