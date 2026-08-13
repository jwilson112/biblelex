'use client';

import { useState } from 'react';

export function STEPBibleAttribution() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline"
      >
        STEP Bible
      </button>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">STEP Bible Attribution</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="border rounded p-4 bg-blue-50 dark:bg-blue-900/20">
                <h3 className="font-semibold mb-2">STEP Bible Data</h3>
                <p className="mb-2">
                  <strong>Source:</strong> STEPBible (www.STEPBible.org)
                </p>
                <p className="mb-2">
                  <strong>License:</strong> Creative Commons Attribution 4.0 International (CC BY 4.0)
                </p>
                <p className="mb-2">
                  <strong>Credit:</strong> &quot;STEP Bible&quot;
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Data created initially by Tyndale House Cambridge, now curated by STEPBible.org.
                  This data includes Hebrew and Greek texts with Strong's numbers, morphology, and lexicons.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">What is STEP Bible?</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  STEP (Scripture Text Encoding Project) Bible is a scholarly resource used by major Bible software
                  companies like Logos, Accordance, and Blue Letter Bible. The data is created by Tyndale House
                  Cambridge and provides high-quality Hebrew and Greek texts with Strong's numbers and morphological parsing.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">License Details</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  This data is licensed under the Creative Commons Attribution 4.0 International License.
                  This means you are free to:
                </p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc pl-5 space-y-1">
                  <li>Share — copy and redistribute the material in any medium or format</li>
                  <li>Adapt — remix, transform, and build upon the material for any purpose, even commercially</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  Under the following terms:
                </p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc pl-5 space-y-1">
                  <li>Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made.</li>
                </ul>
              </div>

              <div className="flex gap-4 pt-4">
                <a
                  href="https://github.com/STEPBible/STEPBible-Data"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  View STEPBible Repository →
                </a>
                <a
                  href="https://creativecommons.org/licenses/by/4.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  View CC BY 4.0 License →
                </a>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
