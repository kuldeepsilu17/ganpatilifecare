"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQS } from "@/lib/data";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-12 md:py-20 border-b border-[#D7E5DA]" aria-label="Frequently Asked Questions">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Common Questions"
          title="Frequently Asked Questions"
          description="Clear answers regarding Ganpati Lifecare products, bulk carton orders, hospital delivery, and direct quotations."
        />
        <ul className="mt-8 sm:mt-10 space-y-3">
          {FAQS.map((faq, i) => (
            <li key={`faq-item-${i}`} className="list-none overflow-hidden rounded-xl border border-[#D7E5DA] bg-[#F7F8F5]">
              <button
                type="button"
                id={`faq-question-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3.5 sm:px-5 sm:py-4 text-left text-xs sm:text-sm md:text-base font-semibold cursor-pointer min-h-[48px] text-[#18352A]"
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="leading-snug">{faq.question}</span>
                <span className="text-[#174C38] font-bold text-base sm:text-lg shrink-0 ml-2" aria-hidden="true">
                  {open === i ? "−" : "+"}
                </span>
              </button>
              <div
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
                className={`border-t border-[#D7E5DA] px-4 py-3.5 sm:px-5 sm:pb-4 text-xs sm:text-sm text-[#46554C] leading-relaxed transition-all ${
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
