import { readFileSync, writeFileSync } from "fs";
const p = new URL("../src/components/sections/Products.tsx", import.meta.url);
let t = readFileSync(p, "utf8");
t = t.replace(
  '<motion.div id="categories"',
  '<div id="categories"'
);
writeFileSync(p, t);
console.log("fixed");
