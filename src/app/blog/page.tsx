import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-shell";
import { getPublishedArticles } from "@/lib/public-data";
import { BLOG_POSTS } from "@/lib/blog";
import { BUSINESS } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/schema";

const title = "Medical Supplies Blog & Knowledge Center | Ganpati Lifecare";
const description =
  "Practical product and procurement information from Ganpati Lifecare in Mandi Goluwala, Rajasthan. Orthopedic supplies, cotton rolls, and hospital consumables.";
const canonicalUrl = `${BUSINESS.siteUrl}/blog`;

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

export default async function BlogPage() {
  const articles = await getPublishedArticles();

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: BUSINESS.siteUrl },
    { name: "Knowledge Center", url: canonicalUrl },
  ]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: canonicalUrl,
    hasPart: (BLOG_POSTS || []).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${BUSINESS.siteUrl}/blog/${post.slug}`,
      description: post.excerpt,
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
        eyebrow="KNOWLEDGE CENTER"
        title="Medical supplies & procurement notes"
        summary="Product and purchasing information for healthcare teams. Content is general supply information, not a substitute for professional clinical guidance."
        breadcrumbs={[{ label: "Knowledge Center" }]}
      />

      <section className="page-content">
        <div className="wrap">
          <div className="article-grid">
            {articles.map((article, index) => (
              <article className="article-card" key={article.slug}>
                <span className="article-number">
                  0{index + 1} / {article.topic} · {article.date}
                </span>
                <h2>
                  <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                </h2>
                <p>{article.excerpt}</p>
                <Link className="product-link" href={`/blog/${article.slug}`}>
                  Read article <ArrowUpRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
