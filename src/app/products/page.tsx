"use client";

import { useState, useMemo, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import {
  products,
  categories,
  type Product,
  type ProductCategory,
  type PrescriptionType,
} from "@/data/products";
import {
  X,
  Search,
  ShieldCheck,
  ChevronDown,
  Check,
  SlidersHorizontal,
  ArrowUpDown,
} from "lucide-react";

type SortOption = "featured" | "price-asc" | "price-desc" | "discount";

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Highest Discount", value: "discount" },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as ProductCategory | null;
  const initialQuery = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "All">(
    initialCategory || "All"
  );
  const [selectedType, setSelectedType] = useState<PrescriptionType | "All">("All");
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Custom sort dropdown state
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(e.target as Node)
      ) {
        setIsSortDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchType =
        selectedType === "All" || p.prescriptionType === selectedType;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.composition.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.therapeuticClass.toLowerCase().includes(q);
      return matchCategory && matchType && matchSearch;
    });

    if (sortBy === "price-asc") {
      result = [...result].sort((a, b) => a.sellingPrice - b.sellingPrice);
    } else if (sortBy === "price-desc") {
      result = [...result].sort((a, b) => b.sellingPrice - a.sellingPrice);
    } else if (sortBy === "discount") {
      result = [...result].sort((a, b) => b.discount - a.discount);
    }

    return result;
  }, [selectedCategory, selectedType, searchQuery, sortBy]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedType("All");
    setSearchQuery("");
    setSortBy("featured");
  };

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedType !== "All" ||
    searchQuery !== "" ||
    sortBy !== "featured";

  const currentSortLabel =
    SORT_OPTIONS.find((s) => s.value === sortBy)?.label || "Featured";

  return (
    <>
      <Header />
      <main className="flex-1 bg-[#f9fafb]">
        {/* Top Slim Utility Header */}
        <div className="bg-white border-b border-slate-200/80">
          <div className="mx-auto max-w-7xl px-2.5 sm:px-6 lg:px-8 py-2.5 sm:py-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
              <div>
                <div className="flex items-center gap-1.5 text-[9px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>WHO-GMP Certified Formulations</span>
                </div>
                <h1 className="font-display text-base sm:text-2xl font-black text-slate-900 mt-0.5">
                  Briven Medicine Store
                </h1>
              </div>

              {/* Search & Custom Sort Dropdown (No native select) */}
              <div className="flex items-center gap-2">
                {/* Search Input */}
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search medicine or salt..."
                    className="w-full rounded-full border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-7 text-xs text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>

                {/* Custom Sort Dropdown */}
                <div className="relative" ref={sortDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                    className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors cursor-pointer shadow-2xs"
                  >
                    <ArrowUpDown className="h-3 w-3 text-emerald-700" />
                    <span>{currentSortLabel}</span>
                    <ChevronDown
                      className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${
                        isSortDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Custom Dropdown Menu with Glassmorphic Styling */}
                  {isSortDropdownOpen && (
                    <div className="absolute right-0 top-full mt-1.5 w-48 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-2 py-1 text-[9px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                        Sort Products
                      </div>
                      <div className="space-y-0.5">
                        {SORT_OPTIONS.map((opt) => {
                          const isSelected = sortBy === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setSortBy(opt.value);
                                setIsSortDropdownOpen(false);
                              }}
                              className={`w-full flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-bold transition-all text-left ${
                                isSelected
                                  ? "bg-emerald-50 text-emerald-900"
                                  : "text-slate-700 hover:bg-slate-50 hover:text-emerald-800"
                              }`}
                            >
                              <span>{opt.label}</span>
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
              </div>
            </div>

            {/* Blinkit Mobile Miniature Category Pill Rail (Clean typography, NO emojis) */}
            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none -mx-2.5 px-2.5 sm:mx-0 sm:px-0">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === "All"
                    ? "bg-emerald-800 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <span>All Medicines</span>
                <span
                  className={`text-[9px] font-extrabold ml-0.5 ${
                    selectedCategory === "All" ? "text-emerald-200" : "text-slate-400"
                  }`}
                >
                  {products.length}
                </span>
              </button>

              {categories.map((c) => {
                const isSelected = selectedCategory === c.name;
                return (
                  <button
                    key={c.name}
                    onClick={() => setSelectedCategory(c.name)}
                    className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-bold transition-all shrink-0 cursor-pointer ${
                      isSelected
                        ? "bg-emerald-800 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <span>{c.name.split(" ")[0]}</span>
                    <span
                      className={`text-[9px] font-extrabold ml-0.5 ${
                        isSelected ? "text-emerald-200" : "text-slate-400"
                      }`}
                    >
                      {c.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="mx-auto max-w-7xl px-2.5 sm:px-6 lg:px-8 py-3 sm:py-6">
          <div className="flex flex-col lg:flex-row gap-5">
            {/* Optimized Desktop Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-20 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 uppercase tracking-wider">
                    <SlidersHorizontal className="h-3.5 w-3.5 text-emerald-700" />
                    <span>Filter Medicines</span>
                  </div>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-[11px] font-bold text-red-600 hover:underline cursor-pointer"
                    >
                      Reset All
                    </button>
                  )}
                </div>

                {/* Categories (Clean list, NO emojis) */}
                <div>
                  <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">
                    Therapeutic Category
                  </label>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedCategory("All")}
                      className={`w-full text-left rounded-xl px-2.5 py-2 text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                        selectedCategory === "All"
                          ? "bg-emerald-50 text-emerald-900 font-extrabold"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span>All Categories</span>
                      <span className="text-[10px] text-slate-400 font-bold">12</span>
                    </button>

                    {categories.map((cat) => {
                      const isSelected = selectedCategory === cat.name;
                      return (
                        <button
                          key={cat.name}
                          onClick={() => setSelectedCategory(cat.name)}
                          className={`w-full text-left rounded-xl px-2.5 py-2 text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? "bg-emerald-50 text-emerald-900 font-extrabold"
                              : "text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          <span className="truncate">{cat.name}</span>
                          <span className="text-[10px] text-slate-400 font-bold ml-1">
                            {cat.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Prescription Type */}
                <div>
                  <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">
                    Prescription Type
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {(["All", "Rx", "OTC"] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`rounded-lg py-1.5 text-[11px] font-bold transition-all text-center cursor-pointer ${
                          selectedType === type
                            ? "bg-emerald-800 text-white shadow-xs"
                            : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort Option for Web Sidebar (Custom radio pills instead of ugly select) */}
                <div>
                  <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 block">
                    Sort Order
                  </label>
                  <div className="space-y-1">
                    {SORT_OPTIONS.map((opt) => {
                      const isSelected = sortBy === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setSortBy(opt.value)}
                          className={`w-full flex items-center justify-between rounded-xl px-2.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-emerald-50 text-emerald-900 font-bold"
                              : "text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          <span>{opt.label}</span>
                          {isSelected && (
                            <Check className="h-3 w-3 text-emerald-700" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid Area */}
            <div className="flex-1 min-w-0">
              {/* Active Filter Chips & Results Count */}
              <div className="mb-2.5 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-slate-800">
                    {filteredProducts.length} medicines
                  </span>
                  {selectedCategory !== "All" && (
                    <span className="inline-flex items-center gap-1 bg-emerald-100/70 text-emerald-900 rounded-full px-2.5 py-0.5 text-[10px] font-bold">
                      {selectedCategory}
                      <X
                        className="h-2.5 w-2.5 cursor-pointer hover:text-red-700"
                        onClick={() => setSelectedCategory("All")}
                      />
                    </span>
                  )}
                  {selectedType !== "All" && (
                    <span className="inline-flex items-center gap-1 bg-blue-100/70 text-blue-900 rounded-full px-2.5 py-0.5 text-[10px] font-bold">
                      {selectedType}
                      <X
                        className="h-2.5 w-2.5 cursor-pointer hover:text-red-700"
                        onClick={() => setSelectedType("All")}
                      />
                    </span>
                  )}
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-[11px] font-bold text-red-600 hover:underline shrink-0 cursor-pointer"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Blinkit-Style 2-col Mobile, 3-col Desktop Grid */}
              {filteredProducts.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
                  <p className="text-xs sm:text-sm font-semibold text-slate-700">
                    No formulations match your filter.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-3 rounded-full bg-emerald-800 px-4 py-2 text-xs font-bold text-white shadow-xs cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3.5">
                  {filteredProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onQuickView={(prod) => setSelectedProduct(prod)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />

      {/* Glass Coated Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs">Loading store...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
