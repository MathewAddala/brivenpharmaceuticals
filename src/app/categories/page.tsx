import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CategoryAssembleGrid from "@/components/CategoryAssembleGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Categories | Briven Pharmaceutical",
  description:
    "Browse our certified WHO-GMP pharmaceutical formulations by therapeutic category.",
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbfdfc]">
      <Header />

      <main className="flex-1 py-6 sm:py-12">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
          <CategoryAssembleGrid />
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
