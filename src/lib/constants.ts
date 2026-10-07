import {
  SITE_URL,
  SITE_NAME,
  LEGAL_NAME,
  OWNER_NAME,
  MANAGED_BY,
  GSTIN,
  STATE_CODE,
  BUSINESS_DESCRIPTION,
  PHONE_1,
  PHONE_2,
  PHONE_DISPLAY_1,
  PHONE_DISPLAY_2,
  EMAIL,
  WHATSAPP_NUMBER,
  LOCATION_STREET,
  LOCATION_CITY,
  LOCATION_DISTRICT,
  LOCATION_STATE,
  LOCATION_POSTAL_CODE,
  LOCATION_FULL,
} from "./site";

export const BUSINESS = {
  name: SITE_NAME,
  legalName: LEGAL_NAME,
  gstin: GSTIN,
  state: LOCATION_STATE,
  stateCode: STATE_CODE,
  description: BUSINESS_DESCRIPTION,
  managedBy: MANAGED_BY,
  alternateNames: [
    "Ganpati Life Care",
    "GLC",
    "Ganpati Life Care Hanumangarh",
    "Ganpati Lifecare Goluwala",
    "Ganpati Lifecare Mandi Goluwala",
    "Ganpati Lifecare Sri Ganganagar",
    "Ganpati Lifecare Shri Ganganagar",
  ],
  shortName: "GLC",
  owner: OWNER_NAME,
  contactPerson: OWNER_NAME,
  managedByTitle: MANAGED_BY,
  location: LOCATION_FULL,
  address: {
    streetAddress: LOCATION_STREET,
    addressLocality: LOCATION_CITY,
    addressDistrict: LOCATION_DISTRICT,
    addressRegion: LOCATION_STATE,
    postalCode: LOCATION_POSTAL_CODE,
    addressCountry: "IN",
  },
  phones: [PHONE_1, PHONE_2] as const,
  phoneDisplay: [PHONE_DISPLAY_1, PHONE_DISPLAY_2] as const,
  email: EMAIL,
  whatsapp: WHATSAPP_NUMBER,
  mapQuery: `${LOCATION_FULL}`,
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    LOCATION_FULL
  )}`,
  siteUrl: SITE_URL,
} as const;

export const WHATSAPP_MESSAGES = {
  general:
    "Hello Ganpati Lifecare, I want to enquire about Surgical cotton roll & Dressing Product. Please share product availability, bulk pricing, and quotation.",
  product: (productName: string) =>
    `Hello Ganpati Lifecare, I am interested in your ${productName}. Please share product specifications, availability, and quotation.`,
  location: (city: string) =>
    `Hello Ganpati Lifecare, I am reaching out from ${city}. I want to enquire about Surgical cotton roll & Dressing Product supplies for our healthcare facility. Please share product availability and quotation.`,
} as const;

export function getWhatsAppInquiryUrl(message: string): string {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#products", label: "Products" },
  { href: "/#categories", label: "Categories" },
  { href: "/#why-us", label: "Why Choose Us" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#contact", label: "Contact" },
] as const;

export const SEO_KEYWORDS = [
  "Ganpati Lifecare",
  "Ganpati Life Care",
  "Ganpati Lifecare Hanumangarh",
  "Ganpati Life Care Hanumangarh",
  "Ganpati Lifecare Goluwala",
  "Ganpati Life Care Goluwala",
  "Ganpati Lifecare Sri Ganganagar",
  "Dharampal Verma",
  "medical supplier in Hanumangarh",
  "medical supplier Shri Ganganagar",
  "surgical products supplier Shri Ganganagar",
  "surgical products Rajasthan",
  "orthopedic products Rajasthan",
  "orthopedic supplier Rajasthan",
  "hospital consumables Rajasthan",
  "medical supplies Hanumangarh",
  "hospital supplies Rajasthan",
  "hospital uniforms Rajasthan",
  "Orthocot Cotton Roll supplier",
  "Cotton roll supplier India",
  "Stockinet supplier",
  "Goluwala Rajasthan healthcare supplies",
  "North Rajasthan medical supplies",
] as const;
