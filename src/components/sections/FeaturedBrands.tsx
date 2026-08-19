"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { BRANDS, FEATURED_CAROUSEL } from "@/lib/data";

export function FeaturedBrands() {
  // Seamless loop without duplicate text in the initial set
  const items = [...FEATURED_CAROUSEL, ...FEATURED_CAROUSEL];

  return (
    <section className="overflow-hidden bg-background py-10 md:py-16" aria-label="Featured products">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Featured"
          title="Popular Medical Supplies"
          description="High-demand orthopedic, surgical, and hospital products supplied across Rajasthan and North India."
        />
        <div className="mt-8 overflow-hidden">
          <ul className="animate-marquee flex w-max gap-3 md:gap-4">
            {items.map((name, i) => (
              <li
                key={`${name}-${i}`}
                className="list-none shrink-0 rounded-xl border border-medical/15 bg-card px-4 py-2 text-xs font-medium text-medical shadow-sm md:px-6 md:py-4 md:text-sm"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
        <ul className="mt-8 flex flex-wrap justify-center gap-3 md:gap-6">
          {BRANDS.map((brand) => (
            <li
              key={brand}
              className="list-none rounded-lg bg-medical/5 px-3 py-1.5 text-xs font-display font-semibold text-medical-dark dark:text-medical-light md:px-6 md:py-3 md:text-sm"
            >
              {brand}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
