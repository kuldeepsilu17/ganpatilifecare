import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { RequestQuote } from "@/components/sections/RequestQuote";
import { CATEGORIES_DATA, getCategoryBySlug } from "@/lib/categories";
import { PRODUCTS } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import { BUSINESS, WHATSAPP_MESSAGES, getWhatsAppInquiryUrl } from "@/lib/constants";
import { getBreadcrumbSchema, getFaqSchema } from "@/lib/schema";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES_DATA.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found | Ganpati Lifecare",
    };
  }

  const canonicalUrl = `${SITE_URL}/categories/${category.slug}`;

  return {
    title: category.metaTitle,
    description: category.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: category.metaTitle,
      description: category.metaDescription,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: `${SITE_URL}/og-brand.png`,
          width: 1200,
          height: 630,
          alt: `${category.name} - Ganpati Lifecare`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: category.metaTitle,
      description: category.metaDescription,
      images: [`${SITE_URL}/og-brand.png`],
    },
  };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const canonicalUrl = `${SITE_URL}/categories/${category.slug}`;
  const categoryProducts = PRODUCTS.filter(
    (p) => p.category === category.categoryId
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Categories", url: `${SITE_URL}/products#categories` },
    { name: category.name, url: canonicalUrl },
  ]);

  const faqSchema = getFaqSchema(category.faqs);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonicalUrl}#collection`,
    name: category.h1,
    description: category.description,
    url: canonicalUrl,
    mainEntity: {
      "@type": "ItemList",
      name: category.name,
      description: category.description,
      url: canonicalUrl,
      numberOfItems: categoryProducts.length,
      itemListElement: categoryProducts.map((product, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: product.name,
        url: `${SITE_URL}/products/${product.id}`,
      })),
    },
  };

  const whatsappInquiryUrl = getWhatsAppInquiryUrl(
    `Hello Ganpati Lifecare, I want to enquire about wholesale supply for ${category.name}. Please share your product catalog and bulk price quotation.`
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#EDF5EF]/60 py-14 sm:py-20 border-b border-[#D7E5DA]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            {/* Breadcrumb Navigation */}
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs text-[#68766D]"
            >
              <Link href="/" className="hover:text-[#174C38] transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/products"
                className="hover:text-[#174C38] transition-colors"
              >
                Products
              </Link>
              <span>/</span>
              <span className="font-semibold text-[#18352A]">
                {category.name}
              </span>
            </nav>

            <span className="inline-block rounded-full bg-[#EDF5EF] border border-[#D7E5DA] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#174C38] mb-3">
              Medical Wholesale Category
            </span>

            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-[#18352A] tracking-tight">
              {category.h1}
            </h1>

            {/* Quick Answer Block (AEO) */}
            <div className="mt-6 mx-auto max-w-3xl rounded-2xl bg-white p-5 sm:p-6 border border-[#D7E5DA] shadow-xs text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-[#174C38] mb-1">
                Quick Summary / Direct Answer
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-[#46554C] font-medium">
                {category.quickAnswer}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#258653] px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#174C38] transition-all hover:-translate-y-0.5"
              >
                Request Category Quotation on WhatsApp
              </a>
              <a
                href={`tel:${BUSINESS.phones[0]}`}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-white border border-[#D7E5DA] px-6 py-3 text-xs sm:text-sm font-semibold text-[#18352A] shadow-xs hover:bg-[#F7F8F5] transition-all hover:-translate-y-0.5"
              >
                Call Sales Desk
              </a>
            </div>
          </div>
        </section>

        {/* Detailed Category Overview (250+ words copy) */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-[#D7E5DA] bg-white p-6 sm:p-10 shadow-xs space-y-6">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#18352A]">
                Clinical Overview &amp; Procurement Specifications
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[#46554C]">
                {category.description}
              </p>

              <div className="pt-4 border-t border-[#D7E5DA]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#68766D] mb-3">
                  Why Healthcare Facilities Choose Ganpati Lifecare:
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#46554C]">
                  {category.keyBenefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#258653] font-bold">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#D7E5DA] flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-[#68766D]">
                <span>
                  Distribution Hub: <strong className="text-[#18352A]">Goluwala, Hanumangarh</strong>
                </span>
                <Link
                  href="/locations/hanumangarh"
                  className="font-semibold text-[#174C38] hover:underline"
                >
                  View Hanumangarh local delivery details →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid for this category */}
        <section className="py-8 bg-[#F7F8F5]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <span className="inline-block rounded-full bg-[#EDF5EF] border border-[#D7E5DA] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#174C38] mb-2">
                Available Inventory
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#18352A]">
                {category.name} Products
              </h2>
              <p className="mt-2 text-sm text-[#68766D]">
                Select a product to view technical specifications, sizing, and direct quote options.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="group flex flex-col rounded-2xl border border-[#D7E5DA] bg-white overflow-hidden shadow-xs hover:border-[#174C38] transition-all"
                >
                  <div className="relative aspect-[4/3] w-full bg-[#F7F8F5] overflow-hidden">
                    <Image
                      src={prod.image}
                      alt={`${prod.name} - Ganpati Lifecare Wholesale Supplies`}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5 sm:p-6 flex flex-col flex-grow">
                    <h3 className="font-display text-lg font-bold text-[#18352A] group-hover:text-[#174C38] transition-colors">
                      {prod.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#46554C] leading-relaxed flex-grow">
                      {prod.description}
                    </p>
                    <div className="mt-6 pt-4 border-t border-[#D7E5DA] flex items-center justify-between">
                      <Link
                        href={`/products/${prod.id}`}
                        className="text-xs sm:text-sm font-semibold text-[#174C38] hover:underline"
                      >
                        View Full Specs →
                      </Link>
                      <a
                        href={getWhatsAppInquiryUrl(
                          WHATSAPP_MESSAGES.product(prod.name)
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#258653] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#174C38] transition-colors"
                      >
                        Quote
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#18352A]">
                Frequently Asked Questions about {category.name}
              </h2>
              <p className="mt-2 text-sm text-[#68766D]">
                Direct answers to common institutional procurement questions.
              </p>
            </div>

            <div className="space-y-4">
              {category.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#D7E5DA] bg-white p-5 sm:p-6 shadow-xs"
                >
                  <h3 className="font-bold text-[#18352A] text-sm sm:text-base mb-2">
                    Q: {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#46554C]">
                    A: {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other Categories Navigation */}
        <section className="py-10 bg-[#F7F8F5] border-t border-[#D7E5DA]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="font-display text-lg sm:text-xl font-bold text-[#18352A] mb-4">
              Explore Other Healthcare Supply Categories
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {CATEGORIES_DATA.filter((c) => c.slug !== category.slug).map(
                (c) => (
                  <Link
                    key={c.slug}
                    href={`/categories/${c.slug}`}
                    className="rounded-full bg-white border border-[#D7E5DA] px-4 py-2 text-xs sm:text-sm font-semibold text-[#18352A] hover:bg-[#174C38] hover:text-white transition-all shadow-xs"
                  >
                    {c.name}
                  </Link>
                )
              )}
            </div>
          </div>
        </section>

        {/* Request Quote Section */}
        <div className="mt-8">
          <RequestQuote />
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
