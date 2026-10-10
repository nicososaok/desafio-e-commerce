// pages/signin.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import { Layout } from "@/components/layout";
import { sendCode, auth } from "@/styles/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function SigninPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Paso 1: Enviar Email
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError("");

    try {
      await sendCode(email);
      setStep("code");
    } catch (err: any) {
      setError(err.message || "Error al enviar el código de confirmación.");
    } finally {
      setLoading(false);
    }
  };

  // Paso 2: Validar Código y Obtener Token
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await auth(email, code);
      if (res.token) {
        await login(res.token);
        router.push("/profile");
      } else {
        throw new Error("Código incorrecto o expirado.");
      }
    } catch (err: any) {
      setError(err.message || "Error al verificar el código.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div style={{ maxWidth: "400px", margin: "60px auto", padding: "20px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "24px" }}>Iniciar Sesión</h1>

        {error && (
          <div style={{ color: "red", backgroundColor: "#ffebee", padding: "10px", borderRadius: "6px", marginBottom: "16px" }}>
            {error}
          </div>
        )}

        {step === "email" ? (
          <form onSubmit={handleSendEmail} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <label style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <span>Email</span>
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "12px",
                borderRadius: "6px",
                background: "#0070f3",
                color: "#fff",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {loading ? "Enviando código..." : "Continuar"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <p style={{ fontSize: "14px", color: "#666" }}>
              Enviamos un código de verificación a <strong>{email}</strong>.
            </p>

            <label style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <span>Código de 5 dígitos</span>
              <input
                type="text"
                placeholder="12345"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc", letterSpacing: "2px" }}
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "12px",
                borderRadius: "6px",
                background: "#00a650",
                color: "#fff",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {loading ? "Verificando..." : "Ingresar"}
            </button>

            <button
              type="button"
              onClick={() => setStep("email")}
              style={{ background: "none", border: "none", color: "#0070f3", cursor: "pointer", textDecoration: "underline" }}
            >
              Cambiar email
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
}