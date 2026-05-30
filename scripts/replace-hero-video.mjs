#!/usr/bin/env node

import https from 'https';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videoDir = path.join(__dirname, 'public', 'video');
const tempFile = path.join(videoDir, 'source-temp.mp4');
const finalMp4 = path.join(videoDir, 'hero-loop.mp4');
const finalWebm = path.join(videoDir, 'hero-loop.webm');
const finalPoster = path.join(videoDir, 'hero-poster.jpg');

// Ensure directory exists
if (!fs.existsSync(videoDir)) {
  fs.mkdirSync(videoDir, { recursive: true });
}

async function downloadVideo() {
  console.log('🎬 Downloading healthcare stock video...');
  
  // List of reliable stock video URLs (from Pexels)
  const videoUrls = [
    'https://videos.pexels.com/video-files/9786240/9786240-hd_1920_1080_30fps.mp4',
    'https://videos.pexels.com/video-files/5579253/5579253-hd_1920_1080_24fps.mp4',
    'https://videos.pexels.com/video-files/3945708/3945708-hd_1920_1080_30fps.mp4',
  ];

  for (const url of videoUrls) {
    try {
      await new Promise((resolve, reject) => {
        const file = fs.createWriteStream(tempFile);
        https.get(url, (response) => {
          if (response.statusCode === 200) {
            response.pipe(file);
            file.on('finish', () => {
              file.close();
              const stats = fs.statSync(tempFile);
              if (stats.size > 1000000) { // More than 1MB
                console.log(`✓ Downloaded ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
                resolve();
              } else {
                reject(new Error('File too small'));
              }
            });
          } else {
            reject(new Error(`Status ${response.statusCode}`));
          }
        }).on('error', reject);
      });
      console.log('✓ Download successful!\n');
      return true;
    } catch (err) {
      console.log(`✗ Failed: ${err.message}`);
    }
  }
  
  throw new Error('All download attempts failed. Network may be restricted.');
}

async function processVideo() {
  console.log('🎥 Processing video with FFmpeg...\n');
  
  try {
    // Get ffmpeg path from ffmpeg-static
    const ffmpeg = (await import('ffmpeg-static')).default;
    
    console.log('Converting to MP4 (1280x720, H.264)...');
    execSync(`"${ffmpeg}" -i "${tempFile}" -t 30 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" -c:v libx264 -crf 23 -preset fast -movflags +faststart "${finalMp4}"`, {
      stdio: 'inherit',
      timeout: 60000
    });
    console.log('✓ MP4 created\n');
    
    console.log('Converting to WebM (VP9)...');
    execSync(`"${ffmpeg}" -i "${tempFile}" -t 30 -vf "scale=1280:720" -c:v libvpx-vp9 -b:v 1M "${finalWebm}"`, {
      stdio: 'inherit',
      timeout: 60000
    });
    console.log('✓ WebM created\n');
    
    console.log('Creating poster image...');
    execSync(`"${ffmpeg}" -i "${finalMp4}" -ss 00:00:02 -vf scale=1920:1080 -vframes 1 "${finalPoster}"`, {
      stdio: 'inherit',
      timeout: 30000
    });
    console.log('✓ Poster created\n');
    
  } finally {
    // Clean up temp file
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
      console.log('✓ Cleaned up temporary files');
    }
  }
}

async function main() {
  try {
    console.log('\n════════════════════════════════════════════');
    console.log('  Hero Video Replacement Tool');
    console.log('════════════════════════════════════════════\n');
    
    // Try to download
    try {
      await downloadVideo();
      await processVideo();
    } catch (downloadError) {
      console.log('\n⚠️  Network download failed.');
      console.log('Falling back to placeholder video generation...\n');
      
      // Create a simple solid-color video as fallback
      const { default: ffmpeg } = await import('ffmpeg-static');
      console.log('Generating placeholder video (30-second solid background)...');
      execSync(`"${ffmpeg}" -f lavfi -i color=c=#1a7f4d:s=1280x720:d=30 -pix_fmt yuv420p -c:v libx264 -crf 23 "${finalMp4}"`, {
        stdio: 'inherit',
        timeout: 60000
      });
      console.log('✓ Placeholder MP4 created\n');
      
      execSync(`"${ffmpeg}" -f lavfi -i color=c=#1a7f4d:s=1280x720:d=30 -c:v libvpx-vp9 -b:v 1M "${finalWebm}"`, {
        stdio: 'inherit',
        timeout: 60000
      });
      console.log('✓ Placeholder WebM created\n');
      
      execSync(`"${ffmpeg}" -f lavfi -i color=c=#1a7f4d:s=1920x1080:d=1 -vframes 1 "${finalPoster}"`, {
        stdio: 'inherit',
        timeout: 30000
      });
      console.log('✓ Placeholder poster created\n');
      
      console.log('📌 NOTE: A placeholder video was created in the brand green color.');
      console.log('         Replace it manually with a real stock video using:');
      console.log('         https://www.pexels.com/videos/ or https://pixabay.com/videos/\n');
    }
    
    // Verify files
    console.log('════════════════════════════════════════════');
    console.log('  Results:');
    console.log('════════════════════════════════════════════');
    [finalMp4, finalWebm, finalPoster].forEach(file => {
      if (fs.existsSync(file)) {
        const stats = fs.statSync(file);
        console.log(`✓ ${path.basename(file)}: ${(stats.size / 1024).toFixed(0)} KB`);
      } else {
        console.log(`✗ ${path.basename(file)}: MISSING`);
      }
    });
    
    console.log('\n🎉 Hero video replacement complete!');
    console.log('   Test with: npm run dev\n');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
