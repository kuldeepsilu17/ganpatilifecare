import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { business } from "@/lib/site-data";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  const schema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.ganpatilifecare.com/" }, ...items.map((item, index) => ({ "@type": "ListItem", position: index + 2, name: item.label, ...(item.href ? { item: `https://www.ganpatilifecare.com${item.href}` } : {}) }))] };
  return <><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link>{items.map((item, index) => <span key={`${item.label}-${index}`}> / {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}</span>)}</nav><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replaceAll("<", "\\u003c") }} /></>;
}

export function PageHero({ title, summary, eyebrow = "GANPATI LIFECARE", breadcrumbs = [] }: { title: string; summary: string; eyebrow?: string; breadcrumbs?: { label: string; href?: string }[] }) {
  return <section className="page-hero"><div className="wrap">{breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}<p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{summary}</p></div></section>;
}

export function ContactActions({ label = "Talk with Ganpati Lifecare" }: { label?: string }) {
  return <div className="detail-actions"><a className="button button-green" href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(`Hello Ganpati Lifecare, I would like to enquire. ${label}.`)}`}><Phone size={16} /> WhatsApp inquiry <ArrowUpRight size={16} /></a><a className="button button-outline" href={`tel:${business.phoneRaw}`}>Call {business.phone}</a></div>;
}

export function AddressBlock() {
  const map = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`;
  return <div className="contact-details"><p><MapPin size={18} />{business.address}</p><p><Phone size={18} /><a href={`tel:${business.phoneRaw}`}>{business.phone}</a></p><p><Phone size={18} /><a href={`tel:${business.alternatePhoneRaw}`}>{business.alternatePhone}</a></p><p><a href={`mailto:${business.email}`}>{business.email}</a></p><p>Managed by {business.manager}</p><p>GSTIN: {business.gstin}</p><a className="text-link" href={map} target="_blank" rel="noreferrer">Directions on Google Maps <ArrowUpRight size={16} /></a></div>;
}
