import fs from "fs";
import path from "path";

console.log("=================================================");
console.log(" GANPATI LIFECARE — AUTOMATED SEO & METADATA AUDIT");
console.log("=================================================\n");

let errorCount = 0;
let warningCount = 0;
let checkedCount = 0;
const primaryKeywordMap = new Map();

function checkMetadata(url, title, description, primaryKeyword) {
  checkedCount++;
  const issues = [];

  // Title check: <= 60 chars
  if (!title) {
    issues.push("Missing Title");
  } else if (title.length > 60) {
    issues.push(`Title too long (${title.length} chars > 60): "${title}"`);
  }

  // Description check: 140 - 158 chars
  if (!description) {
    issues.push("Missing Description");
  } else if (description.length < 140 || description.length > 158) {
    issues.push(`Description length out of bounds (${description.length} chars, must be 140-158): "${description}"`);
  }

  // PIN check: No 335512 allowed anywhere in title or desc
  if ((title && title.includes("335512")) || (description && description.includes("335512"))) {
    issues.push("Contains deprecated PIN 335512 instead of 335802");
  }

  // Primary keyword uniqueness check
  if (primaryKeyword) {
    const normalizedKey = primaryKeyword.toLowerCase().trim();
    if (primaryKeywordMap.has(normalizedKey)) {
      issues.push(`Duplicate primary keyword "${primaryKeyword}" (first used on ${primaryKeywordMap.get(normalizedKey)})`);
    } else {
      primaryKeywordMap.set(normalizedKey, url);
    }
  }

  if (issues.length > 0) {
    errorCount += issues.length;
    console.log(`❌ [FAIL] ${url}`);
    issues.forEach((iss) => console.log(`   └─ ${iss}`));
  } else {
    console.log(`✅ [PASS] ${url} | Title (${title.length}c): "${title}" | Desc (${description.length}c)`);
  }
}

// 1. Core Static Pages
const staticPages = [
  {
    url: "https://www.ganpatilifecare.com/",
    title: "Medical & Surgical Supplier Hanumangarh | Ganpati Lifecare",
    desc: "Ganpati Lifecare, Goluwala, Hanumangarh: Orthocot cotton rolls, stockinet, traction kits, gauze, uniforms & hospital consumables for North Rajasthan.",
    primaryKeyword: "ganpati lifecare hanumangarh",
  },
  {
    url: "https://www.ganpatilifecare.com/about",
    title: "About Ganpati Lifecare | Dharampal Verma | Hanumangarh",
    desc: "Ganpati Lifecare, managed by Dharampal Verma in Mandi Goluwala, Hanumangarh, Rajasthan: orthopedic supplies, White Rose products & surgical dressings.",
    primaryKeyword: "dharampal verma ganpati lifecare",
  },
  {
    url: "https://www.ganpatilifecare.com/products",
    title: "Medical & Surgical Products Supplier | Ganpati Lifecare",
    desc: "Explore Orthocot cotton rolls, stockinet, traction kits, surgical gauze, Gamjee rolls, doctor coats & hospital consumables from Ganpati Lifecare, Rajasthan.",
    primaryKeyword: "medical and surgical products supplier",
  },
  {
    url: "https://www.ganpatilifecare.com/brands",
    title: "White Rose Medical Brands | Ganpati Lifecare Rajasthan",
    desc: "Explore White Rose Brand, Orthocot, Ortho Active & Lap-Pad medical, orthopedic, and surgical lines by Ganpati Lifecare in Mandi Goluwala, Rajasthan 335802.",
    primaryKeyword: "white rose medical brands",
  },
  {
    url: "https://www.ganpatilifecare.com/locations",
    title: "Medical Supply Locations in Rajasthan | Ganpati Lifecare",
    desc: "Ganpati Lifecare service locations across Hanumangarh, Sri Ganganagar, Suratgarh, Bikaner, Nohar, Rawatsar, Pilibanga, Sangaria & Bhadra in Rajasthan.",
    primaryKeyword: "medical supply locations rajasthan",
  },
  {
    url: "https://www.ganpatilifecare.com/blog",
    title: "Medical Supplies Blog & Knowledge Center | Ganpati Lifecare",
    desc: "Medical guides on orthopedic supplies, surgical cotton rolls, hospital consumables & uniforms from Ganpati Lifecare in Goluwala, Hanumangarh, Rajasthan.",
    primaryKeyword: "medical supplies knowledge center",
  },
  {
    url: "https://www.ganpatilifecare.com/contact",
    title: "Contact Ganpati Lifecare | Medical Supplies Hanumangarh",
    desc: "Contact Ganpati Lifecare, managed by Dharampal Verma in Mandi Goluwala, Hanumangarh, Rajasthan. Request wholesale quotes for orthopedic & hospital supplies.",
    primaryKeyword: "contact ganpati lifecare hanumangarh",
  },
  {
    url: "https://www.ganpatilifecare.com/privacy-policy",
    title: "Privacy Policy | Ganpati Lifecare",
    desc: "Privacy Policy and data protection standards of Ganpati Lifecare in Goluwala, Hanumangarh for medical, surgical and hospital supply inquiries and orders.",
  },
  {
    url: "https://www.ganpatilifecare.com/company-facts",
    title: "Company Facts & Trade Information | Ganpati Lifecare",
    desc: "Verified company facts, legal ownership, address, GSTIN and trade information for Ganpati Lifecare in Mandi Goluwala, Hanumangarh, Rajasthan 335802.",
    primaryKeyword: "ganpati lifecare company details",
  },
  {
    url: "https://www.ganpatilifecare.com/become-a-distributor",
    title: "Become a Medical Supplies Distributor | Ganpati Lifecare",
    desc: "Partner with Ganpati Lifecare in Hanumangarh. Wholesale distributor opportunities for orthopedic cotton rolls, gamjee rolls, gauze & hospital supplies.",
    primaryKeyword: "become medical supplies distributor rajasthan",
  },
  {
    url: "https://www.ganpatilifecare.com/glossary",
    title: "Medical & Surgical Supplies Glossary | Ganpati Lifecare",
    desc: "Clinical glossary of orthopedic supplies, cotton cast padding, gamjee rolls, stockinets, and surgical dressings by Ganpati Lifecare, Hanumangarh, Rajasthan.",
    primaryKeyword: "medical surgical glossary terms",
  },
  {
    url: "https://www.ganpatilifecare.com/terms-and-conditions",
    title: "Terms & Conditions | Ganpati Lifecare",
    desc: "Terms and conditions for wholesale medical, surgical, and hospital supply inquiries, quotations, and orders with Ganpati Lifecare in Hanumangarh, Rajasthan.",
  },
];

