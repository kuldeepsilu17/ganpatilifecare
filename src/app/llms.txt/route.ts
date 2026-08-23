import { BUSINESS } from "@/lib/constants";
import { PRODUCTS } from "@/lib/data";
import { LOCATIONS } from "@/lib/locations";

// A plain-text summary for AI assistants and answer engines (ChatGPT, Perplexity,
// Claude, Google AI Overviews, etc.), following the emerging llms.txt convention.
// Generated from the same data files as the rest of the site (products, locations,
// business info) so it can't drift out of sync the way a hand-written file would.
export async function GET() {
  const lines: string[] = [];

  lines.push(`# ${BUSINESS.name}`);
  lines.push("");
  lines.push(
    `> Medical, surgical, and orthopedic supplies wholesaler based in ${BUSINESS.location}. Supplies hospitals, clinics, nursing homes, and healthcare professionals across Rajasthan and North India.`
  );
  lines.push("");
  lines.push(
    `Founded by ${BUSINESS.owner}. Ordering is quote-based via WhatsApp or phone inquiry — there is no online checkout or published pricing.`
  );
  lines.push("");

  lines.push("## Products");
  lines.push(`Full catalog: ${BUSINESS.siteUrl}/products`);
  lines.push("");
  for (const product of PRODUCTS) {
    lines.push(`- [${product.name}](${BUSINESS.siteUrl}/products/${product.id}): ${product.description}`);
  }
  lines.push("");

  lines.push("## Areas served");
  lines.push(`Overview: ${BUSINESS.siteUrl}/areas-we-serve`);
  lines.push("");
  for (const loc of LOCATIONS) {
    lines.push(`- [${loc.city}, ${loc.region}](${BUSINESS.siteUrl}/locations/${loc.slug}): ${loc.description}`);
  }
  lines.push("");

  lines.push("## Other pages");
  lines.push(`- [Blog](${BUSINESS.siteUrl}/blog): Product and supply category guides`);
  lines.push(`- [Terms & Conditions](${BUSINESS.siteUrl}/terms-and-conditions)`);
  lines.push(`- [Privacy Policy](${BUSINESS.siteUrl}/privacy-policy)`);
  lines.push("");

  lines.push("## Contact");
  lines.push(`- Phone: ${BUSINESS.phoneDisplay.join(", ")}`);
  lines.push(`- Email: ${BUSINESS.email}`);
  lines.push(`- Location: ${BUSINESS.location}`);

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
