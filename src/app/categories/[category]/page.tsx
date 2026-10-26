import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-shell";
import { ProductCatalog } from "@/components/product-catalog";
import { CATEGORIES_DATA, getCategoryBySlug } from "@/lib/categories";
import { getPublishedProducts } from "@/lib/public-data";
import { SITE_URL } from "@/lib/site";
import { getBreadcrumbSchema, getFaqSchema } from "@/lib/schema";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES_DATA.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found | Ganpati Lifecare",
    };
  }

  const canonicalUrl = `${SITE_URL}/categories/${category.slug}`;

  return {
    title: {
      absolute: category.metaTitle,
    },
    description: category.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: category.metaTitle,
      description: category.metaDescription,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: `${SITE_URL}/og-brand.png`,
          width: 1200,
          height: 630,
          alt: `${category.name} - Ganpati Lifecare`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: category.metaTitle,
      description: category.metaDescription,
      images: [`${SITE_URL}/og-brand.png`],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getPublishedProducts();
  const canonicalUrl = `${SITE_URL}/categories/${category.slug}`;

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Categories", url: `${SITE_URL}/products` },
    { name: category.name, url: canonicalUrl },
  ]);

  const faqSchema =
    category.faqs && category.faqs.length > 0 ? getFaqSchema(category.faqs) : null;

  // Map category slug to ProductCatalog category filter name
  const categoryNameMap: Record<string, "Orthopedic" | "Surgical" | "Hospital Uniforms" | "Healthcare Essentials"> = {
    orthopedic: "Orthopedic",
    surgical: "Surgical",
    uniforms: "Hospital Uniforms",
    "hospital-uniforms": "Hospital Uniforms",
    essentials: "Healthcare Essentials",
    "healthcare-essentials": "Healthcare Essentials",
  };
  const catalogCategory = categoryNameMap[category.slug] ?? "All Products";

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
        eyebrow="PRODUCT CATEGORY"
        title={`${category.name} supplies`}
        summary={category.quickAnswer || category.description}
        breadcrumbs={[
          { label: "Products", href: "/products" },
          { label: category.name },
        ]}
      />

      <section className="page-content">
        <div className="wrap">
          <ProductCatalog initialCategory={catalogCategory} products={products} />
        </div>
      </section>
    </main>
  );
}
