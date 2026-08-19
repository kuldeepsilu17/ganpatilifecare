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
  },
  {
    id: "stockinet",
    name: "Stockinet",
    category: "orthopedic",
    description: "Soft, breathable stockinet for casts and wound care.",
    image: "/images/products/stockinet.png",
  },
  {
    id: "skin-traction-kit",
    name: "Skin Traction Kit",
    category: "orthopedic",
    description: "Complete skin traction kits for orthopedic procedures.",
    image: "/images/products/skin_traction_kit.jpg",
  },
  {
    id: "orthopedic-gauze-bandages",
    name: "Orthopedic Gauze Bandages",
    category: "orthopedic",
    description: "High-absorbency gauze for orthopedic dressing applications.",
    image: "/images/products/orthopedic_gauze_bandages.jpg",
  },
  {
    id: "bandages",
    name: "Bandages",
    category: "surgical",
    description: "Elastic and crepe bandages in multiple sizes.",
    image: "/images/products/medical_bandage_rolls_1779200753456.png",
  },
  {
    id: "sponge-pad",
    name: "Sponge Pad",
    category: "surgical",
    description: "Sterile sponge pads for surgical and OT procedures.",
    image: "/images/products/medical_sponge_stockinet_1779200845560.png",
  },
  {
    id: "gamjee-roll",
    name: "Gamjee Roll",
    category: "surgical",
    description: "Absorbent gamjee rolls for post-operative care.",
    image: "/images/products/surgical_cotton_showcase_1779200486555.png",
  },
  {
    id: "surgical-dressing-materials",
    name: "Surgical Dressing Materials",
    category: "surgical",
    description: "Complete range of surgical dressing supplies.",
    image: "/images/products/complete_product_collection_1779201240988.png",
  },
  {
    id: "doctor-coats",
    name: "Doctor Coats",
    category: "uniforms",
    description: "Professional doctor coats in premium durable fabric.",
    image: "/images/products/doctor_apparel.png",
  },
  {
    id: "nurse-uniforms",
    name: "Nurse Uniforms",
    category: "uniforms",
    description: "Comfortable, durable nurse uniforms for hospitals.",
    image: "/images/products/nurse_uniforms.png",
  },
  {
    id: "ot-dresses",
    name: "OT Dresses",
    category: "uniforms",
    description: "Sterile OT scrub suits for operating theatre staff.",
    image: "/images/products/ot_dresses.png",
  },
  {
    id: "staff-uniforms",
    name: "Staff Uniforms",
    category: "uniforms",
    description: "Custom staff uniforms for healthcare facilities.",
    image: "/images/products/staff_uniforms.png",
  },
  {
    id: "medical-disposables",
    name: "Medical Disposable Products",
    category: "essentials",
    description: "Single-use medical disposables for hospitals and clinics.",
    image: "/images/products/complete_product_collection_1779201240988.png",
  },
  {
    id: "hospital-consumables",
    name: "Hospital Consumables",
    category: "essentials",
    description: "Essential hospital consumables at competitive prices.",
    image: "/images/products/hospital_uniform_display_1779200633810.png",
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
    description: "Experienced team led by Dharampal Varma for personalized assistance.",
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
    location: "Rajasthan",
  },
  {
    quote:
      "Professional service and genuine products. Very smooth experience for bulk medical supplies.",
    author: "Orthopedic Centre",
    location: "North India",
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
    question: "Do you offer bulk order discounts?",
    answer:
      "Yes. Contact Dharampal Varma via phone, WhatsApp (+91 98282 32254), or our quotation form for competitive wholesale pricing.",
  },
  {
    question: "Which areas do you deliver to?",
    answer:
      "We are based in Goluwala, Hanumangarh, Rajasthan, and deliver to hospitals, clinics, and distributors across Rajasthan and North India.",
  },
  {
    question: "How can I request a quote?",
    answer:
      "You can submit our online quote form, call +91 98282 32254 / +91 94600 95250, or WhatsApp us directly for an immediate quotation.",
  },
  {
    question: "Are your products suitable for hospitals and clinics?",
    answer:
      "Yes. All our products meet healthcare-grade standards for hospitals, private clinics, nursing homes, and orthopedic facilities.",
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
