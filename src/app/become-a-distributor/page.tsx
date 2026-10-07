import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { DistributorPartnership } from "@/components/sections/DistributorPartnership";
import { BUSINESS } from "@/lib/constants";
import { getBreadcrumbSchema, getOrganizationSchema } from "@/lib/schema";

const title = "Become a Medical Supplies Distributor | Ganpati Lifecare";
const description =
  "Partner with Ganpati Lifecare in Hanumangarh. Wholesale distributor opportunities for orthopedic cotton rolls, gamjee rolls, gauze & hospital supplies.";
const canonicalUrl = `${BUSINESS.siteUrl}/become-a-distributor`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl },
  openGraph: { title, description, url: canonicalUrl, type: "website" },
};

export default function BecomeADistributorPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: BUSINESS.siteUrl },
    { name: "Become a Distributor", url: canonicalUrl },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationSchema()) }}
      />
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="bg-medical/5 py-14 sm:py-20 border-b border-medical/10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <nav aria-label="Breadcrumb" className="mb-4 flex items-center justify-center gap-2 text-xs text-muted">
              <Link href="/" className="hover:text-medical">
                Home
              </Link>
              <span>/</span>
              <span className="font-semibold text-foreground">Become a Distributor</span>
            </nav>
            <span className="inline-block rounded-full bg-medical/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-medical mb-3">
              B2B Partnerships
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Distributor &amp; Wholesale Supply Partnership
            </h1>
            <p className="mt-4 text-sm sm:text-base text-muted max-w-2xl mx-auto leading-relaxed">
              Expand your healthcare supply business across Rajasthan, Punjab, and Haryana by becoming an authorized distributor for Ganpati Lifecare products.
            </p>
          </div>
        </section>

        {/* Benefits & Criteria */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="rounded-3xl bg-card p-6 sm:p-8 border border-medical/15 shadow-xs">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-medical/10 text-medical font-bold text-xl mb-4">
                  ₹
                </div>
                <h2 className="font-display text-lg font-bold text-foreground">
                  Direct Factory Pricing
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
                  Earn competitive margins on White Rose Brand Orthocot cotton rolls, POP cast padding, sterile surgical gauze, and staff uniforms.
                </p>
              </div>

              <div className="rounded-3xl bg-card p-6 sm:p-8 border border-medical/15 shadow-xs">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-medical/10 text-medical font-bold text-xl mb-4">
                  ⚡
                </div>
                <h2 className="font-display text-lg font-bold text-foreground">
                  Rapid Dispatch Logistics
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
                  Fast vehicle delivery and reliable courier dispatch from our Mandi Goluwala, Hanumangarh hub across North Rajasthan.
                </p>
              </div>

              <div className="rounded-3xl bg-card p-6 sm:p-8 border border-medical/15 shadow-xs">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-medical/10 text-medical font-bold text-xl mb-4">
                  📋
                </div>
                <h2 className="font-display text-lg font-bold text-foreground">
                  Zero Invoicing Friction
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
                  Verified GST invoicing (State Code 08), batch compliance, and dedicated direct support with management.
                </p>
              </div>
            </div>

            {/* Partnership Requirements */}
            <div className="mt-12 rounded-3xl bg-card p-8 sm:p-10 border border-medical/15">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Who Can Apply as a Ganpati Lifecare Distributor?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-foreground/80">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-medical/5">
                  <span className="text-medical font-bold">✓</span>
                  <span>Medical supply &amp; surgical goods wholesalers with active local transport routes.</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-medical/5">
                  <span className="text-medical font-bold">✓</span>
                  <span>Hospital procurement agencies &amp; institutional healthcare vendors.</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-medical/5">
                  <span className="text-medical font-bold">✓</span>
                  <span>Chemist &amp; druggist distribution firms supplying private clinics &amp; nursing homes.</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-medical/5">
                  <span className="text-medical font-bold">✓</span>
                  <span>Uniform retailers &amp; institutional textile suppliers for medical staff.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Distributor Application Component */}
        <DistributorPartnership />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
