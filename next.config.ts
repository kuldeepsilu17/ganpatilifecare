import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Permanent 308 redirect from legacy Vercel domain to new canonical domain
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "ganpatilifecare.vercel.app",
          },
        ],
        destination: "https://www.ganpatilifecare.com/:path*",
        permanent: true,
      },
      // Permanent 308 redirect from naked apex domain to www canonical domain
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "ganpatilifecare.com",
          },
        ],
        destination: "https://www.ganpatilifecare.com/:path*",
        permanent: true,
      },
      // Legacy product URL canonical mappings
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
      // Category slug aliases
      {
        source: "/categories/uniforms",
        destination: "/categories/hospital-uniforms",
        permanent: true,
      },
      {
        source: "/categories/essentials",
        destination: "/categories/healthcare-essentials",
        permanent: true,
      },
      // Blog aliases
      {
        source: "/blog/what-is-orthocot-cotton-roll",
        destination: "/blog/orthocot-cotton-roll-vs-ordinary-cotton",
        permanent: true,
      },
      {
        source: "/blog/what-are-orthopedic-gauze-bandages",
        destination: "/blog/gamjee-roll-vs-sponge-pads-vs-gauze",
        permanent: true,
      },
      {
        source: "/blog/what-is-a-gamjee-roll",
        destination: "/blog/gamjee-roll-vs-sponge-pads-vs-gauze",
        permanent: true,
      },
      {
        source: "/blog/what-are-surgical-dressing-materials",
        destination: "/blog/gamjee-roll-vs-sponge-pads-vs-gauze",
        permanent: true,
      },
      {
        source: "/blog/what-are-hospital-consumables",
        destination: "/blog/hospital-consumables-checklist-clinic-nursing-home-rajasthan",
        permanent: true,
      },
      {
        source: "/blog/types-of-medical-disposable-products",
        destination: "/blog/hospital-consumables-checklist-clinic-nursing-home-rajasthan",
        permanent: true,
      },
      {
        source: "/blog/hospital-uniform-guide",
        destination: "/blog/how-to-choose-ot-dress-doctor-coat-fabric",
        permanent: true,
      },
      {
        source: "/blog/doctor-coat-and-nurse-uniform-guide",
        destination: "/blog/how-to-choose-ot-dress-doctor-coat-fabric",
        permanent: true,
      },
    ];
  },
  async headers() {
    const isVercelPreview =
      process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production";

    const baseHeaders = [
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
      {
        key: "X-DNS-Prefetch-Control",
        value: "on",
      },
    ];

    if (isVercelPreview) {
      baseHeaders.push({
        key: "X-Robots-Tag",
        value: "noindex, nofollow",
      });
    }

    return [
      {
        source: "/:path*",
        headers: baseHeaders,
      },
    ];
  },
};

export default nextConfig;
