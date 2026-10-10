// pages/profile.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Layout } from "@/components/layout";
import { useAuth } from "@/context/AuthContext";
import { updateMe } from "@/styles/lib/api";

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading, isLoggedIn, refreshUser } = useAuth();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Redirigir si no está logueado
  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.push("/signin");
    }
  }, [authLoading, isLoggedIn, router]);

  // Cargar datos actuales del usuario en el formulario
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setAddress(user.address || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: "", type: "" });

    try {
      await updateMe({ name, address, phone });
      await refreshUser();
      setMessage({ text: "¡Datos actualizados correctamente!", type: "success" });
    } catch (err: any) {
      setMessage({ text: err.message || "Error al actualizar los datos.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || (!isLoggedIn && !user)) {
    return (
      <Layout>
        <div style={{ padding: "60px", textAlign: "center" }}>Cargando perfil...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px" }}>
        <h1>Mi Perfil</h1>
        <p style={{ color: "#666", marginBottom: "20px" }}>Email: <strong>{user?.email}</strong></p>

        {message.text && (
          <div
            style={{
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "16px",
              backgroundColor: message.type === "success" ? "#e8f5e9" : "#ffebee",
              color: message.type === "success" ? "#2e7d32" : "#c62828",
            }}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span>Nombre Completo</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span>Dirección</span>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Calle 123, Ciudad"
              style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span>Teléfono</span>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+54 11 1234 5678"
              style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
            />
          </label>

          <button
            type="submit"
            disabled={saving}
            style={{
              marginTop: "10px",
              padding: "12px",
              borderRadius: "6px",
              background: "#0070f3",
              color: "#fff",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {saving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </form>
      </div>
    </Layout>
  );
}