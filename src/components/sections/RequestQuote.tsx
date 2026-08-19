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

      // Launch WhatsApp in a new tab with the WhatsApp order summary containing Inquiry ID
      const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
        result.whatsappAdminMessage ||
        `Hello Ganpati Lifecare,\n\nI would like to request a bulk quote.\n\nName: ${payload.name}\nPhone: ${payload.phone}\nProduct: ${payload.product_name}\nQuantity: ${payload.quantity}\n\nThank you.`
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
    <section id="quote" className="py-12 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Get a Quote"
          title="Request a Quote"
          description="Contact us for bulk orders — premium medical supplies at competitive prices."
        />

        {sent ? (
          <div className="mt-10 rounded-3xl bg-card p-8 shadow-xl border border-medical/15 flex flex-col items-center text-center justify-center min-h-[350px]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-medical/10 text-medical shadow-inner">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mt-6 font-display text-2xl font-bold text-foreground">Quote Request Saved!</h3>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted">
              Inquiry ID: <span className="text-medical">{inquiryId}</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/80 max-w-md">
              Thank you for contacting Ganpati Lifecare. Your inquiry has been received successfully. Our team will contact you shortly.
            </p>
            <p className="mt-4 text-xs text-muted">
              Opening WhatsApp automatically to send your formatted quote request...
            </p>
            <button
              onClick={() => {
                setSent(false);
                setInquiryId("");
              }}
              className="mt-8 rounded-full border border-medical/20 bg-background px-6 py-2.5 text-xs font-bold text-medical hover:bg-medical/5 transition-colors cursor-pointer"
            >
              Request Another Quote
            </button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-10 space-y-4 rounded-3xl bg-card p-8 shadow-xl"
          >
            {errorMsg && (
              <div className="rounded-xl bg-brand-red/10 p-4 text-sm text-brand-red border border-brand-red/10">
                {errorMsg}
              </div>
            )}

            <label className="block">
              <span className="text-sm font-medium">Your Name</span>
              <input
                name="name"
                required
                placeholder="Enter your name"
                className="mt-1 w-full rounded-xl border border-medical/20 bg-background px-4 py-3 placeholder:text-gray-400 focus:border-medical focus:ring-4 focus:ring-medical/15 focus:shadow-md outline-none transition-all duration-300 ease-in-out"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Phone Number</span>
              <input
                name="phone"
                type="tel"
                required
                placeholder="Enter your phone number"
                className="mt-1 w-full rounded-xl border border-medical/20 bg-background px-4 py-3 placeholder:text-gray-400 focus:border-medical focus:ring-4 focus:ring-medical/15 focus:shadow-md outline-none transition-all duration-300 ease-in-out"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Products Needed</span>
              <textarea
                name="products"
                rows={3}
                required
                placeholder="Enter products needed"
                className="mt-1 w-full rounded-xl border border-medical/20 bg-background px-4 py-3 placeholder:text-gray-400 focus:border-medical focus:ring-4 focus:ring-medical/15 focus:shadow-md outline-none transition-all duration-300 ease-in-out"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Quantity / Bulk Details</span>
              <input
                name="quantity"
                required
                placeholder="Enter quantity or bulk details"
                className="mt-1 w-full rounded-xl border border-medical/20 bg-background px-4 py-3 placeholder:text-gray-400 focus:border-medical focus:ring-4 focus:ring-medical/15 focus:shadow-md outline-none transition-all duration-300 ease-in-out"
              />
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-medical py-3.5 font-semibold text-white transition-all duration-300 hover:bg-medical-dark shadow-md active:scale-98 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Send via WhatsApp"}
            </button>
            {isSubmitting && (
              <p className="text-center text-sm text-medical mt-3 animate-pulse">Processing your booking order…</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
