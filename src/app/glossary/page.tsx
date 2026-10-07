import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { GLOSSARY_TERMS } from "@/lib/glossary";
import { BUSINESS } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/schema";

const title = "Medical & Surgical Supplies Glossary | Ganpati Lifecare";
const description =
  "Clinical glossary of orthopedic supplies, cotton cast padding, gamjee rolls, stockinets, and surgical dressings by Ganpati Lifecare, Hanumangarh, Rajasthan.";
const canonicalUrl = `${BUSINESS.siteUrl}/glossary`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl },
  openGraph: { title, description, url: canonicalUrl, type: "website" },
};

export default function GlossaryIndexPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: BUSINESS.siteUrl },
    { name: "Medical Glossary", url: canonicalUrl },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="bg-medical/5 py-14 sm:py-20 border-b border-medical/10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <nav aria-label="Breadcrumb" className="mb-4 flex items-center justify-center gap-2 text-xs text-muted">
              <Link href="/" className="hover:text-medical">
                Home
              </Link>
              <span>/</span>
              <span className="font-semibold text-foreground">Medical Glossary</span>
            </nav>
            <span className="inline-block rounded-full bg-medical/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-medical mb-3">
              Clinical Reference
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Medical &amp; Surgical Supplies Glossary
            </h1>
            <p className="mt-4 text-sm sm:text-base text-muted max-w-2xl mx-auto leading-relaxed">
              Clear clinical definitions, specifications, and applications of essential orthopedic padding, surgical dressings, and hospital consumables.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GLOSSARY_TERMS.map((item) => (
                <article
                  key={item.slug}
                  className="rounded-3xl bg-card p-6 sm:p-8 border border-medical/15 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-semibold text-medical font-mono uppercase tracking-wider">
                        Clinical Term
                      </span>
                      {item.hindiTerm && (
                        <span className="text-xs text-muted font-medium" lang="hi">
                          {item.hindiTerm}
                        </span>
                      )}
                    </div>
                    <h2 className="font-display text-xl font-bold text-foreground hover:text-medical transition">
                      <Link href={`/glossary/${item.slug}`}>
                        {item.term}
                      </Link>
                    </h2>
                    <p className="mt-3 text-xs sm:text-sm text-foreground/80 leading-relaxed">
                      {item.shortDef}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-medical/10 flex items-center justify-between">
                    <span className="text-xs text-muted">
                      {item.clinicalUses.length} Clinical Applications
                    </span>
                    <Link
                      href={`/glossary/${item.slug}`}
                      className="text-xs font-bold text-medical hover:underline flex items-center gap-1"
                    >
                      Read full definition &rarr;
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
