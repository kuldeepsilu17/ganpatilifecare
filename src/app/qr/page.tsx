import type { Metadata } from "next";
import { PageHero } from "@/components/page-shell";
import { QR_LINKS } from "@/lib/utm";

export const metadata: Metadata = {
  title: "Official QR Codes | Ganpati Lifecare Hanumangarh",
  description:
    "Official downloadable QR codes for Ganpati Lifecare: Google reviews, WhatsApp chat, website catalog, and company fact sheet for packaging & invoices.",
  robots: {
    index: false,
    follow: true,
  },
};

const QR_ITEMS = [
  {
    title: "Google Review QR Code",
    description:
      "Print on delivery boxes, invoices, and payment counters to request genuine customer reviews.",
    url: QR_LINKS.gbpReview,
    badge: "Reputation & SEO",
    note: "Links directly to Google Business Profile review prompt.",
  },
  {
    title: "Direct WhatsApp Ordering QR",
    description:
      "Print on product packaging so hospital procurement staff can reorder directly via WhatsApp in 1 scan.",
    url: QR_LINKS.whatsappGeneral,
    badge: "Direct Reorders",
    note: "Opens pre-filled WhatsApp chat with Ganpati Lifecare.",
  },
  {
    title: "Full Website & Catalog QR",
    description:
      "For visiting cards, promotional flyers, brochures, and exhibition materials.",
    url: QR_LINKS.websiteHome,
    badge: "Visiting Cards",
    note: "Takes buyers directly to the complete product range.",
  },
  {
    title: "Company Facts & Disambiguation QR",
    description:
      "For formal corporate communications, GST verification, and trade references.",
    url: QR_LINKS.companyFacts,
    badge: "Corporate & GST",
    note: "Links to verified legal facts and ownership info.",
  },
];

export default function QRPage() {
  return (
    <main>
      <PageHero
        eyebrow="PRINT &amp; PACKAGING ASSETS"
        title="Official QR codes for print &amp; invoices"
        summary="High-resolution, dynamic QR codes linked to live landing pages with UTM tracking. Designed for invoices, packaging labels, and visiting cards."
        breadcrumbs={[{ label: "QR Codes" }]}
      />

      <section className="page-content">
        <div className="wrap content-cards">
          {QR_ITEMS.map((item) => (
            <article className="content-card" key={item.title}>
              <span className="pill-label">{item.badge}</span>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <p>
                <small style={{ color: "var(--muted)" }}>{item.note}</small>
              </p>
              <div style={{ marginTop: "14px" }}>
                <a
                  className="button button-green"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Test destination link &rarr;
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
