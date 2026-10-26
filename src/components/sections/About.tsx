import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { BUSINESS } from "@/lib/constants";

export function About() {
  return (
    <section id="about" className="bg-white py-12 md:py-20 border-b border-[#D7E5DA]">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="About Ganpati Lifecare"
          title="Direct Sourcing for Regional Healthcare"
          description={`${BUSINESS.name} (${BUSINESS.shortName}) — managed by Dharampal Verma, your regional medical, surgical, and orthopedic supplies manufacturer and wholesaler in Mandi Goluwala, Hanumangarh, Rajasthan.`}
        />
        <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10">
          <AnimateIn>
            <article className="rounded-2xl bg-[#F7F8F5] p-6 sm:p-8 md:p-10 shadow-2xs border border-[#D7E5DA] flex flex-col justify-between h-full">
              <div>
                <div className="mb-5 rounded-xl bg-white p-4 sm:p-5 border border-[#D7E5DA] shadow-2xs">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#174C38] mb-1.5">
                    Verified Business Details &amp; Summary
                  </p>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#46554C]">
                    Registered GST healthcare enterprise (State Code 08) operating with inventory in Mandi Goluwala - 335802. We provide direct wholesale carton supply and dependable roadway freight dispatch across North Rajasthan.
                  </p>
                  <div className="mt-3.5 pt-3.5 border-t border-[#D7E5DA] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#46554C]">
                    <div>
                      <strong className="text-[#18352A]">Core Categories:</strong> Orthopedic padding, surgical dressings, medical textiles, and hospital disposables.
                    </div>
                    <div>
                      <strong className="text-[#18352A]">Supply Network:</strong> Hanumangarh, Sri Ganganagar, Suratgarh, Pilibanga, Sangaria, Nohar, Bhadra &amp; Bikaner.
                    </div>
                    <div>
                      <strong className="text-[#18352A]">Who We Supply:</strong> Hospitals, nursing homes, orthopedic centers, trauma clinics, and retail pharmacies.
                    </div>
                    <div>
                      <strong className="text-[#18352A]">How to Order:</strong> 1) Inquiry via Phone/WhatsApp, 2) Item quotation, 3) Road freight dispatch.
                    </div>
                  </div>
                </div>

                <p className="text-sm sm:text-base leading-relaxed text-[#46554C]">
                  Managed by <strong>Dharampal Verma</strong>, Ganpati Lifecare coordinates consistent medical supply inventory, carton-level wholesale pricing, and direct doorstep delivery for regional healthcare institutions throughout Rajasthan.
                </p>

                {/* Hindi Localized Section for Regional Inquiries */}
                <div className="mt-5 pt-4 border-t border-[#D7E5DA]" lang="hi">
                  <h3 className="text-xs sm:text-sm font-semibold text-[#18352A] mb-1">
                    गणपति लाइफकेयर — मंडी गोलूवाला, हनुमानगढ़ (राजस्थान)
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#68766D]">
                    गणपति लाइफकेयर (Ganpati Lifecare) मंडी गोलूवाला, हनुमानगढ़ (राजस्थान 335802) में स्थित एक प्रामाणिक चिकित्सा उत्पाद आपूर्तिकर्ता है, जिसके संचालक धर्मपाल वर्मा हैं। हम व्हाइट रोज़ ऑर्थो कॉटन रोल (Orthocot), ऑर्थोपेडिक्स, गॉज ड्रेसिंग, स्टॉकिनेट, स्किन ट्रैक्शन किट, गेम्जी रोल, स्पंज पैड और अस्पताल सामग्री की सीधी आपूर्ति करते हैं।
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#D7E5DA] flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#174C38]">Management &amp; Location</p>
                  <p className="text-sm sm:text-base font-bold text-[#18352A]">Managed by Dharampal Verma</p>
                  <p className="text-xs text-[#68766D]">Main Road, Mandi Goluwala - 335802, Distt. Hanumangarh (Raj.)</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-[#EDF5EF] px-3.5 py-1 text-xs font-semibold text-[#174C38] border border-[#D7E5DA]">
                  Regional Wholesaler
                </span>
              </div>
            </article>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <aside className="flex h-full flex-col justify-between rounded-2xl border border-[#236747] bg-[#174C38] p-6 sm:p-8 md:p-10 text-white shadow-xs">
              <div>
                <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#D6E4DA] border border-white/15 mb-3">
                  Institutional Healthcare Procurement
                </span>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                  Direct Wholesale Medical Supply
                </h3>
                <p className="mt-3 text-xs sm:text-sm md:text-base text-[#D6E4DA] leading-relaxed">
                  Hospitals, nursing homes, clinics, and distributors across Rajasthan rely on Ganpati Lifecare for dependable product availability, authentic batch quality, and fast dispatch.
                </p>
                <ul className="mt-6 space-y-3 text-xs sm:text-sm font-medium text-white/95">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#A7C4AE] font-bold">✓</span>
                    <span>White Rose Brand Orthocot surgical &amp; orthopedic cotton rolls</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#A7C4AE] font-bold">✓</span>
                    <span>Hospital uniforms, doctor coats &amp; OT dresses</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#A7C4AE] font-bold">✓</span>
                    <span>Skin traction kits, stockinets &amp; crepe bandages</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#A7C4AE] font-bold">✓</span>
                    <span>Regional road transport delivery &amp; direct order support</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap gap-3">
                <a
                  href="#quote"
                  className="inline-flex items-center justify-center min-h-[44px] rounded-full bg-white px-6 py-2.5 font-semibold text-[#174C38] transition hover:bg-[#EDF5EF] shadow-2xs text-xs sm:text-sm cursor-pointer"
                >
                  Request Bulk Quote
                </a>
                <a
                  href={`tel:${BUSINESS.phones[0]}`}
                  className="inline-flex items-center justify-center min-h-[44px] rounded-full bg-white/10 px-6 py-2.5 font-semibold text-white transition hover:bg-white/20 text-xs sm:text-sm border border-white/25 cursor-pointer"
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
