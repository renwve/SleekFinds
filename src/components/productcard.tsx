"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { isItemSaved, toggleSavedItem } from "@/lib/storage";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isItemSaved(String(product.id)));
  }, [product.id]);

  function handleWishlistClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    const newSavedState = toggleSavedItem({
      id: String(product.id),
      title: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
    });

    setSaved(newSavedState);
  }

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="overflow-hidden rounded-md border border-border bg-surface shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div className="relative aspect-square overflow-hidden bg-surface-2">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <button
            type="button"
            aria-label={
              saved
                ? `Remove ${product.name} from wishlist`
                : `Save ${product.name} to wishlist`
            }
            onClick={handleWishlistClick}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-surface text-foreground shadow-sm transition hover:scale-105 hover:bg-white"
          >
            <Heart
              size={17}
              strokeWidth={1.8}
              fill={saved ? "currentColor" : "none"}
            />
          </button>
        </div>
        <div className="p-4">
          <p className="text-xs text-muted">{product.category}</p>
          <h3 className="mt-1 font-serif font-medium text-foreground">{product.name}</h3>
          <p className="mt-2 font-serif font-semibold text-foreground">
            ${product.price.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-muted">{product.condition} condition</p>
        </div>
      </div>
    </Link>
  );
}