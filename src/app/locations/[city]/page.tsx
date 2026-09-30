import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { LOCATIONS } from "@/lib/locations";
import { BUSINESS, WHATSAPP_MESSAGES, getWhatsAppInquiryUrl } from "@/lib/constants";
import { getBreadcrumbSchema, getFaqSchema } from "@/lib/schema";
import { Products } from "@/components/sections/Products";

interface LocationPageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return LOCATIONS.map((loc) => ({
    city: loc.slug,
  }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { city } = await params;
  const location = LOCATIONS.find((loc) => loc.slug === city);

  if (!location) {
    return { title: "Location Not Found | Ganpati Lifecare" };
  }

  const title = location.metaTitle || `Medical & Surgical Supplies in ${location.city}, ${location.region} | Ganpati Lifecare`;
  const description = location.description;
  const canonicalUrl = `${BUSINESS.siteUrl}/locations/${location.slug}`;

  return {
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
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { city } = await params;
  const location = LOCATIONS.find((loc) => loc.slug === city);

  if (!location) {
    notFound();
  }

  const canonicalUrl = `${BUSINESS.siteUrl}/locations/${location.slug}`;
  const whatsappInquiryUrl = getWhatsAppInquiryUrl(
    WHATSAPP_MESSAGES.location(location.city)
  );

  // LocalBusiness / MedicalBusiness Schema
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${canonicalUrl}#localbusiness`,
    name: `Ganpati Lifecare - ${location.city}`,
    description: location.description,
    url: canonicalUrl,
    telephone: [...BUSINESS.phones],
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.streetAddress,
      addressLocality: BUSINESS.address.addressLocality,
      addressRegion: BUSINESS.address.addressRegion,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.addressCountry,
    },
    areaServed: {
      "@type": "City",
      name: location.city,
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Ganpati Lifecare",
      url: BUSINESS.siteUrl,
    },
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: BUSINESS.siteUrl },
    { name: "Locations", url: `${BUSINESS.siteUrl}/locations` },
    { name: location.city, url: canonicalUrl },
  ]);

  const faqSchema = location.faqs && location.faqs.length > 0 ? getFaqSchema(location.faqs) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Localized Hero Section */}
        <section className="relative overflow-hidden bg-medical/5 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">

            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs text-muted">
              <Link href="/" className="hover:text-medical transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/locations" className="hover:text-medical transition-colors">
                Locations
              </Link>
              <span>/</span>
              <span className="font-semibold text-foreground">{location.city}</span>
            </nav>
            <span className="inline-block rounded-full bg-medical/10 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-medical mb-4">
              Healthcare Wholesale Partner
            </span>
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              {location.h1 || `Medical & Surgical Supplies in ${location.city}`}
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              {location.description} We are the preferred wholesale distributor for orthopedic products, surgical dressings, and hospital uniforms in the {location.city} area.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#1fb855] transition-all hover:-translate-y-0.5"
              >
                Order via WhatsApp
              </a>
              <Link
                href="/products"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-white border border-medical/20 px-6 py-3 text-xs sm:text-sm font-bold text-foreground shadow-sm hover:bg-gray-50 transition-all hover:-translate-y-0.5"
              >
                View Full Catalog
              </Link>
            </div>
            
            <div className="mt-10 flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm font-medium text-muted">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-medical text-base sm:text-lg">✓</span>
                Direct Wholesale Prices
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-medical text-base sm:text-lg">✓</span>
                Rapid Delivery to {location.city}
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-medical text-base sm:text-lg">✓</span>
                {location.hospitalCount}
              </div>
            </div>
          </div>
          
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute -top-[10%] -right-[5%] w-[40%] aspect-square rounded-full bg-gradient-to-br from-medical/10 to-transparent blur-3xl" />
            <div className="absolute -bottom-[10%] -left-[5%] w-[30%] aspect-square rounded-full bg-gradient-to-tr from-medical/10 to-transparent blur-3xl" />
          </div>
        </section>

        {/* Localized Healthcare Details */}
        {location.details && (
          <section className="py-12 bg-white">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl border border-medical/15 bg-card p-6 sm:p-10 shadow-xs">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4">
                  Healthcare Supply Infrastructure in {location.city}
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-foreground/80 mb-6">
                  {location.details}
                </p>

                {location.nearbyAreas && location.nearbyAreas.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-medical/10">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">
                      Nearby Hubs &amp; Tehsils Served:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {location.nearbyAreas.map((area, idx) => (
                        <span
                          key={idx}
                          className="inline-block rounded-full bg-medical/10 px-3 py-1 text-xs font-semibold text-medical"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Location FAQs Section */}
        {location.faqs && location.faqs.length > 0 && (
          <section className="py-12 bg-medical/5">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-6 text-center">
                Frequently Asked Questions for {location.city}
              </h2>
              <div className="space-y-4">
                {location.faqs.map((faq, idx) => (
                  <div key={idx} className="rounded-2xl bg-card p-5 sm:p-6 border border-medical/10 shadow-xs">
                    <h3 className="font-bold text-foreground text-sm sm:text-base mb-2">
                      Q: {faq.question}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-foreground/80">
                      A: {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Catalog Section */}
        <div className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 text-center">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Our Products Available in {location.city}
            </h2>
            <p className="mt-2 text-muted text-sm sm:text-base">
              Select a product to view specifications and request a local quote.
            </p>
          </div>
          <Products />
        </div>
        
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
