import { useRouter } from "next/router";

export default function ResultsPage() {
  const router = useRouter();
  const { q } = router.query;

  return (
    <div className="max-w-4xl mx-auto my-10 p-5 text-white">
      <h1 className="text-2xl font-bold mb-6">Resultados de búsqueda</h1>
      {q && <p className="text-gray-400 mb-4">Buscando: {q}</p>}
      <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl text-center text-gray-300">
        Pronto verás los productos aquí.
      </div>
    </div>
  );
}