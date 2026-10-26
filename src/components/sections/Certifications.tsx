import { SectionHeading } from "@/components/ui/SectionHeading";
import { CERTIFICATIONS } from "@/lib/data";

export function Certifications() {
  return (
    <section className="border-b border-[#D7E5DA] bg-[#EDF5EF]/50 py-10 md:py-14" aria-label="Quality and Procurement Standards">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Quality Assurance"
          title="Quality &amp; Procurement Standards"
          description="Consistent institutional specifications, clinical-grade packaging, and dedicated hospital supply protocols."
        />
        <ul className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2.5 sm:gap-3.5 max-w-4xl mx-auto">
          {CERTIFICATIONS.map((cert) => (
            <li
              key={cert}
              className="list-none rounded-full border border-[#D7E5DA] bg-white px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-[#174C38] shadow-2xs transition hover:border-[#A7C4AE]"
            >
              <span className="text-[#258653] mr-1.5" aria-hidden="true">✓</span>
              {cert}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
