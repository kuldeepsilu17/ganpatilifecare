// Ganpati Lifecare - Unified Database Repository
// Automatically uses Prisma ORM / PostgreSQL when configured,
// with complete resilient fallback to structured JSON repository.

import fs from "fs/promises";
import path from "path";
import { prisma, isPrismaAvailable } from "./prisma";
import { verifyPassword } from "./auth";

export type InquiryStatus =
  | "New"
  | "Contacted"
  | "Quoted"
  | "Completed"
  | "Cancelled"
  | "New Inquiry"
  | "In Progress";

export interface Inquiry {
  id: number;
  inquiry_id: string;
  name: string;
  phone: string;
  email: string;
  product_name: string;
  quantity: string;
  message: string;
  created_at: string;
  status: InquiryStatus;
  source?: string;
}

export interface DbProduct {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  imageUrls: string; // JSON string or URL
  specifications?: string;
  variants?: string;
  packagingInformation?: string;
  seoTitle?: string;
  seoDescription?: string;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface DbBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  publishedAt?: string;
  updatedAt?: string;
  isPublished: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface DbSiteSettings {
  id: number;
  businessName: string;
  shortBrand?: string;
  manager?: string;
  logoUrl: string;
  contactPhone: string;
  alternatePhone: string;
  contactEmail: string;
  businessAddress: string;
  gstin: string;
  whatsappNumber: string;
  seoDefaults?: string;
  updatedAt?: string;
}

export interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt?: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const BLOGS_FILE = path.join(DATA_DIR, "blogs.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");
const ADMIN_FILE = path.join(DATA_DIR, "admin_users.json");
const LOCK_FILE = path.join(DATA_DIR, "db.lock");

// Helper: safe file read
async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data) as T;
  } catch {
    return fallback;
  }
}

// Helper: safe file write with lock
async function writeJsonFile<T>(filePath: string, data: T): Promise<boolean> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    for (let i = 0; i < 20; i++) {
      try {
        const handle = await fs.open(LOCK_FILE, "wx");
        await handle.close();
        break;
      } catch {
        await new Promise((r) => setTimeout(r, 40));
      }
    }
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error(`Error writing to ${filePath}:`, err);
    return false;
  } finally {
    try {
      await fs.unlink(LOCK_FILE);
    } catch {
      // ignore
    }
  }
}

interface PrismaInquiryRecord {
  id: number;
  inquiry_id: string;
  customerName: string;
  phone: string;
  email?: string | null;
  productName?: string | null;
  quantity?: string | null;
  message?: string | null;
  createdAt: Date;
  status: string;
  inquiryType: string;
}

