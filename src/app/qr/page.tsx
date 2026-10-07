import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { QR_LINKS } from "@/lib/utm";

export const metadata: Metadata = {
  title: "Official QR Codes | Ganpati Lifecare Hanumangarh",
  description: "Official downloadable QR codes for Ganpati Lifecare: Google reviews, WhatsApp chat, website catalog, and company fact sheet for packaging & invoices.",
  robots: {
    index: false,
    follow: true,
  },
};

const QR_ITEMS = [
  {
    title: "Google Review QR Code",
    description: "Print on delivery boxes, invoices, and payment counters to request genuine customer reviews.",
    url: QR_LINKS.gbpReview,
    badge: "Reputation & SEO",
    note: "Links directly to Google Business Profile review prompt.",
  },
  {
    title: "Direct WhatsApp Ordering QR",
    description: "Print on product packaging so hospital procurement staff can reorder directly via WhatsApp in 1 scan.",
    url: QR_LINKS.whatsappGeneral,
    badge: "Direct Reorders",
    note: "Opens pre-filled WhatsApp chat with Ganpati Lifecare.",
  },
  {
    title: "Full Website & Catalog QR",
    description: "For visiting cards, promotional flyers, brochures, and exhibition materials.",
    url: QR_LINKS.websiteHome,
    badge: "Visiting Cards",
    note: "Takes buyers directly to the complete product range.",
  },
  {
    title: "Company Facts & Disambiguation QR",
    description: "For formal corporate communications, GST verification, and trade references.",
    url: QR_LINKS.companyFacts,
    badge: "Corporate & GST",
    note: "Links to verified legal facts and ownership info.",
  },
];

export default function QRPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block rounded-full bg-medical/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-medical mb-3">
              Print &amp; Packaging Assets
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Official QR Codes for Print &amp; Invoices
            </h1>
            <p className="mt-3 text-sm sm:text-base text-muted max-w-2xl mx-auto">
              Scan or download these high-resolution QR codes to print on invoices, carton packaging, visiting cards, and doctor sample packs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {QR_ITEMS.map((item, idx) => {
              const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(item.url)}&margin=15`;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-card p-6 sm:p-8 border border-medical/15 shadow-sm flex flex-col items-center text-center justify-between"
                >
                  <div className="w-full">
                    <span className="inline-block rounded-full bg-medical/10 px-3 py-1 text-[11px] font-bold text-medical mb-3">
                      {item.badge}
                    </span>
                    <h2 className="font-display text-xl font-bold text-foreground">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-muted">
                      {item.description}
                    </p>
                  </div>

                  <div className="my-6 rounded-2xl bg-white p-4 shadow-sm border border-medical/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={qrImageUrl}
                      alt={item.title}
                      width={220}
                      height={220}
                      className="mx-auto rounded-lg"
                    />
                  </div>

                  <div className="w-full space-y-3">
                    <p className="text-[11px] text-muted-foreground font-mono truncate px-2">
                      {item.url}
                    </p>
                    <div className="flex gap-2 justify-center">
                      <a
                        href={qrImageUrl}
                        download={`ganpati-lifecare-${item.badge.toLowerCase().replace(/\s+/g, "-")}-qr.png`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-medical px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-medical-dark transition"
                      >
                        Download QR Image
                      </a>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-card border border-medical/20 px-4 py-2.5 text-xs font-bold text-foreground hover:bg-medical/5 transition"
                      >
                        Test Link ↗
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 rounded-3xl bg-medical/5 border border-medical/10 p-6 sm:p-8 text-center max-w-2xl mx-auto">
            <h3 className="font-display text-lg font-bold text-foreground">
              Need custom packaging QR codes with batch IDs?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-muted">
              We can generate product-specific QR codes for hospital consignments and pharmacy distributor stock.
            </p>
            <div className="mt-4">
              <Link
                href="/contact"
                className="inline-flex rounded-full bg-medical px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-medical-dark transition"
              >
                Contact Business Office &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
