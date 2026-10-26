import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-shell";
import { brands } from "@/lib/site-data";
import { BUSINESS } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/schema";

const title = "Featured Healthcare Brands | Ganpati Lifecare Hanumangarh";
const description =
  "Explore White Rose Brand, Orthocot, Ortho Active & Lap-Pad medical supplies by Ganpati Lifecare in Mandi Goluwala, Hanumangarh, Rajasthan (PIN 335802).";
const canonicalUrl = `${BUSINESS.siteUrl}/brands`;

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: { canonical: canonicalUrl },
  openGraph: { title, description, url: canonicalUrl, type: "website" },
};

export default function BrandsPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: BUSINESS.siteUrl },
    { name: "Brands", url: canonicalUrl },
  ]);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        eyebrow="PRODUCT BRANDS"
        title="Medical & surgical product brands"
        summary="Explore the product brands shown in Ganpati Lifecare's catalog. Product lines and availability should be confirmed with the business."
        breadcrumbs={[{ label: "Brands" }]}
      />

      <section className="page-content">
        <div className="wrap content-cards">
          {brands.map((brand) => (
            <article className="content-card" key={brand.slug}>
              <span className="pill-label">GANPATI LIFECARE CATALOG</span>
              <h2>{brand.name}</h2>
              <p>{brand.description}</p>
              <Link className="text-link" href={`/brands/${brand.slug}`}>
                Brand overview &rarr;
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
