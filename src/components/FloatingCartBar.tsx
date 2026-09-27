"use client";

import { useCart } from "@/context/CartContext";
import { ChevronRight } from "lucide-react";

export default function FloatingCartBar() {
  const { totalItems, totalPrice, openCart, isCartOpen } = useCart();

  if (totalItems === 0 || isCartOpen) return null;

  return (
    <div className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md animate-in slide-in-from-bottom-4 duration-300">
      <button
        onClick={openCart}
        className="w-full flex items-center justify-between rounded-2xl bg-emerald-700 text-white px-4 sm:px-5 py-2.5 sm:py-3 shadow-xl shadow-emerald-900/25 hover:bg-emerald-800 transition-all cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-white/20 text-white">
            <span className="text-[11px] sm:text-xs font-black tabular-nums">{totalItems}</span>
          </div>
          <div className="text-left leading-tight">
            <span className="text-xs sm:text-sm font-extrabold tabular-nums">
              ₹{totalPrice.toFixed(0)}
            </span>
            <span className="text-[10px] text-emerald-200/90 block font-medium">
              {totalItems} {totalItems === 1 ? "medicine" : "medicines"} added
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs sm:text-sm font-bold">
          <span>View cart</span>
          <ChevronRight className="h-4 w-4" />
        </div>
      </button>
    </div>
  );
}
