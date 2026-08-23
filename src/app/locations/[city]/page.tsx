import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { LOCATIONS } from "@/lib/locations";
import { BUSINESS } from "@/lib/constants";

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

  const title = `Medical & Surgical Supplies in ${location.city}, ${location.region} | Ganpati Lifecare`;
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

  const whatsappInquiryUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
    `Hello Ganpati Lifecare,\n\nI am reaching out from ${location.city}. I am interested in procuring medical supplies for my facility.\n\nPlease share details.`
  )}`;

  // ItemPage Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    name: `Medical Supplies in ${location.city}`,
    description: location.description,
    url: `${BUSINESS.siteUrl}/locations/${location.slug}`,
    mainEntity: {
      "@type": "MedicalBusiness",
      name: "Ganpati Lifecare",
      areaServed: {
        "@type": "City",
        name: location.city
      }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BUSINESS.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Areas We Serve",
        item: `${BUSINESS.siteUrl}/areas-we-serve`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: location.city,
        item: `${BUSINESS.siteUrl}/locations/${location.slug}`,
      },
    ],
  };



  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Localized Hero Section */}
        <section className="relative overflow-hidden bg-medical/5 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">

            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-2 text-xs text-muted">
              <Link href="/" className="hover:text-medical">
                Home
              </Link>
              <span>/</span>
              <Link href="/areas-we-serve" className="hover:text-medical">
                Areas We Serve
              </Link>
              <span>/</span>
              <span className="font-semibold text-foreground">{location.city}</span>
            </nav>
            <span className="inline-block rounded-full bg-medical/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-medical mb-4">
              Authorized Medical Supplier
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Medical &amp; Surgical Supplies in <span className="text-medical">{location.city}</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              {location.description} We are the preferred wholesale distributor for orthopedic products, surgical dressings, and hospital uniforms in the {location.city} area.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#1fb855] transition-all hover:-translate-y-0.5"
              >
                Order via WhatsApp
              </a>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-medical/20 px-6 py-3 text-sm font-bold text-foreground shadow-sm hover:bg-gray-50 transition-all hover:-translate-y-0.5"
              >
                View Catalog
              </Link>
            </div>
            
            <div className="mt-12 flex justify-center items-center gap-8 text-sm font-medium text-muted">
              <div className="flex items-center gap-2">
                <span className="text-medical text-lg">✓</span>
                Direct Wholesale Prices
              </div>
              <div className="flex items-center gap-2">
                <span className="text-medical text-lg">✓</span>
                Rapid Delivery to {location.city}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-medical text-lg">✓</span>
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

        {/* Catalog Section */}
        <div className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 text-center">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Our Products Available in {location.city}
            </h2>
            <p className="mt-2 text-muted">Select a product to view specifications and request a local quote.</p>
          </div>
          <Products />
        </div>
        
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
