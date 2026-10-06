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
  imageAlt: string;
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
    description: "White Rose Brand 100% natural, highly absorbent orthopedic cotton roll for cast padding and medical dressing.",
    image: "/images/products/real_orthocot_cotton_roll_15cm.webp",
    imageAlt: "Ganpati Lifecare Orthocot Cotton Roll - White Rose Brand 15cm x 6 Mtr",
    metaTitle: "Orthocot Cotton Roll Supplier Rajasthan | Ganpati Lifecare",
    metaDescription: "White Rose Brand Orthocot surgical cotton rolls for cast padding and wound care. Wholesale supply by Ganpati Lifecare, Mandi Goluwala, Hanumangarh, Rajasthan.",
  },
  {
    id: "stockinet",
    name: "Stockinet",
    category: "orthopedic",
    description: "Soft, breathable stockinet for casts and wound care.",
    image: "/images/products/stockinet.png",
    imageAlt: "Seamless circular rib-knit tubular orthopedic stockinet for skin protection",
    metaTitle: "Orthopedic Stockinet Supplier Rajasthan | Ganpati Lifecare",
    metaDescription: "Seamless rib-knit orthopedic stockinet for skin protection under casts and splints. Available for hospitals across Rajasthan from Ganpati Lifecare, Goluwala.",
  },
  {
    id: "skin-traction-kit",
    name: "Skin Traction Kit",
    category: "orthopedic",
    description: "Complete skin traction kits for orthopedic procedures.",
    image: "/images/products/skin-traction-kit.jpg",
    imageAlt: "Complete orthopedic skin traction kit with foam stirrup, cords, and spreader plate",
    metaTitle: "Skin Traction Kit Supplier in Rajasthan | Ganpati Lifecare",
    metaDescription: "Complete skin traction kits with foam padding, cords, and spreader plate for pre-operative fracture stabilization. Distributed by Ganpati Lifecare Rajasthan.",
  },
  {
    id: "orthopedic-gauze-bandages",
    name: "Orthopedic Gauze Bandages",
    category: "orthopedic",
    description: "High-absorbency gauze for orthopedic dressing applications.",
    image: "/images/products/orthopedic-gauze-bandages.jpg",
    imageAlt: "Woven medical cotton orthopedic gauze bandage rolls for surgical dressings",
    metaTitle: "Orthopedic Gauze Bandages Supplier | Ganpati Lifecare",
    metaDescription: "High-absorbency woven cotton orthopedic gauze bandages for surgical packing, dressing retention, and clinical wound care. Ganpati Lifecare, Mandi Goluwala.",
  },
  {
    id: "bandages",
    name: "Ortho Active Cotton Crepe Bandage",
    category: "surgical",
    description: "Ortho Active high-elasticity cotton crepe bandage with fast edges for joint support and compression dressing.",
    image: "/images/products/real_ortho_active_crepe_bandage.webp",
    imageAlt: "Ganpati Lifecare Ortho Active Cotton Crepe Bandage with fast edges",
    metaTitle: "Ortho Active Crepe Bandage Supplier | Ganpati Lifecare",
    metaDescription: "Ortho Active durable cotton crepe bandages with fast edges for joint support, compression dressing, and sprains. Wholesale medical supply by Ganpati Lifecare.",
  },
  {
    id: "sponge-pad",
    name: "Lap-Pad Cotton Cloth Sponge",
    category: "surgical",
    description: "Lap-Pad 8-ply 100% absorbent cotton cloth sponge pads for surgical, OT, and clinical dressing procedures.",
    image: "/images/products/real_lap_pad_sponge.webp",
    imageAlt: "Ganpati Lifecare Lap-Pad 8 Ply Cotton Cloth Sponge M - 25 Pc",
    metaTitle: "Lap-Pad Cotton Cloth Sponge Supplier | Ganpati Lifecare",
    metaDescription: "Lap-Pad 8-ply absorbent cotton cloth sponge pads with folded edges for operating theatre and clinical wound care. Supplied wholesale by Ganpati Lifecare.",
  },
  {
    id: "gamjee-roll",
    name: "Gamjee Roll",
    category: "surgical",
    description: "Highly absorbent 100% pure cotton Gamjee roll encased in soft gauze for heavy wound care and post-operative padding.",
    image: "/images/products/real_gamjee_roll.webp",
    imageAlt: "Ganpati Lifecare Gamjee Roll Highly Absorbent 100% Cotton",
    metaTitle: "Gamjee Roll Wholesale Supplier | Ganpati Lifecare",
    metaDescription: "Thick absorbent cotton wool encased in gauze sleeve for heavy wound exudate, burns, and post-operative care. Supplied wholesale by Ganpati Lifecare Rajasthan.",
  },
  {
    id: "surgical-dressing-materials",
    name: "Surgical Dressing Materials",
    category: "surgical",
    description: "Complete range of surgical dressing supplies.",
    image: "/images/products/surgical-dressing-materials.png",
    imageAlt: "Assortment of clinical surgical dressing materials and non-adherent wound pads",
    metaTitle: "Surgical Dressing Materials Supplier | Ganpati Lifecare",
    metaDescription: "Comprehensive surgical dressing materials, non-adherent pads, and rolls for hospitals and trauma centers. Wholesale supply by Ganpati Lifecare, Rajasthan.",
  },
  {
    id: "doctor-coats",
    name: "Doctor Coats",
    category: "uniforms",
    description: "Professional doctor coats in premium durable fabric.",
    image: "/images/products/doctor-coats.png",
    imageAlt: "Tailored poly-cotton white doctor lab coats with utility chest pockets",
    metaTitle: "Doctor Coats Wholesale Supplier | Ganpati Lifecare",
    metaDescription: "Durable, stain-resistant poly-cotton doctor coats with utility pockets for clinical consultations and hospital rounds. Supplied in bulk by Ganpati Lifecare.",
  },
  {
    id: "nurse-uniforms",
    name: "Nurse Uniforms",
    category: "uniforms",
    description: "Comfortable, durable nurse uniforms for hospitals.",
    image: "/images/products/nurse-uniforms.png",
    imageAlt: "Breathable ergonomic hospital nurse scrub uniforms in clinical colors",
    metaTitle: "Nurse Uniforms Wholesale Supplier | Ganpati Lifecare",
    metaDescription: "Lightweight, breathable, and ergonomic nurse uniforms and scrub sets for hospital shifts. Distributed in bulk across Rajasthan by Ganpati Lifecare, Goluwala.",
  },
  {
    id: "ot-dresses",
    name: "OT Dresses",
    category: "uniforms",
    description: "Sterile OT scrub suits for operating theatre staff.",
    image: "/images/products/ot-dresses.png",
    imageAlt: "Autoclavable low-linting surgical operating theatre scrub suits for OT staff",
    metaTitle: "OT Dresses Wholesale Supplier | Ganpati Lifecare",
    metaDescription: "Autoclavable, low-linting OT dresses and surgical scrub suits for operating rooms and surgical teams. Wholesale supply by Ganpati Lifecare, Mandi Goluwala.",
  },
  {
    id: "staff-uniforms",
    name: "Staff Uniforms",
    category: "uniforms",
    description: "Custom staff uniforms for healthcare facilities.",
    image: "/images/products/staff-uniforms.png",
    imageAlt: "Heavy-duty healthcare support staff and ward attendant uniforms",
    metaTitle: "Hospital Staff Uniforms Supplier | Ganpati Lifecare",
    metaDescription: "Heavy-duty, easy-to-maintain uniforms for hospital ward boys, maintenance, and support staff. Wholesale supply across Rajasthan by Ganpati Lifecare Goluwala.",
  },
  {
    id: "medical-disposables",
    name: "Medical Disposable Products",
    category: "essentials",
    description: "Single-use medical disposables for hospitals and clinics.",
    image: "/images/products/medical-disposables.png",
    imageAlt: "Single-use clinical medical disposables including masks, caps, and gloves",
    metaTitle: "Medical Disposables Supplier | Ganpati Lifecare",
    metaDescription: "Essential single-use medical disposables including masks, caps, shoe covers, and gloves for clinical infection control. Ganpati Lifecare, Mandi Goluwala.",
  },
  {
    id: "hospital-consumables",
    name: "Hospital Consumables",
    category: "essentials",
    description: "Essential hospital consumables at competitive prices.",
    image: "/images/products/hospital-consumables.png",
    imageAlt: "Routine hospital ward consumables and clinical treatment supply items",
    metaTitle: "Hospital Consumables Supplier | Ganpati Lifecare",
    metaDescription: "Everyday clinical consumables and hospital ward supplies available for wholesale institutional procurement from Ganpati Lifecare, Mandi Goluwala, Rajasthan.",
  },
];

