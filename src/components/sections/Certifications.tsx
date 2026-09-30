import { SectionHeading } from "@/components/ui/SectionHeading";
import { CERTIFICATIONS } from "@/lib/data";

export function Certifications() {
  return (
    <section className="border-y border-medical/10 bg-card py-10 md:py-12" aria-label="Certifications">
      <div className="mx-auto max-w-7xl px-3.5 sm:px-4 md:px-6">
        <SectionHeading
          eyebrow="Quality Assurance"
          title="Quality & Procurement Standards"
        />
        <ul className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2.5 sm:gap-4">
          {CERTIFICATIONS.map((cert) => (
            <li
              key={cert}
              className="list-none rounded-full border border-medical/20 bg-background px-4 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm font-medium text-medical"
            >
              ✓ {cert}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
