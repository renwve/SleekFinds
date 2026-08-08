import { products } from "@/data/products";
import ProductCard from "./productcard";

export default function ProductGrid() {
  return (
    <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}