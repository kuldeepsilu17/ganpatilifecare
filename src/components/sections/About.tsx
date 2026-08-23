import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { BUSINESS } from "@/lib/constants";

export function About() {
  return (
    <section id="about" className="gradient-green-soft py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="About Ganpati Lifecare"
          title="Quality Products for Better Healthcare"
          description={`${BUSINESS.name} (${BUSINESS.shortName}) — led by ${BUSINESS.owner}, your trusted medical supplier in Goluwala, Hanumangarh, Rajasthan.`}
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <AnimateIn>
            <article className="rounded-3xl bg-card p-8 shadow-xl shadow-medical/5 md:p-10 flex flex-col justify-between h-full">
              <div>
                <p className="text-sm md:text-base lg:text-lg leading-relaxed text-foreground/90">
                  Ganpati Lifecare, based in Goluwala, Hanumangarh, Rajasthan, provides
                  orthopedic, surgical and hospital supply products including Orthocot cotton
                  rolls, stockinet, skin traction kits, orthopedic gauze bandages, sponge pads,
                  Gamjee rolls, surgical dressing materials, doctor coats, nurse uniforms,
                  OT dresses, staff uniforms, medical disposables and hospital consumables.
                </p>
                <p className="mt-5 text-sm md:text-base lg:text-lg leading-relaxed text-muted">
                  Led by Dharampal Verma, our mission is to deliver dependable healthcare
                  supplies with strict quality assurance, competitive pricing, and timely
                  dispatch to hospitals, clinics, and healthcare institutions across North India.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-medical/10 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-medical">Leadership &amp; Location</p>
                  <p className="text-sm md:text-base font-bold text-foreground">Founder &amp; Owner: Dharampal Verma</p>
                  <p className="text-xs text-muted">Goluwala, Hanumangarh, Rajasthan, India</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-medical/10 px-3.5 py-1 text-xs font-semibold text-medical">
                  Verified Local Supplier
                </span>
              </div>
            </article>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <aside className="flex h-full flex-col justify-center rounded-3xl border border-medical/20 bg-medical p-8 text-white md:p-10">
              <h3 className="font-display text-2xl font-bold">
                Contact Us for Bulk Orders
              </h3>
              <p className="mt-4 text-white/90">
                Hospitals, nursing homes, clinics, and distributors across Rajasthan and North
                India trust Ganpati Lifecare for reliable medical supply.
              </p>
              <ul className="mt-6 space-y-3 text-sm font-medium">
                <li>✓ Orthopedic &amp; surgical products</li>
                <li>✓ Hospital uniforms &amp; OT dresses</li>
                <li>✓ Cotton rolls &amp; consumables</li>
                <li>✓ Timely delivery &amp; direct owner support</li>
              </ul>
              <a
                href="#contact"
                className="mt-8 inline-flex w-fit rounded-full bg-gold px-6 py-3 font-semibold text-medical-dark transition hover:bg-gold-dark cursor-pointer"
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
