import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactActions, PageHero } from "@/components/page-shell";
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
    title: {
      absolute: title.length > 60 ? `${item.term} | Ganpati Lifecare` : title,
    },
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

  const faqSchema = item.faqs && item.faqs.length > 0 ? getFAQSchema(item.faqs) : null;

  return (
    <main>
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

      <PageHero
        eyebrow={`MEDICAL GLOSSARY${item.hindiTerm ? ` · ${item.hindiTerm}` : ""}`}
        title={item.term}
        summary={item.shortDef}
        breadcrumbs={[
          { label: "Glossary", href: "/glossary" },
          { label: item.term },
        ]}
      />

      <section className="page-content">
        <div className="wrap prose">
          <h2>Definition &amp; Overview</h2>
          <p>{item.shortDef}</p>

          {item.fullDef && (
            <>
              <h2>Detailed clinical description</h2>
              <p>{item.fullDef}</p>
            </>
          )}

          {item.clinicalUses && item.clinicalUses.length > 0 && (
            <>
              <h2>Clinical applications</h2>
              <ul>
                {item.clinicalUses.map((use, idx) => (
                  <li key={idx}>{use}</li>
                ))}
              </ul>
            </>
          )}

          {item.specs && item.specs.length > 0 && (
            <>
              <h2>Specifications</h2>
              <ul>
                {item.specs.map((spec, idx) => (
                  <li key={idx}>{spec}</li>
                ))}
              </ul>
            </>
          )}

          <h2>Procurement &amp; product information</h2>
          <p>
            Product specifications, intended use and sterile status depend on the
            specific item. Refer to product information and consult qualified
            healthcare professionals for clinical decisions.
          </p>
          <p>
            Ganpati Lifecare is based in Mandi Goluwala, Hanumangarh, Rajasthan.
            Contact the business for current catalog details and wholesale
            availability.
          </p>

          <ContactActions label={item.term} />
        </div>
      </section>
    </main>
  );
}
