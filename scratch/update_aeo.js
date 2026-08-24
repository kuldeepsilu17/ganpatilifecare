const fs = require('fs');
let code = fs.readFileSync('src/lib/product-details.ts', 'utf8');

code = code.replace(
  'seoContent?: string;',
  'seoContent?: string;\n  aeoSections?: { title: string; content: string }[];'
);

code = code.replace(
  'let seoContent = "";',
  'let seoContent = "";\n  let aeoSections: { title: string; content: string }[] = [];'
);

code = code.replace(
  'seoContent,\n    faqs',
  'seoContent,\n    aeoSections,\n    faqs'
);

const replacements = [
  {
    id: 'orthocot-cotton-roll',
    aeo: `      aeoSections = [
        { title: "What is Orthocot Cotton Roll?", content: "Orthocot Cotton Roll is a premium, 100% natural, highly absorbent medical-grade cotton roll supplied by Ganpati Lifecare in Goluwala, Hanumangarh." },
        { title: "What is it used for?", content: "It is primarily used as soft padding under orthopedic plaster casts, for heavy wound exudate absorption, and general surgical preparation." },
        { title: "What type of product is it?", content: "It is an orthopedic and surgical consumable, free from impurities and harsh optical agents, making it completely skin-friendly." },
        { title: "Who typically purchases it?", content: "Orthopedic surgeons, trauma centers, hospitals, and outpatient clinics across Rajasthan." },
        { title: "What variants are actually available?", content: "We supply bulk rolls in 100g, 200g, 300g, and 500g weights." },
        { title: "Where does Ganpati Lifecare serve?", content: "We supply directly to Hanumangarh, Sri Ganganagar, and across North Rajasthan." }
      ];`
  },
  {
    id: 'stockinet',
    aeo: `      aeoSections = [
        { title: "What is Stockinet?", content: "Stockinet is a soft, breathable, stretchable tubular cotton bandage supplied by Ganpati Lifecare for orthopedic care." },
        { title: "What is it used for?", content: "It acts as a protective first-layer interface between the patient's skin and synthetic or plaster casting materials to prevent friction and pressure sores." },
        { title: "What type of product is it?", content: "It is an orthopedic dressing liner knitted with a seamless circular rib-knit structure." },
        { title: "Who typically purchases it?", content: "Orthopedic departments, fracture clinics, and trauma hospitals." },
        { title: "What variants are actually available?", content: "Available in 10-meter rolls with widths of 2 inch, 3 inch, 4 inch, and 6 inch." },
        { title: "Where does Ganpati Lifecare serve?", content: "We distribute medical supplies throughout Goluwala, Hanumangarh, and regional healthcare networks." }
      ];`
  },
  {
    id: 'skin-traction-kit',
    aeo: `      aeoSections = [
        { title: "What is a Skin Traction Kit?", content: "A Skin Traction Kit is a complete, ready-to-apply orthopedic stabilization kit provided by Ganpati Lifecare." },
        { title: "What is it used for?", content: "It is used to stabilize hip and lower limb injuries, maintain bone alignment, and relieve severe muscle spasms prior to surgical intervention." },
        { title: "What type of product is it?", content: "It is an emergency trauma and orthopedic immobilization product that includes a foam pad, spreader plate, cords, and crepe bandage." },
        { title: "Who typically purchases it?", content: "Emergency rooms, orthopedic trauma centers, and major hospitals." },
        { title: "What variants are actually available?", content: "Supplied in both adhesive and non-adhesive formats for adult and pediatric patients." },
        { title: "How can a customer enquire?", content: "Hospitals can contact Ganpati Lifecare via our website quote form or direct WhatsApp for bulk pricing." }
      ];`
  },
  {
    id: 'orthopedic-gauze-bandages',
    aeo: `      aeoSections = [
        { title: "What are Orthopedic Gauze Bandages?", content: "Orthopedic Gauze Bandages are premium woven cotton gauze rolls with a balanced open mesh design, supplied by Ganpati Lifecare." },
        { title: "What are they used for?", content: "They are used for surgical wound packing, secondary dressing retention, and heavy fluid/exudate management in trauma care." },
        { title: "What type of product is it?", content: "It is a 100% medical cotton consumable that provides high absorbency and breathability to promote wound healing." },
        { title: "Who typically purchases it?", content: "Surgical wards, trauma units, and outpatient clinics." },
        { title: "What variants are actually available?", content: "We supply 90cm width rolls in 5-meter and 10-meter lengths, folded in 2-ply or 4-ply formats." },
        { title: "Where does Ganpati Lifecare serve?", content: "We supply surgical dressing materials to medical facilities in Hanumangarh, Rajasthan, and beyond." }
      ];`
  },
  {
    id: 'bandages',
    aeo: `      aeoSections = [
        { title: "What are Bandages?", content: "Bandages supplied by Ganpati Lifecare refer to medical-grade elastic and crepe bandages woven from a durable cotton-elastic blend." },
        { title: "What are they used for?", content: "They are used for joint support, sprain compression, and securing surgical dressings firmly on limbs." },
        { title: "What type of product is it?", content: "It is a reusable, washable compression dressing with firm woven borders to prevent unraveling." },
        { title: "Who typically purchases it?", content: "Physiotherapy centers, emergency wards, and general hospital dispensaries." },
        { title: "What variants are actually available?", content: "Available in stretched lengths of 4m and 5m, with widths ranging from 5cm to 15cm." }
      ];`
  },
  {
    id: 'sponge-pad',
    aeo: `      aeoSections = [
        { title: "What is a Sponge Pad?", content: "A Sponge Pad, also known as a gauze swab, is a high-density bleached surgical cotton pad supplied by Ganpati Lifecare." },
        { title: "What is it used for?", content: "It is used for cleaning surgical incisions, absorbing OT fluids, and acting as a primary sterile wound dressing." },
        { title: "What type of product is it?", content: "It is a surgical consumable featuring folded inner edges to guarantee a lint-free application in the wound bed." },
        { title: "Who typically purchases it?", content: "Operating theatres, surgical centers, and wound care clinics." },
        { title: "What variants are actually available?", content: "We offer 10x10cm and 15x15cm sizes in 8-ply, 12-ply, and highly absorbent 16-ply formats (sterile and non-sterile)." }
      ];`
  },
  {
    id: 'gamjee-roll',
    aeo: `      aeoSections = [
        { title: "What is a Gamjee Roll?", content: "A Gamjee Roll is a thick, highly absorbent surgical dressing consisting of cotton wool encased in a gauze sleeve, supplied by Ganpati Lifecare." },
        { title: "What is it used for?", content: "It is utilized for managing heavily exuding wounds, burn dressings, and providing protective cushioning under orthopedic casts." },
        { title: "What type of product is it?", content: "It is a heavy-duty wound care and padding consumable." },
        { title: "Who typically purchases it?", content: "Burn units, trauma centers, and orthopedic departments." },
        { title: "What variants are actually available?", content: "Available in 10cm, 15cm, and 20cm widths, in 250g and 500g roll weights." }
      ];`
  },
  {
    id: 'surgical-dressing-materials',
    aeo: `      aeoSections = [
        { title: "What are Surgical Dressing Materials?", content: "Surgical Dressing Materials encompass a comprehensive range of sterile and non-sterile wound care pads and rolls supplied by Ganpati Lifecare." },
        { title: "What are they used for?", content: "They are used for post-operative wound coverage, trauma care, and maintaining clinical hygiene during dressing changes." },
        { title: "What type of product is it?", content: "They are high-tensile, highly absorbent wound care products featuring non-adherent surface layers to reduce patient pain." },
        { title: "Who typically purchases it?", content: "Hospitals, nursing homes, and outpatient surgical clinics across Rajasthan." }
      ];`
  },
  {
    id: 'doctor-coats',
    aeo: `      aeoSections = [
        { title: "What are Doctor Coats?", content: "Doctor Coats are professional medical apparel tailored from a durable, breathable poly-cotton twill blend, manufactured by Ganpati Lifecare." },
        { title: "What are they used for?", content: "They are worn by medical professionals during clinical consultations, ward rounds, and laboratory work for hygiene and identity." },
        { title: "What type of product is it?", content: "It is a stain-resistant, colorfast hospital uniform designed to withstand harsh industrial laundering." },
        { title: "Who typically purchases it?", content: "Doctors, medical students, hospital administrators, and diagnostic labs." },
        { title: "What variants are actually available?", content: "Available in S to XXL sizes, with full-sleeve and half-sleeve options in Medical White." }
      ];`
  },
  {
    id: 'nurse-uniforms',
    aeo: `      aeoSections = [
        { title: "What are Nurse Uniforms?", content: "Nurse Uniforms are ergonomically designed medical scrub sets (top and trousers) supplied by Ganpati Lifecare." },
        { title: "What are they used for?", content: "They provide comfort, mobility, and hygiene for nursing staff during long, demanding hospital shifts." },
        { title: "What type of product is it?", content: "It is a sweat-absorbent, lightweight poly-cotton uniform featuring reinforced double stitching and utility pockets." },
        { title: "Who typically purchases it?", content: "Nursing homes, large hospitals, and clinical support teams." },
        { title: "What variants are actually available?", content: "Available in sizes S to 3XL, in standard colors like Light Blue, Navy Blue, and Hospital Green." }
      ];`
  },
  {
    id: 'ot-dresses',
    aeo: `      aeoSections = [
        { title: "What are OT Dresses?", content: "OT Dresses are specialized, sterile operating theatre scrub suits manufactured by Ganpati Lifecare." },
        { title: "What are they used for?", content: "They are worn by surgeons and OT staff to prevent airborne contamination and maintain a sterile surgical environment." },
        { title: "What type of product is it?", content: "It is an autoclave-safe, low-linting unisex scrub suit made from breathable medical poly-cotton." },
        { title: "Who typically purchases it?", content: "Surgical centers, operating theatres, and anesthesiology departments." },
        { title: "What variants are actually available?", content: "Available in Surgeon Green and OT Blue to reduce eye strain under surgical lights." }
      ];`
  },
  {
    id: 'staff-uniforms',
    aeo: `      aeoSections = [
        { title: "What are Staff Uniforms?", content: "Staff Uniforms are robust, stain-resistant apparel designed for hospital support and maintenance personnel by Ganpati Lifecare." },
        { title: "What are they used for?", content: "They provide a unified, professional institutional identity while ensuring comfort during active physical duties." },
        { title: "What type of product is it?", content: "It is a heavy-duty cotton-polyester uniform that resists shrinking during industrial washing." },
        { title: "Who typically purchases it?", content: "Hospital administrators for ward boys, housekeeping, and maintenance teams." },
        { title: "What variants are actually available?", content: "Available in Tunic & Trousers or Collared styles, with custom embroidery options for bulk orders." }
      ];`
  },
  {
    id: 'medical-disposables',
    aeo: `      aeoSections = [
        { title: "What are Medical Disposable Products?", content: "Medical Disposables are single-use hygienic products such as masks, caps, shoe covers, and gloves supplied by Ganpati Lifecare." },
        { title: "What are they used for?", content: "They are used to maintain strict infection control and minimize cross-contamination in healthcare settings." },
        { title: "What type of product is it?", content: "They are essential, single-use barrier protection consumables manufactured to medical hygiene standards." },
        { title: "Who typically purchases it?", content: "ICUs, diagnostic laboratories, and outpatient clinics." },
        { title: "What variants are actually available?", content: "We supply sterile and non-sterile variants in bulk dispenser boxes and master cartons." }
      ];`
  },
  {
    id: 'hospital-consumables',
    aeo: `      aeoSections = [
        { title: "What are Hospital Consumables?", content: "Hospital Consumables encompass the everyday clinical supplies—like tapes, IV items, and syringes—distributed by Ganpati Lifecare." },
        { title: "What are they used for?", content: "They are essential for routine patient care, first aid, and general diagnostic treatments in medical facilities." },
        { title: "What type of product is it?", content: "They are reliable, cost-effective wholesale medical supplies meant for high-volume institutional use." },
        { title: "Who typically purchases it?", content: "Hospitals, nursing homes, and clinics across Goluwala, Hanumangarh, and Rajasthan." },
        { title: "Where does Ganpati Lifecare serve?", content: "We serve as a central bulk supplier for healthcare institutions across North India." }
      ];`
  },
  {
    id: 'default',
    aeo: `      aeoSections = [
        { title: "What is this product?", content: "This is a quality-tested medical product supplied by Ganpati Lifecare in Rajasthan." },
        { title: "Who typically purchases it?", content: "Hospitals, clinics, and healthcare professionals seeking reliable bulk supplies." },
        { title: "Where does Ganpati Lifecare serve?", content: "We distribute medical supplies to Hanumangarh, Sri Ganganagar, and surrounding areas." }
      ];`
  }
];

