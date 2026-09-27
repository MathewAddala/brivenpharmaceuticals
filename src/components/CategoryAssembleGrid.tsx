"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export interface CategoryTile {
  name: string;
  badge: string;
  count: number;
  bgPastel: string;
  borderCol: string;
  hoverBorder: string;
  badgeBg: string;
  textCol: string;
  image: string;
  href: string;
}

export const CATEGORY_TILES: CategoryTile[] = [
  {
    name: "Gastrointestinal",
    badge: "Acidity & Motility",
    count: 3,
    bgPastel: "bg-[#dbf4e7]",
    borderCol: "border-[#a2deb9]",
    hoverBorder: "hover:border-[#6ee7b7] hover:bg-[#ceeedc]",
    badgeBg: "bg-emerald-100 text-emerald-900 border-emerald-300",
    textCol: "text-emerald-950",
    image: "/images/Capsule_floating_near_stomach_shape_2K_20260928000232.jpg",
    href: "/products?category=Gastrointestinal",
  },
  {
    name: "Pain & Inflammation",
    badge: "Joint & Mobility",
    count: 2,
    bgPastel: "bg-[#f4dcd7]",
    borderCol: "border-[#e8b7ad]",
    hoverBorder: "hover:border-[#fca5a5] hover:bg-[#ebd0cb]",
    badgeBg: "bg-rose-100 text-rose-900 border-rose-300",
    textCol: "text-rose-950",
    image: "/images/Joint_mobility_and_pain_relief_2K_20260928000245.jpg",
    href: "/products?category=Pain%20%26%20Inflammation",
  },
  {
    name: "Antibiotics",
    badge: "Broad Spectrum",
    count: 3,
    bgPastel: "bg-[#cbe0ee]",
    borderCol: "border-[#99c3df]",
    hoverBorder: "hover:border-[#7dd3fc] hover:bg-[#bdd7e9]",
    badgeBg: "bg-sky-100 text-sky-900 border-sky-300",
    textCol: "text-sky-950",
    image: "/images/Antibiotic_protection_icon_render_2K_20260928000239.jpg",
    href: "/products?category=Antibiotics",
  },
  {
    name: "Neuropathic Care",
    badge: "Nerve Repair",
    count: 2,
    bgPastel: "bg-[#ded2f0]",
    borderCol: "border-[#bda6e3]",
    hoverBorder: "hover:border-[#c084fc] hover:bg-[#d4c4ec]",
    badgeBg: "bg-purple-100 text-purple-900 border-purple-300",
    textCol: "text-purple-950",
    image: "/images/Nerve_repair_and_vitamin_capsule_2K_20260928000254.jpg",
    href: "/products?category=Neuropathic%20Care",
  },
  {
    name: "Nutritional Supplements",
    badge: "Vitality & Recovery",
    count: 2,
    bgPastel: "bg-[#f7dab6]",
    borderCol: "border-[#e5b77e]",
    hoverBorder: "hover:border-[#fbbf24] hover:bg-[#f0ce9f]",
    badgeBg: "bg-amber-100 text-amber-950 border-amber-300",
    textCol: "text-amber-950",
    image: "/images/Nutrition_tin_with_golden_scoop_2K_20260928000259.jpg",
    href: "/products?category=Nutritional%20Supplements",
  },
  {
    name: "All Formulations",
    badge: "Complete Range",
    count: 12,
    bgPastel: "bg-[#dbedf9]",
    borderCol: "border-[#a4cef2]",
    hoverBorder: "hover:border-[#60a5fa] hover:bg-[#cde4f7]",
    badgeBg: "bg-blue-100 text-blue-900 border-blue-300",
    textCol: "text-blue-950",
    image: "/images/promos/promo-medication-all.jpg",
    href: "/products",
  },
];

