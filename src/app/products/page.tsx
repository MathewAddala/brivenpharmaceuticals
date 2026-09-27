"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useCart } from "@/context/CartContext";
import {
  products,
  categories,
  type Product,
  type ProductCategory,
} from "@/data/products";
import {
  ArrowLeft,
  ShieldCheck,
  MessageCircle,
  Phone,
  Check,
  Package,
  Factory,
  Plus,
  Minus,
  ChevronRight,
} from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (!categoryParam) return products;
    return products.filter((p) => p.category === categoryParam);
  }, [categoryParam]);

  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  // Auto-select first product on category change or load
  useEffect(() => {
    if (filteredProducts.length > 0) {
      setSelectedProductId(filteredProducts[0].id);
    } else {
      setSelectedProductId(null);
    }
  }, [filteredProducts]);

  const selectedProduct = useMemo(() => {
    if (!selectedProductId) return null;
    return filteredProducts.find((p) => p.id === selectedProductId) || null;
  }, [selectedProductId, filteredProducts]);

  const { addToCart, updateQuantity, getItemQuantity, removeFromCart } = useCart();

  const getWhatsAppLink = (product: Product) => {
    const message = `Hi Briven, I want to inquire about ${product.name} (${product.composition}) - ${product.packSize}. Price: ₹${product.sellingPrice}. Please confirm availability.`;
    return `https://wa.me/919493504671?text=${encodeURIComponent(message)}`;
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <div className="flex-grow flex flex-col md:flex-row max-w-[1600px] w-full mx-auto bg-white shadow-sm mt-0 md:mt-4 mb-0 md:mb-8 md:rounded-xl overflow-hidden md:h-[calc(100vh-120px)]">
        
        {/* Left Sidebar (Products List) */}
        <div className="w-full md:w-72 lg:w-80 flex-shrink-0 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col bg-slate-50">
          {/* Categories Horizontal Scroll */}
          <div className="p-3 border-b border-slate-200 bg-white">
            <div 
              className="flex overflow-x-auto gap-2 pb-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <Link
                href="/products"
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  !categoryParam
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={`/products?category=${cat.name}`}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    categoryParam === cat.name
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Product List */}
          <div 
            className="flex-shrink-0 md:flex-1 overflow-x-auto md:overflow-y-auto bg-slate-50/50"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filteredProducts.length === 0 ? (
              <div className="p-6 text-center text-slate-500 text-sm">
                No products found in this category.
              </div>
            ) : (
              <ul className="flex flex-row md:flex-col p-3 md:p-0 gap-2 md:gap-0 md:divide-y md:divide-slate-100">
                {filteredProducts.map((product) => (
                  <li key={product.id} className="flex-shrink-0 md:flex-shrink">
                    <button
                      onClick={() => setSelectedProductId(product.id)}
                      className={`
                        text-left transition-colors flex items-center justify-between
                        px-4 py-2 rounded-full md:rounded-none md:w-full md:px-4 md:py-3
                        ${
                          selectedProductId === product.id
                            ? "bg-emerald-600 text-white border-emerald-600"
                            : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200 md:border-transparent md:bg-transparent"
                        }
                        border md:border-0
                      `}
                    >
                      <div className="md:pr-4">
                        <h3 className="font-semibold text-sm md:text-base leading-tight whitespace-nowrap md:whitespace-normal">
                          {product.name}
                        </h3>
                        <p
                          className={`hidden md:block text-xs mt-1 truncate ${
                            selectedProductId === product.id
                              ? "text-emerald-100"
                              : "text-slate-500"
                          }`}
                        >
                          {product.composition}
                        </p>
                      </div>
                      <ChevronRight
                        className={`hidden md:block w-4 h-4 flex-shrink-0 ${
                          selectedProductId === product.id
                            ? "text-white"
                            : "text-slate-300"
                        }`}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right Panel (Product Detail) */}
        <div className="flex-1 overflow-y-auto bg-white relative">
          {selectedProduct ? (
            <div className="pb-24 md:pb-8">
              {/* Desktop back to home */}
              <div className="hidden md:block p-4 border-b border-slate-100">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Home
                </Link>
              </div>

              <div className="p-4 md:p-8 max-w-4xl mx-auto">
                {/* Product Header & Image */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-8">
                  {/* Image Container */}
                  <div className="w-full lg:w-1/2 flex-shrink-0">
                    <div className="aspect-square bg-slate-50 rounded-2xl p-6 flex items-center justify-center border border-slate-100 relative">
                      <Image
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        fill
                        unoptimized
                        className="object-contain p-4 mix-blend-multiply"
                      />
                      {/* Prescription Badge */}
                      <div className="absolute top-4 left-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold border ${
                            selectedProduct.prescriptionType === "Rx"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : "bg-green-50 text-green-700 border-green-200"
                          }`}
                        >
                          {selectedProduct.prescriptionType === "Rx" ? "Rx Required" : "OTC"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Info Container */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                      {selectedProduct.name}
                    </h1>
                    <p className="text-lg text-emerald-700 font-medium mb-6">
                      {selectedProduct.composition}
                    </p>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
                      <div className="flex items-end gap-2 mb-2">
                        <span className="text-3xl font-bold text-slate-900">
                          ₹{selectedProduct.sellingPrice}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500">
                        Inclusive of all taxes
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="flex items-start gap-3">
                        <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600 mt-0.5">
                          <Package className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 uppercase font-semibold">
                            Pack Size
                          </p>
                          <p className="text-sm font-medium text-slate-900">
                            {selectedProduct.packSize}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600 mt-0.5">
                          <Factory className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 uppercase font-semibold">
                            Manufacturer
                          </p>
                          <p className="text-sm font-medium text-slate-900">
                            {selectedProduct.manufacturer}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      {getItemQuantity(selectedProduct.id) > 0 ? (
                        <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-1 h-12 w-full sm:w-40">
                          <button
                            onClick={() => {
                              const qty = getItemQuantity(selectedProduct.id);
                              if (qty === 1) {
                                removeFromCart(selectedProduct.id);
                              } else {
                                updateQuantity(selectedProduct.id, qty - 1);
                              }
                            }}
                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm hover:bg-emerald-600 hover:text-white transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold text-emerald-800 w-8 text-center">
                            {getItemQuantity(selectedProduct.id)}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                selectedProduct.id,
                                getItemQuantity(selectedProduct.id) + 1
                              )
                            }
                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm hover:bg-emerald-600 hover:text-white transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(selectedProduct)}
                          className="flex-1 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center h-12 shadow-sm"
                        >
                          <Plus className="w-5 h-5 mr-2" />
                          Add to Cart
                        </button>
                      )}

                      <a
                        href={getWhatsAppLink(selectedProduct)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#1ebd5a] transition-colors flex items-center justify-center h-12 shadow-sm"
                      >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        WhatsApp
                      </a>
                      
                      <a
                        href="tel:+919493504671"
                        className="flex-none bg-slate-100 text-slate-700 px-4 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center h-12 shadow-sm"
                        title="Call Us"
                      >
                        <Phone className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Extended Details */}
                <div className="border-t border-slate-100 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Uses */}
                  {selectedProduct.uses && selectedProduct.uses.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                        Uses
                      </h3>
                      <ul className="space-y-2">
                        {selectedProduct.uses.map((use, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                            <span className="text-slate-600 text-sm leading-relaxed">{use}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Benefits */}
                  {selectedProduct.keyBenefits && selectedProduct.keyBenefits.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Check className="w-5 h-5 text-emerald-600" />
                        Key Benefits
                      </h3>
                      <ul className="space-y-2">
                        {selectedProduct.keyBenefits.map((benefit: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                            <span className="text-slate-600 text-sm leading-relaxed">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Side Effects */}
                  {selectedProduct.sideEffects && selectedProduct.sideEffects.length > 0 && (
                    <div className="md:col-span-2 mt-4 bg-slate-50 p-6 rounded-2xl">
                      <h3 className="text-lg font-bold text-slate-900 mb-3">
                        Common Side Effects
                      </h3>
                      <p className="text-sm text-slate-600 mb-3">
                        Most side effects do not require any medical attention and disappear as your body adjusts to the medicine. Consult your doctor if they persist or if you're worried about them.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.sideEffects.map((effect, i) => (
                          <span
                            key={i}
                            className="bg-white border border-slate-200 text-slate-700 px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {effect}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-500">
              <Package className="w-16 h-16 text-slate-200 mb-4" />
              <p className="text-lg font-medium text-slate-900">No Product Selected</p>
              <p className="text-sm">Select a product from the list to view details</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 h-screen flex items-center justify-center">Loading store...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
