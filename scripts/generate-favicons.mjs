import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");

// 1. Read base logo SVG
const rawSvg = readFileSync(join(publicDir, "logo.svg"), "utf8");

// 2. Create a square SVG by centering the 300x400 content into a 400x400 viewBox (-50 0 400 400)
const squareSvg = rawSvg.replace(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400">',
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 0 400 400" width="400" height="400">'
);
writeFileSync(join(publicDir, "favicon.svg"), squareSvg);
console.log("wrote favicon.svg (square 400x400 viewBox)");

// 3. Multiples of 48px as required by Google Search Guidelines, plus standard icons
const sizes = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "favicon-48x48.png", size: 48 },   // Google Search primary standard
  { name: "favicon-96x96.png", size: 96 },   // Google Search 2x
  { name: "favicon-128x128.png", size: 128 },
  { name: "favicon-144x144.png", size: 144 }, // Google Search 3x
  { name: "favicon-192x192.png", size: 192 }, // Google Search 4x & Android PWA
  { name: "favicon.png", size: 64 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "og-brand.png", size: 512 },
];

const svgBuffer = Buffer.from(squareSvg);

for (const { name, size } of sizes) {
  await sharp(svgBuffer)
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(publicDir, name));
  console.log("wrote", name);
}

// 4. Generate a 100% spec-compliant Windows ICO file with 16x16, 32x32, and 48x48 PNG streams
const icoSizes = [16, 32, 48];
const pngBuffers = [];

for (const s of icoSizes) {
  const buf = await sharp(svgBuffer)
    .resize(s, s, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  pngBuffers.push({ width: s, height: s, buffer: buf });
}

function buildIco(images) {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type: 1 = ICO
  header.writeUInt16LE(count, 4); // Number of images

  const dirSize = 16 * count;
  let offset = 6 + dirSize;

  const dirEntries = [];
  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0); // Width
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1); // Height
    entry.writeUInt8(0, 2); // Color count
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // Size
    entry.writeUInt32LE(offset, 12); // Offset
    offset += img.buffer.length;
    dirEntries.push(entry);
  }

  return Buffer.concat([header, ...dirEntries, ...images.map((i) => i.buffer)]);
}

const icoBuffer = buildIco(pngBuffers);
writeFileSync(join(publicDir, "favicon.ico"), icoBuffer);
console.log("wrote valid multi-resolution favicon.ico (16, 32, 48)");
