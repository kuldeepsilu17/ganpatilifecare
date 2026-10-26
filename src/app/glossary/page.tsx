import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-shell";
import { GLOSSARY_TERMS } from "@/lib/glossary";
import { BUSINESS } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/schema";

const title = "Medical & Surgical Supplies Glossary | Ganpati Lifecare";
const description =
  "Plain-language supply definitions and product terms from Ganpati Lifecare. Orthopedic padding, cotton rolls, stockinet and surgical dressing terms.";
const canonicalUrl = `${BUSINESS.siteUrl}/glossary`;

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: { canonical: canonicalUrl },
  openGraph: { title, description, url: canonicalUrl, type: "website" },
};

export default function GlossaryPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: BUSINESS.siteUrl },
    { name: "Medical Glossary", url: canonicalUrl },
  ]);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        eyebrow="CLINICAL REFERENCE"
        title="Medical & surgical supplies glossary"
        summary="Plain-language descriptions of product terms found in the Ganpati Lifecare catalog. These entries are general information, not clinical guidance."
        breadcrumbs={[{ label: "Glossary" }]}
      />

      <section className="page-content">
        <div className="wrap content-cards">
          {GLOSSARY_TERMS.map((term) => (
            <article className="content-card" key={term.slug}>
              {term.hindiTerm && <span className="pill-label">{term.hindiTerm}</span>}
              <h2>{term.term}</h2>
              <p>{term.shortDef}</p>
              <Link className="text-link" href={`/glossary/${term.slug}`}>
                Read definition &rarr;
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
