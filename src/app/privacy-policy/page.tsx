import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | Ganpati Lifecare",
  description: "Privacy Policy and data protection guidelines of Ganpati Lifecare (GLC).",
  alternates: {
    canonical: `${BUSINESS.siteUrl}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen py-12 md:py-20 text-foreground">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/" className="text-xs font-semibold text-medical hover:underline">
              ← Back to Home
            </Link>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-foreground">
              Privacy Policy
            </h1>
            <p className="mt-2 text-xs text-muted">Last Updated: 2026</p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-foreground/85">
            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-foreground">1. Introduction</h2>
              <p>
                Ganpati Lifecare (&ldquo;GLC&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, handle, and safeguard the information you provide when using our website and contacting us for medical and surgical product inquiries.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-foreground">2. Information We Collect</h2>
              <p>We only collect information necessary to process your inquiries and fulfill bulk order requests, including:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your name and business/hospital affiliation</li>
                <li>Contact phone number (for voice and WhatsApp communication)</li>
                <li>Email address (for formal quotation dispatch)</li>
                <li>Product requirements, quantities, and delivery location</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-foreground">3. How We Use Your Information</h2>
              <p>The information collected is used exclusively for:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Responding to product availability inquiries and price quotes</li>
                <li>Processing and coordinating wholesale/bulk order shipments</li>
                <li>Communicating critical updates regarding delivery or logistics</li>
                <li>Internal record-keeping to maintain customer service history</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-foreground">4. WhatsApp &amp; Email Communications</h2>
              <p>
                When you initiate a WhatsApp inquiry or send an email through our website forms, your contact information is transmitted directly to our sales team. We do not sell, rent, or trade your personal or business data to third-party advertisers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-foreground">5. Data Security</h2>
              <p>
                We employ reasonable electronic and administrative safeguards to prevent unauthorized access, maintain data integrity, and ensure the correct use of information submitted through our site.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-foreground">6. Contact Information</h2>
              <p>
                If you have questions regarding this Privacy Policy or wish to update your contact preferences, please reach us at:
              </p>
              <p className="mt-2 text-foreground font-semibold">
                Ganpati Lifecare<br />
                Goluwala, Hanumangarh, Rajasthan, India<br />
                Phone: +91 98282 32254 / +91 94600 95250<br />
                Email: {BUSINESS.email}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
