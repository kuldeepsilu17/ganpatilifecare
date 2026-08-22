import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { BLOG_POSTS } from "@/lib/blog";
import { BUSINESS } from "@/lib/constants";
import { LOGO } from "@/lib/brand";

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
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // BlogPosting Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BUSINESS.siteUrl}/blog/${post.slug}`,
    },
    headline: post.title,
    description: post.excerpt,
    image: `${BUSINESS.siteUrl}${LOGO.og}`,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Ganpati Lifecare",
      logo: {
        "@type": "ImageObject",
        url: `${BUSINESS.siteUrl}${LOGO.og}`,
      },
    },
    datePublished: new Date(post.date).toISOString(),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />
      <main className="min-h-screen bg-background py-12 md:py-20">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs font-semibold text-muted uppercase tracking-wider">
            <Link href="/blog" className="hover:text-medical transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-medical">{post.category}</span>
          </nav>

          <header className="mb-12 border-b border-medical/10 pb-10">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 md:gap-8 text-sm font-medium text-muted">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-medical/10 flex items-center justify-center font-bold text-medical">
                  {post.author.charAt(0)}
                </div>
                <span className="text-foreground">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-medical">📅</span>
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-medical">⏱</span>
                {post.readTime}
              </div>
            </div>
          </header>

          <div className="prose prose-lg prose-medical max-w-none text-foreground/80 leading-relaxed 
            prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-medical/10 prose-h2:pb-4
            prose-p:mb-6 prose-li:mb-2 prose-strong:text-foreground"
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
          
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
