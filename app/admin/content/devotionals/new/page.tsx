'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { FormField } from '@/components/admin/FormField';
import { MarkdownEditor } from '@/components/admin/MarkdownEditor';

export default function NewDevotionalPage() {
  const router = useRouter();
  const supabase = createBrowserClient();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [readingReference, setReadingReference] = useState('');
  const [audience, setAudience] = useState('general');
  const [tags, setTags] = useState('');
  const [author, setAuthor] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const tagsArray = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const { error } = await supabase.from('devotionals').insert({
      slug,
      title,
      content,
      reading_reference: readingReference,
      audience,
      tags: tagsArray,
      author,
      published_at: new Date().toISOString(),
    });

    setSaving(false);
    if (!error) {
      router.push('/admin/content/devotionals');
    } else {
      alert('Error saving devotional: ' + error.message);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Add Devotional</h1>

      <div className="max-w-3xl space-y-4">
        <FormField label="Title">
          <input
            className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormField>

        <FormField label="Content">
          <MarkdownEditor value={content} onChange={setContent} />
        </FormField>

        <FormField label="Reading reference (e.g. JHN.3.16)">
          <input
            className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700"
            value={readingReference}
            onChange={(e) => setReadingReference(e.target.value)}
          />
        </FormField>

        <FormField label="Audience">
          <select
            className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
          >
            <option value="general">General</option>
            <option value="kids">Kids</option>
            <option value="leaders">Leaders</option>
          </select>
        </FormField>

        <FormField label="Tags (comma-separated)">
          <input
            className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="prayer, family, faith"
          />
        </FormField>

        <FormField label="Author">
          <input
            className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </FormField>

        <div className="flex gap-3 pt-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
