import { AnimateIn } from "@/components/ui/AnimateIn";
import { STATS } from "@/lib/data";

export function Stats() {
  return (
    <section className="bg-[#EDF5EF]/60 py-8 sm:py-10 md:py-12 border-b border-[#D7E5DA]" aria-label="Business highlights">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <ul className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {STATS.map((stat, i) => (
            <AnimateIn key={stat.label} delay={i * 0.05}>
              <li className="list-none flex flex-col justify-center rounded-xl bg-white border border-[#D7E5DA] p-4 sm:p-5 shadow-2xs hover:border-[#A7C4AE] hover:shadow-xs transition-all h-full">
                <div className="flex items-center gap-2 mb-1">
                  <span className="h-2 w-2 rounded-full bg-[#258653] shrink-0" aria-hidden="true" />
                  <h3 className="font-display text-base sm:text-lg font-semibold text-[#18352A] tracking-tight">
                    {stat.value}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#46554C] leading-relaxed pl-4">
                  {stat.label}
                </p>
              </li>
            </AnimateIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
