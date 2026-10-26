import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactActions, PageHero } from "@/components/page-shell";
import { brands, products } from "@/lib/site-data";
import { BRANDS_DATA } from "@/lib/brands-data";
import { BUSINESS } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return brands.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = brands.find((item) => item.slug === slug);
  const richBrand = BRANDS_DATA.find((b) => b.slug === slug);

  if (!brand && !richBrand) return {};

  const name = richBrand?.brandName || brand?.name || "";
  const description = richBrand?.metaDescription || brand?.description || "";
  const canonicalUrl = `${BUSINESS.siteUrl}/brands/${slug}`;

  return {
    title: richBrand?.metaTitle || `${name} Products | Ganpati Lifecare`,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: richBrand?.metaTitle || `${name} Products | Ganpati Lifecare`,
      description,
      url: canonicalUrl,
      type: "website",
    },
  };
}

export default async function BrandDetailPage({ params }: Props) {
  const { slug } = await params;
  const brand = brands.find((item) => item.slug === slug);
  const richBrand = BRANDS_DATA.find((b) => b.slug === slug);

  if (!brand && !richBrand) notFound();

  const brandName = richBrand?.brandName || brand?.name || "";
  const brandDescription = richBrand?.tldr || brand?.description || "";
  const brandSlugs = brand?.productSlugs ?? [];
  const brandProducts = products.filter((product) =>
    brandSlugs.includes(product.slug)
  );

  const canonicalUrl = `${BUSINESS.siteUrl}/brands/${slug}`;

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: BUSINESS.siteUrl },
    { name: "Brands", url: `${BUSINESS.siteUrl}/brands` },
    { name: brandName, url: canonicalUrl },
  ]);

  const brandSchema = {
    "@context": "https://schema.org",
    "@type": "Brand",
    "@id": `${canonicalUrl}#brand`,
    name: brandName,
    description: brandDescription,
    url: canonicalUrl,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandSchema) }}
      />

      <PageHero
        eyebrow="GANPATI LIFECARE BRANDS"
        title={`${brandName} products`}
        summary={brandDescription}
        breadcrumbs={[
          { label: "Brands", href: "/brands" },
          { label: brandName },
        ]}
      />

      <section className="page-content">
        <div className="wrap">
          <p className="prose">
            The products below are listed in the Ganpati Lifecare catalog under this
            brand. Confirm current product information and wholesale availability
            directly with the business.
          </p>
          <div className="content-cards">
            {brandProducts.map((product) => (
              <article className="content-card" key={product.slug}>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <Link className="text-link" href={`/products/${product.slug}`}>
                  Product details &rarr;
                </Link>
              </article>
            ))}
          </div>
          <div className="inline-quote">
            <h2>Ask about {brandName}</h2>
            <p>Contact Ganpati Lifecare for brand and wholesale inquiries.</p>
            <ContactActions label={`${brandName} products`} />
          </div>
        </div>
      </section>
    </main>
  );
}
