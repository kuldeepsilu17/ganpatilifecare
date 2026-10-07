import { BUSINESS } from "./constants";
import { LOGO } from "./brand";
import { LOCATIONS } from "./locations";
import {
  DISAMBIGUATING_DESCRIPTION,
  FOUNDING_DATE,
  GEO_LAT,
  GEO_LNG,
  GBP_URL,
  SAME_AS_PROFILES,
} from "./site";

const logoUrl = `${BUSINESS.siteUrl}/logo.svg`;
const ogImageUrl = `${BUSINESS.siteUrl}${LOGO.og}`;

/* ── Founder / Owner Person ─────────────────────────────────────── */

export function getFounderPersonSchema() {
  return {
    "@type": "Person",
    "@id": `${BUSINESS.siteUrl}/about#dharampal-verma`,
    name: BUSINESS.owner,
    jobTitle: "Proprietor & Manager", // TODO_CONFIRM_WITH_OWNER: confirm exact title
    worksFor: {
      "@id": `${BUSINESS.siteUrl}/#business`,
    },
    // sameAs: [], // TODO_CONFIRM_WITH_OWNER: add LinkedIn / Facebook only if owner agrees
  };
}

/* ── Main Business Entity (LocalBusiness + MedicalBusiness) ──────── */

export function getBusinessSchema() {
  const schema: Record<string, unknown> = {
    "@type": ["LocalBusiness", "MedicalBusiness"],
    "@id": `${BUSINESS.siteUrl}/#business`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    alternateName: [
      "Ganpati Life Care",
      "GLC",
      "Ganpati Lifecare Hanumangarh",
      "Ganpati Life Care Hanumangarh",
      "Ganpati Lifecare Goluwala",
      "Ganpati Lifecare Mandi Goluwala",
      "Ganpati Lifecare Rajasthan",
    ],
    disambiguatingDescription: DISAMBIGUATING_DESCRIPTION,
    description:
      "Ganpati Lifecare, managed by Dharampal Verma in Mandi Goluwala, Hanumangarh, Rajasthan, is a manufacturer and wholesale supplier of White Rose Brand Ortho Cotton Roll, Orthopaedics, Castroll and Gauze dressing products, hospital uniforms, and medical consumables.",
    url: BUSINESS.siteUrl,
    logo: logoUrl,
    image: ogImageUrl,
    telephone: [...BUSINESS.phones],
    email: BUSINESS.email,
    taxID: BUSINESS.gstin,
    vatID: BUSINESS.gstin,
    identifier: {
      "@type": "PropertyValue",
      name: "GSTIN",
      value: BUSINESS.gstin,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.streetAddress,
      addressLocality: BUSINESS.address.addressLocality,
      addressRegion: BUSINESS.address.addressRegion,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.addressCountry,
    },
    founder: { "@id": `${BUSINESS.siteUrl}/about#dharampal-verma` },
    areaServed: [
      ...LOCATIONS.map((loc) => ({ "@type": "City" as const, name: loc.city })),
      { "@type": "AdministrativeArea" as const, name: "Rajasthan" },
    ],
    knowsAbout: [
      "Orthocot cotton roll",
      "Stockinet",
      "Skin traction kit",
      "Gamjee roll",
      "Surgical dressing",
      "Hospital uniforms",
      "OT dress",
      "Doctor coat",
      "Crepe bandage",
      "Sponge pad",
      "Hospital consumables",
      "Medical disposables",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Ganpati Lifecare product catalog",
      itemListElement: [
        "Orthopedic Supplies",
        "Surgical Supplies",
        "Hospital Uniforms",
        "Healthcare Essentials",
      ],
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS.phones[0],
      contactType: "sales and customer service",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  };

  // Only add geo if confirmed (not TODO)
  if (GEO_LAT !== "TODO_CONFIRM_WITH_OWNER" && GEO_LNG !== "TODO_CONFIRM_WITH_OWNER") {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: GEO_LAT,
      longitude: GEO_LNG,
    };
  }

  // Only add foundingDate if confirmed
  if (FOUNDING_DATE !== "TODO_CONFIRM_WITH_OWNER") {
    schema.foundingDate = FOUNDING_DATE;
  }

  // Only add hasMap if confirmed
  if (GBP_URL !== "TODO_CONFIRM_WITH_OWNER") {
    schema.hasMap = GBP_URL;
  }

  // Only add sameAs if there are real profile URLs
  if (SAME_AS_PROFILES.length > 0) {
    schema.sameAs = SAME_AS_PROFILES;
  }

  return schema;
}

/* ── Legacy aliases — keep backward compatibility with existing pages ── */

export function getOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${BUSINESS.siteUrl}/#organization`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: BUSINESS.siteUrl,
    logo: logoUrl,
    // This is an alias that points to the main business entity
    sameAs: [`${BUSINESS.siteUrl}/`],
  };
}

export function getLocalBusinessSchema() {
  // Return the main business schema (used on pages that specifically need LocalBusiness)
  return getBusinessSchema();
}

/* ── WebSite ────────────────────────────────────────────────────── */

export function getWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${BUSINESS.siteUrl}/#website`,
    name: "Ganpati Lifecare",
    alternateName: "Ganpati Life Care",
    url: BUSINESS.siteUrl,
    description:
      "Official website of Ganpati Lifecare — Orthopedic, Surgical & Hospital Supplies in Goluwala, Hanumangarh, Rajasthan.",
    inLanguage: "en-IN",
    publisher: {
      "@id": `${BUSINESS.siteUrl}/#business`,
    },
  };
}

/* ── Root @graph (used in layout.tsx <head>) ─────────────────────── */

export function getRootGraphSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      getBusinessSchema(),
      getFounderPersonSchema(),
      getWebSiteSchema(),
      {
        "@type": "WebPage",
        "@id": `${BUSINESS.siteUrl}/#webpage`,
        url: `${BUSINESS.siteUrl}/`,
        isPartOf: { "@id": `${BUSINESS.siteUrl}/#website` },
        about: { "@id": `${BUSINESS.siteUrl}/#business` },
      },
    ],
  };
}

/* ── Breadcrumb ─────────────────────────────────────────────────── */

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

/* ── FAQ ─────────────────────────────────────────────────────────── */

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

/* ── Product ─────────────────────────────────────────────────────── */

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
      "@id": `${BUSINESS.siteUrl}/#business`,
      name: BUSINESS.name,
      url: BUSINESS.siteUrl,
    },
  };
}

/* ── BlogPosting ─────────────────────────────────────────────────── */

export function getBlogPostingSchema(post: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updatedDate?: string;
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
    dateModified: new Date(post.updatedDate || post.date).toISOString(),
    author: {
      "@type": "Person",
      "@id": `${BUSINESS.siteUrl}/about#dharampal-verma`,
      name: post.author || BUSINESS.owner,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${BUSINESS.siteUrl}/#business`,
      name: BUSINESS.name,
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
      },
    },
    inLanguage: "en-IN",
  };
}

/* ── Speakable (for AEO — marks the answer block) ───────────────── */

export function getSpeakableSchema(url: string, cssSelectors: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };
}
