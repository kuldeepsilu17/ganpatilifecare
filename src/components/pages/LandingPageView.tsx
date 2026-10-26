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
        <section className="bg-[#EDF5EF]/60 py-14 sm:py-20 border-b border-[#D7E5DA]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs text-[#68766D]">
              <Link href="/" className="hover:text-[#174C38] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="font-semibold text-[#18352A]">{data.eyebrow}</span>
            </nav>
            <span className="inline-block rounded-full bg-[#EDF5EF] border border-[#D7E5DA] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#174C38] mb-3">
              {data.eyebrow}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#18352A] tracking-tight leading-tight">
              {data.h1}
            </h1>

            {/* Direct 40-60 Word Answer Block */}
            <div className="mt-6 rounded-2xl bg-white p-6 sm:p-7 border border-[#D7E5DA] shadow-xs">
              <p className="text-sm sm:text-base leading-relaxed text-[#46554C] font-medium">
                {data.tldr}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#68766D]">
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
                className="inline-flex items-center gap-2 rounded-full bg-[#258653] px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-[#174C38] transition"
              >
                Request Wholesale Price List via WhatsApp &rarr;
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#174C38] px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-[#236747] transition"
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
              <h2 className="font-display text-2xl font-bold text-[#18352A] mb-4">
                Regional Supply Network &amp; Manufacturing
              </h2>
              <p className="text-base leading-relaxed text-[#46554C]">
                {data.intro}
              </p>
            </div>

            {/* Specifications */}
            <div>
              <h2 className="font-display text-2xl font-bold text-[#18352A] mb-4">
                Technical Specifications &amp; Supply Details
              </h2>
              <div className="rounded-2xl border border-[#D7E5DA] overflow-hidden bg-white">
                <table className="w-full text-xs sm:text-sm text-left">
                  <tbody className="divide-y divide-[#D7E5DA]">
                    {data.specTable.map((spec, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-[#F7F8F5]" : "bg-white"}>
                        <td className="px-5 py-3.5 font-bold text-[#18352A] w-1/3">
                          {spec.label}
                        </td>
                        <td className="px-5 py-3.5 text-[#46554C]">
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
              <h2 className="font-display text-2xl font-bold text-[#18352A] mb-4">
                Key Advantages of Sourcing from Ganpati Lifecare
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.keyBenefits.map((b, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white border border-[#D7E5DA] shadow-xs flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EDF5EF] text-[#258653] font-bold text-xs">
                      ✓
                    </span>
                    <p className="text-xs sm:text-sm text-[#46554C] leading-relaxed">
                      {b}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Buying Guide & Target Facilities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-2xl bg-white p-6 sm:p-8 border border-[#D7E5DA] shadow-xs">
                <h3 className="font-display text-xl font-bold text-[#18352A] mb-4">
                  Procurement &amp; Sourcing Guide
                </h3>
                <ul className="space-y-3">
                  {data.buyingGuide.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#46554C]">
                      <span className="text-[#258653] font-bold font-mono">{i + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-white p-6 sm:p-8 border border-[#D7E5DA] shadow-xs">
                <h3 className="font-display text-xl font-bold text-[#18352A] mb-4">
                  Who We Supply
                </h3>
                <ul className="space-y-3">
                  {data.targetAudience.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#46554C]">
                      <span className="text-[#258653] font-bold">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* FAQs */}
            {data.faqs.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-[#18352A] mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {data.faqs.map((faq, i) => (
                    <div key={i} className="rounded-2xl bg-white p-5 sm:p-6 border border-[#D7E5DA] shadow-xs">
                      <h3 className="font-bold text-[#18352A] text-sm sm:text-base">
                        {faq.question}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-[#46554C] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Box */}
            <div className="rounded-2xl bg-[#174C38] p-8 sm:p-10 text-white text-center">
              <h2 className="font-display text-2xl sm:text-3xl font-bold">
                Get a Direct Factory Quote Today
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-[#D6E4DA] max-w-xl mx-auto leading-relaxed">
                Contact Dharampal Verma at Ganpati Lifecare for itemized pricing, master carton rates, and rapid delivery across Rajasthan.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white px-8 py-3.5 text-xs sm:text-sm font-semibold text-[#174C38] shadow-xs hover:bg-[#EDF5EF] transition"
                >
                  WhatsApp Inquiry Desk
                </a>
                <Link
                  href={data.primaryProductUrl}
                  className="rounded-full bg-white/10 border border-white/20 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-white hover:text-[#174C38] transition"
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
