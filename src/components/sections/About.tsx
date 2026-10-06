import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { BUSINESS } from "@/lib/constants";

export function About() {
  return (
    <section id="about" className="gradient-green-soft py-10 md:py-24">
      <div className="mx-auto max-w-7xl px-3.5 sm:px-4 md:px-6">
        <SectionHeading
          eyebrow="About Ganpati Lifecare"
          title="Direct Sourcing for Regional Healthcare"
          description={`${BUSINESS.name} (${BUSINESS.shortName}) — managed by Dharampal Verma, your regional medical, surgical, and orthopedic supplies manufacturer and wholesaler in Mandi Goluwala, Hanumangarh, Rajasthan.`}
        />
        <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
          <AnimateIn>
            <article className="rounded-3xl bg-card p-5 sm:p-8 md:p-10 shadow-lg shadow-medical/5 border border-medical/10 flex flex-col justify-between h-full">
              <div>
                <div className="mb-4 rounded-2xl bg-medical/5 p-4 border border-medical/15">
                  <p className="text-xs font-bold uppercase tracking-wider text-medical mb-1">
                    Quick Facts &amp; Procurement Summary
                  </p>
                  <p className="text-xs sm:text-sm leading-relaxed text-foreground/90 font-medium">
                    Ganpati Lifecare (GLC) is a medical supplies manufacturer and wholesale distributor in Mandi Goluwala, Hanumangarh, Rajasthan, managed by Dharampal Verma. We supply White Rose Brand Ortho Cotton Roll, Orthopaedics, Castroll and Gauze dressing products directly to healthcare facilities across North Rajasthan.
                  </p>
                  <div className="mt-3 pt-3 border-t border-medical/10 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-foreground/80">
                    <div>
                      <strong className="text-foreground">Core Categories:</strong> Orthopedic padding, surgical dressings, medical textiles, and hospital disposables.
                    </div>
                    <div>
                      <strong className="text-foreground">Supply Coverage:</strong> Hanumangarh, Sri Ganganagar, Suratgarh, Pilibanga, Sangaria, Nohar, Bhadra &amp; Bikaner.
                    </div>
                    <div>
                      <strong className="text-foreground">Who We Supply:</strong> Hospitals, nursing homes, orthopedic centers, trauma clinics, and retail pharmacies.
                    </div>
                    <div>
                      <strong className="text-foreground">How to Order:</strong> 1) Inquiry via phone/WhatsApp, 2) Item &amp; carton quotation, 3) Rapid regional freight dispatch.
                    </div>
                  </div>
                </div>

                <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
                  Managed by <strong>Dharampal Verma</strong>, Ganpati Lifecare coordinates consistent medical supply inventory, carton-level wholesale pricing, and direct doorstep delivery for regional healthcare institutions throughout Rajasthan.
                </p>

                {/* Hindi Localized Section for Regional Search Queries */}
                <div className="mt-5 pt-4 border-t border-medical/10" lang="hi">
                  <h3 className="text-xs sm:text-sm font-bold text-foreground mb-1">
                    गणपति लाइफकेयर — मंडी गोलूवाला, हनुमानगढ़ (राजस्थान)
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-foreground/80 font-normal">
                    गणपति लाइफकेयर (Ganpati Lifecare) मंडी गोलूवाला, हनुमानगढ़ (राजस्थान 335802) में स्थित एक प्रमुख चिकित्सा उत्पाद निर्माता और थोक सप्लायर है, जिसके संचालक धर्मपाल वर्मा हैं। हम व्हाइट रोज़ ब्रांड ऑर्थो कॉटन रोल (Orthocot), ऑर्थोपेडिक्स, कास्टरोल, गॉज ड्रेसिंग, स्टॉकिनेट, स्किन ट्रैक्शन किट, गेम्जी रोल, स्पंज पैड, डॉक्टर कोट और अस्पताल सामग्री की सीधी आपूर्ति करते हैं।
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-medical/10 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-medical">Management &amp; Location</p>
                  <p className="text-sm sm:text-base font-bold text-foreground">Managed by Dharampal Verma</p>
                  <p className="text-xs text-muted">Main Road, Mandi Goluwala - 335802, Distt. Hanumangarh (Raj.)</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-medical/10 px-3.5 py-1 text-xs font-semibold text-medical">
                  Regional Medical Wholesaler
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
                India rely on Ganpati Lifecare for reliable medical supply availability and fast order fulfillment.
              </p>
              <ul className="mt-5 space-y-2.5 text-xs sm:text-sm font-medium">
                <li>✓ White Rose Brand Orthocot surgical &amp; orthopedic cotton rolls</li>
                <li>✓ Hospital uniforms, doctor coats &amp; OT dresses</li>
                <li>✓ Skin traction kits, stockinets &amp; crepe bandages</li>
                <li>✓ Regional road transport delivery &amp; dedicated order support</li>
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
