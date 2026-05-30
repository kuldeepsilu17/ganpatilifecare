#!/usr/bin/env node

import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videoDir = path.join(__dirname, '..', 'public', 'video');
const tempFile = path.join(videoDir, 'source-temp.mp4');
const finalMp4 = path.join(videoDir, 'hero-loop.mp4');
const finalWebm = path.join(videoDir, 'hero-loop.webm');
const finalPoster = path.join(videoDir, 'hero-poster.jpg');

// Ensure directory exists
if (!fs.existsSync(videoDir)) {
  fs.mkdirSync(videoDir, { recursive: true });
}

async function downloadFile(url, outputPath, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout
    };

    const file = fs.createWriteStream(outputPath);
    
    protocol.get(url, options, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        downloadFile(response.headers.location, outputPath, timeout).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(outputPath);
        if (stats.size > 500000) { // More than 500KB
          resolve();
        } else {
          reject(new Error('File too small'));
        }
      });
    }).on('error', reject);
  });
}

async function tryDownloadVideo() {
  console.log('🎬 Searching for healthcare stock videos...\n');
  
  // Collection of free healthcare/medical video sources
  const videoSources = [
    {
      name: 'Pixabay - Hospital/Medical',
      urls: [
        'https://pixabay.com/videos/download/video-96704_medium.mp4',
        'https://pixabay.com/videos/download/video-4555_medium.mp4',
        'https://pixabay.com/videos/download/video-66936_medium.mp4',
      ]
    },
    {
      name: 'Pexels - Healthcare (with User-Agent)',
      urls: [
        'https://videos.pexels.com/video-files/5579253/5579253-hd_1920_1080_24fps.mp4',
        'https://videos.pexels.com/video-files/3945708/3945708-hd_1920_1080_30fps.mp4',
        'https://videos.pexels.com/video-files/6954405/6954405-hd_1920_1080_30fps.mp4',
      ]
    }
  ];

  for (const source of videoSources) {
    console.log(`Trying ${source.name}...`);
    
    for (const url of source.urls) {
      try {
        console.log(`  → ${url.split('/').pop().slice(0, 30)}...`);
        await downloadFile(url, tempFile, 45000);
        
        const stats = fs.statSync(tempFile);
        console.log(`  ✓ Downloaded ${(stats.size / 1024 / 1024).toFixed(2)} MB\n`);
        return true;
      } catch (err) {
        console.log(`    ✗ ${err.message}`);
      }
    }
  }
  
  return false;
}

async function processVideo() {
  console.log('🎥 Processing video with FFmpeg...\n');
  
  const { default: ffmpeg } = await import('ffmpeg-static');
  
  try {
    console.log('Converting to MP4 (1280x720, H.264)...');
    execSync(`"${ffmpeg}" -i "${tempFile}" -t 35 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" -c:v libx264 -crf 22 -preset fast -movflags +faststart "${finalMp4}"`, {
      stdio: 'inherit',
      timeout: 90000
    });
    console.log('✓ MP4 created\n');
    
    console.log('Converting to WebM (VP9)...');
    execSync(`"${ffmpeg}" -i "${tempFile}" -t 35 -vf "scale=1280:720" -c:v libvpx-vp9 -b:v 1200k -crf 30 "${finalWebm}"`, {
      stdio: 'inherit',
      timeout: 90000
    });
    console.log('✓ WebM created\n');
    
    console.log('Creating poster image...');
    execSync(`"${ffmpeg}" -i "${finalMp4}" -ss 00:00:02 -vf scale=1920:1080 -vframes 1 "${finalPoster}"`, {
      stdio: 'inherit',
      timeout: 30000
    });
    console.log('✓ Poster created\n');
    
  } finally {
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
      console.log('✓ Cleaned up temporary files\n');
    }
  }
}

async function main() {
  try {
    console.log('\n════════════════════════════════════════════');
    console.log('  Stock Video Downloader & Processor');
    console.log('════════════════════════════════════════════\n');
    
    const downloaded = await tryDownloadVideo();
    
    if (!downloaded) {
      throw new Error('Could not download stock video from any source');
    }
    
    await processVideo();
    
    console.log('════════════════════════════════════════════');
    console.log('  Results:');
    console.log('════════════════════════════════════════════');
    
    [finalMp4, finalWebm, finalPoster].forEach(file => {
      if (fs.existsSync(file)) {
        const stats = fs.statSync(file);
        const sizeKb = stats.size / 1024;
        console.log(`✓ ${path.basename(file)}: ${sizeKb > 1024 ? (sizeKb/1024).toFixed(2) + ' MB' : sizeKb.toFixed(0) + ' KB'}`);
      }
    });
    
    console.log('\n🎉 Healthcare stock video added successfully!');
    console.log('   Test with: npm run dev\n');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\n📌 Alternative: Manually download from:');
    console.error('   • Pixabay: https://pixabay.com/videos/?q=medical');
    console.error('   • Pexels: https://www.pexels.com/videos/?query=medical');
    console.error('   • Unsplash: https://videos.unsplash.com/?q=medical\n');
    process.exit(1);
  }
}

main();
