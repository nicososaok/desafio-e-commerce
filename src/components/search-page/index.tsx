// components/search-page/index.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { searchProducts } from "@/styles/lib/api";
import { SearchContainer, SearchTitle, SearchGrid, EmptyState } from "./styled";

interface Product {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
}

export function SearchPage() {
  const router = useRouter();
  const q = (router.query.q as string) || "";
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!q) return;

    setLoading(true);
    searchProducts(q)
      .then((data) => {
        setResults(Array.isArray(data) ? data : data.results || []);
      })
      .catch((err) => console.error("Error al buscar productos:", err))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <SearchContainer>
      <SearchTitle query={q} count={results.length} />

      {loading ? (
        <div className="py-12 text-center text-gray-500">Buscando productos...</div>
      ) : results.length === 0 ? (
        <EmptyState query={q} />
      ) : (
        <SearchGrid>
          {results.map((item) => (
            <Link
              key={item.id}
              href={`/item/${item.id}`}
              className="group border border-gray-200 dark:border-gray-800 rounded-xl p-4 bg-white dark:bg-neutral-900 flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform"
                />
                <h3 className="font-semibold text-base line-clamp-2 mb-2">
                  {item.title}
                </h3>
              </div>
              <p className="text-xl font-bold text-mp-green">
                ${item.price?.toLocaleString()}
              </p>
            </Link>
          ))}
        </SearchGrid>
      )}
    </SearchContainer>
  );
}