"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CuratedPromoBanners() {
  const cards = [
    {
      id: 0,
      badge: "GET ALL YOUR",
      title: "Medication at One Place",
      link: "/products",
      bg: "bg-[#d8ebf9]",
      textCol: "text-sky-950",
      btnBg: "bg-sky-800 hover:bg-sky-900",
      image: "/images/promos/promo-medication-all.jpg",
    },
    {
      id: 1,
      badge: "UP TO 19% OFF",
      title: "Naturally Good & Gastro",
      link: "/products?category=Gastrointestinal",
      bg: "bg-[#fce5e5]",
      textCol: "text-rose-950",
      btnBg: "bg-rose-800 hover:bg-rose-900",
      image: "/images/promos/promo-gastro-relief.jpg",
    },
    {
      id: 2,
      badge: "UP TO 17% OFF",
      title: "Antibiotics Range",
      link: "/products?category=Antibiotics",
      bg: "bg-[#d2efe1]",
      textCol: "text-emerald-950",
      btnBg: "bg-emerald-800 hover:bg-emerald-900",
      image: "/images/promos/promo-antibiotics.jpg",
    },
    {
      id: 3,
      badge: "UP TO 16% OFF",
      title: "Nutrition & Nerve Care",
      link: "/products?category=Nutritional%20Supplements",
      bg: "bg-[#faecd6]",
      textCol: "text-amber-950",
      btnBg: "bg-amber-800 hover:bg-amber-900",
      image: "/images/promos/promo-nutrition.jpg",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInteractingRef = useRef(false);

  // Auto-scroll on mobile every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (isInteractingRef.current) return;
      setActiveIndex((prev) => {
        const next = (prev + 1) % cards.length;
        if (scrollContainerRef.current) {
          const cardWidth = scrollContainerRef.current.clientWidth * 0.82;
          scrollContainerRef.current.scrollTo({
            left: next * cardWidth,
            behavior: "smooth",
          });
        }
        return next;
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [cards.length]);

  const scrollToSlide = (index: number) => {
    setActiveIndex(index);
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.clientWidth * 0.82;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const scrollLeft = scrollContainerRef.current.scrollLeft;
    const cardWidth = scrollContainerRef.current.clientWidth * 0.82;
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex >= 0 && newIndex < cards.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section className="bg-white py-2 sm:py-5">
      <div className="mx-auto max-w-7xl px-2.5 sm:px-6 lg:px-8">
        {/* Mobile: Auto-scrollable horizontal snap container */}
        {/* Desktop: 4-card grid */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          onTouchStart={() => {
            isInteractingRef.current = true;
          }}
          onTouchEnd={() => {
            setTimeout(() => {
              isInteractingRef.current = false;
            }, 2000);
          }}
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-2.5 px-2.5 sm:mx-0 sm:px-0"
        >
          {cards.map((c, idx) => (
            <Link
              key={c.title}
              href={c.link}
              className={`relative overflow-hidden rounded-2xl p-3.5 sm:p-4 ${c.bg} ${c.textCol} flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200 group w-[82vw] sm:w-auto shrink-0 sm:shrink snap-center min-h-[120px] sm:min-h-[155px]`}
            >
              <div className="flex items-start justify-between gap-2.5">
                <div className="flex-1 min-w-0 pr-1">
                  <span className="text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wider opacity-75">
                    {c.badge}
                  </span>
                  <h3 className="mt-0.5 font-display text-xs sm:text-sm font-black leading-snug line-clamp-2">
                    {c.title}
                  </h3>
                </div>

                <div className="relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 overflow-hidden rounded-xl border border-white/70 shadow-xs group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 56px, 64px"
                  />
                </div>
              </div>

              <div className="mt-2 sm:mt-2.5 flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 sm:px-3 py-1 text-[9px] sm:text-[11px] font-bold text-white shadow-xs ${c.btnBg}`}
                >
                  <span>Shop Now</span>
                  <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                </span>
                <span className="text-[9px] font-bold opacity-60 sm:hidden">
                  {idx + 1}/{cards.length}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Dots symbol below on mobile */}
        <div className="flex sm:hidden items-center justify-center gap-1.5 pt-2.5">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSlide(i)}
              className={`transition-all duration-300 rounded-full ${
                activeIndex === i
                  ? "w-4 h-1.5 bg-emerald-700 shadow-xs"
                  : "w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
