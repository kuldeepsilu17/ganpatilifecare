"use client";

import { useState, FormEvent } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BUSINESS } from "@/lib/constants";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [inquiryId, setInquiryId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const honeypot = formData.get("website_hp") as string;
    if (honeypot) {
      setIsSubmitting(false);
      setSent(true);
      return;
    }

    const businessOrg = (formData.get("organization") as string) || "";
    const requirement = (formData.get("requirement") as string) || "General Inquiry";
    const userMessage = (formData.get("message") as string) || "";

    const combinedMessage = businessOrg
      ? `[Organization: ${businessOrg}] ${userMessage}`
      : userMessage;

    const payload = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: (formData.get("email") as string) || "",
      product_name: requirement,
      quantity: "Direct Inquiry",
      message: combinedMessage || "General inquiry from contact form.",
      source: "Contact Section",
    };

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Unable to send your inquiry.");
      }

      setInquiryId(result.inquiry.inquiry_id);
      setSent(true);
      form.reset();

      const mailtoUrl = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(
        result.emailSubject || `Product Inquiry [${result.inquiry.inquiry_id}] - Ganpati Lifecare`
      )}&body=${encodeURIComponent(
        result.emailBody ||
        `Hello Dharampal Verma,\n\nName: ${payload.name}\n${businessOrg ? `Organization: ${businessOrg}\n` : ""}Phone: ${payload.phone}\nRequirement: ${payload.product_name}\nMessage: ${payload.message}`
      )}`;
      
      window.location.href = mailtoUrl;
    } catch (err) {
      console.error("Error submitting inquiry:", err);
      const msg = err instanceof Error ? err.message : "Unable to submit inquiry. Please try again.";
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(BUSINESS.mapQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="contact" className="bg-[#F7F8F5] py-12 md:py-20 border-b border-[#D7E5DA]" aria-label="Contact Information and Inquiry">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Contact Ganpati Lifecare"
          title="Direct Contact &amp; Inquiries"
          description={`Reach Dharampal Verma at Ganpati Lifecare in Mandi Goluwala, Hanumangarh for medical, orthopedic, and surgical supplies.`}
        />
        <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-10 lg:grid-cols-2">
          {/* Left Column: Business Details & Map */}
          <div className="space-y-6">
            <article className="rounded-2xl bg-white p-6 sm:p-7 shadow-2xs border border-[#D7E5DA]">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#18352A]">{BUSINESS.name}</h3>
                <span className="rounded-full bg-[#EDF5EF] px-3 py-1 text-xs font-semibold text-[#174C38] border border-[#D7E5DA]">
                  Goluwala HQ
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm font-semibold text-[#174C38]">Managed by Dharampal Verma</p>
              <p className="mt-1 text-xs font-mono font-medium text-[#236747]">GSTIN: {BUSINESS.gstin} (State Code: 08)</p>
              <p className="mt-2 text-xs sm:text-sm text-[#46554C] leading-relaxed">{BUSINESS.location}</p>
              
              <div className="mt-4 pt-4 border-t border-[#D7E5DA]">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#68766D]">Direct Phone Contacts</p>
                <ul className="mt-2 space-y-2">
                  {BUSINESS.phoneDisplay.map((phone, i) => (
                    <li key={phone}>
                      <a
                        href={`tel:${BUSINESS.phones[i]}`}
                        className="font-medium text-xs sm:text-sm text-[#174C38] hover:underline inline-flex items-center gap-2 min-h-[36px]"
                      >
                        <span aria-hidden="true">📞</span> {phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-[#D7E5DA]">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#68766D]">Email Contact</p>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="mt-1 inline-flex items-center gap-2 text-xs sm:text-sm text-[#174C38] hover:underline font-medium min-h-[36px]"
                >
                  <span aria-hidden="true">✉️</span> {BUSINESS.email}
                </a>
              </div>
            </article>

            {/* Embedded Location Map */}
            <div className="overflow-hidden rounded-2xl shadow-2xs border border-[#D7E5DA] bg-white">
              <iframe
                title="Ganpati Lifecare Mandi Goluwala location map"
                src={mapSrc}
                className="h-60 w-full border-0 md:h-72"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          {sent ? (
            <div className="rounded-2xl bg-white p-6 sm:p-10 shadow-2xs border border-[#D7E5DA] flex flex-col items-center text-center justify-center min-h-[360px]">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EDF5EF] text-[#174C38] border border-[#D7E5DA]">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" focusable="false">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-5 font-display text-xl sm:text-2xl font-bold text-[#18352A]">Inquiry Received</h3>
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-[#68766D]">
                Reference ID: <span className="font-mono text-[#174C38] font-bold">{inquiryId}</span>
              </p>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#46554C] max-w-sm">
                Thank you for reaching out to Ganpati Lifecare. Dharampal Verma and our team will get back to you shortly with availability and pricing.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setInquiryId("");
                }}
                className="mt-6 inline-flex items-center justify-center min-h-[42px] rounded-full border border-[#D7E5DA] bg-[#F7F8F5] px-6 py-2.5 text-xs font-bold text-[#174C38] hover:bg-[#EDF5EF] transition-colors cursor-pointer"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="rounded-2xl bg-white p-6 sm:p-8 shadow-2xs border border-[#D7E5DA]">
              <h3 className="font-display text-lg sm:text-xl font-bold text-[#18352A]">Send an Inquiry</h3>
              <p className="mt-1 text-xs text-[#68766D]">Fill out this form and we will respond promptly.</p>
              
              {errorMsg && (
                <div className="mt-4 rounded-xl bg-red-50 p-3.5 text-xs sm:text-sm text-red-800 border border-red-200">
                  {errorMsg}
                </div>
              )}

              <input
                type="text"
                name="website_hp"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <label className="mt-4 block">
                <span className="text-xs sm:text-sm font-medium text-[#18352A]">Your Name <span className="text-red-500">*</span></span>
                <input
                  name="name"
                  required
                  placeholder="e.g. Dr. Dharampal"
                  className="mt-1 w-full rounded-xl border border-[#D7E5DA] bg-[#F7F8F5] px-3.5 py-2.5 text-sm text-[#18352A] placeholder:text-gray-400 focus:border-[#174C38] focus:ring-2 focus:ring-[#174C38]/15 outline-none transition-all"
                />
              </label>

              <label className="mt-3.5 block">
                <span className="text-xs sm:text-sm font-medium text-[#18352A]">Hospital / Business / Organization (Optional)</span>
                <input
                  name="organization"
                  placeholder="e.g. District Orthopedic Hospital"
                  className="mt-1 w-full rounded-xl border border-[#D7E5DA] bg-[#F7F8F5] px-3.5 py-2.5 text-sm text-[#18352A] placeholder:text-gray-400 focus:border-[#174C38] focus:ring-2 focus:ring-[#174C38]/15 outline-none transition-all"
                />
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-3.5">
                <label className="block">
                  <span className="text-xs sm:text-sm font-medium text-[#18352A]">Phone Number <span className="text-red-500">*</span></span>
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91 98282 32254"
                    className="mt-1 w-full rounded-xl border border-[#D7E5DA] bg-[#F7F8F5] px-3.5 py-2.5 text-sm text-[#18352A] placeholder:text-gray-400 focus:border-[#174C38] focus:ring-2 focus:ring-[#174C38]/15 outline-none transition-all"
                  />
                </label>
                
                <label className="block">
                  <span className="text-xs sm:text-sm font-medium text-[#18352A]">Email Address (Optional)</span>
                  <input
                    name="email"
                    type="email"
                    placeholder="contact@hospital.com"
                    className="mt-1 w-full rounded-xl border border-[#D7E5DA] bg-[#F7F8F5] px-3.5 py-2.5 text-sm text-[#18352A] placeholder:text-gray-400 focus:border-[#174C38] focus:ring-2 focus:ring-[#174C38]/15 outline-none transition-all"
                  />
                </label>
              </div>

              <label className="mt-3.5 block">
                <span className="text-xs sm:text-sm font-medium text-[#18352A]">Product of Interest / Requirement</span>
                <input
                  name="requirement"
                  placeholder="e.g. White Rose Orthocot Cotton Rolls, Doctor Coats, Lap-Pad"
                  className="mt-1 w-full rounded-xl border border-[#D7E5DA] bg-[#F7F8F5] px-3.5 py-2.5 text-sm text-[#18352A] placeholder:text-gray-400 focus:border-[#174C38] focus:ring-2 focus:ring-[#174C38]/15 outline-none transition-all"
                />
              </label>
              
              <label className="mt-3.5 block">
                <span className="text-xs sm:text-sm font-medium text-[#18352A]">Your Message / Quantities <span className="text-red-500">*</span></span>
                <textarea
                  name="message"
                  rows={3}
                  required
                  placeholder="Please describe your product requirements, hospital location, and quantity..."
                  className="mt-1 w-full rounded-xl border border-[#D7E5DA] bg-[#F7F8F5] px-3.5 py-2.5 text-sm text-[#18352A] placeholder:text-gray-400 focus:border-[#174C38] focus:ring-2 focus:ring-[#174C38]/15 outline-none transition-all"
                />
              </label>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-5 w-full flex items-center justify-center min-h-[46px] rounded-full bg-[#174C38] py-3 font-semibold text-xs sm:text-sm text-white hover:bg-[#236747] transition-all shadow-2xs active:scale-98 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting Inquiry..." : "Submit Inquiry"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
