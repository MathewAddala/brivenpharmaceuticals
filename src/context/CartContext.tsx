"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getItemQuantity: (productId: number) => number;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  totalMrp: number;
  totalSavings: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  getWhatsAppOrderUrl: (customerName?: string, deliveryAddress?: string) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "briven_pharma_cart_v1";
const WHATSAPP_STORE_PHONE = "919493504671";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.error("Failed to save cart to localStorage", e);
      }
    }
  }, [items, isLoaded]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: number) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getItemQuantity = (productId: number) => {
    const item = items.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.sellingPrice * item.quantity,
    0
  );
  const totalMrp = items.reduce(
    (sum, item) => sum + item.product.mrp * item.quantity,
    0
  );
  const totalSavings = Math.max(0, totalMrp - totalPrice);

  const getWhatsAppOrderUrl = (
    customerName?: string,
    deliveryAddress?: string
  ) => {
    if (items.length === 0) {
      return `https://wa.me/${WHATSAPP_STORE_PHONE}?text=${encodeURIComponent(
        "Hi Briven Pharmaceutical, I would like to inquire about medicine availability."
      )}`;
    }

    const lines: string[] = [];
    lines.push("*ORDER INQUIRY — BRIVEN PHARMACEUTICAL*");
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    if (customerName?.trim()) {
      lines.push(`*Customer:* ${customerName.trim()}`);
    }
    if (deliveryAddress?.trim()) {
      lines.push(`*Delivery Address:* ${deliveryAddress.trim()}`);
    }
    if (customerName?.trim() || deliveryAddress?.trim()) {
      lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    }

    lines.push("*ORDER ITEMS:*");
    items.forEach((item, idx) => {
      const lineTotal = item.product.sellingPrice * item.quantity;
      lines.push(
        `${idx + 1}. *${item.product.name}* (${item.product.packSize})\n   • Salt: ${item.product.composition}\n   • Qty: ${item.quantity} × ₹${item.product.sellingPrice} = ₹${lineTotal}`
      );
    });

    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push(`*Total Medicines:* ${totalItems} unit(s)`);
    lines.push(`*Estimated Total:* ₹${totalPrice.toFixed(0)}`);
    if (totalSavings > 0) {
      lines.push(`*Total Savings:* ₹${totalSavings.toFixed(0)}`);
    }
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push(
      "Please confirm medicine availability, batch details, and delivery dispatch."
    );

    const message = lines.join("\n");
    return `https://wa.me/${WHATSAPP_STORE_PHONE}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        getItemQuantity,
        clearCart,
        totalItems,
        totalPrice,
        totalMrp,
        totalSavings,
        isCartOpen,
        openCart,
        closeCart,
        getWhatsAppOrderUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
