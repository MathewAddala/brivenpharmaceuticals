"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
  Truck,
  Upload,
  MessageCircle,
  Pill,
} from "lucide-react";

interface Slide {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  bgGradient: string;
  accentBadge: string;
  pillTag: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaAction?: () => void;
  secondaryCtaLink?: string;
  features: string[];
}

export default function HeroCarousel({
  onOpenPrescription,
}: {
  onOpenPrescription: () => void;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides: Slide[] = [
    {
      id: 1,
      badge: "Genuine Briven Formulations",
      title: "Authentic Medicines & Clinical Nutrition Delivered to You",
      subtitle:
        "Doctor-trusted formulations across pain relief, acid suppression, broad-spectrum anti-infectives, and advanced clinical whey nutrition. 100% batch-verified.",
      bgGradient: "from-[#042c1f] via-[#074734] to-[#005e52]",
      accentBadge: "WHO-GMP CERTIFIED",
      pillTag: "WHO-GMP Formulations",
      ctaText: "Explore 12 Formulations",
      ctaLink: "/products",
      secondaryCtaText: "Upload Prescription",
      secondaryCtaAction: onOpenPrescription,
      features: [
        "100% Genuine Sourced",
        "Cold-Chain Assured Storage",
        "Direct Pharmacist Review",
      ],
    },
    {
      id: 2,
      badge: "Gastrointestinal Care",
      title: "Rapid & Sustained Acid Relief with ECIDOM & BRIVRAB-ISR",
      subtitle:
        "Dual-release gastro-resistant Rabeprazole & Esomeprazole with Domperidone for severe acid reflux, gastritis, and prompt nausea control.",
      bgGradient: "from-[#032e3b] via-[#0a485c] to-[#0d6986]",
      accentBadge: "DUAL RELEASE",
      pillTag: "Fast Acidity Relief",
      ctaText: "View Gastro Range",
      ctaLink: "/products?category=Gastrointestinal",
      secondaryCtaText: "Order on WhatsApp",
      secondaryCtaLink:
        "https://wa.me/919493504671?text=Hi%20Briven%2C%20I%20want%20to%20order%20Gastro%20medicines%20like%20Ecidom%20and%20Brivrab",
      features: [
        "Immediate + Sustained Action",
        "Heals Erosive Esophagitis",
        "24-Hour pH Control",
      ],
    },
    {
      id: 3,
      badge: "Clinical Nutrition & Nerve Care",
      title: "BE-NUTRA Whey Hydrolysate & PREGANEX-M Neuropathic Care",
      subtitle:
        "21.1% Whey Protein Hydrolysate with MCT oil for rapid convalescence, paired with high-potency Methylcobalamin & CoQ10 cellular recovery.",
      bgGradient: "from-[#2f2208] via-[#543d0d] to-[#785711]",
      accentBadge: "CLINICAL GRADE",
      pillTag: "Recovery & Vitality",
      ctaText: "Explore Supplements",
      ctaLink: "/products?category=Nutritional%20Supplements",
      secondaryCtaText: "Consult Pharmacist",
      secondaryCtaLink:
        "https://wa.me/919493504671?text=Hi%20Briven%2C%20I%20want%20to%20consult%20regarding%20BE-NUTRA%20and%20supplements",
      features: [
        "21.1% Whey Hydrolysate",
        "12.5% MCT Oil Rapid Absorption",
        "Chelated Magnesium + CoQ10",
      ],
    },
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const slide = slides[currentSlide];

  return (
    <div
      className="relative overflow-hidden bg-slate-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slide Transition Container */}
      <div
        className={`relative bg-gradient-to-r ${slide.bgGradient} transition-all duration-700 ease-out`}
      >
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%)`,
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 text-white space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md px-3 py-1 text-xs font-bold text-emerald-200 ring-1 ring-white/20">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
                  {slide.badge}
                </span>
                <span className="rounded-full bg-amber-500 px-2.5 py-0.5 text-xs font-black text-white shadow-xs">
                  {slide.accentBadge}
                </span>
                <span className="hidden sm:inline-flex rounded-full bg-emerald-950/60 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300 border border-emerald-500/30">
                  {slide.pillTag}
                </span>
              </div>

              <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.15] tracking-tight">
                {slide.title}
              </h1>

              <p className="max-w-2xl text-sm sm:text-base text-emerald-100/85 leading-relaxed font-normal">
                {slide.subtitle}
              </p>

              {/* Trust feature pills */}
              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-emerald-200/90 font-medium">
                {slide.features.map((feat) => (
                  <span key={feat} className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                    {feat}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <Link
                  href={slide.ctaLink}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-900 hover:bg-emerald-50 transition-colors shadow-lg shadow-black/20"
                >
                  <Pill className="h-4 w-4 text-emerald-800" />
                  {slide.ctaText}
                </Link>

                {slide.secondaryCtaAction ? (
                  <button
                    onClick={slide.secondaryCtaAction}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 backdrop-blur-md px-5 py-3 text-sm font-bold text-white ring-1 ring-white/30 hover:bg-white/25 transition-all shadow-sm"
                  >
                    <Upload className="h-4 w-4 text-emerald-200" />
                    {slide.secondaryCtaText}
                  </button>
                ) : (
                  <a
                    href={slide.secondaryCtaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 backdrop-blur-md px-5 py-3 text-sm font-bold text-white ring-1 ring-white/30 hover:bg-white/25 transition-all shadow-sm"
                  >
                    <MessageCircle className="h-4 w-4 text-emerald-200" />
                    {slide.secondaryCtaText}
                  </a>
                )}
              </div>
            </div>

            {/* Right Side Quick Promotion Card (Apollo Style) */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-5 text-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/15 pb-3 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                    Briven Store Perks
                  </span>
                  <span className="text-[11px] rounded bg-emerald-400/20 text-emerald-300 font-bold px-2 py-0.5">
                    India-Wide
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <Truck className="h-4 w-4 text-emerald-300" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Direct Doorstep Dispatch</p>
                      <p className="text-emerald-100/70 text-[11px]">
                        Same-day dispatch for confirmed city orders
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <Zap className="h-4 w-4 text-amber-300" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Instant WhatsApp Confirmation</p>
                      <p className="text-emerald-100/70 text-[11px]">
                        No wait times; chat directly with licensed pharmacist
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <ShieldCheck className="h-4 w-4 text-emerald-300" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Full Batch Transparency</p>
                      <p className="text-emerald-100/70 text-[11px]">
                        Expiry dates & manufacturing certificates provided
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 border-t border-white/15 pt-3">
                  <button
                    onClick={onOpenPrescription}
                    className="w-full rounded-xl bg-emerald-500 py-2.5 text-center text-xs font-extrabold text-slate-950 hover:bg-emerald-400 transition-colors shadow-md"
                  >
                    Quick Order via Prescription
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() =>
          setCurrentSlide(
            (prev) => (prev - 1 + slides.length) % slides.length
          )
        }
        className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-colors"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev + 1) % slides.length)
        }
        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-colors"
        aria-label="Next Slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {slides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === idx ? "w-8 bg-white" : "w-2 bg-white/40"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
