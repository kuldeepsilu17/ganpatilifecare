import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { BRANDS_DATA } from "@/lib/brands-data";
import { BUSINESS, getWhatsAppInquiryUrl } from "@/lib/constants";
import { getBreadcrumbSchema, getFAQSchema, getLocalBusinessSchema } from "@/lib/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BRANDS_DATA.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = BRANDS_DATA.find((b) => b.slug === slug);
  if (!brand) return {};

  const canonicalUrl = `${BUSINESS.siteUrl}/brands/${brand.slug}`;

  return {
    title: brand.metaTitle,
    description: brand.metaDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: brand.metaTitle,
      description: brand.metaDescription,
      url: canonicalUrl,
      type: "website",
    },
  };
}

export default async function BrandDetailPage({ params }: Props) {
  const { slug } = await params;
  const brand = BRANDS_DATA.find((b) => b.slug === slug);
  if (!brand) notFound();

  const canonicalUrl = `${BUSINESS.siteUrl}/brands/${brand.slug}`;

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: BUSINESS.siteUrl },
    { name: "Brands", url: `${BUSINESS.siteUrl}/brands` },
    { name: brand.brandName, url: canonicalUrl },
  ]);

  const brandSchema = {
    "@context": "https://schema.org",
    "@type": "Brand",
    "@id": `${canonicalUrl}#brand`,
    name: brand.brandName,
    description: brand.tldr,
    url: canonicalUrl,
  };

  const faqSchema = brand.faqs.length > 0 ? getFAQSchema(brand.faqs) : null;
  const businessSchema = getLocalBusinessSchema();

  const whatsappUrl = getWhatsAppInquiryUrl(
    `Hello Ganpati Lifecare, I would like to inquire about wholesale orders for ${brand.brandName} products.`
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="bg-medical/5 py-14 sm:py-20 border-b border-medical/10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs text-muted">
              <Link href="/" className="hover:text-medical">
                Home
              </Link>
              <span>/</span>
              <Link href="/brands" className="hover:text-medical">
                Brands
              </Link>
              <span>/</span>
              <span className="font-semibold text-foreground">{brand.brandName}</span>
            </nav>
            <span className="inline-block rounded-full bg-brand-orange/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange mb-3">
              {brand.tagline}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              {brand.h1}
            </h1>

            {/* 40-60 Word Direct Answer Block */}
            <div className="mt-6 rounded-2xl bg-card p-6 sm:p-7 border border-medical/20 shadow-xs">
              <p className="text-sm sm:text-base leading-relaxed text-foreground font-medium">
                {brand.tldr}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted">
                <span>📍 Distributed from Mandi Goluwala - 335802</span>
                <span>•</span>
                <span>👨‍💼 Managed by Dharampal Verma</span>
                <span>•</span>
                <span>📄 GSTIN: {BUSINESS.gstin}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition"
              >
                Inquire on WhatsApp &rarr;
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-medical px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-medical-dark transition"
              >
                Request Wholesale Quote
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Overview */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                About {brand.brandName}
              </h2>
              <p className="text-base leading-relaxed text-foreground/80">
                {brand.overview}
              </p>
            </div>

            {/* Core Products Grid */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Products Available under {brand.brandName}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {brand.coreProducts.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-card border border-medical/15 shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground">
                        {p.name}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-foreground/80 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-medical/10">
                      <Link
                        href={p.url}
                        className="text-xs font-bold text-medical hover:underline inline-flex items-center gap-1"
                      >
                        View product specifications &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications Table */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Brand &amp; Distribution Specifications
              </h2>
              <div className="rounded-2xl border border-medical/15 overflow-hidden bg-card">
                <table className="w-full text-xs sm:text-sm text-left">
                  <tbody className="divide-y divide-medical/10">
                    {brand.specTable.map((spec, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-medical/5" : "bg-card"}>
                        <td className="px-5 py-3.5 font-bold text-foreground w-1/3">
                          {spec.label}
                        </td>
                        <td className="px-5 py-3.5 text-foreground/80">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Quality Features */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Quality &amp; Sourcing Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {brand.keyFeatures.map((f, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-card border border-medical/15 flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-medical/10 text-medical font-bold text-xs">
                      ✓
                    </span>
                    <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed">
                      {f}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            {brand.faqs.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {brand.faqs.map((faq, i) => (
                    <div key={i} className="rounded-2xl bg-card p-5 sm:p-6 border border-medical/15">
                      <h3 className="font-bold text-foreground text-sm sm:text-base">
                        {faq.question}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-foreground/80 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sourcing Callout */}
            <div className="rounded-3xl bg-gradient-to-br from-medical to-medical-dark p-8 sm:p-10 text-white text-center">
              <h2 className="font-display text-2xl sm:text-3xl font-bold">
                Order {brand.brandName} at Factory Wholesale Rates
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-white/90 max-w-xl mx-auto leading-relaxed">
                Connect with Ganpati Lifecare in Mandi Goluwala, Hanumangarh for official carton rates and prompt regional logistics.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-brand-orange px-8 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-brand-orange-dark transition"
                >
                  WhatsApp Procurement Desk
                </a>
                <Link
                  href="/products"
                  className="rounded-full bg-white/20 border border-white/40 px-6 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white hover:text-medical transition"
                >
                  Browse Full Catalog &rarr;
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
