"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicePillars from "@/components/ServicePillars";
import CuratedPromoBanners from "@/components/CuratedPromoBanners";
import CategoryProductRails from "@/components/CategoryProductRails";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import QuickViewModal from "@/components/QuickViewModal";
import type { Product } from "@/data/products";

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Clean Slim Navbar */}
      <Header />

      <main className="flex-1">
        {/* Fresh Medical Hero with Prominent Search */}
        <Hero />

        {/* Blinkit-style Horizontal Service Category Icons */}
        <ServicePillars />

        {/* Auto-scrollable Curated Promo Banners with Dots Indicator */}
        <CuratedPromoBanners />

        {/* Category-Wise Horizontal Scrollable Product Rails (Blinkit-Style for Web & Mobile) */}
        <CategoryProductRails onQuickView={(p) => setSelectedProduct(p)} />
      </main>

      {/* Clean Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* Glass-Coated Cute Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
