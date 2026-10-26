import { articles, products, type Product } from "@/lib/site-data";

export async function getPublishedProducts(): Promise<Product[]> {
  return products;
}

export async function getPublishedProduct(slug: string): Promise<Product | undefined> {
  return products.find((product) => product.slug === slug);
}

export async function getPublishedArticles() {
  return articles;
}

export async function getPublishedArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
