import type { Metadata } from "next";
import { PageHero } from "@/components/page-shell";
import { ProductCatalog } from "@/components/product-catalog";
import { getPublishedProducts } from "@/lib/public-data";
import { BUSINESS } from "@/lib/constants";
import { PRODUCTS } from "@/lib/data";
import { getBreadcrumbSchema } from "@/lib/schema";

const title = "Medical, Surgical & Orthopedic Products | Ganpati Lifecare";
const description =
  "Explore Orthocot cotton rolls, stockinet, traction kits, surgical gauze, Gamjee rolls, doctor coats & hospital consumables from Ganpati Lifecare, Rajasthan.";
const canonicalUrl = `${BUSINESS.siteUrl}/products`;

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
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

export default async function ProductsPage() {
  const products = await getPublishedProducts();

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
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <PageHero
        eyebrow="OUR PRODUCTS"
        title="Medical, surgical & orthopedic products"
        summary="Browse the Ganpati Lifecare catalog. Contact us to confirm current product specifications, packaging, availability and wholesale pricing."
        breadcrumbs={[{ label: "Products" }]}
      />

      <section className="page-content">
        <div className="wrap">
          <ProductCatalog products={products} />
        </div>
      </section>
    </main>
  );
}
