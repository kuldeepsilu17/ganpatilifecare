import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { BUSINESS } from "@/lib/constants";

export function About() {
  return (
    <section id="about" className="gradient-green-soft py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="About Us"
          title="Quality Products for Better Healthcare"
          description={`${BUSINESS.name} (${BUSINESS.shortName}) — your trusted medical supplier in Hanumangarh, Rajasthan.`}
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <AnimateIn>
            <article className="rounded-3xl bg-card p-8 shadow-xl shadow-medical/5 md:p-10">
              <p className="text-sm md:text-base lg:text-lg leading-relaxed text-foreground/90">
                Ganpati Lifecare (GLC) is a trusted supplier of hospital,
                orthopedic, surgical, and healthcare products based in Goluwala,
                Hanumangarh, Rajasthan. We provide premium quality medical
                essentials including cotton rolls, stockinet, traction kits,
                bandages, OT dresses, doctor uniforms, and more.
              </p>
              <p className="mt-6 text-sm md:text-base lg:text-lg leading-relaxed text-muted">
                Our mission is to deliver reliable healthcare products with
                quality assurance, customer satisfaction, and timely service.
              </p>
            </article>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <aside className="flex h-full flex-col justify-center rounded-3xl border border-medical/20 bg-medical p-8 text-white md:p-10">
              <h3 className="font-display text-2xl font-bold">
                Contact Us for Bulk Orders
              </h3>
              <p className="mt-4 text-white/90">
                Hospitals, clinics, and distributors across Rajasthan and North
                India trust GLC for orthopedic and surgical supplies.
              </p>
              <ul className="mt-6 space-y-3 text-sm font-medium">
                <li>✓ Orthopedic & surgical products</li>
                <li>✓ Hospital uniforms & OT dresses</li>
                <li>✓ Cotton rolls & consumables</li>
                <li>✓ Timely delivery & support</li>
              </ul>
              <a
                href="#contact"
                className="mt-8 inline-flex w-fit rounded-full bg-gold px-6 py-3 font-semibold text-medical-dark transition hover:bg-gold-dark"
              >
                Get in Touch
              </a>
            </aside>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
