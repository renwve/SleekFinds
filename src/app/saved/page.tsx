"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { useCart } from "@/context/cartcontext";

export default function SavedPage() {
  const { savedItems, removeSavedItem } = useCart();

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <p className="mb-2 font-serif text-xs uppercase tracking-[0.2em] text-muted-2">
            Your Collection
          </p>
          <h1 className="font-serif text-4xl font-semibold text-foreground">
            Your Selection
          </h1>
          <p className="mt-2 max-w-xl font-serif text-sm text-muted">
            Curated pieces you've saved for later consideration.
          </p>
        </div>
        {savedItems.length === 0 ? (
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-lg border border-border bg-surface px-6 text-center">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-background">
              <Heart size={24} className="text-muted-2" />
            </div>
            <h2 className="font-serif text-2xl font-semibold">Nothing saved yet</h2>
            <p className="mt-2 max-w-md font-serif text-sm text-muted">
              When you find something you love, click the heart icon to save it here.
            </p>
            <Link
              href="/sells"
              className="mt-6 inline-flex items-center gap-2 bg-primary px-6 py-3 font-serif text-sm font-medium text-white transition hover:bg-primary-hover"
            >
              Browse Finds
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-5 font-serif text-sm text-muted">
              {savedItems.length} {savedItems.length === 1 ? "item" : "items"} saved
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {savedItems.map((item) => (
                <div
                  key={item.id}
                  className="group overflow-hidden rounded-md border border-border bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative aspect-square overflow-hidden bg-surface-2">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center font-serif text-sm text-muted">
                        No image
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeSavedItem(item.id)}
                      aria-label="Remove saved item"
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-primary shadow-sm transition hover:bg-white"
                    >
                      <Heart size={16} fill="currentColor" />
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="font-serif text-[10px] uppercase tracking-wider text-muted-2">
                      {item.category}
                    </p>
                    <Link
                      href={`/products/${item.id}`}
                      className="mt-1 block font-serif text-lg font-semibold hover:underline"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-2 font-serif text-sm font-semibold text-primary">
                      ${item.price.toLocaleString()}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeSavedItem(item.id)}
                      className="mt-4 w-full border border-border py-2 font-serif text-xs font-medium text-foreground transition hover:bg-background"
                    >
                      Remove from Selection
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}