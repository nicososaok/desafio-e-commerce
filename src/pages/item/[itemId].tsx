// pages/item/[itemId].tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProductById } from "@/lib/api";
import { Layout } from "@/components/layout";
import { ItemPage } from "@/components/item-page";

export default function Item() {
  return (
    <Layout>
      <ItemPage />
    </Layout>
  );
}

interface ProductDetail {
  id: string;
  title: string;
  price: number;
  description?: string;
  thumbnail: string;
}

export default function ItemDetailPage() {
  const router = useRouter();
  const { itemId } = router.query;

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!itemId || typeof itemId !== "string") return;

    getProductById(itemId)
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message || "Error al cargar el producto"))
      .finally(() => setLoading(false));
  }, [itemId]);

  const handleBuy = () => {
    if (product) {
      router.push(`/checkout/${product.id}`);
    }
  };

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Cargando detalle del producto...</div>;
  if (error || !product) return <div style={{ padding: "40px", textAlign: "center", color: "red" }}>{error || "Producto no encontrado"}</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start" }}>
        {/* Imagen del Producto */}
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{ width: "100%", borderRadius: "8px", border: "1px solid #eee" }}
        />

        {/* Informacion y Boton de Compra */}
        <div>
          <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>{product.title}</h1>
          <p style={{ fontSize: "28px", fontWeight: "bold", color: "#2e7d32", marginBottom: "24px" }}>
            ${product.price?.toLocaleString()}
          </p>

          {product.description && (
            <p style={{ color: "#555", lineHeight: "1.6", marginBottom: "30px" }}>
              {product.description}
            </p>
          )}

          <button
            onClick={handleBuy}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#fff",
              backgroundColor: "#00a650", // Color verde Mercado Pago
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Comprar Ahora
          </button>
        </div>
      </div>
    </div>
  );
}