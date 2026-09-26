import Link from "next/link";
import { Pill, Activity, Shield, Brain, Apple, Heart, ChevronRight } from "lucide-react";

export default function PopularDivisions() {
  const divisions = [
    {
      name: "Gastro Care",
      subtitle: "Acid & Motility",
      icon: Pill,
      skus: "3 Formulations",
      color: "text-teal-700",
      bg: "bg-teal-50",
      link: "/products?category=Gastrointestinal",
    },
    {
      name: "Pain & Ortho",
      subtitle: "Joints & Relief",
      icon: Activity,
      skus: "2 Formulations",
      color: "text-rose-700",
      bg: "bg-rose-50",
      link: "/products?category=Pain%20%26%20Inflammation",
    },
    {
      name: "Anti-Infectives",
      subtitle: "Broad Spectrum",
      icon: Shield,
      skus: "3 Formulations",
      color: "text-blue-700",
      bg: "bg-blue-50",
      link: "/products?category=Antibiotics",
    },
    {
      name: "Neuro Therapeutics",
      subtitle: "Nerve Regeneration",
      icon: Brain,
      skus: "2 Formulations",
      color: "text-purple-700",
      bg: "bg-purple-50",
      link: "/products?category=Neuropathic%20Care",
    },
    {
      name: "Clinical Nutrition",
      subtitle: "Whey Hydrolysate",
      icon: Apple,
      skus: "2 Formulations",
      color: "text-amber-700",
      bg: "bg-amber-50",
      link: "/products?category=Nutritional%20Supplements",
    },
    {
      name: "Cardiac & Vitality",
      subtitle: "CoQ10 & Minerals",
      icon: Heart,
      skus: "12 Formulations",
      color: "text-emerald-700",
      bg: "bg-emerald-50",
      link: "/products",
    },
  ];

  return (
    <section className="bg-white py-8 sm:py-10 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              Therapeutic Divisions
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              Popular Formulations & Brands
            </h2>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
          >
            <span>View All</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Horizontal Brand Tiles Scroller (Exact Apollo Style) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {divisions.map((div) => (
            <Link
              key={div.name}
              href={div.link}
              className="flex flex-col items-center rounded-2xl border border-slate-200/70 bg-[#f7f9f8] p-4 hover:border-emerald-600/40 hover:bg-white hover:shadow-md transition-all duration-200 group text-center"
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${div.bg} ${div.color} mb-3 group-hover:scale-105 transition-transform duration-200 shadow-xs`}
              >
                <div.icon className="h-8 w-8" />
              </div>
              <h3 className="font-display text-xs font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                {div.name}
              </h3>
              <p className="mt-0.5 text-[11px] text-slate-500 font-medium">
                {div.subtitle}
              </p>
              <span className="mt-2 inline-block rounded-full bg-slate-200/60 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                {div.skus}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
