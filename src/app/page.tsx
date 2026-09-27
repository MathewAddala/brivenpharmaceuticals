"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, Volume2, VolumeX, RotateCcw } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const [hasTriggeredNav, setHasTriggeredNav] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  // Trigger full-screen white glow portal transition to /categories
  const triggerWhiteGlowTransition = () => {
    if (hasTriggeredNav) return;
    setHasTriggeredNav(true);
    setIsFlashing(true);

    // Navigate to categories as the white light completely engulfs the screen
    setTimeout(() => {
      router.push("/categories");
    }, 700);
  };

  // Monitor video: when reaching the final frame of light, blend it with pure white glow
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    
    if (duration > 0) {
      setProgress((currentTime / duration) * 100);
      
      // The video's last frame bursts into light; trigger the matching white glow
      if (!hasTriggeredNav && duration - currentTime <= 0.85) {
        setHasTriggeredNav(true);
        setIsFlashing(true);
        setTimeout(() => {
          router.push("/categories");
        }, 750);
      }
    }
  };

  const handleVideoEnded = () => {
    triggerWhiteGlowTransition();
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const restartVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      setIsFlashing(false);
      setHasTriggeredNav(false);
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <div
      onClick={triggerWhiteGlowTransition}
      className="fixed inset-0 w-screen h-screen h-[100dvh] overflow-hidden bg-black select-none cursor-pointer z-50"
    >
      {/* FULL-SCREEN VR VIDEO: Completely edge-to-edge */}
      <video
        ref={videoRef}
        src="/images/Mascot_riding_scooter_toward_camera_20260928000818.mp4"
        autoPlay
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        poster="/images/hero-banner.jpg"
        className="w-full h-full object-cover object-center scale-[1.02] transition-transform duration-1000"
      />

      {/* Subtle Cinematic Vignette Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* PURE WHITE GLOWING VR PORTAL TRANSITION OVERLAY */}
      <div
        className={`fixed inset-0 z-50 bg-white pointer-events-none transition-opacity duration-700 ease-out ${
          isFlashing ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-radial from-white via-white/90 to-emerald-100/40" />
      </div>

      {/* TOP HUD: Minimal Frosted Glass Navigation */}
      <header className="absolute top-0 inset-x-0 z-30 flex items-center justify-between p-4 sm:p-6 lg:p-8 pointer-events-none">
        {/* Brand Pill */}
        <div className="pointer-events-auto flex items-center gap-2.5 rounded-full bg-white/85 backdrop-blur-xl px-3.5 py-1.5 sm:px-4 sm:py-2 border border-white/60 shadow-lg">
          <Image
            src="/images/briven-logo.png"
            alt="Briven Logo"
            width={24}
            height={24}
            className="h-5 w-auto object-contain"
          />
          <span className="font-display text-xs sm:text-sm font-black text-slate-900 tracking-tight">
            Briven Pharmaceuticals
          </span>
          <span className="hidden xs:inline-block text-[9px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
            WHO-GMP
          </span>
        </div>

        {/* Skip to Categories Button */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={toggleMute}
            className="rounded-full bg-white/80 hover:bg-white backdrop-blur-xl p-2 sm:p-2.5 text-slate-700 border border-white/60 shadow-md transition-transform hover:scale-105"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={restartVideo}
            className="rounded-full bg-white/80 hover:bg-white backdrop-blur-xl p-2 sm:p-2.5 text-slate-700 border border-white/60 shadow-md transition-transform hover:scale-105"
            title="Replay Video"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <Link
            href="/categories"
            onClick={(e) => {
              e.stopPropagation();
              triggerWhiteGlowTransition();
            }}
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-700/90 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5 shadow-lg backdrop-blur-xl border border-emerald-400/50 transition-all hover:scale-105 cursor-pointer"
          >
            <span>Skip Intro</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      {/* BOTTOM HUD: VR Title & Click Anywhere Trigger */}
      <footer className="absolute bottom-0 inset-x-0 z-30 pb-6 sm:pb-8 pt-16 flex flex-col items-center justify-end text-center pointer-events-none px-4">
        {/* Glow Pill */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-xl px-3.5 py-1 text-[11px] font-black text-emerald-950 border border-emerald-200/90 shadow-xl mb-3 animate-pulse">
          <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
          <span>Express Delivery Mascot • Tap screen to enter</span>
        </div>

        {/* Cinematic Headline */}
        <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          Caring for Life, Delivering Trust.
        </h1>

        <p className="mt-1 text-xs sm:text-sm font-semibold text-emerald-100/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Vijayawada Express Pharmacy Dispatch
        </p>

        {/* Enter Store Button (Clickable) */}
        <div className="mt-4 pointer-events-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              triggerWhiteGlowTransition();
            }}
            className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-emerald-50 text-slate-900 font-black text-xs sm:text-sm px-6 py-3 sm:px-8 sm:py-3.5 shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer border border-white"
          >
            <span>Enter Product Categories</span>
            <ArrowRight className="h-4 w-4 text-emerald-700" />
          </button>
        </div>

        {/* Bottom Playback Progress Line */}
        <div className="w-full max-w-md h-1 bg-white/20 rounded-full mt-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-white transition-all duration-150 ease-linear rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </footer>
    </div>
  );
}
