import type { Metadata, Viewport } from "next";
import { Poppins, Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { BUSINESS } from "@/lib/constants";
import { LOGO } from "@/lib/brand";
import { getRootGraphSchema } from "@/lib/schema";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#009245",
};

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.siteUrl),
  title: {
    default: "Ganpati Lifecare | Orthopedic, Surgical & Hospital Supplies",
    template: "%s | Ganpati Lifecare",
  },
  description:
    "Ganpati Lifecare, owned by Dharampal Verma in Goluwala, Hanumangarh, Rajasthan, supplies orthopedic products, surgical dressings, hospital uniforms, and medical consumables.",
  authors: [{ name: BUSINESS.name }, { name: BUSINESS.owner }],
  creator: BUSINESS.owner,
  publisher: BUSINESS.name,
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
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
        width: 1200,
        height: 630,
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const rootSchema = getRootGraphSchema();

  return (
    <html
      lang="en-IN"
      className={`${poppins.variable} ${montserrat.variable} ${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootSchema) }}
        />
      </head>
      <body className="min-h-screen font-body antialiased">{children}</body>
    </html>
  );
}
