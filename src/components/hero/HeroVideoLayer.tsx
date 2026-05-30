"use client";

import { useEffect, useRef, useState } from "react";
import { HERO_VIDEO } from "@/lib/hero-video";

export function HeroVideoLayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useVideo, setUseVideo] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => {
      setUseVideo(true);
      setReady(true);
      video.play().catch(() => setUseVideo(false));
    };
    const onError = () => setUseVideo(false);

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("error", onError);
    video.load();

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onError);
    };
  }, []);

  return (
    <>
      {/* Premium Stock Video Background - Bright and Visible */}
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          useVideo && ready ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={HERO_VIDEO.poster}
        aria-hidden
      >
        <source src={HERO_VIDEO.webm} type="video/webm" />
        <source src={HERO_VIDEO.mp4} type="video/mp4" />
      </video>

      {/* Minimal Soft Overlay - Only for Text Readability */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent"
        aria-hidden
      />
    </>
  );
}
