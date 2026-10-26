import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-shell";
import { business } from "@/lib/site-data";
import { BUSINESS } from "@/lib/constants";
import { getBreadcrumbSchema, getBusinessSchema, getFaqSchema } from "@/lib/schema";
import { BRAND_FAQS } from "@/lib/data";

const title = "Company Facts | Ganpati Lifecare Hanumangarh";
const description =
  "Official business and contact information for Ganpati Lifecare in Mandi Goluwala, Rajasthan. Legal name, management, address, GSTIN, and catalog.";
const canonicalUrl = `${BUSINESS.siteUrl}/company-facts`;

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: { canonical: canonicalUrl },
  openGraph: { title, description, url: canonicalUrl, type: "website" },
};

const facts = [
  ["Brand name", "Ganpati Lifecare (GLC)"],
  ["Legal / trade name", "GANPATI LIFECARE"],
  ["Management", business.manager],
  ["Address", business.address],
  ["Phone", `${business.phone}, ${business.alternatePhone}`],
  ["WhatsApp", business.phone],
  ["Email", business.email],
  ["GSTIN", `${business.gstin} (Rajasthan)`],
  ["Primary product lines", "Orthopedic supplies, surgical dressing materials, hospital uniforms, healthcare essentials"],
  ["Key brands", "White Rose Brand, Orthocot, Ortho Active, Lap-Pad"],
  ["Service inquiries", "Hanumangarh, Sri Ganganagar, Suratgarh, Bikaner, Nohar, Rawatsar, Pilibanga, Sangaria and Bhadra"],
  ["Independent status", "Independently owned & managed in Goluwala, Hanumangarh (not affiliated with similarly named entities in other states)."],
];

export default function CompanyFactsPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: BUSINESS.siteUrl },
    { name: "Company Facts", url: canonicalUrl },
  ]);

  const faqSchema = getFaqSchema(BRAND_FAQS);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBusinessSchema()) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <PageHero
        eyebrow="OFFICIAL BUSINESS DETAILS"
        title="Company facts"
        summary="Verified business and contact information for Ganpati Lifecare (GLC), Mandi Goluwala, Hanumangarh, Rajasthan."
        breadcrumbs={[{ label: "Company Facts" }]}
      />

      <section className="page-content">
        <div className="wrap prose">
          <h2>Official Business Information</h2>
          <table className="data-table">
            <tbody>
              {facts.map(([label, value]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Procurement transparency</h2>
          <p>
            Operating hours and dispatch timing vary based on wholesale order volume and
            freight coordination. Contact the business directly to confirm current
            specifications, lead times and formal quotation terms.
          </p>
          <p>
            <Link className="text-link" href="/contact">
              Contact Ganpati Lifecare &rarr;
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
