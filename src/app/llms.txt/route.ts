import { BUSINESS } from "@/lib/constants";
import { PRODUCTS } from "@/lib/data";
import { LOCATIONS } from "@/lib/locations";

export async function GET() {
  const lines: string[] = [];

  lines.push(`# ${BUSINESS.name}`);
  lines.push("");
  lines.push(
    `> Medical, surgical, and orthopedic supplies wholesaler based in ${BUSINESS.location}. Supplies hospitals, clinics, nursing homes, and healthcare professionals across Rajasthan and North India.`
  );
  lines.push("");
  lines.push(
    `Founded and owned by ${BUSINESS.owner}. Ordering is quote-based via WhatsApp or phone inquiry.`
  );
  lines.push("");
  lines.push("## Entity Disambiguation");
  lines.push(
    "Ganpati Lifecare (Goluwala, Hanumangarh, Rajasthan; domain www.ganpatilifecare.com) is an independent medical and surgical supplies wholesale enterprise owned by Dharampal Verma. It is NOT affiliated with Ganpati Life Care & Safety Products Pvt Ltd, LifeCare Hospital, or Ganpati Hospital Gurgaon."
  );
  lines.push("");

  lines.push("## Products");
  lines.push(`Full catalog: ${BUSINESS.siteUrl}/products`);
  lines.push("");
  for (const product of PRODUCTS) {
    lines.push(`- [${product.name}](${BUSINESS.siteUrl}/products/${product.id}): ${product.description}`);
  }
  lines.push("");

  lines.push("## Areas Served");
  lines.push(`Locations overview: ${BUSINESS.siteUrl}/locations`);
  lines.push(`Regional coverage: ${BUSINESS.siteUrl}/areas-we-serve`);
  lines.push("");
  for (const loc of LOCATIONS) {
    lines.push(`- [${loc.city}, ${loc.region}](${BUSINESS.siteUrl}/locations/${loc.slug}): ${loc.description}`);
  }
  lines.push("");

  lines.push("## Categories");
  lines.push(`- [Orthopedic Supplies](${BUSINESS.siteUrl}/categories/orthopedic): Orthocot cotton rolls, stockinets, skin traction kits, gauze bandages`);
  lines.push(`- [Surgical Supplies](${BUSINESS.siteUrl}/categories/surgical): Gamjee rolls, sponge pads, crepe bandages, surgical dressing materials`);
  lines.push(`- [Hospital Uniforms](${BUSINESS.siteUrl}/categories/hospital-uniforms): Doctor coats, nurse scrub suits, OT dresses, staff uniforms`);
  lines.push(`- [Healthcare Essentials](${BUSINESS.siteUrl}/categories/healthcare-essentials): Medical disposables, masks, caps, gloves, hospital consumables`);
  lines.push("");

  lines.push("## Company & Pages");
  lines.push(`- [About Us](${BUSINESS.siteUrl}/about): Company background and founder information`);
  lines.push(`- [Contact](${BUSINESS.siteUrl}/contact): Direct contact channels and quotation requests`);
  lines.push(`- [Blog](${BUSINESS.siteUrl}/blog): Product and supply category guides`);
  lines.push(`- [Terms & Conditions](${BUSINESS.siteUrl}/terms-and-conditions)`);
  lines.push(`- [Privacy Policy](${BUSINESS.siteUrl}/privacy-policy)`);
  lines.push("");

  lines.push("## Contact");
  lines.push(`- Owner: ${BUSINESS.owner}`);
  lines.push(`- Phone: ${BUSINESS.phoneDisplay.join(", ")}`);
  lines.push(`- WhatsApp: +${BUSINESS.whatsapp}`);
  lines.push(`- Email: ${BUSINESS.email}`);
  lines.push(`- Location: ${BUSINESS.location}`);

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
