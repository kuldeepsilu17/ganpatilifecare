import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { BUSINESS } from "@/lib/constants";
import { getOrganizationSchema, getLocalBusinessSchema } from "@/lib/schema";
import { Products } from "@/components/sections/Products";

const title = "About Ganpati Lifecare | Orthopedic, Surgical & Hospital Supplies";
const description =
  "Learn about Ganpati Lifecare, a trusted healthcare supplies business based in Goluwala, Hanumangarh, Rajasthan. Owned by Dharampal Verma, we supply hospitals and clinics.";
const canonicalUrl = `${BUSINESS.siteUrl}/about`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl },
  openGraph: { title, description, url: canonicalUrl, type: "website" },
};

export default function AboutPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BUSINESS.siteUrl },
      { "@type": "ListItem", position: 2, name: "About Us", item: canonicalUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getLocalBusinessSchema()) }}
      />
      <Navbar />
      <main className="min-h-screen bg-background">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-medical/5 py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-2 text-xs text-muted">
              <Link href="/" className="hover:text-medical">
                Home
              </Link>
              <span>/</span>
              <span className="font-semibold text-foreground">About Us</span>
            </nav>
            <span className="inline-block rounded-full bg-medical/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-medical mb-4">
              Our Story
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Ganpati Lifecare &ndash; Orthopedic, Surgical &amp; Hospital Supplies
            </h1>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-card p-8 sm:p-12 shadow-sm border border-medical/10 space-y-8">
              
              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Who is Ganpati Lifecare?</h2>
                <p className="text-base leading-relaxed text-foreground/80">
                  Ganpati Lifecare is a dedicated healthcare supplies business based in Goluwala, Hanumangarh, Rajasthan. We specialize in providing high-quality orthopedic items, surgical materials, hospital consumables, medical disposable products, and healthcare uniforms to medical professionals and institutions.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Who owns Ganpati Lifecare?</h2>
                <p className="text-base leading-relaxed text-foreground/80">
                  The business was founded and is currently owned by <strong>Dharampal Verma</strong>. Under his leadership, Ganpati Lifecare has built a reputation for reliability, quality, and direct wholesale pricing for clinics and hospitals across the region.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Which areas do we serve?</h2>
                <p className="text-base leading-relaxed text-foreground/80">
                  While our headquarters is located in Goluwala, our service area extends extensively across North Rajasthan and North India. We actively supply healthcare facilities in Hanumangarh, Sri Ganganagar, Suratgarh, Bikaner, Nohar, Rawatsar, Pilibanga, Sangaria, and Bhadra. 
                </p>
                <div className="mt-4">
                  <Link href="/areas-we-serve" className="text-medical font-bold hover:underline">
                    View all areas we serve &rarr;
                  </Link>
                </div>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">What products do we supply?</h2>
                <p className="text-base leading-relaxed text-foreground/80 mb-6">
                  Our comprehensive catalog is designed to meet the rigorous demands of modern healthcare environments. We supply everything from everyday medical disposable products to specialized orthopedic and surgical goods.
                </p>
                <Products />
              </section>

            </div>
            
            <div className="mt-12 text-center">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-medical px-8 py-4 text-sm font-bold text-white shadow-md hover:bg-medical-dark transition-all hover:-translate-y-0.5"
              >
                Contact Us Today
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
