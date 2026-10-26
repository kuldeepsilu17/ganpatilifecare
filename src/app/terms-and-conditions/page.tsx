import type { Metadata } from "next";
import { PageHero } from "@/components/page-shell";
import { business } from "@/lib/site-data";
import { BUSINESS } from "@/lib/constants";

const title = "Terms & Conditions | Ganpati Lifecare";
const description =
  "Terms for using the Ganpati Lifecare website and requesting wholesale quotations.";
const canonicalUrl = `${BUSINESS.siteUrl}/terms-and-conditions`;

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: { canonical: canonicalUrl },
  openGraph: { title, description, url: canonicalUrl, type: "website" },
};

export default function TermsPage() {
  return (
    <main>
      <PageHero
        eyebrow="INFORMATION"
        title="Terms &amp; conditions"
        summary="Terms for using the Ganpati Lifecare website and submitting product inquiries."
        breadcrumbs={[{ label: "Terms & Conditions" }]}
      />
      <article className="page-content">
        <div className="wrap prose">
          <p>
            <strong>Effective date: 2026</strong>
          </p>
          <h2>1. Website inquiries</h2>
          <p>
            Submitting an inquiry is a request for information and does not create a
            purchase contract. Orders, product availability, pricing and delivery
            arrangements require direct confirmation from Ganpati Lifecare.
          </p>
          <h2>2. Quotations and supply</h2>
          <p>
            Quotations are subject to confirmation for the products, quantities and delivery
            location requested. Contact the business to confirm final commercial terms
            before placing an order.
          </p>
          <h2>3. Product details</h2>
          <p>
            Product descriptions on this website provide general catalog information.
            Confirm specifications, packaging and sterile status for each item with Ganpati
            Lifecare before ordering. Clinical decisions should be made by qualified
            healthcare professionals.
          </p>
          <h2>4. Dispatch &amp; freight</h2>
          <p>
            Delivery options and expected transit times are discussed when an order is
            confirmed.
          </p>
          <h2>5. Governing law</h2>
          <p>
            Applicable commercial transactions are subject to the laws and jurisdiction
            applicable in Hanumangarh, Rajasthan, India.
          </p>
          <h2>6. Contact</h2>
          <p>
            {business.name}, Mandi Goluwala, Hanumangarh, Rajasthan. Phone:{" "}
            <a href={`tel:${business.phoneRaw}`}>{business.phone}</a>. Email:{" "}
            <a href={`mailto:${business.email}`}>{business.email}</a>.
          </p>
        </div>
      </article>
    </main>
  );
}
