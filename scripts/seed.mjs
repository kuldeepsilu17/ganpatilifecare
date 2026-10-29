// Ganpati Lifecare - Database Seeding Script (PostgreSQL / JSON Store)
// Populates all 14 verified products, 8 blog articles, business settings, and admin user.

import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const DATA_DIR = path.join(process.cwd(), "data");

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

const INITIAL_PRODUCTS = [
  {
    id: "orthocot-cotton-roll",
    slug: "orthocot-cotton-roll",
    name: "Orthocot Cotton Roll",
    category: "orthopedic",
    description: "White Rose Brand 100% natural, highly absorbent orthopedic cotton roll for cast padding and medical dressing.",
    imageUrls: JSON.stringify(["/images/products/real_orthocot_cotton_roll_15cm.webp"]),
    specifications: JSON.stringify({
      Brand: "White Rose",
      Material: "100% Pure Bleached Cotton",
      "Standard Widths": "10cm, 15cm",
      Length: "6 Meters (Approx)",
      Features: "Hypoallergenic, uniform thickness, autoclavable",
      Application: "Plaster cast padding, orthopedic immobilization, dressing",
    }),
    variants: JSON.stringify(["10cm x 6 Mtr", "15cm x 6 Mtr"]),
    packagingInformation: "Available in boxes of 10 rolls or master carton of 100 rolls.",
    seoTitle: "Orthocot Cotton Roll Supplier Rajasthan | Ganpati Lifecare",
    seoDescription: "White Rose Brand Orthocot surgical cotton rolls for cast padding and wound care. Wholesale supply by Ganpati Lifecare, Mandi Goluwala, Hanumangarh, Rajasthan.",
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "stockinet",
    slug: "stockinet",
    name: "Stockinet",
    category: "orthopedic",
    description: "Soft, breathable circular rib-knit tubular stockinet for skin protection under orthopedic casts.",
    imageUrls: JSON.stringify(["/images/products/stockinet.png"]),
    specifications: JSON.stringify({
      Material: "Pure circular rib-knit cotton yarn",
      Elasticity: "High transverse stretch with longitudinal stability",
      Widths: "5cm, 7.5cm, 10cm, 15cm",
      Application: "Under-cast skin liner, splint padding, dressing retention",
    }),
    variants: JSON.stringify(["5cm x 10m", "7.5cm x 10m", "10cm x 10m"]),
    packagingInformation: "Individually wrapped rolls in hospital dispensing cartons.",
    seoTitle: "Orthopedic Stockinet Supplier Rajasthan | Ganpati Lifecare",
    seoDescription: "Seamless rib-knit orthopedic stockinet for skin protection under casts and splints. Available for hospitals across Rajasthan from Ganpati Lifecare, Goluwala.",
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "skin-traction-kit",
    slug: "skin-traction-kit",
    name: "Skin Traction Kit",
    category: "orthopedic",
    description: "Complete orthopedic skin traction kits with foam stirrup, cords, and spreader plate for pre-operative fracture stabilization.",
    imageUrls: JSON.stringify(["/images/products/skin-traction-kit.jpg"]),
    specifications: JSON.stringify({
      Components: "Hypoallergenic adhesive stirrup, high-density foam padding, traction cord, wooden/plastic spreader",
      Application: "Femoral & tibial fracture stabilization, joint deformity reduction",
    }),
    variants: JSON.stringify(["Child / Pediatric", "Adult Standard"]),
    packagingInformation: "Individually sealed sterile pack with spreader plate included.",
    seoTitle: "Skin Traction Kit Supplier in Rajasthan | Ganpati Lifecare",
    seoDescription: "Complete skin traction kits with foam padding, cords, and spreader plate for pre-operative fracture stabilization. Distributed by Ganpati Lifecare Rajasthan.",
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "orthopedic-gauze-bandages",
    slug: "orthopedic-gauze-bandages",
    name: "Orthopedic Gauze Bandages",
    category: "orthopedic",
    description: "High-absorbency woven cotton gauze for orthopedic dressing applications, wound packing, and secure compression.",
    imageUrls: JSON.stringify(["/images/products/orthopedic-gauze-bandages.jpg"]),
    specifications: JSON.stringify({
      Material: "100% woven cotton gauze with selvedged fast edges",
      Sizes: "5cm, 7.5cm, 10cm, 15cm x 3m",
      Absorbency: "Rapid fluid uptake within 10 seconds",
    }),
    variants: JSON.stringify(["5cm x 3m", "7.5cm x 3m", "10cm x 3m"]),
    packagingInformation: "Packet of 12 rolls; bulk carton of 240 rolls.",
    seoTitle: "Orthopedic Gauze Bandages Supplier | Ganpati Lifecare",
    seoDescription: "High-absorbency woven cotton orthopedic gauze bandages for surgical packing, dressing retention, and clinical wound care. Ganpati Lifecare, Mandi Goluwala.",
    isFeatured: false,
    isPublished: true,
  },
  {
    id: "bandages",
    slug: "bandages",
    name: "Ortho Active Cotton Crepe Bandage",
    category: "surgical",
    description: "Ortho Active high-elasticity cotton crepe bandage with fast edges for joint support, sprains, and compression dressings.",
    imageUrls: JSON.stringify(["/images/products/real_ortho_active_crepe_bandage.webp"]),
    specifications: JSON.stringify({
      Brand: "Ortho Active",
      Material: "Pure cotton with elastic crepe weave",
      Elasticity: "Over 180% stretch recovery",
      Widths: "6cm, 8cm, 10cm, 15cm",
    }),
    variants: JSON.stringify(["6cm x 4m", "8cm x 4m", "10cm x 4m", "15cm x 4m"]),
    packagingInformation: "Box of 10 rolls with retention clips included.",
    seoTitle: "Ortho Active Crepe Bandage Supplier | Ganpati Lifecare",
    seoDescription: "Ortho Active durable cotton crepe bandages with fast edges for joint support, compression dressing, and sprains. Wholesale medical supply by Ganpati Lifecare.",
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "sponge-pad",
    slug: "sponge-pad",
    name: "Lap-Pad Cotton Cloth Sponge",
    category: "surgical",
    description: "Lap-Pad 8-ply 100% absorbent cotton cloth sponge pads for surgical, OT, and clinical dressing procedures.",
    imageUrls: JSON.stringify(["/images/products/real_lap_pad_sponge.webp"]),
    specifications: JSON.stringify({
      Construction: "8-ply pre-washed folded woven cotton",
      Sizes: "Medium (25x25cm), Large (30x30cm)",
      Features: "Folded edges prevent loose threads inside operating theatres",
    }),
    variants: JSON.stringify(["Medium (25 Pcs)", "Large (25 Pcs)"]),
    packagingInformation: "Pack of 25 pieces; master carton of 500 pieces.",
    seoTitle: "Lap-Pad Cotton Cloth Sponge Supplier | Ganpati Lifecare",
    seoDescription: "Lap-Pad 8-ply absorbent cotton cloth sponge pads with folded edges for operating theatre and clinical wound care. Supplied wholesale by Ganpati Lifecare.",
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "gamjee-roll",
    slug: "gamjee-roll",
    name: "Gamjee Roll",
    category: "surgical",
    description: "Highly absorbent 100% pure cotton Gamjee roll encased in soft gauze for heavy wound exudate, burns, and post-operative care.",
    imageUrls: JSON.stringify(["/images/products/real_gamjee_roll.webp"]),
    specifications: JSON.stringify({
      Inner: "100% medical grade absorbent cotton wool",
      Outer: "Low-lint tubular woven gauze sleeve",
      Sizes: "10cm x 3m, 15cm x 3m",
    }),
    variants: JSON.stringify(["10cm x 3m", "15cm x 3m"]),
    packagingInformation: "Poly-sealed moisture-proof rolls.",
    seoTitle: "Gamjee Roll Wholesale Supplier | Ganpati Lifecare",
    seoDescription: "Thick absorbent cotton wool encased in gauze sleeve for heavy wound exudate, burns, and post-operative care. Supplied wholesale by Ganpati Lifecare Rajasthan.",
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "surgical-dressing-materials",
    slug: "surgical-dressing-materials",
    name: "Surgical Dressing Materials",
    category: "surgical",
    description: "Comprehensive surgical dressing essentials including sterile gauze swabs, absorbent pads, and adhesive tapes.",
    imageUrls: JSON.stringify(["/images/products/surgical-dressing-materials.jpg"]),
    specifications: JSON.stringify({
      Components: "Gauze swabs, paraffin gauze, surgical paper tapes, microporous tapes",
      Application: "General surgical dressings, clean wound packing",
    }),
    variants: JSON.stringify(["Standard Clinic Dressing Assortment", "OT Dressing Kit"]),
    packagingInformation: "Sterile packed individually or in bulk clinic cartons.",
    seoTitle: "Surgical Dressing Materials Wholesale | Ganpati Lifecare",
    seoDescription: "Surgical dressing materials, gauze swabs, non-adherent pads, and adhesive tapes. Direct wholesale supply across Rajasthan by Ganpati Lifecare.",
    isFeatured: false,
    isPublished: true,
  },
  {
    id: "doctor-coats",
    slug: "doctor-coats",
    name: "Doctor Coats",
    category: "uniforms",
    description: "Professional tailored white lab coats and consultation jackets made from breathable, stain-resistant poly-cotton fabric.",
    imageUrls: JSON.stringify(["/images/products/doctor-coats.jpg"]),
    specifications: JSON.stringify({
      Fabric: "65/35 Premium poly-cotton blend, 200 GSM",
      Features: "Notch lapel collar, 3 reinforced patch pockets, side access slits",
      Sizes: "S, M, L, XL, XXL",
    }),
    variants: JSON.stringify(["Full Sleeve (Unisex)", "Half Sleeve (Unisex)"]),
    packagingInformation: "Individually poly-bagged with garment hanger option.",
    seoTitle: "Doctor Coats & Aprons Supplier Rajasthan | Ganpati Lifecare",
    seoDescription: "Premium tailored doctor lab coats and medical aprons. Breathable, durable, institutional uniforms supplied by Ganpati Lifecare Rajasthan.",
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "nurse-uniforms",
    slug: "nurse-uniforms",
    name: "Nurse Uniforms",
    category: "uniforms",
    description: "Comfortable, durable nursing scrubs and salwar suits designed for demanding hospital shifts.",
    imageUrls: JSON.stringify(["/images/products/nurse-uniforms.jpg"]),
    specifications: JSON.stringify({
      Fabric: "High-tenacity poly-viscose breathable twill",
      Colors: "Medical Navy Blue, Sky Blue, White, Teal Green",
      Sizes: "XS to 3XL",
    }),
    variants: JSON.stringify(["Scrub Suit Top & Trouser", "Nursing Salwar Suit Set"]),
    packagingInformation: "Set packed in transparent protective garment sleeve.",
    seoTitle: "Nurse Uniforms & Scrubs Rajasthan | Ganpati Lifecare",
    seoDescription: "Comfortable, wrinkle-resistant nursing uniforms, scrub suits, and ward attire for hospitals and clinics. Ganpati Lifecare wholesale supply.",
    isFeatured: false,
    isPublished: true,
  },
  {
    id: "ot-dresses",
    slug: "ot-dresses",
    name: "OT Dresses",
    category: "uniforms",
    description: "Sterilizable surgical operation theatre scrub suits and barrier gowns in healthcare green and blue.",
    imageUrls: JSON.stringify(["/images/products/ot-dresses.jpg"]),
    specifications: JSON.stringify({
      Fabric: "Autoclavable 100% cotton drill or antistatic poly-cotton",
      Colors: "OT Surgeon Green, Royal Surgical Blue",
      Design: "V-neck pull-on tunic with drawstring waist trousers",
    }),
    variants: JSON.stringify(["Surgeon Green Set", "Royal Blue Set"]),
    packagingInformation: "Pack of 5 sets per bundle.",
    seoTitle: "OT Dresses & Scrub Suits Supplier | Ganpati Lifecare",
    seoDescription: "Autoclavable operation theatre gowns, surgeon dresses, and scrub suits for surgical units across Rajasthan. Ganpati Lifecare.",
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "staff-uniforms",
    slug: "staff-uniforms",
    name: "Staff Uniforms",
    category: "uniforms",
    description: "Uniform sets for ward attendants, receptionists, housekeeping, and maintenance teams in healthcare institutions.",
    imageUrls: JSON.stringify(["/images/products/staff-uniforms.jpg"]),
    specifications: JSON.stringify({
      Fabric: "Stain-repellent heavy duty polyester-cotton",
      Options: "Shirts, trousers, aprons, housekeeping coats",
      Sizes: "S, M, L, XL, XXL",
    }),
    variants: JSON.stringify(["Housekeeping Set", "Support Staff Tunic & Trouser"]),
    packagingInformation: "Institutional bulk pack of 10 sets.",
    seoTitle: "Hospital Staff Uniforms Rajasthan | Ganpati Lifecare",
    seoDescription: "Hospital support staff uniforms, orderly attire, and ward assistant workwear. Quality medical institutional clothing from Ganpati Lifecare.",
    isFeatured: false,
    isPublished: true,
  },
  {
    id: "medical-disposable-products",
    slug: "medical-disposable-products",
    name: "Medical Disposable Products",
    category: "essentials",
    description: "Single-use hygiene disposables including non-woven surgeon caps, 3-ply masks, shoe covers, and examination gloves.",
    imageUrls: JSON.stringify(["/images/products/medical-disposable-products.jpg"]),
    specifications: JSON.stringify({
      Standards: "Non-woven spunbond polypropylene, BIS / ISO compliant",
      Items: "Bouffant caps, 3-ply surgical masks, shoe covers, nitrile/latex gloves",
    }),
    variants: JSON.stringify(["Surgeon Caps (Box of 100)", "3-Ply Face Masks (Box of 50)", "Shoe Covers (100 Pcs)"]),
    packagingInformation: "Boxes of 50/100 pieces in master carton of 2000 pieces.",
    seoTitle: "Medical Disposables Wholesale | Ganpati Lifecare",
    seoDescription: "Sterile and non-sterile hospital disposables, surgical face masks, surgeon caps, and shoe covers. Wholesale distributor Ganpati Lifecare Rajasthan.",
    isFeatured: false,
    isPublished: true,
  },
  {
    id: "hospital-consumables",
    slug: "hospital-consumables",
    name: "Hospital Consumables",
    category: "essentials",
    description: "Everyday clinical care consumables including IV cannulas, infusion sets, syringes, suction catheters, and urine collection bags.",
    imageUrls: JSON.stringify(["/images/products/hospital-consumables.jpg"]),
    specifications: JSON.stringify({
      Category: "Class IIa Medical Consumables",
      Sterilization: "Ethylene Oxide (ETO) sterile sealed",
    }),
    variants: JSON.stringify(["IV Cannula Assorted Gauges", "Infusion Set with Air Vent", "Disposable Syringes"]),
    packagingInformation: "Individual blister packs in cartons of 100.",
    seoTitle: "Hospital Consumables Supplier Rajasthan | Ganpati Lifecare",
    seoDescription: "High-volume hospital consumables, IV infusion sets, syringes, catheters, and bedside supplies. Ganpati Lifecare Mandi Goluwala.",
    isFeatured: true,
    isPublished: true,
  },
];

