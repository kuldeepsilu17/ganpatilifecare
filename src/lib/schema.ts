import { BUSINESS } from "./constants";
import { LOGO } from "./brand";
import { LOCATIONS } from "./locations";

const logoUrl = `${BUSINESS.siteUrl}${LOGO.png}`;

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BUSINESS.siteUrl}/#organization`,
    name: BUSINESS.name,
    alternateName: ["Ganpati Life Care", "GLC", "Ganpati Life Care Hanumangarh", "Ganpati Lifecare Goluwala"],
    url: BUSINESS.siteUrl,
    logo: logoUrl,
    image: `${BUSINESS.siteUrl}${LOGO.og}`,
    email: BUSINESS.email,
    telephone: [...BUSINESS.phones],
    founder: {
      "@type": "Person",
      name: BUSINESS.owner,
      jobTitle: "Founder & Owner",
    },
    description:
      "Ganpati Lifecare, led by Dharampal Verma in Goluwala, Hanumangarh, is a trusted healthcare supplies company providing orthopedic, surgical, and hospital products across Rajasthan.",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.streetAddress,
      addressLocality: BUSINESS.address.addressLocality,
      addressRegion: BUSINESS.address.addressRegion,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.addressCountry,
    },
    sameAs: [`https://wa.me/${BUSINESS.whatsapp}`],
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${BUSINESS.siteUrl}/#localbusiness`,
    name: BUSINESS.name,
    alternateName: ["Ganpati Life Care", "GLC"],
    founder: {
      "@type": "Person",
      name: BUSINESS.owner,
      jobTitle: "Founder & Owner",
    },
    description:
      "Ganpati Lifecare is a healthcare supplies company in Goluwala, Hanumangarh, Rajasthan, supplying orthopedic, surgical, hospital consumables and healthcare uniforms.",
    url: BUSINESS.siteUrl,
    logo: logoUrl,
    image: `${BUSINESS.siteUrl}${LOGO.og}`,
    telephone: [...BUSINESS.phones],
    email: BUSINESS.email,
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
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BUSINESS.siteUrl}/#website`,
    name: BUSINESS.name,
    alternateName: "Ganpati Life Care",
    url: BUSINESS.siteUrl,
    description:
      "Official website of Ganpati Lifecare (GLC) — Orthopedic, Surgical & Hospital Supplies in Hanumangarh, Rajasthan.",
    inLanguage: "en-IN",
    publisher: {
      "@id": `${BUSINESS.siteUrl}/#organization`,
    },
  };
}

export function getFaqSchema(
  faqs: readonly { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
