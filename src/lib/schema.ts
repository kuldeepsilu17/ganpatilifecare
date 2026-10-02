import { BUSINESS } from "./constants";
import { LOGO } from "./brand";
import { LOCATIONS } from "./locations";

const logoUrl = `${BUSINESS.siteUrl}/logo.svg`;
const ogImageUrl = `${BUSINESS.siteUrl}${LOGO.og}`;

export function getOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${BUSINESS.siteUrl}/#organization`,
    name: BUSINESS.name,
    alternateName: [
      "Ganpati Life Care",
      "GLC",
      "Ganpati Lifecare Hanumangarh",
      "Ganpati Life Care Hanumangarh",
      "Ganpati Lifecare Goluwala",
      "Ganpati Lifecare Rajasthan",
    ],
    url: BUSINESS.siteUrl,
    logo: logoUrl,
    image: ogImageUrl,
    email: BUSINESS.email,
    telephone: [...BUSINESS.phones],
    founder: {
      "@type": "Person",
      "@id": `${BUSINESS.siteUrl}/#owner`,
      name: BUSINESS.owner,
      jobTitle: "Founder & Owner",
      worksFor: {
        "@id": `${BUSINESS.siteUrl}/#organization`,
      },
    },
    description:
      "Ganpati Lifecare, owned by Dharampal Verma in Goluwala, Hanumangarh, Rajasthan, supplies orthopedic products, surgical cotton roll, dressing products, hospital uniforms, and medical consumables.",
    knowsAbout: [
      "Orthopedic Supplies",
      "Surgical Supplies",
      "Hospital Supplies",
      "Surgical Cotton Roll",
      "Dressing Products",
      "Hospital Consumables",
      "Medical Disposables",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.streetAddress,
      addressLocality: BUSINESS.address.addressLocality,
      addressRegion: BUSINESS.address.addressRegion,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.addressCountry,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS.phones[0],
      contactType: "sales and customer service",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    sameAs: [`https://wa.me/${BUSINESS.whatsapp}`],
  };
}

export function getLocalBusinessSchema() {
  return {
    "@type": ["LocalBusiness", "MedicalBusiness"],
    "@id": `${BUSINESS.siteUrl}/#localbusiness`,
    name: BUSINESS.name,
    alternateName: [
      "Ganpati Life Care",
      "GLC",
      "Ganpati Lifecare Hanumangarh",
      "Ganpati Lifecare Goluwala",
    ],
    founder: {
      "@type": "Person",
      "@id": `${BUSINESS.siteUrl}/#owner`,
      name: BUSINESS.owner,
      jobTitle: "Founder & Owner",
    },
    description:
      "Ganpati Lifecare, owned by Dharampal Verma in Goluwala, Hanumangarh, Rajasthan, supplies orthopedic products, surgical cotton roll, dressing products, hospital uniforms, and medical consumables.",
    url: BUSINESS.siteUrl,
    logo: logoUrl,
    image: ogImageUrl,
    telephone: [...BUSINESS.phones],
    email: BUSINESS.email,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Bank Transfer, UPI",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.streetAddress,
      addressLocality: BUSINESS.address.addressLocality,
      addressRegion: BUSINESS.address.addressRegion,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 29.5815,
      longitude: 74.3294,
    },
    areaServed: [
      ...LOCATIONS.map((loc) => ({ "@type": "City", name: loc.city })),
      { "@type": "AdministrativeArea", name: "Rajasthan" },
      { "@type": "Country", name: "India" },
    ],
    parentOrganization: {
      "@id": `${BUSINESS.siteUrl}/#organization`,
    },
  };
}

export function getWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${BUSINESS.siteUrl}/#website`,
    name: BUSINESS.name,
    alternateName: "Ganpati Life Care",
    url: BUSINESS.siteUrl,
    description:
      "Official website of Ganpati Lifecare — Orthopedic, Surgical & Hospital Supplies in Hanumangarh, Rajasthan.",
    inLanguage: "en-IN",
    publisher: {
      "@id": `${BUSINESS.siteUrl}/#organization`,
    },
  };
}

export function getRootGraphSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      getWebSiteSchema(),
      getOrganizationSchema(),
      getLocalBusinessSchema(),
    ],
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getFaqSchema(
  faqs: readonly { question: string; answer: string }[] | readonly { q: string; a: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => {
      const q = "question" in faq ? faq.question : faq.q;
      const a = "answer" in faq ? faq.answer : faq.a;
      return {
        "@type": "Question",
        name: q,
        acceptedAnswer: {
          "@type": "Answer",
          text: a,
        },
      };
    }),
  };
}

export function getProductSchema(product: {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  brandName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${BUSINESS.siteUrl}/products/${product.id}#product`,
    name: product.name,
    description: product.description,
    image: product.image.startsWith("http") ? product.image : `${BUSINESS.siteUrl}${product.image}`,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: product.brandName || "Ganpati Lifecare",
    },
    manufacturer: {
      "@type": "Organization",
      "@id": `${BUSINESS.siteUrl}/#organization`,
      name: BUSINESS.name,
      url: BUSINESS.siteUrl,
    },
    offers: {
      "@type": "Offer",
      url: `${BUSINESS.siteUrl}/products/${product.id}`,
      priceCurrency: "INR",
      price: "0",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: BUSINESS.name,
        "@id": `${BUSINESS.siteUrl}/#organization`,
      },
      itemCondition: "https://schema.org/NewCondition",
    },
  };
}

export function getBlogPostingSchema(post: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${BUSINESS.siteUrl}/blog/${post.slug}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BUSINESS.siteUrl}/blog/${post.slug}`,
    },
    headline: post.title,
    description: post.excerpt,
    image: post.image ? (post.image.startsWith("http") ? post.image : `${BUSINESS.siteUrl}${post.image}`) : ogImageUrl,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      name: post.author || BUSINESS.owner,
      jobTitle: "Founder & Owner, Ganpati Lifecare",
    },
    publisher: {
      "@type": "Organization",
      "@id": `${BUSINESS.siteUrl}/#organization`,
      name: BUSINESS.name,
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
      },
    },
    inLanguage: "en-IN",
  };
}
