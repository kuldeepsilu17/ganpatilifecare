import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Contact } from "@/components/sections/Contact";
import { RequestQuote } from "@/components/sections/RequestQuote";
import { BUSINESS, WHATSAPP_MESSAGES, getWhatsAppInquiryUrl } from "@/lib/constants";
import { getBreadcrumbSchema, getLocalBusinessSchema } from "@/lib/schema";

const title = "Contact Ganpati Lifecare | Medical Supplies Hanumangarh";
const description =
  "Contact Ganpati Lifecare, managed by Dharampal Verma in Mandi Goluwala, Hanumangarh, Rajasthan. Request wholesale quotes for orthopedic & hospital supplies.";
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
        <section className="relative overflow-hidden bg-[#EDF5EF]/50 py-14 sm:py-20 border-b border-[#D7E5DA]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs text-muted">
              <Link href="/" className="hover:text-[#174C38] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="font-semibold text-foreground">Contact Us</span>
            </nav>
            <span className="inline-block rounded-full bg-[#EDF5EF] px-3.5 py-1 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#174C38] mb-4 border border-[#D7E5DA]">
              Get in Touch
            </span>
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Contact Ganpati Lifecare
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Reach out directly to Ganpati Lifecare (managed by <strong>Dharampal Verma</strong>) for bulk orders, hospital supply inquiries, and price quotations across Rajasthan.
            </p>
          </div>
        </section>

        {/* Quick Contact Cards */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="rounded-2xl border border-[#D7E5DA] bg-white p-6 shadow-2xs text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-[#EDF5EF] flex items-center justify-center text-[#174C38] text-xl font-bold mb-4 border border-[#D7E5DA]">
                  📞
                </div>
                <h2 className="font-display text-lg font-bold text-foreground mb-2">Phone &amp; Management</h2>
                <p className="text-xs text-muted mb-3">Managed by {BUSINESS.owner}</p>
                {BUSINESS.phoneDisplay.map((phone, idx) => (
                  <div key={idx} className="mb-1">
                    <a
                      href={`tel:${BUSINESS.phones[idx]}`}
                      className="font-semibold text-[#174C38] hover:underline text-sm sm:text-base"
                    >
                      {phone}
                    </a>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-[#D7E5DA] bg-white p-6 shadow-2xs text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-[#EDF5EF] flex items-center justify-center text-[#258653] text-xl font-bold mb-4 border border-[#D7E5DA]">
                  💬
                </div>
                <h2 className="font-display text-lg font-bold text-foreground mb-2">WhatsApp Inquiry</h2>
                <p className="text-xs text-muted mb-3">Instant quotations &amp; order updates</p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#258653] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-2xs hover:bg-[#174C38] transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </div>

              <div className="rounded-2xl border border-[#D7E5DA] bg-white p-6 shadow-2xs text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-[#EDF5EF] flex items-center justify-center text-[#174C38] text-xl font-bold mb-4 border border-[#D7E5DA]">
                  📍
                </div>
                <h2 className="font-display text-lg font-bold text-[#18352A] mb-2">Business Location</h2>
                <p className="text-sm font-medium text-[#46554C] mb-1">{BUSINESS.location}</p>
                <p className="text-xs text-[#68766D] mb-3">GSTIN: {BUSINESS.gstin}</p>
                <a
                  href={BUSINESS.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center text-xs font-bold text-[#174C38] hover:underline"
                >
                  Get Google Maps Directions →
                </a>
              </div>

              <div className="rounded-2xl border border-[#D7E5DA] bg-white p-6 shadow-2xs text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-[#EDF5EF] flex items-center justify-center text-[#174C38] text-xl font-bold mb-4 border border-[#D7E5DA]">
                  🕒
                </div>
                <h2 className="font-display text-lg font-bold text-foreground mb-2">Operating Hours</h2>
                <p className="text-sm font-medium text-foreground mb-1">Mon – Sat: 9:00 AM – 8:00 PM</p>
                <p className="text-xs text-muted mb-3">Sunday: By Prior Appointment</p>
                <span className="text-[11px] font-semibold text-[#174C38] bg-[#EDF5EF] px-2.5 py-1 rounded-full inline-block border border-[#D7E5DA]">
                  Rapid Freight Dispatch
                </span>
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
