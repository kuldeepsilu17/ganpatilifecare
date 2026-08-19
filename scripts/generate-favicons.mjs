import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");
const svg = readFileSync(join(publicDir, "logo.svg"));

const sizes = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "favicon-48x48.png", size: 48 },
  { name: "favicon-96x96.png", size: 96 },
  { name: "favicon-128x128.png", size: 128 },
  { name: "favicon-192x192.png", size: 192 },
  { name: "favicon.png", size: 64 },
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

const icon64 = await sharp(svg).resize(64, 64).png().toBuffer();
writeFileSync(join(publicDir, "favicon.ico"), icon64);
console.log("wrote favicon.ico");
