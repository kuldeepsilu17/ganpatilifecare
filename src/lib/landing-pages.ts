export interface LandingPageData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  tldr: string;
  intro: string;
  specTable: { label: string; value: string }[];
  keyBenefits: string[];
  buyingGuide: string[];
  targetAudience: string[];
  faqs: { question: string; answer: string }[];
  primaryProductUrl: string;
  primaryProductName: string;
}

export const LANDING_PAGES: LandingPageData[] = [
  {
    slug: "gamjee-roll-supplier-rajasthan",
    metaTitle: "Gamjee Roll Supplier in Rajasthan – Wholesale | Ganpati",
    metaDescription: "Direct manufacturer & wholesale supplier of surgical Gamjee Rolls in Rajasthan. High absorbency, premium gauze wrapping, Hanumangarh dispatch by Ganpati.",
    h1: "Gamjee Roll Wholesale Supplier & Manufacturer in Rajasthan",
    eyebrow: "Surgical Dressings Wholesale",
    tldr: "Ganpati Lifecare (GLC), based in Mandi Goluwala, Hanumangarh, Rajasthan, is a leading manufacturer and wholesale supplier of surgical Gamjee Rolls. Designed for heavy wound exudate absorption and post-operative surgical padding, our Gamjee rolls feature a 100% absorbent cotton core enveloped in hospital-grade surgical gauze.",
    intro: "Healthcare facilities across Rajasthan—including private hospitals, trauma centres, nursing homes, and surgical clinics in Hanumangarh, Sri Ganganagar, Suratgarh, and Bikaner—rely on Ganpati Lifecare for consistent, bulk deliveries of premium surgical dressings.",
    specTable: [
      { label: "Product Type", value: "Surgical Absorbent Gamjee Roll" },
      { label: "Core Material", value: "100% Bleached Absorbent Surgical Cotton" },
      { label: "Outer Layer", value: "Absorbent Woven Surgical Gauze Envelope" },
      { label: "Standard Sizes", value: "10 cm × 3 m, 15 cm × 3 m" },
      { label: "Fluid Absorbency", value: "High capillary absorbency for surgical drainage" },
      { label: "Dispatch Hub", value: "Mandi Goluwala, Hanumangarh, Rajasthan" },
    ],
    keyBenefits: [
      "Non-linting outer gauze sleeve prevents loose cotton fibers from sticking to granulating wound tissue.",
      "High fluid-holding capacity reduces frequency of dressing changes in post-op recovery.",
      "Direct factory supply ensures competitive bulk wholesale rates for healthcare distributors.",
      "Quick regional dispatch across North Rajasthan and surrounding border districts.",
    ],
    buyingGuide: [
      "Confirm required width (10 cm for extremity incisions, 15 cm for abdominal and broad surgical wounds).",
      "Evaluate packaging requirements for sterile vs clean storage in your hospital CSSD.",
      "Establish monthly standing bulk order schedules for guaranteed warehouse reserves.",
    ],
    targetAudience: [
      "Orthopedic and general surgery operation theatres",
      "Trauma centres and emergency casualty departments",
      "Private nursing homes and multispecialty hospitals",
      "Surgical goods wholesalers and institutional distributors",
    ],
    faqs: [
      {
        question: "Where can I buy Gamjee Rolls at wholesale prices in Rajasthan?",
        answer: "Ganpati Lifecare supplies Gamjee Rolls directly from its Mandi Goluwala, Hanumangarh manufacturing facility to hospitals, clinics, and distributors across Rajasthan."
      },
      {
        question: "What sizes of Gamjee Rolls are available?",
        answer: "Standard dimensions include 10 cm × 3 m and 15 cm × 3 m rolls, packed for institutional hospital handling."
      },
      {
        question: "How fast can bulk orders be delivered in North Rajasthan?",
        answer: "Orders to Hanumangarh, Sri Ganganagar, Suratgarh, Pilibanga, and Sangaria are typically dispatched within 24 to 48 hours."
      }
    ],
    primaryProductUrl: "/products/gamjee-roll",
    primaryProductName: "Gamjee Roll",
  },
  {
    slug: "orthopedic-cotton-roll-supplier-india",
    metaTitle: "Orthopedic Cotton Roll Supplier India | Ganpati Lifecare",
    metaDescription: "Manufacturer of White Rose brand Orthocot orthopedic cotton rolls in India. Hypoallergenic POP cast padding from Hanumangarh, Rajasthan by Ganpati Lifecare.",
    h1: "Orthopedic Cotton Roll Supplier & Manufacturer in India",
    eyebrow: "White Rose Brand Orthocot",
    tldr: "Ganpati Lifecare is a premier Indian manufacturer and national wholesale supplier of White Rose Brand Orthocot orthopedic cotton rolls. Formulated from 100% pure combed cotton, our cast padding protects patient skin against pressure sores and moisture maceration under plaster of Paris (POP) and fiberglass casts.",
    intro: "Orthopedic surgeons and plaster technicians throughout India demand uniform thickness and non-clumping fibers in cast padding. Ganpati Lifecare manufactures high-grade Orthocot rolls under strict quality controls in Mandi Goluwala, Hanumangarh, Rajasthan, ensuring comfort and skin integrity throughout the 4 to 6-week cast immobilization period.",
    specTable: [
      { label: "Brand", value: "White Rose Brand Orthocot" },
      { label: "Material Composition", value: "100% Pure Bleached Cotton (Unmedicated)" },
      { label: "Standard Sizes", value: "10 cm × 3 m, 15 cm × 3 m (Stretched)" },
      { label: "Feathered Edges", value: "Yes — blends seamlessly without ridge formation" },
      { label: "Allergen Rating", value: "Hypoallergenic, latex-free, chlorine-free bleached" },
      { label: "Origin & Supply", value: "Mandi Goluwala, Hanumangarh, Rajasthan (Supplying Pan-India)" },
    ],
    keyBenefits: [
      "Engineered fibers prevent matting and hard pressure lumps when in contact with perspiration.",
      "Feathered edge design allows smooth overlapping without uncomfortable ridges under rigid plaster.",
      "Excellent thermal barrier shielding skin from heat generated during POP setting exotherm.",
      "Reliable bulk production capacity supplying hospital networks and medical distributors across India.",
    ],
    buyingGuide: [
      "Select 10 cm width for wrist, forearm, ankle, and pediatric cast applications.",
      "Select 15 cm width for adult leg, thigh, body jackets, and spica casting.",
      "Inquire about wholesale master carton quantities for optimal shipping rates.",
    ],
    targetAudience: [
      "Orthopedic surgery departments and fracture clinics",
      "Government and private trauma centres",
      "Medical supplies distributors and wholesale dealers",
      "Plaster casting rooms in multispecialty hospitals",
    ],
    faqs: [
      {
        question: "Why is Orthocot superior to ordinary cotton for casting?",
        answer: "Orthocot is specifically designed not to clump or lump under pressure, preventing painful skin ulcerations that ordinary absorbent cotton can cause."
      },
      {
        question: "Can Ganpati Lifecare supply orthopedic cotton rolls outside Rajasthan?",
        answer: "Yes, Ganpati Lifecare supplies White Rose Brand Orthocot cotton rolls to medical distributors and hospital groups across India via reliable logistics."
      }
    ],
    primaryProductUrl: "/products/orthocot-cotton-roll",
    primaryProductName: "Orthocot Cotton Roll",
  },
  {
    slug: "stockinet-supplier-rajasthan",
    metaTitle: "Orthopedic Stockinet Supplier Rajasthan | Ganpati Lifecare",
    metaDescription: "Wholesale supplier of tubular orthopedic stockinet in Rajasthan. Ribbed circular-knit cotton undercast sleeves from Hanumangarh hub by Ganpati Lifecare.",
    h1: "Orthopedic Stockinet Wholesale Supplier in Rajasthan",
    eyebrow: "Undercast Tubular Sleeves",
    tldr: "Ganpati Lifecare is Rajasthan's dedicated wholesale supplier of tubular orthopedic stockinet. Our circular-knit, 100% cotton stockinet sleeves provide a soft, breathable initial layer between the patient's skin and cast padding, wicking moisture and preventing cast friction.",
    intro: "Stockinet forms the foundation of modern orthopedic immobilization. Applied prior to Orthocot padding and casting tape, it ensures comfortable contact, facilitates neat cuff turn-backs over cast ends, and prevents rough plaster edges from chafing delicate skin.",
    specTable: [
      { label: "Fabric Type", value: "100% Pure Soft Knitted Cotton (Ribbed)" },
      { label: "Available Diameters", value: "5 cm (2\"), 7.5 cm (3\"), 10 cm (4\"), 15 cm (6\")" },
      { label: "Packaging Formats", value: "10 m and 20 m continuous dispenser rolls" },
      { label: "Elasticity", value: "High cross-stretch conforming smoothly to limb contours" },
      { label: "Manufacturer Hub", value: "Mandi Goluwala, Hanumangarh, Rajasthan" },
    ],
    keyBenefits: [
      "Seamless tubular knitting eliminates pressure ridges on sensitive skin.",
      "High lateral elasticity accommodates post-injury limb swelling safely.",
      "Pure cotton knit absorbs sweat and maintains skin health under long-term casts.",
      "Convenient dispenser packaging for rapid plaster room workflow.",
    ],
    buyingGuide: [
      "Order 5 cm (2\") for pediatric limbs and adult hand/forearm casts.",
      "Order 7.5 cm (3\") for adult arm and lower leg casts.",
      "Order 10 cm & 15 cm (4\" & 6\") for adult thigh, knee, and torso casting.",
    ],
    targetAudience: [
      "Hospital orthopedic wards and plaster casting technicians",
      "Trauma centres and emergency fracture units",
      "Surgical distributors throughout Rajasthan and neighbouring states",
    ],
    faqs: [
      {
        question: "How is orthopedic stockinet ordered in bulk?",
        answer: "Stockinet is supplied in continuous 10-meter or 20-meter dispenser rolls, available in carton quantities directly through Ganpati Lifecare."
      }
    ],
    primaryProductUrl: "/products/stockinet",
    primaryProductName: "Orthopedic Stockinet",
  },
  {
    slug: "ot-dress-supplier-rajasthan",
    metaTitle: "OT Dress & Scrub Suit Supplier Rajasthan | Ganpati Lifecare",
    metaDescription: "Wholesale manufacturer and supplier of hospital OT dresses and surgeon scrub suits in Rajasthan. Autoclavable fabrics from Hanumangarh by Ganpati Lifecare.",
    h1: "Hospital OT Dress & Surgeon Scrub Suit Supplier in Rajasthan",
    eyebrow: "Surgical Staff Apparel",
    tldr: "Ganpati Lifecare is a trusted manufacturer and wholesale supplier of Operation Theatre (OT) dresses and medical scrub suits in Rajasthan. Tailored from durable, breathable poly-cotton and pure cotton fabrics, our surgical attire withstands repeated autoclaving and industrial laundering while ensuring complete surgeon comfort.",
    intro: "Modern surgical theatres demand hygienic attire that prevents the shedding of skin particulates into sterile operating environments. Ganpati Lifecare supplies full-set scrub suits (tunic top and drawstring pants) in medical green, surgeon blue, teal, and grey to healthcare institutions across North Rajasthan.",
    specTable: [
      { label: "Garment Type", value: "Two-Piece OT Scrub Suit (Top + Trouser)" },
      { label: "Fabric Blend", value: "Premium Poly-Cotton (65/35) or 100% Breathable Cotton" },
      { label: "Autoclave Stability", value: "Colorfast and shrink-resistant through repeated autoclave cycles" },
      { label: "Standard Colours", value: "OT Green, Surgeon Blue, Teal, Charcoal Grey" },
      { label: "Size Range", value: "S, M, L, XL, XXL, Custom Hospital Sizing" },
      { label: "Dispatch Hub", value: "Mandi Goluwala, Hanumangarh, Rajasthan" },
    ],
    keyBenefits: [
      "Reinforced double-stitched seams engineered for heavy hospital laundry machines.",
      "Breathable fabric weave engineered for comfort in Rajasthan's climate.",
      "Generous pocket configurations for surgical tools, pens, and hospital IDs.",
      "Custom embroidery options for hospital logos and department branding on bulk contracts.",
    ],
    buyingGuide: [
      "Evaluate poly-cotton blends for maximum wrinkle resistance and rapid drying.",
      "Specify colour coding by hospital department (e.g., Green for OT, Blue for ICU).",
      "Request size charts and fabric sample swatches before bulk institutional procurement.",
    ],
    targetAudience: [
      "Private and government hospitals across Rajasthan",
      "Ambulatory surgery and day-care surgical centres",
      "Medical colleges and nursing training institutes",
      "Hospital linen and laundry management contractors",
    ],
    faqs: [
      {
        question: "Can hospital logos be embroidered on OT dresses?",
        answer: "Yes, Ganpati Lifecare provides custom logo embroidery and hospital department printing on institutional bulk orders."
      }
    ],
    primaryProductUrl: "/products/ot-dresses",
    primaryProductName: "OT Dresses",
  },
  {
    slug: "doctor-coat-wholesale-rajasthan",
    metaTitle: "Doctor Coats Wholesale Supplier Rajasthan | Ganpati Lifecare",
    metaDescription: "Wholesale doctor lab coats and medical aprons in Rajasthan. High quality twill fabric, tailored finish from Hanumangarh hub by Ganpati Lifecare.",
    h1: "Doctor Coats & Medical Aprons Wholesale Supplier in Rajasthan",
    eyebrow: "Medical Professional Workwear",
    tldr: "Ganpati Lifecare is a leading wholesale supplier of professional doctor coats, lab coats, and medical consultation aprons in Rajasthan. Crafted from premium stain-resistant twill fabrics, our doctor coats deliver an impeccable professional appearance, comfortable fit, and lasting durability for physicians, surgeons, and laboratory clinicians.",
    intro: "A doctor's coat is a symbol of professional authority and clinical hygiene. Serving medical clinics, nursing homes, diagnostic labs, and hospital groups across Rajasthan, Ganpati Lifecare offers full-sleeve and half-sleeve doctor coats tailored to the highest institutional standards.",
    specTable: [
      { label: "Style Options", value: "Full-Sleeve and Half-Sleeve Medical Consultation Coats" },
      { label: "Fabric Material", value: "High-grade Cotton Twill / Poly-Viscose Blend" },
      { label: "Pockets", value: "3 Deep Pockets (1 Chest Pocket + 2 Lower Utility Pockets)" },
      { label: "Back Design", value: "Pleated Back Vent for Easy Seating & Mobility" },
      { label: "Available Sizes", value: "36 to 46 (Chest Measurement in Inches)" },
      { label: "Supply Center", value: "Mandi Goluwala, Hanumangarh, Rajasthan" },
    ],
    keyBenefits: [
      "Stain-resistant and wrinkle-resistant fabric weave ensures a crisp, polished look.",
      "Reinforced pocket bartacking prevents tearing under weight of stethoscopes and tablets.",
      "Breathable fabric designed for all-day clinical consultation comfort.",
      "Direct wholesale rates for medical colleges, retail pharmacies, and hospital chains.",
    ],
    buyingGuide: [
      "Choose full-sleeve for laboratory safety and formal clinical OPD consultations.",
      "Choose half-sleeve for warm-weather wards and procedural clinics.",
      "Combine orders with nurse uniforms and OT scrub suits for volume discounts.",
    ],
    targetAudience: [
      "Hospital outpatient departments (OPD) and diagnostic chains",
      "Medical colleges, dental institutes, and pathology laboratories",
      "Pharmacy stores and uniform retailers across North India",
    ],
    faqs: [
      {
        question: "What fabrics are used in Ganpati Lifecare doctor coats?",
        answer: "We offer both 100% fine cotton twill and poly-viscose blend fabrics, selected for easy washability, breathability, and professional drape."
      }
    ],
    primaryProductUrl: "/products/doctor-coats",
    primaryProductName: "Doctor Coats",
  },
  {
    slug: "hospital-consumables-wholesale-hanumangarh",
    metaTitle: "Hospital Consumables Wholesale Hanumangarh | Ganpati",
    metaDescription: "Wholesale hospital consumables & medical disposables in Hanumangarh, Rajasthan. Fast local dispatch of gloves, cotton, gauze & dressings by Ganpati Lifecare.",
    h1: "Hospital Consumables & Medical Disposables Wholesale in Hanumangarh",
    eyebrow: "Complete Clinical Sourcing",
    tldr: "Ganpati Lifecare provides comprehensive wholesale supply of hospital consumables, surgical dressings, and medical disposables in Mandi Goluwala, Hanumangarh, Rajasthan. We supply clinics, nursing homes, trauma centres, and district hospitals with essential everyday healthcare supplies.",
    intro: "Continuous, uninterrupted access to sterile disposables and surgical dressing consumables is vital for every healthcare facility. Under the management of Dharampal Verma, Ganpati Lifecare delivers dependable local supply chains, eliminating procurement delays for hospitals in Hanumangarh, Sri Ganganagar, and surrounding Rajasthan districts.",
    specTable: [
      { label: "Product Portfolio", value: "Cotton Rolls, Gauze, Gamjee, Crepe Bandages, Disposables, Uniforms" },
      { label: "Facility Coverage", value: "Clinics, Daycare Centers, 10-100+ Bed Hospitals, Trauma Wards" },
      { label: "Ordering Channels", value: "Direct Phone Call, WhatsApp B2B Desk, Email Quotations" },
      { label: "GST Compliance", value: "Registered Supplier (GSTIN State Code: 08 Rajasthan)" },
      { label: "Delivery Speed", value: "Same-day / 24-hour local dispatch in Hanumangarh district" },
    ],
    keyBenefits: [
      "Consolidate multiple supply vendors into one reliable local manufacturer & distributor.",
      "Minimize hospital inventory carrying costs through rapid local reorder fulfillment.",
      "Transparent wholesale rate structures with itemized GST invoices.",
      "Direct personalized coordination with owner Dharampal Verma.",
    ],
    buyingGuide: [
      "Submit your monthly hospital consumption sheet for customized bulk quote pricing.",
      "Inquire about buffer inventory holding for critical seasonal demand surges.",
      "Explore trial sample packs for clinical evaluation by hospital nursing staff.",
    ],
    targetAudience: [
      "Private nursing homes and multispecialty hospitals in Hanumangarh district",
      "Surgical and orthopedic specialty clinics",
      "District health procurement officers and charitable trust hospitals",
    ],
    faqs: [
      {
        question: "How can Hanumangarh clinics set up a monthly supply account?",
        answer: "Contact Ganpati Lifecare via WhatsApp at +91 98282 32254 or call directly. We provide customized quotation sheets and recurring delivery schedules."
      }
    ],
    primaryProductUrl: "/products/hospital-consumables",
    primaryProductName: "Hospital Consumables",
  },
  {
    slug: "surgical-cotton-wholesale-rajasthan",
    metaTitle: "Surgical Cotton Wholesale Supplier in Rajasthan | Ganpati",
    metaDescription: "Wholesale surgical absorbent cotton and orthopedic cast padding in Rajasthan. Factory direct pricing from Mandi Goluwala, Hanumangarh by Ganpati Lifecare.",
    h1: "Surgical Cotton & Dressing Materials Wholesale in Rajasthan",
    eyebrow: "Medical Cotton Manufacturing",
    tldr: "Ganpati Lifecare is a premier manufacturer and wholesale supplier of surgical cotton, Orthocot cast padding rolls, and medical dressing materials in Rajasthan. Operating from Mandi Goluwala, Hanumangarh, we produce medical-grade bleached cotton meeting rigorous clinical absorption and softness standards.",
    intro: "From emergency wound debridement to specialized orthopedic fracture immobilization, high-quality surgical cotton is the cornerstone of clinical wound care. Ganpati Lifecare supplies bulk master cartons of surgical cotton rolls and folded absorbent packs to healthcare distributors and hospital networks across Rajasthan.",
    specTable: [
      { label: "Cotton Types", value: "Absorbent Surgical Cotton & Non-Absorbent Orthopedic Padding" },
      { label: "Purity Standard", value: "100% Combed Cotton, Free from Foreign Matter & Chemical Residue" },
      { label: "Roll Sizes", value: "100 g, 200 g, 500 g rolls; 10 cm & 15 cm × 3 m Orthocot rolls" },
      { label: "Absorbency Time", value: "< 10 seconds for surgical absorbent cotton grades" },
      { label: "Origin Facility", value: "Mandi Goluwala, Hanumangarh, Rajasthan" },
    ],
    keyBenefits: [
      "Manufactured from high-grade staple cotton fibers providing superior tensile strength and resilience.",
      "Uniform thickness throughout each roll ensures even padding and predictable fluid absorption.",
      "Direct factory supply eliminates intermediary markups for hospital procurement departments.",
      "Consistent inventory available for emergency dispatches across Rajasthan.",
    ],
    buyingGuide: [
      "Ensure absorbent cotton is specified for open wound care and fluid management.",
      "Ensure Orthocot non-absorbent cast padding is specified for POP plaster applications.",
      "Check carton packaging specifications for dust-proof hospital warehouse storage.",
    ],
    targetAudience: [
      "Hospital central sterile supply departments (CSSD)",
      "General surgeons, orthopedic surgeons, and dermatologists",
      "Pharmaceutical wholesalers and medical consumable traders",
    ],
    faqs: [
      {
        question: "What is the minimum order quantity for surgical cotton in Rajasthan?",
        answer: "We accommodate both small clinic trial cartons and large hospital master carton dispatches. Contact us directly for tiered wholesale rates."
      }
    ],
    primaryProductUrl: "/products/surgical-dressing-materials",
    primaryProductName: "Surgical Dressing Materials",
  },
];
