import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Products } from "@/components/sections/Products";
import { RequestQuote } from "@/components/sections/RequestQuote";
import { BUSINESS } from "@/lib/constants";
import { PRODUCTS } from "@/lib/data";
import { getBreadcrumbSchema } from "@/lib/schema";

const title = "Orthopedic, Surgical & Hospital Products – Wholesale Supplier | Ganpati Lifecare";
const description =
  "Explore high-grade Orthocot cotton rolls, tubular stockinets, skin traction kits, surgical gauze, Gamjee rolls, doctor coats, and hospital consumables from Ganpati Lifecare, Rajasthan.";
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

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonicalUrl}#collection`,
    name: "Our Medical, Surgical & Orthopedic Products",
    description,
    url: canonicalUrl,
    mainEntity: {
      "@type": "ItemList",
      name: "Medical & Surgical Products Catalog",
      description,
      url: canonicalUrl,
      numberOfItems: PRODUCTS.length,
      itemListElement: PRODUCTS.map((product, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: product.name,
        url: `${BUSINESS.siteUrl}/products/${product.id}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Navbar />
      <main className="min-h-screen pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6 mb-8">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs sm:text-sm text-muted">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="hover:text-medical">Home</Link>
              </li>
              <li>/</li>
              <li className="text-foreground font-medium">Products</li>
            </ol>
          </nav>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Our Medical, Surgical &amp; Orthopedic Products
          </h1>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-muted md:text-lg">
            Ganpati Lifecare is a premier wholesale supplier of orthopedic products, surgical dressing materials, healthcare uniforms, and clinical consumables based in Goluwala, Hanumangarh, Rajasthan. Owned and operated by Dharampal Verma, we supply government and private hospitals, nursing homes, trauma clinics, and surgical centers across North Rajasthan, including Hanumangarh, Sri Ganganagar, Suratgarh, and Bikaner. Every product in our catalog—from 100% pure Orthocot cotton rolls and tubular stockinets to sterilized sponge pads and tailor-fit doctor coats—meets strict institutional healthcare benchmarks. Explore our specialized categories below, view detailed technical specifications, and request immediate bulk wholesale quotations for your healthcare facility.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs sm:text-sm">
            <span className="font-semibold text-foreground mr-1 self-center">Browse Categories:</span>
            <Link href="/categories/orthopedic" className="rounded-full bg-medical/10 px-3 py-1 text-medical hover:bg-medical hover:text-white transition">
              Orthopedic Supplies
            </Link>
            <Link href="/categories/surgical" className="rounded-full bg-medical/10 px-3 py-1 text-medical hover:bg-medical hover:text-white transition">
              Surgical Supplies
            </Link>
            <Link href="/categories/hospital-uniforms" className="rounded-full bg-medical/10 px-3 py-1 text-medical hover:bg-medical hover:text-white transition">
              Hospital Uniforms
            </Link>
            <Link href="/categories/healthcare-essentials" className="rounded-full bg-medical/10 px-3 py-1 text-medical hover:bg-medical hover:text-white transition">
              Healthcare Essentials
            </Link>
          </div>
        </div>
        <Products />
        <RequestQuote />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
