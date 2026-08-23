import type { Metadata } from "next";
import { Poppins, Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { BUSINESS, SEO_KEYWORDS } from "@/lib/constants";
import { LOGO } from "@/lib/brand";
import {
  getLocalBusinessSchema,
  getOrganizationSchema,
  getWebSiteSchema,
} from "@/lib/schema";

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
  title: {
    default: "Ganpati Lifecare | Orthopedic, Surgical & Hospital Supplies",
    template: "%s | Ganpati Lifecare",
  },
  description:
    "Ganpati Lifecare is a healthcare supplies company in Goluwala, Hanumangarh, Rajasthan, supplying orthopedic, surgical, hospital consumables and healthcare uniforms.",
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: BUSINESS.name }, { name: BUSINESS.owner }],
  icons: {
    icon: "/favicon-96x96.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Ganpati Lifecare | Orthopedic, Surgical & Hospital Supplies",
    description:
      "Orthopedic, surgical and hospital supplies from Ganpati Lifecare, Goluwala, Hanumangarh, Rajasthan.",
    url: BUSINESS.siteUrl,
    siteName: "Ganpati Lifecare",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: LOGO.og,
        width: 512,
        height: 512,
        alt: "Ganpati Lifecare - Orthopedic & Surgical Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ganpati Lifecare | Orthopedic, Surgical & Hospital Supplies",
    description:
      "Orthopedic, surgical and hospital supplies from Ganpati Lifecare, Goluwala, Hanumangarh, Rajasthan.",
    images: [LOGO.og],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const schemas = [
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getWebSiteSchema(),
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
