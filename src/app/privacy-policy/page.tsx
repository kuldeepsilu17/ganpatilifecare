import type { Metadata } from "next";
import { PageHero } from "@/components/page-shell";
import { business } from "@/lib/site-data";
import { BUSINESS } from "@/lib/constants";

const title = "Privacy Policy | Ganpati Lifecare";
const description =
  "How Ganpati Lifecare handles information submitted through product and wholesale inquiries.";
const canonicalUrl = `${BUSINESS.siteUrl}/privacy-policy`;

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: { canonical: canonicalUrl },
  openGraph: { title, description, url: canonicalUrl, type: "website" },
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <PageHero
        eyebrow="INFORMATION"
        title="Privacy policy"
        summary="How information provided to Ganpati Lifecare through website inquiries is handled."
        breadcrumbs={[{ label: "Privacy Policy" }]}
      />
      <article className="page-content">
        <div className="wrap prose">
          <p>
            <strong>Last updated: 2026</strong>
          </p>
          <h2>1. Introduction</h2>
          <p>
            Ganpati Lifecare (GLC) uses information submitted through the website to
            respond to medical, orthopedic and surgical product inquiries.
          </p>
          <h2>2. Information collected</h2>
          <p>
            Information may include your name, telephone number, email address, product
            requirements, quantities and delivery location when you choose to provide
            them.
          </p>
          <h2>3. Use of information</h2>
          <p>
            Information is used to respond to product availability requests, provide
            quotations, coordinate wholesale orders and communicate about delivery
            arrangements.
          </p>
          <h2>4. WhatsApp and email</h2>
          <p>
            If you choose WhatsApp or email, your message and contact details are sent
            through the relevant service to communicate with Ganpati Lifecare. This website
            does not sell inquiry information to advertisers.
          </p>
          <h2>5. Contact</h2>
          <p>
            For questions about an inquiry, contact {business.name}, Mandi Goluwala,
            Hanumangarh, Rajasthan at{" "}
            <a href={`mailto:${business.email}`}>{business.email}</a> or{" "}
            <a href={`tel:${business.phoneRaw}`}>{business.phone}</a>.
          </p>
        </div>
      </article>
    </main>
  );
}
