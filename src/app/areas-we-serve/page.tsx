import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { BUSINESS } from "@/lib/constants";
import { LOCATIONS } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Medical & Surgical Supplies Across North Rajasthan | Ganpati Lifecare",
  description: "Ganpati Lifecare serves Hanumangarh, Shri Ganganagar, and the broader North Rajasthan region with premium orthopedic and surgical supplies.",
  alternates: {
    canonical: `${BUSINESS.siteUrl}/areas-we-serve`,
  },
  openGraph: {
    title: "Medical & Surgical Supplies Across North Rajasthan | Ganpati Lifecare",
    description: "Ganpati Lifecare serves Hanumangarh, Shri Ganganagar, and the broader North Rajasthan region with premium orthopedic and surgical supplies.",
    url: `${BUSINESS.siteUrl}/areas-we-serve`,
    type: "website",
  },
};

export default function AreasWeServePage() {
  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen py-12 md:py-20 text-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-medical/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-medical mb-4">
              Regional Service Network
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Areas We Serve
            </h1>
            <p className="mt-4 text-base sm:text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Ganpati Lifecare is a trusted wholesale distributor of orthopedic products, surgical dressings, and hospital uniforms for clinics, nursing homes, and hospitals across North Rajasthan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LOCATIONS.map((loc) => (
              <Link 
                key={loc.slug} 
                href={`/locations/${loc.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-medical/15 bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-medical/30"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <svg className="h-16 w-16 text-medical" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                
                <h2 className="font-display text-xl font-bold text-foreground group-hover:text-medical transition-colors">
                  {loc.city}
                </h2>
                <div className="mt-2 text-xs font-semibold text-medical uppercase tracking-wider">
                  {loc.region}
                </div>
                <p className="mt-4 text-sm text-foreground/80 leading-relaxed line-clamp-3">
                  {loc.description}
                </p>
                <div className="mt-6 flex items-center text-xs font-bold text-brand-orange">
                  Explore supplies for {loc.city} <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 rounded-3xl bg-medical/5 p-8 text-center border border-medical/10">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Don&apos;t see your location?
            </h2>
            <p className="text-foreground/80 mb-6 max-w-xl mx-auto">
              We frequently dispatch bulk orders to other nearby areas in Rajasthan and surrounding states. Contact us directly to confirm delivery availability for your hospital or clinic.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-medical px-8 py-3 text-sm font-bold text-white shadow-md hover:bg-medical-dark transition-colors"
            >
              Contact Our Sales Team
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
