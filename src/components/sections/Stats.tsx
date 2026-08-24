import { AnimateIn } from "@/components/ui/AnimateIn";
import { STATS } from "@/lib/data";

export function Stats() {
  return (
    <section className="bg-[#086B3F] py-14 text-white" aria-label="Business highlights">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <ul className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {STATS.map((stat, i) => (
            <AnimateIn key={stat.label} delay={i * 0.08}>
              <li className="list-none text-center p-3 rounded-2xl bg-white/10 border border-white/15 shadow-sm">
                <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F59E0B]">{stat.value}</p>
                <p className="mt-2 text-xs sm:text-sm font-medium text-white">{stat.label}</p>
              </li>
            </AnimateIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
