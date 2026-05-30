import { BUSINESS } from "./constants";
import { LOGO } from "./brand";

const logoUrl = `${BUSINESS.siteUrl}${LOGO.png}`;

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS.name,
    alternateName: BUSINESS.shortName,
    url: BUSINESS.siteUrl,
    logo: logoUrl,
    image: `${BUSINESS.siteUrl}${LOGO.og}`,
    email: BUSINESS.email,
    telephone: BUSINESS.phones,
    description:
      "Ganpati Lifecare — GLC medical cotton, orthopedic, surgical, and hospital supply brand in Rajasthan.",
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
    name: BUSINESS.name,
    alternateName: BUSINESS.shortName,
    description:
      "Premium orthopedic, surgical, hospital uniforms, cotton rolls, bandages, and healthcare products supplier in Rajasthan.",
    url: BUSINESS.siteUrl,
    logo: logoUrl,
    image: `${BUSINESS.siteUrl}${LOGO.og}`,
    telephone: BUSINESS.phones,
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
      { "@type": "City", name: "Hanumangarh" },
      { "@type": "AdministrativeArea", name: "Rajasthan" },
      { "@type": "Country", name: "India" },
    ],
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "19:00",
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