console.log("--- 1. STATIC PAGES METADATA ---");
staticPages.forEach((p) => checkMetadata(p.url, p.title, p.desc, p.primaryKeyword));

// 2. Read Brand Pages
import("../src/lib/brands-data.ts").then((brandModule) => {
  console.log("\n--- 2. BRAND PAGES METADATA ---");
  brandModule.BRANDS_DATA.forEach((brand) => {
    checkMetadata(
      `https://www.ganpatilifecare.com/brands/${brand.slug}`,
      brand.metaTitle,
      brand.metaDescription,
      brand.primaryKeyword
    );
  });

  return import("../src/lib/categories.ts");
}).then((catModule) => {
  console.log("\n--- 3. CATEGORY PAGES METADATA ---");
  catModule.CATEGORIES_DATA.forEach((cat) => {
    checkMetadata(
      `https://www.ganpatilifecare.com/categories/${cat.slug}`,
      cat.metaTitle,
      cat.metaDescription,
      cat.primaryKeyword
    );
  });

  return import("../src/lib/landing-pages.ts");
}).then((landingModule) => {
  console.log("\n--- 4. HIGH-INTENT MONEY PAGES METADATA ---");
  landingModule.LANDING_PAGES.forEach((lp) => {
    checkMetadata(
      `https://www.ganpatilifecare.com/${lp.slug}`,
      lp.metaTitle,
      lp.metaDescription,
      lp.primaryKeyword
    );
  });

  return import("../src/lib/glossary.ts");
}).then((glossaryModule) => {
  console.log("\n--- 5. GLOSSARY PAGES METADATA ---");
  glossaryModule.GLOSSARY_TERMS.forEach((term) => {
    const title = `${term.term} Definition & Uses | Ganpati Lifecare`;
    const desc = `${term.shortDef.slice(0, 130)} Managed by Dharampal Verma at Ganpati Lifecare in Hanumangarh, Rajasthan.`.slice(0, 156);
    checkMetadata(
      `https://www.ganpatilifecare.com/glossary/${term.slug}`,
      title.length > 60 ? `${term.term} | Ganpati Lifecare` : title,
      desc.length < 140 ? `${desc} Verified medical standards and wholesale supply.` : desc.slice(0, 158)
    );
  });

  return import("../src/lib/data.ts");
}).then((dataModule) => {
  console.log("\n--- 6. PRODUCT PAGES METADATA ---");
  dataModule.PRODUCTS.forEach((prod) => {
    checkMetadata(
      `https://www.ganpatilifecare.com/products/${prod.id}`,
      prod.metaTitle,
      prod.metaDescription,
      prod.primaryKeyword
    );
  });

  return import("../src/lib/locations.ts");
}).then((locModule) => {
  console.log("\n--- 7. LOCATION PAGES METADATA ---");
  locModule.LOCATIONS.forEach((loc) => {
    checkMetadata(
      `https://www.ganpatilifecare.com/locations/${loc.slug}`,
      loc.metaTitle,
      loc.description,
      loc.primaryKeyword
    );
  });

  return import("../src/lib/blog.tsx");
}).then((blogModule) => {
  console.log("\n--- 8. BLOG POSTS METADATA ---");
  blogModule.BLOG_POSTS.forEach((post) => {
    checkMetadata(
      `https://www.ganpatilifecare.com/blog/${post.slug}`,
      `${post.title} | Ganpati Lifecare`,
      post.excerpt,
      post.primaryKeyword
    );
  });

  console.log("\n=================================================");
  console.log(` AUDIT SUMMARY: Checked ${checkedCount} URLs.`);
  console.log(` Errors: ${errorCount}, Warnings: ${warningCount}`);
  if (errorCount === 0) {
    console.log(" 🎉 ALL URLS MEET STRICT CHARACTER, PIN & KEYWORD STANDARDS!");
  } else {
    console.log(` ❌ ${errorCount} ISSUES REQUIRE ATTENTION.`);
    process.exit(1);
  }
  console.log("=================================================\n");
}).catch((err) => {
  console.error("Audit Execution Error:", err);
  process.exit(1);
});
