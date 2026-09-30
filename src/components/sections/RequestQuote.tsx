"use client";

import { useState, FormEvent } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BUSINESS } from "@/lib/constants";

export function RequestQuote() {
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

    const payload = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: "",
      product_name: formData.get("products") as string,
      quantity: formData.get("quantity") as string,
      message: "Order placed via Request a Quote Form.",
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
        throw new Error(result.error || "Something went wrong.");
      }

      setInquiryId(result.inquiry.inquiry_id);
      setSent(true);
      form.reset();

      // Launch WhatsApp in a new tab with the formatted WhatsApp enquiry message
      const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
        result.whatsappMessage ||
        (payload.product_name
          ? `Hello Ganpati Lifecare, I am interested in your ${payload.product_name}. Please share product availability, specifications and quotation.`
          : "Hello Ganpati Lifecare, I would like to enquire about your surgical products, especially Surgical Cotton Roll and Dressing Products. Please share product availability and quotation.")
      )}`;
      
      window.open(whatsappUrl, "_blank");
    } catch (err) {
      console.error("Error submitting quote request:", err);
      const msg = err instanceof Error ? err.message : "Unable to submit quote request. Please try again.";
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="quote" className="py-10 md:py-24">
      <div className="mx-auto max-w-3xl px-3.5 sm:px-4 md:px-6">
        <SectionHeading
          eyebrow="Get a Quote"
          title="Request a Quote"
          description="Contact us for bulk orders — premium medical supplies at competitive prices."
        />

        {sent ? (
          <div className="mt-8 sm:mt-10 rounded-3xl bg-card p-6 sm:p-8 shadow-xl border border-medical/15 flex flex-col items-center text-center justify-center min-h-[340px]">
            <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-medical/10 text-medical shadow-inner">
              <svg className="h-7 w-7 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mt-5 font-display text-xl sm:text-2xl font-bold text-foreground">Quote Request Saved!</h3>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted">
              Inquiry ID: <span className="text-medical">{inquiryId}</span>
            </p>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-foreground/80 max-w-md">
              Thank you for contacting Ganpati Lifecare. Your inquiry has been received successfully. Our team will contact you shortly.
            </p>
            <p className="mt-3 text-xs text-muted">
              Opening WhatsApp automatically to send your formatted quote request...
            </p>
            <button
              onClick={() => {
                setSent(false);
                setInquiryId("");
              }}
              className="mt-6 sm:mt-8 inline-flex items-center justify-center min-h-[42px] rounded-full border border-medical/20 bg-background px-6 py-2.5 text-xs font-bold text-medical hover:bg-medical/5 transition-colors cursor-pointer"
            >
              Request Another Quote
            </button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-8 sm:mt-10 space-y-3.5 sm:space-y-4 rounded-3xl bg-card p-5 sm:p-8 shadow-xl border border-medical/10"
          >
            {errorMsg && (
              <div className="rounded-xl bg-brand-red/10 p-3 sm:p-4 text-xs sm:text-sm text-brand-red border border-brand-red/10">
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

            <label className="block">
              <span className="text-xs sm:text-sm font-medium">Your Name</span>
              <input
                name="name"
                required
                placeholder="Enter your name"
                className="mt-1 w-full rounded-xl border border-medical/20 bg-background px-3.5 py-2.5 sm:px-4 sm:py-3 text-base sm:text-sm placeholder:text-gray-400 focus:border-medical focus:ring-4 focus:ring-medical/15 focus:shadow-md outline-none transition-all duration-300 ease-in-out box-border"
              />
            </label>
            <label className="block">
              <span className="text-xs sm:text-sm font-medium">Phone Number</span>
              <input
                name="phone"
                type="tel"
                required
                placeholder="Enter your phone number"
                className="mt-1 w-full rounded-xl border border-medical/20 bg-background px-3.5 py-2.5 sm:px-4 sm:py-3 text-base sm:text-sm placeholder:text-gray-400 focus:border-medical focus:ring-4 focus:ring-medical/15 focus:shadow-md outline-none transition-all duration-300 ease-in-out box-border"
              />
            </label>
            <label className="block">
              <span className="text-xs sm:text-sm font-medium">Products Needed</span>
              <textarea
                name="products"
                rows={3}
                required
                placeholder="Enter products needed"
                className="mt-1 w-full rounded-xl border border-medical/20 bg-background px-3.5 py-2.5 sm:px-4 sm:py-3 text-base sm:text-sm placeholder:text-gray-400 focus:border-medical focus:ring-4 focus:ring-medical/15 focus:shadow-md outline-none transition-all duration-300 ease-in-out box-border"
              />
            </label>
            <label className="block">
              <span className="text-xs sm:text-sm font-medium">Quantity / Bulk Details</span>
              <input
                name="quantity"
                required
                placeholder="Enter quantity or bulk details"
                className="mt-1 w-full rounded-xl border border-medical/20 bg-background px-3.5 py-2.5 sm:px-4 sm:py-3 text-base sm:text-sm placeholder:text-gray-400 focus:border-medical focus:ring-4 focus:ring-medical/15 focus:shadow-md outline-none transition-all duration-300 ease-in-out box-border"
              />
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center min-h-[46px] rounded-full bg-medical py-3.5 font-semibold text-xs sm:text-sm text-white transition-all duration-300 hover:bg-medical-dark shadow-md active:scale-98 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Send via WhatsApp"}
            </button>
            {isSubmitting && (
              <p className="text-center text-xs sm:text-sm text-medical mt-3 animate-pulse">Processing your booking order…</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
