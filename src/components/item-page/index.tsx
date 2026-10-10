// components/item-page/index.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProductById } from "@/styles/lib/api";
import {
  ItemDetailLayout,
  ImageContainer,
  ItemInfoContainer,
  PriceTag,
  BuyButton,
} from "./styled";

interface Product {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  description?: string;
}

export function ItemPage() {
  const router = useRouter();
  const { itemId } = router.query;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!itemId || typeof itemId !== "string") return;

    getProductById(itemId)
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error obteniendo producto:", err))
      .finally(() => setLoading(false));
  }, [itemId]);

  const handleBuy = () => {
    if (itemId) {
      router.push(`/checkout/${itemId}`);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center text-gray-500">
        Cargando detalle del producto...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center text-red-500">
        No se encontró el producto solicitado.
      </div>
    );
  }

  return (
    <ItemDetailLayout>
      <ImageContainer src={product.thumbnail} title={product.title} />

      <ItemInfoContainer>
        <h1 className="text-2xl md:text-3xl font-bold leading-tight">
          {product.title}
        </h1>

        <PriceTag amount={product.price} />

        {product.description && (
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
            {product.description}
          </p>
        )}

        <div className="mt-4">
          <BuyButton onClick={handleBuy}>Comprar Ahora</BuyButton>
        </div>
      </ItemInfoContainer>
    </ItemDetailLayout>
  );
}