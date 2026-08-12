"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, Heart, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, Suspense } from "react";
import { products } from "@/data/products";

function SellsContent() {
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(urlSearch);
  const [condition, setCondition] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [era, setEra] = useState("All");

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  const filteredProducts = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return products.filter((product) => {
      const matchesSearch =
        !searchText ||
        product.name.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText) ||
        product.description.toLowerCase().includes(searchText) ||
        product.condition.toLowerCase().includes(searchText) ||
        product.seller.toLowerCase().includes(searchText) ||
        product.location.toLowerCase().includes(searchText) ||
        product.details.material.toLowerCase().includes(searchText) ||
        product.details.era.toLowerCase().includes(searchText);

      const matchesCondition =
        condition === "All" || product.condition === condition;

      const minimum = minPrice ? Number(minPrice) : 0;

      const maximum = maxPrice ? Number(maxPrice) : Infinity;

      const matchesPrice =
        product.price >= minimum && product.price <= maximum;

      const matchesEra = era === "All" || product.details.era === era;

      return (
        matchesSearch && matchesCondition && matchesPrice && matchesEra
      );
    });
  }, [search, condition, minPrice, maxPrice, era]);

  function clearFilters() {
    setCondition("All");
    setMinPrice("");
    setMaxPrice("");
    setEra("All");
  }

  function clearSearch() {
    setSearch("");
    clearFilters();
  }

  const resultLabel = search.trim() ? `"${search.trim()}"` : "All Finds";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        {/* Results Header */}
        <div className="mb-8">
          <p className="font-serif text-xs uppercase tracking-[0.2em] text-muted-2">
            SleekFinds Marketplace
          </p>

          <h1 className="mt-2 font-serif text-3xl font-bold">
            Results for <span className="text-primary">{resultLabel}</span>
          </h1>

          <p className="mt-2 font-serif text-sm text-muted">
            Showing {filteredProducts.length} curated{" "}
            {filteredProducts.length === 1 ? "item" : "items"}
          </p>
        </div>

        {/* Mobile Search */}
        <div className="mb-8 md:hidden">
          <div className="flex items-center rounded-md border border-border bg-surface px-3">
            <Search size={17} className="text-muted" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search finds..."
              aria-label="Search finds"
              className="w-full bg-transparent px-3 py-3 font-serif text-sm outline-none placeholder:text-muted"
            />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[180px_1fr]">
          {/* Filters */}
          <aside className="h-fit rounded-lg border border-border bg-surface p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-semibold">Filters</h2>

              <button
                type="button"
                onClick={clearFilters}
                className="font-serif text-xs text-muted hover:text-foreground"
              >
                Clear all
              </button>
            </div>

            {/* Condition */}
            <div className="mt-7">
              <p className="font-serif text-xs font-medium">Condition</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "All",
                  "Excellent",
                  "Very Good",
                  "Good",
                  "Mint",
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCondition(item)}
                    className={`rounded-full border px-3 py-1 font-serif text-xs transition ${
                      condition === item
                        ? "border-primary bg-primary text-white"
                        : "border-border bg-background text-muted hover:text-foreground"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mt-7">
              <p className="font-serif text-xs font-medium">Price Range</p>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <input
                  type="number"
                  min="0"
                  value={minPrice}
                  onChange={(event) => setMinPrice(event.target.value)}
                  placeholder="Min"
                  className="w-full rounded-md border border-border bg-background px-2 py-2 font-serif text-xs outline-none focus:border-primary"
                />

                <input
                  type="number"
                  min="0"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(event.target.value)}
                  placeholder="Max"
                  className="w-full rounded-md border border-border bg-background px-2 py-2 font-serif text-xs outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Era */}
            <div className="mt-7">
              <p className="font-serif text-xs font-medium">Era</p>

              <div className="mt-3 space-y-2">
                {["All", "1970s", "1980s", "1990s", "2000s"].map((item) => (
                  <label
                    key={item}
                    className="flex cursor-pointer items-center gap-2 font-serif text-xs text-muted"
                  >
                    <input
                      type="radio"
                      name="era"
                      value={item}
                      checked={era === item}
                      onChange={() => setEra(item)}
                      className="accent-primary"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Products */}
          <div>
            {filteredProducts.length === 0 ? (
              <div className="rounded-lg border border-border bg-surface p-16 text-center">
                <Search size={30} className="mx-auto text-muted" />

                <h2 className="mt-5 font-serif text-xl font-semibold">
                  No finds matched your search
                </h2>

                <p className="mt-2 font-serif text-sm text-muted">
                  Try another search or remove some filters.
                </p>

                <button
                  type="button"
                  onClick={clearSearch}
                  className="mt-6 rounded-md bg-primary px-5 py-2.5 font-serif text-sm font-medium text-white"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="group overflow-hidden rounded-lg border border-border bg-surface"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-surface-secondary">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-105"
                        />

                        <span className="absolute left-2 top-2 rounded-full bg-surface px-2.5 py-1 font-serif text-[10px] font-medium text-foreground shadow-sm">
                          {product.condition}
                        </span>

                        <span
                          className="absolute right-2 top-2 rounded-full bg-surface p-2 text-foreground shadow-sm"
                          aria-label="Wishlist"
                        >
                          <Heart size={15} strokeWidth={1.8} />
                        </span>
                      </div>

                      <div className="p-4">
                        <p className="font-serif text-[10px] uppercase tracking-wide text-muted">
                          {product.category} · {product.details.era}
                        </p>

                        <h3 className="mt-1 truncate font-serif text-lg font-semibold">
                          {product.name}
                        </h3>

                        <div className="mt-3 flex items-center justify-between">
                          <p className="font-serif font-medium">
                            ${product.price.toLocaleString()}
                          </p>

                          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border transition group-hover:bg-primary group-hover:text-white">
                            <ArrowRight size={14} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {filteredProducts.length >= 6 && (
                  <div className="mt-10 text-center">
                    <button
                      type="button"
                      className="rounded-full border border-border bg-surface px-8 py-2.5 font-serif text-xs font-medium transition hover:bg-surface-secondary"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function SellsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background text-muted">
          <p className="font-serif text-sm">Loading finds...</p>
        </div>
      }
    >
      <SellsContent />
    </Suspense>
  );
}