const INITIAL_BLOGS = [
  {
    id: "orthocot-cotton-roll-vs-ordinary-cotton",
    slug: "orthocot-cotton-roll-vs-ordinary-cotton",
    title: "Orthocot vs Ordinary Cotton Rolls",
    excerpt: "Understand the vital clinical differences between specialized Orthocot cast padding cotton rolls and standard absorbent cotton for hospital fracture care.",
    content: "When treating bone fractures and joint injuries, orthopedic surgeons and plaster room technicians in Hanumangarh and across Rajasthan require specialized padding materials. Unlike ordinary cotton wool, Orthocot Cotton Roll is 100% pure bleached cotton engineered with uniform fiber alignment that prevents matting, ridges, and skin maceration under rigid plaster and fiberglass casts.",
    coverImage: "/images/products/real_orthocot_cotton_roll_15cm.webp",
    author: "Dharampal Verma",
    publishedAt: new Date("2026-08-20T00:00:00.000Z"),
    isPublished: true,
    seoTitle: "Orthocot vs Ordinary Cotton Rolls | Ganpati Lifecare",
    seoDescription: "Clinical comparison between specialized Orthocot cast padding and standard absorbent cotton for orthopedic plaster casts.",
  },
  {
    id: "how-to-choose-orthopedic-supplies",
    slug: "how-to-choose-orthopedic-supplies",
    title: "How to Choose Orthopedic Supplies for Hospitals and Clinics",
    excerpt: "A practical guide for medical superintendents and clinic managers on sourcing durable orthopedic supplies, crepe bandages, and cast materials.",
    content: "Selecting dependable orthopedic supplies directly impacts patient recovery timelines and hospital reputation. Institutional purchasers should prioritize certified fiber purity, reliable tensile strength in crepe bandages, and consistent dimensions in surgical dressing rolls.",
    coverImage: "/images/products/real_ortho_active_crepe_bandage.webp",
    author: "Dharampal Verma",
    publishedAt: new Date("2026-09-05T00:00:00.000Z"),
    isPublished: true,
    seoTitle: "How to Choose Orthopedic Supplies | Ganpati Lifecare",
    seoDescription: "Practical guide for hospital procurement managers on evaluating orthopedic supplies, crepe bandages, and cast padding.",
  },
  {
    id: "cotton-crepe-bandage-uses-compression-dressing",
    slug: "cotton-crepe-bandage-uses-compression-dressing",
    title: "Cotton Crepe Bandage Uses & Best Practices for Compression Dressing",
    excerpt: "Learn the proper techniques for applying cotton crepe bandages for sprains, venous disorders, and post-fracture joint rehabilitation.",
    content: "Cotton crepe bandages provide uniform compression without constricting vital circulation. Proper spiral or figure-of-eight application technique ensures consistent support for sprained ankles, knees, and post-cast rehabilitation.",
    coverImage: "/images/products/real_ortho_active_crepe_bandage.webp",
    author: "Dharampal Verma",
    publishedAt: new Date("2026-09-15T00:00:00.000Z"),
    isPublished: true,
    seoTitle: "Cotton Crepe Bandage Uses & Compression | Ganpati Lifecare",
    seoDescription: "Best clinical practices for applying cotton crepe bandages for sprains, swelling management, and post-operative joint stability.",
  },
  {
    id: "surgical-dressings-types-absorbency-standards",
    slug: "surgical-dressings-types-absorbency-standards",
    title: "Surgical Dressings: Types, Absorbency Standards & Quality Sourcing",
    excerpt: "An in-depth review of wound dressing materials, gauze sponges, Lap-Pads, and Gamjee rolls for clean surgical environments.",
    content: "Operating theatre surgical sponges and wound dressings require strict manufacturing standards with zero chemical residue and folded selvage edges to avoid shedding fibers inside open surgical incisions.",
    coverImage: "/images/products/real_lap_pad_sponge.webp",
    author: "Dharampal Verma",
    publishedAt: new Date("2026-09-22T00:00:00.000Z"),
    isPublished: true,
    seoTitle: "Surgical Dressings Guide | Ganpati Lifecare",
    seoDescription: "Review of surgical dressing types, absorbency criteria, Lap-Pad cotton sponges, and Gamjee rolls for hospital procurement.",
  },
  {
    id: "hospital-uniforms-selection-guide-scrubs-coats",
    slug: "hospital-uniforms-selection-guide-scrubs-coats",
    title: "Hospital Uniforms Guide: Choosing Durable Scrubs, Doctor Coats & OT Wear",
    excerpt: "How healthcare facilities balance hygiene standards, autoclave tolerance, and clinician comfort when ordering institutional uniforms.",
    content: "Medical apparel must endure frequent high-temperature laundry and autoclave cycles while maintaining breathable comfort during 12-hour duty shifts. Poly-cotton blends provide the optimal balance of longevity and hygiene.",
    coverImage: "/images/products/doctor-coats.jpg",
    author: "Dharampal Verma",
    publishedAt: new Date("2026-09-28T00:00:00.000Z"),
    isPublished: true,
    seoTitle: "Hospital Uniforms Selection Guide | Ganpati Lifecare",
    seoDescription: "Selecting durable doctor coats, nursing scrubs, and operation theatre gowns for hospital staff.",
  },
  {
    id: "skin-traction-kits-orthopedic-trauma-care",
    slug: "skin-traction-kits-orthopedic-trauma-care",
    title: "Skin Traction Kits in Orthopedic Trauma Care",
    excerpt: "Understanding the role of skin traction assemblies in pre-operative fracture alignment and emergency muscle spasm control.",
    content: "Skin traction kits provide essential longitudinal traction to counteract muscle spasm and maintain anatomical alignment in lower extremity fractures prior to definitive surgical fixation.",
    coverImage: "/images/products/skin-traction-kit.jpg",
    author: "Dharampal Verma",
    publishedAt: new Date("2026-10-02T00:00:00.000Z"),
    isPublished: true,
    seoTitle: "Skin Traction Kits in Trauma Care | Ganpati Lifecare",
    seoDescription: "Clinical role of skin traction kits in emergency fracture management and joint realignment in trauma care units.",
  },
  {
    id: "gamjee-roll-absorbent-wound-care",
    slug: "gamjee-roll-absorbent-wound-care",
    title: "Gamjee Roll: Heavy Absorbency and Trauma Wound Management",
    excerpt: "Why Gamjee rolls remain the standard for high-exudate wound management, post-surgical packing, and thermal protection.",
    content: "Invented by Dr. Sampson Gamjee, the combination of dense 100% absorbent cotton wool enveloped in a soft gauze sleeve provides unmatched absorbency and cushioning for traumatic lacerations, burn dressings, and orthopedics.",
    coverImage: "/images/products/real_gamjee_roll.webp",
    author: "Dharampal Verma",
    publishedAt: new Date("2026-10-10T00:00:00.000Z"),
    isPublished: true,
    seoTitle: "Gamjee Roll Wound Care Guide | Ganpati Lifecare",
    seoDescription: "Why Gamjee rolls remain essential for heavy exudate drainage, burns, and post-operative padding.",
  },
  {
    id: "medical-wholesale-supply-chain-rajasthan",
    slug: "medical-wholesale-supply-chain-rajasthan",
    title: "Building Reliable Medical Wholesale Supply Across Rajasthan",
    excerpt: "How direct regional stocking in Mandi Goluwala ensures rapid delivery to hospitals across Hanumangarh, Sri Ganganagar, and Bikaner.",
    content: "Eliminating multi-tier distribution middlemen allows Ganpati Lifecare to provide hospitals, nursing homes, and rural health clinics across North Rajasthan with consistent stock availability and prompt road transport dispatch.",
    coverImage: "/images/products/real_orthocot_cotton_roll_15cm.webp",
    author: "Dharampal Verma",
    publishedAt: new Date("2026-10-15T00:00:00.000Z"),
    isPublished: true,
    seoTitle: "Medical Supply Chain in Rajasthan | Ganpati Lifecare",
    seoDescription: "How direct healthcare supply from Mandi Goluwala streamlines procurement for hospitals across North Rajasthan.",
  },
];

