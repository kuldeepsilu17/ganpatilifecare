import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Logo } from "@/components/brand/Logo";

export const metadata: Metadata = {
  title: "Page Not Found | Ganpati Lifecare",
  description: "The requested page could not be found. Explore our surgical and healthcare supplies catalog.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  const quickLinks = [
    { href: "/", label: "Homepage", desc: "Return to our main portal" },
    { href: "/products", label: "Products Catalog", desc: "Surgical cotton rolls & dressings" },
    { href: "/categories/orthopedic", label: "Product Categories", desc: "Orthopedic, surgical & uniforms" },
    { href: "/locations", label: "Service Hubs", desc: "Hanumangarh, Ganganagar & Rajasthan" },
    { href: "/company-facts", label: "Company Facts", desc: "Verified business & ownership facts" },
    { href: "/contact", label: "Contact Us", desc: "Direct inquiries & quote requests" },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 sm:py-20 text-center bg-background">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 inline-block rounded-2xl bg-white p-3.5 shadow-xs border border-[#D7E5DA]">
            <Logo variant="mark" priority className="h-14 w-auto" />
          </div>
          
          <span className="inline-block rounded-full bg-[#EDF5EF] border border-[#D7E5DA] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#174C38] mb-3">
            404 Error
          </span>
          
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#18352A] tracking-tight">
            Page Not Found
          </h1>
          
          <p className="mt-3 text-sm sm:text-base text-[#46554C] max-w-md mx-auto leading-relaxed">
            The page you are looking for may have been moved, renamed, or is temporarily unavailable. Browse the essential links below:
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 text-left">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-[#D7E5DA] bg-white p-4 shadow-xs transition-all hover:-translate-y-0.5 hover:border-[#174C38]"
              >
                <span className="font-display text-xs sm:text-sm font-bold text-[#18352A] group-hover:text-[#174C38] block transition-colors">
                  {item.label} →
                </span>
                <span className="mt-1 text-[11px] sm:text-xs text-[#68766D] block">
                  {item.desc}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#174C38] px-8 py-3 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-[#236747] transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
