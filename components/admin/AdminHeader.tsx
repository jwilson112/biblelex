'use client';

import { createBrowserClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function AdminHeader() {
  const router = useRouter();
  const supabase = createBrowserClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  return (
    <header className="border-b bg-white dark:bg-gray-800">
      <div className="px-4 py-3 flex justify-between items-center">
        <Link href="/admin" className="font-bold text-lg">
          BibleLex Admin
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
          >
            View site
          </Link>
          <button
            onClick={handleSignOut}
            className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
