// components/layout/styled.tsx
import React from "react";

export function MainLayoutWrapper({ children }: { children: React.ReactNode; }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {children}
    </div>
  );
}

export function MainContent({ children }: { children: React.ReactNode; }) {
  return <main className="flex-1 w-full">{children}</main>;
}