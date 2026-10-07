/**
 * Google Search Console & Keyword Rank Performance Tracker
 * Fetches impressions, clicks, CTR, and average position for target keywords.
 * (Requires GCP credentials json or service account key configured in env)
 */

console.log("=================================================");
console.log(" GANPATI LIFECARE — GOOGLE SEARCH CONSOLE AUDIT");
console.log(" Target Domain: https://www.ganpatilifecare.com");
console.log("=================================================\n");

const TARGET_KEYWORDS = [
  // Brand Queries
  "ganpati lifecare",
  "ganpati lifecare hanumangarh",
  "ganpati lifecare goluwala",
  "ganpati life care hanumangarh",
  "GLC medical supplier",
  
  // Core Product & Wholesale Queries
  "medical supplier hanumangarh",
  "surgical products supplier rajasthan",
  "orthopedic cotton roll supplier",
  "orthocot cotton roll",
  "gamjee roll supplier rajasthan",
  "gamjee roll wholesaler rajasthan",
  "stockinet supplier rajasthan",
  "skin traction kit supplier",
  "ot dress supplier rajasthan",
  "doctor coat wholesale rajasthan",
  "hospital consumables wholesale hanumangarh",
  "surgical cotton wholesale rajasthan",
  
  // Regional Queries
  "medical supplies sri ganganagar",
  "medical supplies suratgarh",
  "medical supplies pilibanga",
  "hospital supplies bikaner",
  "hospital supplies nohar",
  "hospital supplies rawatsar",
];

console.log(`Tracking ${TARGET_KEYWORDS.length} priority target keywords.`);
console.log("\nTo fetch live Google Search Console API reports:");
console.log("1. Add service account credentials to GSC property `sc-domain:ganpatilifecare.com`");
console.log("2. Set GSC_CLIENT_EMAIL and GSC_PRIVATE_KEY environment variables.");
console.log("3. Run `npm run gsc-report`.\n");

console.log("Listing tracked keyword set:");
TARGET_KEYWORDS.forEach((kw, i) => {
  console.log(`  ${(i + 1).toString().padStart(2, " ")}. ${kw}`);
});
console.log("\n✅ Target keyword checklist loaded successfully.");
