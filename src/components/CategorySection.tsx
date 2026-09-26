"use client";

import Link from "next/link";
import { Pill, Activity, Shield, Brain, Apple } from "lucide-react";
import type { ProductCategory } from "@/data/products";

const categoryConfig: {
  name: ProductCategory;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  count: number;
}[] = [
  {
    name: "Gastrointestinal",
    icon: Pill,
    color: "text-teal-700",
    bgColor: "bg-teal-50",
    count: 3,
  },
  {
    name: "Pain & Inflammation",
    icon: Activity,
    color: "text-red-700",
    bgColor: "bg-red-50",
    count: 2,
  },
  {
    name: "Antibiotics",
    icon: Shield,
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    count: 3,
  },
  {
    name: "Neuropathic Care",
    icon: Brain,
    color: "text-purple-700",
    bgColor: "bg-purple-50",
    count: 2,
  },
  {
    name: "Nutritional Supplements",
    icon: Apple,
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    count: 2,
  },
];

export default function CategorySection() {
  return (
    <section className="py-12 sm:py-16 bg-briven-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-briven-primary">
            Therapeutic Areas
          </span>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-foreground">
            Browse by Category
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {categoryConfig.map((cat) => (
            <Link
              key={cat.name}
              href={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group flex flex-col items-center rounded-xl border border-briven-border bg-briven-surface p-5 sm:p-6 hover:border-briven-primary/30 hover:shadow-md transition-all duration-200"
            >
              <div
                className={`rounded-xl ${cat.bgColor} p-3.5 mb-3 group-hover:scale-105 transition-transform duration-200`}
              >
                <cat.icon className={`h-6 w-6 ${cat.color}`} />
              </div>
              <h3 className="text-sm font-semibold text-foreground text-center leading-tight">
                {cat.name}
              </h3>
              <span className="mt-1 text-xs text-briven-muted">
                {cat.count} products
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
