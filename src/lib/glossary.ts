export interface GlossaryTerm {
  slug: string;
  term: string;
  hindiTerm?: string;
  shortDef: string;
  fullDef: string;
  clinicalUses: string[];
  specs: string[];
  relatedProducts: { name: string; href: string }[];
  faqs: { question: string; answer: string }[];
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    slug: "orthocot",
    term: "Orthocot Cotton Roll",
    hindiTerm: "ऑर्थोकोट कॉटन रोल (कास्ट पैडिंग)",
    shortDef: "Orthocot is a 100% pure, hypoallergenic medical-grade cotton roll engineered specifically for orthopedic cast padding and fracture splinting.",
    fullDef: "Orthocot is an unmedicated, non-absorbent bleached orthopedic padding manufactured from combed cotton fibers. It creates a breathable, cushioning buffer layer between the patient's skin and rigid casting materials (such as POP plaster or fiberglass). It prevents pressure necrosis, blistering, and moisture maceration.",
    clinicalUses: [
      "Under-cast padding for plaster of Paris (POP) and fiberglass casts",
      "Splinting and limb immobilization padding for post-fracture stabilization",
      "Compression layer under orthopedic crepe bandages for joint sprains",
      "Protection of bony prominences (elbows, ankles, heels) during prolonged immobilization",
    ],
    specs: [
      "Material: 100% medical-grade cotton fibers",
      "Standard Widths: 10 cm, 15 cm",
      "Standard Length: 3 meters (stretched)",
      "Grade: Hypoallergenic, feather-edged for seamless overlap",
    ],
    relatedProducts: [
      { name: "Orthocot Cotton Roll", href: "/products/orthocot-cotton-roll" },
      { name: "Orthopedic Stockinet", href: "/products/stockinet" },
      { name: "Ortho Active Crepe Bandage", href: "/products/bandages" },
    ],
    faqs: [
      {
        question: "Can ordinary cotton be used instead of Orthocot?",
        answer: "No. Ordinary cotton clumps and mats when exposed to sweat, forming hard pressure spots that can cause severe pressure sores under a cast."
      },
      {
        question: "Where is Orthocot manufactured in Rajasthan?",
        answer: "Ganpati Lifecare produces and distributes White Rose Brand Orthocot rolls from Mandi Goluwala, Hanumangarh, Rajasthan."
      }
    ]
  },
  {
    slug: "gamjee-roll",
    term: "Gamjee Roll",
    hindiTerm: "गैमजी रोल (सर्जिकल ड्रेसिंग रोल)",
    shortDef: "A Gamjee Roll is a surgical absorbent dressing pad composed of a thick layer of absorbent cotton enclosed within an open-weave absorbent gauze outer sleeve.",
    fullDef: "Invented by Dr. Joseph Sampson Gamgee in 1880, the modern Gamjee Roll is a staple hospital dressing material used for heavy exudate absorption, surgical wound coverage, and postoperative compression. Ganpati Lifecare manufactures high-absorbency Gamjee rolls in Goluwala, Hanumangarh for hospitals across Rajasthan.",
    clinicalUses: [
      "Post-operative heavy fluid and blood absorption in surgical wards",
      "Secondary protective dressing over deep open wounds and burns",
      "Pressure dressing to control capillary oozing and hematoma formation",
      "Padding over surgical incisions before bandage application",
    ],
    specs: [
      "Sizes: 10 cm × 3 m, 15 cm × 3 m",
      "Composition: 100% absorbent cotton core + surgical gauze wrapping",
      "Properties: High fluid retention, non-linting gauze envelope",
    ],
    relatedProducts: [
      { name: "Gamjee Roll Wholesale", href: "/products/gamjee-roll" },
      { name: "Lap-Pad Cotton Cloth Sponge", href: "/products/sponge-pad" },
      { name: "Surgical Dressing Materials", href: "/products/surgical-dressing-materials" },
    ],
    faqs: [
      {
        question: "What is the difference between Gamjee Roll and Absorbent Cotton?",
        answer: "Absorbent cotton is loose raw fiber, whereas a Gamjee Roll contains cotton enclosed inside a woven gauze sleeve so fibers do not stick to the open wound bed."
      }
    ]
  },
  {
    slug: "stockinet",
    term: "Orthopedic Stockinet",
    hindiTerm: "स्टॉकिनेट (कास्ट अंडरलेयर ट्यूब)",
    shortDef: "A tubular seamless knitted fabric sleeve pulled over an injured limb as the immediate primary skin layer before cast padding and plaster application.",
    fullDef: "Orthopedic stockinet is a ribbed, circular-knitted cotton or synthetic tube designed to fit snugly around limbs of various circumferences. It wicks perspiration away from the skin, reduces friction under cast padding, and provides clean, folded-over finished edges at the proximal and distal boundaries of a cast.",
    clinicalUses: [
      "First skin contact layer before Orthocot padding in POP/fiberglass cast application",
      "Holding bulky surgical wound dressings securely in place on extremities",
      "Skin protection under arm and leg braces, splints, and traction devices",
    ],
    specs: [
      "Widths: 5 cm (2 inch), 7.5 cm (3 inch), 10 cm (4 inch), 15 cm (6 inch)",
      "Length: 10 meter and 20 meter continuous roll dispenser boxes",
      "Weave: High-stretch circular rib knit, 100% soft cotton",
    ],
    relatedProducts: [
      { name: "Orthopedic Stockinet", href: "/products/stockinet" },
      { name: "Orthocot Cotton Roll", href: "/products/orthocot-cotton-roll" },
      { name: "Skin Traction Kit", href: "/products/skin-traction-kit" },
    ],
    faqs: [
      {
        question: "What size stockinet is used for an adult arm cast?",
        answer: "A 5 cm (2 inch) or 7.5 cm (3 inch) stockinet is typically chosen for adult forearm and arm casts."
      }
    ]
  },
  {
    slug: "skin-traction",
    term: "Skin Traction Kit",
    hindiTerm: "स्किन ट्रैक्शन किट (ऑर्थोपेडिक ट्रैक्शन)",
    shortDef: "An orthopedic apparatus applied directly to limb skin to exert longitudinal pulling force for aligning fractured bones and relieving muscle spasms.",
    fullDef: "Skin Traction Kits consist of adhesive or non-adhesive foam-backed extension straps, a spreader plate with cord, and an elastic retaining bandage. They are widely used in pediatric femur fractures, temporary adult fracture stabilization prior to definitive surgery, and relief of severe lumbar spasms.",
    clinicalUses: [
      "Temporary traction for femur shaft and hip fractures prior to surgical fixation",
      "Non-operative management of pediatric femoral fractures (Gallows / Bryant traction)",
      "Reduction of muscle spasms in severe osteoarthritis and acute back pain",
      "Correction of minor joint contractures and deformities",
    ],
    specs: [
      "Types: Adhesive (for long-term grip) & Non-Adhesive (for sensitive skin)",
      "Sizes: Adult & Pediatric",
      "Components: Hypoallergenic extension strapping + cord spreader + crepe bandage",
    ],
    relatedProducts: [
      { name: "Skin Traction Kit", href: "/products/skin-traction-kit" },
      { name: "Ortho Active Crepe Bandage", href: "/products/bandages" },
    ],
    faqs: [
      {
        question: "How much weight can be applied in skin traction?",
        answer: "Skin traction is generally limited to a maximum of 3.5 to 5 kg (7 to 10% of body weight) to avoid shearing or blister damage to the skin."
      }
    ]
  },
  {
    slug: "pop-cast-padding",
    term: "POP Cast Padding",
    hindiTerm: "पीओपी कास्ट पैडिंग",
    shortDef: "A protective cushioning wrap applied over the skin before wet Plaster of Paris (POP) bandage wrapping.",
    fullDef: "POP Cast Padding serves as an essential thermal and mechanical barrier. When Plaster of Paris sets, it undergoes an exothermic reaction producing heat; quality cast padding shields the patient's delicate skin while absorbing pressure spikes and allowing natural perspiration escape.",
    clinicalUses: [
      "Thermal insulation during POP setting exotherm",
      "Pressure redistribution over bony landmarks",
      "Easy, safe cast removal with oscillating cast saws without skin contact",
    ],
    specs: [
      "Widths: 10 cm, 15 cm × 3 m length",
      "Fiber: Bleached medical-grade unmedicated cotton",
    ],
    relatedProducts: [
      { name: "Orthocot Cotton Roll", href: "/products/orthocot-cotton-roll" },
      { name: "Orthopedic Gauze Bandages", href: "/products/orthopedic-gauze-bandages" },
    ],
    faqs: [
      {
        question: "Does cast padding get compressed over time?",
        answer: "High-grade Orthocot cast padding retains its resilience and does not collapse completely, maintaining protective padding throughout the 4-6 week casting period."
      }
    ]
  },
  {
    slug: "crepe-bandage",
    term: "Orthopedic Crepe Bandage",
    hindiTerm: "क्रेप बैंडेज (गरम पट्टी)",
    shortDef: "An elasticated cotton compression bandage used for joint support, swelling reduction, and dressing fixation.",
    fullDef: "Manufactured from high-grade cotton with elastic warp yarns, Ortho Active crepe bandages provide controlled, uniform compression. They allow full joint mobility while restricting ligamentous overextension and managing post-traumatic edema.",
    clinicalUses: [
      "Sprain and strain management of ankles, wrists, and knees",
      "Varicose vein compression and post-sclerotherapy support",
      "Holding heavy surgical dressings firmly without adhesive tape",
    ],
    specs: [
      "Widths: 6 cm, 8 cm, 10 cm, 15 cm",
      "Stretched Length: 4 meters",
      "Features: Fast edges, washable, reusable, high recovery elasticity",
    ],
    relatedProducts: [
      { name: "Ortho Active Crepe Bandage", href: "/products/bandages" },
      { name: "Surgical Dressing Materials", href: "/products/surgical-dressing-materials" },
    ],
    faqs: [
      {
        question: "Can crepe bandages be washed and reused?",
        answer: "Yes, wash in lukewarm soapy water without twisting or ironing to restore elasticity."
      }
    ]
  },
  {
    slug: "sponge-pad",
    term: "Lap-Pad Sponge Pad",
    hindiTerm: "लैप-पैड कॉटन स्पंज पैड",
    shortDef: "An intraoperative absorbent laparotomy sponge used in operating theatres to control surgical bleeding and isolate organs.",
    fullDef: "Sponge pads (lap pads) are multi-layered woven cotton pads designed for high absorbency and minimal lint shedding during abdominal and open orthopedic surgery. They are available with x-ray detectable filaments for theatre safety.",
    clinicalUses: [
      "Hemostatic tamponade in surgical cavities",
      "Abdominal organ retraction and surgical site clearance",
      "Post-operative exudate soaking in major wound cavities",
    ],
    specs: [
      "Dimensions: 25 cm × 25 cm, 30 cm × 30 cm",
      "Layers: 4-ply, 6-ply, 8-ply pre-washed cotton cloth",
    ],
    relatedProducts: [
      { name: "Lap-Pad Cotton Cloth Sponge", href: "/products/sponge-pad" },
      { name: "Gamjee Roll", href: "/products/gamjee-roll" },
    ],
    faqs: [
      {
        question: "Why are laparotomy sponge pads pre-washed?",
        answer: "Pre-washing enhances capillary absorption capacity and eliminates loose cotton lint prior to sterile surgery."
      }
    ]
  },
  {
    slug: "surgical-dressing",
    term: "Surgical Dressing",
    hindiTerm: "सर्जिकल ड्रेसिंग सामग्री",
    shortDef: "Sterile and non-sterile textile materials applied directly to wounds to promote healing, manage exudate, and prevent microbiological infection.",
    fullDef: "Surgical dressings encompass absorbent gauze pads, paraffin gauze, surgical cotton, gamjee pads, and adhesive tapes engineered according to Indian Pharmacopoeia (IP) and British Pharmacopoeia (BP) standards for clinical wound care.",
    clinicalUses: [
      "Primary sterile wound contact in surgical incisions and lacerations",
      "Antimicrobial barrier against external contaminants",
      "Exudate absorption and moisture balance management",
    ],
    specs: [
      "Types: Plain absorbent, x-ray detectable, paraffin impregnated",
      "Standards: Pharmacopoeial medical-grade sterility and absorbency",
    ],
    relatedProducts: [
      { name: "Surgical Dressing Materials", href: "/products/surgical-dressing-materials" },
      { name: "Orthopedic Gauze Bandages", href: "/products/orthopedic-gauze-bandages" },
    ],
    faqs: [
      {
        question: "Where can clinics order surgical dressings in bulk in Rajasthan?",
        answer: "Ganpati Lifecare in Mandi Goluwala, Hanumangarh provides wholesale direct supply to clinics, nursing homes, and hospitals across North Rajasthan."
      }
    ]
  },
  {
    slug: "sterile-vs-non-sterile",
    term: "Sterile vs Non-Sterile Supplies",
    hindiTerm: "स्टराइल बनाम नॉन-स्टराइल मेडिकल सामग्री",
    shortDef: "Sterile items have undergone validated sterilization (ETO/Gamma/Autoclave) with zero viable microorganisms, whereas non-sterile items are hygienic but unsterilized.",
    fullDef: "In medical procurement, sterile supplies (like laparotomy sponges, sterile gauze swabs, OT gowns) are mandated for direct contact with sterile tissue or open surgical incisions. Non-sterile supplies (such as undercast Orthocot rolls, non-sterile crepe bandages, patient examination sheets) provide mechanical support and comfort where direct bloodstream or internal tissue contact is absent.",
    clinicalUses: [
      "Sterile: Operating theater incisions, catheterization, deep wound packing",
      "Non-Sterile: Undercast padding, external compression, outer surface protection",
    ],
    specs: [
      "Sterility Assurance Level (SAL): 10^-6 for sterile classifications",
      "Packaging: Individual peel pouches with chemical indicator strips for sterile items",
    ],
    relatedProducts: [
      { name: "Medical Disposables", href: "/products/medical-disposables" },
      { name: "Gamjee Roll", href: "/products/gamjee-roll" },
    ],
    faqs: [
      {
        question: "Can non-sterile cotton rolls be autoclaved on-site by hospitals?",
        answer: "Yes, standard 100% pure cotton rolls without synthetic binders can be autoclaved in hospital CSSD departments."
      }
    ]
  },
  {
    slug: "ot-scrub-suit",
    term: "OT Dress & Scrub Suit",
    hindiTerm: "ओटी ड्रेस / स्क्रब सूट (ऑपरेशन थिएटर)",
    shortDef: "Specialized hygienic two-piece sanitary garments worn by surgeons, nurses, and theatre staff inside operating suites.",
    fullDef: "Operation Theatre (OT) dresses and scrubs are tailored from autoclavable, breathable poly-cotton or pure cotton fabrics that resist fluid splash, prevent shedding of skin dander into the sterile field, and withstand high-temperature industrial laundry cycles.",
    clinicalUses: [
      "Surgical attire in operating suites and intensive care units (ICUs)",
      "Daily uniform for hospital ward doctors and nursing personnel",
      "Cleanroom and sterile processing department workwear",
    ],
    specs: [
      "Fabrics: 65/35 Poly-Cotton or 100% Combed Cotton, anti-microbial finish",
      "Colours: Medical Green, Surgeon Blue, Teal, Grey",
      "Sizes: S, M, L, XL, XXL",
    ],
    relatedProducts: [
      { name: "OT Dresses", href: "/products/ot-dresses" },
      { name: "Doctor Coats", href: "/products/doctor-coats" },
      { name: "Nurse Uniforms", href: "/products/nurse-uniforms" },
      { name: "Hospital Staff Uniforms", href: "/products/staff-uniforms" },
    ],
    faqs: [
      {
        question: "What is the best fabric for hospital OT dresses in Rajasthan?",
        answer: "A 65/35 poly-cotton blend provides the ideal balance of breathability in Rajasthan's heat, wrinkle resistance, and durability through repeated autoclave cycles."
      }
    ]
  },
];
