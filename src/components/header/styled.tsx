// src/components/header/styled.tsx
import React from "react";

export function HeaderContainer({ children }: { children: React.ReactNode; }) {
  return (
    <header className="bg-dark-bg text-white py-3 px-4 border-b border-neutral-800">
      <div className="max-w-6xl mx-auto flex flex-col gap-3">
        {children}
      </div>
    </header>
  );
}

export function HeaderTopRow({ children }: { children: React.ReactNode; }) {
  return (
    <div className="flex items-center justify-between w-full">
      {children}
    </div>
  );
}

export function HeaderLogoImg({ src, alt }: { src: string; alt: string; }) {
  return (
    <img
      src={src}
      alt={alt}
      className="h-8 md:h-10 object-contain cursor-pointer hover:opacity-90 transition-opacity"
    />
  );
}

export function HeaderSearchForm({
  onSubmit,
  children,
}: {
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col w-full max-w-md mx-auto gap-2 my-1">
      {children}
    </form>
  );
}

export function HeaderSearchInput({
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
      className="w-full px-3 py-2.5 bg-white text-black rounded-md outline-none text-sm shadow-inner border border-gray-300"
    />
  );
}

export function HeaderSearchButton({ children }: { children: React.ReactNode; }) {
  return (
    <button
      type="submit"
      className="w-full py-2.5 bg-mp-yellow hover:bg-yellow-400 text-black font-bold text-sm rounded-md transition-colors cursor-pointer shadow-sm text-center"
    >
      {children}
    </button>
  );
}

export function SandwichButton({ onClick, src }: { onClick: () => void; src: string; }) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer flex items-center justify-center shrink-0"
      aria-label="Menú"
    >
      <img src={src} alt="Menú" className="w-7 h-7 object-contain brightness-0 invert" />
    </button>
  );
}

export function FullScreenMenuOverlay({ children, isOpen }: { children: React.ReactNode; isOpen: boolean; }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col justify-between p-8">
      {children}
    </div>
  );
}