import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions | Ganpati Lifecare",
  description: "Terms and conditions for product inquiries, quotations, and supply orders with Ganpati Lifecare.",
};

export default function TermsAndConditionsPage() {
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
              Terms &amp; Conditions
            </h1>
            <p className="mt-2 text-xs text-muted">Effective Date: 2026</p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-foreground/85">
            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-foreground">1. Agreement to Terms</h2>
              <p>
                By accessing this website or requesting quotations from Ganpati Lifecare (GLC), you agree to abide by these terms and conditions. These terms govern all inquiries, wholesale transactions, and commercial arrangements.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-foreground">2. Quotations &amp; Commercial Supply</h2>
              <p>
                All prices and quotations provided via WhatsApp, phone, email, or formal proforma invoices are subject to confirmation based on order volume, raw material costs, and delivery location. An inquiry submitted on this website does not constitute a binding purchase contract until explicitly confirmed by our sales department.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-foreground">3. Product Specifications &amp; Quality</h2>
              <p>
                Ganpati Lifecare supplies orthopedic, surgical, hospital uniform, and healthcare products manufactured and inspected for clinical healthcare standards. Buyers are encouraged to specify required dimensions, GSM, ply, or fabric compositions during quotation requests to ensure exact clinical compatibility.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-foreground">4. Dispatch &amp; Delivery</h2>
              <p>
                Delivery schedules and transit timelines across Rajasthan and North India are communicated upon order confirmation. Ganpati Lifecare utilizes reliable freight and logistics partners to ensure timely delivery.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-foreground">5. Governing Law</h2>
              <p>
                Any disputes relating to commercial transactions with Ganpati Lifecare shall be subject to the jurisdiction of the courts in Hanumangarh, Rajasthan, India.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-foreground">6. Contact Information</h2>
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
