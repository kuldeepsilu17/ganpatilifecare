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
    metaTitle: "Orthocot Cotton Roll | Surgical Cotton Roll Supplier | Ganpati Lifecare",
    metaDescription: "Orthocot surgical cotton roll for hospital cast padding, clinical absorbency, and wound management. Supplied in bulk by Ganpati Lifecare, Goluwala, Hanumangarh.",
  },
  {
    id: "stockinet",
    name: "Stockinet",
    category: "orthopedic",
    description: "Soft, breathable stockinet for casts and wound care.",
    image: "/images/products/stockinet.png",
    metaTitle: "Orthopedic Stockinet | Tubular Cast Bandage Supplier | Ganpati Lifecare",
    metaDescription: "Seamless rib-knit orthopedic stockinet for skin protection under casts and splints. Available for hospitals across Rajasthan from Ganpati Lifecare.",
  },
  {
    id: "skin-traction-kit",
    name: "Skin Traction Kit",
    category: "orthopedic",
    description: "Complete skin traction kits for orthopedic procedures.",
    image: "/images/products/skin_traction_kit.jpg",
    metaTitle: "Skin Traction Kit | Orthopedic Traction Assembly | Ganpati Lifecare",
    metaDescription: "Complete skin traction kits with foam padding, cords, and spreader plate for pre-operative fracture stabilization. Distributed by Ganpati Lifecare.",
  },
  {
    id: "orthopedic-gauze-bandages",
    name: "Orthopedic Gauze Bandages",
    category: "orthopedic",
    description: "High-absorbency gauze for orthopedic dressing applications.",
    image: "/images/products/orthopedic_gauze_bandages.jpg",
    metaTitle: "Orthopedic Gauze Bandages | Surgical Cotton Gauze | Ganpati Lifecare",
    metaDescription: "High-absorbency woven cotton orthopedic gauze bandages for surgical packing, dressing retention, and clinical wound care. Ganpati Lifecare, Rajasthan.",
  },
  {
    id: "bandages",
    name: "Bandages",
    category: "surgical",
    description: "Elastic and crepe bandages in multiple sizes.",
    image: "/images/products/medical_bandage_rolls_1779200753456.png",
    metaTitle: "Medical Elastic & Crepe Bandages | Compression Rolls | Ganpati Lifecare",
    metaDescription: "Durable elastic and crepe bandages for joint support, compression dressing, and sprain treatment. Wholesale medical supplies by Ganpati Lifecare.",
  },
  {
    id: "sponge-pad",
    name: "Sponge Pad",
    category: "surgical",
    description: "Sterile sponge pads for surgical and OT procedures.",
    image: "/images/products/medical_sponge_stockinet_1779200845560.png",
    metaTitle: "Surgical Sponge Pads | Sterile Gauze Swabs Supplier | Ganpati Lifecare",
    metaDescription: "High-density absorbent surgical sponge pads with folded edges for operating theatre and clinical wound care. Ganpati Lifecare, Hanumangarh.",
  },
  {
    id: "gamjee-roll",
    name: "Gamjee Roll",
    category: "surgical",
    description: "Absorbent gamjee rolls for post-operative care.",
    image: "/images/products/surgical_cotton_showcase_1779200486555.png",
    metaTitle: "Gamjee Roll | Absorbent Surgical Dressing Padding | Ganpati Lifecare",
    metaDescription: "Thick absorbent cotton wool encased in gauze sleeve for heavy wound exudates, burns, and post-operative care. Ganpati Lifecare, Rajasthan.",
  },
  {
    id: "surgical-dressing-materials",
    name: "Surgical Dressing Materials",
    category: "surgical",
    description: "Complete range of surgical dressing supplies.",
    image: "/images/products/complete_product_collection_1779201240988.png",
    metaTitle: "Surgical Dressing Materials | Clinical Wound Dressing Supply | Ganpati Lifecare",
    metaDescription: "Comprehensive surgical dressing materials, non-adherent pads, and rolls for hospitals and trauma centers. Ganpati Lifecare, Goluwala.",
  },
  {
    id: "doctor-coats",
    name: "Doctor Coats",
    category: "uniforms",
    description: "Professional doctor coats in premium durable fabric.",
    image: "/images/products/doctor_apparel.png",
    metaTitle: "Doctor Coats | Medical Lab & Clinical Apparel | Ganpati Lifecare",
    metaDescription: "Durable, stain-resistant poly-cotton doctor coats with utility pockets for clinical consultations and hospital rounds. Supplied by Ganpati Lifecare.",
  },
  {
    id: "nurse-uniforms",
    name: "Nurse Uniforms",
    category: "uniforms",
    description: "Comfortable, durable nurse uniforms for hospitals.",
    image: "/images/products/nurse_uniforms.png",
    metaTitle: "Nurse Uniforms | Hospital Nursing Scrub Suits | Ganpati Lifecare",
    metaDescription: "Lightweight, breathable, and ergonomic nurse uniforms and scrub sets for hospital shifts. Distributed by Ganpati Lifecare, Rajasthan.",
  },
  {
    id: "ot-dresses",
    name: "OT Dresses",
    category: "uniforms",
    description: "Sterile OT scrub suits for operating theatre staff.",
    image: "/images/products/ot_dresses.png",
    metaTitle: "OT Dresses | Surgical Operating Theatre Scrubs | Ganpati Lifecare",
    metaDescription: "Autoclavable, low-linting OT dresses and surgical scrub suits for operating rooms and surgical teams. Ganpati Lifecare, Hanumangarh.",
  },
  {
    id: "staff-uniforms",
    name: "Staff Uniforms",
    category: "uniforms",
    description: "Custom staff uniforms for healthcare facilities.",
    image: "/images/products/staff_uniforms.png",
    metaTitle: "Hospital Staff Uniforms | Support Personnel Apparel | Ganpati Lifecare",
    metaDescription: "Heavy-duty, easy-to-maintain uniforms for hospital ward boys, maintenance, and support staff. Wholesale supply by Ganpati Lifecare.",
  },
  {
    id: "medical-disposables",
    name: "Medical Disposable Products",
    category: "essentials",
    description: "Single-use medical disposables for hospitals and clinics.",
    image: "/images/products/complete_product_collection_1779201240988.png",
    metaTitle: "Medical Disposables | Single-Use Healthcare Products | Ganpati Lifecare",
    metaDescription: "Essential single-use medical disposables including masks, caps, shoe covers, and gloves for clinical infection control. Ganpati Lifecare, Rajasthan.",
  },
  {
    id: "hospital-consumables",
    name: "Hospital Consumables",
    category: "essentials",
    description: "Essential hospital consumables at competitive prices.",
    image: "/images/products/hospital_uniform_display_1779200633810.png",
    metaTitle: "Hospital Consumables | Daily Medical & Ward Supplies | Ganpati Lifecare",
    metaDescription: "Everyday clinical consumables and hospital ward supplies available for wholesale institutional procurement from Ganpati Lifecare, Goluwala.",
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
  { value: "Wide Range", label: "Orthopedic & Surgical Supplies" },
  { value: "Bulk Ready", label: "Hospital Wholesale Supply" },
  { value: "Goluwala", label: "Based in Hanumangarh, Rajasthan" },
  { value: "North Rajasthan", label: "Serving Regional Healthcare" },
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
    question: "Who is the primary orthopedic cotton roll supplier in Hanumangarh?",
    answer:
      "Ganpati Lifecare, owned by Dharampal Verma in Goluwala, Hanumangarh, is a leading regional wholesale supplier of premium Orthocot medical cotton rolls, orthopedic stockinets, and surgical dressing products across North Rajasthan.",
  },
  {
    question: "What products does Ganpati Lifecare supply?",
    answer:
      "We supply orthopedic products (Orthocot cotton rolls, tubular stockinets, skin traction kits, gauze bandages), surgical dressing supplies (Gamjee rolls, sponge pads, crepe bandages), hospital uniforms (doctor coats, nurse scrubs, OT dresses), and general clinical consumables.",
  },
  {
    question: "What is Orthocot cotton roll used for?",
    answer:
      "Orthocot cotton rolls are 100% pure, hypoallergenic medical cotton rolls used primarily as protective cast padding beneath synthetic or plaster of Paris casts to prevent pressure sores, friction, and skin maceration during bone fracture healing.",
  },
  {
    question: "What is orthopedic stockinet used for in plaster casting?",
    answer:
      "Orthopedic stockinet is a seamless, circular rib-knit tubular cotton sleeve worn directly against the patient's skin under cast padding. It wicks away perspiration and prevents cast roughness from irritating sensitive dermal tissue.",
  },
  {
    question: "What is a skin traction kit and when is it required?",
    answer:
      "A skin traction kit is a pre-assembled orthopedic kit with high-friction foam, spreader plates, and extension cords used in emergency trauma care to apply continuous longitudinal traction for stabilizing lower extremity fractures before surgery.",
  },
  {
    question: "Does Ganpati Lifecare deliver supplies to Sri Ganganagar and surrounding areas?",
    answer:
      "Yes, we provide routine wholesale dispatch to private hospitals, clinics, and trauma centers across Sri Ganganagar, Suratgarh, Bikaner, Nohar, Rawatsar, Pilibanga, Sangaria, Bhadra, and throughout Rajasthan.",
  },
  {
    question: "Do you offer bulk and wholesale pricing for hospitals?",
    answer:
      "Yes, Ganpati Lifecare specializes in institutional B2B procurement, offering direct carton-level wholesale pricing with transparent quotes for nursing homes, multi-specialty hospitals, and regional medical distributors.",
  },
  {
    question: "Where is Ganpati Lifecare located?",
    answer:
      "Our central distribution facility is located in Goluwala, Hanumangarh, Rajasthan 335512, India, providing rapid road transit access across North Rajasthan.",
  },
  {
    question: "How fast is delivery across Hanumangarh and Rajasthan?",
    answer:
      "Local orders within Hanumangarh and surrounding tehsils are dispatched for same-day or next-day delivery. Regional shipments across Rajasthan are coordinated via trusted road transport within 24 to 48 hours.",
  },
  {
    question: "Do you supply customized doctor coats and hospital uniforms?",
    answer:
      "Yes, we supply durable poly-cotton doctor coats, nurse scrub suits, OT dresses, and hospital staff uniforms with options for institutional sizing and departmental color coding.",
  },
  {
    question: "What hospital consumables and disposables do you provide?",
    answer:
      "We supply essential clinical consumables including surgical face masks, non-skid shoe covers, bouffant caps, examination gloves, sterile dressing pads, medical tapes, and general ward disposables.",
  },
  {
    question: "How can hospitals and clinics request an official quotation?",
    answer:
      "Healthcare facilities can submit our online inquiry form, call +91 98282 32254, or message owner Dharampal Verma directly on WhatsApp for prompt product specifications and pricing.",
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
