export const business = {
  name: "Ganpati Lifecare",
  shortName: "GLC",
  manager: "Dharampal Verma",
  address: "Main Road, Mandi Goluwala, District Hanumangarh, Rajasthan, India - 335802",
  gstin: "08JPEPD8830M1ZD",
  phone: "+91 98282 32254",
  phoneRaw: "+919828232254",
  alternatePhone: "+91 94600 95250",
  alternatePhoneRaw: "+919460095250",
  email: "whiteroseglc@gmail.com",
  whatsapp: "919828232254",
  website: "https://www.ganpatilifecare.com",
} as const;

export const categories = ["All Products", "Orthopedic", "Surgical", "Hospital Uniforms", "Healthcare Essentials"] as const;
export type ProductCategory = (typeof categories)[number];
export type Product = {
  name: string;
  slug: string;
  description: string;
  category: Exclude<ProductCategory, "All Products">;
  image: string;
  featured?: boolean;
  brand?: string;
  details?: string[];
};

const image = (filename: string) => `/images/products/${filename}`;

export const products: Product[] = [
  { name: "Orthocot Cotton Roll", slug: "orthocot-cotton-roll", description: "White Rose Brand cotton roll for orthopedic cast padding and medical dressing.", category: "Orthopedic", image: image("orthocot-cotton-roll.webp"), brand: "White Rose", featured: true, details: ["The reference lists 10 cm and 15 cm x 6 m rolls, along with 100 g, 200 g, 300 g and 500 g options.", "Confirm available sizes, packaging and product status when requesting a quotation."] },
  { name: "Stockinet", slug: "stockinet", description: "Soft tubular stockinet for orthopedic and cast applications.", category: "Orthopedic", image: image("stockinet.png"), featured: true },
  { name: "Skin Traction Kit", slug: "skin-traction-kit", description: "Skin traction kits for orthopedic care; enquire for current configuration and availability.", category: "Orthopedic", image: image("skin-traction-kit.jpg"), featured: true },
  { name: "Orthopedic Gauze Bandages", slug: "orthopedic-gauze-bandages", description: "Gauze bandages for orthopedic dressing requirements.", category: "Orthopedic", image: image("orthopedic-gauze-bandages.jpg") },
  { name: "Ortho Active Cotton Crepe Bandage", slug: "bandages", description: "Ortho Active cotton crepe bandage for dressing and support requirements.", category: "Orthopedic", image: image("ortho-active-crepe-bandage.webp"), brand: "Ortho Active", featured: true },
  { name: "Lap-Pad Cotton Cloth Sponge", slug: "sponge-pad", description: "Cotton cloth sponge pads for surgical and clinical dressing requirements.", category: "Surgical", image: image("lap-pad-sponge.webp"), brand: "Lap-Pad", featured: true },
  { name: "Gamjee Roll", slug: "gamjee-roll", description: "Absorbent cotton roll enclosed in gauze for dressing requirements.", category: "Surgical", image: image("gamjee-roll.webp"), featured: true },
  { name: "Surgical Dressing Materials", slug: "surgical-dressing-materials", description: "A range of surgical dressing materials. Contact GLC for item specifications.", category: "Surgical", image: image("surgical-dressing-materials.png"), featured: true },
  { name: "Doctor Coats", slug: "doctor-coats", description: "Doctor coats for hospitals and healthcare facilities.", category: "Hospital Uniforms", image: image("doctor-coats.png"), featured: true },
  { name: "Nurse Uniforms", slug: "nurse-uniforms", description: "Nurse uniforms for hospitals and healthcare facilities.", category: "Hospital Uniforms", image: image("nurse-uniforms.png") },
  { name: "OT Dresses", slug: "ot-dresses", description: "OT dresses for operating theatre staff; confirm fabric and available options.", category: "Hospital Uniforms", image: image("ot-dresses.png"), featured: true },
  { name: "Staff Uniforms", slug: "staff-uniforms", description: "Staff uniforms for healthcare facilities. Enquire about available options.", category: "Hospital Uniforms", image: image("staff-uniforms.png") },
  { name: "Medical Disposable Products", slug: "medical-disposables", description: "Medical disposables for hospitals and clinics; request current product details.", category: "Healthcare Essentials", image: image("medical-disposables.png") },
  { name: "Hospital Consumables", slug: "hospital-consumables", description: "Hospital consumables for institutional procurement. Contact us for availability.", category: "Healthcare Essentials", image: image("hospital-consumables.png"), featured: true },
];

