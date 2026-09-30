import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { BLOG_POSTS } from "@/lib/blog";
import { BUSINESS } from "@/lib/constants";
import { LOGO } from "@/lib/brand";
import { getBlogPostingSchema, getBreadcrumbSchema } from "@/lib/schema";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Article Not Found | Ganpati Lifecare" };
  }

  const title = `${post.title} | Ganpati Lifecare Blog`;
  const canonicalUrl = `${BUSINESS.siteUrl}/blog/${post.slug}`;

  return {
    title,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description: post.excerpt,
      url: canonicalUrl,
      type: "article",
      authors: [post.author],
      images: [
        {
          url: `${BUSINESS.siteUrl}${LOGO.og}`,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.excerpt,
      images: [`${BUSINESS.siteUrl}${LOGO.og}`],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const canonicalUrl = `${BUSINESS.siteUrl}/blog/${post.slug}`;
  const schema = getBlogPostingSchema({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    author: post.author,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: BUSINESS.siteUrl },
    { name: "Blog", url: `${BUSINESS.siteUrl}/blog` },
    { name: post.title, url: canonicalUrl },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <main className="min-h-screen bg-background py-12 md:py-20">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          
          <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-semibold text-muted uppercase tracking-wider">
            <Link href="/" className="hover:text-medical transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-medical transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-medical">{post.category}</span>
          </nav>

          <header className="mb-8 sm:mb-12 border-b border-medical/10 pb-6 sm:pb-10">
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-4 sm:mb-6 break-words">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium text-muted">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-medical/10 flex items-center justify-center font-bold text-medical text-xs sm:text-sm">
                  {post.author.charAt(0)}
                </div>
                <span className="text-foreground">{post.author}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-medical">📅</span>
                {post.date}
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-medical">⏱</span>
                {post.readTime}
              </div>
            </div>
          </header>

          <div className="prose prose-base sm:prose-lg prose-medical max-w-none text-foreground/80 leading-relaxed break-words
            prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground
            prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-8 sm:prose-h2:mt-12 prose-h2:mb-4 sm:prose-h2:mb-6 prose-h2:border-b prose-h2:border-medical/10 prose-h2:pb-3 sm:prose-h2:pb-4
            prose-p:mb-4 sm:prose-p:mb-6 prose-li:mb-1.5 sm:prose-li:mb-2 prose-strong:text-foreground"
          >
            {post.content}
          </div>
          
          <div className="mt-16 pt-8 border-t border-medical/10 flex flex-wrap gap-2">
            <span className="text-sm font-bold text-foreground mr-2">Tags:</span>
            {post.tags.map((tag) => (
              <span key={tag} className="inline-block rounded-full bg-muted/20 px-3 py-1 text-xs font-semibold text-muted-foreground">
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-medical/5 p-6 border border-medical/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-base font-bold text-foreground">
                Need wholesale supply for this product?
              </h3>
              <p className="text-xs text-muted">
                Contact Ganpati Lifecare for rapid dispatch across Rajasthan.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-full bg-medical px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-medical-dark transition-all"
            >
              Request Price Quote
            </Link>
          </div>
          
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
