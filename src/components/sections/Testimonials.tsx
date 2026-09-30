import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { TESTIMONIALS } from "@/lib/data";

export function Testimonials() {
  return (
    <section id="testimonials" className="gradient-green-soft py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Clients Say"
          description="Trusted by hospitals, clinics, and healthcare professionals across Rajasthan."
        />
        <ul className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <AnimateIn key={t.author} delay={i * 0.1}>
              <li className="list-none flex h-full flex-col rounded-2xl bg-card p-5 sm:p-6 md:p-8 shadow-md hover:shadow-lg transition border border-medical/10">
                <p className="text-sm sm:text-base italic text-foreground/90 break-words leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-auto pt-4 border-t border-medical/10">
                  <p className="text-sm sm:text-base font-semibold text-medical leading-snug">{t.author}</p>
                  <p className="text-xs text-muted mt-0.5">{t.location}</p>
                </div>
              </li>
            </AnimateIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
