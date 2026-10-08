import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/data";
import { LOCATIONS } from "@/lib/locations";
import { BLOG_POSTS } from "@/lib/blog";
import { CATEGORIES_DATA } from "@/lib/categories";
import { GLOSSARY_TERMS } from "@/lib/glossary";
import { LANDING_PAGES } from "@/lib/landing-pages";
import { BRANDS_DATA } from "@/lib/brands-data";

/** Canonical production domain strictly enforced for sitemap generation */
const CANONICAL_SITE_URL = "https://www.ganpatilifecare.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // 1. Core Static & Legal Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${CANONICAL_SITE_URL}/`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${CANONICAL_SITE_URL}/products`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${CANONICAL_SITE_URL}/brands`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${CANONICAL_SITE_URL}/locations`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${CANONICAL_SITE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${CANONICAL_SITE_URL}/company-facts`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${CANONICAL_SITE_URL}/become-a-distributor`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${CANONICAL_SITE_URL}/glossary`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${CANONICAL_SITE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${CANONICAL_SITE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${CANONICAL_SITE_URL}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${CANONICAL_SITE_URL}/terms-and-conditions`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // 2. Specialized Category Pages (4 categories)
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES_DATA.map((cat) => ({
    url: `${CANONICAL_SITE_URL}/categories/${cat.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 3. Proprietary Brand Pages (4 brands)
  const brandRoutes: MetadataRoute.Sitemap = BRANDS_DATA.map((brand) => ({
    url: `${CANONICAL_SITE_URL}/brands/${brand.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 4. High-Intent Regional Money Pages (7 pages)
  const landingPageRoutes: MetadataRoute.Sitemap = LANDING_PAGES.map((page) => ({
    url: `${CANONICAL_SITE_URL}/${page.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 5. All 14 Catalog Product Pages
  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
    url: `${CANONICAL_SITE_URL}/products/${product.id}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 6. Regional Location Pages (10 cities)
  const locationRoutes: MetadataRoute.Sitemap = LOCATIONS.map((loc) => ({
    url: `${CANONICAL_SITE_URL}/locations/${loc.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 7. Medical Glossary Term Pages (10 terms)
  const glossaryRoutes: MetadataRoute.Sitemap = GLOSSARY_TERMS.map((term) => ({
    url: `${CANONICAL_SITE_URL}/glossary/${term.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 8. Clinical Knowledge & Blog Guides
  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${CANONICAL_SITE_URL}/blog/${post.slug}`,
    lastModified: post.updatedDate ? new Date(post.updatedDate) : new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...brandRoutes,
    ...landingPageRoutes,
    ...productRoutes,
    ...locationRoutes,
    ...glossaryRoutes,
    ...blogRoutes,
  ];
}
