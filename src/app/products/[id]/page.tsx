import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/data";
import { getProductDetails } from "@/lib/product-details";
import { BUSINESS } from "@/lib/constants";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { RequestQuote } from "@/components/sections/RequestQuote";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return {
      title: "Product Not Found | Ganpati Lifecare",
    };
  }

  const title = `${product.name} | Ganpati Lifecare`;
  const description = `Explore ${product.name} from Ganpati Lifecare, a healthcare supplier based in Goluwala, Hanumangarh, Rajasthan. Contact us for product availability and bulk requirements.`;
  const canonicalUrl = `${BUSINESS.siteUrl}/products/${product.id}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: product.image,
          alt: `${product.name} - Ganpati Lifecare`,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const rawProduct = PRODUCTS.find((p) => p.id === id);

  if (!rawProduct) {
    notFound();
  }

  const product = getProductDetails(rawProduct);
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${BUSINESS.siteUrl}/products/${product.id}#product`,
    name: product.name,
    description: product.description,
    image: `${BUSINESS.siteUrl}${product.image}`,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: "Ganpati Lifecare",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Ganpati Lifecare",
      url: BUSINESS.siteUrl,
    },
  };

  const productFaqSchema =
    product.faqs && product.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: product.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
        }
      : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BUSINESS.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${BUSINESS.siteUrl}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${BUSINESS.siteUrl}/products/${product.id}`,
      },
    ],
  };

  const whatsappInquiryUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
    `Hello Ganpati Lifecare,\n\nI am interested in ${product.name}.\n\nPlease share availability, sizes and quotation.\n\nThank you.`
  )}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {productFaqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productFaqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />

      <main className="bg-background min-h-screen py-8 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-muted">
            <Link href="/" className="hover:text-medical">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-medical">
              Products
            </Link>
            <span>/</span>
            <span className="font-semibold text-foreground">{product.name}</span>
          </nav>

          {/* Main Product Container */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12 items-start">
            {/* Left Column: Image Display */}
            <div>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-medical/15 bg-card shadow-sm">
                <Image
                  src={product.image}
                  alt={`${product.name} - Ganpati Lifecare`}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Gallery thumbnails */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                  {product.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative h-18 w-24 shrink-0 overflow-hidden rounded-xl border border-medical/20 bg-card shadow-xs"
                    >
                      <Image
                        src={img}
                        alt={`${product.name} photo ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Quick Actions */}
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[160px] flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#1fb855] transition-colors"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Inquiry
                </a>
                <a
                  href={`tel:${BUSINESS.phones[0]}`}
                  className="flex-1 min-w-[160px] flex items-center justify-center gap-2 rounded-xl bg-medical px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-medical-dark transition-colors"
                >
                  Call Now
                </a>
              </div>
            </div>

            {/* Right Column: Detailed Product Information */}
            <div className="space-y-6">
              <div>
                <span className="inline-block rounded-full bg-medical/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-medical">
                  {product.category}
                </span>
                <h1 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground">
                  {product.name}
                </h1>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-foreground/80">
                  {product.description}
                </p>
              </div>

              {/* Key Features */}
              {product.features && product.features.length > 0 && (
                <div className="rounded-2xl border border-medical/15 bg-card p-5 shadow-xs">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
                    Key Features &amp; Quality Points
                  </h2>
                  <ul className="mt-3 space-y-2 text-xs sm:text-sm text-foreground/80">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-medical font-bold">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specifications */}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div className="rounded-2xl border border-medical/15 bg-card p-5 shadow-xs">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">
                    Product Specifications
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="border-b border-gray-100 pb-2">
                        <span className="font-semibold text-muted">{key}: </span>
                        <span className="font-medium text-foreground">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Applications & Packaging */}
              <div className="rounded-2xl border border-medical/15 bg-card p-5 shadow-xs space-y-3 text-xs sm:text-sm">
                {product.usage && (
                  <div>
                    <h3 className="font-bold text-foreground">Clinical Applications:</h3>
                    <p className="mt-1 text-foreground/80 leading-relaxed">{product.usage}</p>
                  </div>
                )}
                {product.packaging && (
                  <div className="pt-2 border-t border-gray-100">
                    <h3 className="font-bold text-foreground">Packaging &amp; Supply:</h3>
                    <p className="mt-1 text-foreground/80 leading-relaxed">{product.packaging}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SEO Content Section */}
          {product.seoContent && (
            <div className="mt-12 rounded-3xl bg-card p-6 sm:p-8 md:p-10 shadow-sm border border-medical/10">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4">
                Detailed Product Overview
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-foreground/80">
                {product.seoContent}
              </p>
            </div>
          )}

          {/* Product FAQs */}
          {product.faqs && product.faqs.length > 0 && (
            <div className="mt-8 rounded-3xl bg-card p-6 sm:p-8 md:p-10 shadow-sm border border-medical/10">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-6">
                Frequently Asked Questions about {product.name}
              </h2>
              <div className="space-y-4">
                {product.faqs.map((faq, idx) => (
                  <div key={idx} className="border-b border-medical/10 pb-4 last:border-0 last:pb-0">
                    <h3 className="font-bold text-foreground text-sm sm:text-base">Q: {faq.q}</h3>
                    <p className="mt-2 text-sm text-foreground/80 leading-relaxed">A: {faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Products Grid */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-medical/10">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-6">
                Related {product.category} Products
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-4">
                {relatedProducts.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/products/${rel.id}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-medical/15 bg-card shadow-xs transition hover:shadow-md"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
                      <Image
                        src={rel.image}
                        alt={rel.name}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-display text-xs sm:text-sm font-bold text-foreground line-clamp-1 group-hover:text-medical">
                        {rel.name}
                      </h3>
                      <p className="mt-1 text-[11px] sm:text-xs text-muted line-clamp-1">
                        {rel.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bulk Quote Section embedded for high conversion */}
        <div className="mt-16">
          <RequestQuote />
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
