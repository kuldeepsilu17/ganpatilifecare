import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/products/orthopedic-gauze",
        destination: "/products/orthopedic-gauze-bandages",
        permanent: true,
      },
      {
        source: "/products/surgical-dressing",
        destination: "/products/surgical-dressing-materials",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
