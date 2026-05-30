import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");
const svg = readFileSync(join(publicDir, "logo.svg"));

const sizes = [
  { name: "favicon-16.png", size: 16 },
  { name: "favicon-32.png", size: 32 },
  { name: "favicon-48.png", size: 48 },
  { name: "favicon.png", size: 32 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "og-brand.png", size: 512 },
];

for (const { name, size } of sizes) {
  await sharp(svg)
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(publicDir, name));
  console.log("wrote", name);
}

const icon32 = await sharp(svg).resize(32, 32).png().toBuffer();
writeFileSync(join(publicDir, "favicon.ico"), icon32);
console.log("wrote favicon.ico");
