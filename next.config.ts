import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Ignora errores de TypeScript en la compilación de producción para Vercel
    ignoreBuildErrors: true,
  },
  eslint: {
<<<<<<< HEAD
=======
    // Ignora warnings/errores de ESLint durante el build
>>>>>>> c57db65 (Fix layout, api path imports and duplicated default export)
    ignoreDuringBuilds: true,
  },
};

<<<<<<< HEAD
export default nextConfig;
=======
export default nextConfig;
>>>>>>> c57db65 (Fix layout, api path imports and duplicated default export)
