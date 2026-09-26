"use client";

import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView?: (p: Product) => void;
}) {
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);

  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-200/80 bg-white overflow-hidden hover:shadow-md hover:border-emerald-300/80 transition-all duration-200 shadow-xs h-full justify-between">
      <div>
        {/* Discount badge — Blinkit-style top-left overlay */}
        {product.discount > 0 && (
          <div className="absolute top-1.5 left-1.5 z-10">
            <span className="inline-block rounded-md bg-blue-600 px-1.5 py-[2px] text-[8px] sm:text-[9px] font-black text-white leading-tight shadow-xs">
              {product.discount}% OFF
            </span>
          </div>
        )}

        {/* Rx badge top-right */}
        <div className="absolute top-1.5 right-1.5 z-10">
          <span
            className={`text-[7px] sm:text-[8px] font-bold px-1.5 py-[1px] rounded-md ${
              product.prescriptionType === "Rx"
                ? "bg-red-50 text-red-500 border border-red-100"
                : "bg-emerald-50 text-emerald-700 border border-emerald-100"
            }`}
          >
            {product.prescriptionType}
          </span>
        </div>

        {/* Product Image Container with Subtle Glass Sheen */}
        <div
          onClick={() => onQuickView && onQuickView(product)}
          className="relative bg-gradient-to-b from-slate-50 via-slate-50/60 to-white flex items-center justify-center cursor-pointer pt-6 pb-2.5 px-3 sm:px-4 border-b border-slate-100/60 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)]"
        >
          <div className="h-20 sm:h-28 w-full flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.name}
              width={125}
              height={125}
              unoptimized
              className="object-contain max-h-full max-w-full mix-blend-multiply group-hover:scale-105 transition-transform duration-200"
            />
          </div>

          {/* Blinkit Green Overlaid Plus / Stepper Button */}
          <div className="absolute bottom-1 right-1.5 sm:bottom-1.5 sm:right-2 z-10">
            {quantity === 0 ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product, 1);
                }}
                className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg border-2 border-emerald-600 bg-white text-emerald-700 hover:bg-emerald-50 transition-all shadow-xs active:scale-90"
                aria-label="Add to cart"
              >
                <Plus className="h-4 w-4 sm:h-4.5 sm:w-4.5" strokeWidth={2.5} />
              </button>
            ) : (
              <div className="flex items-center rounded-lg border-2 border-emerald-600 bg-emerald-600 overflow-hidden shadow-xs">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateQuantity(product.id, quantity - 1);
                  }}
                  className="flex h-7 w-6 sm:h-8 sm:w-7 items-center justify-center text-white hover:bg-emerald-700 transition-colors"
                  aria-label="Decrease"
                >
                  <Minus className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2.5} />
                </button>
                <span className="w-5 sm:w-6 text-center text-[11px] sm:text-xs font-black text-white tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateQuantity(product.id, quantity + 1);
                  }}
                  className="flex h-7 w-6 sm:h-8 sm:w-7 items-center justify-center text-white hover:bg-emerald-700 transition-colors"
                  aria-label="Increase"
                >
                  <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2.5} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Info Area — Price first then 2-line title */}
        <div
          className="px-2.5 sm:px-3 pt-2 pb-2.5 flex flex-col gap-0.5 cursor-pointer"
          onClick={() => onQuickView && onQuickView(product)}
        >
          {/* Price Row */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-[13px] sm:text-sm font-extrabold text-slate-900 tabular-nums">
              ₹{product.sellingPrice.toFixed(0)}
            </span>
            {product.discount > 0 && (
              <span className="text-[10px] sm:text-[11px] text-slate-400 line-through tabular-nums">
                ₹{product.mrp.toFixed(0)}
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="text-[11px] sm:text-xs font-semibold text-slate-800 leading-snug line-clamp-2 mt-0.5">
            {product.name}
          </h3>

          {/* Pack Size Pill Tag */}
          <div className="flex items-center gap-1 mt-1">
            <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium bg-slate-50 border border-slate-200/80 rounded-md px-1.5 py-[1px] leading-tight">
              {product.packSize}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