export const WHY_CHOOSE_US = [
  {
    title: "Healthcare-Grade Products",
    description: "Supplies curated for hospital wards, trauma rooms, and outpatient clinics.",
    icon: "shield",
  },
  {
    title: "Established Regional Partner",
    description: "Reliable wholesale supplier for hospitals and clinics across North Rajasthan.",
    icon: "trust",
  },
  {
    title: "Wholesale Institutional Rates",
    description: "Direct carton pricing for routine and bulk clinical procurement.",
    icon: "price",
  },
  {
    title: "Prompt Regional Dispatch",
    description: "Direct road delivery across Hanumangarh, Sri Ganganagar, and neighbouring tehsils.",
    icon: "delivery",
  },
  {
    title: "Direct Order Coordination",
    description: "Personalized assistance and order coordination with Dharampal Verma.",
    icon: "service",
  },
  {
    title: "Comprehensive Catalog",
    description: "Orthopedic padding, surgical dressings, hospital uniforms, and consumables under one roof.",
    icon: "range",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Reliable dispatch and consistent medical supply quality for our routine orthopedic requirements in Hanumangarh district.",
    author: "Hospital Procurement Department",
    location: "Hanumangarh, Rajasthan",
  },
  {
    quote:
      "Dependable source for hospital uniforms, OT dresses, and cotton rolls with prompt road delivery to our clinic.",
    author: "Surgical Nursing Home Administration",
    location: "Sri Ganganagar, Rajasthan",
  },
  {
    quote:
      "Straightforward order coordination directly with Dharampal Verma for our clinical dressing materials and consumables.",
    author: "Orthopedic & Trauma Clinic",
    location: "North Rajasthan",
  },
] as const;

