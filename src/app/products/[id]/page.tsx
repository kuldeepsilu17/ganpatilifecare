import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/data";
import { getProductDetails } from "@/lib/product-details";
import { BUSINESS, WHATSAPP_MESSAGES, getWhatsAppInquiryUrl } from "@/lib/constants";
import { InquiryForm } from "@/components/inquiry-form";
import { PageHero } from "@/components/page-shell";
import { getBreadcrumbSchema, getFaqSchema, getProductSchema } from "@/lib/schema";

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

  const title = product.metaTitle || `${product.name} | Ganpati Lifecare`;
  const description =
    product.metaDescription ||
    `Explore ${product.name} from Ganpati Lifecare, a healthcare supplier based in Goluwala, Hanumangarh, Rajasthan. Contact us for product availability and bulk requirements.`;
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
          url: product.image.startsWith("http")
            ? product.image
            : `${BUSINESS.siteUrl}${product.image}`,
          alt: `${product.name} - Ganpati Lifecare`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        product.image.startsWith("http")
          ? product.image
          : `${BUSINESS.siteUrl}${product.image}`,
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

  const getBrandName = (productId: string, category: string) => {
    if (productId === "orthocot-cotton-roll") return "White Rose / Orthocot";
    if (productId === "bandages") return "Ortho Active";
    if (productId === "sponge-pad") return "Lap-Pad";
    switch (category) {
      case "orthopedic":
        return "GLC Orthopedic";
      case "surgical":
        return "GLC Surgical";
      case "uniforms":
        return "GLC Uniforms";
      case "essentials":
        return "GLC Consumables";
      default:
        return "Ganpati Lifecare";
    }
  };
  const brandName = getBrandName(product.id, product.category);

  const productSchema = getProductSchema({
    id: product.id,
    name: product.name,
    description: product.description,
    image: product.image,
    category: product.category,
    brandName,
  });

  const productFaqSchema =
    product.faqs && product.faqs.length > 0 ? getFaqSchema(product.faqs) : null;

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: BUSINESS.siteUrl },
    { name: "Products", url: `${BUSINESS.siteUrl}/products` },
    { name: product.name, url: `${BUSINESS.siteUrl}/products/${product.id}` },
  ]);

  const whatsappInquiryUrl = getWhatsAppInquiryUrl(
    WHATSAPP_MESSAGES.product(product.name)
  );

  const productDetailsList =
    product.specifications && Object.keys(product.specifications).length > 0
      ? Object.entries(product.specifications).map(([key, val]) => `${key}: ${val}`)
      : [
          "Contact Ganpati Lifecare for current specifications and available variants.",
          "Confirm packaging, order quantities and product status when requesting a quotation.",
        ];

  return (
    <main>
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

      <PageHero
        eyebrow={product.category.toUpperCase()}
        title={product.name}
        summary={product.description}
        breadcrumbs={[
          { label: "Products", href: "/products" },
          { label: product.name },
        ]}
      />

      <section className="page-content">
        <div className="wrap">
          <div className="detail-grid">
            <div className="detail-image">
              <Image
                src={product.image}
                alt={`${product.name} supplied by Ganpati Lifecare`}
                fill
                sizes="(max-width: 700px) 100vw, 45vw"
                priority
              />
            </div>
            <div className="detail-copy">
              <span className="pill-label">{brandName}</span>
              <h2>Product overview</h2>
              <p>{product.description}</p>
              <p>
                Ganpati Lifecare supplies this catalog item from Mandi Goluwala,
                Rajasthan. Product specifications, variants, packaging and
                availability should be confirmed with the business before ordering.
              </p>
              <h3>Product specifications &amp; details</h3>
              <ul>
                {productDetailsList.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
              <p>
                Applications and product selection should be confirmed by the
                relevant healthcare professional. This page is general product
                information, not clinical advice.
              </p>
              <div className="detail-actions">
                <a
                  className="button button-green"
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp inquiry
                </a>
                <Link className="button button-outline" href="/contact">
                  Request a quote
                </Link>
              </div>
            </div>
          </div>

          <div className="inline-quote">
            <h2>Enquire about {product.name}</h2>
            <p>
              Share your contact details and quantity. The WhatsApp message will include
              this product name.
            </p>
            <InquiryForm productName={product.name} />
          </div>

          {relatedProducts.length > 0 && (
            <section className="related-products">
              <h2 className="content-section-title">Related products</h2>
              <div className="related-grid">
                {relatedProducts.map((item) => (
                  <article className="content-card" key={item.id}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <Link className="text-link" href={`/products/${item.id}`}>
                      View product &rarr;
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}