export const locations = [
  { name: "Goluwala", slug: "goluwala", description: "Ganpati Lifecare is based in Mandi Goluwala, Hanumangarh. Contact the team to coordinate local pickup, product availability and wholesale inquiries.", products: ["Orthocot Cotton Roll", "Gamjee Roll", "Lap-Pad Sponge"] },
  { name: "Hanumangarh", slug: "hanumangarh", description: "Healthcare facilities in Hanumangarh can contact Ganpati Lifecare for orthopedic, surgical, uniform and hospital supply inquiries from its Mandi Goluwala base.", products: ["Orthocot Cotton Roll", "Stockinet", "Skin Traction Kit"] },
  { name: "Sri Ganganagar", slug: "sri-ganganagar", description: "Ganpati Lifecare coordinates wholesale supply inquiries for healthcare facilities in Sri Ganganagar and nearby areas.", products: ["OT Dresses", "Nurse Uniforms", "Gamjee Roll"] },
  { name: "Suratgarh", slug: "suratgarh", description: "Contact Ganpati Lifecare to discuss orthopedic and surgical product availability and freight arrangements for Suratgarh.", products: ["Skin Traction Kit", "Stockinet", "Bandages"] },
  { name: "Bikaner", slug: "bikaner", description: "Hospitals and distributors in Bikaner can request product information and wholesale quotations from Ganpati Lifecare.", products: ["Orthocot Cotton Roll", "Gamjee Roll", "Orthopedic Gauze Bandages"] },
  { name: "Nohar", slug: "nohar", description: "Ganpati Lifecare accepts inquiries for medical supplies serving Nohar; delivery details are confirmed when an order is discussed.", products: ["Orthocot Cotton Roll", "Bandages", "Doctor Coats"] },
  { name: "Rawatsar", slug: "rawatsar", description: "Healthcare providers in Rawatsar can enquire about the catalog and regional freight options from the Mandi Goluwala supply base.", products: ["Skin Traction Kit", "Stockinet", "Orthocot Cotton Roll"] },
  { name: "Pilibanga", slug: "pilibanga", description: "Contact Ganpati Lifecare for wholesale medical and surgical supply inquiries in Pilibanga.", products: ["Orthocot Cotton Roll", "Stockinet", "Surgical Dressing Materials"] },
  { name: "Sangaria", slug: "sangaria", description: "Ganpati Lifecare coordinates supply inquiries for healthcare facilities in Sangaria and the surrounding region.", products: ["Surgical Dressing Materials", "Orthopedic Gauze Bandages", "Nurse Uniforms"] },
  { name: "Bhadra", slug: "bhadra", description: "Hospitals and clinics in Bhadra can enquire about orthopedic, surgical and hospital supply availability.", products: ["Orthocot Cotton Roll", "Skin Traction Kit", "Orthopedic Gauze Bandages"] },
];

export const brands = [
  { name: "White Rose", slug: "white-rose", description: "White Rose products listed by Ganpati Lifecare include Orthocot cotton rolls, orthopedic gauze, stockinet and Gamjee rolls.", productSlugs: ["orthocot-cotton-roll", "orthopedic-gauze-bandages", "stockinet", "gamjee-roll"] },
  { name: "Orthocot", slug: "orthocot", description: "Orthocot is the name used for the orthopedic cotton roll range listed by Ganpati Lifecare. Ask for current specifications and availability.", productSlugs: ["orthocot-cotton-roll", "stockinet"] },
  { name: "Ortho Active", slug: "ortho-active", description: "Ortho Active is the brand shown for the cotton crepe bandage in the Ganpati Lifecare catalog.", productSlugs: ["bandages"] },
  { name: "Lap-Pad", slug: "lap-pad", description: "Lap-Pad is the brand shown for the cotton cloth sponge in the Ganpati Lifecare catalog.", productSlugs: ["sponge-pad", "gamjee-roll", "surgical-dressing-materials"] },
];

