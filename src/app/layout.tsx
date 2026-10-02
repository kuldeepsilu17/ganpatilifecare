import type { Metadata, Viewport } from "next";
import { Poppins, Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { BUSINESS } from "@/lib/constants";
import { SITE_URL } from "@/lib/site";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ganpati Lifecare | Orthopedic, Surgical & Hospital Supplies",
    template: "%s | Ganpati Lifecare",
  },
  description:
    "Ganpati Lifecare, owned and operated by Dharampal Verma in Goluwala, Hanumangarh, Rajasthan, supplies orthopedic, surgical and hospital products including surgical cotton roll and dressing products.",
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
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon-192x192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "Ganpati Lifecare",
    locale: "en_IN",
    url: "/",
    title: "Ganpati Lifecare | Orthopedic, Surgical & Hospital Supplies",
    description:
      "Ganpati Lifecare, owned and operated by Dharampal Verma in Goluwala, Hanumangarh, Rajasthan, supplies orthopedic, surgical and hospital products including surgical cotton roll and dressing products.",
    images: [
      {
        url: LOGO.og,
        width: 1200,
        height: 630,
        alt: "Ganpati Lifecare - Orthopedic, Surgical & Hospital Supplies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ganpati Lifecare | Orthopedic, Surgical & Hospital Supplies",
    description:
      "Ganpati Lifecare, owned and operated by Dharampal Verma in Goluwala, Hanumangarh, Rajasthan, supplies orthopedic, surgical and hospital products including surgical cotton roll and dressing products.",
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