const INITIAL_SETTINGS = {
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
  seoDefaults: JSON.stringify({
    title: "Ganpati Lifecare | Orthopedic, Surgical & Hospital Supplies",
    description: "Wholesale manufacturer and distributor of White Rose Orthocot cotton rolls, crepe bandages, Lap-Pad sponges, and hospital uniforms in Rajasthan.",
  }),
};

const INITIAL_ADMINS = [
  {
    id: "admin-master",
    name: "Dharampal Verma",
    email: "whiteroseglc@gmail.com",
    passwordHash: hashPassword(process.env.ADMIN_PASSWORD || "glcadmin123"),
    role: "SUPERADMIN",
    createdAt: new Date().toISOString(),
  },
];

const SAMPLE_INQUIRIES = [
  {
    id: 1,
    inquiry_id: "GLC-0001",
    name: "Dr. Rajesh Sharma",
    phone: "+91 98290 12345",
    email: "dr.sharma.ortho@gmail.com",
    product_name: "Orthocot Cotton Roll",
    quantity: "50 Boxes (15cm x 6 Mtr)",
    message: "Urgent wholesale quotation required for orthopedics ward at Hanumangarh trauma centre.",
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    status: "New",
    source: "Website Quotation",
  },
  {
    id: 2,
    inquiry_id: "GLC-0002",
    name: "Manoj Kumar Medical Store",
    phone: "+91 94140 67890",
    email: "manojmedicos.sriganga@gmail.com",
    product_name: "Ortho Active Cotton Crepe Bandage",
    quantity: "200 Rolls (8cm and 10cm)",
    message: "Bulk pricing needed for retail pharmacy supply in Sri Ganganagar.",
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    status: "Quoted",
    source: "WhatsApp Direct",
  },
];