export default function CategoryAssembleGrid() {
  const [assembled, setAssembled] = useState(false);

  useEffect(() => {
    // Trigger the assembling entrance on mount
    const timer = setTimeout(() => setAssembled(true), 40);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {/* VR Transition Arrival: White Glow Flash Dispersal from Hero Animation */}
      <div
        className={`pointer-events-none fixed inset-0 z-50 bg-white transition-opacity duration-700 ease-out ${
          assembled ? "opacity-0 invisible" : "opacity-95"
        }`}
      />

      <style jsx global>{`
        @keyframes brivenAssembleCard {
          0% {
            opacity: 0;
            transform: translateY(36px) scale(0.86);
            filter: blur(5px);
          }
          65% {
            transform: translateY(-4px) scale(1.02);
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes brivenShimmerWave {
          0% {
            transform: translateX(-100%) rotate(25deg);
          }
          100% {
            transform: translateX(250%) rotate(25deg);
          }
        }

        @keyframes brivenHeaderDrop {
          0% {
            opacity: 0;
            transform: translateY(-18px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Header Title Section - Glides into place */}
      <div
        className="text-center mb-6 sm:mb-10"
        style={{
          animation: "brivenHeaderDrop 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
          animationDelay: "80ms",
        }}
      >
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-black text-emerald-800 border border-emerald-200/80 mb-2.5 shadow-2xs">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>WHO-GMP Certified Formulations</span>
        </div>

        <h1 className="font-display text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Select Therapeutic Category
        </h1>

        <p className="mt-1.5 text-xs sm:text-sm text-slate-500 font-medium max-w-lg mx-auto">
          Tap any category block below to explore all certified medicines, full compositions, and instant ordering.
        </p>
      </div>

      {/* Grid of Assembling Category Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6">
        {CATEGORY_TILES.map((tile, idx) => {
          const delayMs = 120 + idx * 75;

          return (
            <Link
              key={tile.name}
              href={tile.href}
              style={{
                animation: "brivenAssembleCard 0.65s cubic-bezier(0.16, 1, 0.3, 1) both",
                animationDelay: `${delayMs}ms`,
              }}
              className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 ${tile.borderCol} ${tile.bgPastel} ${tile.hoverBorder} p-3.5 sm:p-6 flex flex-col justify-between items-center text-center transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-xl cursor-pointer min-h-[195px] sm:min-h-[255px]`}
            >
              {/* Glossy Sheen Overlay */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/70 via-white/20 to-transparent" />

              {/* Shimmer sweep effect on initial assemble */}
              <div
                className="pointer-events-none absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  transform: "translateX(-100%) rotate(25deg)",
                  animation: `brivenShimmerWave 1.4s ease-in-out ${delayMs + 350}ms 1`,
                }}
              />

              {/* Top Badge Row */}
              <div className="w-full flex items-center justify-between gap-1 relative z-10">
                <span
                  className={`text-[8px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border shadow-2xs ${tile.badgeBg}`}
                >
                  {tile.badge}
                </span>

                <span className="text-[9px] sm:text-[10px] font-black text-slate-600 bg-white/90 border border-slate-200/70 rounded-full px-2 py-0.5 shadow-2xs">
                  {tile.count} items
                </span>
              </div>

              {/* Center: Cute 3D Category Art Image with Radial Feather Mask (Zero Shade Cut / Seamless Blend) */}
              <div className="relative my-2 sm:my-3 h-24 w-24 sm:h-32 sm:w-32 shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <div
                  className="relative h-full w-full overflow-hidden"
                  style={{
                    WebkitMaskImage: "radial-gradient(circle at center, black 60%, transparent 98%)",
                    maskImage: "radial-gradient(circle at center, black 60%, transparent 98%)",
                  }}
                >
                  <Image
                    src={tile.image}
                    alt={tile.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Bottom: Big Category Name & Chevron */}
              <div className="w-full relative z-10">
                <h2
                  className={`font-display text-sm sm:text-lg font-black leading-tight ${tile.textCol} group-hover:scale-102 transition-transform`}
                >
                  {tile.name}
                </h2>

                <div className="mt-1 flex items-center justify-center gap-1 text-[10px] sm:text-xs font-extrabold opacity-70 group-hover:opacity-100 transition-opacity">
                  <span>Open Category</span>
                  <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
