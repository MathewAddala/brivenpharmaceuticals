import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ShieldCheck, Award, Users, HeartPulse, Target, Leaf } from "lucide-react";

export const metadata = {
  title: "About Us | Briven Pharmaceutical",
  description:
    "Learn about Briven Pharmaceutical — our mission, values, and commitment to quality healthcare.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Page header */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#eef8f2] via-[#f7fbf8] to-white py-8 sm:py-20 border-b border-slate-100">
          <div className="relative mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 sm:px-3.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold text-emerald-800 ring-1 ring-emerald-200/80 mb-2 sm:mb-4">
              About Briven Pharmaceutical
            </span>
            <h1 className="font-display text-xl sm:text-5xl font-black text-slate-900 leading-tight">
              Caring for Life, <br />
              <span className="text-[#1a6b3a]">Delivering Trust.</span>
            </h1>
            <p className="mt-2 sm:mt-4 max-w-2xl mx-auto text-[11px] sm:text-base text-slate-600 font-medium">
              At Briven Pharmaceutical, we believe quality healthcare should be accessible to everyone. Our formulations are batch-certified under strict GMP guidelines.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-8 sm:py-18 bg-white">
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            <div className="text-center mb-6 sm:mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#1a6b3a]">
                Our Core Values
              </span>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                What Drives Us
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  icon: ShieldCheck,
                  title: "Quality First",
                  description:
                    "Every formulation is manufactured under WHO-GMP certified facilities, ensuring the highest standards of purity, potency, and shelf-life stability.",
                  color: "text-emerald-700",
                  bg: "bg-emerald-50",
                },
                {
                  icon: HeartPulse,
                  title: "Patient-Centric",
                  description:
                    "Our products are formulated for maximum patient compliance — gentle enteric coatings, fast-acting prokinetics, and palatable nutrition flavors.",
                  color: "text-rose-700",
                  bg: "bg-rose-50",
                },
                {
                  icon: Award,
                  title: "Clinical Excellence",
                  description:
                    "Evidence-backed formulations across pain relief, acid suppression, broad-spectrum anti-infectives, and specialized neuropathic care.",
                  color: "text-blue-700",
                  bg: "bg-blue-50",
                },
                {
                  icon: Users,
                  title: "Healthcare Partnerships",
                  description:
                    "We partner with physicians, clinics, and pharmacy networks across India to ensure reliable, uninterrupted supply of essential medications.",
                  color: "text-purple-700",
                  bg: "bg-purple-50",
                },
                {
                  icon: Target,
                  title: "Accessibility & Value",
                  description:
                    "Committed to fair, transparent pricing because financial constraints should never stand between a patient and certified medication.",
                  color: "text-amber-700",
                  bg: "bg-amber-50",
                },
                {
                  icon: Leaf,
                  title: "Responsibility",
                  description:
                    "Ethical pharmaceutical supply chain management, verifiable batch certification, and professional clinical pharmacist counseling.",
                  color: "text-teal-700",
                  bg: "bg-teal-50",
                },
              ].map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all duration-200"
                >
                  <div
                    className={`inline-flex rounded-2xl ${value.bg} p-3.5 mb-4 shadow-xs`}
                  >
                    <value.icon className={`h-6 w-6 ${value.color}`} />
                  </div>
                  <h3 className="font-display text-base font-extrabold text-slate-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-6 sm:py-16 bg-[#f8faf8] border-t border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6">
              {[
                { number: "12+", label: "Formulations" },
                { number: "5", label: "Categories" },
                { number: "100%", label: "WHO-GMP" },
                { number: "Pan-India", label: "Reach" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center rounded-xl sm:rounded-2xl border border-slate-100 bg-white p-3 sm:p-6 shadow-xs"
                >
                  <p className="font-display text-xl sm:text-4xl font-black text-[#1a6b3a]">
                    {stat.number}
                  </p>
                  <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-sm font-semibold text-slate-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-8 sm:py-18 bg-white">
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#0d3b20] to-[#1a6b3a] p-5 sm:p-12 text-center text-white shadow-xl">
              <h2 className="font-display text-base sm:text-3xl font-black">
                Partner with Briven Pharmaceutical
              </h2>
              <p className="mt-1 sm:mt-2 max-w-lg mx-auto text-[10px] sm:text-sm text-emerald-100 font-medium">
                Whether you are a hospital, clinic, or pharmacy — connect with our supply team.
              </p>
              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                <a
                  href="https://wa.me/919493504671?text=Hi%20Briven%20Pharmaceutical%2C%20I%20want%20to%20discuss%20distribution%20partnership"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white px-5 sm:px-7 py-2 sm:py-3 text-[11px] sm:text-xs font-extrabold text-[#0d3b20] hover:bg-emerald-50 transition-colors shadow-md w-full sm:w-auto"
                >
                  WhatsApp Inquiries
                </a>
                <a
                  href="tel:+919493504671"
                  className="rounded-full bg-white/10 backdrop-blur-sm px-5 sm:px-7 py-2 sm:py-3 text-[11px] sm:text-xs font-bold text-white ring-1 ring-white/30 hover:bg-white/20 transition-colors w-full sm:w-auto"
                >
                  Call: (+91) 94935 04671
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
