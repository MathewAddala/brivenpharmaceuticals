"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ChevronDown, ShieldCheck, Zap, HeartPulse, Check } from "lucide-react";

const CATEGORIES = [
  { label: "All Categories", short: "All", value: "All" },
  { label: "Gastrointestinal", short: "Gastro", value: "Gastrointestinal" },
  { label: "Pain & Relief", short: "Pain", value: "Pain & Inflammation" },
  { label: "Antibiotics", short: "Antibiotics", value: "Antibiotics" },
  { label: "Neuropathic Care", short: "Neuro", value: "Neuropathic Care" },
  { label: "Clinical Nutrition", short: "Nutrition", value: "Nutritional Supplements" },
];

export default function Hero() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (selectedCategory !== "All" && query) {
      router.push(`/products?category=${encodeURIComponent(selectedCategory)}&q=${encodeURIComponent(query)}`);
    } else if (selectedCategory !== "All") {
      router.push(`/products?category=${encodeURIComponent(selectedCategory)}`);
    } else if (query) {
      router.push(`/products?q=${encodeURIComponent(query)}`);
    } else {
      router.push("/products");
    }
  };

  const currentCategoryLabel =
    CATEGORIES.find((c) => c.value === selectedCategory)?.short || "All";

  return (
    <section className="relative overflow-visible bg-gradient-to-b from-[#e8f6ef] via-[#f0f8f4] to-white py-2.5 sm:py-6 lg:py-8">
      <div className="mx-auto max-w-7xl px-2.5 sm:px-6 lg:px-8">

        {/* Search Bar with Custom React Dropdown */}
        <form
          onSubmit={handleSearch}
          className="mb-2.5 sm:mb-5 flex items-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-xs p-1 sm:p-1.5 relative z-40"
        >
          {/* Custom Category Dropdown */}
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 bg-slate-50 hover:bg-slate-100 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-2 text-[10px] sm:text-xs font-bold text-slate-700 transition-colors border border-slate-200/80 cursor-pointer"
            >
              <span>{currentCategoryLabel}</span>
              <ChevronDown
                className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Custom Dropdown Menu: z-[100], fits all 6 categories without cutting off the bottom */}
            {isDropdownOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-52 sm:w-56 rounded-2xl bg-white border border-slate-200 shadow-2xl p-1.5 z-[100] animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                  Select Category
                </div>
                {/* Max height allows all 6 items to show fully, with smooth touch scrolling if needed */}
                <div className="space-y-0.5 max-h-72 overflow-y-auto overscroll-contain touch-pan-y">
                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.value;
                    return (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat.value);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-bold transition-all text-left cursor-pointer ${
                          isSelected
                            ? "bg-emerald-50 text-emerald-900"
                            : "text-slate-700 hover:bg-slate-50 hover:text-emerald-800"
                        }`}
                      >
                        <span>{cat.label}</span>
                        {isSelected && (
                          <Check className="h-3.5 w-3.5 text-emerald-700 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Search Input */}
          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search "Naproxen, Esomeprazole, Rabeprazole..."'
              className="w-full bg-transparent px-2 sm:px-3 py-1.5 text-[11px] sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="rounded-lg sm:rounded-xl bg-emerald-700 hover:bg-emerald-800 p-2 sm:p-2.5 text-white shadow-xs transition-colors shrink-0 cursor-pointer"
            aria-label="Search medicine"
          >
            <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </form>

        {/* Hero Banner Card — Mascot top is preserved on desktop with object-[95%_top] */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#c5ebdc] shadow-xs border border-emerald-100 min-h-[175px] sm:min-h-[440px] lg:min-h-[500px] flex items-center">
          {/* Mascot Delivery Scooter pinned to the right & top so helmet is never cut off on desktop */}
          <Image
            src="/images/hero-banner.jpg"
            alt="Briven Pharmaceutical Delivery Mascot"
            fill
            priority
            unoptimized
            className="object-cover object-[92%_center] sm:object-[95%_top] lg:object-[96%_top]"
          />

          {/* Mint Gradient Overlay for pristine text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#c5ebdc] via-[#c5ebdc]/95 40%:via-[#c5ebdc]/85 sm:via-[#c5ebdc]/65 to-transparent pointer-events-none" />

          {/* Left Text Content strictly constrained to avoid overlapping the bike */}
          <div className="relative z-10 w-[52%] sm:w-[58%] md:max-w-md lg:max-w-xl pl-3.5 pr-1 py-3.5 sm:px-8 sm:py-8 lg:px-12 text-left">
            {/* Trust pill */}
            <div className="inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-xs px-2 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-xs font-extrabold text-emerald-900 shadow-xs mb-1 sm:mb-3 border border-emerald-200/60">
              <ShieldCheck className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">Express Dispatch</span>
            </div>

            {/* Catchy Headline */}
            <h1 className="font-display text-base sm:text-3xl lg:text-5xl font-black text-slate-900 leading-[1.12] tracking-tight">
              Buy Medicines & <br />
              <span className="text-emerald-800">Health Essentials</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-1 sm:mt-2 text-[9px] sm:text-xs md:text-sm lg:text-base text-slate-700 font-medium leading-tight sm:leading-relaxed">
              Genuine certified formulations delivered to your doorstep with express dispatch.
            </p>

            {/* CTA Buttons */}
            <div className="mt-2 sm:mt-4 flex flex-wrap items-center gap-1.5 sm:gap-2.5">
              <Link
                href="/products"
                className="rounded-full bg-emerald-800 hover:bg-emerald-900 px-3 py-1 sm:px-5 sm:py-2 text-[9px] sm:text-xs font-bold text-white shadow-xs transition-transform hover:scale-102"
              >
                Browse Medicines
              </Link>
              <a
                href="https://wa.me/919493504671?text=Hi%20Briven%2C%20I%20am%20looking%20for%20a%20specific%20medicine"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/90 hover:bg-white px-2.5 py-1 sm:px-5 sm:py-2 text-[9px] sm:text-xs font-bold text-slate-800 shadow-xs border border-slate-200/80 transition-transform hover:scale-102 hidden xs:inline-flex"
              >
                WhatsApp Order
              </a>
            </div>

            {/* Desktop trust row */}
            <div className="mt-4 hidden md:flex flex-wrap items-center gap-4 text-[11px] font-bold text-emerald-950">
              <div className="inline-flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-emerald-700" />
                <span>Fast Doorstep Dispatch</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
                <span>WHO-GMP Quality Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
