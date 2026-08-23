"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { EnrichedProduct } from "@/lib/product-details";
import { BUSINESS } from "@/lib/constants";

interface ProductDetailsModalProps {
  product: EnrichedProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailsModal({
  product,
  isOpen,
  onClose,
}: ProductDetailsModalProps) {
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setShowInquiryForm(false);
    setFormSent(false);
    onClose();
  };

  if (!product) return null;

  const whatsappInquiryUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
    `Hello Ganpati Lifecare,\n\nI am interested in ${product.name}.\n\nPlease share availability, sizes and quotation.\n\nThank you.`
  )}`;

  const handleInquirySubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: (formData.get("email") as string) || "",
      product_name: product.name,
      quantity: (formData.get("quantity") as string) || "1",
      message: (formData.get("message") as string) || `Inquiry for ${product.name}`,
      source: "Product Modal",
    };

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setFormSent(true);
        form.reset();
        window.open(whatsappInquiryUrl, "_blank");
      }
    } catch (err) {
      console.error("Modal inquiry error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card text-foreground shadow-2xl border border-medical/20 z-10 p-4 sm:p-6 md:p-8"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3.5 right-3.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-muted hover:text-medical transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Left Column: Image */}
              <div>
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50 border border-medical/10">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-medical bg-medical/5 px-3 py-2 rounded-lg border border-medical/10">
                  <span>✓</span>
                  <span>Bulk orders &amp; wholesale hospital supply available</span>
                </div>

                {/* Direct Action Links */}
                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-[#1fb855] transition-colors"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp Inquiry
                  </a>
                  <Link
                    href={`/products/${product.id}`}
                    onClick={handleClose}
                    className="text-center text-xs font-semibold text-medical hover:underline pt-1"
                  >
                    Open Full Product Page →
                  </Link>
                </div>
              </div>

              {/* Right Column: Information & Details */}
              <div className="space-y-4">
                <div>
                  <span className="inline-block rounded-full bg-medical/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-medical">
                    {product.category}
                  </span>
                  <h2 className="mt-1.5 font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                    {product.name}
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-foreground/80 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Applications / Usage */}
                {product.usage && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/90">
                      Applications &amp; Uses
                    </h3>
                    <p className="mt-1 text-xs text-foreground/80 leading-relaxed">
                      {product.usage}
                    </p>
                  </div>
                )}

                {/* Sizes / Specifications */}
                <div className="rounded-xl bg-gray-50 p-3 border border-gray-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/90 mb-1.5">
                    Available Sizes &amp; Specifications
                  </h3>
                  {product.specifications && Object.keys(product.specifications).length > 0 ? (
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(product.specifications).map(([key, val]) => (
                        <div key={key}>
                          <span className="font-semibold text-foreground/70">{key}: </span>
                          <span className="text-foreground">{val}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted">
                      Contact us for available sizes, customized packaging, and bulk specifications.
                    </p>
                  )}
                </div>

                {/* Quick Quote Button / Form */}
                <div className="pt-2">
                  {!showInquiryForm ? (
                    <button
                      type="button"
                      onClick={() => setShowInquiryForm(true)}
                      className="w-full rounded-xl bg-medical py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-medical-dark transition-colors cursor-pointer"
                    >
                      Get Bulk Quote for {product.name}
                    </button>
                  ) : formSent ? (
                    <div className="rounded-xl bg-medical/10 p-3 text-center text-xs font-bold text-medical">
                      Quote request submitted! Opening WhatsApp...
                    </div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} className="space-y-2.5 rounded-xl bg-gray-50 p-3 border border-gray-200">
                      <h4 className="text-xs font-bold text-foreground">Get Bulk Quote for {product.name}</h4>
                      <input
                        name="name"
                        required
                        placeholder="Your Name"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-foreground outline-none focus:border-medical"
                      />
                      <input
                        name="phone"
                        type="tel"
                        required
                        placeholder="Phone Number (e.g. +91 98282 32254)"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-foreground outline-none focus:border-medical"
                      />
                      <input
                        name="quantity"
                        placeholder="Required Quantity / Details"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-foreground outline-none focus:border-medical"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-medical py-2 text-xs font-bold text-white hover:bg-medical-dark transition-colors cursor-pointer"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Quote Request"}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
