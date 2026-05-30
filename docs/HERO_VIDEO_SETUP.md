# Hero Section Stock Video Setup Guide

## Overview
Your hero section now uses a premium autoplay stock background video with centered text layout. Follow these steps to add professional surgical/medical manufacturing footage.

## Step 1: Find Premium Stock Video

### Best Free/Affordable Sources:
- **Pexels Videos** (Free, High Quality): https://www.pexels.com/videos/
- **Pixabay Videos** (Free): https://pixabay.com/videos/
- **Unsplash Videos** (Free): https://videos.unsplash.com/
- **Envato Elements** (Paid, Premium Quality): https://elements.envato.com/
- **Shutterstock** (Paid, Extensive Library): https://www.shutterstock.com/
- **iStock** (Paid): https://www.istockphoto.com/

### Search Keywords:
- "Surgical cotton manufacturing"
- "Medical supplies factory"
- "Hospital equipment production"
- "Surgical products packaging"
- "Healthcare manufacturing"
- "Orthopedic supplies production"
- "Medical packaging line"
- "Hospital sterile production"
- "Bandage manufacturing"
- "Medical roll production"

## Step 2: Download Video in Multiple Formats

Download in these formats for best compatibility:
- **MP4** (H.264 codec, 1080p or 4K) - Required format
- **WebM** (VP8/VP9 codec, 1080p) - For better compression

### Recommended Video Specs:
- Resolution: 1920x1080 (1080p) or 3840x2160 (4K)
- Duration: 20-40 seconds
- Frame Rate: 24-30fps
- File Size: MP4 < 15MB, WebM < 10MB
- Aspect Ratio: 16:9

## Step 3: Compress Videos (Reduce File Size)

### Using HandBrake (Free):
1. Download: https://handbrake.fr/
2. Open video in HandBrake
3. Select Video Codec: H.264 (for MP4)
4. Quality/Bitrate: 4000-6000 kbps
5. Output Format: MP4
6. Export

### Using FFmpeg (Command Line):
```bash
# MP4 Compression
ffmpeg -i input_video.mp4 -c:v libx264 -b:v 5000k -c:a aac -b:a 128k output.mp4

# WebM Compression
ffmpeg -i input_video.mp4 -c:v libvpx-vp9 -b:v 4000k -c:a libopus -b:a 128k output.webm
```

### Using Online Tools:
- **CloudConvert**: https://cloudconvert.com/
- **Convertio**: https://convertio.co/
- **Online-Convert**: https://online-convert.com/

## Step 4: Create Poster Image

Create a still frame from the video for loading:
```bash
ffmpeg -i hero-loop.mp4 -ss 00:00:02 -vf scale=1920:1080 -vframes 1 hero-poster.jpg
```

## Step 5: Add Files to Project

1. **Rename files** to:
   - `hero-loop.mp4`
   - `hero-loop.webm`
   - `hero-poster.jpg`

2. **Place in**: `public/video/`
   ```
   public/
   └── video/
       ├── hero-loop.mp4
       ├── hero-loop.webm
       └── hero-poster.jpg
   ```

3. **Create directories** if they don't exist:
   ```bash
   mkdir -p public/video
   ```

## Step 6: Update Constants (If Path Changes)

File: `src/lib/hero-video.ts`

```typescript
export const HERO_VIDEO = {
  mp4: "/video/hero-loop.mp4",
  webm: "/video/hero-loop.webm",
  poster: "/video/hero-poster.jpg",
  duration: 30,
} as const;
```

## Video Features Implemented

✅ **Autoplay** - Starts automatically when page loads
✅ **Muted** - No sound (prevents autoplay issues)
✅ **Loop** - Infinite playback
✅ **Mobile Responsive** - `playsInline` for mobile devices
✅ **Lazy Loading** - `preload="metadata"` for fast initial load
✅ **Multiple Formats** - MP4 + WebM for broad browser support
✅ **Bright Display** - No dark overlay, only subtle gradient for text readability
✅ **Smooth Fade** - 1000ms opacity transition when video loads
✅ **Fallback Support** - Canvas animation if video fails to load

## Performance Optimization Tips

1. **File Size**: Keep MP4 under 15MB, WebM under 10MB
2. **Resolution**: 1920x1080 works for most devices
3. **Duration**: 20-40 seconds optimal
4. **Compression**: Use H.264 for MP4, VP9 for WebM
5. **Bitrate**: 4000-6000 kbps for quality balance
6. **Testing**: Test on 4G to ensure acceptable load time

## Browser Support

| Browser | MP4 Support | WebM Support | Fallback |
|---------|-----------|-----------|----------|
| Chrome | ✅ | ✅ | Canvas |
| Firefox | ✅ | ✅ | Canvas |
| Safari | ✅ | ❌ | Canvas |
| Edge | ✅ | ✅ | Canvas |
| Mobile (iOS) | ✅ | N/A | Canvas |
| Mobile (Android) | ✅ | ✅ | Canvas |

## Hero Section Enhancements

### Text Layout
- ✅ Centered heading and content
- ✅ Responsive text sizing (4xl to 6xl on desktop)
- ✅ White text with drop shadows for readability
- ✅ Premium typography with proper spacing

### CTA Buttons
1. **View Products** - Orange (brand color)
2. **Contact Us** - White border with glassmorphism
3. **WhatsApp Inquiry** - WhatsApp green (#25D366)

### Visual Elements
- ✅ Centered brand logo with glassmorphic background
- ✅ Brand tag (Ganpati Lifecare - GLC)
- ✅ Smooth entrance animations
- ✅ Animated scroll indicator
- ✅ Wave divider at bottom

## Troubleshooting

### Video Not Playing
- Check browser console for errors
- Ensure MP4 format is supported
- Verify file paths are correct
- Check file exists in `public/video/`

### Video Loads Slowly
- Reduce file size using compression
- Increase bitrate if quality is poor
- Use CDN for video delivery (advanced)

### Text Not Readable
- Increase overlay opacity in `HeroVideoLayer.tsx`
- Add text-shadow/drop-shadow to text
- Choose video with more contrast

### Mobile Issues
- Ensure `playsInline` attribute is set
- Test on actual mobile devices
- Check file size on slower connections

## Next Steps

1. Download premium stock video (recommendations above)
2. Compress to MP4 + WebM formats
3. Create poster image
4. Place files in `public/video/`
5. Test in development: `npm run dev`
6. Deploy and monitor performance

## Example Stock Videos

### Premium Options (Paid - Best Quality):
- Envato Elements: "Medical Manufacturing 4K"
- Shutterstock: "Surgical Product Production"
- iStock: "Healthcare Factory"

### Free Options (Good Quality):
- Pexels: Search "surgical" or "medical factory"
- Pixabay: Search "hospital" or "medical supplies"
- Unsplash: Search "healthcare" or "manufacturing"

---

For questions or issues, refer to the React Video documentation or contact your development team.
