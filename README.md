# Ganpati Lifecare (GLC) — Official Production Website

Complete, production-grade replication and enterprise modernization of [Ganpati Lifecare](https://www.ganpatilifecare.com/) — manufacturer and wholesale distributor of orthopedic cotton rolls, surgical dressings, hospital uniforms, and clinical consumables in Rajasthan, India.

---

## 🏥 Business Overview

- **Business Name:** Ganpati Lifecare
- **Short Brand Identifier:** GLC / White Rose Brand
- **Business Manager:** Dharampal Verma
- **Business Category:** Orthopedic, Surgical & Hospital Supplies
- **Physical Address:** Main Road, Mandi Goluwala, District Hanumangarh, Rajasthan, India — 335802
- **GSTIN Registration:** `08JPEPD8830M1ZD`
- **Primary Telephone:** `+91 98282 32254`
- **Alternate Telephone:** `+91 94600 95250`
- **Official Email:** `whiteroseglc@gmail.com`
- **Official Domain:** [https://www.ganpatilifecare.com](https://www.ganpatilifecare.com)

---

## 🛠️ Technology Stack

- **Framework:** Next.js 16 with App Router (Turbopack engine, React 19)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 with custom healthcare design tokens
- **Icons & Motion:** Lucide React & Framer Motion
- **Database & ORM:** PostgreSQL + Prisma ORM (with automatic fallback to JSON repository)
- **Forms & Validation:** React Hook Form & Zod schema validation
- **Communication:** Server-side inquiry persistence, SMTP notification, and WhatsApp dynamic link generator

---

## 🎨 Visual Design & Brand Palette

Inspired by established hospital procurement standards, the design communicates clinical cleanliness, trust, and business reliability:

| Role | Color Name | Hex Code |
| :--- | :--- | :--- |
| **Primary Navy** | Dark Slate Navy | `#17324D` |
| **Healthcare Green** | Forest Emerald | `#23856D` |
| **Deep Green** | Accent Clinical Green | `#176B57` |
| **Soft Mint** | Surface Accent / Badges | `#EAF5F0` |
| **Main Surface** | Pure White | `#FFFFFF` |
| **Alternate Surface** | Soft Hospital Off-White | `#F6F8FA` |
| **Primary Text** | Deep Charcoal Ink | `#243342` |
| **Secondary Text** | Slate Muted | `#657382` |
| **Borders** | Subtle Divider Gray | `#E1E7EC` |
| **Highlight** | Soft Green Border Highlight | `#DDECE5` |

Container width is locked to a readable **1200–1280px** with responsive padding and micro-interactions.

---

## 🗂️ Application Architecture & Routes

### Public Pages
- `/` — Homepage with Hero, Direct Sourcing About section, Business Facts, Supply Offering, 14-product catalog with live filters, Why Choose Us, Quality Standards, Featured Medical Supplies, Request a Quote, Distributor Partnership, FAQs, Contact band, and Footer.
- `/about` — Detailed company overview, management info (Dharampal Verma), English and Hindi credentials.
- `/products` — Full product catalog with real-time category filtering and search.
- `/products/[id]` — 14 individual product detail pages with verified specifications, packaging, WhatsApp inquiry action, and JSON-LD schema.
- `/categories/[category]` — 4 category landing pages (`orthopedic`, `surgical`, `uniforms`, `essentials`).
- `/brands` & `/brands/[slug]` — Product brand showcases (White Rose, Ortho Active, Lap-Pad, etc.).
- `/locations` & `/locations/[city]` — 10 regional distribution hubs across North Rajasthan (Mandi Goluwala, Hanumangarh, Sri Ganganagar, Suratgarh, Pilibanga, Sangaria, Bhadra, Rawatsar, Nohar, Bikaner).
- `/blog` & `/blog/[slug]` — 8 medical supply guides, procurement advice, and clinical comparisons.
- `/company-facts` — Verified company registration, GSTIN, ownership, and warehouse facilities.
- `/become-a-distributor` — Wholesale distributor partnership proposal and application.
- `/glossary` & `/glossary/[term]` — 10 orthopedic and surgical supply technical definitions.
- `/contact` — Direct click-to-call, click-to-email, embedded Google Map, and validated quotation form.
- `/privacy-policy` & `/terms-and-conditions` — Compliant legal documents.
- `/qr` — Quick-share digital business card and contact vCard.
- `/sitemap.xml` & `/robots.txt` — Automated search engine indexation files.

### Administrative Management
- `/admin` — Private dashboard with password/token authentication:
  - **Overview / KPIs:** Total published products, inquiries, pending reviews, active blogs, and recent inquiries timeline.
  - **Inquiry Management:** Search, status updates (`New`, `Contacted`, `Quoted`, `Completed`, `Cancelled`), inquiry modal details, CSV export.
  - **Product Management:** Search, category filters, publish/draft toggle, feature toggle, add/edit product modal.
  - **Blog Management:** Search, publish/draft toggle, create article modal, edit article modal.
  - **Business Settings:** Live management of contact phones, email, address, GSTIN, WhatsApp routing.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 20+ or 22+ (verified on Node v24)
- npm or pnpm

### 2. Environment Configuration
Create a `.env` file in the project root:

```env
# Production URL
NEXT_PUBLIC_SITE_URL=https://www.ganpatilifecare.com

# Administrator Credentials
ADMIN_PASSWORD=glcadmin123
ADMIN_SESSION_SECRET=glc-secure-auth-secret-key-335802

# PostgreSQL Database (Optional - defaults to resilient local JSON store if empty)
DATABASE_URL=postgresql://username:password@localhost:5432/ganpatilifecare

# SMTP Notifications (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=whiteroseglc@gmail.com
SMTP_PASS=your-app-password
```

### 3. Database Seeding & Admin Setup

Run the built-in database seeder to populate all 14 verified products, 8 blog articles, site settings, and sample inquiries:

```bash
npm run db:seed
```

To create or update an administrator securely via CLI:

```bash
# Syntax: node scripts/create-admin.mjs <email> <password> [name]
npm run admin:create
# or
node scripts/create-admin.mjs whiteroseglc@gmail.com mySecurePass2026 "Dharampal Verma"
```

### 4. Running Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for the website or [http://localhost:3000/admin](http://localhost:3000/admin) for the admin portal.

### 5. Production Build & Verification

```bash
npm run build
npm start
```

---

## 🐘 PostgreSQL & Prisma Integration

The application uses a **Dual Database Architecture**:
1. When `DATABASE_URL` is configured in production (e.g. Supabase, Neon, AWS RDS, Railway), Prisma ORM handles PostgreSQL transactions with indexed schemas.
2. If `DATABASE_URL` is omitted, the application runs on the structured repository in `data/`, ensuring that static site generation and local dev never fail.

### Running PostgreSQL Migrations:
```bash
# Push schema directly to your PostgreSQL database:
npx prisma db push

# Or run manual SQL schema:
# psql -d ganpatilifecare -f prisma/schema.sql
```

---

## 🌐 Deployment Guide (Vercel & Custom Domain)

1. **Deploy to Vercel:**
   - Connect the GitHub repository to Vercel.
   - In **Project Settings → Environment Variables**, add:
     - `NEXT_PUBLIC_SITE_URL=https://www.ganpatilifecare.com`
     - `ADMIN_PASSWORD=your_strong_admin_password`
     - `ADMIN_SESSION_SECRET=your_32_character_secret`
     - `DATABASE_URL=your_postgres_connection_string`
   - Trigger deployment.

2. **Connect Custom Domain:**
   - In Vercel Project Settings, navigate to **Domains**.
   - Add `ganpatilifecare.com` and `www.ganpatilifecare.com`.
   - Point your DNS records to Vercel (`A` record `76.76.21.21` or `CNAME` `cname.vercel-dns.com`).

---

## 🔒 Security Best Practices

- Secure salted password hashing (`crypto.scryptSync`).
- Signed HMAC session tokens with expiration.
- Input sanitization and Zod server-side validation on all forms.
- No client-side exposure of database credentials or administrative secrets.
- Dynamic WhatsApp link generation safely URL-encoded on the client side.
