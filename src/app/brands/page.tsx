import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { BRANDS_DATA } from "@/lib/brands-data";
import { BUSINESS } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/schema";

const title = "Featured Healthcare Brands | Ganpati Lifecare Hanumangarh";
const description =
  "Explore White Rose Brand, Orthocot, Ortho Active & Lap-Pad medical supplies by Ganpati Lifecare in Mandi Goluwala, Hanumangarh, Rajasthan (PIN 335802).";
const canonicalUrl = `${BUSINESS.siteUrl}/brands`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl },
  openGraph: { title, description, url: canonicalUrl, type: "website" },
};

export default function BrandsIndexPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: BUSINESS.siteUrl },
    { name: "Brands", url: canonicalUrl },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="bg-[#EDF5EF]/60 py-14 sm:py-20 border-b border-[#D7E5DA]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <nav aria-label="Breadcrumb" className="mb-4 flex items-center justify-center gap-2 text-xs text-[#68766D]">
              <Link href="/" className="hover:text-[#174C38] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="font-semibold text-[#18352A]">Brands</span>
            </nav>
            <span className="inline-block rounded-full bg-[#EDF5EF] border border-[#D7E5DA] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#174C38] mb-3">
              Proprietary &amp; Distributed Brands
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#18352A] tracking-tight">
              Medical &amp; Surgical Product Brands
            </h1>
            <p className="mt-4 text-sm sm:text-base text-[#46554C] max-w-2xl mx-auto leading-relaxed">
              Explore trusted medical supply brands manufactured and wholesale distributed by Ganpati Lifecare (GLC) across Rajasthan.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {BRANDS_DATA.map((brand) => (
                <article
                  key={brand.slug}
                  className="rounded-2xl bg-white p-6 sm:p-8 border border-[#D7E5DA] shadow-xs hover:border-[#174C38] transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-semibold text-[#258653] uppercase tracking-wider">
                      {brand.tagline}
                    </span>
                    <h2 className="font-display text-2xl font-bold text-[#18352A] hover:text-[#174C38] transition mt-1">
                      <Link href={`/brands/${brand.slug}`}>
                        {brand.brandName}
                      </Link>
                    </h2>
                    <p className="mt-3 text-xs sm:text-sm text-[#46554C] leading-relaxed">
                      {brand.tldr}
                    </p>

                    <div className="mt-5 space-y-2">
                      <p className="text-xs font-bold text-[#18352A]">Featured Products:</p>
                      <div className="flex flex-wrap gap-2">
                        {brand.coreProducts.map((p, idx) => (
                          <span
                            key={idx}
                            className="rounded-lg bg-[#EDF5EF] border border-[#D7E5DA] px-2.5 py-1 text-xs text-[#174C38] font-medium"
                          >
                            {p.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#D7E5DA] flex items-center justify-between">
                    <span className="text-xs text-[#68766D]">
                      Mandi Goluwala (335802)
                    </span>
                    <Link
                      href={`/brands/${brand.slug}`}
                      className="text-xs font-semibold text-[#174C38] hover:underline flex items-center gap-1"
                    >
                      View brand overview &rarr;
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
