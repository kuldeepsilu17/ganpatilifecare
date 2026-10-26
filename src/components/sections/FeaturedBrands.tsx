"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { BRANDS, FEATURED_CAROUSEL } from "@/lib/data";

export function FeaturedBrands() {
  return (
    <section className="overflow-hidden bg-white py-12 md:py-18 border-b border-[#D7E5DA]" aria-label="Featured Brands and Popular Medical Supplies">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Our Brands & Range"
          title="Popular Healthcare Supplies"
          description="High-demand orthopedic, surgical, and hospital products supplied to clinics and hospitals across Rajasthan."
        />

        {/* Smooth marquee strip */}
        <div className="mt-8 overflow-hidden py-1">
          <ul className="animate-marquee flex w-max gap-3 md:gap-4">
            {FEATURED_CAROUSEL.map((name, i) => (
              <li
                key={`${name}-${i}`}
                className="list-none shrink-0 rounded-xl border border-[#D7E5DA] bg-[#F7F8F5] px-4 py-2.5 text-xs font-semibold text-[#18352A] shadow-2xs md:px-5 md:py-3 md:text-sm"
              >
                {name}
              </li>
            ))}
            {FEATURED_CAROUSEL.map((name, i) => (
              <li
                key={`${name}-dup-${i}`}
                aria-hidden="true"
                className="list-none shrink-0 rounded-xl border border-[#D7E5DA] bg-[#F7F8F5] px-4 py-2.5 text-xs font-semibold text-[#18352A] shadow-2xs md:px-5 md:py-3 md:text-sm"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>

        {/* Brand Labels */}
        <ul className="mt-8 flex flex-wrap justify-center gap-2.5 sm:gap-4">
          {BRANDS.map((brand) => (
            <li
              key={brand}
              className="list-none rounded-full border border-[#D7E5DA] bg-[#EDF5EF] px-4 py-2 text-xs font-display font-semibold text-[#174C38] md:px-5 md:py-2.5 md:text-sm shadow-2xs"
            >
              {brand}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
