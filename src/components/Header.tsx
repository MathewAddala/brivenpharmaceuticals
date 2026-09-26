"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs">
      {/* Main Navbar — compact on mobile */}
      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="flex h-14 sm:h-16 items-center justify-between gap-3 sm:gap-6">
            {/* Logo — smaller on mobile */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="/images/briven-logo.png"
                alt="Briven Pharmaceutical"
                width={130}
                height={52}
                className="h-9 sm:h-11 w-auto object-contain"
                priority
                unoptimized
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-700">
              <Link
                href="/"
                className="text-emerald-800 hover:text-emerald-900 transition-colors font-extrabold"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="hover:text-emerald-800 transition-colors"
              >
                Our Products
              </Link>
              <Link
                href="/about"
                className="hover:text-emerald-800 transition-colors"
              >
                About Us
              </Link>
            </nav>

            {/* Right Action: Cart + WhatsApp + Hamburger */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Cart Trigger — compact on mobile */}
              <button
                onClick={openCart}
                className="relative flex items-center gap-1.5 sm:gap-2 rounded-full bg-emerald-50 hover:bg-emerald-100/80 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-bold text-emerald-900 transition-all border border-emerald-200/70 shadow-xs group"
                aria-label="View Shopping Cart"
              >
                <div className="relative">
                  <ShoppingCart className="h-4 w-4 text-[#1a6b3a] group-hover:scale-110 transition-transform" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#1a6b3a] text-[9px] font-black text-white shadow-xs">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline font-extrabold text-[#1a6b3a]">
                  Cart
                </span>
                {totalItems > 0 && (
                  <span className="hidden sm:inline text-[11px] text-emerald-700 font-black">
                    ({totalItems})
                  </span>
                )}
              </button>

              <a
                href="https://wa.me/919493504671?text=Hi%20Briven%2C%20I%20want%20to%20inquire%20about%20medicines"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#1a6b3a] hover:bg-[#14532d] px-4 py-2 text-xs font-bold text-white shadow-md shadow-emerald-900/15 transition-all hover:scale-102"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>Enquire</span>
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-slate-600 md:hidden rounded-lg hover:bg-slate-100"
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-100 bg-white md:hidden px-3 py-3 space-y-1 shadow-lg">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50 active:bg-slate-100"
          >
            Home
          </Link>
          <Link
            href="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50 active:bg-slate-100"
          >
            Our Products
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50 active:bg-slate-100"
          >
            About Briven
          </Link>
          <div className="pt-1.5">
            <a
              href="https://wa.me/919493504671?text=Hi%20Briven%2C%20I%20want%20to%20inquire%20about%20medicines"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1a6b3a] py-2.5 text-xs font-bold text-white shadow-md"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