for (const rep of replacements) {
  if (rep.id === 'default') {
    code = code.replace(
      /default:([\s\S]*?)break;/g,
      (match) => {
        return match.replace('break;', rep.aeo + '\n      break;');
      }
    );
  } else {
    code = code.replace(
      new RegExp("case '" + rep.id + "':([\\\\s\\\\S]*?)break;", 'g'),
      (match) => {
        return match.replace('break;', rep.aeo + '\n      break;');
      }
    );
    // Handle double quotes as well
    code = code.replace(
      new RegExp('case "' + rep.id + '":([\\\\s\\\\S]*?)break;', 'g'),
      (match) => {
        return match.replace('break;', rep.aeo + '\n      break;');
      }
    );
  }
}

code = code.replace(
  /case "orthopedic-gauze":([\s\S]*?)break;/g,
  (match) => {
    return match.replace('break;', replacements.find(r => r.id === 'orthopedic-gauze-bandages').aeo + '\n      break;');
  }
);
code = code.replace(
  /case "surgical-dressing":([\s\S]*?)break;/g,
  (match) => {
    return match.replace('break;', replacements.find(r => r.id === 'surgical-dressing-materials').aeo + '\n      break;');
  }
);
code = code.replace(
  /case "doctor-apparel":([\s\S]*?)break;/g,
  (match) => {
    return match.replace('break;', replacements.find(r => r.id === 'doctor-coats').aeo + '\n      break;');
  }
);

fs.writeFileSync('src/lib/product-details.ts', code);
console.log('Done modifying product-details.ts');
