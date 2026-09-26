import Link from "next/link";
import { Pill, Activity, Shield, Brain, Apple, Stethoscope, Eye, Dumbbell } from "lucide-react";

export default function PopularCategories() {
  const categories = [
    { name: "Pain Relief", count: 2, icon: Activity, color: "text-red-600", bg: "bg-red-50/80", link: "/products?category=Pain%20%26%20Inflammation" },
    { name: "Gastro Care", count: 3, icon: Pill, color: "text-teal-600", bg: "bg-teal-50/80", link: "/products?category=Gastrointestinal" },
    { name: "Antibiotics", count: 3, icon: Shield, color: "text-blue-600", bg: "bg-blue-50/80", link: "/products?category=Antibiotics" },
    { name: "Devices", count: 1, icon: Stethoscope, color: "text-emerald-600", bg: "bg-emerald-50/80", link: "/products" },
    { name: "Neuro Care", count: 2, icon: Brain, color: "text-purple-600", bg: "bg-purple-50/80", link: "/products?category=Neuropathic%20Care" },
    { name: "Eyewear & Care", count: 1, icon: Eye, color: "text-indigo-600", bg: "bg-indigo-50/80", link: "/products" },
    { name: "Fitness & Nutra", count: 2, icon: Dumbbell, color: "text-amber-600", bg: "bg-amber-50/80", link: "/products?category=Nutritional%20Supplements" },
  ];

  return (
    <section className="bg-white py-10 sm:py-14 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-600">
            Our Categories
          </span>
          <h2 className="mt-1 font-display text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
            Popular Categories
          </h2>
        </div>

        {/* Circular Categories Row matching Reference 1 */}
        <div className="flex items-center justify-start lg:justify-center gap-5 sm:gap-7 overflow-x-auto pb-4 scrollbar-none">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.link}
              className="flex flex-col items-center group shrink-0 text-center w-24 sm:w-28"
            >
              <div
                className={`flex h-20 w-20 sm:h-22 sm:w-22 items-center justify-center rounded-full ${cat.bg} ${cat.color} shadow-xs group-hover:scale-108 group-hover:shadow-md transition-all duration-200 mb-2.5 border border-slate-100`}
              >
                <cat.icon className="h-9 w-9 sm:h-10 sm:w-10 group-hover:scale-105 transition-transform" />
              </div>
              <h3 className="text-xs font-bold text-slate-800 group-hover:text-cyan-600 transition-colors leading-tight">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
