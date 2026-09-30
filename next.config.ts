import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
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
