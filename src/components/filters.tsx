"use client";

interface FiltersProps {
  categories?: string[];
  selectedCategories?: string[];
  maxPrice?: number;
  onCategoryChange?: (category: string) => void;
  onMaxPriceChange?: (price: number) => void;
}

export default function Filters({
  categories = [
    "Furniture",
    "Clothing",
    "Electronics",
    "Books",
    "Accessories",
  ],
  selectedCategories = [],
  maxPrice = 10000,
  onCategoryChange,
  onMaxPriceChange,
}: FiltersProps) {
  return (
    <aside className="w-full space-y-8 lg:w-72">
      <div>
        <h2 className="mb-6 text-2xl font-semibold text-foreground">
          Filters
        </h2>

        {/* Price */}
        <div className="border-b border-border pb-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-medium text-foreground">Price Range</h3>

            <span className="font-serif text-sm font-medium text-primary">
              ${maxPrice.toLocaleString()}
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={maxPrice}
            onChange={(event) => {
              const value = Number(event.target.value);
              onMaxPriceChange?.(value);
            }}
            className="w-full cursor-pointer accent-primary"
            aria-label="Maximum price"
          />

          <div className="mt-3 flex justify-between text-xs text-muted">
            <span>$0</span>
            <span>$10,000+</span>
          </div>
        </div>

        {/* Categories */}
        <div className="border-b border-border py-6">
          <h3 className="mb-4 font-medium text-foreground">
            Categories
          </h3>

          <div className="space-y-3 text-sm text-foreground">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category);

              return (
                <label
                  key={category}
                  className="flex cursor-pointer items-center gap-3"
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onCategoryChange?.(category)}
                    className="h-4 w-4 cursor-pointer accent-primary"
                  />

                  <span
                    className={
                      isSelected
                        ? "font-medium text-foreground"
                        : "text-muted"
                    }
                  >
                    {category}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Conscious Choice */}
        <div className="rounded-xl bg-accent p-5 text-accent-foreground">
          <h3 className="text-lg font-semibold">
            Conscious Choice
          </h3>

          <p className="mt-2 text-sm opacity-90">
            Buying second-hand reduces waste and extends the life
            of quality products.
          </p>
        </div>
      </div>
    </aside>
  );
}