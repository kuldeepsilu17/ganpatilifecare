import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { TESTIMONIALS } from "@/lib/data";

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#F7F8F5] py-12 md:py-20 border-b border-[#D7E5DA]" aria-label="Customer feedback and testimonials">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Healthcare Feedback"
          title="Regional Healthcare Relationships"
          description="Direct order coordination and consistent product availability for hospitals, clinics, and pharmacies in Rajasthan."
        />
        <ul className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <AnimateIn key={t.author} delay={i * 0.08}>
              <li className="list-none flex h-full flex-col rounded-2xl bg-white p-6 sm:p-7 shadow-2xs hover:shadow-xs transition border border-[#D7E5DA] hover:border-[#A7C4AE]">
                <div className="mb-3 text-[#258653]" aria-hidden="true">
                  <svg className="h-6 w-6 fill-current opacity-60" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-sm sm:text-[15px] italic text-[#46554C] break-words leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4 pt-4 border-t border-[#D7E5DA]">
                  <p className="text-sm sm:text-base font-semibold text-[#18352A] leading-snug">{t.author}</p>
                  <p className="text-xs text-[#68766D] mt-0.5">{t.location}</p>
                </div>
              </li>
            </AnimateIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
