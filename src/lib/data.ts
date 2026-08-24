export type ProductCategory =
  | "all"
  | "orthopedic"
  | "surgical"
  | "uniforms"
  | "essentials";

export interface Product {
  id: string;
  name: string;
  category: Exclude<ProductCategory, "all">;
  description: string;
  image: string;
  metaTitle: string;
  metaDescription: string;
}

export const PRODUCT_CATEGORIES: {
  id: ProductCategory;
  label: string;
}[] = [
  { id: "all", label: "All Products" },
  { id: "orthopedic", label: "Orthopedic" },
  { id: "surgical", label: "Surgical" },
  { id: "uniforms", label: "Hospital Uniforms" },
  { id: "essentials", label: "Healthcare Essentials" },
];

export const PRODUCTS: Product[] = [
  {
    id: "orthocot-cotton-roll",
    name: "Orthocot Cotton Roll",
    category: "orthopedic",
    description: "Premium orthopedic cotton rolls for clinical and hospital use.",
    image: "/images/products/orthocot_cotton_roll.png",
    metaTitle: "Orthocot Cotton Roll | Ganpati Lifecare",
    metaDescription: "Premium Orthocot cotton rolls for clinical and hospital use. Manufactured for high absorbency and comfort. Distributed by Ganpati Lifecare.",
  },
  {
    id: "stockinet",
    name: "Stockinet",
    category: "orthopedic",
    description: "Soft, breathable stockinet for casts and wound care.",
    image: "/images/products/stockinet.png",
    metaTitle: "Stockinet for Orthopedic Use | Ganpati Lifecare",
    metaDescription: "Soft, breathable orthopedic stockinet for cast application and wound care. Available in bulk from Ganpati Lifecare for hospitals in Rajasthan.",
  },
  {
    id: "skin-traction-kit",
    name: "Skin Traction Kit",
    category: "orthopedic",
    description: "Complete skin traction kits for orthopedic procedures.",
    image: "/images/products/skin_traction_kit.jpg",
    metaTitle: "Skin Traction Kit | Ganpati Lifecare",
    metaDescription: "Complete skin traction kits for emergency orthopedic procedures. Reliable fracture management supplies from Ganpati Lifecare.",
  },
  {
    id: "orthopedic-gauze-bandages",
    name: "Orthopedic Gauze Bandages",
    category: "orthopedic",
    description: "High-absorbency gauze for orthopedic dressing applications.",
    image: "/images/products/orthopedic_gauze_bandages.jpg",
    metaTitle: "Orthopedic Gauze Bandages | Ganpati Lifecare",
    metaDescription: "High-absorbency orthopedic gauze bandages. Essential surgical dressing materials distributed by Ganpati Lifecare in Hanumangarh.",
  },
  {
    id: "bandages",
    name: "Bandages",
    category: "surgical",
    description: "Elastic and crepe bandages in multiple sizes.",
    image: "/images/products/medical_bandage_rolls_1779200753456.png",
    metaTitle: "Medical Bandages | Ganpati Lifecare",
    metaDescription: "Elastic and crepe medical bandages in multiple sizes. Secure wound care and compression solutions from Ganpati Lifecare.",
  },
  {
    id: "sponge-pad",
    name: "Sponge Pad",
    category: "surgical",
    description: "Sterile sponge pads for surgical and OT procedures.",
    image: "/images/products/medical_sponge_stockinet_1779200845560.png",
    metaTitle: "Surgical Sponge Pad | Ganpati Lifecare",
    metaDescription: "Sterile surgical sponge pads for OT procedures and advanced wound care. Order hospital consumables from Ganpati Lifecare.",
  },
  {
    id: "gamjee-roll",
    name: "Gamjee Roll",
    category: "surgical",
    description: "Absorbent gamjee rolls for post-operative care.",
    image: "/images/products/surgical_cotton_showcase_1779200486555.png",
    metaTitle: "Gamjee Roll | Surgical Dressing Supply | Ganpati Lifecare",
    metaDescription: "Highly absorbent Gamjee rolls for post-operative care and surgical dressing. Quality hospital supplies by Ganpati Lifecare.",
  },
  {
    id: "surgical-dressing-materials",
    name: "Surgical Dressing Materials",
    category: "surgical",
    description: "Complete range of surgical dressing supplies.",
    image: "/images/products/complete_product_collection_1779201240988.png",
    metaTitle: "Surgical Dressing Materials | Ganpati Lifecare",
    metaDescription: "Complete range of surgical dressing materials including gauze, cotton, and pads for hospitals and clinics across North Rajasthan.",
  },
  {
    id: "doctor-coats",
    name: "Doctor Coats",
    category: "uniforms",
    description: "Professional doctor coats in premium durable fabric.",
    image: "/images/products/doctor_apparel.png",
    metaTitle: "Doctor Coats | Hospital Uniforms | Ganpati Lifecare",
    metaDescription: "Professional, durable doctor coats designed for comfort and hygiene in healthcare settings. Supplied by Ganpati Lifecare.",
  },
  {
    id: "nurse-uniforms",
    name: "Nurse Uniforms",
    category: "uniforms",
    description: "Comfortable, durable nurse uniforms for hospitals.",
    image: "/images/products/nurse_uniforms.png",
    metaTitle: "Nurse Uniforms | Hospital Uniforms | Ganpati Lifecare",
    metaDescription: "Comfortable and professional nurse uniforms for hospitals and clinics. Quality hospital uniforms from Ganpati Lifecare.",
  },
  {
    id: "ot-dresses",
    name: "OT Dresses",
    category: "uniforms",
    description: "Sterile OT scrub suits for operating theatre staff.",
    image: "/images/products/ot_dresses.png",
    metaTitle: "OT Dresses | Operating Theatre Uniforms | Ganpati Lifecare",
    metaDescription: "Sterile and comfortable OT scrub suits and dresses for operating theatre staff. Premium hospital uniforms by Ganpati Lifecare.",
  },
  {
    id: "staff-uniforms",
    name: "Staff Uniforms",
    category: "uniforms",
    description: "Custom staff uniforms for healthcare facilities.",
    image: "/images/products/staff_uniforms.png",
    metaTitle: "Hospital Staff Uniforms | Ganpati Lifecare",
    metaDescription: "Custom healthcare staff uniforms for hospital personnel. Durable and easy to maintain uniforms supplied by Ganpati Lifecare.",
  },
  {
    id: "medical-disposables",
    name: "Medical Disposable Products",
    category: "essentials",
    description: "Single-use medical disposables for hospitals and clinics.",
    image: "/images/products/complete_product_collection_1779201240988.png",
    metaTitle: "Medical Disposable Products | Ganpati Lifecare",
    metaDescription: "Single-use medical disposable products for hospitals and clinics. Essential infection control supplies from Ganpati Lifecare.",
  },
  {
    id: "hospital-consumables",
    name: "Hospital Consumables",
    category: "essentials",
    description: "Essential hospital consumables at competitive prices.",
    image: "/images/products/hospital_uniform_display_1779200633810.png",
    metaTitle: "Hospital Consumables | Ganpati Lifecare",
    metaDescription: "Essential hospital consumables and daily medical supplies available at competitive bulk pricing from Ganpati Lifecare, Rajasthan.",
  },
];

