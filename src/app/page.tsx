import type { Metadata } from "next";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Products } from "@/components/sections/Products";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { Certifications } from "@/components/sections/Certifications";
import { FeaturedBrands } from "@/components/sections/FeaturedBrands";
import { DistributorPartnership } from "@/components/sections/DistributorPartnership";
import { RequestQuote } from "@/components/sections/RequestQuote";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { BUSINESS } from "@/lib/constants";
import { getFaqSchema } from "@/lib/schema";
import { FAQS } from "@/lib/data";

const title = "Ganpati Lifecare | Orthopedic, Surgical & Hospital Supplies";
const description =
  "Ganpati Lifecare, owned and operated by Dharampal Verma in Goluwala, Hanumangarh, Rajasthan, supplies orthopedic, surgical and hospital products including surgical cotton roll and dressing products.";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
    type: "website",
    images: [
      {
        url: `${BUSINESS.siteUrl}/og-brand.png`,
        width: 1200,
        height: 630,
        alt: "Ganpati Lifecare - Orthopedic, Surgical & Hospital Supplies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${BUSINESS.siteUrl}/og-brand.png`],
  },
};

export default function Home() {
  const faqSchema = getFaqSchema(FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Products />
        <WhyChooseUs />
        <Certifications />
        <FeaturedBrands />
        <Testimonials />
        <RequestQuote />
        <DistributorPartnership />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
