"use client";

import { useMemo, useState } from "react";
import { products } from "@/data/products";
import Filters from "./filters";
import ProductGrid from "./productgrid";

const categories = Array.from(new Set(products.map((product) => product.category))).sort();

export default function ProductCatalog() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(10000);

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          product.price <= maxPrice &&
          (selectedCategories.length === 0 || selectedCategories.includes(product.category)),
      ),
    [maxPrice, selectedCategories],
  );

  function toggleCategory(category: string) {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <div className="mb-8 lg:hidden">
        <details className="border-y border-border py-4">
          <summary className="cursor-pointer font-medium">Filters</summary>
          <div className="pt-6">
            <Filters
              categories={categories}
              selectedCategories={selectedCategories}
              maxPrice={maxPrice}
              onCategoryChange={toggleCategory}
              onMaxPriceChange={setMaxPrice}
            />
          </div>
        </details>
      </div>

      <div className="flex gap-10">
        <div className="hidden shrink-0 lg:block">
          <Filters
            categories={categories}
            selectedCategories={selectedCategories}
            maxPrice={maxPrice}
            onCategoryChange={toggleCategory}
            onMaxPriceChange={setMaxPrice}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="mb-5 text-sm text-muted">
            {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}
          </p>
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </section>
  );
}
