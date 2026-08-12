"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Check,
} from "lucide-react";

import { Product } from "@/data/products";
import { useCart } from "@/context/cartcontext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const {
    addToCart,
    saveItem,
    removeSavedItem,
    isSaved,
    isInCart,
  } = useCart();

  const saved = isSaved(product.id);
  const inCart = isInCart(product.id);

  const [adding, setAdding] = useState(false);

  function handleWishlistClick(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault();
    event.stopPropagation();

    if (saved) {
      removeSavedItem(product.id);
    } else {
      saveItem(product);
    }
  }

  function handleAddToCart(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault();
    event.stopPropagation();

    addToCart(product);

    setAdding(true);

    setTimeout(() => {
      setAdding(false);
    }, 1200);
  }

  return (
    <div className="group">
      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* IMAGE */}
        <div className="relative aspect-[4/5] overflow-hidden bg-surface-2">
          <Link
            href={`/products/${product.id}`}
            className="absolute inset-0 z-0"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              unoptimized
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </Link>

          {/* CONDITION */}
          <div className="pointer-events-none absolute left-3 top-3 z-10">
            <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-black shadow-sm">
              {product.condition}
            </span>
          </div>

          {/* WISHLIST */}
          <button
            type="button"
            aria-label={
              saved
                ? `Remove ${product.name} from saved items`
                : `Save ${product.name}`
            }
            onClick={handleWishlistClick}
            className={`absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border shadow-sm backdrop-blur-md transition-all ${
              saved
                ? "border-primary bg-primary text-white"
                : "border-white/50 bg-white/90 text-foreground hover:scale-105 hover:bg-white"
            }`}
          >
            <Heart
              size={17}
              strokeWidth={1.8}
              fill={saved ? "currentColor" : "none"}
            />
          </button>

          {/* QUICK ADD */}
          <div className="absolute bottom-3 left-3 right-3 z-20 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-black/90 px-4 py-3 text-xs font-medium text-white shadow-lg backdrop-blur-sm transition hover:bg-black"
            >
              {adding ? (
                <>
                  <Check size={15} />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag size={15} />
                  {inCart ? "Add Another" : "Add to Cart"}
                </>
              )}
            </button>
          </div>
        </div>

        {/* DETAILS */}
        <Link
          href={`/products/${product.id}`}
          className="block p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
                {product.category}
              </p>

              <h3 className="mt-2 line-clamp-2 font-serif text-base font-semibold leading-5 text-foreground">
                {product.name}
              </h3>
            </div>

            <p className="shrink-0 font-serif text-base font-semibold text-foreground">
              ${product.price.toLocaleString()}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
            <p className="text-xs text-muted">
              {product.location}
            </p>

            <span className="text-xs text-muted">
              View →
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}