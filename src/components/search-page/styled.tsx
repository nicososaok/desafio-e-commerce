// components/search-page/styled.tsx
import React from "react";

export function SearchContainer({ children }: { children: React.ReactNode; }) {
  return <div className="max-w-6xl mx-auto px-4 py-8 min-h-[60vh]">{children}</div>;
}

export function SearchTitle({ query, count }: { query: string; count: number; }) {
  return (
    <div className="mb-6 border-b border-gray-200 pb-4">
      <h1 className="text-2xl font-bold">
        Resultados para <span className="text-blue-600">"{query}"</span>
      </h1>
      <p className="text-sm text-gray-500 mt-1">{count} productos encontrados</p>
    </div>
  );
}

export function SearchGrid({ children }: { children: React.ReactNode; }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {children}
    </div>
  );
}

export function EmptyState({ query }: { query: string; }) {
  return (
    <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
      <p className="text-lg text-gray-600">
        No encontramos productos que coincidan con <strong>"{query}"</strong>.
      </p>
    </div>
  );
}