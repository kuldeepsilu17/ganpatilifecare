import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { business, brands, locations, products } from "@/lib/site-data";

export function SiteFooter() {
  return <footer className="site-footer"><div className="wrap footer-grid">
    <div className="footer-about"><Link className="footer-brand" href="/">Ganpati <span>Lifecare</span><i>GLC</i></Link><p>Orthopedic, surgical and hospital supplies from Mandi Goluwala, Hanumangarh, Rajasthan.</p><p className="footer-manager">Managed by {business.manager}</p><a href={`https://wa.me/${business.whatsapp}`} className="text-link">WhatsApp the team <ArrowUpRight size={15} /></a></div>
    <div><h2>Explore</h2><ul><li><Link href="/about">About us</Link></li><li><Link href="/company-facts">Company facts</Link></li><li><Link href="/products">Products catalog</Link></li><li><Link href="/become-a-distributor">Distributor inquiries</Link></li><li><Link href="/blog">Medical knowledge</Link></li><li><Link href="/glossary">Medical glossary</Link></li></ul></div>
    <div><h2>Catalog</h2><ul>{products.slice(0, 5).map((product) => <li key={product.slug}><Link href={`/products/${product.slug}`}>{product.name}</Link></li>)}<li><Link href="/brands">Product brands</Link></li></ul></div>
    <div><h2>Contact</h2><ul className="footer-contact"><li><MapPin size={15} /><span>{business.address}</span></li><li><a href={`tel:${business.phoneRaw}`}>{business.phone}</a></li><li><a href={`tel:${business.alternatePhoneRaw}`}>{business.alternatePhone}</a></li><li><a href={`mailto:${business.email}`}>{business.email}</a></li><li>GSTIN: {business.gstin}</li></ul><p className="footer-hubs">{locations.map((location) => <Link key={location.slug} href={`/locations/${location.slug}`}>{location.name}</Link>)}</p><p className="footer-hubs">{brands.map((brand) => <Link key={brand.slug} href={`/brands/${brand.slug}`}>{brand.name}</Link>)}</p></div>
  </div><div className="wrap footer-bottom"><span>© {2026} Ganpati Lifecare (GLC)</span><span><Link href="/privacy-policy">Privacy policy</Link><Link href="/terms-and-conditions">Terms &amp; conditions</Link></span></div></footer>;
}
