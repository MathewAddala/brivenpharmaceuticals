"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header at top */}
      <Header />

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center min-h-[70vh] bg-gradient-to-b from-white via-slate-50/60 to-emerald-50/60 px-4 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
          {/* Briven logo / mascot image */}
          <div className="relative mb-6 sm:mb-8 transition-transform hover:scale-105 duration-300">
            <Image
              src="/images/briven-logo.png"
              alt="Briven Pharmaceutical Mascot & Logo"
              width={240}
              height={240}
              priority
              unoptimized
              className="h-32 sm:h-48 w-auto object-contain mx-auto drop-shadow-sm"
            />
          </div>

          {/* Tagline */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Caring for Life, Delivering Trust
          </h1>

          {/* Subtitle with ShieldCheck icon */}
          <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2 text-emerald-800 text-sm sm:text-base font-semibold">
            <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
            <span>WHO-GMP Certified Pharmaceutical Formulations</span>
          </div>

          {/* Big prominent CTA button */}
          <div className="mt-8 sm:mt-10">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2.5 sm:gap-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-base sm:text-lg px-7 sm:px-9 py-3.5 sm:py-4 shadow-lg shadow-emerald-700/20 hover:shadow-emerald-700/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Browse Our Product Categories</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Small trust text */}
          <p className="mt-5 text-xs sm:text-sm text-slate-500 font-medium">
            12+ Certified Formulations | Pan-India Reach
          </p>
        </div>
      </main>

      {/* Footer at bottom */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}
