// pages/logout.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // 1. Limpiar token de sesión
    localStorage.removeItem("token");

    // 2. Redirigir a la home
    router.replace("/");
  }, [router]);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <p>Cerrando sesión...</p>
    </div>
  );
}