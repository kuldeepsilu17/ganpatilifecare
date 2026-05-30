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

    const payload = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      product_name: "General Inquiry",
      quantity: "1",
      message: formData.get("message") as string,
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

      // Launch the default email client with pre-filled content returned by API
      const mailtoUrl = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(
        result.emailSubject
      )}&body=${encodeURIComponent(result.emailBody)}`;
      
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
    <section id="contact" className="gradient-green-soft py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Get In Touch"
          description={`Reach ${BUSINESS.name} in Goluwala, Hanumangarh for medical supplies.`}
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <article className="rounded-2xl bg-card p-6 shadow-lg">
              <h3 className="font-display text-xl font-bold">{BUSINESS.name}</h3>
              <p className="mt-2 text-muted">{BUSINESS.location}</p>
              <p className="mt-4">
                <span className="font-medium">Contact:</span> {BUSINESS.contactPerson}
              </p>
              <ul className="mt-4 space-y-2">
                {BUSINESS.phoneDisplay.map((phone, i) => (
                  <li key={phone}>
                    <a href={`tel:${BUSINESS.phones[i]}`} className="font-medium text-medical hover:underline">
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>
              <a href={`mailto:${BUSINESS.email}`} className="mt-4 block text-medical hover:underline">
                {BUSINESS.email}
              </a>
            </article>
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <iframe
                title="Ganpati Lifecare location map"
                src={mapSrc}
                className="h-64 w-full border-0 md:h-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {sent ? (
            <div className="rounded-2xl bg-card p-8 shadow-lg border border-medical/15 flex flex-col items-center text-center justify-center min-h-[400px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-medical/10 text-medical shadow-inner">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-foreground">Inquiry Received!</h3>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted">
                Inquiry ID: <span className="text-medical">{inquiryId}</span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-foreground/80 max-w-sm">
                Thank you for contacting Ganpati Lifecare. Your inquiry has been received successfully. Our team will contact you shortly.
              </p>
              <p className="mt-4 text-xs text-muted">
                Your default email client should open automatically with your inquiry summary.
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setInquiryId("");
                }}
                className="mt-8 rounded-full border border-medical/20 bg-background px-6 py-2.5 text-xs font-bold text-medical hover:bg-medical/5 transition-colors cursor-pointer"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="rounded-2xl bg-card p-8 shadow-lg">
              <h3 className="font-display text-xl font-bold">Send an Inquiry</h3>
              
              {errorMsg && (
                <div className="mt-4 rounded-xl bg-brand-red/10 p-4 text-sm text-brand-red border border-brand-red/10">
                  {errorMsg}
                </div>
              )}

              <label className="mt-4 block">
                <span className="text-sm font-medium">Your Name</span>
                <input
                  name="name"
                  required
                  placeholder="Enter your name"
                  className="mt-1 w-full rounded-xl border border-medical/20 bg-background px-4 py-3 placeholder:text-gray-400 focus:border-medical focus:ring-4 focus:ring-medical/15 focus:shadow-md outline-none transition-all duration-300 ease-in-out"
                />
              </label>
              
              <label className="mt-4 block">
                <span className="text-sm font-medium">Phone Number</span>
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="Enter your phone number"
                  className="mt-1 w-full rounded-xl border border-medical/20 bg-background px-4 py-3 placeholder:text-gray-400 focus:border-medical focus:ring-4 focus:ring-medical/15 focus:shadow-md outline-none transition-all duration-300 ease-in-out"
                />
              </label>
              
              <label className="mt-4 block">
                <span className="text-sm font-medium">Email Address</span>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="mt-1 w-full rounded-xl border border-medical/20 bg-background px-4 py-3 placeholder:text-gray-400 focus:border-medical focus:ring-4 focus:ring-medical/15 focus:shadow-md outline-none transition-all duration-300 ease-in-out"
                />
              </label>
              
              <label className="mt-4 block">
                <span className="text-sm font-medium">Your Message</span>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Enter your message"
                  className="mt-1 w-full rounded-xl border border-medical/20 bg-background px-4 py-3 placeholder:text-gray-400 focus:border-medical focus:ring-4 focus:ring-medical/15 focus:shadow-md outline-none transition-all duration-300 ease-in-out"
                />
              </label>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full rounded-full bg-medical py-3 font-semibold text-white hover:bg-medical-dark transition-all duration-300 shadow-md active:scale-98 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Send Email Inquiry"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