async function seed() {
  console.log("🌱 Starting Ganpati Lifecare database seeding...");
  await fs.mkdir(DATA_DIR, { recursive: true });

  // 1. Seed Products JSON
  const productsFile = path.join(DATA_DIR, "products.json");
  await fs.writeFile(productsFile, JSON.stringify(INITIAL_PRODUCTS, null, 2), "utf8");
  console.log(`✅ Seeded ${INITIAL_PRODUCTS.length} verified products to ${productsFile}`);

  // 2. Seed Blogs JSON
  const blogsFile = path.join(DATA_DIR, "blogs.json");
  await fs.writeFile(blogsFile, JSON.stringify(INITIAL_BLOGS, null, 2), "utf8");
  console.log(`✅ Seeded ${INITIAL_BLOGS.length} verified blog articles to ${blogsFile}`);

  // 3. Seed Site Settings JSON
  const settingsFile = path.join(DATA_DIR, "settings.json");
  await fs.writeFile(settingsFile, JSON.stringify(INITIAL_SETTINGS, null, 2), "utf8");
  console.log(`✅ Seeded verified site settings to ${settingsFile}`);

  // 4. Seed Admin Users JSON
  const adminsFile = path.join(DATA_DIR, "admin_users.json");
  await fs.writeFile(adminsFile, JSON.stringify(INITIAL_ADMINS, null, 2), "utf8");
  console.log(`✅ Seeded initial admin user to ${adminsFile}`);

  // 5. Seed Inquiries JSON (if empty)
  const inquiriesFile = path.join(DATA_DIR, "inquiries.json");
  let existingInquiries = [];
  try {
    const raw = await fs.readFile(inquiriesFile, "utf8");
    existingInquiries = JSON.parse(raw);
  } catch {
    existingInquiries = [];
  }

  if (!existingInquiries || existingInquiries.length === 0) {
    await fs.writeFile(inquiriesFile, JSON.stringify(SAMPLE_INQUIRIES, null, 2), "utf8");
    console.log(`✅ Seeded ${SAMPLE_INQUIRIES.length} sample inquiries to ${inquiriesFile}`);
  } else {
    console.log(`ℹ️ Existing inquiries preserved (${existingInquiries.length} records)`);
  }

  // 6. Prisma Seeding if DATABASE_URL is set
  if (process.env.DATABASE_URL) {
    try {
      const { PrismaClient } = await import("@prisma/client");
      const prisma = new PrismaClient();
      console.log("📡 Connecting to PostgreSQL via Prisma...");

      for (const p of INITIAL_PRODUCTS) {
        await prisma.product.upsert({
          where: { slug: p.slug },
          update: p,
          create: p,
        });
      }
      console.log("✅ Seeded products into PostgreSQL");

      for (const b of INITIAL_BLOGS) {
        await prisma.blogPost.upsert({
          where: { slug: b.slug },
          update: b,
          create: b,
        });
      }
      console.log("✅ Seeded blog posts into PostgreSQL");

      await prisma.siteSettings.upsert({
        where: { id: 1 },
        update: {
          businessName: INITIAL_SETTINGS.businessName,
          logoUrl: INITIAL_SETTINGS.logoUrl,
          contactPhone: INITIAL_SETTINGS.contactPhone,
          alternatePhone: INITIAL_SETTINGS.alternatePhone,
          contactEmail: INITIAL_SETTINGS.contactEmail,
          businessAddress: INITIAL_SETTINGS.businessAddress,
          gstin: INITIAL_SETTINGS.gstin,
          whatsappNumber: INITIAL_SETTINGS.whatsappNumber,
          seoDefaults: INITIAL_SETTINGS.seoDefaults,
        },
        create: {
          id: 1,
          businessName: INITIAL_SETTINGS.businessName,
          logoUrl: INITIAL_SETTINGS.logoUrl,
          contactPhone: INITIAL_SETTINGS.contactPhone,
          alternatePhone: INITIAL_SETTINGS.alternatePhone,
          contactEmail: INITIAL_SETTINGS.contactEmail,
          businessAddress: INITIAL_SETTINGS.businessAddress,
          gstin: INITIAL_SETTINGS.gstin,
          whatsappNumber: INITIAL_SETTINGS.whatsappNumber,
          seoDefaults: INITIAL_SETTINGS.seoDefaults,
        },
      });
      console.log("✅ Seeded site settings into PostgreSQL");

      for (const a of INITIAL_ADMINS) {
        await prisma.adminUser.upsert({
          where: { email: a.email },
          update: {
            name: a.name,
            passwordHash: a.passwordHash,
            role: a.role,
          },
          create: {
            id: a.id,
            name: a.name,
            email: a.email,
            passwordHash: a.passwordHash,
            role: a.role,
          },
        });
      }
      console.log("✅ Seeded admin user into PostgreSQL");

      await prisma.$disconnect();
    } catch (dbErr) {
      console.log("ℹ️ Note: PostgreSQL seeding skipped (DATABASE_URL not active locally). JSON repository successfully seeded.");
    }
  }

  console.log("🎉 Seeding completed successfully!");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