export const STATS = [
  { value: "Full Range", label: "Orthopedic & Surgical Supplies" },
  { value: "Wholesale", label: "Direct Hospital Carton Supply" },
  { value: "Mandi Goluwala", label: "Central Distribution Hub" },
  { value: "North Rajasthan", label: "Regional Healthcare Network" },
] as const;

export const CERTIFICATIONS = [
  "Clinical-Grade Supply Sourcing",
  "Autoclavable Surgical Textiles",
  "Institutional Bulk Packaging",
  "Direct Roadway Dispatch Network",
] as const;

export const BRANDS = [
  "White Rose Brand",
  "Orthocot",
  "Ortho Active",
  "GLC Orthopedic",
  "GLC Surgical",
  "GLC Uniforms",
  "GLC Consumables",
] as const;

export const FAQS = [
  {
    question: "Who is the primary orthopedic cotton roll supplier in Hanumangarh?",
    answer:
      "Ganpati Lifecare, managed by Dharampal Verma in Mandi Goluwala, Hanumangarh, is a leading regional manufacturer and wholesale supplier of premium White Rose Brand Orthocot medical cotton rolls, orthopedic stockinets, and surgical dressing products across North Rajasthan.",
  },
  {
    question: "What products does Ganpati Lifecare supply?",
    answer:
      "We supply White Rose Brand orthopedic products (Orthocot cotton rolls, tubular stockinets, skin traction kits, gauze bandages), surgical dressing supplies (Gamjee rolls, sponge pads, crepe bandages), hospital uniforms (doctor coats, nurse scrubs, OT dresses), and general clinical consumables.",
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
      "Our central distribution facility is located at Main Road, Mandi Goluwala - 335802, Distt. Hanumangarh (Raj.), India, providing rapid road transit access across North Rajasthan.",
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
      "Healthcare facilities can submit our online inquiry form, call +91 98282 32254, or message Dharampal Verma directly on WhatsApp for prompt product specifications and pricing.",
  },
] as const;

export const FEATURED_CAROUSEL = [
  "Orthocot Cotton Roll",
  "Ortho Active Crepe Bandage",
  "Lap-Pad Sponge",
  "Gamjee Roll",
  "Stockinet",
  "Skin Traction Kit",
  "Doctor Coats",
  "OT Dresses",
  "Surgical Dressing Materials",
  "Hospital Consumables",
] as const;
