import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-shell";
import { locations } from "@/lib/site-data";
import { LOCATIONS } from "@/lib/locations";
import { BUSINESS } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/schema";

const title = "Medical Supply Service Locations | Ganpati Lifecare";
const description =
  "Locations listed by Ganpati Lifecare for wholesale medical supply inquiries across North Rajasthan: Hanumangarh, Sri Ganganagar, Suratgarh, Bikaner and more.";
const canonicalUrl = `${BUSINESS.siteUrl}/locations`;

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

export default function LocationsPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: BUSINESS.siteUrl },
    { name: "Locations", url: canonicalUrl },
  ]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: canonicalUrl,
    hasPart: LOCATIONS.map((loc) => ({
      "@type": "WebPage",
      name: `Medical Supplies in ${loc.city}`,
      url: `${BUSINESS.siteUrl}/locations/${loc.slug}`,
    })),
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
        eyebrow="LOCAL DISTRIBUTION NETWORK"
        title="Medical & hospital supply locations"
        summary="Based in Mandi Goluwala, Ganpati Lifecare coordinates product and wholesale inquiries for healthcare facilities across North Rajasthan. Contact us to confirm delivery availability."
        breadcrumbs={[{ label: "Locations" }]}
      />

      <section className="page-content">
        <div className="wrap">
          <div className="content-cards">
            {locations.map((location) => (
              <article className="content-card" key={location.slug}>
                <span className="pill-label">
                  {location.slug === "goluwala" ? "Business base" : "Rajasthan, India"}
                </span>
                <h2>{location.name}</h2>
                <p>{location.description}</p>
                <p>
                  <strong>Catalog examples:</strong> {location.products.join(", ")}
                </p>
                <Link className="text-link" href={`/locations/${location.slug}`}>
                  View location details <ArrowUpRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
