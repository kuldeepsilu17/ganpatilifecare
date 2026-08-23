import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { BLOG_POSTS } from "@/lib/blog";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Medical Supplies Blog & Knowledge Center | Ganpati Lifecare",
  description: "Read expert articles on orthopedic supplies, hospital consumables, and surgical equipment from Ganpati Lifecare in Rajasthan.",
  alternates: {
    canonical: `${BUSINESS.siteUrl}/blog`,
  },
  openGraph: {
    title: "Medical Supplies Blog & Knowledge Center | Ganpati Lifecare",
    description: "Read expert articles on orthopedic supplies, hospital consumables, and surgical equipment from Ganpati Lifecare in Rajasthan.",
    url: `${BUSINESS.siteUrl}/blog`,
    type: "website",
  },
};

export default function BlogIndexPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block rounded-full bg-medical/10 px-3 py-1 text-sm font-bold uppercase tracking-wider text-medical mb-4">
              Knowledge Center
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Medical Insights &amp; Updates
            </h1>
            <p className="mt-4 text-lg text-foreground/80 leading-relaxed">
              Expert guides on choosing the right hospital supplies, orthopedic products, and surgical consumables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <article 
                key={post.slug} 
                className="group flex flex-col rounded-3xl border border-medical/15 bg-card overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
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
