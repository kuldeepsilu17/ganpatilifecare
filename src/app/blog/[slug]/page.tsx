import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-shell";
import { business, articles } from "@/lib/site-data";
import { BLOG_POSTS } from "@/lib/blog";
import { BUSINESS } from "@/lib/constants";
import { getBlogPostingSchema, getBreadcrumbSchema, getFaqSchema } from "@/lib/schema";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const slugs = new Set([
    ...articles.map((a) => a.slug),
    ...BLOG_POSTS.map((p) => p.slug),
  ]);
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!article && !post) {
    return { title: "Article Not Found | Ganpati Lifecare" };
  }

  const title = post?.title || article?.title || "";
  const excerpt = post?.excerpt || article?.excerpt || "";
  const canonicalUrl = `${BUSINESS.siteUrl}/blog/${slug}`;

  return {
    title: {
      absolute: `${title} | Ganpati Lifecare`,
    },
    description: excerpt,
    authors: [{ name: business.manager }],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description: excerpt,
      url: canonicalUrl,
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!article && !post) notFound();

  const title = post?.title || article?.title || "";
  const excerpt = post?.excerpt || article?.excerpt || "";
  const topic = post?.category || article?.topic || "Medical Supplies";
  const date = post?.date || article?.date || "2026";
  const canonicalUrl = `${BUSINESS.siteUrl}/blog/${slug}`;

  const schema = getBlogPostingSchema({
    slug,
    title,
    excerpt,
    date,
    author: post?.author || business.manager,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: BUSINESS.siteUrl },
    { name: "Knowledge Center", url: `${BUSINESS.siteUrl}/blog` },
    { name: title, url: canonicalUrl },
  ]);

  const faqSchema = post?.faqs ? getFaqSchema(post.faqs) : null;

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
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
        eyebrow={`${topic.toUpperCase()} · ${date}`}
        title={title}
        summary={excerpt}
        breadcrumbs={[
          { label: "Knowledge Center", href: "/blog" },
          { label: title },
        ]}
      />

      <article className="page-content">
        <div className="wrap prose">
          <p>
            <strong>Article overview:</strong> {excerpt}
          </p>

          {/* Render content */}
          {post?.content ? (
            <div className="article-body">
              <p>{post.content}</p>
            </div>
          ) : article?.body && article.body.length > 0 ? (
            article.body.map((paragraph, index) => (
              <section key={index}>
                <h2>
                  {index === 0
                    ? "Understanding the product"
                    : index === 1
                    ? "What to confirm before ordering"
                    : "Wholesale inquiries"}
                </h2>
                <p>{paragraph}</p>
              </section>
            ))
          ) : (
            <p>{excerpt}</p>
          )}

          <p>
            Written by {business.manager} at Ganpati Lifecare, Mandi Goluwala,
            Hanumangarh, Rajasthan.
          </p>
          <p>
            For product-specific details, contact the business directly. Product selection
            and clinical use should be determined by qualified healthcare professionals.
          </p>
          <p>
            <Link className="text-link" href="/contact">
              Contact Ganpati Lifecare &rarr;
            </Link>
          </p>
        </div>
      </article>
    </main>
  );
}
