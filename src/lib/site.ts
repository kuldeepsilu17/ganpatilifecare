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