export const articles = [
  { title: "Orthocot vs Ordinary Cotton Rolls", slug: "orthocot-cotton-roll-vs-ordinary-cotton", topic: "Orthopedics", date: "August 20, 2026", excerpt: "A guide to the different roles of orthopedic padding cotton and ordinary absorbent cotton.", body: ["Orthopedic cast padding and ordinary absorbent cotton are intended for different purposes. Product specifications and suitability should be confirmed with the supplier and relevant care team.", "When comparing products, ask about material, dimensions, packaging, intended use and whether an item is supplied sterile or non-sterile. Do not assume sterilization status from the product category alone.", "Ganpati Lifecare lists Orthocot Cotton Roll in its catalog. Healthcare buyers can contact the business for current sizes, availability and wholesale quotation details."] },
  { title: "What Is Stockinet? Sizes & Cast Uses", slug: "what-is-stockinet", topic: "Orthopedics", date: "August 15, 2026", excerpt: "An overview of orthopedic stockinet and what to confirm when selecting a product.", body: ["Stockinet is a tubular textile product used in some orthopedic care settings. Requirements vary by application and care provider.", "Before ordering, confirm material, width, length, packaging and intended use with the supplier. Clinical decisions should be made by a qualified professional."] },
  { title: "Skin Traction Kit Guide & Uses", slug: "what-is-a-skin-traction-kit", topic: "Trauma care", date: "August 10, 2026", excerpt: "Questions to ask about kit configuration, product details and availability.", body: ["Skin traction equipment is used in clinical settings under professional supervision. Kit configurations can vary by supplier and intended application.", "Confirm the included components, sizing, packaging and product status before ordering. This article is general supply information, not clinical advice."] },
  { title: "Choosing OT Dress & Doctor Coat Fabric", slug: "how-to-choose-ot-dress-doctor-coat-fabric", topic: "Hospital uniforms", date: "July 28, 2026", excerpt: "A procurement checklist for medical uniforms and staff garments.", body: ["When sourcing uniforms, confirm available sizes, fabric composition, care instructions and whether custom options are available.", "Operating theatre clothing requirements are set by the healthcare facility. Confirm the required garment specifications and processing instructions before procurement."] },
  { title: "Hospital Consumables Checklist", slug: "hospital-consumables-checklist-clinic-nursing-home-rajasthan", topic: "Hospital management", date: "July 15, 2026", excerpt: "A practical starting point for organizing recurring hospital supply inquiries.", body: ["Build a purchasing list around the departments and routines in your facility. Record product name, specification, preferred pack size, estimated usage and reorder contact.", "Ask suppliers to confirm item-level specifications, availability and quotation terms. Requirements differ across facilities and should be reviewed by the procurement team."] },
  { title: "Gamjee Roll, Sponge Pads & Gauze", slug: "gamjee-roll-vs-sponge-pads-vs-gauze", topic: "Surgical supplies", date: "July 5, 2026", excerpt: "Compare product descriptions and confirm the appropriate item with your clinical team.", body: ["Gamjee rolls, sponge pads and gauze are different product types in the Ganpati Lifecare catalog. Their construction and intended applications vary.", "For procurement, confirm the exact product, dimensions, ply where applicable, sterile status and packaging directly with the supplier. Clinical selection belongs to qualified healthcare staff."] },
  { title: "Wholesale Medical Supplies Sourcing", slug: "how-to-buy-medical-supplies-wholesale-hanumangarh-sri-ganganagar", topic: "Wholesale & logistics", date: "June 25, 2026", excerpt: "A checklist for requesting product details and a wholesale quotation.", body: ["Prepare a list of requested products, expected quantities, required specifications and delivery location before requesting a quote.", "Ganpati Lifecare handles wholesale inquiries from Mandi Goluwala. Contact the business to confirm availability, quotation terms and freight arrangements."] },
  { title: "Bulk Ordering Guide for Medical Supplies", slug: "bulk-ordering-guide-medical-supplies-rajasthan", topic: "Procurement guide", date: "June 18, 2026", excerpt: "Questions to ask about order quantities, invoices, packaging and dispatch.", body: ["A useful bulk inquiry includes product names, specifications, quantity, invoice requirements and destination.", "Confirm minimum quantities, final pricing, applicable taxes, packaging and dispatch schedule directly with the supplier before placing an order."] },
];

export const faqs = [
  { question: "What does Ganpati Lifecare supply?", answer: "The catalog includes orthopedic supplies, surgical dressing materials, hospital uniforms, medical disposables and hospital consumables." },
  { question: "Where is Ganpati Lifecare located?", answer: "The business is based at Main Road, Mandi Goluwala, District Hanumangarh, Rajasthan, India - 335802." },
  { question: "Who manages Ganpati Lifecare?", answer: "Ganpati Lifecare is managed by Dharampal Verma." },
  { question: "What is Orthocot cotton roll used for?", answer: "The reference lists Orthocot cotton roll for orthopedic cast padding and dressing supply inquiries. Confirm product use and specifications with the relevant healthcare professional and supplier." },
  { question: "Does Ganpati Lifecare list stockinet and skin traction kits?", answer: "Yes. Stockinet and skin traction kits appear in the orthopedic product catalog. Contact the business for current configurations, sizes and availability." },
  { question: "Does the catalog include Gamjee rolls and sponge pads?", answer: "Yes. Gamjee rolls and Lap-Pad cotton cloth sponges are listed in the surgical catalog. Ask for item-level specifications and packaging." },
  { question: "Are hospital uniforms available?", answer: "Doctor coats, nurse uniforms, OT dresses and staff uniforms are listed. Confirm available fabrics, sizes and options directly with Ganpati Lifecare." },
  { question: "How can I request wholesale pricing?", answer: "Call or WhatsApp the business, or send an inquiry with product names, quantities and your delivery location." },
  { question: "Which areas can contact Ganpati Lifecare?", answer: "The website lists Goluwala, Hanumangarh, Sri Ganganagar, Suratgarh, Bikaner, Nohar, Rawatsar, Pilibanga, Sangaria and Bhadra. Confirm delivery availability and timing directly." },
  { question: "Does Ganpati Lifecare deliver to my location?", answer: "Contact the business with your delivery location to confirm whether freight or delivery can be arranged and to discuss timing." },
  { question: "How do I confirm specifications or sterile status?", answer: "Specifications and sterile status vary by product. Contact Ganpati Lifecare for item-level details before ordering." },
  { question: "How can I contact Ganpati Lifecare?", answer: "Call +91 98282 32254 or +91 94600 95250, email whiteroseglc@gmail.com, or use the WhatsApp inquiry action on this website." },
];
