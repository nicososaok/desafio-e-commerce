// src/components/layout/index.tsx
import React from "react";
import { Header } from "@/components/header"; // <-- Apunta a src/components/header/index.tsx
import { Footer } from "@/components/footer";
import { MainLayoutWrapper, MainContent } from "./styled";

export function Layout({ children }: { children: React.ReactNode; }) {
  return (
    <MainLayoutWrapper>
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
    </MainLayoutWrapper>
  );
}