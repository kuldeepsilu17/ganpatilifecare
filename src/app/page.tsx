import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Building2,
  Truck,
  UserRound,
} from "lucide-react";
import { FaqList } from "@/components/faq-list";
import { InquiryForm } from "@/components/inquiry-form";
import { ProductCatalog } from "@/components/product-catalog";
import { business } from "@/lib/site-data";
import { getPublishedArticles, getPublishedProducts } from "@/lib/public-data";
import { BUSINESS } from "@/lib/constants";

const title = "Medical & Surgical Supplier Hanumangarh | Ganpati Lifecare";
const description =
  "Ganpati Lifecare, Goluwala, Hanumangarh: Orthocot cotton rolls, stockinet, traction kits, gauze, uniforms & hospital consumables for North Rajasthan.";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
    type: "website",
    images: [
      {
        url: `${BUSINESS.siteUrl}/og-brand.png`,
        width: 1200,
        height: 630,
        alt: "Ganpati Lifecare - Orthopedic, Surgical & Hospital Supplies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${BUSINESS.siteUrl}/og-brand.png`],
  },
};

export default async function Home() {
  const products = await getPublishedProducts();
  const articles = await getPublishedArticles();

  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grid-lines" aria-hidden="true" />
        <div className="wrap hero-inner">
          <div className="hero-copy">
            <p className="hero-kicker">
              <span /> MEDICAL SUPPLY · MANDI GOLUWALA
            </p>
            <h1 id="hero-title">
              Orthopedic, surgical{" "}
              <span>&amp; hospital supplies</span> you can depend on.
            </h1>
            <p className="hero-intro">
              Ganpati Lifecare supplies orthopedic cotton rolls, surgical dressings,
              hospital uniforms and healthcare essentials to hospitals, clinics and
              distributors.
            </p>
            <p className="hero-location">
              <span className="location-mark">01</span> Main Road, Mandi Goluwala
              · Hanumangarh, Rajasthan
            </p>
            <div className="hero-actions">
              <Link className="button button-orange" href="/products">
                Explore products <ArrowRight size={18} />
              </Link>
              <Link className="button button-light" href="/contact">
                Request a bulk quote <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="hero-stamp">
              <span>GLC</span>
              <i>
                Regional supply
                <br />
                from Rajasthan
              </i>
            </div>
          </div>
          <div className="hero-showcase">
            <div className="hero-brand-disc">
              <Image
                src="/branding/glc-logo.svg"
                alt="Ganpati Lifecare GLC logo"
                width={138}
                height={138}
                priority
                unoptimized
              />
            </div>
            <p className="showcase-caption">
              Care essentials,
              <br />
              sourced with purpose.
            </p>
            <div className="showcase-index" aria-label="Browse product categories">
              <Link href="/categories/orthopedic">
                <span>01</span> Orthopedic
              </Link>
              <Link href="/categories/surgical">
                <span>02</span> Surgical
              </Link>
              <Link href="/categories/hospital-uniforms">
                <span>03</span> Hospital uniforms
              </Link>
              <Link href="/categories/healthcare-essentials">
                <span>04</span> Healthcare essentials
              </Link>
            </div>
            <a className="hero-scroll" href="#about">
              <ArrowDown size={16} /> SCROLL TO EXPLORE
            </a>
          </div>
        </div>
        <div className="hero-bottom wrap">
          <span>ORTHOPEDIC</span>
          <span>SURGICAL</span>
          <span>HOSPITAL TEXTILES</span>
          <span>HEALTHCARE ESSENTIALS</span>
        </div>
      </section>

      <section className="intro-section section-pad" id="about">
        <div className="wrap intro-grid">
          <div>
            <p className="eyebrow">ABOUT GANPATI LIFECARE</p>
            <h2 className="section-title">
              Direct sourcing
              <br />
              <em>for regional healthcare.</em>
            </h2>
          </div>
          <div className="intro-body">
            <p>
              Based in Mandi Goluwala, Hanumangarh, Ganpati Lifecare brings
              orthopedic, surgical, uniform and hospital essentials together for
              institutional and wholesale inquiries.
            </p>
            <p className="hindi" lang="hi">
              गणपति लाइफकेयर - मंडी गोलूवाला, हनुमानगढ़, राजस्थान
            </p>
            <Link href="/about" className="text-link">
              About Ganpati Lifecare <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="facts-strip wrap">
          <div>
            <span>01 / MANAGEMENT</span>
            <strong>{business.manager}</strong>
          </div>
          <div>
            <span>02 / BASE</span>
            <strong>Mandi Goluwala, Rajasthan</strong>
          </div>
          <div>
            <span>03 / PROCUREMENT</span>
            <strong>Wholesale inquiries</strong>
          </div>
          <div>
            <span>04 / CATALOG</span>
            <strong>14 product listings</strong>
          </div>
        </div>
      </section>

      <section className="supply-section section-pad">
        <div className="wrap supply-grid">
          <div className="supply-heading">
            <p className="eyebrow eyebrow-light">REGIONAL WHOLESALE SUPPLY</p>
            <h2 className="section-title">
              A practical partner
              <br />
              for healthcare teams.
            </h2>
            <p>
              Order coordination for institutions and distributors, from product
              inquiry through dispatch planning.
            </p>
            <Link className="text-link link-light" href="/locations">
              Explore service locations <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="supply-list">
            <div>
              <span>01</span>
              <Building2 />
              <p>Hospitals &amp; nursing homes</p>
            </div>
            <div>
              <span>02</span>
              <UserRound />
              <p>Orthopedic &amp; trauma clinics</p>
            </div>
            <div>
              <span>03</span>
              <Boxes />
              <p>Medical distributors &amp; pharmacies</p>
            </div>
            <div>
              <span>04</span>
              <Truck />
              <p>Regional order coordination</p>
            </div>
          </div>
        </div>
      </section>

      <section className="catalog-section section-pad" id="products">
        <div className="wrap">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">OUR PRODUCTS</p>
              <h2 className="section-title">
                Medical supplies,
                <br />
                <em>clearly cataloged.</em>
              </h2>
            </div>
            <p className="section-aside">
              Orthopedic, surgical, hospital uniform and healthcare essentials.
              Contact us to confirm current specifications and availability.
            </p>
          </div>
          <ProductCatalog compact products={products} />
        </div>
      </section>

      <section className="reasons-section section-pad">
        <div className="wrap reasons-layout">
          <div>
            <p className="eyebrow">WHY GANPATI LIFECARE</p>
            <h2 className="section-title">
              Straightforward
              <br />
              <em>wholesale support.</em>
            </h2>
            <p className="reasons-lead">
              A direct point of contact for products, quotes and regional order
              coordination.
            </p>
            <Link href="/company-facts" className="text-link">
              Business information <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="reason-list">
            <article>
              <span>01</span>
              <div>
                <h3>Focused supply catalog</h3>
                <p>
                  Orthopedic, surgical, uniform and hospital essentials in one
                  place.
                </p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>Direct order coordination</h3>
                <p>
                  Discuss requirements with Dharampal Verma and the Ganpati
                  Lifecare team.
                </p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>Quote-based procurement</h3>
                <p>
                  Product availability, quantity, pricing and delivery are
                  confirmed for each inquiry.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="quality-section">
        <div className="wrap quality-inner">
          <div>
            <p className="eyebrow eyebrow-light">QUALITY &amp; PROCUREMENT</p>
            <h2>
              Ask the right questions
              <br />
              before every order.
            </h2>
          </div>
          <div className="quality-note">
            <p>
              Specifications, packaging and sterile status vary by product.
              Ganpati Lifecare can confirm item-level details when you request a
              quotation.
            </p>
            <Link className="text-link link-light" href="/contact">
              Discuss product requirements <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="quality-index">
            <span>01</span>
            <span>PRODUCT DETAILS</span>
            <span>02</span>
            <span>ORDER QUANTITY</span>
            <span>03</span>
            <span>DELIVERY LOCATION</span>
          </div>
        </div>
      </section>

      <section className="featured-section section-pad">
        <div className="wrap">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">FEATURED CATALOG</p>
              <h2 className="section-title">
                Popular medical
                <br />
                <em>supplies.</em>
              </h2>
            </div>
            <Link className="text-link" href="/products">
              Browse all products <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="featured-list">
            {products
              .filter((product) => product.featured)
              .slice(0, 10)
              .map((product, index) => (
                <Link key={product.slug} href={`/products/${product.slug}`}>
                  <span>0{index + 1}</span>
                  <strong>{product.name}</strong>
                  <span>{product.category}</span>
                  <ArrowUpRight size={17} />
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section className="partner-section section-pad">
        <div className="wrap partner-grid">
          <div>
            <p className="eyebrow">DISTRIBUTOR PARTNERSHIP</p>
            <h2 className="section-title">
              Build a reliable
              <br />
              <em>supply connection.</em>
            </h2>
          </div>
          <div>
            <p>
              Medical suppliers and healthcare businesses can contact GLC to
              discuss wholesale product availability, ordering and regional
              dispatch coordination.
            </p>
            <Link className="button button-green" href="/become-a-distributor">
              Partnership inquiries <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="knowledge-section section-pad">
        <div className="wrap">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">MEDICAL KNOWLEDGE</p>
              <h2 className="section-title">
                Useful notes for
                <br />
                <em>better procurement.</em>
              </h2>
            </div>
            <Link className="text-link" href="/blog">
              Visit knowledge center <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="article-grid">
            {articles.slice(0, 3).map((article, index) => (
              <article className="article-card" key={article.slug}>
                <span className="article-number">
                  0{index + 1} / {article.topic}
                </span>
                <h3>
                  <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                </h3>
                <p>{article.excerpt}</p>
                <Link className="product-link" href={`/blog/${article.slug}`}>
                  Read article <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section section-pad">
        <div className="wrap faq-layout">
          <div>
            <p className="eyebrow">COMMON QUESTIONS</p>
            <h2 className="section-title">
              Answers before
              <br />
              <em>you get in touch.</em>
            </h2>
            <p>Need a product-specific answer? Talk with the team directly.</p>
            <a href={`tel:${business.phoneRaw}`} className="text-link">
              Call {business.phone} <ArrowUpRight size={16} />
            </a>
          </div>
          <FaqList />
        </div>
      </section>

      <section className="quote-section section-pad" id="quote">
        <div className="wrap quote-layout">
          <div className="quote-copy">
            <p className="eyebrow eyebrow-light">REQUEST A QUOTE</p>
            <h2>
              Tell us what
              <br />
              your team needs.
            </h2>
            <p>
              Share product names, quantities and your delivery location to
              start a wholesale inquiry.
            </p>
            <div className="quote-contact">
              <span>DIRECT CONTACT</span>
              <a href={`tel:${business.phoneRaw}`}>{business.phone}</a>
              <a href={`mailto:${business.email}`}>{business.email}</a>
            </div>
          </div>
          <div className="quote-form-wrap">
            <InquiryForm />
          </div>
        </div>
      </section>

      <section className="contact-band">
        <div className="wrap contact-band-inner">
          <span>GANPATI LIFECARE · MANDI GOLUWALA</span>
          <Link href="/contact">
            Get in touch <ArrowRight size={17} />
          </Link>
          <span>MANAGED BY {business.manager.toUpperCase()}</span>
        </div>
      </section>
    </main>
  );
}
