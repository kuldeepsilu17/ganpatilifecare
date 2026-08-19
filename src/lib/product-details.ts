import { Product } from "./data";

export interface EnrichedProduct extends Product {
  gallery: string[];
  features: string[];
  specifications: Record<string, string>;
  usage: string;
  packaging?: string;
  bulkAvailable?: boolean;
  seoContent?: string;
  faqs?: { q: string; a: string }[];
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
  let packaging = "Standard medical packaging / Bulk cartons available";
  let seoContent = "";
  let faqs: { q: string; a: string }[] = [];
  const bulkAvailable = true;

  // Build gallery based on category
  if (product.category === "orthopedic") {
    gallery.push(cottonImg, collectionImg);
  } else if (product.category === "surgical") {
    gallery.push(spongeImg, bandageImg);
  } else if (product.category === "uniforms") {
    gallery.push(uniformImg, collectionImg);
  } else {
    gallery.push(collectionImg, spongeImg);
  }

  gallery = Array.from(new Set(gallery.filter(Boolean)));

  switch (product.id) {
    case "orthocot-cotton-roll":
      features = [
        "100% natural, highly absorbent pure cotton fibers",
        "Soft and non-irritating texture suitable for sensitive skin",
        "Free from impurities, loose lint, and harsh optical agents",
        "Uniformly layered for smooth unwinding and application",
        "Autoclavable for sterile medical procedures"
      ];
      specifications = {
        "Material": "100% Medical Cotton",
        "Roll Weights": "100g, 200g, 300g, 500g",
        "Color": "Natural White",
        "Sterility": "Non-Sterile (Autoclavable)"
      };
      usage = "Orthopedic padding under plaster casts, wound cleansing, surgical preparation, and general clinical fluid absorption.";
      packaging = "Individual paper roll wrapping, master carton packs for hospital supply.";
      seoContent = "The Orthocot Cotton Roll supplied by Ganpati Lifecare is a staple in orthopedic and surgical departments across Rajasthan and North India. Known for its pure, highly absorbent 100% medical-grade cotton, it provides exceptional padding under plaster of Paris and synthetic casts. Hospitals in Hanumangarh, Ganganagar, and Bikaner trust our cotton rolls because they are free from impurities and harsh optical bleaching agents, drastically reducing the risk of patient skin irritation. Furthermore, its uniformly layered texture ensures smooth unwinding, preventing lumps that could cause pressure sores under casts. Whether used for heavy wound exudate absorption or surgical preparation, Ganpati Lifecare guarantees bulk availability and consistent quality.";
      faqs = [
        { q: "Is the Orthocot Cotton Roll suitable for cast padding?", a: "Yes, it is designed specifically for orthopedic cast padding, providing a soft, uniform layer between the skin and the plaster or synthetic cast." },
        { q: "Can the cotton roll be sterilized?", a: "Yes, our medical-grade cotton rolls are autoclavable and can be safely sterilized for surgical use." },
        { q: "What sizes do you supply?", a: "We offer bulk rolls in 100g, 200g, 300g, and 500g weights to accommodate various clinical needs." }
      ];
      break;

    case "stockinet":
      features = [
        "Elastic rib-knit structure providing comfortable, non-constrictive fit",
        "Soft breathable cotton protects skin against friction",
        "Seamless circular knit prevents pressure marks",
        "Can be cut to required length without fraying edges",
        "Skin-friendly and hypoallergenic"
      ];
      specifications = {
        "Material": "Stretch Rib-Knit Cotton",
        "Available Widths": "2 inch, 3 inch, 4 inch, 6 inch",
        "Roll Length": "10 meter rolls",
        "Sterility": "Non-Sterile"
      };
      usage = "First layer of protection under synthetic and plaster of Paris casts, orthopedic dressing liners, and joint support.";
      packaging = "Polybag roll packaging, bulk hospital packs.";
      seoContent = "Ganpati Lifecare's Stockinet is an essential first-layer orthopedic dressing used extensively in clinics and trauma centers across Rajasthan. Engineered with a seamless circular rib-knit, this stretchable cotton tubular bandage acts as a protective interface between the patient's skin and casting materials. It efficiently wicks away moisture, remains highly breathable, and completely prevents friction and pressure marks during the healing process. Orthopedic surgeons in Hanumangarh and surrounding areas rely on our stockinets because they can be easily cut to any length without unraveling, ensuring a perfect fit for pediatric and adult patients alike.";
      faqs = [
        { q: "What is the primary use of a stockinet?", a: "It is used as the first layer of skin protection before applying cast padding and a rigid plaster or fiberglass cast." },
        { q: "Does the material stretch?", a: "Yes, the rib-knit structure allows it to stretch and conform comfortably to various body contours without constricting blood flow." },
        { q: "Is it hypoallergenic?", a: "Absolutely. It is made from soft, breathable cotton that is skin-friendly and ideal for prolonged wear under casts." }
      ];
      break;

    case "skin-traction-kit":
      features = [
        "Complete ready-to-apply kit for rapid clinical deployment",
        "High-friction foam padding prevents slippage and skin shearing",
        "Hypoallergenic adhesive strip for secure patient adhesion",
        "Includes strong extension cords and spreader plate",
        "Breathable design to protect skin health during treatment"
      ];
      specifications = {
        "Components": "Foam pad, adhesive strap, cords, spreader plate, crepe bandage",
        "Sizes": "Adult & Pediatric",
        "Application": "Adhesive & Non-Adhesive options"
      };
      usage = "Used to maintain alignment of bone fractures, relieve muscle spasms, and stabilize hip and lower limb injuries prior to surgery.";
      packaging = "Individually boxed complete kit, clinic master packs.";
      seoContent = "When treating lower limb fractures and severe muscle spasms, immediate and secure stabilization is critical. The Skin Traction Kit from Ganpati Lifecare provides everything a trauma center needs for rapid patient immobilization. Our kits include a high-friction foam pad, a heavy-duty spreader plate, extension cords, and a premium crepe bandage. Available in both adhesive and non-adhesive formats for adult and pediatric patients, these kits are designed to prevent skin shearing while maintaining continuous traction. Supplied to leading hospitals in Rajasthan, our traction kits ensure patient comfort and proper bone alignment prior to surgical intervention.";
      faqs = [
        { q: "Do you supply both adhesive and non-adhesive traction kits?", a: "Yes, Ganpati Lifecare supplies both adhesive and non-adhesive skin traction kits to suit different patient skin sensitivities." },
        { q: "Are all components included in one box?", a: "Yes, each kit is a complete, ready-to-use package including the foam pad, spreader plate, cords, and crepe bandage." },
        { q: "Is the adhesive hypoallergenic?", a: "Yes, the adhesive used in our kits is formulated to minimize skin irritation during prolonged traction therapy." }
      ];
      break;

    case "orthopedic-gauze-bandages":
    case "orthopedic-gauze":
      features = [
        "Woven from quality cotton yarn with balanced open mesh",
        "High fluid absorption capacity for blood and exudates",
        "Soft weave reduces trauma upon removal from wounds",
        "Allows optimal air circulation to promote healing",
        "Clean cut edges with minimal fraying"
      ];
      specifications = {
        "Material": "100% Woven Cotton Gauze",
        "Dimensions": "90cm x 5m / 90cm x 10m rolls",
        "Ply": "2-Ply & 4-Ply folded"
      };
      usage = "Primary and secondary wound dressing, orthopedic padding, surgical packing, and general clinical absorbency.";
      packaging = "Moisture-sealed paper wrapping, hospital bundles.";
      seoContent = "Orthopedic Gauze Bandages are indispensable in any surgical, orthopedic, or trauma setting. Ganpati Lifecare supplies premium woven cotton gauze that features a balanced open mesh design, allowing for maximum fluid absorbency while ensuring vital air circulation to the wound site. Medical professionals across Hanumangarh trust our gauze rolls for surgical packing, secondary dressing retention, and heavy exudate management. The soft weave significantly reduces trauma to the healing tissue upon removal, and the carefully cut edges prevent loose threads from contaminating the wound bed.";
      faqs = [
        { q: "Is the gauze highly absorbent?", a: "Yes, it is manufactured from 100% medical cotton yarn designed for rapid absorption of blood and wound exudate." },
        { q: "What sizes do the gauze bandages come in?", a: "We typically supply them in 90cm widths and lengths of 5 meters or 10 meters, folded in 2-ply or 4-ply formats." },
        { q: "Can these be sterilized?", a: "Yes, our gauze rolls can be subjected to standard hospital autoclaving and sterilization protocols." }
      ];
      break;

    case "bandages":
      features = [
        "Durable elasticity offering consistent, controlled compression",
        "Soft and breathable texture to avoid patient discomfort",
        "Washable and reusable for extended support",
        "Firm woven borders prevent unraveling",
        "Non-slip weave holds firmly over joints and limbs"
      ];
      specifications = {
        "Material": "Cotton and elastic blend yarn",
        "Widths": "5cm, 7.5cm, 10cm, 15cm",
        "Length": "Stretched length 4m / 5m"
      };
      usage = "Joint support, sprain treatment, compression dressing, and retention of surgical dressings on limbs.";
      packaging = "Individual cello wrapping with clip fasteners, wholesale box pack.";
      seoContent = "From treating severe joint sprains to securing surgical dressings, Ganpati Lifecare's medical bandages offer reliable, controlled compression. Our crepe and elastic bandages are woven from a premium cotton-elastic blend, providing consistent pressure without constricting blood flow. The breathable fabric minimizes skin maceration, and the durable woven edges prevent the bandage from fraying even after repeated use and washing. Healthcare facilities in Rajasthan source our bandages for emergency rooms, physiotherapy clinics, and general wards due to their exceptional durability and patient comfort.";
      faqs = [
        { q: "Are these bandages washable and reusable?", a: "Yes, our elastic and crepe bandages are designed to retain their elasticity and structure even after washing, making them highly cost-effective." },
        { q: "Do the bandages come with fastening clips?", a: "Yes, each individually wrapped bandage roll includes secure fastening clips." },
        { q: "What widths are available?", a: "We supply bandages in standard medical widths including 5cm, 7.5cm, 10cm, and 15cm." }
      ];
      break;

    case "sponge-pad":
      features = [
        "High-density absorbent surgical gauze pads",
        "Folded edges prevent loose threads from entering the wound bed",
        "Rapid absorption rate for fluids and surgical exudate",
        "Soft and lint-free for clean surgical procedures",
        "Sterile and non-sterile options available"
      ];
      specifications = {
        "Material": "100% Bleached Surgical Cotton Gauze",
        "Sizes": "10cm x 10cm, 15cm x 15cm",
        "Ply Options": "8-Ply, 12-Ply, 16-Ply"
      };
      usage = "Surgical incision cleaning, operating theatre fluid absorption, and primary sterile wound dressings.";
      packaging = "Sterile peel-open pouches / clinic multi-packs.";
      seoContent = "Sponge pads (also known as gauze swabs) are the workhorses of the operating theatre and wound care clinics. Ganpati Lifecare supplies high-density, bleached surgical cotton sponge pads that guarantee rapid absorption of surgical fluids. A critical feature of our sponge pads is their folded inner edges, which ensure that absolutely no loose threads or lint are left behind in the surgical site—a vital requirement for preventing postoperative infections. Available in various plies (8-ply, 12-ply, 16-ply) and supplied across hospitals in Rajasthan, these pads are a trusted choice for surgeons and nursing staff.";
      faqs = [
        { q: "Are the edges folded in?", a: "Yes, all edges are carefully folded inward to prevent lint and loose threads from contaminating wounds." },
        { q: "Are sterile options available?", a: "We supply both non-sterile bulk packs for clinic autoclaving and pre-sterilized peel-open pouches for immediate OT use." },
        { q: "What ply thickness do you offer?", a: "Our sponge pads are available in 8-ply, 12-ply, and highly absorbent 16-ply variations." }
      ];
      break;

    case "gamjee-roll":
      features = [
        "Thick absorbent cotton wool enclosed in a fine gauze sleeve",
        "High cushioning capacity to protect fragile wounds",
        "Excellent absorbency for heavy wound exudates",
        "Easily trimmed to fit various anatomical regions",
        "Conforms softly to body contours"
      ];
      specifications = {
        "Material": "Absorbent cotton padding with gauze covering",
        "Widths": "10cm, 15cm, 20cm",
        "Roll Weights": "250g, 500g"
      };
      usage = "Post-operative heavy exudate management, burn dressings, and protective cushioning under orthopedic casts.";
      packaging = "Protective paper/poly wrap rolls, bulk cartons.";
      seoContent = "The Gamjee Roll is an essential highly absorbent surgical dressing utilized for managing heavily exuding wounds and providing thick protective cushioning. Ganpati Lifecare's Gamjee rolls consist of a thick layer of premium absorbent cotton wool tightly encased in an absorbent, non-irritating gauze sleeve. This structure not only absorbs copious amounts of fluid—making it ideal for post-operative trauma care and burn dressings—but also provides excellent mechanical protection to the wound site. Supplied to hospitals throughout North India, our Gamjee rolls can be easily cut to fit any anatomical contour.";
      faqs = [
        { q: "What is a Gamjee Roll used for?", a: "It is primarily used for dressing heavily weeping wounds, burn care, and providing thick cushioning under orthopedic casts." },
        { q: "Is the outer layer made of gauze?", a: "Yes, it features a thick cotton wool core securely enclosed within a fine surgical gauze sleeve." },
        { q: "Can it be cut to size?", a: "Yes, it can be easily trimmed to the required length without the core cotton falling out." }
      ];
      break;

    case "surgical-dressing-materials":
    case "surgical-dressing":
      features = [
        "Comprehensive dressing materials designed for clinical hygiene",
        "High tensile strength and dependable absorbency",
        "Non-adherent surface layers to reduce pain during dressing changes",
        "Conforms easily around awkward wound sites"
      ];
      specifications = {
        "Product Type": "Surgical dressing pads and rolls",
        "Sterility": "Sterile & Autoclavable grades",
        "Material": "Medical grade cotton and non-woven fabric"
      };
      usage = "Trauma care, surgical wound coverage, outpatient dressing changes, and clinical nursing.";
      packaging = "Sterile individual packs & clinic bulk assortments.";
      seoContent = "For safe, hygienic, and effective wound management, hospitals rely on Ganpati Lifecare's comprehensive range of surgical dressing materials. Our surgical dressings are engineered to offer high tensile strength and superior fluid handling capacity while maintaining a non-adherent surface. This prevents the dressing from sticking to the healing tissue, significantly reducing patient trauma and pain during dressing changes. We supply a wide variety of sterile and non-sterile surgical dressings to meet the rigorous demands of trauma centers, outpatient clinics, and surgical wards across Rajasthan.";
      faqs = [
        { q: "Do these dressings stick to the wound?", a: "Our premium surgical dressings feature non-adherent layers designed to minimize sticking and reduce pain during removal." },
        { q: "Are they suitable for post-surgical care?", a: "Yes, they are manufactured specifically for post-operative surgical wound coverage and trauma care." },
        { q: "Can I order mixed bulk cartons?", a: "Absolutely. We supply customizable bulk orders for hospitals that require a variety of surgical dressing types." }
      ];
      break;

    case "doctor-coats":
    case "doctor-apparel":
      features = [
        "Tailored from durable, breathable poly-cotton blend fabric",
        "Stain-resistant and easy to launder for daily clinical use",
        "Features functional chest and side utility pockets",
        "Smart tailored fit with comfortable movement",
        "Colorfast fabric retains crisp white finish"
      ];
      specifications = {
        "Fabric": "65% Polyester, 35% Cotton (Durable Twill)",
        "Sizes": "S, M, L, XL, XXL",
        "Sleeve": "Full Sleeve & Half Sleeve options",
        "Color": "Medical White"
      };
      usage = "Daily clinical consultations, hospital ward rounds, laboratory work, and professional medical staff wear.";
      packaging = "Individual polybag packaging, institutional bulk packs.";
      seoContent = "A doctor's coat is a symbol of medical professionalism and hygiene. Ganpati Lifecare manufactures premium Doctor Coats tailored from a high-quality, durable poly-cotton twill blend. Designed specifically for the rigorous environment of Indian hospitals, these coats are breathable, stain-resistant, and can withstand frequent high-temperature industrial laundering without losing their crisp white finish. Featuring reinforced stitching, deep utility pockets for stethoscopes and pens, and available in both half and full sleeves, our doctor coats ensure comfort during long hospital ward rounds and clinical consultations.";
      faqs = [
        { q: "What fabric is used for the doctor coats?", a: "We use a premium 65% Polyester and 35% Cotton twill blend, offering the perfect balance of durability, stain resistance, and breathability." },
        { q: "Do you supply both half and full sleeve options?", a: "Yes, we manufacture and supply both full-sleeve and half-sleeve doctor coats based on preference." },
        { q: "Can these coats withstand hospital laundry?", a: "Yes, the fabric is heavy-duty and colorfast, specifically chosen to endure harsh institutional washing." }
      ];
      break;

    case "nurse-uniforms":
      features = [
        "Ergonomically designed for long hospital shifts and mobility",
        "Sweat-absorbent, lightweight, and durable fabric blend",
        "Reinforced double stitching on stress points",
        "Spacious utility pockets for clinical tools",
        "Available in multiple standard hospital department colors"
      ];
      specifications = {
        "Set Includes": "Scrub Top & Comfortable Trousers",
        "Fabric": "Poly-Cotton Medical Scrub Fabric",
        "Sizes": "S to 3XL",
        "Color Options": "Light Blue, Navy Blue, Hospital Green"
      };
      usage = "Nursing staff, medical attendants, and clinical support teams across hospitals and nursing homes.";
      packaging = "Individual set packing, institutional order packaging.";
      seoContent = "Nursing staff require uniforms that support them through grueling 12-hour shifts. Ganpati Lifecare provides Nurse Uniforms that are ergonomically designed for maximum mobility, comfort, and clinical utility. Manufactured using a lightweight, sweat-absorbent poly-cotton scrub fabric, our uniforms keep staff cool and comfortable. Each uniform features reinforced double stitching at high-stress points and spacious pockets for carrying essential medical tools. Available in standard hospital colors (such as Light Blue, Navy Blue, and Green), we supply major nursing homes and healthcare facilities across Rajasthan.";
      faqs = [
        { q: "Are the uniforms comfortable for 12-hour shifts?", a: "Yes, they are specifically designed with a lightweight, breathable fabric and a relaxed fit to ensure all-day comfort." },
        { q: "Can we order customized colors for our hospital departments?", a: "Yes, for bulk institutional orders, we can supply uniforms in specific colors to match your hospital's department coding." },
        { q: "Does the set include both top and bottom?", a: "Yes, the standard nurse uniform set includes a scrub top and matching comfortable trousers." }
      ];
      break;

    case "ot-dresses":
      features = [
        "Designed for sterile operating theatre (OT) protocols",
        "Lightweight, breathable fabric prevents heat buildup during long surgeries",
        "Comfortable unisex cut with secure waist ties/elastic",
        "Autoclave-safe material suitable for repeated sterilization",
        "Low-linting construction to maintain clean OT environment"
      ];
      specifications = {
        "Type": "Unisex OT Scrub Suit (Top + Trousers)",
        "Fabric": "Autoclavable Medical Poly-Cotton",
        "Sizes": "S, M, L, XL, XXL",
        "Color Options": "Surgeon Green, OT Blue"
      };
      usage = "Surgeons, anesthesiologists, OT nurses, and surgical assistants in operating rooms.";
      packaging = "Individual set poly packaging, hospital bulk carton.";
      seoContent = "Operating Theatre (OT) environments demand stringent hygiene, zero linting, and absolute comfort for surgeons performing long procedures. Ganpati Lifecare's OT Dresses and surgical scrub suits are meticulously crafted from autoclave-safe, low-linting medical fabric. The breathable poly-cotton material prevents heat buildup under heavy surgical gowns and bright OT lights. With a comfortable unisex cut, reversible V-necks, and secure waist ties, our OT dresses are the preferred choice for surgeons, anesthesiologists, and OT technicians in surgical centers across Hanumangarh and beyond.";
      faqs = [
        { q: "Are the OT dresses autoclave-safe?", a: "Yes, the fabric is specifically chosen to withstand repeated high-temperature hospital sterilization processes (autoclaving)." },
        { q: "Is the fabric low-linting?", a: "Absolutely. A low-linting construction is critical for operating theatres to prevent airborne contamination of surgical sites." },
        { q: "What colors are standard for OT dresses?", a: "We primarily supply Surgeon Green and OT Blue, which help reduce eye strain under bright surgical lights." }
      ];
      break;

    case "staff-uniforms":
      features = [
        "Durable, stain-resistant fabric for hospital maintenance and support staff",
        "Comfortable relaxed fit for active daily physical duties",
        "Withstands heavy industrial laundering without shrinking",
        "Custom embroidery of hospital/clinic name available",
        "Smart professional design creating unified institutional identity"
      ];
      specifications = {
        "Fabric": "Heavy-duty cotton-polyester blend",
        "Styles": "Tunic & Trousers / Collared Uniform",
        "Sizes": "S, M, L, XL, XXL, 3XL"
      };
      usage = "Ward boys, housekeeping, maintenance, and administrative support personnel in healthcare facilities.";
      packaging = "Bulk supply cartons, individually folded.";
      seoContent = "A hospital relies heavily on its support staff—from ward boys to housekeeping and maintenance personnel. Ganpati Lifecare provides robust Staff Uniforms designed to endure the physical demands of daily hospital operations. Made from a heavy-duty, stain-resistant fabric blend, these uniforms maintain a professional, unified institutional appearance even after months of rigorous industrial laundering. We offer various styles including tunic sets and collared uniforms, and support bulk procurement for healthcare institutions looking to standardize their support staff apparel.";
      faqs = [
        { q: "Are these uniforms suitable for hospital housekeeping staff?", a: "Yes, the durable and stain-resistant fabric makes them perfect for housekeeping, maintenance, and ward staff." },
        { q: "Do the uniforms shrink after washing?", a: "No, the heavy-duty poly-cotton blend is pre-shrunk and highly resistant to shrinking during institutional washing." },
        { q: "Can we get custom embroidery for our hospital logo?", a: "Yes, for bulk orders, we can accommodate custom hospital logo embroidery." }
      ];
      break;

    case "medical-disposables":
      features = [
        "Hygienic single-use disposable healthcare products",
        "Minimizes cross-contamination in clinics and wards",
        "Manufactured according to medical hygiene standards",
        "Easy disposal and sterile handling"
      ];
      specifications = {
        "Product Class": "Single-Use Medical Disposables",
        "Assortment": "Disposable caps, shoe covers, examination gloves, masks",
        "Sterility": "Sterile and Non-Sterile variants"
      };
      usage = "Outpatient clinics, intensive care units, diagnostic laboratories, and hospital examination rooms.";
      packaging = "Dispenser boxes and bulk carton packaging.";
      seoContent = "Infection control is the highest priority in any healthcare setting. Ganpati Lifecare supplies a comprehensive range of Medical Disposables designed to break the chain of infection and ensure patient safety. Our catalog includes high-quality surgical masks, bouffant caps, shoe covers, examination gloves, and disposable bed sheets. Supplied in bulk to ICUs, diagnostic laboratories, and outpatient clinics across Rajasthan, our single-use products are manufactured under strict hygiene protocols to guarantee reliable barrier protection for both healthcare workers and patients.";
      faqs = [
        { q: "What items are included in your medical disposables category?", a: "We supply a wide range including face masks, surgeon caps, shoe covers, examination gloves, and disposable aprons." },
        { q: "Are these items latex-free?", a: "We offer both latex and nitrile (latex-free) examination gloves depending on hospital requirements." },
        { q: "Do you sell in bulk cartons to hospitals?", a: "Yes, all medical disposables are available in high-volume dispenser boxes and master cartons at wholesale prices." }
      ];
      break;

    case "hospital-consumables":
      features = [
        "Everyday clinical consumables for routine patient care",
        "Reliable quality ensuring safety and ease of use",
        "Available in high-volume institutional packaging",
        "Cost-effective supply solution for healthcare facilities"
      ];
      specifications = {
        "Category": "General Hospital Consumables",
        "Range": "Cotton rolls, gauze, syringes, IV supplies, tape",
        "Supply Type": "Bulk procurement"
      };
      usage = "Hospitals, nursing homes, clinics, and first-aid centers for daily medical treatments.";
      packaging = "Institutional bulk cartons with secure moisture protection.";
      seoContent = "The daily operation of a hospital or clinic requires a steady, dependable supply of consumables. Ganpati Lifecare is the trusted vendor for Hospital Consumables across Goluwala, Hanumangarh, and greater Rajasthan. We supply everything from medical tapes, IV cannulas, and syringes to diagnostic supplies and general first-aid materials. By sourcing directly from our wholesale network, healthcare administrators can significantly reduce their procurement costs without ever compromising on clinical safety or product quality. Contact us today for a comprehensive bulk quotation tailored to your hospital's monthly needs.";
      faqs = [
        { q: "Can you supply an entire hospital's monthly consumable requirement?", a: "Yes, we act as a central supplier for many hospitals, fulfilling their complete monthly inventory of routine consumables." },
        { q: "Are the products compliant with medical standards?", a: "Absolutely. All clinical consumables we supply meet strict healthcare-grade quality and safety standards." },
        { q: "How fast is your delivery for bulk consumable orders?", a: "We pride ourselves on prompt dispatch and maintain ready stock for rapid delivery across North India." }
      ];
      break;

    default:
      features = [
        "Quality-tested materials for clinical healthcare environments",
        "Reliable performance for hospitals, clinics, and doctors",
        "Cost-effective bulk supply options",
        "Prompt dispatch and supply assurance"
      ];
      specifications = {
        "Product Category": "Medical & Surgical Supply",
        "Sourcing": "Quality-checked healthcare grade",
        "Supply Option": "Wholesale & Bulk Orders"
      };
      usage = "General medical, surgical, and healthcare applications across hospitals and clinical facilities.";
      packaging = "Standard clinical packaging.";
      seoContent = "Ganpati Lifecare is a premier supplier of medical, surgical, and orthopedic products in Rajasthan. We guarantee exceptional quality, strict medical compliance, and reliable bulk supply for all our products. Hospitals, nursing homes, and clinical distributors trust us for our competitive pricing and unwavering commitment to healthcare excellence.";
      faqs = [
        { q: "Do you supply this product in bulk?", a: "Yes, Ganpati Lifecare specializes in wholesale and bulk institutional supply." },
        { q: "How can I request a quotation?", a: "You can request a quote directly via WhatsApp or by calling our sales team." }
      ];
      break;
  }

  return {
    ...product,
    gallery,
    features,
    specifications,
    usage,
    packaging,
    bulkAvailable,
    seoContent,
    faqs
  };
}
