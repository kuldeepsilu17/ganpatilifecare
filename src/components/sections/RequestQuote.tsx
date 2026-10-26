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

    const businessOrg = (formData.get("business") as string) || "";
    const productName = (formData.get("products") as string) || "General Supplies";
    const quantity = (formData.get("quantity") as string) || "";
    const messageNotes = (formData.get("message") as string) || "";

    const fullMessage = [
      businessOrg ? `Organization: ${businessOrg}` : null,
      quantity ? `Quantity: ${quantity}` : null,
      messageNotes ? `Notes: ${messageNotes}` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    const payload = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: (formData.get("email") as string) || "",
      product_name: productName,
      quantity: quantity || "Wholesale Inquiry",
      message: fullMessage || "Order inquiry placed via Request a Quote Form.",
      source: "Request Quote Form",
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
        throw new Error(result.error || "Unable to submit your quote request.");
      }

      setInquiryId(result.inquiry.inquiry_id);
      setSent(true);
      form.reset();

      // Launch WhatsApp in a new tab with formatted enquiry message
      const whatsappText = `Hello Ganpati Lifecare,\n\nI want to request a quote for ${payload.product_name}.\nName: ${payload.name}\n${businessOrg ? `Organization: ${businessOrg}\n` : ""}Phone: ${payload.phone}\n${quantity ? `Quantity: ${quantity}\n` : ""}${messageNotes ? `Notes: ${messageNotes}\n` : ""}\nPlease share availability and institutional pricing. Thank you.`;

      const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
        result.whatsappMessage || whatsappText
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
    <section id="quote" className="py-12 md:py-20 bg-white border-b border-[#D7E5DA]" aria-label="Request a Quote Section">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Direct Wholesale Sourcing"
          title="Request a Quotation"
          description="Submit your facility or clinic requirements for direct carton-level wholesale pricing and fast regional dispatch."
        />

        {sent ? (
          <div className="mt-8 sm:mt-10 rounded-2xl bg-[#F7F8F5] p-6 sm:p-10 shadow-2xs border border-[#D7E5DA] flex flex-col items-center text-center justify-center min-h-[320px]">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EDF5EF] text-[#174C38] border border-[#D7E5DA]">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" focusable="false">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mt-4 font-display text-xl sm:text-2xl font-bold text-[#18352A]">
              Quotation Request Received
            </h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#68766D]">
              Inquiry Reference: <span className="font-mono text-[#174C38] font-bold">{inquiryId}</span>
            </p>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#46554C] max-w-md">
              Thank you for contacting Ganpati Lifecare. Dharampal Verma and our distribution team have received your details and will follow up shortly.
            </p>
            <p className="mt-2 text-xs text-[#68766D]">
              A WhatsApp chat has also opened to connect with us immediately.
            </p>
            <button
              type="button"
              onClick={() => {
                setSent(false);
                setInquiryId("");
              }}
              className="mt-6 inline-flex items-center justify-center min-h-[42px] rounded-full border border-[#D7E5DA] bg-white px-6 py-2.5 text-xs font-bold text-[#174C38] hover:bg-[#EDF5EF] transition-colors cursor-pointer"
            >
              Request Another Quote
            </button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-8 sm:mt-10 space-y-4 rounded-2xl bg-[#F7F8F5] p-6 sm:p-8 shadow-2xs border border-[#D7E5DA]"
          >
            {errorMsg && (
              <div className="rounded-xl bg-red-50 p-3.5 text-xs sm:text-sm text-red-800 border border-red-200">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs sm:text-sm font-medium text-[#18352A]">Full Name <span className="text-red-500">*</span></span>
                <input
                  name="name"
                  required
                  placeholder="e.g. Dr. Rajesh Kumar"
                  className="mt-1 w-full rounded-xl border border-[#D7E5DA] bg-white px-3.5 py-2.5 text-sm text-[#18352A] placeholder:text-gray-400 focus:border-[#174C38] focus:ring-2 focus:ring-[#174C38]/15 outline-none transition-all"
                />
              </label>

              <label className="block">
                <span className="text-xs sm:text-sm font-medium text-[#18352A]">Hospital / Business / Organization (Optional)</span>
                <input
                  name="business"
                  placeholder="e.g. Lifecare Hospital, Hanumangarh"
                  className="mt-1 w-full rounded-xl border border-[#D7E5DA] bg-white px-3.5 py-2.5 text-sm text-[#18352A] placeholder:text-gray-400 focus:border-[#174C38] focus:ring-2 focus:ring-[#174C38]/15 outline-none transition-all"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs sm:text-sm font-medium text-[#18352A]">Phone / WhatsApp Number <span className="text-red-500">*</span></span>
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="mt-1 w-full rounded-xl border border-[#D7E5DA] bg-white px-3.5 py-2.5 text-sm text-[#18352A] placeholder:text-gray-400 focus:border-[#174C38] focus:ring-2 focus:ring-[#174C38]/15 outline-none transition-all"
                />
              </label>

              <label className="block">
                <span className="text-xs sm:text-sm font-medium text-[#18352A]">Email Address (Optional)</span>
                <input
                  name="email"
                  type="email"
                  placeholder="doctor@hospital.org"
                  className="mt-1 w-full rounded-xl border border-[#D7E5DA] bg-white px-3.5 py-2.5 text-sm text-[#18352A] placeholder:text-gray-400 focus:border-[#174C38] focus:ring-2 focus:ring-[#174C38]/15 outline-none transition-all"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs sm:text-sm font-medium text-[#18352A]">Product of Interest <span className="text-red-500">*</span></span>
                <input
                  name="products"
                  required
                  placeholder="e.g. Orthocot Cotton Roll 15cm, Crepe Bandages"
                  className="mt-1 w-full rounded-xl border border-[#D7E5DA] bg-white px-3.5 py-2.5 text-sm text-[#18352A] placeholder:text-gray-400 focus:border-[#174C38] focus:ring-2 focus:ring-[#174C38]/15 outline-none transition-all"
                />
              </label>

              <label className="block">
                <span className="text-xs sm:text-sm font-medium text-[#18352A]">Estimated Quantity / Boxes (Optional)</span>
                <input
                  name="quantity"
                  placeholder="e.g. 5 cartons / 200 rolls"
                  className="mt-1 w-full rounded-xl border border-[#D7E5DA] bg-white px-3.5 py-2.5 text-sm text-[#18352A] placeholder:text-gray-400 focus:border-[#174C38] focus:ring-2 focus:ring-[#174C38]/15 outline-none transition-all"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-xs sm:text-sm font-medium text-[#18352A]">Specific Requirements or Message (Optional)</span>
              <textarea
                name="message"
                rows={3}
                placeholder="Share any specifications, delivery location, or timeline..."
                className="mt-1 w-full rounded-xl border border-[#D7E5DA] bg-white px-3.5 py-2.5 text-sm text-[#18352A] placeholder:text-gray-400 focus:border-[#174C38] focus:ring-2 focus:ring-[#174C38]/15 outline-none transition-all"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center min-h-[46px] rounded-full bg-[#174C38] py-3 font-semibold text-sm text-white transition-all hover:bg-[#236747] shadow-sm active:scale-98 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting Quotation..." : "Request Official Quotation"}
            </button>

            <p className="text-center text-xs text-[#68766D] mt-2">
              Inquiry is submitted directly to Dharampal Verma in Mandi Goluwala. We will reply promptly with availability and quotation.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
