import type { Metadata } from "next";
import { ContactActions, PageHero } from "@/components/page-shell";
import { InquiryForm } from "@/components/inquiry-form";
import { BUSINESS } from "@/lib/constants";
import { getBreadcrumbSchema, getOrganizationSchema } from "@/lib/schema";

const title = "Distributor & Wholesale Partnership | Ganpati Lifecare";
const description =
  "Partner with Ganpati Lifecare in Hanumangarh. Wholesale distributor opportunities for orthopedic cotton rolls, gamjee rolls, gauze & hospital supplies.";
const canonicalUrl = `${BUSINESS.siteUrl}/become-a-distributor`;

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: { canonical: canonicalUrl },
  openGraph: { title, description, url: canonicalUrl, type: "website" },
};

export default function DistributorPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: BUSINESS.siteUrl },
    { name: "Become a Distributor", url: canonicalUrl },
  ]);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationSchema()) }}
      />

      <PageHero
        eyebrow="B2B PARTNERSHIPS"
        title="Distributor & wholesale supply partnership"
        summary="Partner inquiries for medical suppliers, healthcare distributors and institutions interested in Ganpati Lifecare catalog products."
        breadcrumbs={[{ label: "Distributor Inquiries" }]}
      />

      <section className="page-content">
        <div className="wrap">
          <div className="content-cards">
            <article className="content-card">
              <h2>Catalog discussion</h2>
              <p>
                Discuss orthopedic, surgical, uniform and healthcare products available
                in the Ganpati Lifecare catalog.
              </p>
            </article>
            <article className="content-card">
              <h2>Wholesale inquiry</h2>
              <p>
                Share product names and estimated order quantities to request current
                pricing and availability.
              </p>
            </article>
            <article className="content-card">
              <h2>Order coordination</h2>
              <p>
                Confirm invoicing, delivery location, freight options and timing directly
                with the business.
              </p>
            </article>
          </div>

          <div className="inline-quote">
            <h2>Become a Ganpati Lifecare distributor</h2>
            <p>
              Send your requirements and business contact details. Commercial terms are
              discussed directly and are not guaranteed by this inquiry.
            </p>
            <InquiryForm productName="Distributor partnership inquiry" />
            <ContactActions label="distributor partnership" />
          </div>
        </div>
      </section>
    </main>
  );
}
