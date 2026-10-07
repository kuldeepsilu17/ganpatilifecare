/**
 * UTM & Campaign tracking utilities
 */

export interface UTMParams {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

export function buildUrlWithUtm(baseUrl: string, utm: UTMParams): string {
  const url = new URL(baseUrl, "https://www.ganpatilifecare.com");
  if (utm.source) url.searchParams.set("utm_source", utm.source);
  if (utm.medium) url.searchParams.set("utm_medium", utm.medium);
  if (utm.campaign) url.searchParams.set("utm_campaign", utm.campaign);
  if (utm.term) url.searchParams.set("utm_term", utm.term);
  if (utm.content) url.searchParams.set("utm_content", utm.content);
  return url.toString();
}

export const QR_LINKS = {
  gbpReview: "https://g.page/r/ganpatilifecare/review", // TODO_CONFIRM_WITH_OWNER
  whatsappGeneral: "https://wa.me/919828232254?text=Hello%20Ganpati%20Lifecare%2C%20I%20am%20inquiring%20about%20medical%20supplies",
  websiteHome: "https://www.ganpatilifecare.com/?utm_source=qr&utm_medium=offline&utm_campaign=packaging_print",
  catalogDownload: "https://www.ganpatilifecare.com/products?utm_source=qr&utm_medium=card&utm_campaign=visiting_card",
  companyFacts: "https://www.ganpatilifecare.com/company-facts?utm_source=qr&utm_medium=offline&utm_campaign=factsheet",
};
