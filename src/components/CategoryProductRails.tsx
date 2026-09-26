"use client";

import Link from "next/link";
import { ChevronRight, ShieldCheck, Check, ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { products, type Product, type ProductCategory } from "@/data/products";

interface CategoryRailConfig {
  id: string;
  category: ProductCategory;
  title: string;
  badge: string;
  subtitle: string;
  highlightPoints: string[];
  bannerBg: string;
  bannerBorder: string;
  textColor: string;
  badgeBg: string;
  buttonBg: string;
}

const CATEGORY_RAILS: CategoryRailConfig[] = [
  {
    id: "gastro",
    category: "Gastrointestinal",
    title: "Gastrointestinal Care",
    badge: "Acidity & Digestion",
    subtitle: "Dual-release proton pump inhibitors & prompt prokinetics for severe reflux and nausea.",
    highlightPoints: [
      "Dual-release enteric granules",
      "Immediate & sustained pH control",
      "Erosive esophagitis relief",
    ],
    bannerBg: "bg-gradient-to-br from-[#fdf2f2] via-[#fae6e6] to-[#fce5e5]",
    bannerBorder: "border-rose-200/80",
    textColor: "text-rose-950",
    badgeBg: "bg-rose-100 text-rose-800 border-rose-300/70",
    buttonBg: "bg-rose-900 hover:bg-rose-950 text-white",
  },
  {
    id: "pain",
    category: "Pain & Inflammation",
    title: "Pain & Inflammation Relief",
    badge: "Joint & Muscular",
    subtitle: "Fast-acting anti-inflammatory and pain relief formulations with built-in gastric protection.",
    highlightPoints: [
      "Targeted COX-2 pain reduction",
      "Gastric-sparing formulations",
      "Rapid absorption & mobility",
    ],
    bannerBg: "bg-gradient-to-br from-[#fef8ed] via-[#faeed6] to-[#faecd6]",
    bannerBorder: "border-amber-200/80",
    textColor: "text-amber-950",
    badgeBg: "bg-amber-100 text-amber-800 border-amber-300/70",
    buttonBg: "bg-amber-900 hover:bg-amber-950 text-white",
  },
  {
    id: "antibiotics",
    category: "Antibiotics",
    title: "Antibiotics & Anti-Infectives",
    badge: "Broad Spectrum",
    subtitle: "WHO-GMP certified broad-spectrum antibacterial agents with high clinical bio-availability.",
    highlightPoints: [
      "High microbial eradication rate",
      "Moisture-barrier blister packaging",
      "WHO-GMP batch quality assured",
    ],
    bannerBg: "bg-gradient-to-br from-[#effaf4] via-[#def3e8] to-[#d2efe1]",
    bannerBorder: "border-emerald-200/80",
    textColor: "text-emerald-950",
    badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-300/70",
    buttonBg: "bg-emerald-900 hover:bg-emerald-950 text-white",
  },
  {
    id: "neuropathic",
    category: "Neuropathic Care",
    title: "Neuropathic & Nerve Health",
    badge: "Cellular Repair",
    subtitle: "High-potency Pregabalin & Methylcobalamin combinations for peripheral nerve rejuvenation.",
    highlightPoints: [
      "Relieves neuropathic tingling & pain",
      "Accelerates myelin sheath repair",
      "Improves nerve conduction velocity",
    ],
    bannerBg: "bg-gradient-to-br from-[#f7f2fd] via-[#efe5fb] to-[#e8d9f9]",
    bannerBorder: "border-purple-200/80",
    textColor: "text-purple-950",
    badgeBg: "bg-purple-100 text-purple-800 border-purple-300/70",
    buttonBg: "bg-purple-900 hover:bg-purple-950 text-white",
  },
  {
    id: "nutrition",
    category: "Nutritional Supplements",
    title: "Clinical Nutrition & Vitality",
    badge: "Clinical Recovery",
    subtitle: "Whey protein hydrolysates with MCT oil and chelated minerals for swift convalescence.",
    highlightPoints: [
      "Pre-digested rapid absorption peptides",
      "Fortified with CoQ10 & Magnesium",
      "Zero empty fillers & pleasant taste",
    ],
    bannerBg: "bg-gradient-to-br from-[#f0f7fe] via-[#e2effd] to-[#d8ebf9]",
    bannerBorder: "border-sky-200/80",
    textColor: "text-sky-950",
    badgeBg: "bg-sky-100 text-sky-800 border-sky-300/70",
    buttonBg: "bg-sky-900 hover:bg-sky-950 text-white",
  },
];

function SingleCategorySection({
  config,
  onQuickView,
}: {
  config: CategoryRailConfig;
  onQuickView: (p: Product) => void;
}) {
  const categoryProducts = products.filter(
    (p) => p.category === config.category
  );

  if (categoryProducts.length === 0) return null;

  return (
    <div
      id={config.id}
      className="pt-4 pb-3 sm:pt-7 sm:pb-5 border-b border-slate-100 last:border-b-0"
    >
      {/* Mobile Category Header */}
      <div className="flex sm:hidden items-center justify-between mb-2">
        <div>
          <span
            className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${config.badgeBg}`}
          >
            {config.badge}
          </span>
          <h3 className="font-display text-sm font-black text-slate-900 mt-1 leading-tight">
            {config.title}
          </h3>
        </div>

        <Link
          href={`/products?category=${encodeURIComponent(config.category)}`}
          className="inline-flex items-center gap-0.5 text-[10px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full"
        >
          <span>See all</span>
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      {/* MOBILE: Pure horizontal scroll rail without awkward empty space */}
      <div className="flex sm:hidden gap-2.5 overflow-x-auto scrollbar-none -mx-2.5 px-2.5 py-1">
        {categoryProducts.map((product) => (
          <div key={product.id} className="w-[155px] shrink-0">
            <ProductCard product={product} onQuickView={onQuickView} />
          </div>
        ))}
      </div>

      {/* DESKTOP (Webview): Creative Category Spotlight Layout */}
      {/* Solves empty white space by pairing a Category Spotlight Card with the products */}
      <div className="hidden sm:flex gap-5 items-stretch">
        {/* Left Spotlight Banner Card (Eliminates empty space on desktop) */}
        <div
          className={`w-72 shrink-0 rounded-2xl border ${config.bannerBorder} ${config.bannerBg} p-5 flex flex-col justify-between shadow-xs`}
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span
                className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${config.badgeBg}`}
              >
                {config.badge}
              </span>
              <span className="text-xs font-bold opacity-60">
                {categoryProducts.length} items
              </span>
            </div>

            <h3
              className={`font-display text-lg font-black leading-tight ${config.textColor}`}
            >
              {config.title}
            </h3>

            <p className="mt-2 text-xs opacity-80 leading-relaxed font-medium">
              {config.subtitle}
            </p>

            {/* Key clinical highlights */}
            <div className="mt-3.5 space-y-1.5 pt-3 border-t border-black/5">
              {config.highlightPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-1.5 text-[11px] font-semibold opacity-90"
                >
                  <Check className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-700" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <Link
              href={`/products?category=${encodeURIComponent(config.category)}`}
              className={`inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-xs ${config.buttonBg}`}
            >
              <span>Explore {config.title.split(" ")[0]}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Area: Product Cards comfortably filling the space */}
        <div
          className={`flex-1 grid gap-4 ${
            categoryProducts.length === 2
              ? "grid-cols-2 max-w-xl"
              : "grid-cols-3"
          }`}
        >
          {categoryProducts.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} onQuickView={onQuickView} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CategoryProductRails({
  onQuickView,
}: {
  onQuickView: (p: Product) => void;
}) {
  return (
    <section className="bg-white py-4 sm:py-8">
      <div className="mx-auto max-w-7xl px-2.5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Certified Medicine Catalog</span>
            </div>
            <h2 className="font-display text-base sm:text-2xl font-black text-slate-900 mt-0.5">
              Explore by Therapeutic Category
            </h2>
          </div>

          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-900"
          >
            <span>View All 12 Formulations</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Category Sections */}
        <div className="space-y-2 sm:space-y-4">
          {CATEGORY_RAILS.map((config) => (
            <SingleCategorySection
              key={config.id}
              config={config}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
