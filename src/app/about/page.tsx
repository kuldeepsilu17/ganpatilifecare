import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { BUSINESS } from "@/lib/constants";
import { getOrganizationSchema, getLocalBusinessSchema, getBreadcrumbSchema } from "@/lib/schema";
import { Products } from "@/components/sections/Products";

const title = "About Ganpati Lifecare | Dharampal Verma | Hanumangarh";
const description =
  "Ganpati Lifecare, managed by Dharampal Verma in Mandi Goluwala, Hanumangarh, Rajasthan: orthopedic supplies, White Rose products & surgical dressings.";
const canonicalUrl = `${BUSINESS.siteUrl}/about`;

export const metadata: Metadata = {
  title,
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
    <>
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
      <Navbar />
      <main className="min-h-screen bg-background">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#EDF5EF]/50 py-14 sm:py-20 border-b border-[#D7E5DA]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-2 text-xs text-muted">
              <Link href="/" className="hover:text-[#174C38] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="font-semibold text-foreground">About Us</span>
            </nav>
            <span className="inline-block rounded-full bg-[#EDF5EF] px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#174C38] mb-4 border border-[#D7E5DA]">
              Our Story
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              About Ganpati Lifecare
            </h1>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-white p-6 sm:p-10 shadow-2xs border border-[#D7E5DA] space-y-8">
              
              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Who is Ganpati Lifecare?</h2>
                <p className="text-base leading-relaxed text-foreground/80">
                  Ganpati Lifecare (GLC) is a dedicated healthcare, orthopedic, and surgical dressing supplies business based in Mandi Goluwala, Hanumangarh, Rajasthan. We specialize as manufacturers and wholesale suppliers of White Rose Brand Ortho Cotton Roll, Orthopaedics, Castroll, and Gauze dressing products, along with hospital consumables and medical supplies for clinics, nursing homes, and hospitals.
                </p>
              </section>

              {/* Entity Disambiguation Note */}
              <div className="rounded-xl bg-[#EDF5EF] border border-[#D7E5DA] p-5 text-sm">
                <p className="font-bold text-[#174C38]">Official Entity Information:</p>
                <p className="mt-1 text-foreground/80 leading-relaxed">
                  Ganpati Lifecare (GLC) in Goluwala, Hanumangarh, Rajasthan is an independently owned business, not affiliated with similarly named companies elsewhere, including in Delhi or Gurgaon. For detailed verified facts, see our <Link href="/company-facts" className="text-[#174C38] font-bold underline">Company Facts Sheet</Link>.
                </p>
              </div>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Business Management &amp; Operations</h2>
                <p className="text-base leading-relaxed text-foreground/80">
                  Ganpati Lifecare is owned and managed by <strong>Dharampal Verma</strong>. Under his active management, Ganpati Lifecare has built a strong reputation for reliability, strict quality standards, and dependable wholesale supply for clinics and hospitals across Rajasthan and North India.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Which areas do we serve?</h2>
                <p className="text-base leading-relaxed text-foreground/80">
                  While our primary manufacturing and distribution base is located in Mandi Goluwala, Hanumangarh, our service network extends across Rajasthan and neighbouring states. We actively supply healthcare facilities in Hanumangarh, Sri Ganganagar, Suratgarh, Bikaner, Nohar, Rawatsar, Pilibanga, Sangaria, and Bhadra. 
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href="/locations" className="text-[#174C38] font-bold hover:underline">
                    View local service hubs &rarr;
                  </Link>
                  <span className="text-muted">•</span>
                  <Link href="/products" className="text-[#174C38] font-bold hover:underline">
                    View product catalog &rarr;
                  </Link>
                </div>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">What products do we supply?</h2>
                <p className="text-base leading-relaxed text-foreground/80 mb-6">
                  Our comprehensive catalog is designed to meet the rigorous demands of modern healthcare environments. We supply everything from everyday medical disposable products and hospital consumables to specialized orthopedic cotton rolls, skin traction kits, and hospital staff uniforms.
                </p>
                <Products />
              </section>

              <section className="pt-6 border-t border-[#D7E5DA]">
                <h2 className="font-display text-xl font-bold text-foreground mb-3">Business Information &amp; Transparency</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="rounded-xl bg-[#F7F8F5] p-4 border border-[#D7E5DA]">
                    <p className="font-bold text-foreground">Official Business Name</p>
                    <p className="text-foreground/80 mt-1">{BUSINESS.legalName}</p>
                  </div>
                  <div className="rounded-xl bg-[#F7F8F5] p-4 border border-[#D7E5DA]">
                    <p className="font-bold text-foreground">GSTIN (Verified)</p>
                    <p className="text-foreground/80 mt-1 font-mono font-bold text-[#174C38]">{BUSINESS.gstin} (State Code: 08)</p>
                  </div>
                  <div className="rounded-xl bg-[#F7F8F5] p-4 border border-[#D7E5DA]">
                    <p className="font-bold text-foreground">Management</p>
                    <p className="text-foreground/80 mt-1">Managed by {BUSINESS.owner}</p>
                  </div>
                  <div className="rounded-xl bg-[#F7F8F5] p-4 border border-[#D7E5DA]">
                    <p className="font-bold text-foreground">Registered Address</p>
                    <p className="text-foreground/80 mt-1">{BUSINESS.address.streetAddress}, {BUSINESS.address.addressLocality} - {BUSINESS.address.postalCode}, Distt. Hanumangarh (Raj.)</p>
                  </div>
                  <div className="rounded-xl bg-[#F7F8F5] p-4 border border-[#D7E5DA] sm:col-span-2">
                    <p className="font-bold text-foreground">Core Product Range</p>
                    <p className="text-foreground/80 mt-1">{BUSINESS.description}</p>
                  </div>
                </div>
              </section>

            </div>
            
            <div className="mt-12 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#174C38] px-8 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-[#236747] transition-all hover:-translate-y-0.5"
              >
                Contact Us Today
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
