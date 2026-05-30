import { SectionHeading } from "@/components/ui/SectionHeading";
import { CERTIFICATIONS } from "@/lib/data";

export function Certifications() {
  return (
    <section className="border-y border-medical/10 bg-card py-12" aria-label="Certifications">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Quality Assurance"
          title="Certifications & Standards"
        />
        <ul className="mt-8 flex flex-wrap justify-center gap-4">
          {CERTIFICATIONS.map((cert) => (
            <li
              key={cert}
              className="list-none rounded-full border border-medical/20 bg-background px-5 py-2.5 text-sm font-medium text-medical"
            >
              ✓ {cert}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
