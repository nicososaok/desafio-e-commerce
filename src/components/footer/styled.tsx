// components/footer/styled.tsx
import React from "react";

export function FooterContainer({ children }: { children: React.ReactNode; }) {
  return (
    <footer className="bg-dark-bg text-gray-400 py-8 px-4 border-t border-neutral-800 text-sm mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {children}
      </div>
    </footer>
  );
}