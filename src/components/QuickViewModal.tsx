"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, MessageCircle, Star, Check, Phone, Plus, Minus } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function QuickViewModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { addToCart, updateQuantity, getItemQuantity, openCart } = useCart();
  const quantity = product ? getItemQuantity(product.id) : 0;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const whatsappMessage = `Hi Briven, I want to inquire about ${product.name} (${product.composition}) - ${product.packSize}. Price: ₹${product.sellingPrice}. Please confirm availability.`;
  const whatsappUrl = `https://wa.me/919493504671?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer p-0 sm:p-4"
    >
      {/* Glossy thick glass-coated modal card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-[370px] max-h-[82vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.9),inset_0_1px_1px_rgba(255,255,255,1)] animate-in slide-in-from-bottom-5 sm:zoom-in-95 duration-200 cursor-default"
      >
        {/* Glossy glass reflection sheen across top */}
        <div className="pointer-events-none absolute -top-12 -left-12 h-36 w-36 rounded-full bg-white/60 blur-xl" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/80 via-white/20 to-transparent rounded-t-3xl" />

        {/* Close Button - Frosted Glass Pill */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-20 rounded-full bg-white/80 backdrop-blur-md p-1.5 text-slate-400 hover:text-slate-800 transition-colors shadow-xs border border-white/90"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Mobile drag handle */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1">
          <div className="h-1 w-9 rounded-full bg-slate-300/80" />
        </div>

        {/* Glossy Image Container */}
        <div className="px-4 pt-2 sm:pt-4">
          <div className="relative bg-gradient-to-b from-white via-slate-50/70 to-slate-100/50 rounded-2xl border border-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),0_4px_16px_rgba(0,0,0,0.03)] flex items-center justify-center p-4 h-36 sm:h-44 overflow-hidden">
            {/* Subtle specular reflection diagonal */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-white/60" />

            <Image
              src={product.image}
              alt={product.name}
              width={160}
              height={160}
              unoptimized
              className="object-contain max-h-full max-w-full mix-blend-multiply relative z-10 transition-transform duration-300 hover:scale-105"
            />

            <span
              className={`absolute top-2.5 right-2.5 z-10 text-[8px] font-bold px-1.5 py-0.5 rounded ${
                product.prescriptionType === "Rx"
                  ? "bg-red-50 text-red-600 border border-red-100"
                  : "bg-emerald-50 text-emerald-700 border border-emerald-100"
              }`}
            >
              {product.prescriptionType}
            </span>
          </div>
        </div>

        {/* Info Block */}
        <div className="px-4 sm:px-5 pt-3 pb-5 space-y-2.5 relative z-10">
          {/* Price Header */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums">
                ₹{product.sellingPrice.toFixed(0)}
              </span>
            </div>

            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-[10px] font-bold text-slate-500 ml-1">
                {product.rating}
              </span>
            </div>
          </div>

          {/* Product Name */}
          <div>
            <h3 className="font-display text-sm sm:text-base font-black text-slate-900 leading-snug">
              {product.name}
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-500 font-medium mt-0.5">
              {product.composition}
            </p>
          </div>

          {/* Pack & Category Tags */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[9px] text-slate-600 font-bold bg-white/80 border border-slate-200/80 rounded-md px-1.5 py-0.5 shadow-2xs">
              {product.packSize}
            </span>
            <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50/80 border border-emerald-200/60 rounded-md px-1.5 py-0.5">
              {product.category}
            </span>
            <span className="text-[9px] text-slate-400">
              {product.manufacturer}
            </span>
          </div>

          {/* Key Indications */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Key Indications:
            </p>
            <div className="flex flex-wrap gap-1">
              {product.uses.slice(0, 3).map((use) => (
                <span
                  key={use}
                  className="inline-flex items-center gap-0.5 rounded-full bg-slate-50/90 text-slate-700 px-2 py-0.5 text-[9px] font-medium border border-slate-200/60 shadow-2xs"
                >
                  <Check className="h-2.5 w-2.5 text-emerald-600" />
                  {use}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row - Glossy Blinkit Style */}
          <div className="pt-2 space-y-2">
            <div className="flex gap-2">
              {quantity === 0 ? (
                <button
                  onClick={() => {
                    addToCart(product, 1);
                    openCart();
                    onClose();
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border-2 border-emerald-600 bg-white text-emerald-700 hover:bg-emerald-50 py-2.5 text-xs font-black transition-all shadow-xs active:scale-98"
                >
                  <Plus className="h-4 w-4" strokeWidth={2.5} />
                  <span>Add to Cart</span>
                </button>
              ) : (
                <div className="flex-1 flex items-center justify-between rounded-xl border-2 border-emerald-600 bg-emerald-600 px-2 py-1 shadow-sm">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
                  >
                    <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </button>
                  <span className="text-xs font-black text-white tabular-nums">
                    {quantity} in Cart
                  </span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </button>
                </div>
              )}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 py-2.5 text-xs font-extrabold text-white shadow-md shadow-emerald-900/15 transition-all active:scale-98"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            <a
              href="tel:+919493504671"
              className="flex justify-center text-[10px] font-bold text-slate-400 hover:text-slate-600 transition-colors items-center gap-1"
            >
              <Phone className="h-2.5 w-2.5" />
              <span>Direct Pharmacist: (+91) 94935 04671</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
