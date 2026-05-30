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
    image: "/images/products/surgical_cotton_showcase_1779200486555.png",
  },
  {
    id: "stockinet",
    name: "Stockinet",
    category: "orthopedic",
    description: "Soft, breathable stockinet for casts and wound care.",
    image: "/images/products/medical_sponge_stockinet_1779200845560.png",
  },
  {
    id: "skin-traction-kit",
    name: "Skin Traction Kit",
    category: "orthopedic",
    description: "Complete skin traction kits for orthopedic procedures.",
    image: "/images/products/complete_product_collection_1779201240988.png",
  },
  {
    id: "orthopedic-gauze",
    name: "Orthopedic Gauze",
    category: "orthopedic",
    description: "High-absorbency gauze for orthopedic dressing applications.",
    image: "/images/products/complete_product_collection_1779201240988.png",
  },
  {
    id: "bandages",
    name: "Bandages",
    category: "orthopedic",
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
    image: "/images/products/medical_bandage_rolls_1779200753456.png",
  },
  {
    id: "surgical-dressing",
    name: "Surgical Dressing Materials",
    category: "surgical",
    description: "Complete range of surgical dressing supplies.",
    image: "/images/products/complete_product_collection_1779201240988.png",
  },
  {
    id: "doctor-coats",
    name: "Doctor Coats",
    category: "uniforms",
    description: "Professional doctor coats in premium fabric.",
    image: "/images/products/hospital_uniform_display_1779200633810.png",
  },
  {
    id: "nurse-uniforms",
    name: "Nurse Uniforms",
    category: "uniforms",
    description: "Comfortable, durable nurse uniforms for hospitals.",
    image: "/images/products/hospital_uniform_display_1779200633810.png",
  },
  {
    id: "ot-dresses",
    name: "OT Dresses",
    category: "uniforms",
    description: "Sterile OT dresses for operating theatre staff.",
    image: "/images/products/hospital_uniform_display_1779200633810.png",
  },
  {
    id: "staff-uniforms",
    name: "Staff Uniforms",
    category: "uniforms",
    description: "Custom staff uniforms for healthcare facilities.",
    image: "/images/products/hospital_uniform_display_1779200633810.png",
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
    image: "/images/products/complete_product_collection_1779201240988.png",
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
    description: "Experienced team led by Dharampal for personalized assistance.",
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
      "Excellent quality medical supplies and quick response. GLC is our go-to supplier.",
    author: "Hospital Procurement Manager",
    location: "Hanumangarh",
  },
  {
    quote:
      "Trusted supplier for hospital uniforms and orthopedic products. Highly recommended.",
    author: "Clinic Owner",
    location: "Rajasthan",
  },
  {
    quote:
      "Professional service and genuine products. Great experience for bulk orders.",
    author: "Orthopedic Centre",
    location: "North India",
  },
] as const;

export const STATS = [
  { value: "500+", label: "Products Supplied" },
  { value: "100+", label: "Happy Clients" },
  { value: "10+", label: "Years Experience" },
  { value: "24/7", label: "Support Available" },
] as const;

export const CERTIFICATIONS = [
  "Quality Assured Supplies",
  "ISO Compliant Partners",
  "Healthcare Grade Materials",
  "Verified Distributor Network",
] as const;

export const BRANDS = [
  "Orthocot",
  "Premium Medical",
  "Surgical Pro",
  "Hospital Wear",
  "CarePlus",
  "MediTrust",
] as const;

export const FAQS = [
  {
    question: "What products does Ganpati Lifecare supply?",
    answer:
      "We supply orthopedic products (cotton rolls, stockinet, traction kits, bandages), surgical materials, hospital uniforms (doctor coats, nurse uniforms, OT dresses), and healthcare consumables across Rajasthan.",
  },
  {
    question: "Do you offer bulk order discounts?",
    answer:
      "Yes. Contact us via phone, WhatsApp, or the inquiry form for competitive bulk pricing on hospital and clinic orders.",
  },
  {
    question: "Which areas do you deliver to?",
    answer:
      "We serve Goluwala, Hanumangarh, Rajasthan, and deliver across North India including major cities in Rajasthan and neighboring states.",
  },
  {
    question: "How can I request a quote?",
    answer:
      "Call +91 98282 32254 or +91 94600 95250, WhatsApp us, or fill out the contact form with your product list and quantity.",
  },
  {
    question: "Are your products suitable for hospitals?",
    answer:
      "Absolutely. Our products meet healthcare-grade standards for hospitals, clinics, orthopedic centres, and surgical facilities.",
  },
] as const;

export const FEATURED_CAROUSEL = [
  "Orthocot Cotton Roll",
  "Stockinet",
  "Skin Traction Kit",
  "Doctor Coats",
  "OT Dresses",
  "Surgical Dressing Materials",
] as const;
