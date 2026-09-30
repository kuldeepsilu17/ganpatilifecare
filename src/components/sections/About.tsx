import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { BUSINESS } from "@/lib/constants";

export function About() {
  return (
    <section id="about" className="gradient-green-soft py-10 md:py-24">
      <div className="mx-auto max-w-7xl px-3.5 sm:px-4 md:px-6">
        <SectionHeading
          eyebrow="About Ganpati Lifecare"
          title="Quality Products for Better Healthcare"
          description={`${BUSINESS.name} (${BUSINESS.shortName}) — led by ${BUSINESS.owner}, your trusted medical supplier in Goluwala, Hanumangarh, Rajasthan.`}
        />
        <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
          <AnimateIn>
            <article className="rounded-3xl bg-card p-5 sm:p-8 md:p-10 shadow-lg shadow-medical/5 border border-medical/10 flex flex-col justify-between h-full">
              <div>
                <div className="mb-4 rounded-2xl bg-medical/5 p-4 border border-medical/15">
                  <p className="text-xs font-bold uppercase tracking-wider text-medical mb-1">
                    Quick Facts &amp; Business Summary
                  </p>
                  <p className="text-xs sm:text-sm leading-relaxed text-foreground/90 font-medium">
                    Ganpati Lifecare is a medical, surgical and orthopedic supplies wholesaler in Goluwala, Hanumangarh, Rajasthan, supplying Orthocot cotton rolls, stockinet, skin traction kits, gauze bandages, doctor coats, OT dresses and hospital consumables to hospitals and clinics across North Rajasthan.
                  </p>
                </div>

                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-foreground/90">
                  Owned and operated by <strong>Dharampal Verma</strong>, Ganpati Lifecare has built a strong regional reputation for consistent medical supply quality, transparent wholesale carton pricing, and dependable doorstep delivery for healthcare institutions.
                </p>

                {/* Hindi Localized Section for Local Searchers */}
                <div className="mt-5 pt-4 border-t border-medical/10">
                  <h3 className="text-xs sm:text-sm font-bold text-foreground mb-1">
                    गणपति लाइफकेयर — गोलूवाला, हनुमानगढ़ (राजस्थान)
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-foreground/80 font-normal">
                    हम हनुमानगढ़, श्रीगंगानगर, सूरतगढ़, बीकानेर एवं संपूर्ण राजस्थान में अस्पतालों, नर्सिंग होम एवं क्लीनिकों के लिए ऑर्थोपेडिक कॉटन रोल, सर्जिकल ड्रेसिंग, डॉक्टर कोट, नर्स यूनिफॉर्म और मेडिकल डिस्पोजेबल सामग्री के थोक सप्लायर हैं।
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-medical/10 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-medical">Leadership &amp; Location</p>
                  <p className="text-sm sm:text-base font-bold text-foreground">Founder &amp; Owner: Dharampal Verma</p>
                  <p className="text-xs text-muted">Goluwala, Hanumangarh, Rajasthan, India</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-medical/10 px-3.5 py-1 text-xs font-semibold text-medical">
                  Verified Local Supplier
                </span>
              </div>
            </article>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <aside className="flex h-full flex-col justify-center rounded-3xl border border-medical/20 bg-medical p-5 sm:p-8 md:p-10 text-white">
              <h3 className="font-display text-xl sm:text-2xl font-bold">
                Direct Wholesale Medical Supply
              </h3>
              <p className="mt-3 text-xs sm:text-sm md:text-base text-white/90 leading-relaxed">
                Hospitals, nursing homes, clinics, and distributors across Rajasthan and North
                India trust Ganpati Lifecare for reliable medical supply and fast order fulfillment.
              </p>
              <ul className="mt-5 space-y-2.5 text-xs sm:text-sm font-medium">
                <li>✓ Orthocot surgical &amp; orthopedic cotton rolls</li>
                <li>✓ Hospital uniforms, doctor coats &amp; OT dresses</li>
                <li>✓ Skin traction kits, stockinets &amp; crepe bandages</li>
                <li>✓ Rapid local road delivery &amp; direct owner support</li>
              </ul>
              <div className="mt-6 sm:mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center min-h-[44px] rounded-full bg-gold px-6 py-2.5 font-semibold text-medical-dark transition hover:bg-gold-dark cursor-pointer text-xs sm:text-sm"
                >
                  Request Bulk Quote
                </a>
                <a
                  href={`tel:${BUSINESS.phones[0]}`}
                  className="inline-flex items-center justify-center min-h-[44px] rounded-full bg-white/15 px-6 py-2.5 font-semibold text-white transition hover:bg-white/25 cursor-pointer text-xs sm:text-sm border border-white/20"
                >
                  Call Dharampal Verma
                </a>
              </div>
            </aside>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
