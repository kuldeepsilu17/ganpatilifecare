import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Products } from "@/components/sections/Products";
import { RequestQuote } from "@/components/sections/RequestQuote";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Medical & Surgical Products Catalog | Ganpati Lifecare",
  description:
    "Browse the medical and surgical product catalog from Ganpati Lifecare in Goluwala, Hanumangarh, Rajasthan. Quality orthopedic supplies, hospital uniforms, and consumables.",
  alternates: {
    canonical: `${BUSINESS.siteUrl}/products`,
  },
};

export default function ProductsCatalogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-6">
        <Products />
        <RequestQuote />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
