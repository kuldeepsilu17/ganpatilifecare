import type { Metadata } from "next";
import { Poppins, Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { BUSINESS, SEO_KEYWORDS } from "@/lib/constants";
import { LOGO } from "@/lib/brand";
import {
  getFaqSchema,
  getLocalBusinessSchema,
  getOrganizationSchema,
} from "@/lib/schema";
import { FAQS } from "@/lib/data";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.siteUrl),
  title: "Ganpati Lifecare | Medical & Hospital Supply Distributor in Rajasthan",
  description:
    "Ganpati Lifecare provides premium orthopedic, surgical, hospital uniforms, cotton rolls, bandages, and healthcare products in Rajasthan. Trusted medical supplier in Hanumangarh.",
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: BUSINESS.name }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Ganpati Lifecare | GLC Medical & Hospital Supply",
    description:
      "Premium orthopedic, surgical, and hospital products in Goluwala, Hanumangarh, Rajasthan.",
    url: BUSINESS.siteUrl,
    siteName: BUSINESS.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: LOGO.og,
        width: 512,
        height: 512,
        alt: LOGO.alt.brand,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ganpati Lifecare | GLC Medical Products",
    description:
      "Trusted medical supplier in Rajasthan — orthopedic, surgical & hospital uniforms.",
    images: [LOGO.og],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: BUSINESS.siteUrl },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const schemas = [
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getFaqSchema(FAQS),
  ];

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${montserrat.variable} ${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="min-h-screen font-body antialiased">{children}</body>
    </html>
  );
}
