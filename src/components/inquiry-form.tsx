"use client";

import { useState } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { business } from "@/lib/site-data";

type InquiryFormProps = { productName?: string; compact?: boolean };
const inquiryFormSchema = z.object({ name: z.string().trim().min(2, "Enter your full name.").max(100), phone: z.string().trim().regex(/^[+\d()\s-]{7,18}$/, "Enter a valid phone number."), email: z.union([z.string().trim().email("Enter a valid email address."), z.literal("")]).optional(), requirement: z.string().trim().min(2, "List the products you need.").max(300), quantity: z.string().trim().max(1000).optional() });
type InquiryFormValues = z.infer<typeof inquiryFormSchema>;

export function InquiryForm({ productName, compact = false }: InquiryFormProps) {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<InquiryFormValues>({ resolver: zodResolver(inquiryFormSchema), defaultValues: { name: "", phone: "", email: "", requirement: productName ?? "", quantity: "" } });
  async function submit(values: InquiryFormValues) {
    const { name, phone, email = "", requirement, quantity = "" } = values;
    const text = [`Hello Ganpati Lifecare, my name is ${name}.`, `Phone: ${phone}`, `Products required: ${requirement}`, quantity ? `Quantity / bulk details: ${quantity}` : "", "Please share availability and a wholesale quotation."].filter(Boolean).join("\n");
    const whatsappWindow = window.open(`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setIsSubmitting(true);
    setMessage("Sending your inquiry...");
    try {
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ customerName: name, phone, email, productName: requirement, quantity, inquiryType: productName ? "PRODUCT" : "BULK" }) });
      const result = await response.json() as { message?: string; error?: string };
      if (!response.ok) throw new Error(result.error ?? "Your inquiry could not be saved.");
      setMessage(`${result.message ?? "Your inquiry was saved."} ${whatsappWindow ? "Please send the prepared WhatsApp message to complete contact." : "WhatsApp was blocked by your browser; call or WhatsApp us directly."}`);
    } catch (error) {
      setMessage(`${error instanceof Error ? error.message : "Your inquiry could not be saved."} ${whatsappWindow ? "A WhatsApp message is open; please send it to contact the business." : "Please contact the business directly."}`);
    } finally {
      setIsSubmitting(false);
    }
  }
  return <form className={compact ? "inquiry-form compact-form" : "inquiry-form"} onSubmit={handleSubmit(submit)}>
    <label>Your name<input {...register("name")} autoComplete="name" placeholder="Full name" aria-invalid={Boolean(errors.name)} />{errors.name && <span className="field-error">{errors.name.message}</span>}</label>
    <label>Phone number<input {...register("phone")} autoComplete="tel" inputMode="tel" placeholder="+91" aria-invalid={Boolean(errors.phone)} />{errors.phone && <span className="field-error">{errors.phone.message}</span>}</label>
    <label className="form-wide">Email address <span>(optional)</span><input {...register("email")} autoComplete="email" type="email" placeholder="name@example.com" aria-invalid={Boolean(errors.email)} />{errors.email && <span className="field-error">{errors.email.message}</span>}</label>
    <label className="form-wide">Products required<input {...register("requirement")} placeholder="Product names or requirements" aria-invalid={Boolean(errors.requirement)} />{errors.requirement && <span className="field-error">{errors.requirement.message}</span>}</label>
    {!compact && <label className="form-wide">Quantity / bulk details<textarea {...register("quantity")} rows={3} placeholder="Quantities, delivery location or other details" /></label>}
    <button className="button button-green form-wide" type="submit" disabled={isSubmitting}><MessageCircle size={18} /> {isSubmitting ? "Sending inquiry..." : "Request a quote via WhatsApp"} <ArrowUpRight size={16} /></button><p className="form-note" aria-live="polite">{message}</p>
  </form>;
}
