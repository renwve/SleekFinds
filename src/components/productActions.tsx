"use client";

import { Heart, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/cartcontext";

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const { addToCart, saveItem, removeSavedItem, isSaved, isInCart } = useCart();

  const saved = isSaved(product.id);
  const inCart = isInCart(product.id);

  function handleAddToCart() {
    addToCart(product);
  }

  function handleWishlist() {
    if (saved) {
      removeSavedItem(product.id);
    } else {
      saveItem(product);
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleAddToCart}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-serif font-medium text-white transition hover:bg-primary-hover"
      >
        {inCart ? (
          <>
            <Check size={18} />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingBag size={18} />
            Add to Cart
          </>
        )}
      </button>
      <button
        type="button"
        onClick={handleWishlist}
        className={`flex w-full items-center justify-center gap-2 rounded-lg border px-6 py-3 font-serif font-medium transition ${
          saved
            ? "border-primary bg-primary text-white"
            : "border-border text-foreground hover:bg-surface-secondary"
        }`}
      >
        <Heart size={18} fill={saved ? "currentColor" : "none"} />
        {saved ? "Saved to Wishlist" : "Save to Wishlist"}
      </button>
    </div>
  );
}