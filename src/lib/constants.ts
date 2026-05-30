export const BUSINESS = {
  name: "Ganpati Lifecare",
  shortName: "GLC",
  contactPerson: "Dharampal",
  location: "Goluwala, Hanumangarh, Rajasthan, India",
  address: {
    streetAddress: "Goluwala",
    addressLocality: "Hanumangarh",
    addressRegion: "Rajasthan",
    postalCode: "335512",
    addressCountry: "IN",
  },
  phones: ["+919828232254", "+919460095250"] as const,
  phoneDisplay: ["+91 98282 32254", "+91 94600 95250"] as const,
  email: "whiteroseglc@gmail.com",
  whatsapp: "919828232254",
  mapQuery: "Goluwala, Hanumangarh, Rajasthan, India",
  siteUrl: "https://ganpatilifecare.com",
} as const;

export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#products", label: "Products" },
  { href: "#categories", label: "Categories" },
  { href: "#why-us", label: "Why Choose Us" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
] as const;

export const SEO_KEYWORDS = [
  "Medical supplier in Rajasthan",
  "Hospital uniform supplier",
  "Orthopedic products supplier",
  "Cotton roll supplier India",
  "Surgical products supplier Rajasthan",
  "Hospital consumables supplier",
  "Ganpati Lifecare",
  "GLC Medical Products",
  "Hanumangarh",
  "Goluwala",
] as const;
