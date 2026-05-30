# How to Replace Hero Video - Complete Guide

## Quick Summary
Your hero video is located at: `public/video/hero-loop.mp4`
You need to: Download a stock video → Convert it → Replace files

---

## Step 1: Download Healthcare/Medical Stock Video

### Best Free Options (Direct Links):

**Option A: Pexels - Medical/Healthcare Videos**
- Go to: https://www.pexels.com/videos/
- Search: "medical", "hospital", "healthcare", "manufacturing", "industrial"
- Look for videos around 30-60 seconds long
- Click video → Download → Choose 1080p HD

**Option B: Pixabay Videos**
- Go to: https://pixabay.com/videos/
- Search: "medical equipment", "surgical", "healthcare", "hospital"
- Download 1080p version

**Option C: Unsplash Videos**
- Go to: https://videos.unsplash.com/
- Search: "medical", "healthcare", "hospital"

**Option D: Artgrid (Paid but $10/month)**
- https://artgrid.io/
- Search: "medical manufacturing", "surgical products", "hospital"

---

## Step 2: Install FFmpeg (If Not Already Installed)

**Windows:**
1. Download: https://ffmpeg.org/download.html
2. Or use **Chocolatey**: 
   ```powershell
   choco install ffmpeg
   ```
3. Or use **Windows Package Manager**:
   ```powershell
   winget install ffmpeg
   ```

Verify installation:
```bash
ffmpeg -version
```

---

## Step 3: Convert & Optimize Your Downloaded Video

After downloading (e.g., `downloaded-video.mp4`), open PowerShell in your project folder and run:

### Convert to MP4 (Required)
```bash
ffmpeg -i downloaded-video.mp4 -t 30 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" -c:v libx264 -crf 23 -preset medium -movflags +faststart public/video/hero-loop.mp4
```

### Convert to WebM (Optional but recommended for compression)
```bash
ffmpeg -i downloaded-video.mp4 -t 30 -vf "scale=1280:720" -c:v libvpx-vp9 -b:v 1M public/video/hero-loop.webm
```

### Create Poster Image (First frame)
```bash
ffmpeg -i public/video/hero-loop.mp4 -ss 00:00:02 -vf scale=1920:1080 -vframes 1 public/video/hero-poster.jpg
```

---

## Step 4: Delete Old Files (Optional)

After confirming the new videos work, delete the old ones:

```powershell
# Delete old video if you have a backup
Remove-Item public/video/hero-loop.mp4.bak -ErrorAction SilentlyContinue
```

---

## Step 5: Test

1. Run your development server:
   ```bash
   npm run dev
   ```

2. Visit http://localhost:3000
3. Check that the video loads and plays automatically

---

## Video Specifications (Requirements)

- **Duration**: 25-40 seconds (we'll trim to 30s)
- **Resolution**: 1920×1080 (Full HD) or 1280×720 (HD)
- **Aspect Ratio**: 16:9 (widescreen)
- **Format**: MP4 (H.264) + WebM (VP9)
- **File Size**: MP4 < 15MB, WebM < 10MB
- **Frame Rate**: 24-30fps

---

## Recommended Search Keywords

When searching stock video sites, use these terms:
- "Medical manufacturing"
- "Surgical cotton production"
- "Hospital equipment"
- "Healthcare products"
- "Industrial medical"
- "Pharmaceutical production"
- "Sterile packaging"
- "Medical supplies"
- "Hospital sterile"
- "Healthcare facility"

---

## Video Code Reference

Your hero video is configured in:
- [src/lib/hero-video.ts](src/lib/hero-video.ts) - Video paths
- [src/components/hero/HeroMediaBackground.tsx](src/components/hero/HeroMediaBackground.tsx) - Component rendering
- [public/video/](public/video/) - File storage

No changes needed to these files - just replace the video files!

---

## Troubleshooting

### Video won't play
- Make sure filename is exactly: `hero-loop.mp4`
- Verify MP4 is H.264 codec
- Check file is in `public/video/`

### Video is too large
- Run FFmpeg command again with lower bitrate: `-crf 25` (higher = smaller)

### Poster image missing
- Run the FFmpeg poster command to generate `hero-poster.jpg`

### Video doesn't loop smoothly
- Ensure last frame matches first frame or use FFmpeg loop filter

---

## One-Line Quick Start (After downloading video.mp4)

```bash
ffmpeg -i video.mp4 -t 30 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" -c:v libx264 -crf 23 -preset medium -movflags +faststart public/video/hero-loop.mp4 && ffmpeg -i video.mp4 -t 30 -vf "scale=1280:720" -c:v libvpx-vp9 -b:v 1M public/video/hero-loop.webm && ffmpeg -i public/video/hero-loop.mp4 -ss 00:00:02 -vf scale=1920:1080 -vframes 1 public/video/hero-poster.jpg
```

---

**Next Steps:**
1. Download a video from Pexels/Pixabay
2. Install FFmpeg if needed
3. Run the FFmpeg conversion command
4. Test on your dev server
5. Done! ✅
