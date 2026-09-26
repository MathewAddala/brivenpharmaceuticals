import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import ProductAddToCartButton from "@/components/ProductAddToCartButton";
import {
  products,
  getProductBySlug,
  getProductsByCategory,
} from "@/data/products";
import {
  ArrowLeft,
  MessageCircle,
  Phone,
  ShieldCheck,
  Package,
  Factory,
  AlertTriangle,
  CheckCircle2,
  Info,
} from "lucide-react";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} | Briven Pharmaceutical`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const whatsappMessage = `Hi, I'm interested in ${product.name} (${product.composition}). Pack: ${product.packSize}. Please confirm availability and pricing.`;
  const whatsappUrl = `https://wa.me/919493504671?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <Header />
      <main className="flex-1 bg-briven-surface-alt">
        {/* Breadcrumb */}
        <div className="bg-briven-surface border-b border-briven-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-2 text-sm">
              <Link
                href="/products"
                className="flex items-center gap-1 text-briven-muted hover:text-briven-primary transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                All Products
              </Link>
              <span className="text-briven-muted">/</span>
              <span className="text-foreground font-medium">
                {product.name}
              </span>
            </div>
          </div>
        </div>

        {/* Product detail */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image */}
            <div className="rounded-2xl border border-briven-border bg-briven-surface p-8 sm:p-12">
              <div className="relative aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  unoptimized
                  className="object-contain mix-blend-multiply"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {/* Badges */}
                <div className="absolute top-0 left-0 flex gap-2">
                  {product.prescriptionType === "Rx" ? (
                    <span className="rx-badge inline-flex items-center rounded-lg bg-red-50 px-3 py-1 text-sm font-bold text-red-800 ring-1 ring-red-200">
                      Rx — Prescription Required
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-lg bg-green-50 px-3 py-1 text-sm font-semibold text-green-800 ring-1 ring-green-200">
                      OTC — No Prescription Needed
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Info */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-briven-clinical">
                {product.category}
              </span>

              <h1 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-foreground">
                {product.name}
              </h1>

              <p className="mt-3 text-base text-briven-muted leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Composition */}
              <div className="mt-6 rounded-xl bg-briven-50 border border-briven-200 p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-briven-700 mb-1">
                  Composition / Salt
                </h3>
                <p className="text-sm font-medium text-briven-900">
                  {product.composition}
                </p>
              </div>

              {/* Meta grid */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="flex items-start gap-2.5 rounded-lg border border-briven-border p-3">
                  <Package className="h-4 w-4 text-briven-primary mt-0.5" />
                  <div>
                    <p className="text-[11px] text-briven-muted uppercase tracking-wider">
                      Pack Size
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {product.packSize}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 rounded-lg border border-briven-border p-3">
                  <Factory className="h-4 w-4 text-briven-primary mt-0.5" />
                  <div>
                    <p className="text-[11px] text-briven-muted uppercase tracking-wider">
                      Marketed By
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {product.manufacturer}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-foreground tabular-nums">
                  ₹{product.sellingPrice.toFixed(2)}
                </span>
                {product.discount > 0 && (
                  <>
                    <span className="text-lg text-briven-muted line-through tabular-nums">
                      ₹{product.mrp.toFixed(2)}
                    </span>
                    <span className="rounded-md bg-briven-accent/10 px-2 py-0.5 text-sm font-bold text-briven-accent">
                      Save {product.discount}%
                    </span>
                  </>
                )}
              </div>

              {/* Stock */}
              <div className="mt-3 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  In Stock
                </span>
              </div>

              {/* Add to Cart & WhatsApp Order */}
              <div className="mt-6">
                <ProductAddToCartButton product={product} />
              </div>

              {/* Trust note */}
              <div className="mt-5 flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 p-3">
                <Info className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-800 leading-relaxed">
                  This product information is for reference only. Always consult
                  your physician or pharmacist before use. Self-medication can
                  be harmful.
                </p>
              </div>
            </div>
          </div>

          {/* Uses and Side Effects */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-briven-border bg-briven-surface p-6">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-foreground mb-4">
                <ShieldCheck className="h-5 w-5 text-briven-primary" />
                Common Uses
              </h3>
              <ul className="space-y-2">
                {product.uses.map((use) => (
                  <li
                    key={use}
                    className="flex items-start gap-2.5 text-sm text-briven-muted"
                  >
                    <CheckCircle2 className="h-4 w-4 text-briven-500 mt-0.5 flex-shrink-0" />
                    {use}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-briven-border bg-briven-surface p-6">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-foreground mb-4">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Possible Side Effects
              </h3>
              <ul className="space-y-2">
                {product.sideEffects.map((effect) => (
                  <li
                    key={effect}
                    className="flex items-start gap-2.5 text-sm text-briven-muted"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    {effect}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-xl font-bold text-foreground mb-6">
                Related Products in {product.category}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
