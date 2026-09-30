"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQS } from "@/lib/data";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-card py-10 md:py-24">
      <div className="mx-auto max-w-3xl px-3.5 sm:px-4 md:px-6">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          description="Medical supplier in Rajasthan — common questions about GLC products and delivery."
        />
        <ul className="mt-8 sm:mt-10 space-y-3">
          {FAQS.map((faq, i) => (
            <li key={faq.question} className="list-none overflow-hidden rounded-2xl border border-medical/10 bg-background">
              <button
                type="button"
                id={`faq-question-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3.5 sm:px-5 sm:py-4 text-left text-xs sm:text-sm md:text-base font-semibold cursor-pointer min-h-[48px]"
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="leading-snug">{faq.question}</span>
                <span className="text-medical font-bold text-base sm:text-lg shrink-0 ml-2">{open === i ? "−" : "+"}</span>
              </button>
              <div
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
                className={`border-t border-medical/10 px-4 py-3 sm:px-5 sm:pb-4 text-xs sm:text-sm text-muted leading-relaxed transition-all ${
                  open === i ? "block" : "hidden"
                }`}
              >
                <p>{faq.answer}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
