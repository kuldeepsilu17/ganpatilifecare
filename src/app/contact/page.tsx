import type { Metadata } from "next";
import { AddressBlock, PageHero } from "@/components/page-shell";
import { InquiryForm } from "@/components/inquiry-form";
import { BUSINESS } from "@/lib/constants";
import { getBreadcrumbSchema, getLocalBusinessSchema } from "@/lib/schema";

const title = "Contact & Inquiries | Ganpati Lifecare";
const description =
  "Contact Ganpati Lifecare, managed by Dharampal Verma in Mandi Goluwala, Hanumangarh, Rajasthan. Request wholesale quotes for orthopedic & hospital supplies.";
const canonicalUrl = `${BUSINESS.siteUrl}/contact`;

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
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

export default function ContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: BUSINESS.siteUrl },
    { name: "Contact", url: canonicalUrl },
  ]);

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${canonicalUrl}#contactpage`,
    name: title,
    description,
    url: canonicalUrl,
    mainEntity: {
      "@id": `${BUSINESS.siteUrl}/#localbusiness`,
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getLocalBusinessSchema()) }}
      />

      <PageHero
        eyebrow="CONTACT &amp; INQUIRIES"
        title="Get in touch"
        summary="Contact Ganpati Lifecare in Mandi Goluwala, Hanumangarh for medical, orthopedic and surgical supply inquiries."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <section className="page-content">
        <div className="wrap contact-page-grid">
          <div>
            <h2 className="content-section-title">Ganpati Lifecare</h2>
            <AddressBlock />
          </div>
          <div>
            <h2 className="content-section-title">Send an inquiry</h2>
            <div className="quote-form-wrap">
              <InquiryForm />
            </div>
            <p className="form-note">
              Submitting this form prepares a WhatsApp message for the business. You will
              need to send it in WhatsApp to complete your inquiry.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
