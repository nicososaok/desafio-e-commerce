// components/home-page/index.tsx
import { useRouter } from "next/router";
import {
  HomeContainer,
  HeroBanner,
  SectionTitle,
  ProductsGrid,
  ProductCardWrapper,
} from "./styled";

interface Product {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
}

const FEATURED_WATCHES: Product[] = [
  {
    id: "watch-1",
    title: "Reloj Clásico de Lujo Acero Inoxidable",
    price: 45000,
    thumbnail: "/reloj.svg",
  },
  {
    id: "watch-2",
    title: "Reloj Deportivo Smartwatch Waterproof",
    price: 32000,
    thumbnail: "/reloj.svg",
  },
  {
    id: "watch-3",
    title: "Reloj Minimalista Correa de Cuero",
    price: 28500,
    thumbnail: "/reloj.svg",
  },
  {
    id: "watch-4",
    title: "Reloj Cronógrafo Edición Especial",
    price: 59000,
    thumbnail: "/reloj.svg",
  },
];

export function HomePage() {
  const router = useRouter();

  const handleProductClick = (id: string) => {
    router.push(`/item/${id}`);
  };

  return (
    <HomeContainer>
      <HeroBanner>
        <span className="bg-mp-yellow text-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
          Destacados
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          El mejor e-commerce
        </h1>
        <p className="text-gray-300 text-sm md:text-base max-w-xl">
          Descubrí nuestra selección exclusiva de relojes con la mejor tecnología, diseño y financiación a través de Mercado Pago.
        </p>
      </HeroBanner>

      <SectionTitle>Relojes Destacados</SectionTitle>

      <ProductsGrid>
        {FEATURED_WATCHES.map((product) => (
          <ProductCardWrapper
            key={product.id}
            onClick={() => handleProductClick(product.id)}
          >
            <div>
              <div className="w-full h-48 bg-gray-50 dark:bg-neutral-800 rounded-lg overflow-hidden mb-4 flex items-center justify-center p-2">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-medium text-sm md:text-base text-foreground line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                {product.title}
              </h3>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-xl font-bold text-foreground">
                ${product.price.toLocaleString()}
              </span>
              <span className="text-xs text-mp-green font-semibold bg-green-50 dark:bg-green-950/30 px-2 py-1 rounded">
                Envío gratis
              </span>
            </div>
          </ProductCardWrapper>
        ))}
      </ProductsGrid>
    </HomeContainer>
  );
}