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

export const metadata: Metadata = {
  alternates: {
    canonical: BUSINESS.siteUrl,
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
