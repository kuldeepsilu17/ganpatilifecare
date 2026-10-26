import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-shell";
import { business } from "@/lib/site-data";
import { BUSINESS } from "@/lib/constants";
import {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getBreadcrumbSchema,
} from "@/lib/schema";

const title = "About Ganpati Lifecare | Dharampal Verma | Hanumangarh";
const description =
  "Ganpati Lifecare, managed by Dharampal Verma in Mandi Goluwala, Hanumangarh, Rajasthan: orthopedic supplies, White Rose products & surgical dressings.";
const canonicalUrl = `${BUSINESS.siteUrl}/about`;

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: { canonical: canonicalUrl },
  openGraph: { title, description, url: canonicalUrl, type: "website" },
};

export default function AboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: BUSINESS.siteUrl },
    { name: "About Us", url: canonicalUrl },
  ]);

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${canonicalUrl}#about`,
    name: title,
    description,
    url: canonicalUrl,
    mainEntity: {
      "@type": "Person",
      "@id": `${BUSINESS.siteUrl}/#manager`,
      name: BUSINESS.owner,
      worksFor: {
        "@id": `${BUSINESS.siteUrl}/#organization`,
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS.address.streetAddress,
        addressLocality: "Mandi Goluwala",
        addressRegion: "Rajasthan",
        postalCode: BUSINESS.address.postalCode,
        addressCountry: "IN",
      },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getLocalBusinessSchema()) }}
      />

      <PageHero
        eyebrow="OUR STORY"
        title="About Ganpati Lifecare"
        summary="A regional medical supply business based in Mandi Goluwala, Hanumangarh, Rajasthan."
        breadcrumbs={[{ label: "About" }]}
      />

      <section className="page-content">
        <div className="wrap prose">
          <h2>Who is Ganpati Lifecare?</h2>
          <p>
            Ganpati Lifecare (GLC) supplies orthopedic, surgical, hospital uniform and
            healthcare products to hospitals, clinics, nursing homes and distributors. The
            catalog includes White Rose Brand Orthocot cotton rolls, orthopedic dressings,
            uniforms and hospital essentials.
          </p>

          <h2>Business management &amp; operations</h2>
          <p>
            Ganpati Lifecare is managed by {business.manager}. Product requirements,
            availability, order quantities and freight arrangements are discussed directly with
            the business.
          </p>
          <p className="hindi" lang="hi">
            गणपति लाइफकेयर - मंडी गोलूवाला, हनुमानगढ़, राजस्थान
          </p>

          <h2>Where we serve</h2>
          <p>
            The business is based in Mandi Goluwala and lists service inquiries for
            Hanumangarh, Sri Ganganagar, Suratgarh, Bikaner, Nohar, Rawatsar, Pilibanga,
            Sangaria and Bhadra. Please contact GLC to confirm delivery availability and
            timing for your location.
          </p>
          <p>
            <Link href="/locations" className="text-link">
              View service locations &rarr;
            </Link>
          </p>

          <h2>Product range</h2>
          <p>
            The catalog groups products into orthopedic supplies, surgical materials,
            hospital uniforms and healthcare essentials. Technical specifications and
            sterilization status vary by product and should be confirmed before ordering.
          </p>
          <p>
            <Link href="/products" className="text-link">
              Explore products &rarr;
            </Link>
          </p>

          <h2>Official entity information</h2>
          <table className="data-table">
            <tbody>
              <tr>
                <th scope="row">Brand name</th>
                <td>Ganpati Lifecare (GLC)</td>
              </tr>
              <tr>
                <th scope="row">Management</th>
                <td>Managed by {BUSINESS.owner}</td>
              </tr>
              <tr>
                <th scope="row">Location</th>
                <td>{business.address}</td>
              </tr>
              <tr>
                <th scope="row">GSTIN</th>
                <td>{business.gstin} (Rajasthan)</td>
              </tr>
              <tr>
                <th scope="row">Entity Verification</th>
                <td>
                  Independent business in Mandi Goluwala, Hanumangarh (not affiliated with any
                  similarly named entities in Delhi/Gurgaon). See{" "}
                  <Link href="/company-facts">Company Facts Sheet</Link>.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
