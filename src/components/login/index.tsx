// src/components/login/index.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

export function LoginComponent() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (typeof login === "function") {
        await login(email, password);
      }
      router.push("/");
    } catch (err) {
      setError("Credenciales inválidas o error al iniciar sesión");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl mt-12 text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Ingresar</h2>

      {error && (
        <div className="bg-red-950/50 border border-red-800 text-red-200 text-sm p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
            Correo electrónico
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white outline-none focus:border-blue-500 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white outline-none focus:border-blue-500 text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-lg transition-colors cursor-pointer mt-2 shadow-md"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}