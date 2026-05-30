/**
 * Generates optimized hero-loop.mp4 + hero-loop.webm from canvas frames.
 * Run: npm run generate:hero-video
 */
import { mkdirSync, existsSync, rmSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import sharp from "sharp";
import ffmpegPath from "ffmpeg-static";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "video");
const framesDir = join(outDir, "_frames");

const W = 1280;
const H = 720;
const FPS = 12;
const SECONDS = 30;
const TOTAL = FPS * SECONDS;

const GREEN = "#009245";
const ORANGE = "#F58220";

function ease(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function frameSvg(i) {
  const t = i / FPS;
  const phase = (t % SECONDS) / SECONDS;
  const scene = Math.floor(phase * 8);
  const taglines = [
    "Trusted Surgical Products Manufacturer",
    "Quality Healthcare Products",
    "Premium Surgical and Hospital Supplies",
    "Gamjee Roll, Sponge, Stockinet",
    "Quality Control - Hygienic Production",
    "Surgical Cotton, OT Dress, Bandages",
    "Trusted by Healthcare Professionals",
    "Ganpati Lifecare (GLC)",
  ];
  const tag = (taglines[scene] ?? taglines[0])
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const cx = 640 + Math.sin(t * 0.8) * 40;
  const cy = 360 + Math.cos(t * 0.6) * 30;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#007a38"/>
      <stop offset="50%" stop-color="${GREEN}"/>
      <stop offset="100%" stop-color="${ORANGE}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="55%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.25)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  ${Array.from({ length: 20 }, (_, k) => {
    const x = (k * 137 + t * 30) % W;
    const y = (k * 89 + t * 20) % H;
    return `<circle cx="${x}" cy="${y}" r="2" fill="rgba(255,255,255,0.15)"/>`;
  }).join("")}
  <rect x="80" y="120" width="1120" height="400" fill="rgba(255,255,255,0.06)" rx="12"/>
  <circle cx="${cx}" cy="${cy}" r="70" fill="white" opacity="0.92"/>
  <text x="${cx}" y="${cy - 5}" text-anchor="middle" font-family="Arial,sans-serif" font-size="36" font-weight="800" fill="${GREEN}">GLC</text>
  <text x="${cx}" y="${cy + 28}" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" font-weight="600" fill="${ORANGE}">Ganpati Lifecare</text>
  <rect x="0" y="560" width="${W}" height="120" fill="rgba(0,0,0,0.35)"/>
  <text x="640" y="630" text-anchor="middle" font-family="Arial,sans-serif" font-size="32" font-weight="700" fill="white">${tag}</text>
</svg>`;
}

mkdirSync(outDir, { recursive: true });
if (existsSync(framesDir)) rmSync(framesDir, { recursive: true });
mkdirSync(framesDir);

console.log(`Rendering ${TOTAL} frames at ${W}x${H}...`);
for (let i = 0; i < TOTAL; i++) {
  const buf = await sharp(Buffer.from(frameSvg(i))).png().toBuffer();
  const name = String(i).padStart(5, "0") + ".png";
  await sharp(buf).toFile(join(framesDir, name));
  if (i % 48 === 0) console.log(`  ${Math.round((i / TOTAL) * 100)}%`);
}

const mp4 = join(outDir, "hero-loop.mp4");
const webm = join(outDir, "hero-loop.webm");
const poster = join(outDir, "hero-poster.jpg");

const inputPattern = join(framesDir, "%05d.png");

console.log("Encoding MP4...");
spawnSync(
  ffmpegPath,
  [
    "-y",
    "-framerate",
    String(FPS),
    "-i",
    inputPattern,
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-crf",
    "23",
    "-preset",
    "medium",
    "-movflags",
    "+faststart",
    "-vf",
    "scale=1280:720",
    mp4,
  ],
  { stdio: "inherit" }
);

console.log("Encoding WebM...");
const webmResult = spawnSync(
  ffmpegPath,
  [
    "-y",
    "-framerate",
    String(FPS),
    "-i",
    inputPattern,
    "-c:v",
    "libvpx",
    "-b:v",
    "800k",
    "-crf",
    "10",
    webm,
  ],
  { stdio: "inherit" }
);
if (webmResult.status !== 0) {
  console.warn("WebM skipped (libvpx not available). MP4 is sufficient for the site.");
}

await sharp(join(framesDir, "00000.png")).jpeg({ quality: 85 }).toFile(poster);

rmSync(framesDir, { recursive: true });
console.log("Done:", mp4, webm, poster);
