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
    <AnimateIn className="mx-auto max-w-3xl text-center px-1 sm:px-0">
      {eyebrow && (
        <p
          className={`mb-2 text-xs sm:text-sm font-semibold uppercase tracking-widest ${light ? "text-brand-orange" : "text-medical"}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-[22px] min-[380px]:text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-bold tracking-tight break-words leading-snug ${light ? "text-white" : "text-foreground"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-2.5 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed break-words max-w-2xl mx-auto ${light ? "text-white/85" : "text-muted"}`}
        >
          {description}
        </p>
      )}
    </AnimateIn>
  );
}
