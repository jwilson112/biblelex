'use client';

import { useState } from 'react';

interface Column<T> {
  header: string;
  key?: keyof T;
  render?: (item: T) => React.ReactNode;
}

interface ContentTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  filters?: React.ReactNode;
}

export function ContentTable<T extends { id: string | number }>({
  columns,
  data,
  onEdit,
  onDelete,
  searchPlaceholder = 'Search...',
  onSearch,
  filters,
}: ContentTableProps<T>) {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={query}
          onChange={handleSearch}
          className="flex-1 border rounded px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700"
        />
        {filters}
      </div>

      <div className="overflow-x-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="text-left px-4 py-2 font-medium text-gray-700 dark:text-gray-300"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50"
              >
                {columns.map((col, idx) => (
                  <td key={idx} className="px-4 py-2 text-gray-800 dark:text-gray-200">
                    {col.render ? col.render(item) : col.key ? String(item[col.key]) : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(onEdit || onDelete) && (
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(data[0])}
              className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(data[0])}
              className="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
