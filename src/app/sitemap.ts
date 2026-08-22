import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/constants";
import { PRODUCTS } from "@/lib/data";
import { LOCATIONS } from "@/lib/locations";
import { BLOG_POSTS } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseDate = new Date("2026-08-20T00:00:00Z");
  const recentDate = new Date("2026-08-22T00:00:00Z");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BUSINESS.siteUrl,
      lastModified: recentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BUSINESS.siteUrl}/products`,
      lastModified: recentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BUSINESS.siteUrl}/blog`,
      lastModified: recentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BUSINESS.siteUrl}/privacy-policy`,
      lastModified: baseDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BUSINESS.siteUrl}/terms-and-conditions`,
      lastModified: baseDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
    url: `${BUSINESS.siteUrl}/products/${product.id}`,
    lastModified: recentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const locationRoutes: MetadataRoute.Sitemap = LOCATIONS.map((loc) => ({
    url: `${BUSINESS.siteUrl}/locations/${loc.slug}`,
    lastModified: baseDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BUSINESS.siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...locationRoutes, ...blogRoutes];
}
