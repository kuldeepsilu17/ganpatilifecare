"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQS } from "@/lib/data";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-card py-12 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          description="Medical supplier in Rajasthan — common questions about GLC products and delivery."
        />
        <ul className="mt-10 space-y-3">
          {FAQS.map((faq, i) => (
            <li key={faq.question} className="list-none overflow-hidden rounded-2xl border border-medical/10 bg-background">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold cursor-pointer"
                aria-expanded={open === i}
              >
                {faq.question}
                <span className="text-medical font-bold">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <p className="border-t border-medical/10 px-5 pb-4 text-muted">{faq.answer}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
