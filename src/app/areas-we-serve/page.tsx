import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { LOCATIONS } from "@/lib/locations";
import { BUSINESS } from "@/lib/constants";

const title = "Medical & Surgical Supplies Across Hanumangarh & North Rajasthan | Ganpati Lifecare";
const description =
  "Ganpati Lifecare supplies orthopedic, surgical, and hospital products to healthcare facilities across Hanumangarh district and North Rajasthan, from our base in Goluwala.";
const canonicalUrl = `${BUSINESS.siteUrl}/areas-we-serve`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl },
  openGraph: { title, description, url: canonicalUrl, type: "website" },
};

export default function AreasWeServePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BUSINESS.siteUrl },
      { "@type": "ListItem", position: 2, name: "Areas We Serve", item: canonicalUrl },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: canonicalUrl,
    hasPart: LOCATIONS.map((loc) => ({
      "@type": "WebPage",
      name: `Medical Supplies in ${loc.city}`,
      url: `${BUSINESS.siteUrl}/locations/${loc.slug}`,
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
      <main className="min-h-screen bg-background">
        <section className="relative overflow-hidden bg-medical/5 py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-2 text-xs text-muted">
              <Link href="/" className="hover:text-medical">
                Home
              </Link>
              <span>/</span>
              <span className="font-semibold text-foreground">Areas We Serve</span>
            </nav>
            <span className="inline-block rounded-full bg-medical/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-medical mb-4">
              Regional Coverage
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Serving Hospitals &amp; Clinics Across{" "}
              <span className="text-medical">Hanumangarh &amp; North Rajasthan</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Based in Goluwala, Hanumangarh, Ganpati Lifecare supplies orthopedic products, surgical
              dressings, hospital uniforms, and medical disposables to healthcare facilities throughout
              the district and neighbouring Rajasthan markets. Select an area below for local details, or
              browse the full catalog.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {LOCATIONS.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/locations/${loc.slug}`}
                  className="group rounded-2xl border border-medical/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <h2 className="font-display text-lg font-bold text-foreground group-hover:text-medical">
                    {loc.city}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/75">{loc.description}</p>
                  <span className="mt-3 inline-block text-xs font-semibold text-medical">
                    View {loc.city} details →
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-sm text-muted">
                Don&apos;t see your area listed? We regularly supply healthcare facilities beyond these
                towns across Rajasthan and North India.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-medical px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-medical-dark"
                >
                  Browse Full Catalog
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-medical/20 px-6 py-3 text-sm font-bold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-gray-50"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
