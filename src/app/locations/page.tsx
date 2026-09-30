import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { LOCATIONS } from "@/lib/locations";
import { BUSINESS } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/schema";

const title = "Medical & Surgical Supply Locations | Ganpati Lifecare Rajasthan";
const description =
  "Explore Ganpati Lifecare service locations across Hanumangarh, Sri Ganganagar, Suratgarh, Bikaner, Nohar, Rawatsar, Pilibanga, Sangaria, and Bhadra in Rajasthan.";
const canonicalUrl = `${BUSINESS.siteUrl}/locations`;

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

export default function LocationsIndexPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: BUSINESS.siteUrl },
    { name: "Locations", url: canonicalUrl },
  ]);

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
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs text-muted">
              <Link href="/" className="hover:text-medical transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="font-semibold text-foreground">Locations</span>
            </nav>
            <span className="inline-block rounded-full bg-medical/10 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-medical mb-4">
              Local Distribution Network
            </span>
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Medical &amp; Hospital Supply Locations
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Based in Goluwala, Hanumangarh, Ganpati Lifecare provides prompt wholesale distribution of orthopedic products, surgical cotton rolls, and hospital consumables to healthcare facilities throughout North Rajasthan.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {LOCATIONS.map((loc) => (
                <div
                  key={loc.slug}
                  className="rounded-3xl border border-medical/15 bg-card p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h2 className="font-display text-xl font-bold text-foreground">
                        {loc.city}
                      </h2>
                      <span className="inline-block rounded-full bg-medical/10 px-2.5 py-0.5 text-xs font-semibold text-medical">
                        {loc.hospitalCount}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-brand-orange mb-3">
                      {loc.region}, India
                    </p>
                    <p className="text-xs sm:text-sm leading-relaxed text-foreground/80 mb-4">
                      {loc.description}
                    </p>
                    {loc.keyProducts && (
                      <div className="mb-4">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-muted block mb-1.5">
                          Key Supplied Products:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {loc.keyProducts.slice(0, 3).map((prod, idx) => (
                            <span
                              key={idx}
                              className="inline-block rounded-md bg-medical/5 px-2 py-0.5 text-[11px] font-medium text-foreground/85"
                            >
                              {prod}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="pt-4 border-t border-medical/10">
                    <Link
                      href={`/locations/${loc.slug}`}
                      className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold text-medical hover:underline"
                    >
                      View {loc.city} local supply details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center bg-medical/5 rounded-3xl p-8 sm:p-12 border border-medical/10">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-3">
                Need Bulk Medical Supplies in Another Location?
              </h3>
              <p className="text-sm text-foreground/80 max-w-xl mx-auto leading-relaxed mb-6">
                We coordinate freight and direct delivery to hospitals, medical centers, and distributor networks across Rajasthan and North India.
              </p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                <Link
                  href="/products"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-medical px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-medical-dark transition-all"
                >
                  Browse Products Catalog
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-white border border-medical/20 px-6 py-3 text-xs sm:text-sm font-bold text-foreground shadow-sm hover:bg-gray-50 transition-all"
                >
                  Contact Sales Department
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
