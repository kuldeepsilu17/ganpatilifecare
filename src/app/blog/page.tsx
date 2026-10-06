import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { BLOG_POSTS } from "@/lib/blog";
import { BUSINESS } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/schema";

const title = "Medical Supplies Blog & Knowledge Center | Ganpati Lifecare";
const description =
  "Medical guides on orthopedic supplies, surgical cotton rolls, hospital consumables & uniforms from Ganpati Lifecare in Goluwala, Hanumangarh, Rajasthan.";
const canonicalUrl = `${BUSINESS.siteUrl}/blog`;

export const metadata: Metadata = {
  title,
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

export default function BlogIndexPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: BUSINESS.siteUrl },
    { name: "Blog", url: canonicalUrl },
  ]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: canonicalUrl,
    hasPart: BLOG_POSTS.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${BUSINESS.siteUrl}/blog/${post.slug}`,
      description: post.excerpt,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-16">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs text-muted">
              <Link href="/" className="hover:text-medical transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="font-semibold text-foreground">Blog</span>
            </nav>
            <span className="inline-block rounded-full bg-medical/10 px-3 py-1 text-xs sm:text-sm font-bold uppercase tracking-wider text-medical mb-3 sm:mb-4">
              Knowledge Center
            </span>
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Medical Supplies Blog &amp; Knowledge Center
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed text-left sm:text-center">
              Welcome to the Ganpati Lifecare Medical Knowledge Center, curated under the management of Dharampal Verma in Mandi Goluwala, Hanumangarh, Rajasthan. We provide comprehensive clinical guides and procurement resources for hospital administrators, orthopedic surgeons, nursing staff, and medical distributors across North Rajasthan. Explore our in-depth articles detailing the technical differences between specialized Orthocot cotton rolls and ordinary cotton, complete skin traction kit assemblies, fabric selection for doctor coats and surgical OT dresses, and essential hospital consumables checklists. Our goal is to empower healthcare professionals with actionable, evidence-based supply chain insights.
            </p>

            {/* Topic Filters as Real Links */}
            <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
              <span className="font-semibold text-foreground mr-1 self-center">Browse by Topic:</span>
              <Link href="/categories/orthopedic" className="rounded-full bg-medical/10 px-3.5 py-1.5 text-medical font-medium hover:bg-medical hover:text-white transition">
                Orthopedic Supplies
              </Link>
              <Link href="/categories/surgical" className="rounded-full bg-medical/10 px-3.5 py-1.5 text-medical font-medium hover:bg-medical hover:text-white transition">
                Surgical Supplies
              </Link>
              <Link href="/categories/hospital-uniforms" className="rounded-full bg-medical/10 px-3.5 py-1.5 text-medical font-medium hover:bg-medical hover:text-white transition">
                Hospital Uniforms
              </Link>
              <Link href="/categories/healthcare-essentials" className="rounded-full bg-medical/10 px-3.5 py-1.5 text-medical font-medium hover:bg-medical hover:text-white transition">
                Healthcare Essentials
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {BLOG_POSTS.map((post) => (
              <article 
                key={post.slug} 
                className="group flex flex-col rounded-3xl border border-medical/15 bg-card overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="p-5 sm:p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-xs font-semibold text-muted mb-4 uppercase tracking-wider">
                    <span className="text-medical">{post.category}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <Link href={`/blog/${post.slug}`} className="block mb-3">
                    <h2 className="font-display text-xl font-bold text-foreground group-hover:text-medical transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  
                  <p className="text-sm text-foreground/80 leading-relaxed mb-6 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-5 border-t border-medical/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-medical/10 flex items-center justify-center font-bold text-medical text-xs">
                        {post.author.charAt(0)}
                      </div>
                      <span className="text-xs font-semibold text-foreground">{post.author}</span>
                    </div>
                    <span className="text-xs text-muted">{post.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
