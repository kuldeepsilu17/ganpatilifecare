"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { business } from "@/lib/site-data";

const links = [["Home", "/"], ["About", "/about"], ["Products", "/products"], ["Brands", "/brands"], ["Locations", "/locations"], ["Knowledge", "/blog"], ["Contact", "/contact"]];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return <header className="site-header"><div className="header-inner wrap">
    <Link className="brand-lockup" href="/" aria-label="Ganpati Lifecare home" onClick={() => setOpen(false)}><Image src="/branding/glc-logo.svg" alt="GLC logo" width={58} height={66} priority unoptimized /><span><strong>Ganpati Lifecare</strong><small>MEDICAL SUPPLIES · RAJASTHAN</small></span></Link>
    <nav className={open ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">{links.map(([label, href]) => { const active = pathname === href || pathname.startsWith(`${href}/`); return <Link key={href} href={href} className={active ? "is-active" : undefined} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>; })}<Link className="nav-mobile-quote" href="/contact" onClick={() => setOpen(false)}>Request a quote</Link></nav>
    <a className="header-call" href={`tel:${business.phoneRaw}`} aria-label={`Call ${business.phone}`}><Phone size={17} /><span>Call Dharampal</span></a>
    <button className="menu-toggle" type="button" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={23} /> : <Menu size={23} />}</button>
  </div></header>;
}
