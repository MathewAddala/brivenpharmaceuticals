"use client";

import { MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function WhatsAppButton() {
  const { totalItems } = useCart();

  // When cart bar is visible, push WhatsApp button higher to avoid overlap
  const bottomClass = totalItems > 0 ? "bottom-20 sm:bottom-24" : "bottom-4 sm:bottom-6";

  return (
    <div className={`fixed ${bottomClass} right-4 sm:right-6 z-50 flex flex-col items-end gap-1.5 group transition-all duration-300`}>
      {/* Tooltip / Status Bubble — hidden on mobile */}
      <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-bold text-slate-800 shadow-lg border border-slate-200/80 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
        <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 -ml-3.5" />
        <span>Pharmacist Online • Instant Order</span>
      </div>

      <a
        href="https://wa.me/919493504671?text=Hi%20Briven%2C%20I%20would%20like%20to%20order%20medicines%20or%20inquire%20about%20availability"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 sm:gap-2.5 rounded-full bg-[#25D366] px-3.5 sm:px-5 py-2.5 sm:py-3.5 text-white shadow-xl shadow-emerald-950/20 hover:bg-[#20bd5a] hover:scale-105 transition-all duration-200"
        aria-label="Order via WhatsApp with Briven Pharmacist"
      >
        <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
        <div className="text-left leading-tight hidden sm:block">
          <div className="text-[10px] font-medium opacity-90 uppercase tracking-wider">
            Need Help?
          </div>
          <div className="text-xs font-black">WhatsApp Pharmacist</div>
        </div>
      </a>
    </div>
  );
}
