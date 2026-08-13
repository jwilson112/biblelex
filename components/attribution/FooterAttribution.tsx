import { STEPBibleAttribution } from './STEPBibleAttribution';

export function FooterAttribution() {
  return (
    <footer className="border-t mt-auto py-4">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-4">
          <span>Hebrew & Greek data from</span>
          <STEPBibleAttribution />
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/licenses"
            className="hover:text-gray-900 dark:hover:text-gray-200 underline"
          >
            Licenses
          </a>
          <span>•</span>
          <a
            href="/about"
            className="hover:text-gray-900 dark:hover:text-gray-200 underline"
          >
            About
          </a>
        </div>
      </div>
    </footer>
  );
}
