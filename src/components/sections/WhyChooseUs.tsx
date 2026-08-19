import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { WHY_CHOOSE_US } from "@/lib/data";

const icons: Record<string, string> = {
  shield: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  trust: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
  price: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  delivery: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0",
  satisfaction: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  service: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  range: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
};

export function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-card py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Trusted Medical Supplier in Rajasthan"
          description="Premium quality, affordable pricing, and professional service for hospitals and clinics."
        />
        <ul className="mt-10 grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-4">
          {WHY_CHOOSE_US.map((item, i) => (
            <AnimateIn key={item.title} delay={i * 0.05}>
              <li className="list-none flex h-full flex-col rounded-2xl border border-medical/10 bg-background p-3.5 sm:p-5 md:p-6 shadow-sm transition hover:border-medical/30 hover:shadow-md">
                <span className="flex h-9 w-9 md:h-12 md:w-12 items-center justify-center rounded-xl bg-medical/10 text-medical shrink-0">
                  <svg className="h-4.5 w-4.5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icons[item.icon] || icons.shield} />
                  </svg>
                </span>
                <h3 className="mt-3 font-display font-semibold text-sm md:text-base leading-snug break-words">{item.title}</h3>
                <p className="mt-1.5 text-xs md:text-sm leading-normal text-muted">{item.description}</p>
              </li>
            </AnimateIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
