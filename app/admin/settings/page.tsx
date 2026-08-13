'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@/lib/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { FormField } from '@/components/admin/FormField';

export default function AdminSettingsPage() {
  const supabase = createBrowserClient();
  const [kidsModeEnabled, setKidsModeEnabled] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      const { data } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'features')
        .single();

      if (data?.value) {
        setKidsModeEnabled(!!(data.value as any).kids_mode);
      }
    }
    loadSettings();
  }, [supabase]);

  const handleSave = async () => {
    setSaving(true);
    await supabase
      .from('settings')
      .upsert({
        key: 'features',
        value: { kids_mode: kidsModeEnabled },
      });
    setSaving(false);
    alert('Settings saved.');
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="max-w-2xl space-y-4">
        <FormField label="Enable Kids Mode">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={kidsModeEnabled}
              onChange={(e) => setKidsModeEnabled(e.target.checked)}
              className="h-4 w-4"
            />
            <span>Show Kids toggle in the app</span>
          </label>
        </FormField>

        <div className="pt-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
