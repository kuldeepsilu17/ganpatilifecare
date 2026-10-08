export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.ganpatilifecare.com"
).replace(/\/$/, "");

export const abs = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const SITE_NAME = "Ganpati Lifecare";
export const LEGAL_NAME = "GANPATI LIFECARE";
export const OWNER_NAME = "Dharampal Verma";
export const MANAGED_BY = "Managed by Dharampal Verma";
export const GSTIN = "08JPEPD8830M1ZD";
export const STATE_CODE = "08";
export const BUSINESS_DESCRIPTION =
  "Manufacturers: White Rose Brand Ortho Cotton Roll, Orthopaedics, Castroll and Gauze dressing products.";

export const PHONE_1 = "+919828232254";
export const PHONE_2 = "+919460095250";
export const PHONE_DISPLAY_1 = "+91 98282 32254";
export const PHONE_DISPLAY_2 = "+91 94600 95250";
export const EMAIL = "whiteroseglc@gmail.com";
export const WHATSAPP_NUMBER = "919828232254";

export const LOCATION_STREET = "Main Road, Mandi Goluwala";
export const LOCATION_CITY = "Mandi Goluwala";
export const LOCATION_DISTRICT = "Hanumangarh";
export const LOCATION_STATE = "Rajasthan";
export const LOCATION_COUNTRY = "India";
export const LOCATION_POSTAL_CODE = "335802";
export const LOCATION_FULL =
  "Main Road, Mandi Goluwala - 335802, Distt. Hanumangarh (Raj.)";

/* ── Entity Disambiguation (Phase 1) ─────────────────────────────── */

/** Short disambiguation line for use on About, Contact, Footer, company-facts */
export const DISAMBIGUATION_LINE =
  "Ganpati Lifecare (GLC) in Goluwala, Hanumangarh, Rajasthan is an independently owned medical & surgical supplies business and is not affiliated with companies of similar names located elsewhere, including in Delhi or Gurgaon.";

/** Longer version for schema disambiguatingDescription */
export const DISAMBIGUATING_DESCRIPTION =
  "Independent medical, surgical and orthopedic supplies wholesaler and manufacturer of White Rose Brand products in Goluwala, Hanumangarh, Rajasthan 335802, managed by Dharampal Verma. Not affiliated with Ganpati Life Care & Safety Products Pvt Ltd (Delhi) or any other similarly named entity.";

/** TODO_CONFIRM_WITH_OWNER: Justdial implies ~2019 — confirm the real founding year */
export const FOUNDING_DATE = "TODO_CONFIRM_WITH_OWNER";

/** TODO_CONFIRM_WITH_OWNER: Exact lat/lng for Google Maps / schema geo */
export const GEO_LAT = "TODO_CONFIRM_WITH_OWNER";
export const GEO_LNG = "TODO_CONFIRM_WITH_OWNER";

/** TODO_CONFIRM_WITH_OWNER: Google Business Profile URL */
export const GBP_URL = "TODO_CONFIRM_WITH_OWNER";

/** TODO_CONFIRM_WITH_OWNER: Google Business Profile review URL */
export const GBP_REVIEW_URL = "TODO_CONFIRM_WITH_OWNER";

/** TODO_CONFIRM_WITH_OWNER: Confirm operating hours */
export const OPERATING_HOURS = "Mon–Sat: 9:00 AM – 8:00 PM, Sunday: By Prior Appointment";

/** sameAs profile URLs — TODO_CONFIRM_WITH_OWNER: add only real, claimed profile URLs */
export const SAME_AS_PROFILES: string[] = [
  // "TODO: Google Business Profile URL",
  // "TODO: Justdial listing URL",
  // "TODO: IndiaMART listing URL",
  // "TODO: Facebook page URL",
  // "TODO: Instagram profile URL",
  // "TODO: LinkedIn page URL",
  // "TODO: YouTube channel URL",
];
