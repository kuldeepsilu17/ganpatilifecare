import { AnimateIn } from "@/components/ui/AnimateIn";
import { STATS } from "@/lib/data";

export function Stats() {
  return (
    <section className="bg-medical py-14 text-white" aria-label="Business statistics">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <ul className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <AnimateIn key={stat.label} delay={i * 0.08}>
              <li className="list-none text-center">
                <p className="font-display text-4xl font-bold text-gold md:text-5xl">{stat.value}</p>
                <p className="mt-2 text-sm font-medium text-white/90 md:text-base">{stat.label}</p>
              </li>
            </AnimateIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
