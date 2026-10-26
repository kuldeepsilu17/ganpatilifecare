import { business, locations } from "@/lib/site-data";

export function BusinessStructuredData() {
  const data = { "@context": "https://schema.org", "@type": "LocalBusiness", name: business.name, alternateName: business.shortName, url: business.website, image: `${business.website}/branding/glc-logo.svg`, telephone: business.phoneRaw, email: business.email, taxID: business.gstin, address: { "@type": "PostalAddress", streetAddress: "Main Road, Mandi Goluwala", addressLocality: "Mandi Goluwala", addressRegion: "Rajasthan", postalCode: "335802", addressCountry: "IN" }, areaServed: locations.map((location) => ({ "@type": "AdministrativeArea", name: `${location.name}, Rajasthan` })), contactPoint: [{ "@type": "ContactPoint", telephone: business.phoneRaw, contactType: "wholesale inquiries" }, { "@type": "ContactPoint", telephone: business.alternatePhoneRaw, contactType: "business contact" }] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replaceAll("<", "\\u003c") }} />;
}
