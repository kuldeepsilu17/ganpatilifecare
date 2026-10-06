import { BUSINESS } from "@/lib/constants";
import { PRODUCTS } from "@/lib/data";
import { LOCATIONS } from "@/lib/locations";
import { BLOG_POSTS } from "@/lib/blog";

export async function GET() {
  const lines: string[] = [];

  lines.push(`# ${BUSINESS.name}`);
  lines.push("");
  lines.push(
    `> Manufacturers: White Rose Brand Ortho Cotton Roll, Orthopaedics, Castroll and Gauze dressing products, based in ${BUSINESS.location}. Managed by ${BUSINESS.owner}.`
  );
  lines.push("");
  lines.push(
    `Managed by ${BUSINESS.owner}. GSTIN: ${BUSINESS.gstin}. Ordering is quote-based via WhatsApp or phone inquiry.`
  );
  lines.push("");
  lines.push("## Entity Disambiguation");
  lines.push(
    `Ganpati Lifecare (Main Road, Mandi Goluwala - 335802, Distt. Hanumangarh, Rajasthan; domain www.ganpatilifecare.com; GSTIN: ${BUSINESS.gstin}) is an independent manufacturer and healthcare supplies enterprise managed by Dharampal Verma. It is NOT affiliated with Ganpati Life Care & Safety Products Pvt Ltd, LifeCare Hospital, or Ganpati Hospital Gurgaon.`
  );
  lines.push("");

  lines.push("## Products");
  lines.push(`Full catalog: ${BUSINESS.siteUrl}/products`);
  lines.push("");
  for (const product of PRODUCTS) {
    lines.push(`- [${product.name}](${BUSINESS.siteUrl}/products/${product.id}): ${product.description}`);
  }
  lines.push("");

  lines.push("## Categories");
  lines.push(`- [Orthopedic Supplies](${BUSINESS.siteUrl}/categories/orthopedic): Orthocot cotton rolls, stockinets, skin traction kits, gauze bandages`);
  lines.push(`- [Surgical Supplies](${BUSINESS.siteUrl}/categories/surgical): Gamjee rolls, sponge pads, crepe bandages, surgical dressing materials`);
  lines.push(`- [Hospital Uniforms](${BUSINESS.siteUrl}/categories/hospital-uniforms): Doctor coats, nurse scrub suits, OT dresses, staff uniforms`);
  lines.push(`- [Healthcare Essentials](${BUSINESS.siteUrl}/categories/healthcare-essentials): Medical disposables, masks, caps, gloves, hospital consumables`);
  lines.push("");

  lines.push("## Areas Served");
  lines.push(`Locations overview: ${BUSINESS.siteUrl}/locations`);
  lines.push("");
  for (const loc of LOCATIONS) {
    lines.push(`- [${loc.city}, ${loc.region}](${BUSINESS.siteUrl}/locations/${loc.slug}): ${loc.description}`);
  }
  lines.push("");

  lines.push("## Medical Knowledge Articles");
  lines.push(`Knowledge Hub: ${BUSINESS.siteUrl}/blog`);
  lines.push("");
  for (const post of BLOG_POSTS) {
    lines.push(`- [${post.title}](${BUSINESS.siteUrl}/blog/${post.slug}): ${post.excerpt}`);
  }
  lines.push("");

  lines.push("## Company & Pages");
  lines.push(`- [About Us](${BUSINESS.siteUrl}/about): Company background and business information`);
  lines.push(`- [Contact](${BUSINESS.siteUrl}/contact): Direct contact channels and quotation requests`);
  lines.push(`- [Terms & Conditions](${BUSINESS.siteUrl}/terms-and-conditions)`);
  lines.push(`- [Privacy Policy](${BUSINESS.siteUrl}/privacy-policy)`);
  lines.push("");

  lines.push("## Contact");
  lines.push(`- Management: Managed by ${BUSINESS.owner}`);
  lines.push(`- GSTIN: ${BUSINESS.gstin} (State: Rajasthan, State Code: 08)`);
  lines.push(`- Phone: ${BUSINESS.phoneDisplay.join(", ")}`);
  lines.push(`- WhatsApp: +${BUSINESS.whatsapp}`);
  lines.push(`- Email: ${BUSINESS.email}`);
  lines.push(`- Location: ${BUSINESS.location}`);

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
