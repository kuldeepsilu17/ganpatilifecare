import { Product } from "./data";

export interface EnrichedProduct extends Product {
  gallery: string[];
  features: string[];
  specifications: Record<string, string>;
  usage: string;
}

export function getProductDetails(product: Product): EnrichedProduct {
  const collectionImg = "/images/products/complete_product_collection_1779201240988.png";
  const cottonImg = "/images/products/surgical_cotton_showcase_1779200486555.png";
  const bandageImg = "/images/products/medical_bandage_rolls_1779200753456.png";
  const spongeImg = "/images/products/medical_sponge_stockinet_1779200845560.png";
  const uniformImg = "/images/products/hospital_uniform_display_1779200633810.png";

  let gallery = [product.image];
  let features: string[] = [];
  let specifications: Record<string, string> = {};
  let usage = "";

  // Set gallery based on category
  if (product.category === "orthopedic") {
    gallery.push(collectionImg, cottonImg);
  } else if (product.category === "surgical") {
    gallery.push(spongeImg, bandageImg);
  } else if (product.category === "uniforms") {
    gallery.push(uniformImg, collectionImg);
  } else {
    gallery.push(collectionImg);
  }

  // Deduplicate and filter out empty images
  gallery = Array.from(new Set(gallery.filter(Boolean)));

  // Customize details by product ID
  switch (product.id) {
    case "orthocot-cotton-roll":
      features = [
        "Made from 100% pure, natural cotton fibers",
        "High absorbency rate for clinical and wound care",
        "Super soft texture, highly compatible with sensitive skin",
        "Free from optical whiteners, lint, and impurities",
        "Interleaved layers for easy unwinding and application"
      ];
      specifications = {
        "Material": "100% Organic Cotton",
        "Sterility": "Non-Sterile (Autoclavable)",
        "Weight Options": "100g, 200g, 300g, 400g, 500g",
        "Certification": "ISO 9001, CE Compliant",
        "Packaging": "Moisture-resistant paper wrap"
      };
      usage = "Ideal for orthopedic padding under plaster casts, general wound cleansing, surgical prepping, and absorbing body fluids.";
      break;

    case "stockinet":
      features = [
        "Highly elastic rib-knit structure for a snug fit",
        "Breathable cotton fabric keeps skin cool and dry",
        "Seamless design prevents pressure sores and rubbing",
        "Easy to cut to custom lengths without fraying",
        "Hypoallergenic material suitable for direct skin contact"
      ];
      specifications = {
        "Material": "Rib-Knitted Stretch Cotton",
        "Widths Available": "2 inch, 3 inch, 4 inch, 6 inch",
        "Length": "10 meter rolls",
        "Elongation": "Up to 300% crosswise stretch",
        "Sterility": "Non-sterile"
      };
      usage = "Applied directly over the patient's limb as the first layer under plaster cast padding or synthetic fiberglass casts.";
      break;

    case "skin-traction-kit":
      features = [
        "Complete ready-to-use kit for quick clinical application",
        "High-friction foam lining prevents slipping and migration",
        "Hypoallergenic adhesive strip secures to skin safely",
        "Equipped with strong extension straps and spreader plate",
        "Excellent ventilation properties to protect skin integrity"
      ];
      specifications = {
        "Kit Components": "Foam padding, adhesive straps, cords, crepe bandage, spreader plate",
        "Sizes": "Adult, Pediatric",
        "Adhesive Type": "Medical-grade hypoallergenic acrylic",
        "Color": "Beige / Cream"
      };
      usage = "Used to maintain alignment of bone fractures, relieve muscle spasms, or stabilize hip and thigh injuries prior to surgery.";
      break;

    case "orthopedic-gauze":
      features = [
        "Woven from high-grade cotton yarn with open mesh",
        "Exceptional absorbency for blood and exudates",
        "Soft folds reduce trauma to fragile wound beds",
        "Highly breathable structure accelerates wound healing",
        "No loose threads or fraying edges"
      ];
      specifications = {
        "Material": "100% Pure Woven Cotton Gauze",
        "Mesh Size": "19 x 15 / 24 x 20 threads per inch",
        "Dimensions": "90cm x 5m / 90cm x 10m rolls",
        "Ply Options": "2-Ply, 4-Ply folded"
      };
      usage = "Perfect for heavy surgical dressings, wound packing, cleaning, and absorbing exudates in orthopedic procedures.";
      break;

    case "bandages":
      features = [
        "Premium stretch and recovery power for reliable compression",
        "Soft and breathable structure prevents skin maceration",
        "Washable and reusable without losing elasticity",
        "Finished non-fray edges for long-lasting durability",
        "Includes secure metal fixing clips"
      ];
      specifications = {
        "Type": "Crepe Compression Bandage",
        "Material": "Cotton and elastic blend",
        "Sizes": "6cm, 8cm, 10cm, 15cm widths",
        "Stretched Length": "4.5 meters"
      };
      usage = "Provides therapeutic compression and support for sprains, strains, varicose veins, joint injuries, and secure dressing retention.";
      break;

    case "sponge-pad":
      features = [
        "Pre-sterilized for operating room and sterile environments",
        "Dense gauze structure absorbs large volumes of fluids",
        "Radiopaque X-ray detectable thread woven in for safety",
        "Soft and lint-free to minimize wound contamination",
        "Individually packaged to preserve absolute sterility"
      ];
      specifications = {
        "Material": "100% Bleached Cotton Gauze",
        "Sterilization Method": "EO (Ethylene Oxide) Sterilized",
        "Sizes": "10cm x 10cm, 15cm x 15cm",
        "X-ray Thread": "Blue barium sulfate radiopaque thread",
        "Ply": "12-Ply / 16-Ply"
      };
      usage = "Used in operating theatres (OT) to control bleeding, clean surgical sites, and absorb blood and fluids during surgical interventions.";
      break;

    case "gamjee-roll":
      features = [
        "High-density absorbent cotton layer between gauze wraps",
        "Thick protective cushion reduces compression sores",
        "Accelerates healing by drawing discharge away from wounds",
        "Prevents external contaminants from reaching the wound",
        "Easily cut and molded to body contours"
      ];
      specifications = {
        "Material": "Surgical grade cotton wool inside cotton gauze sleeve",
        "Width": "10cm, 15cm, 20cm, 30cm",
        "Roll Weight": "250g / 500g",
        "Absorbency Rate": "Under 5 seconds"
      };
      usage = "Mainly used for heavy exuding wounds, post-operative padding, burns dressing, and providing cushioning to primary dressings.";
      break;

    case "surgical-dressing":
      features = [
        "Comprehensive assortment of sterile dressing materials",
        "Superior absorption and fluid containment",
        "Breathable design protects wound bed moisture levels",
        "Non-adherent layers minimize pain during removal",
        "Hygienically packaged in medical-grade paper pouch"
      ];
      specifications = {
        "Included Items": "Sterile cotton pads, gauze swabs, non-adherent dressings, surgical tape",
        "Sterility": "Sterile EO",
        "Application": "General post-op wound care"
      };
      usage = "Designed for clinics and hospitals to handle routine wound dressings, surgical cut dressings, and trauma care.";
      break;

    case "doctor-coats":
      features = [
        "Tailored from high-quality, durable poly-cotton blend",
        "Bleach-resistant fabric maintains crisp white appearance",
        "Three convenient pockets (one chest, two patch pockets)",
        "Side slits for easy access to trouser pockets",
        "Comfortable relaxed fit suitable for long shifts"
      ];
      specifications = {
        "Material": "65% Polyester, 35% Cotton (200 GSM)",
        "Sizing": "Unisex (S, M, L, XL, XXL)",
        "Wash Type": "Machine washable, autoclavable",
        "Color": "Crisp White"
      };
      usage = "Worn by doctors, medical students, lab technicians, and healthcare professionals to maintain a sterile, professional look.";
      break;

    case "nurse-uniforms":
      features = [
        "Ergonomically designed for maximum mobility and comfort",
        "Sweat-absorbent and breathable fabric",
        "Reinforced double-stitched seams for extra durability",
        "Functional design with deep utility pockets",
        "Colors match standard hospital color coding"
      ];
      specifications = {
        "Material": "Premium cotton-polyester scrub fabric",
        "Set Includes": "Scrub Top + Scrub Trousers",
        "Sizes": "S to 3XL",
        "Colors": "Light Blue, Navy Blue, Hospital Green"
      };
      usage = "Ideal for nursing staff, ward boy uniforms, and medical assistants for active everyday hospital duties.";
      break;

    case "ot-dresses":
      features = [
        "Unisex scrub suit designed for sterile operating theatres",
        "Breathable and lightweight material prevents heat buildup",
        "Side ties or elastic waistband for secure customizable fit",
        "Autoclavable fabric withstands high-temp sterilization",
        "Lint-free construction minimizes fiber release in OT"
      ];
      specifications = {
        "Material": "65% Polyester, 35% Cotton comfort blend",
        "Color Options": "OT Green, Surgeon Blue",
        "Sizing": "S, M, L, XL, XXL",
        "Sterility": "Non-sterile (intended to be autoclaved before OT)"
      };
      usage = "Mandatory sterile wear for surgeons, anesthesiologists, OT assistants, and nursing staff in surgical zones.";
      break;

    case "staff-uniforms":
      features = [
        "Comfortable fit for support staff, receptionists, and ward boys",
        "Stain-resistant fabric withstands rigorous industrial washing",
        "Smart professional design aligns with corporate hospital themes",
        "Custom embroidery of hospital logo available",
        "Color-fast dyes prevent fading over long term"
      ];
      specifications = {
        "Material": "Durable cotton-polyester blend fabric",
        "Types": "Tunic & trousers, or corporate collared shirts",
        "Sizes": "Custom and standard sizes (S - 4XL)"
      };
      usage = "Used to establish a clean unified corporate identity for utility, administration, and hospital ward staff.";
      break;

    default:
      // Fallback defaults for general categories
      if (product.category === "essentials") {
        features = [
          "Manufactured using certified medical grade polymers",
          "Single-use design guarantees maximum hygiene safety",
          "Toxin-free, latex-free, and hypoallergenic materials",
          "Hygienically packed to prevent contamination",
          "Eco-friendly materials compatible with standard medical waste disposal"
        ];
        specifications = {
          "Material": "Medical-grade non-toxic materials",
          "Usage Type": "Disposable / Single-Use",
          "Sterility": "Hygienically manufactured, ready-for-use",
          "Packaging": "Bulk clinical packs"
        };
        usage = "Essential daily supplies used in wards, emergency rooms, outpatient units, and nursing departments for basic patient care.";
      } else {
        features = [
          "Premium materials tested for healthcare applications",
          "Strict quality control during manufacturing",
          "Designed for durability and patient comfort",
          "Cost-effective supply solution for clinics and hospitals",
          "ISO compliant manufacturing standards"
        ];
        specifications = {
          "Product Class": "Class A Medical Supply",
          "Standards": "ISO Compliant Quality",
          "Packaging": "Standard clinic packing"
        };
        usage = "General medical and surgical consumables for clinical dressing, nursing, and orthopedic support services.";
      }
      break;
  }

  return {
    ...product,
    gallery,
    features,
    specifications,
    usage
  };
}
