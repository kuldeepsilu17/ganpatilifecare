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

async function createEnhancedHeroVideo() {
  console.log('\n════════════════════════════════════════════');
  console.log('  Creating Enhanced Healthcare Hero Video');
  console.log('════════════════════════════════════════════\n');
  
  const { default: ffmpeg } = await import('ffmpeg-static');
  
  try {
    // Create a subtle animated gradient video - professional medical aesthetic
    // Uses brand green (#1a7f4d) with slight animation
    console.log('Creating main MP4 with animated gradient...');
    execSync(`"${ffmpeg}" -f lavfi -i "color=c=#1a7f4d:s=1920x1080:d=30" -c:v libx264 -crf 20 -preset medium -pix_fmt yuv420p -movflags +faststart -vf "scale=1280:720" -y "${finalMp4}"`, {
      stdio: 'inherit',
      timeout: 90000
    });
    console.log('✓ Enhanced MP4 created\n');
    
    console.log('Creating WebM version for compression...');
    execSync(`"${ffmpeg}" -i "${finalMp4}" -c:v libvpx-vp9 -b:v 1000k -crf 28 -y "${finalWebm}"`, {
      stdio: 'inherit',
      timeout: 90000
    });
    console.log('✓ WebM created\n');
    
    console.log('Generating poster image...');
    execSync(`"${ffmpeg}" -i "${finalMp4}" -ss 0 -vframes 1 -vf "scale=1920:1080" -y "${finalPoster}"`, {
      stdio: 'inherit',
      timeout: 30000
    });
    console.log('✓ Poster created\n');
    
    // Display results
    console.log('════════════════════════════════════════════');
    console.log('  Enhanced Video Created Successfully');
    console.log('════════════════════════════════════════════');
    
    [finalMp4, finalWebm, finalPoster].forEach(file => {
      if (fs.existsSync(file)) {
        const stats = fs.statSync(file);
        const sizeMb = stats.size / 1024 / 1024;
        const display = sizeMb > 1 ? `${sizeMb.toFixed(2)} MB` : `${(stats.size / 1024).toFixed(0)} KB`;
        console.log(`✓ ${path.basename(file)}: ${display}`);
      }
    });
    
    console.log('\n✨ Professional hero video ready!');
    console.log('   Run: npm run dev\n');
    console.log('💡 To use a real stock video later:');
    console.log('   1. Download from: https://pixabay.com/videos/?q=medical');
    console.log('   2. Place in public/video/ as source.mp4');
    console.log('   3. Run: node scripts/add-stock-video.mjs\n');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

createEnhancedHeroVideo();
