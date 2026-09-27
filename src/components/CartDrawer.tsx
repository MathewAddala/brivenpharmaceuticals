"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  MapPin,
  User,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
    getWhatsAppOrderUrl,
  } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [deliveryArea, setDeliveryArea] = useState("");

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Prevent background scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const whatsappUrl = getWhatsAppOrderUrl(customerName, deliveryArea);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 bg-[#f8faf9]">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100/80 text-emerald-800">
                <ShoppingBag className="h-4 w-4 text-[#1a6b3a]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-base font-black text-slate-900">
                    My Medicine Cart
                  </h2>
                  {totalItems > 0 && (
                    <span className="rounded-full bg-[#1a6b3a] px-2 py-0.5 text-[11px] font-black text-white">
                      {totalItems}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Direct WhatsApp Checkout • Briven Store
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-[11px] font-bold text-slate-400 hover:text-red-600 transition-colors px-2 py-1"
                  title="Clear all items"
                >
                  Clear
                </button>
              )}
              <button
                onClick={closeCart}
                className="rounded-full bg-slate-100 p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
                aria-label="Close cart"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Cart Body */}
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-4 border border-emerald-100">
                <ShoppingBag className="h-9 w-9 opacity-80" />
              </div>
              <h3 className="font-display text-lg font-black text-slate-900">
                Your cart is empty
              </h3>
              <p className="mt-1.5 text-xs text-slate-500 max-w-xs">
                Explore our certified medicines across gastro relief, antibiotics, pain care, and clinical nutrition.
              </p>
              <button
                onClick={closeCart}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1a6b3a] hover:bg-[#14532d] px-6 py-3 text-xs font-bold text-white shadow-md shadow-emerald-900/15 transition-all hover:scale-102"
              >
                <span>Browse Products</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 divide-y divide-slate-100">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="pt-3 first:pt-0 flex items-center gap-3.5"
                >
                  {/* Thumbnail */}
                  <div className="relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 rounded-xl bg-white border border-slate-100 p-1 flex items-center justify-center overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={64}
                      height={64}
                      unoptimized
                      className="object-contain max-h-full max-w-full mix-blend-multiply"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-sm font-black text-slate-900 truncate">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium truncate">
                      {product.packSize}
                    </p>

                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-xs font-black text-[#1a6b3a] tabular-nums">
                        ₹{product.sellingPrice}
                      </span>
                    </div>
                  </div>

                  {/* Stepper & Delete */}
                  <div className="flex flex-col items-end gap-1.5">
                    <div className="flex items-center rounded-full bg-slate-100 border border-slate-200/60 p-0.5">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full text-slate-600 hover:bg-white hover:text-slate-900 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-black text-slate-800 tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full text-slate-600 hover:bg-white hover:text-slate-900 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors p-1"
                      title="Remove"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Optional Quick Info Inputs */}
              <div className="pt-4 space-y-2.5">
                <p className="text-[11px] font-bold text-slate-600">
                  Optional Details for WhatsApp Invoice:
                </p>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your Name (Optional)"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-8 pr-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-emerald-600"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={deliveryArea}
                    onChange={(e) => setDeliveryArea(e.target.value)}
                    placeholder="City / Area / Pincode (Optional)"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-8 pr-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-emerald-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="border-t border-slate-100 bg-white p-5 shadow-lg space-y-3">
              {/* Pricing breakdown */}
              <div className="space-y-1 text-xs text-slate-500 font-medium">
                <div className="flex justify-between text-slate-900 font-extrabold text-sm pt-1">
                  <span>Estimated Total</span>
                  <span className="text-lg font-black text-[#1a6b3a] tabular-nums">
                    ₹{totalPrice.toFixed(0)}
                  </span>
                </div>
              </div>

              {/* WhatsApp Checkout Redirection Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-full bg-[#1a6b3a] hover:bg-[#14532d] py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-lg shadow-emerald-900/20 transition-all hover:scale-102"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Order via WhatsApp (₹{totalPrice.toFixed(0)})</span>
              </a>

              {/* Trust disclaimer */}
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium text-center">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                <span>No online payment needed • Confirm with pharmacist</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
