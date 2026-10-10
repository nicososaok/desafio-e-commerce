// components/home-page/styled.tsx
import React from "react";

export function HomeContainer({ children }: { children: React.ReactNode; }) {
  return <div className="max-w-6xl mx-auto px-4 py-8">{children}</div>;
}

export function HeroBanner({ children }: { children: React.ReactNode; }) {
  return (
    <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white rounded-2xl p-8 md:p-12 mb-10 shadow-lg flex flex-col items-center text-center">
      {children}
    </div>
  );
}

export function HomeSearchForm({
  onSubmit,
  children,
}: {
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}) {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-md flex flex-col gap-3 mt-6">
      {children}
    </form>
  );
}

export function HomeSearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type="text"
      placeholder="Buscar productos, marcas y más..."
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-lg bg-white text-black outline-none border-none text-sm shadow-md"
    />
  );
}

export function HomeSearchButton({ children }: { children: React.ReactNode; }) {
  return (
    <button
      type="submit"
      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-lg transition-colors cursor-pointer shadow-md"
    >
      {children}
    </button>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode; }) {
  return (
    <h2 className="text-2xl font-bold mb-6 text-foreground border-b pb-2 border-gray-200 dark:border-neutral-800">
      {children}
    </h2>
  );
}

export function ProductsGrid({ children }: { children: React.ReactNode; }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {children}
    </div>
  );
}

export function ProductCardWrapper({ children, onClick }: { children: React.ReactNode; onClick?: () => void; }) {
  return (
    <div
      onClick={onClick}
      className="group bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-4 flex flex-col justify-between hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {children}
    </div>
  );
}