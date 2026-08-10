"Use client";
import { ChevronDown } from "lucide-react";

export default function Filters() {
  return (
    <aside className="w-72 space-y-8">
      <div>
        <h2 className="mb-6 text-2xl font-semibold text-foreground">Filters</h2>
        <div className="border-b border-border pb-6">
          <h3 className="mb-4 font-medium text-foreground">Price Range</h3>
          <div>
            <input 
            title ="range"
              type="range"
              min="0"
              max="1000"
              className="w-full accent-primary"
            />
            <div className="mt-3 flex justify-between text-sm text-muted">
              <span>$0</span> <span>$1000+</span>
            </div>
          </div>
          <div className="border-b border-border py-6">
            <h3 className="mb-4 font-medium text-foreground">Categories </h3>
            <div className="space-y-3 text-sm text-foreground">
              <label className="flex items-center gap-3">
                <input type="checkbox" />
                Furniture
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" />
                Clothing
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" />
                Electronics
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" />
                Books
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" />
                Accessories
              </label>
            </div>
          </div>
          <div className="border-b border-border py-6">
            <button className="flex w-full items-center justify-between font-medium text-foreground">
              Condition
              <ChevronDown size={18} />
            </button>
          </div>
          <div className="border-b border-border py-6">
            <button className="flex w-full items-center justify-between font-medium text-foreground">
              Brand <ChevronDown size={18} />
            </button>
          </div>
          <div className="py-6">
            <button className="flex w-full items-center justify-between font-medium text-foreground">
              Location <ChevronDown size={18} />
            </button>
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
