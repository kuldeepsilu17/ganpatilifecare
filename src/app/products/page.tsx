import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Products } from "@/components/sections/Products";
import { RequestQuote } from "@/components/sections/RequestQuote";
import { BUSINESS } from "@/lib/constants";
import { PRODUCTS } from "@/lib/data";
import { getBreadcrumbSchema } from "@/lib/schema";

const title = "Medical & Surgical Products Catalog | Ganpati Lifecare";
const description =
  "Browse the orthopedic, surgical, hospital uniform, and healthcare consumables catalog from Ganpati Lifecare in Goluwala, Hanumangarh, Rajasthan. Request direct wholesale quotations.";
const canonicalUrl = `${BUSINESS.siteUrl}/products`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title,
    description,
    url: canonicalUrl,
    type: "website",
  },
};

export default function ProductsCatalogPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: BUSINESS.siteUrl },
    { name: "Products", url: canonicalUrl },
  ]);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Medical & Surgical Products",
    description,
    url: canonicalUrl,
    numberOfItems: PRODUCTS.length,
    itemListElement: PRODUCTS.map((product, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: product.name,
      url: `${BUSINESS.siteUrl}/products/${product.id}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Navbar />
      <main className="min-h-screen py-6">
        <Products />
        <RequestQuote />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
