"use client";

import { useState, FormEvent } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { BUSINESS } from "@/lib/constants";

export function DistributorPartnership() {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: (formData.get("email") as string) || "",
      product_name: `Distributor Request - ${formData.get("products") || "General"}`,
      quantity: "Distributor/Wholesale",
      message: `Business: ${formData.get("businessName") || "N/A"} | City: ${
        formData.get("city") || "N/A"
      } | Note: ${formData.get("message") || "Interested in becoming a distributor."}`,
      source: "Distributor Form",
    };

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSent(true);
        form.reset();
        const whatsappText = `Hello Ganpati Lifecare,\n\nI would like to apply as a Distributor / Partner.\n\nName: ${payload.name}\nBusiness: ${formData.get("businessName")}\nPhone: ${payload.phone}\nCity: ${formData.get("city")}\n\nPlease contact me. Thank you.`;
        window.open(
          `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(whatsappText)}`,
          "_blank"
        );
      }
    } catch (err) {
      console.error("Distributor inquiry error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-[#007a38] to-[#009245] py-14 text-white md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <AnimateIn>
            <SectionHeading
              light
              eyebrow="Partnership"
              title="Become a Ganpati Lifecare Distributor"
              description="Partner with GLC for reliable supply of orthopedic, surgical, hospital uniform and healthcare products."
            />
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-xs border border-white/20">
              <ul className="space-y-3 text-xs sm:text-sm text-white/95">
                <li className="flex items-center gap-2.5">
                  <span className="text-amber-300 font-bold">●</span>
                  Reliable wholesale pricing for hospitals and retail supply
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-amber-300 font-bold">●</span>
                  High-demand orthopedic cotton rolls, stockinet, and gauze
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-amber-300 font-bold">●</span>
                  Dependable dispatch support across Rajasthan &amp; North India
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="rounded-full bg-brand-orange px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-brand-orange-dark transition-colors cursor-pointer"
                >
                  Become a Partner
                </button>
                <a
                  href={`tel:${BUSINESS.phones[0]}`}
                  className="rounded-full bg-white/20 border border-white/40 px-5 py-3 text-xs sm:text-sm font-bold text-white hover:bg-white hover:text-medical transition-colors"
                >
                  Talk to Sales
                </a>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* Distributor Application Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs text-foreground">
          <div className="relative w-full max-w-lg rounded-2xl bg-card p-6 shadow-2xl border border-medical/20">
            <button
              onClick={() => {
                setShowModal(false);
                setSent(false);
              }}
              className="absolute top-4 right-4 text-muted hover:text-foreground cursor-pointer text-sm"
              aria-label="Close form"
            >
              ✕
            </button>

            {sent ? (
              <div className="py-6 text-center">
                <h3 className="font-display text-xl font-bold text-medical">Application Received!</h3>
                <p className="mt-2 text-xs text-muted">
                  Thank you for your interest in partnering with Ganpati Lifecare. We will contact you soon.
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-5 rounded-full bg-medical px-6 py-2 text-xs font-bold text-white"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <h3 className="font-display text-lg font-bold text-foreground">
                  Distributor Partnership Inquiry
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    name="name"
                    required
                    placeholder="Your Name *"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs outline-none focus:border-medical"
                  />
                  <input
                    name="businessName"
                    required
                    placeholder="Business / Firm Name *"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs outline-none focus:border-medical"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="Phone Number *"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs outline-none focus:border-medical"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs outline-none focus:border-medical"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    name="city"
                    required
                    placeholder="City / Region *"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs outline-none focus:border-medical"
                  />
                  <input
                    name="products"
                    placeholder="Products Interested In"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs outline-none focus:border-medical"
                  />
                </div>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Tell us about your distribution experience and coverage..."
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs outline-none focus:border-medical"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-brand-orange py-2.5 text-xs font-bold text-white hover:bg-brand-orange-dark transition-colors cursor-pointer"
                >
                  {isSubmitting ? "Submitting..." : "Submit Partnership Request"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
