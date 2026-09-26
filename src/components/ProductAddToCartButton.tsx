"use client";

import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";
import { Plus, Minus, ShoppingBag, MessageCircle, Phone } from "lucide-react";

export default function ProductAddToCartButton({ product }: { product: Product }) {
  const { addToCart, updateQuantity, getItemQuantity, openCart } = useCart();
  const quantity = getItemQuantity(product.id);

  const whatsappMessage = `Hi Briven, I want to inquire about ${product.name} (${product.composition}) - ${product.packSize}. Price: ₹${product.sellingPrice}. Please confirm availability.`;
  const whatsappUrl = `https://wa.me/919493504671?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        {quantity === 0 ? (
          <button
            onClick={() => {
              addToCart(product, 1);
              openCart();
            }}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#1a6b3a] hover:bg-[#14532d] px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-900/15 transition-all hover:scale-102"
          >
            <Plus className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        ) : (
          <div className="flex-1 flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-300 px-4 py-2 text-emerald-950">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-emerald-800 shadow-xs hover:bg-emerald-100 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-sm font-black tabular-nums">
              {quantity} in Cart
            </span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1a6b3a] text-white shadow-xs hover:bg-[#14532d] transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-900 hover:bg-emerald-950 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:scale-102"
        >
          <MessageCircle className="h-4 w-4" />
          <span>WhatsApp Direct</span>
        </a>
      </div>

      <div className="flex justify-center">
        <a
          href="tel:+919493504671"
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors inline-flex items-center gap-1.5"
        >
          <Phone className="h-3.5 w-3.5 text-emerald-600" />
          <span>Need consultation? Call (+91) 94935 04671</span>
        </a>
      </div>
    </div>
  );
}
