import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Ignora errores de TypeScript en la compilación de producción para Vercel
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignora warnings/errores de ESLint durante el build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;