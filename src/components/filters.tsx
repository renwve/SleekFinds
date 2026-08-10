"use client";

interface FiltersProps {
  categories?: string[];
  selectedCategories?: string[];
  maxPrice?: number;
  onCategoryChange?: (category: string) => void;
  onMaxPriceChange?: (price: number) => void;
}

export default function Filters({
  categories = ["Furniture", "Clothing", "Electronics", "Books", "Accessories"],
  selectedCategories = [],
  maxPrice = 10000,
  onCategoryChange,
  onMaxPriceChange,
}: FiltersProps) {
  return (
    <aside className="w-full space-y-8 lg:w-72">
      <div>
        <h2 className="mb-6 text-2xl font-semibold text-foreground">Filters</h2>
        <div className="border-b border-border pb-6">
          <h3 className="mb-4 font-medium text-foreground">Price Range</h3>
          <div>
            <input 
            title ="range"
              type="range"
              min="0"
              max="10000"
              step="100"
              value={maxPrice}
              onChange={(event) => onMaxPriceChange?.(Number(event.target.value))}
              className="w-full accent-primary"
            />
            <div className="mt-3 flex justify-between text-sm text-muted">
              <span>$0</span> <span>${maxPrice.toLocaleString()}</span>
            </div>
          </div>
          <div className="border-b border-border py-6">
            <h3 className="mb-4 font-medium text-foreground">Categories </h3>
            <div className="space-y-3 text-sm text-foreground">
              {categories.map((category) => (
                <label key={category} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => onCategoryChange?.(category)}
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-accent p-5 text-accent-foreground">
          <h3 className="text-lg font-semibold">Conscious Choice</h3>
          <p className="mt-2 text-sm opacity-90">
            Buying second-hand reduces waste and extends the life of quality
            products.
          </p>
        </div>
      </div>
    </aside>
  );
}
