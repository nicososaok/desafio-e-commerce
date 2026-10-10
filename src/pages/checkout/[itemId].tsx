// pages/checkout/[itemId].tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Layout } from "@/components/layout";
import { useAuth } from "@/context/AuthContext";
import { getProductById, createOrder } from "@/styles/lib/api";

interface Product {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { itemId } = router.query;
  const { user, loading: authLoading, isLoggedIn } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [processingOrder, setProcessingOrder] = useState(false);
  const [error, setError] = useState("");

  // Guard: Redirigir a /signin si el usuario no tiene sesión iniciada
  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.push(`/signin?redirectTo=/checkout/${itemId}`);
    }
  }, [authLoading, isLoggedIn, itemId, router]);

  // Cargar información del producto
  useEffect(() => {
    if (!itemId || typeof itemId !== "string") return;

    getProductById(itemId)
      .then((data) => setProduct(data))
      .catch((err) => setError("Error al obtener la información del producto."))
      .finally(() => setLoadingProduct(false));
  }, [itemId]);

  const handlePayment = async () => {
    if (!itemId || typeof itemId !== "string") return;

    setProcessingOrder(true);
    setError("");

    try {
      // 1. Crear la orden en el backend
      const res = await createOrder(itemId);

      // 2. Obtener URL de Mercado Pago (init_point o sandbox_init_point)
      const redirectUrl = res.init_point || res.sandbox_init_point || res.url;

      if (redirectUrl) {
        // 3. Redirigir al cliente fuera de la app
        window.location.href = redirectUrl;
      } else {
        throw new Error("No se recibió la URL de redirección de Mercado Pago.");
      }
    } catch (err: any) {
      console.error("Error al procesar la compra:", err);
      setError(err.message || "No se pudo iniciar el proceso de pago.");
      setProcessingOrder(false);
    }
  };

  if (authLoading || loadingProduct) {
    return (
      <Layout>
        <div style={{ padding: "60px", textAlign: "center" }}>Cargando resumen de compra...</div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div style={{ padding: "60px", textAlign: "center", color: "red" }}>
          {error || "Producto no encontrado."}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
        <h1 style={{ marginBottom: "20px" }}>Confirmar Compra</h1>

        {/* Resumen de Producto */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            padding: "20px",
            border: "1px solid #eee",
            borderRadius: "8px",
            background: "#fff",
            marginBottom: "24px",
          }}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "6px" }}
          />
          <div>
            <h2 style={{ fontSize: "18px", margin: "0 0 8px 0" }}>{product.title}</h2>
            <p style={{ fontSize: "20px", fontWeight: "bold", color: "#2e7d32", margin: 0 }}>
              ${product.price?.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Datos del Comprador */}
        <div
          style={{
            padding: "20px",
            border: "1px solid #eee",
            borderRadius: "8px",
            background: "#fafafa",
            marginBottom: "24px",
          }}
        >
          <h3 style={{ marginTop: 0, fontSize: "16px" }}>Datos del Comprador</h3>
          <p style={{ margin: "4px 0", color: "#555" }}>Email: <strong>{user?.email}</strong></p>
          {user?.address && <p style={{ margin: "4px 0", color: "#555" }}>Dirección: {user.address}</p>}
        </div>

        {/* Botón de Pago */}
        <button
          onClick={handlePayment}
          disabled={processingOrder}
          style={{
            width: "100%",
            padding: "16px",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#fff",
            backgroundColor: processingOrder ? "#ccc" : "#009ee3", // Azul Mercado Pago
            border: "none",
            borderRadius: "8px",
            cursor: processingOrder ? "not-allowed" : "pointer",
          }}
        >
          {processingOrder ? "Generando link de pago..." : "Pagar con Mercado Pago"}
        </button>
      </div>
    </Layout>
  );
}