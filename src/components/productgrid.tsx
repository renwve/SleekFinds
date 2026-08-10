import { Product, products as defaultProducts } from "@/data/products";
import ProductCard from "./productcard";

interface ProductGridProps {
  products?: Product[];
}

export default function ProductGrid({ products = defaultProducts }: ProductGridProps) {
  return (
    <>
      {products.length === 0 ? (
        <div className="border-y border-border py-16 text-center text-muted">
          No products match these filters.
        </div>
      ) : (
        <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
