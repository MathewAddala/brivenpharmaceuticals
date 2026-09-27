import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle, Mail, MapPin, ShieldCheck, Truck, Award } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#042118] text-slate-300 border-t border-emerald-950">
      {/* 3 Core Trust Highlights */}
      <div className="border-b border-emerald-900/40 bg-[#031b14] py-3 sm:py-5">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-around gap-3 sm:gap-6 text-[10px] sm:text-xs font-semibold text-emerald-200/90">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 shrink-0" />
              <span>100% Genuine</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 shrink-0" />
              <span>WHO-GMP</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Truck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 shrink-0" />
              <span>Doorstep</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 sm:gap-8 text-center md:text-left">
          {/* Logo & Brand Info */}
          <div className="space-y-2.5 sm:space-y-3 max-w-sm flex flex-col items-center md:items-start">
            <Link href="/" className="inline-flex items-center rounded-xl sm:rounded-2xl bg-white px-3 sm:px-4 py-1.5 sm:py-2 shadow-xs hover:shadow-md transition-shadow">
              <Image
                src="/images/briven-logo.png"
                alt="Briven Pharmaceutical"
                width={130}
                height={45}
                className="h-7 sm:h-9 w-auto object-contain"
                unoptimized
              />
            </Link>

            <p className="text-[10px] sm:text-xs text-emerald-100/70 leading-relaxed font-medium">
              Caring for Life, Delivering Trust. Certified pharmaceutical formulations across gastrointestinal care, antibiotics, pain relief, and clinical nutrition.
            </p>

            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs text-emerald-300 font-bold">
              <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-400" />
              <span>Vijayawada, Andhra Pradesh</span>
            </div>
          </div>

          {/* Quick Navigation Pills */}
          <div className="space-y-2.5 sm:space-y-3 flex flex-col items-center md:items-start">
            <h4 className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-emerald-400">
              Quick Explore
            </h4>
            <div className="flex flex-wrap justify-center md:justify-start gap-1.5 sm:gap-2">
              <Link
                href="/"
                className="rounded-full bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-800/50 px-3 sm:px-3.5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/categories"
                className="rounded-full bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-800/50 px-3 sm:px-3.5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold text-white transition-colors"
              >
                Categories
              </Link>
              <Link
                href="/products"
                className="rounded-full bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-800/50 px-3 sm:px-3.5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold text-white transition-colors"
              >
                Products
              </Link>
            </div>
          </div>

          {/* Direct Contact */}
          <div className="space-y-2.5 sm:space-y-3 flex flex-col items-center md:items-start">
            <h4 className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-emerald-400">
              Direct Contact
            </h4>
            <div className="space-y-1.5 sm:space-y-2 text-xs">
              <a
                href="tel:+919493504671"
                className="flex items-center justify-center md:justify-start gap-1.5 sm:gap-2 text-white font-extrabold hover:text-emerald-300 transition-colors"
              >
                <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-emerald-900/60 text-emerald-400">
                  <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </div>
                <span className="text-[11px] sm:text-xs">+91 94935 04671</span>
              </a>

              <a
                href="https://wa.me/919493504671?text=Hi%20Briven%20Pharmaceutical%2C%20I%20want%20to%20inquire%20about%20medicines"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-[#1a6b3a] hover:bg-[#14532d] px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold text-white shadow-md shadow-emerald-950/20 transition-all hover:scale-102"
              >
                <MessageCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span>Chat on WhatsApp</span>
              </a>

              <div className="pt-0.5 sm:pt-1">
                <a
                  href="mailto:info@brivenpharm.com"
                  className="flex items-center justify-center md:justify-start gap-1.5 sm:gap-2 text-emerald-200/70 hover:text-white transition-colors text-[10px] sm:text-[11px]"
                >
                  <Mail className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-emerald-400" />
                  <span>info@brivenpharm.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-emerald-900/40 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-emerald-200/60 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Briven Pharmaceutical • Vijayawada</p>
          <p>Licensed Formulations • Prescription required for Rx drugs</p>
        </div>
      </div>
    </footer>
  );
}
