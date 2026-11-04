import React from 'react';
export default function StubPage({ title }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{title}</h1>
      <p className="text-slate-500 mt-2">Loading module...</p>
    </div>
  );
}
