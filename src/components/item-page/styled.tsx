// components/item-page/styled.tsx
import React from "react";

export function ItemDetailLayout({ children }: { children: React.ReactNode; }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
      {children}
    </div>
  );
}

export function ImageContainer({ src, title }: { src: string; title: string; }) {
  return (
    <div className="w-full h-80 md:h-[450px] bg-white rounded-2xl border border-gray-200 overflow-hidden flex items-center justify-center p-4">
      <img src={src} alt={title} className="max-h-full max-w-full object-contain" />
    </div>
  );
}

export function ItemInfoContainer({ children }: { children: React.ReactNode; }) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

export function PriceTag({ amount }: { amount: number; }) {
  return (
    <span className="text-3xl font-extrabold text-mp-green">
      ${amount?.toLocaleString()}
    </span>
  );
}

export function BuyButton({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full py-4 bg-mp-blue hover:bg-blue-600 text-white font-bold text-lg rounded-xl transition-colors cursor-pointer shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}