import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Logo } from "@/components/brand/Logo";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-6 rounded-2xl bg-white/95 p-3 shadow-md border border-medical/10">
          <Logo variant="mark" priority className="h-14 w-auto" />
        </div>
        <p className="text-xs font-bold uppercase tracking-widest text-medical">404 Error</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-foreground">
          Page Not Found
        </h1>
        <p className="mt-3 max-w-md text-xs sm:text-sm text-muted">
          The page you&apos;re looking for may have moved or no longer exists. Explore our surgical and healthcare supplies below.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-medical px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-medical-dark transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/products"
            className="rounded-full bg-brand-orange px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-brand-orange-dark transition-colors"
          >
            View Products
          </Link>
          <Link
            href="/#contact"
            className="rounded-full border border-medical/30 px-6 py-2.5 text-xs font-bold text-medical hover:bg-medical/10 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
