"use client";

import { useState, useMemo, Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";
import {
  products,
  categories,
  type Product,
} from "@/data/products";
import {
  ArrowLeft,
  ShieldCheck,
  MessageCircle,
  Phone,
  Package,
  Plus,
  Minus,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (!categoryParam) return products;
    return products.filter((p) => p.category === categoryParam);
  }, [categoryParam]);

  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [heroView, setHeroView] = useState<"pack" | "mechanism">("pack");
  const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false);
  const catDropdownRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        catDropdownRef.current &&
        !catDropdownRef.current.contains(e.target as Node)
      ) {
        setIsCatDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-select first product on category change or load
  useEffect(() => {
    if (filteredProducts.length > 0) {
      setSelectedProductId(filteredProducts[0].id);
    } else {
      setSelectedProductId(null);
    }
  }, [filteredProducts]);

  // When selected product changes, reset hero view to packshot and smoothly scroll right panel to top
  useEffect(() => {
    setHeroView("pack");
    if (rightPanelRef.current) {
      rightPanelRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedProductId]);

  const selectedProduct = useMemo(() => {
    if (!selectedProductId) return null;
    return filteredProducts.find((p) => p.id === selectedProductId) || null;
  }, [selectedProductId, filteredProducts]);

  const { addToCart, updateQuantity, getItemQuantity, removeFromCart } = useCart();

  const getWhatsAppLink = (product: Product) => {
    const message = `Hello Briven Pharmaceuticals, I would like to inquire about ${product.name} (${product.composition}) - ${product.packSize} for doctor detailing / stockist supply. Please provide trade information.`;
    return `https://wa.me/919493504671?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="fixed inset-0 h-screen h-[100dvh] flex flex-col bg-[#f8faf9] overflow-hidden select-none">
      {/* Fixed Header at Top */}
      <div className="shrink-0 z-40">
        <Header />
      </div>

      {/* Main Split-Panel Workspace: 100% Height, Completely Independent Scrolling */}
      <div className="flex-1 min-h-0 flex flex-row w-full max-w-[1700px] mx-auto bg-white border-b border-slate-200/80 shadow-xs overflow-hidden">
        
        {/* LEFT SIDEBAR: Vertical list on Mobile, Tablet & Desktop */}
        <aside className="w-[120px] xs:w-[140px] sm:w-64 md:w-72 lg:w-80 shrink-0 border-r border-slate-200/80 flex flex-col h-full min-h-0 bg-[#fbfdfc] overflow-hidden">
          
          {/* Top Category Selector Dropdown */}
          <div className="p-2 sm:p-3 border-b border-slate-200/80 bg-white shrink-0 relative z-30" ref={catDropdownRef}>
            <div className="hidden sm:flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                Category
              </span>
              <span className="text-[10px] font-bold text-slate-400">
                {filteredProducts.length} items
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsCatDropdownOpen(!isCatDropdownOpen)}
              className="w-full flex items-center justify-between gap-1 rounded-xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-200 px-2 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-xs font-black text-slate-800 transition-all cursor-pointer shadow-2xs group"
            >
              <span className="truncate group-hover:text-emerald-800">
                {categoryParam || "All Medicines"}
              </span>
              <ChevronDown
                className={`h-3 w-3 sm:h-3.5 sm:w-3.5 text-slate-400 group-hover:text-emerald-700 shrink-0 transition-transform duration-200 ${
                  isCatDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Custom Dropdown Menu */}
            {isCatDropdownOpen && (
              <div className="absolute left-1.5 right-1.5 top-full mt-1.5 z-50 rounded-2xl bg-white/95 backdrop-blur-xl border border-emerald-200/90 shadow-2xl p-1.5 space-y-0.5 animate-in fade-in zoom-in-95 duration-150 max-h-72 overflow-y-auto">
                <div className="px-2 py-1 text-[9px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100">
                  Select Category
                </div>

                <Link
                  href="/products"
                  onClick={() => setIsCatDropdownOpen(false)}
                  className={`w-full flex items-center justify-between rounded-xl px-2.5 py-2 text-[11px] sm:text-xs font-bold transition-all ${
                    !categoryParam
                      ? "bg-emerald-100 text-emerald-900 font-black"
                      : "text-slate-700 hover:bg-slate-50 hover:text-emerald-800"
                  }`}
                >
                  <span>All Formulations</span>
                  <span className="text-[10px] font-extrabold text-slate-400">{products.length}</span>
                </Link>

                {categories.map((cat) => {
                  const isSelected = categoryParam === cat.name;
                  return (
                    <Link
                      key={cat.name}
                      href={`/products?category=${encodeURIComponent(cat.name)}`}
                      onClick={() => setIsCatDropdownOpen(false)}
                      className={`w-full flex items-center justify-between rounded-xl px-2.5 py-2 text-[11px] sm:text-xs font-bold transition-all ${
                        isSelected
                          ? "bg-emerald-100 text-emerald-900 font-black"
                          : "text-slate-700 hover:bg-slate-50 hover:text-emerald-800"
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[10px] font-extrabold text-slate-400 ml-1">{cat.count}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Left Vertical List: Dedicated Smooth Scroll Container */}
          <div
            className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-1.5 sm:p-2.5 space-y-1.5 sm:space-y-2 select-auto"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {filteredProducts.length === 0 ? (
              <div className="p-4 text-center text-slate-400 text-xs font-medium">
                No items in this category.
              </div>
            ) : (
              filteredProducts.map((product) => {
                const isSelected = selectedProductId === product.id;
                return (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProductId(product.id)}
                    className={`w-full text-left rounded-xl sm:rounded-2xl transition-all duration-200 cursor-pointer flex flex-col sm:flex-row items-center sm:items-start gap-1.5 sm:gap-2.5 p-2 sm:p-2.5 relative group ${
                      isSelected
                        ? "bg-[#eef8f2] border-2 border-emerald-600 text-emerald-950 shadow-xs"
                        : "bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {/* Active Accent Bar (Desktop) */}
                    {isSelected && (
                      <span className="hidden sm:block absolute -left-[2px] inset-y-2 w-1.5 rounded-r-full bg-emerald-600" />
                    )}

                    {/* Cute Thumbnail */}
                    <div className="relative h-11 w-11 sm:h-12 sm:w-12 shrink-0 rounded-lg sm:rounded-xl bg-white border border-slate-200/70 p-1 flex items-center justify-center overflow-hidden shadow-2xs group-hover:scale-105 transition-transform">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={48}
                        height={48}
                        unoptimized
                        className="object-contain max-h-full max-w-full"
                      />
                    </div>

                    {/* Details: Name + Clear Formulation Description (No highlighted price) */}
                    <div className="flex-1 min-w-0 text-center sm:text-left w-full sm:w-auto">
                      <div className="flex items-center justify-center sm:justify-between gap-1">
                        <h3 className="font-display text-[11px] sm:text-xs font-black leading-tight truncate">
                          {product.name}
                        </h3>
                        <span className="hidden sm:inline-block text-[8px] font-bold text-slate-400 bg-slate-100 rounded px-1.5 py-0.5 shrink-0">
                          {product.dosageForm}
                        </span>
                      </div>

                      {/* Product Formulation Description (Visible on both mobile & desktop!) */}
                      <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium line-clamp-2 mt-0.5 leading-snug">
                        {product.composition}
                      </p>

                      {/* Subtle metadata tags (Pack size & prescription type) */}
                      <div className="mt-1 flex items-center justify-center sm:justify-start gap-1.5 text-[8px] font-bold text-slate-400">
                        <span className="bg-slate-100 text-slate-600 px-1 rounded">
                          {product.packSize}
                        </span>
                        <span className={product.prescriptionType === "Rx" ? "text-red-500 font-semibold" : "text-emerald-700 font-semibold"}>
                          {product.prescriptionType}
                        </span>
                      </div>
                    </div>

                    {/* Chevron (Desktop) */}
                    <ChevronRight
                      className={`hidden sm:block h-3.5 w-3.5 shrink-0 transition-transform mt-1 ${
                        isSelected
                          ? "text-emerald-700 translate-x-0.5"
                          : "text-slate-300 group-hover:text-slate-500"
                      }`}
                    />
                  </button>
                );
              })
            )}

            {/* Spacer so bottom items are never obscured */}
            <div className="h-16 sm:h-8" />
          </div>
        </aside>

        {/* RIGHT PANEL: Dedicated Smooth Scroll Container */}
        <section
          ref={rightPanelRef}
          className="flex-1 min-h-0 h-full overflow-y-auto overflow-x-hidden bg-white p-3 sm:p-6 lg:p-8 select-auto"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {selectedProduct ? (
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 pb-20 sm:pb-12">
              
              {/* Top Navigation Pill & Category Tag */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-slate-500">
                  <Link href="/categories" className="hover:text-emerald-800 transition-colors flex items-center gap-1">
                    <ArrowLeft className="h-3 w-3" />
                    <span>Categories</span>
                  </Link>
                  <span>/</span>
                  <span className="text-emerald-800 font-extrabold">{selectedProduct.category}</span>
                </div>

                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  WHO-GMP Certified
                </span>
              </div>

              {/* Authentic Pharmaceutical Visual Aid Leaf */}
              <div className="max-w-4xl mx-auto space-y-5 pb-16">
                
                {/* Visual Aid Header */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5 mb-3">
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-emerald-800">
                      {selectedProduct.category} Division • {selectedProduct.therapeuticClass}
                    </span>
                    {selectedProduct.marketingBadge && (
                      <span className="rounded-full bg-slate-900 px-3 py-0.5 text-[10px] font-black tracking-wider text-white uppercase">
                        {selectedProduct.marketingBadge}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="font-serif text-red-600 font-bold text-2xl sm:text-3xl select-none">℞</span>
                    <h1 className="font-display text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                      {selectedProduct.name}
                    </h1>
                    <span className="text-xs sm:text-sm font-bold text-slate-400">
                      {selectedProduct.packSize}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm md:text-base text-slate-700 font-semibold mt-1">
                    {selectedProduct.composition}
                  </p>

                  {selectedProduct.tagline && (
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-900">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 shrink-0" />
                      <span>{selectedProduct.tagline}</span>
                    </div>
                  )}
                </div>

                {/* Visual Core: Packshot + Clinical Depiction Side-by-Side (Matches Authentic Visual Aid Reference) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  {/* Left: Product Packshot */}
                  <div className="rounded-2xl bg-white p-5 sm:p-6 border border-slate-200/90 shadow-2xs flex flex-col items-center justify-between min-h-[260px]">
                    <div className="flex-1 flex items-center justify-center w-full py-2">
                      <div className="relative h-48 w-48 sm:h-56 sm:w-56 md:h-60 md:w-60">
                        <Image
                          src={selectedProduct.image}
                          alt={selectedProduct.name}
                          fill
                          unoptimized
                          priority
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">
                      Commercial Packshot
                    </span>
                  </div>

                  {/* Right: Clinical Diagnostic Case / Condition Photography (2x2 Grid Collage) */}
                  <div className="rounded-2xl bg-white p-5 sm:p-6 border border-slate-200/90 shadow-2xs flex flex-col items-center justify-between min-h-[260px]">
                    {selectedProduct.mechanismImage ? (
                      <>
                        <div className="flex-1 flex items-center justify-center w-full py-2">
                          <div className="relative h-48 w-48 sm:h-56 sm:w-56 md:h-60 md:w-60 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 shadow-xs">
                            <Image
                              src={selectedProduct.mechanismImage}
                              alt={selectedProduct.mechanismTitle || selectedProduct.name}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="text-center mt-2 px-1">
                          <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest block">
                            Diagnostic Indications
                          </span>
                          {selectedProduct.mechanismTitle && (
                            <p className="text-[11px] font-semibold text-slate-600 mt-1 max-w-[340px] leading-tight">
                              {selectedProduct.mechanismTitle}
                            </p>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="h-56 w-56 flex items-center justify-center text-slate-300 text-xs">
                        Clinical Case Media
                      </div>
                    )}
                  </div>
                </div>

                {/* Detailing Body: Clinical Highlights & Indications (Matches Reference Visual Aid) */}
                <div className="rounded-2xl bg-white p-5 sm:p-7 border border-slate-200/90 shadow-2xs space-y-5">
                  
                  {/* Clinical Formulation Description */}
                  {selectedProduct.shortDescription && (
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                      {selectedProduct.shortDescription}
                    </p>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {/* Left: Key Clinical Advantages */}
                    {selectedProduct.keyBenefits && selectedProduct.keyBenefits.length > 0 && (
                      <div>
                        <div className="border-b border-slate-200 pb-2 mb-3">
                          <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                            Key Clinical Advantages
                          </h3>
                        </div>
                        <ul className="space-y-2.5">
                          {selectedProduct.keyBenefits.map((benefit: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 leading-relaxed font-medium">
                              <span className="text-emerald-700 font-black text-sm leading-none mt-0.5 select-none">•</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Right: Indications (In:) */}
                    {selectedProduct.uses && selectedProduct.uses.length > 0 && (
                      <div className="md:border-l md:border-slate-100 md:pl-8">
                        <div className="border-b border-slate-200 pb-2 mb-3">
                          <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                            Indicated In
                          </h3>
                        </div>
                        <ul className="space-y-2">
                          {selectedProduct.uses.map((use: string, idx: number) => (
                            <li key={idx} className="flex items-center gap-2 text-xs sm:text-[13px] font-bold text-slate-800">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 shrink-0" />
                              <span>{use}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Commercial & Order Action Bar */}
                  <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-slate-400 font-bold uppercase tracking-wider">Indicative Trade:</span>
                      <span className="text-base font-black text-slate-900">₹{selectedProduct.sellingPrice}</span>
                      <span className="text-xs text-slate-400 line-through">MRP ₹{selectedProduct.mrp}</span>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      {getItemQuantity(selectedProduct.id) > 0 ? (
                        <div className="flex-1 sm:flex-initial flex items-center justify-between gap-3 rounded-xl bg-emerald-700 px-3 py-2 text-white shadow-sm">
                          <button
                            onClick={() => {
                              const qty = getItemQuantity(selectedProduct.id);
                              if (qty === 1) removeFromCart(selectedProduct.id);
                              else updateQuantity(selectedProduct.id, qty - 1);
                            }}
                            className="h-6 w-6 rounded bg-emerald-800 hover:bg-emerald-900 flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="text-xs font-black tabular-nums">
                            {getItemQuantity(selectedProduct.id)} in Cart
                          </span>
                          <button
                            onClick={() => updateQuantity(selectedProduct.id, getItemQuantity(selectedProduct.id) + 1)}
                            className="h-6 w-6 rounded bg-emerald-800 hover:bg-emerald-900 flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(selectedProduct)}
                          className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 px-4 py-2.5 text-xs font-black text-white shadow-sm transition-all cursor-pointer"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Add to Cart</span>
                        </button>
                      )}

                      <a
                        href={getWhatsAppLink(selectedProduct)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] hover:bg-[#1ebd5a] px-4 py-2.5 text-xs font-black text-white shadow-sm transition-all"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>WhatsApp Inquiry</span>
                      </a>

                      <a
                        href="tel:+919493504671"
                        className="rounded-xl bg-slate-100 hover:bg-slate-200 p-2.5 text-slate-700 transition-colors"
                        title="Call (+91) 94935 04671"
                      >
                        <Phone className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  {/* Quality Assurance Strip */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-emerald-700" />
                      <span>Manufactured under WHO-GMP compliance & strict DCGI quality guidelines</span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Hospital & Clinical Supply
                    </span>
                  </div>
                </div>

                {/* Footer Legal Note */}
                <div className="pt-2 text-center text-xs text-slate-400 font-medium">
                  © 2026 Briven Pharmaceutical • WHO-GMP Certified • Institutional Detailing
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <Package className="h-16 w-16 text-slate-200 mb-3" />
              <p className="text-base font-bold text-slate-700">Select a Medicine</p>
              <p className="text-xs text-slate-400 mt-1">Tap any product in the left list to view formulation details.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs font-bold text-slate-500">Loading store...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
