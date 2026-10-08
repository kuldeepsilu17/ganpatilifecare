export interface BrandPageData {
  slug: string;
  brandName: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  tldr: string;
  overview: string;
  coreProducts: { name: string; url: string; desc: string }[];
  keyFeatures: string[];
  specTable: { label: string; value: string }[];
  faqs: { question: string; answer: string }[];
}

export const BRANDS_DATA: BrandPageData[] = [
  {
    slug: "white-rose",
    brandName: "White Rose Brand",
    tagline: "Hospital-Grade Orthopedic & Surgical Dressing Products",
    metaTitle: "White Rose Brand Medical Supplies | Ganpati Lifecare",
    metaDescription: "White Rose Brand orthopedic cotton rolls, cast padding & surgical dressings. Direct wholesale distribution in Rajasthan by Ganpati Lifecare, Hanumangarh.",
    h1: "White Rose Brand Orthopedic & Surgical Dressing Supplies",
    tldr: "White Rose Brand is an established healthcare brand manufactured and distributed by Ganpati Lifecare (GLC) in Mandi Goluwala, Hanumangarh, Rajasthan (PIN 335802). The brand specializes in high-absorbency surgical cotton rolls, Orthocot POP cast padding, stockinets, and surgical dressing materials.",
    overview: "White Rose Brand supplies hospital surgical wards, orthopedic trauma clinics, and nursing homes across Rajasthan with reliable, clinical-grade medical cotton and dressing products. Managed by Dharampal Verma, every batch undergoes thorough quality inspections for uniform density, softness, and patient comfort.",
    coreProducts: [
      {
        name: "Orthocot Cotton Roll",
        url: "/products/orthocot-cotton-roll",
        desc: "100% natural, non-matting cast padding cotton roll for fracture splints and POP casts.",
      },
      {
        name: "Orthopedic Gauze Bandages",
        url: "/products/orthopedic-gauze-bandages",
        desc: "High-absorbency woven surgical gauze bandage rolls for sterile wound dressings.",
      },
      {
        name: "Orthopedic Stockinet",
        url: "/products/stockinet",
        desc: "Seamless circular rib-knit tubular cotton undercast sleeve.",
      },
      {
        name: "Gamjee Roll",
        url: "/products/gamjee-roll",
        desc: "Absorbent cotton wool core encased in medical gauze for post-operative drainage.",
      },
    ],
    keyFeatures: [
      "100% pure combed medical-grade cotton fibers free from harsh chemical bleaching.",
      "Engineered cast padding resilience that resists bunching under body sweat.",
      "Strict quality control with verified GST invoicing and institutional batch lot numbers.",
      "Direct warehouse dispatch from Mandi Goluwala across Hanumangarh, Sri Ganganagar, and Rajasthan.",
    ],
    specTable: [
      { label: "Brand Name", value: "White Rose Brand" },
      { label: "Primary Manufacturer & Wholesaler", value: "Ganpati Lifecare (GLC), Mandi Goluwala, Rajasthan" },
      { label: "Product Portfolio", value: "Ortho Cotton Rolls, Gauze Dressing, Cast Padding, Stockinet" },
      { label: "Primary User Base", value: "Hospitals, Orthopedic Clinics, Nursing Homes, Surgical Dealers" },
      { label: "Dispatch Center", value: "Main Road, Mandi Goluwala - 335802, Distt. Hanumangarh" },
    ],
    faqs: [
      {
        question: "Who manufactures and distributes White Rose Brand in Rajasthan?",
        answer: "Ganpati Lifecare, managed by Dharampal Verma in Mandi Goluwala, Hanumangarh (PIN 335802), is the primary regional manufacturer and wholesale distributor of White Rose Brand products."
      },
      {
        question: "What products are available under White Rose Brand?",
        answer: "The brand encompasses Orthocot cast padding cotton rolls, surgical gauze bandages, Gamjee rolls, and orthopedic dressing textiles."
      },
      {
        question: "How can hospitals place wholesale orders for White Rose Brand products?",
        answer: "Healthcare facilities can contact Ganpati Lifecare directly via WhatsApp at +91 98282 32254 or submit a request on our website for direct factory-level pricing."
      }
    ]
  },
  {
    slug: "orthocot",
    brandName: "Orthocot",
    tagline: "Specialized 100% Pure Cast Padding Cotton Roll",
    metaTitle: "Orthocot Cast Padding Cotton Roll | Ganpati Lifecare",
    metaDescription: "White Rose Brand Orthocot orthopedic cotton rolls for cast padding. Hypoallergenic, non-matting rolls from Hanumangarh, Rajasthan by Ganpati Lifecare.",
    h1: "Orthocot Cotton Roll — Orthopedic Cast Padding",
    tldr: "Orthocot is a specialized 100% pure medical cotton roll brand engineered exclusively for orthopedic cast padding and fracture immobilization. Manufactured in Mandi Goluwala, Hanumangarh by Ganpati Lifecare, Orthocot cushions patient limbs beneath plaster of Paris (POP) and fiberglass casts without clumping.",
    overview: "Unlike standard absorbent cotton, Orthocot cotton rolls are formulated to maintain uniform loft and springiness when exposed to moisture and perspiration. This crucial clinical property prevents the formation of hard fiber knots and pressure ridges, safeguarding patient skin from pressure necrosis during the 4 to 6-week casting period.",
    coreProducts: [
      {
        name: "Orthocot Cotton Roll (15 cm)",
        url: "/products/orthocot-cotton-roll",
        desc: "Wide-format orthopedic cast padding for adult thigh, knee, and leg casts.",
      },
      {
        name: "Orthocot Soft Cotton Roll (10 cm)",
        url: "/products/orthocot-cotton-roll",
        desc: "Standard-width cast padding for adult arm, wrist, and pediatric casting.",
      },
      {
        name: "Orthopedic Stockinet",
        url: "/products/stockinet",
        desc: "First-layer undercast knit sleeve used in combination with Orthocot padding.",
      },
    ],
    keyFeatures: [
      "Feathered edge construction enables seamless overlapping without ridges.",
      "Hypoallergenic combed cotton fibers gentle on sensitive and pediatric skin.",
      "Provides vital thermal insulation against heat released during POP plaster setting.",
      "Available in master carton quantities for hospital orthopedics departments.",
    ],
    specTable: [
      { label: "Brand Name", value: "Orthocot (White Rose Brand)" },
      { label: "Material Composition", value: "100% Pure Bleached Cotton (Unmedicated)" },
      { label: "Standard Sizes", value: "10 cm × 3 m, 15 cm × 3 m (Stretched)" },
      { label: "Packaging", value: "Individually wrapped rolls packed in protective master cartons" },
      { label: "Primary Application", value: "Under-cast cushioning for POP and synthetic casts" },
      { label: "Manufacturer", value: "Ganpati Lifecare, Mandi Goluwala, Hanumangarh, Rajasthan 335802" },
    ],
    faqs: [
      {
        question: "Why is Orthocot preferred over ordinary cotton rolls for POP casts?",
        answer: "Ordinary absorbent cotton absorbs perspiration and mats into hard lumps under cast pressure, causing painful skin blisters and sores. Orthocot fibers retain their loft and breathability, ensuring continuous skin protection."
      },
      {
        question: "What are the standard roll widths of Orthocot?",
        answer: "Orthocot is supplied in 10 cm and 15 cm widths with a standard 3-meter stretched roll length."
      }
    ]
  },
  {
    slug: "ortho-active",
    brandName: "Ortho Active",
    tagline: "High-Elasticity Cotton Crepe Bandages with Fast Edges",
    metaTitle: "Ortho Active Cotton Crepe Bandage | Ganpati Lifecare",
    metaDescription: "Ortho Active high-elasticity cotton crepe bandages for joint support & compression. Fast edges, washable, wholesale supply by Ganpati Lifecare, Rajasthan.",
    h1: "Ortho Active Cotton Crepe Bandages — Compression & Support",
    tldr: "Ortho Active is a premier surgical compression bandage brand by Ganpati Lifecare in Mandi Goluwala, Hanumangarh (PIN 335802). Woven from premium cotton with elastic warp yarns, Ortho Active crepe bandages provide controlled, uniform compression for sprains, joint strain, and post-operative support.",
    overview: "Ortho Active crepe bandages feature non-fraying fast edges and superior elastic recovery. They conform smoothly around challenging joint contours such as ankles, knees, wrists, and elbows without slipping or cutting into circulation, making them a hospital favorite for orthopedic recovery.",
    coreProducts: [
      {
        name: "Ortho Active Cotton Crepe Bandage",
        url: "/products/bandages",
        desc: "Fast-edged, high-stretch compression bandage for sprains and joint immobilization.",
      },
      {
        name: "Skin Traction Kit",
        url: "/products/skin-traction-kit",
        desc: "Includes retaining crepe bandage for secure traction strapping.",
      },
      {
        name: "Lap-Pad Sponge Pad",
        url: "/products/sponge-pad",
        desc: "Absorbent surgical dressing sponge often secured with Ortho Active bandages.",
      },
    ],
    keyFeatures: [
      "Fast edges prevent fraying and loose threads during repeated application.",
      "High cotton content provides breathable skin contact without sweating.",
      "Washable in lukewarm soapy water to restore full elasticity for multi-week use.",
      "Supplied with secure retention clips in protective individual packaging.",
    ],
    specTable: [
      { label: "Brand Name", value: "Ortho Active" },
      { label: "Fabric Material", value: "High-Grade Cotton with Elastic Warp Weave" },
      { label: "Available Widths", value: "6 cm, 8 cm, 10 cm, 15 cm" },
      { label: "Stretched Length", value: "4 meters standard" },
      { label: "Edge Finish", value: "Woven Fast Edges (Non-Fraying)" },
      { label: "Wholesale Hub", value: "Ganpati Lifecare, Mandi Goluwala, Hanumangarh, Rajasthan" },
    ],
    faqs: [
      {
        question: "Can Ortho Active crepe bandages be washed and reused?",
        answer: "Yes. Wash gently in lukewarm soapy water without wringing or ironing, and lay flat to dry to restore full compression elasticity."
      },
      {
        question: "What widths are recommended for ankle sprains?",
        answer: "A 7.5 cm or 8 cm width is typically ideal for adult ankle and wrist support, while 10 cm and 15 cm widths are used for knees and thighs."
      }
    ]
  },
  {
    slug: "lap-pad",
    brandName: "Lap-Pad",
    tagline: "8-Ply 100% Cotton Cloth Surgical Sponge Pads",
    metaTitle: "Lap-Pad Cotton Cloth Surgical Sponge | Ganpati Lifecare",
    metaDescription: "Lap-Pad 8-ply absorbent cotton cloth sponge pads for operating theatre & surgical dressing. Wholesale supply by Ganpati Lifecare, Hanumangarh, Rajasthan.",
    h1: "Lap-Pad 8-Ply Cotton Cloth Surgical Sponges",
    tldr: "Lap-Pad is a dedicated surgical sponge brand manufactured from 100% absorbent cotton cloth. Distributed by Ganpati Lifecare in Mandi Goluwala, Hanumangarh (PIN 335802), Lap-Pad multi-layered sponge pads provide rapid fluid absorption and wound packing for operating theatres and clinical dressing rooms.",
    overview: "Designed for demanding hospital surgical environments, Lap-Pad sponges feature 8-ply pre-washed absorbent cotton with securely tucked, folded edges that prevent lint or loose fibers from entering surgical cavities. They are widely used in general surgery, orthopedics, gynecology, and emergency trauma care.",
    coreProducts: [
      {
        name: "Lap-Pad Cotton Cloth Sponge (25 Pc)",
        url: "/products/sponge-pad",
        desc: "8-ply pre-washed cotton cloth surgical laparotomy sponge pads.",
      },
      {
        name: "Gamjee Roll",
        url: "/products/gamjee-roll",
        desc: "Secondary heavy absorbent dressing used in surgical wound management.",
      },
      {
        name: "Surgical Dressing Materials",
        url: "/products/surgical-dressing-materials",
        desc: "Comprehensive array of clinical pads and surgical textiles.",
      },
    ],
    keyFeatures: [
      "8-ply multi-layer construction delivers superior capillary fluid holding capacity.",
      "Pre-washed cotton cloth ensures immediate, high-rate absorption without delay.",
      "Folded edges prevent loose threads and fiber shedding in operating theatres.",
      "Autoclavable and available in hospital-ready institutional packs.",
    ],
    specTable: [
      { label: "Brand Name", value: "Lap-Pad" },
      { label: "Material Composition", value: "100% Pre-Washed Bleached Cotton Cloth" },
      { label: "Ply / Layers", value: "8-Ply Folded Construction" },
      { label: "Standard Dimensions", value: "Medium (25 cm × 25 cm), Large (30 cm × 30 cm)" },
      { label: "Pack Quantity", value: "25 pieces per institutional poly pack" },
      { label: "Distributor Hub", value: "Ganpati Lifecare, Mandi Goluwala, Hanumangarh 335802" },
    ],
    faqs: [
      {
        question: "Why are Lap-Pad surgical sponges pre-washed?",
        answer: "Pre-washing eliminates manufacturing sizing, softens cotton fibers, and drastically increases the instantaneous fluid absorbency rate required during surgery."
      },
      {
        question: "Where can clinics order Lap-Pad sponges in bulk in Rajasthan?",
        answer: "Ganpati Lifecare supplies Lap-Pad sponges in bulk directly to hospitals and surgical distributors across Hanumangarh, Sri Ganganagar, and North Rajasthan."
      }
    ]
  },
];
