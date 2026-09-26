import ProductCard from "./ProductCard";
import type { Product } from "@/data/products";

export default function ProductGrid({
  products,
  title,
  subtitle,
}: {
  products: Product[];
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-8 sm:mb-10">
            {subtitle && (
              <span className="text-xs font-semibold uppercase tracking-widest text-briven-primary">
                {subtitle}
              </span>
            )}
            {title && (
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-foreground">
                {title}
              </h2>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
