import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Page Not Found | Ganpati Lifecare",
  description: "The requested page could not be found. Explore our surgical and healthcare supplies catalog.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  const quickLinks = [
    { href: "/", label: "Homepage", desc: "Return to our main portal" },
    { href: "/products", label: "Products Catalog", desc: "Surgical cotton rolls & dressings" },
    { href: "/categories/orthopedic", label: "Product Categories", desc: "Orthopedic, surgical & uniforms" },
    { href: "/locations", label: "Service Hubs", desc: "Hanumangarh, Ganganagar & Rajasthan" },
    { href: "/company-facts", label: "Company Facts", desc: "Verified business & ownership facts" },
    { href: "/contact", label: "Contact Us", desc: "Direct inquiries & quote requests" },
  ];

  return (
    <main>
      <PageHero
        eyebrow="404 ERROR"
        title="Page not found"
        summary="The page you are looking for may have been moved, renamed, or is temporarily unavailable. Browse the essential links below."
        breadcrumbs={[{ label: "404 Not Found" }]}
      />
      <section className="page-content">
        <div className="wrap">
          <div className="content-cards">
            {quickLinks.map((item) => (
              <article className="content-card" key={item.href}>
                <h2>{item.label}</h2>
                <p>{item.desc}</p>
                <Link className="text-link" href={item.href}>
                  Visit page &rarr;
                </Link>
              </article>
            ))}
          </div>
          <div className="inline-quote" style={{ marginTop: "40px", textAlign: "center" }}>
            <Link className="button button-orange" href="/">
              Return to Homepage
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
