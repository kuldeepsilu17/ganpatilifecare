"use client";

import Link from "next/link";
import Image from "next/image";
import { BUSINESS, WHATSAPP_MESSAGES, getWhatsAppInquiryUrl } from "@/lib/constants";
import { Logo } from "@/components/brand/Logo";
import "@/styles/Hero.css";

const HERO_FEATURED_PRODUCTS = [
  {
    name: "Orthocot Cotton Roll",
    category: "Orthopedic",
    image: "/images/products/real_orthocot_cotton_roll_15cm.webp",
    href: "/products/orthocot-cotton-roll",
  },
  {
    name: "Stockinet",
    category: "Orthopedic",
    image: "/images/products/stockinet.png",
    href: "/products/stockinet",
  },
  {
    name: "Skin Traction Kit",
    category: "Orthopedic",
    image: "/images/products/skin-traction-kit.jpg",
    href: "/products/skin-traction-kit",
  },
  {
    name: "Ortho Active Crepe Bandage",
    category: "Surgical",
    image: "/images/products/real_ortho_active_crepe_bandage.webp",
    href: "/products/bandages",
  },
  {
    name: "Lap-Pad Sponge",
    category: "Surgical",
    image: "/images/products/real_lap_pad_sponge.webp",
    href: "/products/sponge-pad",
  },
  {
    name: "Gamjee Roll",
    category: "Surgical",
    image: "/images/products/real_gamjee_roll.webp",
    href: "/products/gamjee-roll",
  },
];

export function PremiumHero() {
  const whatsappUrl = getWhatsAppInquiryUrl(WHATSAPP_MESSAGES.general);

  return (
    <section className="hero-section" aria-label="Ganpati Lifecare Healthcare Overview">
      <div className="hero-container">
        {/* Business Information Line */}
        <div className="hero-info-badge">
          <span className="hero-info-dot" aria-hidden="true" />
          <span>Goluwala, Hanumangarh, Rajasthan</span>
          <span className="hero-info-divider" aria-hidden="true">•</span>
          <span>Owned and operated by Dharampal Verma</span>
        </div>

        {/* Small Brand Eyebrow with Logo Mark */}
        <div className="hero-logo-row">
          <Logo variant="mark" priority className="h-10 w-10 sm:h-12 sm:w-12" />
          <span className="hero-brand-name">GANPATI LIFECARE</span>
        </div>

        {/* Main Heading */}
        <h1 className="hero-title">
          Orthopedic, Surgical &amp; Hospital Supplies
        </h1>

        {/* Readable Supporting Text */}
        <p className="hero-subtitle">
          Ganpati Lifecare supplies orthopedic products, surgical dressing materials, hospital consumables, and healthcare essentials for professional and institutional requirements.
        </p>

        {/* Primary and Secondary Actions */}
        <div className="hero-actions">
          <Link href="#products" className="hero-btn-primary">
            Explore Products
          </Link>
          <Link href="#quote" className="hero-btn-secondary">
            Request a Quote
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn-whatsapp"
            aria-label="Inquire via WhatsApp with Dharampal Verma"
          >
            <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>WhatsApp Inquiry</span>
          </a>
        </div>

        {/* Business Trust Details */}
        <div className="hero-trust-bar">
          <span className="hero-trust-item">
            <svg className="h-4 w-4 text-[#258653]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" focusable="false">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Direct Hospital &amp; Clinic Supply
          </span>
          <span className="hero-trust-item">
            <svg className="h-4 w-4 text-[#258653]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" focusable="false">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Rapid Regional Dispatch
          </span>
          <span className="hero-trust-item">
            <svg className="h-4 w-4 text-[#258653]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" focusable="false">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Verified GSTIN: {BUSINESS.gstin}
          </span>
        </div>

        {/* Visual Product Strip Showcase */}
        <div className="hero-showcase">
          <p className="hero-showcase-label">Core Supply Range</p>
          <div className="hero-showcase-grid">
            {HERO_FEATURED_PRODUCTS.map((prod) => (
              <Link
                key={prod.name}
                href={prod.href}
                className="hero-product-chip"
              >
                <div className="hero-chip-image">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div className="hero-chip-text">
                  <span className="hero-chip-name">{prod.name}</span>
                  <span className="hero-chip-cat">{prod.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
