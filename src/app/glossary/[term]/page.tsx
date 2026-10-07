import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { GLOSSARY_TERMS } from "@/lib/glossary";
import { BUSINESS } from "@/lib/constants";
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema";

interface Props {
  params: Promise<{ term: string }>;
}

export async function generateStaticParams() {
  return GLOSSARY_TERMS.map((item) => ({ term: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { term } = await params;
  const item = GLOSSARY_TERMS.find((t) => t.slug === term);
  if (!item) return {};

  const title = `${item.term} Definition & Uses | Ganpati Lifecare`;
  const description = `${item.shortDef.slice(0, 130)} Managed by Dharampal Verma at Ganpati Lifecare in Hanumangarh, Rajasthan.`.slice(0, 156);
  const canonicalUrl = `${BUSINESS.siteUrl}/glossary/${item.slug}`;

  return {
    title: title.length > 60 ? `${item.term} | Ganpati Lifecare` : title,
    description: description.length < 140 ? `${description} Verified medical standards and wholesale supply.` : description.slice(0, 158),
    alternates: { canonical: canonicalUrl },
    openGraph: { title, description, url: canonicalUrl, type: "article" },
  };
}

export default async function GlossaryDetailPage({ params }: Props) {
  const { term } = await params;
  const item = GLOSSARY_TERMS.find((t) => t.slug === term);
  if (!item) notFound();

  const canonicalUrl = `${BUSINESS.siteUrl}/glossary/${item.slug}`;

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: BUSINESS.siteUrl },
    { name: "Glossary", url: `${BUSINESS.siteUrl}/glossary` },
    { name: item.term, url: canonicalUrl },
  ]);

  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": `${canonicalUrl}#term`,
    name: item.term,
    description: item.shortDef,
    inDefinedTermSet: `${BUSINESS.siteUrl}/glossary`,
    url: canonicalUrl,
  };

  const faqSchema = item.faqs.length > 0 ? getFAQSchema(item.faqs) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }}
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
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs text-muted">
              <Link href="/" className="hover:text-medical">
                Home
              </Link>
              <span>/</span>
              <Link href="/glossary" className="hover:text-medical">
                Glossary
              </Link>
              <span>/</span>
              <span className="font-semibold text-foreground">{item.term}</span>
            </nav>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="inline-block rounded-full bg-medical/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-medical">
                Clinical Definition
              </span>
              {item.hindiTerm && (
                <span className="text-sm font-semibold text-foreground/80" lang="hi">
                  {item.hindiTerm}
                </span>
              )}
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              {item.term}
            </h1>
            
            {/* 40-60 Word Direct Answer Block */}
            <div className="mt-6 rounded-2xl bg-card p-6 border border-medical/20 shadow-xs">
              <p className="text-sm sm:text-base leading-relaxed text-foreground font-medium">
                {item.shortDef}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
            {/* Full Explanation */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Clinical Overview &amp; Function
              </h2>
              <p className="text-base leading-relaxed text-foreground/80">
                {item.fullDef}
              </p>
            </div>

            {/* Clinical Uses */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Primary Clinical Applications
              </h2>
              <ul className="space-y-2.5">
                {item.clinicalUses.map((use, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/85">
                    <span className="text-medical font-bold">✓</span>
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications Table */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Key Specifications &amp; Sizing
              </h2>
              <div className="rounded-2xl border border-medical/15 overflow-hidden bg-card">
                <table className="w-full text-xs sm:text-sm text-left">
                  <tbody className="divide-y divide-medical/10">
                    {item.specs.map((spec, i) => {
                      const [label, ...val] = spec.split(":");
                      return (
                        <tr key={i} className={i % 2 === 0 ? "bg-medical/5" : "bg-card"}>
                          <td className="px-4 py-3 font-bold text-foreground w-1/3">
                            {label}
                          </td>
                          <td className="px-4 py-3 text-foreground/80">
                            {val.join(":").trim()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Related Products */}
            {item.relatedProducts.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Related Products Supplied by Ganpati Lifecare
                </h2>
                <div className="flex flex-wrap gap-3">
                  {item.relatedProducts.map((p, i) => (
                    <Link
                      key={i}
                      href={p.href}
                      className="rounded-2xl bg-card border border-medical/20 px-4 py-3 text-xs sm:text-sm font-bold text-medical hover:bg-medical hover:text-white transition shadow-2xs"
                    >
                      {p.name} &rarr;
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            {item.faqs.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Frequently Asked Clinical Questions
                </h2>
                <div className="space-y-4">
                  {item.faqs.map((faq, i) => (
                    <div key={i} className="rounded-2xl bg-card p-5 border border-medical/10">
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

            {/* Bottom Sourcing CTA */}
            <div className="rounded-3xl bg-gradient-to-br from-medical to-medical-dark p-8 text-white text-center">
              <h2 className="font-display text-2xl font-bold">
                Source Wholesale {item.term} Directly
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-white/90 max-w-xl mx-auto">
                Ganpati Lifecare manufactures and stocks hospital-grade supplies in Mandi Goluwala, Hanumangarh for fast dispatch across Rajasthan.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/contact"
                  className="rounded-full bg-brand-orange px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-brand-orange-dark transition"
                >
                  Request Wholesale Quotation
                </Link>
                <a
                  href={`tel:${BUSINESS.phones[0]}`}
                  className="rounded-full bg-white/20 border border-white/40 px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-white hover:text-medical transition"
                >
                  Call +91 98282 32254
                </a>
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
