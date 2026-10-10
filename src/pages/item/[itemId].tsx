import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getProductById } from "@/lib/api";

export default function ItemDetailPage() {
  const router = useRouter();
  const { itemId } = router.query;
  const [product, setProduct] = useState<any>(null);
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

  if (loading) return <div className="p-10 text-center">Cargando detalle...</div>;
  if (error || !product) return <div className="p-10 text-center text-red-500">{error || "Producto no encontrado"}</div>;

  return (
    <div className="max-w-4xl mx-auto my-10 p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full rounded-lg border border-neutral-800"
        />
        <div>
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <p className="text-3xl font-bold text-green-600 mb-4">
            ${product.price?.toLocaleString()}
          </p>
          {product.description && (
            <p className="text-gray-400 mb-6">{product.description}</p>
          )}
          <button
            onClick={handleBuy}
            className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-lg transition-colors cursor-pointer"
          >
            Comprar Ahora
          </button>
        </div>
      </div>
    </div>
  );
}