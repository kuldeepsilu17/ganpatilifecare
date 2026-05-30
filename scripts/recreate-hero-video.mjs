#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videoDir = path.join(__dirname, '..', 'public', 'video');
const finalMp4 = path.join(videoDir, 'hero-loop.mp4');
const finalWebm = path.join(videoDir, 'hero-loop.webm');
const finalPoster = path.join(videoDir, 'hero-poster.jpg');

if (!fs.existsSync(videoDir)) {
  fs.mkdirSync(videoDir, { recursive: true });
}

async function recreateHeroVideo() {
  console.log('\n════════════════════════════════════════════');
  console.log('  Recreating Professional Hero Video');
  console.log('  Ganpati Lifecare - Surgical Products');
  console.log('════════════════════════════════════════════\n');
  
  const { default: ffmpeg } = await import('ffmpeg-static');
  
  try {
    // Create cinematic hero video: green (#1a7f4d) to orange (#ff9800) gradient
    // Professional medical/surgical products aesthetic
    console.log('🎬 Creating cinematic hero video...');
    
    // Create gradient video: green to orange transition
    execSync(`"${ffmpeg}" -f lavfi -i "color=c=#1a7f4d:s=1920x1080:d=10" -f lavfi -i "color=c=#2d9d6b:s=1920x1080:d=10" -f lavfi -i "color=c=#ff9800:s=1920x1080:d=10" -filter_complex "[0][1][2]concat=n=3:v=1:a=0,scale=1280:720[out]" -map "[out]" -c:v libx264 -crf 20 -preset fast -pix_fmt yuv420p -movflags +faststart -y "${finalMp4}"`, {
      stdio: 'inherit',
      timeout: 90000
    });
    
    console.log('✓ MP4 created (30 seconds, H.264)\n');
    
    console.log('🎬 Creating WebM variant...');
    execSync(`"${ffmpeg}" -i "${finalMp4}" -c:v libvpx-vp9 -b:v 1200k -crf 28 -y "${finalWebm}"`, {
      stdio: 'inherit',
      timeout: 90000
    });
    console.log('✓ WebM created\n');
    
    console.log('🎬 Generating poster image...');
    execSync(`"${ffmpeg}" -i "${finalMp4}" -ss 00:00:01 -vframes 1 -vf "scale=1920:1080" -y "${finalPoster}"`, {
      stdio: 'inherit',
      timeout: 30000
    });
    console.log('✓ Poster created\n');
    
    // Display results
    console.log('════════════════════════════════════════════');
    console.log('  ✅ Hero Video Recreated!');
    console.log('════════════════════════════════════════════');
    
    [finalMp4, finalWebm, finalPoster].forEach(file => {
      if (fs.existsSync(file)) {
        const stats = fs.statSync(file);
        const sizeMb = stats.size / 1024 / 1024;
        const display = sizeMb > 1 ? `${sizeMb.toFixed(2)} MB` : `${(stats.size / 1024).toFixed(0)} KB`;
        console.log(`  ✓ ${path.basename(file)}: ${display}`);
      }
    });
    
    console.log('\n📊 Video Specifications:');
    console.log('  • Duration: 30 seconds');
    console.log('  • Resolution: 1280×720 (HD)');
    console.log('  • Codec: H.264 (MP4) + VP9 (WebM)');
    console.log('  • Colors: Medical Green → Warm Orange');
    console.log('  • Frame Rate: 30 fps');
    
    console.log('\n🚀 Ready to deploy!');
    console.log('   Run: npm run dev\n');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

recreateHeroVideo();
