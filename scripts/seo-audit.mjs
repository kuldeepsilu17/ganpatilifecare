import fs from "fs";
import path from "path";

console.log("=================================================");
console.log(" GANPATI LIFECARE — AUTOMATED SEO & METADATA AUDIT");
console.log("=================================================\n");

let errorCount = 0;
let warningCount = 0;
let checkedCount = 0;

function checkMetadata(url, title, description, h1) {
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
  },
  {
    url: "https://www.ganpatilifecare.com/about",
    title: "About Ganpati Lifecare | Dharampal Verma | Hanumangarh",
    desc: "Ganpati Lifecare, managed by Dharampal Verma in Mandi Goluwala, Hanumangarh, Rajasthan: orthopedic supplies, White Rose products & surgical dressings.",
  },
  {
    url: "https://www.ganpatilifecare.com/products",
    title: "Medical & Surgical Products Supplier | Ganpati Lifecare",
    desc: "Explore Orthocot cotton rolls, stockinet, traction kits, surgical gauze, Gamjee rolls, doctor coats & hospital consumables from Ganpati Lifecare, Rajasthan.",
  },
  {
    url: "https://www.ganpatilifecare.com/locations",
    title: "Medical Supply Locations in Rajasthan | Ganpati Lifecare",
    desc: "Ganpati Lifecare service locations across Hanumangarh, Sri Ganganagar, Suratgarh, Bikaner, Nohar, Rawatsar, Pilibanga, Sangaria & Bhadra in Rajasthan.",
  },
  {
    url: "https://www.ganpatilifecare.com/blog",
    title: "Medical Supplies Blog & Knowledge Center | Ganpati Lifecare",
    desc: "Medical guides on orthopedic supplies, surgical cotton rolls, hospital consumables & uniforms from Ganpati Lifecare in Goluwala, Hanumangarh, Rajasthan.",
  },
  {
    url: "https://www.ganpatilifecare.com/contact",
    title: "Contact Ganpati Lifecare | Medical Supplies Hanumangarh",
    desc: "Contact Ganpati Lifecare, managed by Dharampal Verma in Mandi Goluwala, Hanumangarh, Rajasthan. Request wholesale quotes for orthopedic & hospital supplies.",
  },
  {
    url: "https://www.ganpatilifecare.com/privacy-policy",
    title: "Privacy Policy | Ganpati Lifecare",
    desc: "Privacy Policy and data protection standards of Ganpati Lifecare in Goluwala, Hanumangarh for medical, surgical and hospital supply inquiries and orders.",
  },
  {
    url: "https://www.ganpatilifecare.com/terms-and-conditions",
    title: "Terms & Conditions | Ganpati Lifecare",
    desc: "Terms and conditions for wholesale medical, surgical, and hospital supply inquiries, quotations, and orders with Ganpati Lifecare in Hanumangarh, Rajasthan.",
  },
];

console.log("--- 1. STATIC PAGES METADATA ---");
staticPages.forEach((p) => checkMetadata(p.url, p.title, p.desc));

// 2. Read Categories, Products, Locations, Blog from codebase
import("../src/lib/categories.ts").then((catModule) => {
  console.log("\n--- 2. CATEGORY PAGES METADATA ---");
  catModule.CATEGORIES_DATA.forEach((cat) => {
    checkMetadata(
      `https://www.ganpatilifecare.com/categories/${cat.slug}`,
      cat.metaTitle,
      cat.metaDescription
    );
  });

  return import("../src/lib/data.ts");
}).then((dataModule) => {
  console.log("\n--- 3. PRODUCT PAGES METADATA ---");
  dataModule.PRODUCTS.forEach((prod) => {
    checkMetadata(
      `https://www.ganpatilifecare.com/products/${prod.id}`,
      prod.metaTitle,
      prod.metaDescription
    );
  });

  return import("../src/lib/locations.ts");
}).then((locModule) => {
  console.log("\n--- 4. LOCATION PAGES METADATA ---");
  locModule.LOCATIONS.forEach((loc) => {
    checkMetadata(
      `https://www.ganpatilifecare.com/locations/${loc.slug}`,
      loc.metaTitle,
      loc.description
    );
  });

  return import("../src/lib/blog.tsx");
}).then((blogModule) => {
  console.log("\n--- 5. BLOG POSTS METADATA ---");
  blogModule.BLOG_POSTS.forEach((post) => {
    checkMetadata(
      `https://www.ganpatilifecare.com/blog/${post.slug}`,
      `${post.title} | Ganpati Lifecare`,
      post.excerpt
    );
  });

  console.log("\n=================================================");
  console.log(` AUDIT SUMMARY: Checked ${checkedCount} URLs.`);
  console.log(` Errors: ${errorCount}, Warnings: ${warningCount}`);
  if (errorCount === 0) {
    console.log(" 🎉 ALL URLS MEET STRICT CHARACTER AND SEO STANDARDS!");
  } else {
    console.log(` ❌ ${errorCount} ISSUES REQUIRE ATTENTION.`);
    process.exit(1);
  }
  console.log("=================================================\n");
}).catch((err) => {
  console.error("Audit Execution Error:", err);
  process.exit(1);
});
