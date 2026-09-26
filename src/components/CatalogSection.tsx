"use client";

import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { products, type Product, type ProductCategory } from "@/data/products";

export default function CatalogSection({
  onQuickView,
}: {
  onQuickView: (p: Product) => void;
}) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "All">("All");

  const categoryTabs: { label: string; value: ProductCategory | "All"; count: number }[] = [
    { label: "All", value: "All", count: 12 },
    { label: "Gastro", value: "Gastrointestinal", count: 3 },
    { label: "Pain", value: "Pain & Inflammation", count: 2 },
    { label: "Antibiotics", value: "Antibiotics", count: 3 },
    { label: "Neuro", value: "Neuropathic Care", count: 2 },
    { label: "Nutrition", value: "Nutritional Supplements", count: 2 },
  ];

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="bg-white py-4 sm:py-10">
      <div className="mx-auto max-w-7xl px-2.5 sm:px-6 lg:px-8">
        {/* Section Header — compact */}
        <div className="text-center mb-3 sm:mb-6">
          <h2 className="font-display text-base sm:text-2xl font-extrabold text-slate-900 leading-tight">
            Briven Medicine Catalog
          </h2>
          <p className="mt-0.5 text-[10px] sm:text-sm text-slate-400 font-medium">
            Certified formulations with batch quality assurance
          </p>
        </div>

        {/* Filter Pills — Blinkit horizontal scroll */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2.5 sm:pb-4 mb-2 sm:mb-6 scrollbar-none -mx-2.5 px-2.5 sm:mx-0 sm:px-0 sm:justify-center">
          {categoryTabs.map((tab) => {
            const isActive = activeCategory === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveCategory(tab.value)}
                className={`flex items-center gap-1 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[9px] sm:text-[10px] font-extrabold ${
                    isActive ? "text-emerald-200" : "text-slate-400"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Product Grid — Blinkit: tight 2-col mobile, 4-col desktop, tiny gap */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