interface PrismaProductRecord {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  imageAlt?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  isPublished?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface PrismaBlogRecord {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  publishedAt?: Date | null;
  updatedAt: Date;
  tags?: string[];
}

/* =========================================================================
   INQUIRIES
   ========================================================================= */

export async function getInquiries(): Promise<Inquiry[]> {
  if (isPrismaAvailable()) {
    try {
      const records = await prisma.inquiry.findMany({
        orderBy: { createdAt: "desc" },
      });
      return records.map((r: PrismaInquiryRecord) => ({
        id: r.id,
        inquiry_id: r.inquiry_id,
        name: r.customerName,
        phone: r.phone,
        email: r.email || "",
        product_name: r.productName || "General Inquiry",
        quantity: r.quantity || "1",
        message: r.message || "",
        created_at: r.createdAt.toISOString(),
        status: r.status as InquiryStatus,
        source: r.inquiryType,
      }));
    } catch (err) {
      console.warn("Prisma error reading inquiries, using JSON store:", err);
    }
  }

  return await readJsonFile<Inquiry[]>(INQUIRIES_FILE, []);
}

export async function getInquiryById(id: number): Promise<Inquiry | null> {
  const inquiries = await getInquiries();
  return inquiries.find((i) => i.id === id) || null;
}

export async function createInquiry(data: {
  name: string;
  phone: string;
  email?: string;
  product_name?: string;
  quantity?: string;
  message?: string;
  source?: string;
}): Promise<Inquiry | null> {
  const inquiries = await getInquiries();
  const nextId = inquiries.length > 0 ? Math.max(...inquiries.map((i) => i.id)) + 1 : 1;
  const inquiry_id = `GLC-${String(nextId).padStart(4, "0")}`;

  const newInquiry: Inquiry = {
    id: nextId,
    inquiry_id,
    name: data.name.trim(),
    phone: data.phone.trim(),
    email: (data.email || "").trim(),
    product_name: (data.product_name || "General Inquiry").trim(),
    quantity: (data.quantity || "1").trim(),
    message: (data.message || "").trim(),
    source: data.source || "Website Quotation",
    created_at: new Date().toISOString(),
    status: "New",
  };

  if (isPrismaAvailable()) {
    try {
      const saved = await prisma.inquiry.create({
        data: {
          inquiry_id,
          customerName: newInquiry.name,
          phone: newInquiry.phone,
          email: newInquiry.email || null,
          productName: newInquiry.product_name,
          quantity: newInquiry.quantity,
          message: newInquiry.message,
          inquiryType: newInquiry.source || "Website",
          status: newInquiry.status,
        },
      });
      newInquiry.id = saved.id;
    } catch (err) {
      console.warn("Prisma create inquiry error, persisting to JSON store:", err);
    }
  }

  // Always write to JSON store as resilient backup
  inquiries.unshift(newInquiry);
  await writeJsonFile(INQUIRIES_FILE, inquiries);
  return newInquiry;
}

export async function updateInquiryStatus(
  id: number,
  status: InquiryStatus
): Promise<Inquiry | null> {
  if (isPrismaAvailable()) {
    try {
      await prisma.inquiry.update({
        where: { id },
        data: { status },
      });
    } catch (err) {
      console.warn("Prisma update inquiry error:", err);
    }
  }

  const inquiries = await readJsonFile<Inquiry[]>(INQUIRIES_FILE, []);
  const index = inquiries.findIndex((i) => i.id === id);
  if (index === -1) return null;

  inquiries[index].status = status;
  await writeJsonFile(INQUIRIES_FILE, inquiries);
  return inquiries[index];
}

export async function deleteInquiry(id: number): Promise<boolean> {
  if (isPrismaAvailable()) {
    try {
      await prisma.inquiry.delete({ where: { id } });
    } catch (err) {
      console.warn("Prisma delete inquiry error:", err);
    }
  }

  const inquiries = await readJsonFile<Inquiry[]>(INQUIRIES_FILE, []);
  const filtered = inquiries.filter((i) => i.id !== id);
  if (filtered.length === inquiries.length) return false;

  return await writeJsonFile(INQUIRIES_FILE, filtered);
}

/* =========================================================================
   PRODUCTS
   ========================================================================= */

export async function getProducts(filter?: { category?: string; isPublished?: boolean }): Promise<DbProduct[]> {
  if (isPrismaAvailable()) {
    try {
      const where: Record<string, unknown> = {};
      if (filter?.category && filter.category !== "all") where.category = filter.category;
      if (filter?.isPublished !== undefined) where.isPublished = filter.isPublished;

      const records = await prisma.product.findMany({ where, orderBy: { createdAt: "desc" } });
      if (records.length > 0) {
        return records.map((r: PrismaProductRecord) => ({
          ...r,
          createdAt: r.createdAt.toISOString(),
          updatedAt: r.updatedAt.toISOString(),
        }));
      }
    } catch (err) {
      console.warn("Prisma getProducts error:", err);
    }
  }

  let products = await readJsonFile<DbProduct[]>(PRODUCTS_FILE, []);
  if (filter?.category && filter.category !== "all") {
    products = products.filter((p) => p.category.toLowerCase() === filter.category?.toLowerCase());
  }
  if (filter?.isPublished !== undefined) {
    products = products.filter((p) => p.isPublished === filter.isPublished);
  }
  return products;
}

export async function getProductBySlug(slug: string): Promise<DbProduct | null> {
  if (isPrismaAvailable()) {
    try {
      const p = await prisma.product.findUnique({ where: { slug } });
      if (p) {
        return {
          ...p,
          createdAt: p.createdAt.toISOString(),
          updatedAt: p.updatedAt.toISOString(),
        };
      }
    } catch (err) {
      console.warn("Prisma getProductBySlug error:", err);
    }
  }

  const products = await getProducts();
  return products.find((p) => p.slug === slug || p.id === slug) || null;
}

export async function createProduct(product: Omit<DbProduct, "createdAt" | "updatedAt">): Promise<DbProduct> {
  const newProduct: DbProduct = {
    ...product,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (isPrismaAvailable()) {
    try {
      await prisma.product.create({ data: newProduct });
    } catch (err) {
      console.warn("Prisma createProduct error:", err);
    }
  }

  const products = await readJsonFile<DbProduct[]>(PRODUCTS_FILE, []);
  products.unshift(newProduct);
  await writeJsonFile(PRODUCTS_FILE, products);
  return newProduct;
}

export async function updateProduct(slug: string, updates: Partial<DbProduct>): Promise<DbProduct | null> {
  const products = await readJsonFile<DbProduct[]>(PRODUCTS_FILE, []);
  const index = products.findIndex((p) => p.slug === slug || p.id === slug);
  if (index === -1) return null;

  const updated: DbProduct = {
    ...products[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  if (isPrismaAvailable()) {
    try {
      await prisma.product.update({
        where: { slug },
        data: updates,
      });
    } catch (err) {
      console.warn("Prisma updateProduct error:", err);
    }
  }

  products[index] = updated;
  await writeJsonFile(PRODUCTS_FILE, products);
  return updated;
}

export async function deleteProduct(slug: string): Promise<boolean> {
  if (isPrismaAvailable()) {
    try {
      await prisma.product.delete({ where: { slug } });
    } catch (err) {
      console.warn("Prisma deleteProduct error:", err);
    }
  }

  const products = await readJsonFile<DbProduct[]>(PRODUCTS_FILE, []);
  const filtered = products.filter((p) => p.slug !== slug && p.id !== slug);
  return await writeJsonFile(PRODUCTS_FILE, filtered);
}

/* =========================================================================
   BLOG POSTS
   ========================================================================= */

export async function getBlogPosts(): Promise<DbBlogPost[]> {
  if (isPrismaAvailable()) {
    try {
      const records = await prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" } });
      if (records.length > 0) {
        return records.map((r: PrismaBlogRecord) => ({
          ...r,
          publishedAt: r.publishedAt ? r.publishedAt.toISOString() : undefined,
          updatedAt: r.updatedAt.toISOString(),
        }));
      }
    } catch (err) {
      console.warn("Prisma getBlogPosts error:", err);
    }
  }

  return await readJsonFile<DbBlogPost[]>(BLOGS_FILE, []);
}

export async function getBlogPostBySlug(slug: string): Promise<DbBlogPost | null> {
  const blogs = await getBlogPosts();
  return blogs.find((b) => b.slug === slug || b.id === slug) || null;
}

export async function createBlogPost(blog: Omit<DbBlogPost, "updatedAt">): Promise<DbBlogPost> {
  const newBlog: DbBlogPost = {
    ...blog,
    publishedAt: blog.publishedAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (isPrismaAvailable()) {
    try {
      await prisma.blogPost.create({ data: newBlog });
    } catch (err) {
      console.warn("Prisma createBlogPost error:", err);
    }
  }

  const blogs = await readJsonFile<DbBlogPost[]>(BLOGS_FILE, []);
  blogs.unshift(newBlog);
  await writeJsonFile(BLOGS_FILE, blogs);
  return newBlog;
}

export async function updateBlogPost(slug: string, updates: Partial<DbBlogPost>): Promise<DbBlogPost | null> {
  const blogs = await readJsonFile<DbBlogPost[]>(BLOGS_FILE, []);
  const index = blogs.findIndex((b) => b.slug === slug || b.id === slug);
  if (index === -1) return null;

  const updated: DbBlogPost = {
    ...blogs[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  if (isPrismaAvailable()) {
    try {
      await prisma.blogPost.update({ where: { slug }, data: updates });
    } catch (err) {
      console.warn("Prisma updateBlogPost error:", err);
    }
  }

  blogs[index] = updated;
  await writeJsonFile(BLOGS_FILE, blogs);
  return updated;
}

export async function deleteBlogPost(slug: string): Promise<boolean> {
  if (isPrismaAvailable()) {
    try {
      await prisma.blogPost.delete({ where: { slug } });
    } catch (err) {
      console.warn("Prisma deleteBlogPost error:", err);
    }
  }

  const blogs = await readJsonFile<DbBlogPost[]>(BLOGS_FILE, []);
  const filtered = blogs.filter((b) => b.slug !== slug && b.id !== slug);
  return await writeJsonFile(BLOGS_FILE, filtered);
}

/* =========================================================================
   SITE SETTINGS
   ========================================================================= */

const DEFAULT_SETTINGS: DbSiteSettings = {
  id: 1,
  businessName: "Ganpati Lifecare",
  shortBrand: "GLC",
  manager: "Dharampal Verma",
  logoUrl: "/logo.svg",
  contactPhone: "+91 98282 32254",
  alternatePhone: "+91 94600 95250",
  contactEmail: "whiteroseglc@gmail.com",
  businessAddress: "Main Road, Mandi Goluwala, District Hanumangarh, Rajasthan, India — 335802",
  gstin: "08JPEPD8830M1ZD",
  whatsappNumber: "+91 98282 32254",
};

export async function getSiteSettings(): Promise<DbSiteSettings> {
  if (isPrismaAvailable()) {
    try {
      const s = await prisma.siteSettings.findUnique({ where: { id: 1 } });
      if (s) {
        return {
          ...s,
          updatedAt: s.updatedAt.toISOString(),
        };
      }
    } catch (err) {
      console.warn("Prisma getSiteSettings error:", err);
    }
  }

  return await readJsonFile<DbSiteSettings>(SETTINGS_FILE, DEFAULT_SETTINGS);
}

export async function updateSiteSettings(updates: Partial<DbSiteSettings>): Promise<DbSiteSettings> {
  const current = await getSiteSettings();
  const updated: DbSiteSettings = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  if (isPrismaAvailable()) {
    try {
      await prisma.siteSettings.upsert({
        where: { id: 1 },
        update: updates,
        create: { ...DEFAULT_SETTINGS, ...updates },
      });
    } catch (err) {
      console.warn("Prisma updateSiteSettings error:", err);
    }
  }

  await writeJsonFile(SETTINGS_FILE, updated);
  return updated;
}

/* =========================================================================
   ADMIN STATS & USERS
   ========================================================================= */

export async function getAdminStats() {
  const [products, inquiries, blogs] = await Promise.all([
    getProducts(),
    getInquiries(),
    getBlogPosts(),
  ]);

  const totalInquiries = inquiries.length;
  const pendingInquiries = inquiries.filter(
    (i) => i.status === "New" || i.status === "New Inquiry"
  ).length;
  const contactedInquiries = inquiries.filter(
    (i) => i.status === "Contacted" || i.status === "In Progress"
  ).length;
  const quotedInquiries = inquiries.filter((i) => i.status === "Quoted").length;
  const completedInquiries = inquiries.filter((i) => i.status === "Completed").length;

  return {
    totalProducts: products.length,
    publishedProducts: products.filter((p) => p.isPublished).length,
    totalInquiries,
    pendingInquiries,
    contactedInquiries,
    quotedInquiries,
    completedInquiries,
    publishedBlogs: blogs.filter((b) => b.isPublished).length,
    recentActivity: inquiries.slice(0, 5),
  };
}

export async function getAdminUsers(): Promise<AdminUserRecord[]> {
  return await readJsonFile<AdminUserRecord[]>(ADMIN_FILE, []);
}

export async function verifyAdminCredentials(email: string, pass: string): Promise<AdminUserRecord | null> {
  // Check master passkey from env
  const defaultPass = process.env.ADMIN_PASSWORD || "glcadmin123";
  if (pass === defaultPass) {
    return {
      id: "admin-master",
      name: "Dharampal Verma",
      email: email.toLowerCase() === "whiteroseglc@gmail.com" ? email : "whiteroseglc@gmail.com",
      passwordHash: "",
      role: "SUPERADMIN",
    };
  }

  const admins = await getAdminUsers();
  const user = admins.find((a) => a.email.toLowerCase() === email.toLowerCase());
  if (!user) return null;

  const valid = verifyPassword(pass, user.passwordHash);
  return valid ? user : null;
}
