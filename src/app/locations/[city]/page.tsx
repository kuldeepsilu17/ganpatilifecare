import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactActions, PageHero } from "@/components/page-shell";
import { locations, products } from "@/lib/site-data";
import { LOCATIONS } from "@/lib/locations";
import { BUSINESS } from "@/lib/constants";
import { getBreadcrumbSchema, getFaqSchema } from "@/lib/schema";

interface LocationPageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return LOCATIONS.map((loc) => ({
    city: loc.slug,
  }));
}

export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const { city } = await params;
  const location =
    locations.find((item) => item.slug === city) ||
    LOCATIONS.find((loc) => loc.slug === city);

  if (!location) {
    return { title: "Location Not Found | Ganpati Lifecare" };
  }

  const name = "name" in location ? location.name : location.city;
  const description = location.description;
  const canonicalUrl = `${BUSINESS.siteUrl}/locations/${location.slug}`;

  return {
    title: {
      absolute: `Medical Supplies in ${name} | Ganpati Lifecare`,
    },
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Medical Supplies in ${name} | Ganpati Lifecare`,
      description,
      url: canonicalUrl,
      type: "website",
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { city } = await params;
  const location = locations.find((item) => item.slug === city);
  const richLocation = LOCATIONS.find((loc) => loc.slug === city);

  if (!location && !richLocation) {
    notFound();
  }

  const locationName = location?.name || richLocation?.city || "";
  const locationDescription = location?.description || richLocation?.description || "";
  const locationProducts =
    location?.products || richLocation?.keyProducts || ["Orthocot Cotton Roll", "Gamjee Roll"];

  const related = products
    .filter((product) =>
      locationProducts.some((name) =>
        name.toLowerCase().includes(product.name.split(" ")[0].toLowerCase())
      )
    )
    .slice(0, 4);

  const canonicalUrl = `${BUSINESS.siteUrl}/locations/${city}`;

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: BUSINESS.siteUrl },
    { name: "Locations", url: `${BUSINESS.siteUrl}/locations` },
    { name: locationName, url: canonicalUrl },
  ]);

  const faqSchema =
    richLocation?.faqs && richLocation.faqs.length > 0
      ? getFaqSchema(richLocation.faqs)
      : null;

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <PageHero
        eyebrow="REGIONAL SERVICE AREA"
        title={`Medical supplies in ${locationName}`}
        summary={locationDescription}
        breadcrumbs={[
          { label: "Locations", href: "/locations" },
          { label: locationName },
        ]}
      />

      <section className="page-content">
        <div className="wrap prose">
          <h2>Wholesale supply inquiries for {locationName}</h2>
          <p>
            Ganpati Lifecare operates from Main Road, Mandi Goluwala, Hanumangarh.
            Healthcare facilities in {locationName} can contact the business to discuss
            catalog items, product details, wholesale quantities and freight
            arrangements. Delivery coverage and timing should be confirmed for each order.
          </p>

          <h2>Catalog examples</h2>
          <p>{locationProducts.join(" · ")}</p>

          <ContactActions label={`medical supplies for ${locationName}`} />

          {related.length > 0 && (
            <section>
              <h2>Browse relevant products</h2>
              <div className="related-grid">
                {related.map((product) => (
                  <article className="content-card" key={product.slug}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <Link className="text-link" href={`/products/${product.slug}`}>
                      Product details &rarr;
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}
