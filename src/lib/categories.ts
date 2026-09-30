import { ProductCategory } from "./data";

export interface CategoryData {
  slug: string;
  categoryId: Exclude<ProductCategory, "all">;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  quickAnswer: string;
  description: string;
  keyBenefits: string[];
  faqs: { question: string; answer: string }[];
}

export const CATEGORIES_DATA: CategoryData[] = [
  {
    slug: "orthopedic",
    categoryId: "orthopedic",
    name: "Orthopedic Supplies",
    metaTitle: "Orthopedic Supplies Wholesale Rajasthan | Ganpati Lifecare",
    metaDescription: "Wholesale orthopedic supplies in Hanumangarh, Rajasthan. Buy Orthocot cotton rolls, stockinet, skin traction kits & gauze bandages from Ganpati Lifecare.",
    h1: "Orthopedic Supplies & Cast Padding Materials",
    quickAnswer:
      "Ganpati Lifecare supplies premium orthopedic products including Orthocot pure medical cotton rolls, tubular stockinets, skin traction kits, and orthopedic gauze bandages to hospitals, trauma centers, and fracture clinics across Hanumangarh, Sri Ganganagar, and North Rajasthan.",
    description:
      "Ganpati Lifecare is a trusted regional wholesale distributor of high-grade orthopedic consumables and cast padding materials based in Goluwala, Hanumangarh, Rajasthan. Our orthopedic product portfolio is engineered specifically to meet the high standards of orthopedic surgeons, trauma centers, and plaster technicians. Plaster cast application requires superior padding to protect the skin from pressure sores, maceration, and thermal reactions during cast setting. Our flagship Orthocot Cotton Roll delivers high-absorbency, 100% medical-grade cotton cushioning without harsh optical brighteners. Complementing this, our seamless tubular stockinets provide a breathable, frictionless first defense against dermal irritation, stretching effortlessly over extremities. For emergency fracture stabilization, we distribute complete adhesive and non-adhesive skin traction kits equipped with high-friction foam padding, spreader plates, and durable extension cords. Whether your facility operates an active orthopedic trauma unit or routine outpatient plaster room, Ganpati Lifecare guarantees rapid regional dispatch, direct wholesale carton rates, and dependable supply continuity throughout North Rajasthan.",
    keyBenefits: [
      "100% Medical-grade hypoallergenic Orthocot cotton rolls",
      "Seamless circular rib-knit stockinets in versatile widths",
      "Complete pre-operative skin traction kits with spreader assemblies",
      "Rapid dispatch across Hanumangarh, Sri Ganganagar, Suratgarh & Bikaner",
    ],
    faqs: [
      {
        question: "What orthopedic products does Ganpati Lifecare supply?",
        answer:
          "We supply Orthocot medical cotton rolls, tubular orthopedic stockinets, complete adult and pediatric skin traction kits, and high-absorbency orthopedic gauze bandages.",
      },
      {
        question: "Why is Orthocot cotton roll preferred for cast padding?",
        answer:
          "Orthocot cotton rolls are manufactured from 100% pure, unbleached medical-grade fibers that provide uniform cushioning, prevent pressure sores under plaster, and absorb perspiration safely without irritating patient skin.",
      },
      {
        question: "Can hospitals order orthopedic supplies in bulk cartons?",
        answer:
          "Yes, we supply direct bulk wholesale cartons to private hospitals, nursing homes, and distributor networks across Rajasthan with fast logistics coordination.",
      },
      {
        question: "How do I request an orthopedic product quotation?",
        answer:
          "You can call +91 98282 32254 or message us directly on WhatsApp for an immediate institutional quotation and dispatch timeline.",
      },
    ],
  },
  {
    slug: "surgical",
    categoryId: "surgical",
    name: "Surgical Supplies",
    metaTitle: "Surgical Supplies Wholesale Rajasthan | Ganpati Lifecare",
    metaDescription: "Wholesale surgical supplies in Hanumangarh, Rajasthan. High-absorbency Gamjee rolls, sponge pads, crepe bandages & surgical dressing materials.",
    h1: "Surgical Supplies & Clinical Dressing Materials",
    quickAnswer:
      "Ganpati Lifecare is a premier supplier of surgical dressings, Gamjee rolls, sterile sponge pads, crepe bandages, and operating theatre consumables for hospitals and surgical centers throughout Hanumangarh and North Rajasthan.",
    description:
      "In modern clinical surgery and trauma management, sterile and high-absorbency wound dressings form the frontline defense against healthcare-associated infections. Ganpati Lifecare supplies an extensive array of surgical dressing materials and operating theatre consumables from our central hub in Goluwala, Hanumangarh. Our inventory includes thick absorbent Gamjee rolls encased in non-adherent gauze sleeves—ideal for high-exudate wounds, post-operative surgical incisions, and burns. For operating rooms and routine wound care, we supply surgical sponge pads with folded edges that prevent lint shedding into open surgical cavities. We also supply durable cotton crepe and elastic compression bandages that maintain consistent elasticity for joint immobilization and dressing retention. All surgical products undergo strict quality checks to ensure high fluid retention, sterility compatibility, and clinical safety. We support institutional procurement for government hospitals, private surgical nursing homes, and emergency trauma clinics across Rajasthan.",
    keyBenefits: [
      "High fluid retention Gamjee rolls with gauze outer sleeves",
      "Lint-free folded-edge surgical sponge pads and swabs",
      "High-elasticity crepe and compression bandages",
      "Direct manufacturer wholesale pricing with same-day dispatch coordination",
    ],
    faqs: [
      {
        question: "What is a Gamjee roll and when is it used?",
        answer:
          "A Gamjee roll consists of thick absorbent cotton wool encased in a fine gauze sleeve. It is used in surgical post-operative care, trauma dressings, and burns to manage heavy wound discharge without adhering to the wound bed.",
      },
      {
        question: "Are your surgical sponge pads lint-free?",
        answer:
          "Yes, our surgical sponge pads are crafted with carefully tucked and folded edges to prevent stray threads and lint from contaminating wound sites or surgical incisions.",
      },
      {
        question: "Do you supply surgical dressing materials to clinics outside Hanumangarh?",
        answer:
          "Yes, we deliver surgical dressings, bandages, and hospital consumables to healthcare facilities throughout Sri Ganganagar, Suratgarh, Bikaner, Nohar, and across North India.",
      },
    ],
  },
  {
    slug: "hospital-uniforms",
    categoryId: "uniforms",
    name: "Hospital Uniforms",
    metaTitle: "Hospital Uniforms & Doctor Coats Rajasthan | Ganpati Lifecare",
    metaDescription: "Durable doctor coats, nurse scrub uniforms, OT dresses & hospital staff attire wholesale in Hanumangarh, Rajasthan. Custom hospital apparel supply.",
    h1: "Hospital Uniforms, Doctor Coats & OT Dresses",
    quickAnswer:
      "Ganpati Lifecare manufactures and supplies premium hospital apparel, including stain-resistant doctor coats, ergonomic nurse scrub suits, sterile OT dresses, and durable staff uniforms for healthcare institutions across Rajasthan.",
    description:
      "Professional medical apparel plays a dual role in healthcare: reinforcing institutional identity and providing ergonomic, hygienic protection for medical personnel during long shifts. Ganpati Lifecare provides end-to-end hospital uniform solutions tailored to the exacting demands of modern medical environments. Our doctor coats are tailored from durable poly-cotton twill that resists stains, endures repeated commercial laundering, and retains a clean, professional finish with functional utility pockets. Our nurse scrub suits and uniforms are crafted with breathable, moisture-wicking fabrics that provide exceptional comfort, ease of movement, and color-coded departmental identification. For surgical suites, our autoclavable OT dresses are designed to be low-linting and heat-resistant for sterile processing. Additionally, we supply heavy-duty support staff uniforms for ward assistants, housekeeping, and maintenance teams. Healthcare facilities in Hanumangarh, Sri Ganganagar, and across North India rely on Ganpati Lifecare for custom sizing, institutional bulk supply, and dependable fabric quality.",
    keyBenefits: [
      "Autoclavable and high-temperature laundering resistant fabrics",
      "Ergonomic cuts engineered for active 12-hour medical shifts",
      "Stain-resistant poly-cotton blends with reinforced stitching",
      "Custom institutional sizing and departmental color options",
    ],
    faqs: [
      {
        question: "What fabric is used in Ganpati Lifecare doctor coats and nurse scrubs?",
        answer:
          "We use premium, high-durability poly-cotton blends that combine cotton breathability with polyester strength, ensuring stain resistance and shape retention through rigorous laundering cycles.",
      },
      {
        question: "Can hospitals order custom embroidered or color-coded uniforms?",
        answer:
          "Yes, we provide institutional uniform customization including departmental color coding, specific sizing matrices, and custom requirements for hospitals and nursing colleges.",
      },
      {
        question: "What is the delivery turnaround for bulk hospital uniform orders?",
        answer:
          "Standard stock sizes are dispatched within 24 to 48 hours, while custom bulk tailoring orders are delivered based on confirmed batch specifications.",
      },
    ],
  },
  {
    slug: "healthcare-essentials",
    categoryId: "essentials",
    name: "Healthcare Essentials & Consumables",
    metaTitle: "Hospital Consumables Wholesale Rajasthan | Ganpati Lifecare",
    metaDescription: "Wholesale hospital consumables & single-use medical disposables in Hanumangarh, Rajasthan. Reliable bulk healthcare supply from Ganpati Lifecare.",
    h1: "Hospital Consumables & Medical Disposables",
    quickAnswer:
      "Ganpati Lifecare supplies routine hospital consumables and single-use medical disposables, including examination gloves, surgical masks, caps, shoe covers, and clinical ward supplies to clinics and hospitals throughout Rajasthan.",
    description:
      "A seamless healthcare facility relies on uninterrupted access to routine consumables and infection-control disposables. Ganpati Lifecare serves as a dependable institutional supply partner for private clinics, nursing homes, pathology laboratories, and major hospitals across Hanumangarh and North Rajasthan. Our healthcare essentials category covers high-demand single-use disposables including surgical face masks, bouffant caps, non-skid shoe covers, and medical examination gloves. These disposables establish an effective barrier against pathogens and cross-contamination. We also supply general hospital ward consumables such as medical adhesives, IV dressing strips, cotton applicators, and clinical disposables. By partnering with Ganpati Lifecare, healthcare administrators simplify procurement, consolidate supplier communication, and benefit from competitive wholesale pricing with direct doorstep delivery from our Goluwala warehouse.",
    keyBenefits: [
      "Complete inventory of single-use infection control disposables",
      "Quality-assured medical gloves, masks, caps & shoe covers",
      "Consolidated monthly procurement for clinics & nursing homes",
      "Dependable stock availability with rapid road dispatch across North Rajasthan",
    ],
    faqs: [
      {
        question: "What medical disposable products do you supply?",
        answer:
          "We supply single-use surgical 3-ply masks, bouffant caps, disposable shoe covers, examination gloves, sterile dressing swabs, and general ward consumables.",
      },
      {
        question: "Can clinics establish recurring monthly supply orders?",
        answer:
          "Yes, we partner with healthcare facilities across Hanumangarh, Sri Ganganagar, and Bikaner on regular recurring supply schedules to prevent consumable stockouts.",
      },
      {
        question: "How can I get the wholesale price list for hospital consumables?",
        answer:
          "Contact owner Dharampal Verma directly via phone at +91 98282 32254 or submit our quick WhatsApp inquiry for a tailored bulk quotation.",
      },
    ],
  },
];

export function getCategoryBySlug(slug: string): CategoryData | undefined {
  return CATEGORIES_DATA.find((c) => c.slug === slug);
}
