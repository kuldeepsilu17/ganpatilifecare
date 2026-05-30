import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { BUSINESS } from "@/lib/constants";

export function DistributorPartnership() {
  return (
    <section className="bg-medical-dark py-20 text-white md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <AnimateIn>
            <SectionHeading
              light
              eyebrow="Partnership"
              title="Distributor & Bulk Partnership"
              description="Partner with GLC for orthopedic, surgical, and hospital consumables across Rajasthan and North India."
            />
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <ul className="space-y-4 text-white/90">
              <li className="flex gap-3">
                <span className="text-gold">●</span>
                Exclusive distributor opportunities in Hanumangarh region
              </li>
              <li className="flex gap-3">
                <span className="text-gold">●</span>
                Competitive wholesale pricing on cotton rolls & uniforms
              </li>
              <li className="flex gap-3">
                <span className="text-gold">●</span>
                Reliable supply chain and timely delivery support
              </li>
            </ul>
            <a
              href={`mailto:${BUSINESS.email}?subject=Distributor Partnership Inquiry`}
              className="mt-8 inline-flex rounded-full bg-gold px-6 py-3 font-semibold text-medical-dark transition hover:bg-gold-dark"
            >
              Become a Partner
            </a>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
