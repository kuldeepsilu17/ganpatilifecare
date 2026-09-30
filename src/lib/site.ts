export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.ganpatilifecare.com"
).replace(/\/$/, "");

export const abs = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const SITE_NAME = "Ganpati Lifecare";
export const OWNER_NAME = "Dharampal Verma";
export const PHONE_1 = "+919828232254";
export const PHONE_2 = "+919460095250";
export const PHONE_DISPLAY_1 = "+91 98282 32254";
export const PHONE_DISPLAY_2 = "+91 94600 95250";
export const EMAIL = "whiteroseglc@gmail.com";
export const WHATSAPP_NUMBER = "919828232254";

export const LOCATION_CITY = "Goluwala";
export const LOCATION_DISTRICT = "Hanumangarh";
export const LOCATION_STATE = "Rajasthan";
export const LOCATION_COUNTRY = "India";
export const LOCATION_POSTAL_CODE = "335512"; // TODO_CONFIRM_WITH_OWNER
export const LOCATION_FULL = "Goluwala, Hanumangarh, Rajasthan, India";
