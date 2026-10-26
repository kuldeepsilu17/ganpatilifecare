"use client";

import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { categories, products as staticProducts, type Product } from "@/lib/site-data";

export function ProductCatalog({ compact = false, initialCategory = "All Products", products = staticProducts }: { compact?: boolean; initialCategory?: (typeof categories)[number]; products?: Product[] }) {
  const [category, setCategory] = useState<(typeof categories)[number]>(initialCategory);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const visible = products.filter((product) => (category === "All Products" || product.category === category) && `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(deferredQuery)).slice(0, compact ? 6 : undefined);
  return <div className="catalog"><div className="catalog-controls"><div className="filter-tabs" aria-label="Filter products by category">{categories.map((item) => <button type="button" key={item} className={category === item ? "filter-tab active" : "filter-tab"} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>{!compact && <label className="catalog-search"><Search size={17} /><span className="sr-only">Search products</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the catalog" /></label>}</div>
    <div className="product-grid">{visible.map((product, index) => <article className="product-card" key={product.slug}><Link href={`/products/${product.slug}`} className="product-image-link" aria-label={`View ${product.name}`}><div className="product-image"><Image src={product.image} alt={`${product.name} supplied by Ganpati Lifecare`} fill sizes="(max-width: 640px) 90vw, (max-width: 960px) 44vw, 29vw" priority={index < 3 && compact} /></div></Link><div className="product-card-copy"><span className="eyebrow product-category">{product.category}{product.brand ? ` / ${product.brand}` : ""}</span><h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3><p>{product.description}</p><Link className="product-link" href={`/products/${product.slug}`}>View details <ArrowUpRight size={16} /></Link></div></article>)}</div>
    {visible.length === 0 && <p className="empty-state">No products match that search. Try another name or category.</p>}{compact && <div className="catalog-more"><Link className="button button-outline" href="/products">View full catalog <ArrowUpRight size={17} /></Link></div>}
  </div>;
}
