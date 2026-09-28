"use client";

import { useState, useMemo, Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
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
  Check,
  Package,
  Factory,
  Plus,
  Minus,
  ChevronRight,
  ChevronDown,
  FileText,
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

  // When selected product changes, smoothly scroll right panel to top
  useEffect(() => {
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

                <span
                  className={`text-[9px] sm:text-[10px] font-black px-2.5 py-0.5 rounded-full border shadow-2xs ${
                    selectedProduct.prescriptionType === "Rx"
                      ? "bg-red-50 text-red-700 border-red-200"
                      : "bg-emerald-50 text-emerald-700 border-emerald-200"
                  }`}
                >
                  {selectedProduct.prescriptionType === "Rx" ? "Rx Prescription Required" : "OTC Available"}
                </span>
              </div>

              {/* 1. Visual Aid Detailing Identity Header (Inspired by 2011 AROLMAC detailing sheet) */}
              <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-50 via-white to-emerald-50/20 p-4 sm:p-6 border border-slate-200/90 shadow-2xs">
                <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-emerald-800 bg-white px-2.5 py-1 rounded-md border border-emerald-200/80 shadow-2xs">
                      {selectedProduct.therapeuticClass}
                    </span>
                    {selectedProduct.marketingBadge && (
                      <span className="inline-flex items-center rounded-full bg-[#003893] px-3 py-0.5 text-[10px] sm:text-[11px] font-black tracking-wider text-white uppercase shadow-xs">
                        {selectedProduct.marketingBadge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Rx Symbol + Brand Name + Pack Size */}
                <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                  <span className="font-serif text-red-600 font-black text-2xl sm:text-3xl select-none">℞</span>
                  <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                    {selectedProduct.name}
                  </h1>
                  <span className="text-xs sm:text-sm font-bold text-slate-500">
                    ({selectedProduct.packSize})
                  </span>
                </div>

                {/* Active Formulation / Generic Composition */}
                <p className="font-serif italic text-xs sm:text-sm md:text-base text-slate-700 font-semibold mt-1">
                  ({selectedProduct.composition})
                </p>
              </div>

              {/* 2. Catchy Marketing Detailing Punchline Banner (Modeled directly on 2011 Visual Aid) */}
              {selectedProduct.tagline && (
                <div className="rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-3.5 sm:p-4 shadow-sm border border-emerald-800/40 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-black text-sm shrink-0">
                      ✓
                    </span>
                    <span className="font-display text-xs sm:text-sm md:text-base font-extrabold tracking-wide text-emerald-50">
                      {selectedProduct.tagline}
                    </span>
                  </div>
                  <span className="hidden md:inline-flex items-center text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-white/10 px-2.5 py-1 rounded-full shrink-0 border border-white/10">
                    Doctor Detailing
                  </span>
                </div>
              )}

              {/* 3. Main Product Hero Layout: Packshot + Core Marketing Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 items-center">
                {/* Large Product Image Container - Pure Seamless White (Zero Shade Box) */}
                <div className="relative rounded-3xl bg-white p-4 sm:p-8 border border-slate-200/80 shadow-xs flex items-center justify-center min-h-[200px] sm:min-h-[280px] overflow-hidden">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-slate-50/70 to-transparent" />
                  
                  <div className="relative h-44 w-44 sm:h-64 sm:w-64">
                    <Image
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      fill
                      unoptimized
                      priority
                      className="object-contain hover:scale-105 transition-transform duration-300 relative z-10"
                    />
                  </div>
                </div>

                {/* Details Column */}
                <div className="space-y-3 sm:space-y-4">
                  {/* Prominent Product Description & Detailing Action */}
                  {selectedProduct.shortDescription && (
                    <div className="rounded-2xl bg-slate-50/90 p-3.5 sm:p-4 border border-slate-200/80">
                      <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                        <FileText className="h-3.5 w-3.5 text-emerald-700" />
                        <span>Product Detailing & Therapeutic Rationale</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                        {selectedProduct.shortDescription}
                      </p>
                    </div>
                  )}

                  {/* Clean, Subtle Indicative Price & Quality Certification (Not shouting) */}
                  <div className="rounded-xl bg-slate-50 p-2.5 sm:p-3 border border-slate-200/70 flex items-center justify-between text-xs">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Indicative MRP:
                      </span>
                      <span className="font-display text-sm sm:text-base font-extrabold text-slate-800 tabular-nums">
                        ₹{selectedProduct.sellingPrice}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        / {selectedProduct.packSize}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/80 shadow-2xs">
                      WHO-GMP Certified
                    </span>
                  </div>

                  {/* Pack size & Manufacturer */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-200/70">
                      <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                        <Package className="h-3 w-3 text-emerald-600" />
                        <span>Pack Size</span>
                      </div>
                      <p className="font-black text-slate-800 mt-0.5">{selectedProduct.packSize}</p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-200/70">
                      <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                        <Factory className="h-3 w-3 text-emerald-600" />
                        <span>Marketed By</span>
                      </div>
                      <p className="font-black text-slate-800 mt-0.5 truncate">{selectedProduct.manufacturer}</p>
                    </div>
                  </div>

                  {/* Action Buttons: Add to Cart Stepper + WhatsApp Inquiry + Call */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                    {getItemQuantity(selectedProduct.id) > 0 ? (
                      <div className="flex-1 flex items-center justify-between rounded-xl bg-emerald-700 px-3 py-2 text-white shadow-md">
                        <button
                          onClick={() => {
                            const qty = getItemQuantity(selectedProduct.id);
                            if (qty === 1) {
                              removeFromCart(selectedProduct.id);
                            } else {
                              updateQuantity(selectedProduct.id, qty - 1);
                            }
                          }}
                          className="h-7 w-7 rounded-lg bg-emerald-800 hover:bg-emerald-900 flex items-center justify-center transition-colors cursor-pointer"
                          aria-label="Decrease"
                        >
                          <Minus className="h-4 w-4" />
                        </button>

                        <span className="text-xs font-black tabular-nums">
                          {getItemQuantity(selectedProduct.id)} in Cart
                        </span>

                        <button
                          onClick={() => updateQuantity(selectedProduct.id, getItemQuantity(selectedProduct.id) + 1)}
                          className="h-7 w-7 rounded-lg bg-emerald-800 hover:bg-emerald-900 flex items-center justify-center transition-colors cursor-pointer"
                          aria-label="Increase"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(selectedProduct)}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 py-3 text-xs sm:text-sm font-black text-white shadow-md transition-all active:scale-98 cursor-pointer"
                      >
                        <Plus className="h-4 w-4" strokeWidth={2.5} />
                        <span>Add to Cart</span>
                      </button>
                    )}

                    <a
                      href={getWhatsAppLink(selectedProduct)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] hover:bg-[#1ebd5a] py-3 text-xs sm:text-sm font-black text-white shadow-md transition-all active:scale-98"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>WhatsApp Inquiry</span>
                    </a>

                    <a
                      href="tel:+919493504671"
                      className="rounded-xl bg-slate-100 hover:bg-slate-200 p-3 text-slate-700 flex items-center justify-center transition-colors"
                      title="Call Pharmacist (+91) 94935 04671"
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* 4. Extended Sections: Clinical Advantages & Indicated In (Modeled after 2011 Visual Aid, ZERO AI sparkles) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-4 border-t border-slate-100">
                {/* Clinical Advantages */}
                {selectedProduct.keyBenefits && (
                  <div className="rounded-2xl bg-slate-50/80 p-4 sm:p-5 border border-slate-200/70">
                    <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-3">
                      <span className="h-2 w-2 rounded-full bg-emerald-600 shrink-0" />
                      <span>Clinical Advantages</span>
                    </h3>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {selectedProduct.keyBenefits.map((benefit: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-700 font-black text-sm leading-none mt-0.5">•</span>
                          <span className="font-medium leading-relaxed">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Indicated In (Directly inspired by client's 2011 detailing sheet) */}
                {selectedProduct.uses && (
                  <div className="rounded-2xl bg-slate-50/80 p-4 sm:p-5 border border-slate-200/70">
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="font-serif italic text-base sm:text-lg font-black text-slate-900">
                        Indicated In:
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        (Therapeutic Conditions)
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.uses.map((use: string, idx: number) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-[11px] font-bold text-slate-700 border border-slate-200 shadow-2xs"
                        >
                          <span className="text-emerald-600 font-bold">•</span>
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Important Medical Guidance / Side Effects */}
                {selectedProduct.sideEffects && (
                  <div className="md:col-span-2 rounded-2xl bg-amber-50/60 p-4 border border-amber-200/60">
                    <h4 className="text-[11px] font-black uppercase tracking-wider text-amber-900 mb-1">
                      Important Medical Guidance & Potential Side Effects
                    </h4>
                    <p className="text-[11px] text-amber-800 leading-relaxed mb-2 font-medium">
                      All formulations should be administered as directed by a registered medical practitioner. Common mild reactions:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.sideEffects.map((effect: string, idx: number) => (
                        <span
                          key={idx}
                          className="rounded-md bg-white/90 border border-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-900"
                        >
                          {effect}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* In-Panel Compact Contact & Legal Note */}
              <div className="pt-6 border-t border-slate-100 text-center text-xs text-slate-400 font-medium">
                © 2026 Briven Pharmaceutical • WHO-GMP Certified • Vijayawada, Andhra Pradesh
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

      <WhatsAppButton />
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
