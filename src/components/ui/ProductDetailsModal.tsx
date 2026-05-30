"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
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
  const [activeImage, setActiveImage] = useState<string>("");
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const [prevProduct, setPrevProduct] = useState<EnrichedProduct | null>(null);
  if (product !== prevProduct) {
    setPrevProduct(product);
    setActiveImage(product ? product.image : "");
    setShowInquiryForm(false);
    setFormSent(false);
  }

  // Lock body scroll when modal is open
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

  if (!product) return null;

  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
    `Hello Ganpati Lifecare, I am interested in inquiring about: ${product.name} (Category: ${product.category})`
  )}`;

  const callUrl = `tel:${BUSINESS.phones[0]}`;

  const handleInquirySubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name");
    const phone = data.get("phone");
    const notes = data.get("notes");
    
    const text = `Product Inquiry%0AProduct Name: ${product.name}%0ACategory: ${product.category}%0AClient Name: ${name}%0APhone: ${phone}%0AMessage: ${notes}`;
    
    window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${text}`, "_blank");
    setFormSent(true);
    e.currentTarget.reset();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-card text-foreground shadow-2xl border border-medical/15 z-10 scrollbar-thin"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-muted hover:text-medical border border-medical/10 shadow-sm transition-colors cursor-pointer"
              aria-label="Close details"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 sm:p-6 md:p-8">
              {/* Left Column: Image Gallery */}
              <div className="flex flex-col gap-4">
                {/* Main Image Display */}
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted/20 border border-medical/5">
                  <Image
                    src={activeImage || product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>

                {/* Gallery Thumbnails */}
                {product.gallery.length > 1 && (
                  <div className="flex flex-wrap gap-2.5">
                    {product.gallery.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(img)}
                        className={`relative h-16 w-16 overflow-hidden rounded-lg border-2 bg-muted/10 transition-all ${
                          activeImage === img ? "border-medical scale-105 shadow-sm" : "border-transparent opacity-75 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${product.name} preview ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Details & Inquiry Form */}
              <div className="flex flex-col gap-5">
                {/* Category & Title */}
                <div>
                  <span className="inline-block rounded-full bg-medical/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-medical-dark dark:text-medical-light">
                    {product.category}
                  </span>
                  <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    {product.name}
                  </h2>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-muted md:text-base">
                  {product.description}
                </p>

                {/* Features list */}
                {product.features && product.features.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                      Key Features
                    </h3>
                    <ul className="mt-2 space-y-1.5">
                      {product.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-foreground/90">
                          <svg className="mt-0.5 h-4.5 w-4.5 shrink-0 text-medical" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Specifications table */}
                {product.specifications && Object.keys(product.specifications).length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                      Technical Specifications
                    </h3>
                    <div className="mt-2 overflow-hidden rounded-xl border border-medical/10 text-sm">
                      <table className="w-full border-collapse text-left">
                        <tbody>
                          {Object.entries(product.specifications).map(([key, val], idx) => (
                            <tr
                              key={idx}
                              className={idx % 2 === 0 ? "bg-muted/10" : "bg-transparent"}
                            >
                              <td className="border-r border-medical/10 px-4 py-2 font-semibold text-muted w-1/3">
                                {key}
                              </td>
                              <td className="px-4 py-2 text-foreground/95">
                                {val}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Usage instruction */}
                {product.usage && (
                  <div className="rounded-2xl bg-medical/5 p-4 border border-medical/10">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-medical-dark dark:text-medical-light">
                      Usage Guidelines
                    </h3>
                    <p className="mt-1.5 text-xs md:text-sm text-foreground/90 leading-relaxed">
                      {product.usage}
                    </p>
                  </div>
                )}

                {/* Call-to-Actions Buttons */}
                <div className="mt-2 flex flex-col gap-2.5">
                  <div className="flex gap-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-sm font-bold text-white transition hover:bg-[#20ba59] shadow-sm active:scale-98"
                    >
                      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.197 1.45 4.817 1.45 5.487 0 9.954-4.466 9.957-9.958.002-2.661-1.034-5.163-2.92-7.054C16.616 1.701 14.113.666 11.45.665c-5.492 0-9.959 4.468-9.962 9.959-.001 1.737.478 3.427 1.39 4.908l-.999 3.65 3.738-.98c1.51.823 3.155 1.25 4.82 1.25.01 0 0 0 0 0z" />
                      </svg>
                      WhatsApp Chat
                    </a>

                    <a
                      href={callUrl}
                      className="flex-1 flex items-center justify-center gap-2 rounded-full bg-brand-orange py-3 text-sm font-bold text-white transition hover:bg-brand-orange-dark shadow-sm active:scale-98"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call Direct
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      setShowInquiryForm(!showInquiryForm);
                      setFormSent(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-medical py-3 text-sm font-bold text-white transition hover:bg-medical-dark shadow-sm active:scale-98 cursor-pointer"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    {showInquiryForm ? "Hide Form" : "Send Inquiry Request"}
                  </button>
                </div>

                {/* Sub-panel Form for Direct Inquiries */}
                <AnimatePresence>
                  {showInquiryForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden rounded-2xl border border-medical/15 bg-background p-4"
                    >
                      <h4 className="text-sm font-bold text-foreground mb-3">
                        Inquire about {product.name}
                      </h4>
                      {formSent ? (
                        <div className="text-center py-4 text-sm text-medical font-medium">
                          ✓ Inquiry request opening via WhatsApp…
                        </div>
                      ) : (
                        <form onSubmit={handleInquirySubmit} className="space-y-3">
                          <div>
                            <input
                              type="text"
                              name="name"
                              required
                              placeholder="Your Name"
                              className="w-full rounded-xl border border-medical/20 bg-card px-3 py-2 text-sm outline-none focus:border-medical"
                            />
                          </div>
                          <div>
                            <input
                              type="tel"
                              name="phone"
                              required
                              placeholder="Phone Number"
                              className="w-full rounded-xl border border-medical/20 bg-card px-3 py-2 text-sm outline-none focus:border-medical"
                            />
                          </div>
                          <div>
                            <textarea
                              name="notes"
                              rows={2}
                              placeholder="Notes (quantity, specifications, custom requests...)"
                              className="w-full rounded-xl border border-medical/20 bg-card px-3 py-2 text-sm outline-none focus:border-medical"
                            />
                          </div>
                          <button
                            type="submit"
                            className="w-full rounded-full bg-medical py-2 text-xs font-semibold text-white transition hover:bg-medical-dark cursor-pointer"
                          >
                            Submit Inquiry Form
                          </button>
                        </form>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
