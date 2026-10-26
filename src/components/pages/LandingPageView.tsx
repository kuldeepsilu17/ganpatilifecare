import React from "react";
import Link from "next/link";
import { PageHero, ContactActions } from "@/components/page-shell";
import { InquiryForm } from "@/components/inquiry-form";
import { LandingPageData } from "@/lib/landing-pages";
import { BUSINESS } from "@/lib/constants";
import { getBreadcrumbSchema, getFAQSchema, getLocalBusinessSchema } from "@/lib/schema";

interface Props {
  data: LandingPageData;
}

export function LandingPageView({ data }: Props) {
  const canonicalUrl = `${BUSINESS.siteUrl}/${data.slug}`;

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: BUSINESS.siteUrl },
    { name: data.h1, url: canonicalUrl },
  ]);

  const faqSchema = data.faqs.length > 0 ? getFAQSchema(data.faqs) : null;
  const businessSchema = getLocalBusinessSchema();

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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

      <PageHero
        eyebrow={data.eyebrow.toUpperCase()}
        title={data.h1}
        summary={data.tldr}
        breadcrumbs={[{ label: data.eyebrow }]}
      />

      <section className="page-content">
        <div className="wrap prose">
          <h2>Regional Supply Network &amp; Manufacturing</h2>
          <p>{data.intro}</p>

          <h2>Technical Specifications &amp; Supply Details</h2>
          <table className="data-table">
            <tbody>
              {data.specTable.map((spec, i) => (
                <tr key={i}>
                  <th scope="row">{spec.label}</th>
                  <td>{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Key Advantages of Sourcing from Ganpati Lifecare</h2>
          <div className="content-cards">
            {data.keyBenefits.map((b, i) => (
              <article className="content-card" key={i}>
                <h2>Advantage 0{i + 1}</h2>
                <p>{b}</p>
              </article>
            ))}
          </div>

          <h2>Procurement &amp; Sourcing Guide</h2>
          <ul>
            {data.buyingGuide.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h2>Target Facilities &amp; Institutional Clients</h2>
          <ul>
            {data.targetAudience.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          {data.faqs.length > 0 && (
            <>
              <h2>Frequently Asked Questions</h2>
              <div className="faq-list">
                {data.faqs.map((faq, i) => (
                  <details className="faq-item" key={i} open={i === 0}>
                    <summary>
                      {faq.question}
                      <span aria-hidden="true">+</span>
                    </summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </>
          )}

          <div className="inline-quote">
            <h2>Get a Direct Factory Quote Today</h2>
            <p>
              Contact Dharampal Verma at Ganpati Lifecare for itemized pricing, master carton
              rates, and rapid delivery across Rajasthan.
            </p>
            <InquiryForm productName={data.primaryProductName} />
            <ContactActions label={data.primaryProductName} />
          </div>

          <p style={{ marginTop: "24px" }}>
            <Link className="text-link" href={data.primaryProductUrl}>
              View product catalog page &rarr;
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
