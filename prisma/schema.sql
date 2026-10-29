-- Ganpati Lifecare - PostgreSQL Initialization Schema
-- Run this script to manually create tables in PostgreSQL if not using Prisma Migrate

CREATE TABLE IF NOT EXISTS "Product" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT UNIQUE NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "imageUrls" TEXT NOT NULL,
    "specifications" TEXT,
    "variants" TEXT,
    "packagingInformation" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "Product_slug_idx" ON "Product"("slug");
CREATE INDEX IF NOT EXISTS "Product_category_idx" ON "Product"("category");
CREATE INDEX IF NOT EXISTS "Product_isFeatured_idx" ON "Product"("isFeatured");
CREATE INDEX IF NOT EXISTS "Product_isPublished_idx" ON "Product"("isPublished");

CREATE TABLE IF NOT EXISTS "Inquiry" (
    "id" SERIAL PRIMARY KEY,
    "inquiry_id" TEXT UNIQUE NOT NULL,
    "customerName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "productName" TEXT,
    "quantity" TEXT DEFAULT '1',
    "message" TEXT,
    "inquiryType" TEXT NOT NULL DEFAULT 'Website',
    "status" TEXT NOT NULL DEFAULT 'New',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "Inquiry_status_idx" ON "Inquiry"("status");
CREATE INDEX IF NOT EXISTS "Inquiry_phone_idx" ON "Inquiry"("phone");
CREATE INDEX IF NOT EXISTS "Inquiry_createdAt_idx" ON "Inquiry"("createdAt");

CREATE TABLE IF NOT EXISTS "BlogPost" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT UNIQUE NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "coverImage" TEXT,
    "author" TEXT NOT NULL DEFAULT 'Ganpati Lifecare Team',
    "publishedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "seoTitle" TEXT,
    "seoDescription" TEXT
);

CREATE INDEX IF NOT EXISTS "BlogPost_slug_idx" ON "BlogPost"("slug");
CREATE INDEX IF NOT EXISTS "BlogPost_isPublished_idx" ON "BlogPost"("isPublished");

CREATE TABLE IF NOT EXISTS "AdminUser" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "AdminUser_email_idx" ON "AdminUser"("email");

CREATE TABLE IF NOT EXISTS "ServiceLocation" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT UNIQUE NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX IF NOT EXISTS "ServiceLocation_slug_idx" ON "ServiceLocation"("slug");

CREATE TABLE IF NOT EXISTS "SiteSettings" (
    "id" INTEGER PRIMARY KEY DEFAULT 1,
    "businessName" TEXT NOT NULL DEFAULT 'Ganpati Lifecare',
    "logoUrl" TEXT NOT NULL DEFAULT '/logo.svg',
    "contactPhone" TEXT NOT NULL DEFAULT '+91 98282 32254',
    "alternatePhone" TEXT NOT NULL DEFAULT '+91 94600 95250',
    "contactEmail" TEXT NOT NULL DEFAULT 'whiteroseglc@gmail.com',
    "businessAddress" TEXT NOT NULL DEFAULT 'Main Road, Mandi Goluwala, District Hanumangarh, Rajasthan, India — 335802',
    "gstin" TEXT NOT NULL DEFAULT '08JPEPD8830M1ZD',
    "whatsappNumber" TEXT NOT NULL DEFAULT '+91 98282 32254',
    "seoDefaults" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