export const WHY_CHOOSE_US = [
  {
    title: "Premium Quality Products",
    description: "Sourced and supplied with strict quality checks for healthcare settings.",
    icon: "shield",
  },
  {
    title: "Trusted Medical Supplier",
    description: "Reliable partner for hospitals and clinics across Rajasthan.",
    icon: "trust",
  },
  {
    title: "Affordable Pricing",
    description: "Competitive rates on bulk and regular orders.",
    icon: "price",
  },
  {
    title: "Fast Delivery",
    description: "Timely dispatch and delivery across North India.",
    icon: "delivery",
  },
  {
    title: "Customer Satisfaction",
    description: "Dedicated support for inquiries, quotes, and repeat orders.",
    icon: "satisfaction",
  },
  {
    title: "Professional Service",
    description: "Experienced team led by Dharampal Verma for personalized assistance.",
    icon: "service",
  },
  {
    title: "Wide Product Range",
    description: "Orthopedic, surgical, uniforms, and consumables under one roof.",
    icon: "range",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Excellent quality medical supplies and prompt dispatch. Ganpati Lifecare is our dependable supplier for orthopedic products.",
    author: "Healthcare Procurement",
    location: "Hanumangarh, Rajasthan",
  },
  {
    quote:
      "Trusted supplier for hospital uniforms, OT dresses, and cotton rolls. High product quality and honest pricing.",
    author: "Clinic Administration",
    location: "Shri Ganganagar, Rajasthan",
  },
  {
    quote:
      "Professional service and genuine products. Very smooth experience for bulk medical supplies.",
    author: "Orthopedic Centre",
    location: "North Rajasthan",
  },
] as const;

export const STATS = [
  { value: "Wide Range", label: "Products & Sizes Available" },
  { value: "Bulk Ready", label: "Hospital & Wholesale Supply" },
  { value: "Hanumangarh", label: "Based in Goluwala, Rajasthan" },
  { value: "Direct Support", label: "Led by Dharampal Varma" },
] as const;

export const CERTIFICATIONS = [
  "Quality Assured Supplies",
  "Healthcare Grade Materials",
  "Reliable Sourcing Network",
  "Strict Quality Checks",
] as const;

export const BRANDS = [
  "Orthocot",
  "GLC Orthopedic",
  "GLC Surgical",
  "GLC Uniforms",
  "GLC Consumables",
] as const;

export const FAQS = [
  {
    question: "What products does Ganpati Lifecare supply?",
    answer:
      "We supply orthopedic products (Orthocot cotton rolls, stockinet, traction kits, bandages), surgical dressing materials, hospital uniforms (doctor coats, nurse uniforms, OT dresses, staff uniforms), and healthcare consumables across Rajasthan.",
  },
  {
    question: "Does Ganpati Lifecare supply medical products in Hanumangarh?",
    answer:
      "Yes, our primary distribution hub is in Goluwala, Hanumangarh. We provide rapid dispatch of medical and surgical supplies to hospitals and clinics throughout the Hanumangarh district.",
  },
  {
    question: "Do you serve areas near Shri Ganganagar?",
    answer:
      "Absolutely. We are a trusted medical supplier for healthcare institutions across Sri Ganganagar and surrounding areas in North Rajasthan, delivering premium cotton rolls, dressings, and uniforms.",
  },
  {
    question: "Where is Ganpati Lifecare located?",
    answer:
      "We are headquartered in Goluwala, Hanumangarh, Rajasthan, India, and serve as a regional wholesale distributor for North Rajasthan.",
  },
  {
    question: "How can hospitals contact Ganpati Lifecare for supplies?",
    answer:
      "Hospitals and clinics can submit our online quote form, call +91 98282 32254, or WhatsApp us directly for immediate quotations on bulk medical supplies.",
  },
] as const;

export const FEATURED_CAROUSEL = [
  "Orthocot Cotton Roll",
  "Stockinet",
  "Skin Traction Kit",
  "Orthopedic Gauze Bandages",
  "Doctor Coats",
  "OT Dresses",
  "Surgical Dressing Materials",
  "Hospital Consumables",
] as const;
