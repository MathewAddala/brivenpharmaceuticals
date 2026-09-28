"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Volume2, VolumeX, RotateCcw, ShieldCheck } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const [hasTriggeredNav, setHasTriggeredNav] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const videoSrc = "/images/Logo_fading_in_on_background_20260928094541.mp4";

  // Trigger smooth white glow transition to /categories
  const triggerTransition = () => {
    if (hasTriggeredNav) return;
    setHasTriggeredNav(true);
    setIsFlashing(true);

    setTimeout(() => {
      router.push("/categories");
    }, 650);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    if (duration > 0) {
      setProgress((currentTime / duration) * 100);

      // Smoothly trigger transition when the logo animation completes
      if (!hasTriggeredNav && duration - currentTime <= 0.45) {
        triggerTransition();
      }
    }
  };

  const handleVideoEnded = () => {
    triggerTransition();
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
      onClick={triggerTransition}
      className="fixed inset-0 w-screen h-screen h-[100dvh] overflow-hidden bg-[#092317] select-none cursor-pointer z-50 flex flex-col justify-between"
    >
      {/* FULL-SCREEN VIDEO CONTAINER: Seamlessly centered and scaled */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#092317]">
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted={isMuted}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          className="w-full h-full object-contain md:object-cover scale-[1.01]"
        />
      </div>

      {/* Subtle edge vignette for cinematic depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

      {/* WHITE GLOW PORTAL TRANSITION OVERLAY TO /categories */}
      <div
        className={`fixed inset-0 z-50 bg-white pointer-events-none transition-opacity duration-650 ease-out ${
          isFlashing ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-radial from-white via-white/95 to-emerald-100/40" />
      </div>

      {/* TOP HUD: Minimal Frosted Glass Navigation */}
      <header className="relative z-30 flex items-center justify-between p-4 sm:p-6 lg:p-8 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xl px-3.5 py-1.5 border border-white/15 shadow-lg">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span className="text-[11px] sm:text-xs font-black tracking-wider text-emerald-200 uppercase">
            WHO-GMP Certified Formulations
          </span>
        </div>

        {/* Audio, Replay, and Skip Buttons */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={toggleMute}
            className="rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-xl p-2 sm:p-2.5 text-white border border-white/20 shadow-md transition-transform hover:scale-105"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={restartVideo}
            className="rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-xl p-2 sm:p-2.5 text-white border border-white/20 shadow-md transition-transform hover:scale-105"
            title="Replay Intro"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <Link
            href="/categories"
            onClick={(e) => {
              e.stopPropagation();
              triggerTransition();
            }}
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5 shadow-lg backdrop-blur-xl border border-emerald-400/40 transition-all hover:scale-105 cursor-pointer"
          >
            <span>Skip Intro</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      {/* BOTTOM HUD: Clean CTA & Progress Bar */}
      <footer className="relative z-30 pb-6 sm:pb-8 flex flex-col items-center justify-end text-center pointer-events-none px-4">
        {/* Enter Store Button (Clickable) */}
        <div className="pointer-events-auto mb-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              triggerTransition();
            }}
            className="group inline-flex items-center gap-2 rounded-full bg-white/95 hover:bg-white text-slate-950 font-black text-xs sm:text-sm px-6 py-3 sm:px-8 sm:py-3.5 shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer border border-white/80"
          >
            <span>Explore Product Categories</span>
            <ArrowRight className="h-4 w-4 text-emerald-700 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-200/80 mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>Tap anywhere to continue</span>
        </div>

        {/* Video Playback Progress Bar */}
        <div className="w-full max-w-xs sm:max-w-md h-1 bg-white/15 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 via-teal-300 to-white transition-all duration-150 ease-linear rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </footer>
    </div>
  );
}
