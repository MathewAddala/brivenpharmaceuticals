import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { categories } from "@/data/products";
import Link from "next/link";
import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Product Categories | Briven Pharmaceutical",
  description: "Browse our certified WHO-GMP pharmaceutical formulations by therapeutic category",
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-full mb-4">
              <ShieldCheck className="h-8 w-8 text-emerald-700" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Product Categories
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Browse our certified WHO-GMP pharmaceutical formulations by therapeutic category
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/products?category=${encodeURIComponent(category.name)}`}
                className={`flex flex-col justify-center items-center p-4 sm:p-6 text-center rounded-2xl bg-gradient-to-br ${category.bannerBg || 'from-emerald-600 to-emerald-800'} text-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 min-h-[140px] sm:min-h-[180px] group`}
              >
                <h2 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">
                  {category.name}
                </h2>
                <p className="text-sm sm:text-base opacity-90 mb-2 font-medium">
                  {category.count} Products
                </p>
                <p className="text-xs sm:text-sm opacity-80 line-clamp-2 sm:line-clamp-none">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
          
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
