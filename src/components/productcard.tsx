import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-surface transition-shadow hover:shadow-md">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-surface-secondary">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
          />

          {/* Wishlist Icon */}
          <div
            aria-label={`Save ${product.name} to wishlist`}
            className="absolute right-3 top-3 rounded-full bg-surface p-2 text-foreground shadow-sm"
          >
            <Heart size={17} strokeWidth={1.8} />
          </div>
        </div>

        {/* Product Information */}
        <div className="p-4">
          <p className="text-xs text-muted">
            {product.category}
          </p>

          <h3 className="mt-1 font-medium text-foreground">
            {product.name}
          </h3>

          <p className="mt-2 font-semibold text-foreground">
            ${product.price.toLocaleString()}
          </p>

          <p className="mt-1 text-xs text-muted">
            {product.condition} condition
          </p>
        </div>
      </div>
    </Link>
  );
}