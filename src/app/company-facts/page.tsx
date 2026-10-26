import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { BUSINESS, WHATSAPP_MESSAGES, getWhatsAppInquiryUrl } from "@/lib/constants";
import { getBreadcrumbSchema, getBusinessSchema, getFaqSchema } from "@/lib/schema";
import { BRAND_FAQS } from "@/lib/data";
import { DISAMBIGUATION_LINE, OPERATING_HOURS, FOUNDING_DATE } from "@/lib/site";

const title = "Ganpati Lifecare Company Facts | Hanumangarh Medical Supplier";
const description =
  "Official fact sheet for Ganpati Lifecare (GLC), medical & surgical supplies wholesaler in Goluwala, Hanumangarh, Rajasthan. Owner, address, products, GSTIN.";
const canonicalUrl = `${BUSINESS.siteUrl}/company-facts`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl },
  openGraph: { title, description, url: canonicalUrl, type: "website" },
};

export default function CompanyFactsPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: BUSINESS.siteUrl },
    { name: "Company Facts", url: canonicalUrl },
  ]);

  const companyFactsPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#companyFacts`,
    name: title,
    description,
    url: canonicalUrl,
    mainEntity: {
      "@id": `${BUSINESS.siteUrl}/#business`,
    },
  };

  const faqSchema = getFaqSchema(BRAND_FAQS);

  const whatsappUrl = getWhatsAppInquiryUrl(WHATSAPP_MESSAGES.general);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBusinessSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(companyFactsPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main className="min-h-screen bg-background">

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#EDF5EF]/60 py-16 sm:py-24 border-b border-[#D7E5DA]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-2 text-xs text-[#68766D]">
              <Link href="/" className="hover:text-[#174C38] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="font-semibold text-[#18352A]">Company Facts</span>
            </nav>
            <span className="inline-block rounded-full bg-[#EDF5EF] border border-[#D7E5DA] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#174C38] mb-4">
              Official Fact Sheet
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#18352A] tracking-tight">
              Ganpati Lifecare — Company Facts
            </h1>
            <p className="mt-4 text-base md:text-lg text-[#46554C] max-w-2xl mx-auto leading-relaxed" data-speakable="true">
              Ganpati Lifecare (GLC) is an independently owned medical, surgical, and orthopedic supplies wholesaler in Goluwala, Hanumangarh, Rajasthan, managed by Dharampal Verma. This page is the official, authoritative source of facts about our business.
            </p>
          </div>
        </section>

        {/* Fact Sheet Table */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-white p-6 sm:p-10 shadow-xs border border-[#D7E5DA]">
              <h2 className="font-display text-2xl font-bold text-[#18352A] mb-6">Business Information</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-[#D7E5DA]">
                    <tr>
                      <td className="py-3 pr-4 font-semibold text-[#18352A] whitespace-nowrap w-1/3">Brand Name</td>
                      <td className="py-3 text-[#46554C]">Ganpati Lifecare (GLC)</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-semibold text-[#18352A] whitespace-nowrap">Legal / Trade Name</td>
                      <td className="py-3 text-[#46554C]">
                        {BUSINESS.legalName}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-semibold text-[#18352A] whitespace-nowrap">Owner / Manager</td>
                      <td className="py-3 text-[#46554C]">{BUSINESS.owner}</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-semibold text-[#18352A] whitespace-nowrap">Business Address</td>
                      <td className="py-3 text-[#46554C]">{BUSINESS.location}</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-semibold text-[#18352A] whitespace-nowrap">District / State</td>
                      <td className="py-3 text-[#46554C]">Hanumangarh, Rajasthan, India</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-semibold text-[#18352A] whitespace-nowrap">PIN Code</td>
                      <td className="py-3 text-[#46554C]">
                        {BUSINESS.address.postalCode}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-semibold text-[#18352A] whitespace-nowrap">Phone Numbers</td>
                      <td className="py-3 text-[#46554C]">
                        <a href={`tel:${BUSINESS.phones[0]}`} className="text-[#174C38] hover:underline font-medium">{BUSINESS.phoneDisplay[0]}</a>
                        {", "}
                        <a href={`tel:${BUSINESS.phones[1]}`} className="text-[#174C38] hover:underline font-medium">{BUSINESS.phoneDisplay[1]}</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-semibold text-[#18352A] whitespace-nowrap">WhatsApp</td>
                      <td className="py-3 text-[#46554C]">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#174C38] hover:underline font-medium"
                        >
                          +91 98282 32254
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-semibold text-[#18352A] whitespace-nowrap">Email</td>
                      <td className="py-3 text-[#46554C]">
                        <a href={`mailto:${BUSINESS.email}`} className="text-[#174C38] hover:underline">{BUSINESS.email}</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-semibold text-[#18352A] whitespace-nowrap">Website</td>
                      <td className="py-3 text-[#46554C]">
                        <a href={BUSINESS.siteUrl} className="text-[#174C38] hover:underline">www.ganpatilifecare.com</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-semibold text-[#18352A] whitespace-nowrap">GSTIN</td>
                      <td className="py-3 font-mono font-bold text-[#174C38]">{BUSINESS.gstin} (State Code: 08, Rajasthan)</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-semibold text-[#18352A] whitespace-nowrap">Founded</td>
                      <td className="py-3 text-[#46554C]">
                        {FOUNDING_DATE === "TODO_CONFIRM_WITH_OWNER"
                          ? <span className="italic text-[#68766D]">Founding year to be confirmed by owner</span>
                          : FOUNDING_DATE}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-semibold text-[#18352A] whitespace-nowrap">Operating Hours</td>
                      <td className="py-3 text-[#46554C]">
                        {OPERATING_HOURS}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-semibold text-[#18352A] whitespace-nowrap">Business Type</td>
                      <td className="py-3 text-[#46554C]">Manufacturer &amp; Wholesale Supplier</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-semibold text-[#18352A] whitespace-nowrap">Product Categories</td>
                      <td className="py-3 text-[#46554C]">
                        <Link href="/categories/orthopedic" className="text-[#174C38] hover:underline">Orthopedic Supplies</Link>{", "}
                        <Link href="/categories/surgical" className="text-[#174C38] hover:underline">Surgical Supplies</Link>{", "}
                        <Link href="/categories/hospital-uniforms" className="text-[#174C38] hover:underline">Hospital Uniforms</Link>{", "}
                        <Link href="/categories/healthcare-essentials" className="text-[#174C38] hover:underline">Healthcare Essentials</Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-semibold text-[#18352A] whitespace-nowrap">Key Products</td>
                      <td className="py-3 text-[#46554C]">
                        Orthocot Cotton Roll, Stockinet, Skin Traction Kit, Gamjee Roll, Sponge Pad, Crepe Bandage, Orthopedic Gauze, Surgical Dressing Materials, Doctor Coats, Nurse Uniforms, OT Dresses, Staff Uniforms, Medical Disposables, Hospital Consumables
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-semibold text-[#18352A] whitespace-nowrap">Own Brand</td>
                      <td className="py-3 text-[#46554C]">White Rose Brand (Orthocot Cotton Roll, Ortho Active Crepe Bandage)</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-semibold text-[#18352A] whitespace-nowrap">Service Area</td>
                      <td className="py-3 text-[#46554C]">
                        Hanumangarh, Sri Ganganagar, Suratgarh, Pilibanga, Sangaria, Bhadra, Bikaner, Nohar, Rawatsar — and across Rajasthan
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-semibold text-[#18352A] whitespace-nowrap">Order Process</td>
                      <td className="py-3 text-[#46554C]">
                        Quote-based. Contact via phone, WhatsApp, or the{" "}
                        <Link href="/contact" className="text-[#174C38] hover:underline">online inquiry form</Link> for product specifications and wholesale pricing.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Disambiguation Section */}
        <section className="py-8 sm:py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-[#EDF5EF] p-6 sm:p-10 border border-[#D7E5DA]">
              <h2 className="font-display text-xl font-bold text-[#18352A] mb-4">Entity Disambiguation</h2>
              <p className="text-sm leading-relaxed text-[#46554C]">
                {DISAMBIGUATION_LINE}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#46554C]">
                If you have found information about a company named &ldquo;Ganpati Life Care&rdquo; located in Delhi, Gurgaon, or elsewhere, that business is a separate and unrelated entity. This website (<strong>www.ganpatilifecare.com</strong>) represents only Ganpati Lifecare based in Goluwala, Hanumangarh, Rajasthan.
              </p>
            </div>
          </div>
        </section>

        {/* Brand FAQ Section */}
        <section className="py-8 sm:py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-white p-6 sm:p-10 shadow-xs border border-[#D7E5DA]">
              <h2 className="font-display text-2xl font-bold text-[#18352A] mb-6">Frequently Asked Questions About Ganpati Lifecare</h2>
              <div className="space-y-6">
                {BRAND_FAQS.map((faq, i) => (
                  <div key={i} className="border-b border-[#D7E5DA] pb-5 last:border-b-0 last:pb-0">
                    <h3 className="font-display text-base font-bold text-[#18352A] mb-2">{faq.question}</h3>
                    <p className="text-sm leading-relaxed text-[#46554C]">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-8 sm:py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#174C38] px-8 py-3.5 text-sm font-semibold text-white shadow-xs hover:bg-[#236747] transition-all hover:-translate-y-0.5"
              >
                Contact Us
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#D7E5DA] px-8 py-3.5 text-sm font-semibold text-[#18352A] shadow-xs hover:bg-[#F7F8F5] transition-all hover:-translate-y-0.5"
              >
                View Product Catalog →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
