import { AnimateIn } from "./AnimateIn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <AnimateIn className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <p
          className={`mb-2 text-sm font-semibold uppercase tracking-widest ${light ? "text-brand-orange" : "text-medical"}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-[24px] sm:text-[26px] md:text-[32px] lg:text-[36px] font-bold tracking-tight ${light ? "text-white" : "text-foreground"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-sm md:text-base lg:text-lg leading-relaxed ${light ? "text-white/85" : "text-muted"}`}
        >
          {description}
        </p>
      )}
    </AnimateIn>
  );
}
