'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Devotionals', href: '/admin/content/devotionals' },
  { label: 'Maps', href: '/admin/content/maps' },
  { label: 'Kids Bibles', href: '/admin/content/kids-bibles' },
  { label: 'Reading Plans', href: '/admin/content/reading-plans' },
  { label: 'Translations', href: '/admin/translations' },
  { label: 'Lexicon', href: '/admin/lexicon' },
  { label: 'Settings', href: '/admin/settings' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-white dark:bg-gray-800 hidden md:block">
      <nav className="p-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded text-sm ${
                isActive
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
