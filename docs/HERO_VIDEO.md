# GLC Hero Background Video

## What’s on the site

The homepage hero uses a **30-second seamless loop** with:

1. **Live canvas motion graphics** (always active) — scenes, product labels, GLC glow, particles
2. **Optional MP4/WebM** at `public/video/hero-loop.mp4` and `hero-loop.webm` when generated or replaced

Videos autoplay **muted** (required by browsers). Add background music separately via a user-controlled audio toggle if needed.

## Regenerate branded placeholder video

```bash
npm run generate:hero-video
```

Outputs:

- `public/video/hero-loop.mp4` (H.264, web-optimized)
- `public/video/hero-loop.webm` (VP9)
- `public/video/hero-poster.jpg`

## Replace with professional footage

1. Produce 25–40s **16:9** cinematic footage (manufacturing, products, uniforms, QC).
2. Export:
   - **MP4**: H.264, 1280×720 or 1920×1080, CRF 22–24, `faststart`
   - **WebM**: VP9 for smaller size
3. Overwrite files in `public/video/`.
4. Keep `hero-poster.jpg` as first-frame poster.

### FFmpeg example (after you have `source.mp4`)

```bash
ffmpeg -i source.mp4 -t 30 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" -c:v libx264 -crf 23 -preset medium -movflags +faststart public/video/hero-loop.mp4

ffmpeg -i source.mp4 -t 30 -vf "scale=1280:720" -c:v libvpx-vp9 -b:v 1M public/video/hero-loop.webm
```

## Production brief (for videographer / AI video tools)

- Style: Clean medical manufacturing, soft light, green/white/orange brand
- Scenes: Factory walk-through, cotton rolls, uniforms, product pack shots, QC packing, macro products, GLC logo end card
- Music: Soft corporate (license for web use)
- Loop: Match first and last frame for seamless repeat

## Tools

- **Runway / Pika / Kling** — AI B-roll from scene prompts  
- **Stock**: Artgrid, Storyblocks (medical manufacturing)  
- **Local studio** — Best for real factory and product shots
