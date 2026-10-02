import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Contact } from "@/components/sections/Contact";
import { RequestQuote } from "@/components/sections/RequestQuote";
import { BUSINESS, WHATSAPP_MESSAGES, getWhatsAppInquiryUrl } from "@/lib/constants";
import { getBreadcrumbSchema, getLocalBusinessSchema } from "@/lib/schema";

const title = "Contact Ganpati Lifecare | Dharampal Verma | Goluwala, Hanumangarh";
const description =
  "Contact Ganpati Lifecare and owner Dharampal Verma in Goluwala, Hanumangarh, Rajasthan. Request quotations for orthopedic, surgical, and hospital consumables.";
const canonicalUrl = `${BUSINESS.siteUrl}/contact`;

export const metadata: Metadata = {
  title,
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

  const whatsappUrl = getWhatsAppInquiryUrl(WHATSAPP_MESSAGES.general);

  return (
    <>
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
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header Banner */}
        <section className="relative overflow-hidden bg-medical/5 py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs text-muted">
              <Link href="/" className="hover:text-medical transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="font-semibold text-foreground">Contact Us</span>
            </nav>
            <span className="inline-block rounded-full bg-medical/10 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-medical mb-4">
              Get in Touch
            </span>
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Contact Ganpati Lifecare
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Reach out directly to owner <strong>Dharampal Verma</strong> for bulk orders, hospital supply inquiries, and price quotations across Rajasthan.
            </p>
          </div>
        </section>

        {/* Quick Contact Cards */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="rounded-2xl border border-medical/15 bg-card p-6 shadow-sm text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-medical/10 flex items-center justify-center text-medical text-xl font-bold mb-4">
                  📞
                </div>
                <h2 className="font-display text-lg font-bold text-foreground mb-2">Phone &amp; Owner</h2>
                <p className="text-xs text-muted mb-3">{BUSINESS.owner} (Founder &amp; Owner)</p>
                {BUSINESS.phoneDisplay.map((phone, idx) => (
                  <div key={idx} className="mb-1">
                    <a
                      href={`tel:${BUSINESS.phones[idx]}`}
                      className="font-semibold text-medical hover:underline text-sm sm:text-base"
                    >
                      {phone}
                    </a>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-medical/15 bg-card p-6 shadow-sm text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] text-xl font-bold mb-4">
                  💬
                </div>
                <h2 className="font-display text-lg font-bold text-foreground mb-2">WhatsApp Inquiry</h2>
                <p className="text-xs text-muted mb-3">Instant quotations &amp; order updates</p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#1fb855] transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </div>

              <div className="rounded-2xl border border-medical/15 bg-card p-6 shadow-sm text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange text-xl font-bold mb-4">
                  📍
                </div>
                <h2 className="font-display text-lg font-bold text-foreground mb-2">Business Location</h2>
                <p className="text-sm font-medium text-foreground mb-1">{BUSINESS.location}</p>
                <p className="text-xs text-muted mb-3">Postal Code: {BUSINESS.address.postalCode}</p>
                <a
                  href={BUSINESS.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center text-xs font-bold text-brand-orange hover:underline"
                >
                  Get Google Maps Directions →
                </a>
              </div>

              <div className="rounded-2xl border border-medical/15 bg-card p-6 shadow-sm text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-medical/10 flex items-center justify-center text-medical text-xl font-bold mb-4">
                  🕒
                </div>
                <h2 className="font-display text-lg font-bold text-foreground mb-2">Operating Hours</h2>
                <p className="text-sm font-medium text-foreground mb-1">Mon – Sat: 9:00 AM – 8:00 PM</p>
                <p className="text-xs text-muted mb-3">Sunday: By Prior Appointment</p>
                <span className="text-[11px] font-semibold text-medical bg-medical/10 px-2.5 py-1 rounded-full inline-block">
                  Rapid Freight Dispatch
                </span>
                {/* TODO_CONFIRM_WITH_OWNER: Confirm exact warehouse operating hours and Sunday emergency dispatch availability */}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <Contact />

        {/* Request Quote Section */}
        <div className="mt-12">
          <RequestQuote />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
