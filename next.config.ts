import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    qualities: [60, 75, 90],
    formats: ["image/avif", "image/webp"],
  },
  compress: true,
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  // Silence the "multiple lockfiles" workspace root warning
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
