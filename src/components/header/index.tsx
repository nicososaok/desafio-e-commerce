// src/components/header/index.tsx
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import {
  HeaderContainer,
  HeaderTopRow,
  HeaderLogoImg,
  HeaderSearchForm,
  HeaderSearchInput,
  HeaderSearchButton,
  SandwichButton,
  FullScreenMenuOverlay,
} from "./styled";

export function Header() {
  const router = useRouter();
  const { isLoggedIn, user, logout } = useAuth();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setMenuOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="relative">
      <HeaderContainer>
        <HeaderTopRow>
          <Link href="/">
            <HeaderLogoImg src="/logob.svg" alt="Logo e-commerce" />
          </Link>

          <SandwichButton
            src="/Burguer.svg"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </HeaderTopRow>

        <HeaderSearchForm onSubmit={handleSearch}>
          <HeaderSearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <HeaderSearchButton>Buscar</HeaderSearchButton>
        </HeaderSearchForm>
      </HeaderContainer>

      {/* Menú de pantalla completa estilo Figma */}
      <FullScreenMenuOverlay isOpen={menuOpen}>
        {/* Cabecera del menú */}
        <div className="flex justify-between items-center w-full">
          <span className="text-sm font-semibold tracking-wider text-gray-400">Menú</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white text-3xl font-light hover:text-gray-300 transition-colors cursor-pointer p-2"
            aria-label="Cerrar menú"
          >
            &times;
          </button>
        </div>

        {/* Opciones centrales de navegación */}
        <div className="flex flex-col items-center justify-center gap-8 my-auto text-center">
          {!isLoggedIn ? (
            <Link
              href="/signin"
              className="text-3xl font-bold text-white hover:text-mp-yellow transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Ingresar
            </Link>
          ) : (
            <Link
              href="/profile"
              className="text-3xl font-bold text-white hover:text-mp-yellow transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Mi perfil
            </Link>
          )}

          <Link
            href="/search"
            className="text-3xl font-bold text-white hover:text-mp-yellow transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Buscar
          </Link>
        </div>

        {/* Pie de página del menú (Información de usuario y cierre de sesión si está logueado) */}
        <div className="flex flex-col items-center gap-2 pb-6 border-t border-neutral-800 pt-4">
          {isLoggedIn ? (
            <>
              <span className="text-sm text-gray-400">
                {user?.email || "test@test.com"}
              </span>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                  router.push("/");
                }}
                className="text-red-500 hover:text-red-400 text-sm font-semibold transition-colors cursor-pointer mt-1"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <span className="text-xs text-gray-600">© {new Date().getFullYear()} e-commerce</span>
          )}
        </div>
      </FullScreenMenuOverlay>
    </div>
  );
}