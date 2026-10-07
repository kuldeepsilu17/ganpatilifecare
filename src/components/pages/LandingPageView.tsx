import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { LandingPageData } from "@/lib/landing-pages";
import { BUSINESS, getWhatsAppInquiryUrl } from "@/lib/constants";
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

  const whatsappMessage = `Hello Ganpati Lifecare, I am interested in wholesale quotation for ${data.primaryProductName}. Please send pricing and MOQ details.`;
  const whatsappUrl = getWhatsAppInquiryUrl(whatsappMessage);

  return (
    <>
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
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-medical/5 py-14 sm:py-20 border-b border-medical/10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs text-muted">
              <Link href="/" className="hover:text-medical">
                Home
              </Link>
              <span>/</span>
              <span className="font-semibold text-foreground">{data.eyebrow}</span>
            </nav>
            <span className="inline-block rounded-full bg-medical/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-medical mb-3">
              {data.eyebrow}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              {data.h1}
            </h1>

            {/* Direct 40-60 Word Answer Block */}
            <div className="mt-6 rounded-2xl bg-card p-6 sm:p-7 border border-medical/25 shadow-xs">
              <p className="text-sm sm:text-base leading-relaxed text-foreground font-medium">
                {data.tldr}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted">
                <span>📍 Dispatch: Mandi Goluwala, Hanumangarh</span>
                <span>•</span>
                <span>👨‍💼 Managed by Dharampal Verma</span>
                <span>•</span>
                <span>📄 GSTIN: {BUSINESS.gstin}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition"
              >
                Request Wholesale Price List via WhatsApp &rarr;
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-medical px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-medical-dark transition"
              >
                Send Direct RFQ
              </Link>
            </div>
          </div>
        </section>

        {/* Content Details */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Overview */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Regional Supply Network &amp; Manufacturing
              </h2>
              <p className="text-base leading-relaxed text-foreground/80">
                {data.intro}
              </p>
            </div>

            {/* Specifications */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Technical Specifications &amp; Supply Details
              </h2>
              <div className="rounded-2xl border border-medical/15 overflow-hidden bg-card">
                <table className="w-full text-xs sm:text-sm text-left">
                  <tbody className="divide-y divide-medical/10">
                    {data.specTable.map((spec, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-medical/5" : "bg-card"}>
                        <td className="px-5 py-3.5 font-bold text-foreground w-1/3">
                          {spec.label}
                        </td>
                        <td className="px-5 py-3.5 text-foreground/80">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Benefits */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Key Advantages of Sourcing from Ganpati Lifecare
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.keyBenefits.map((b, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-card border border-medical/15 shadow-2xs flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-medical/10 text-medical font-bold text-xs">
                      ✓
                    </span>
                    <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed">
                      {b}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Buying Guide & Target Facilities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-3xl bg-card p-6 sm:p-8 border border-medical/15">
                <h3 className="font-display text-xl font-bold text-foreground mb-4">
                  Procurement &amp; Sourcing Guide
                </h3>
                <ul className="space-y-3">
                  {data.buyingGuide.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-foreground/80">
                      <span className="text-brand-orange font-bold font-mono">{i + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl bg-card p-6 sm:p-8 border border-medical/15">
                <h3 className="font-display text-xl font-bold text-foreground mb-4">
                  Who We Supply
                </h3>
                <ul className="space-y-3">
                  {data.targetAudience.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-foreground/80">
                      <span className="text-medical font-bold">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* FAQs */}
            {data.faqs.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {data.faqs.map((faq, i) => (
                    <div key={i} className="rounded-2xl bg-card p-5 sm:p-6 border border-medical/15">
                      <h3 className="font-bold text-foreground text-sm sm:text-base">
                        {faq.question}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-foreground/80 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Box */}
            <div className="rounded-3xl bg-gradient-to-br from-medical to-medical-dark p-8 sm:p-10 text-white text-center">
              <h2 className="font-display text-2xl sm:text-3xl font-bold">
                Get a Direct Factory Quote Today
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-white/90 max-w-xl mx-auto leading-relaxed">
                Contact Dharampal Verma at Ganpati Lifecare for itemized pricing, master carton rates, and rapid delivery across Rajasthan.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-brand-orange px-8 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-brand-orange-dark transition"
                >
                  WhatsApp Inquiry Desk
                </a>
                <Link
                  href={data.primaryProductUrl}
                  className="rounded-full bg-white/20 border border-white/40 px-6 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white hover:text-medical transition"
                >
                  View Product Page &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
