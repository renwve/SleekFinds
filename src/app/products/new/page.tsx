"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const inputClass =
  "mt-2 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-foreground outline-none focus:border-primary";

export default function NewProductPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const form = new FormData(event.currentTarget);
    const product = {
      name: form.get("name"),
      price: Number(form.get("price")),
      category: form.get("category"),
      condition: form.get("condition"),
      description: form.get("description"),
      seller: form.get("seller"),
      location: form.get("location"),
      image: form.get("image"),
      gallery: [],
      details: {
        material: form.get("material"),
        dimensions: form.get("dimensions"),
        era: form.get("era"),
      },
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create product");
      }

      router.push("/products");
      router.refresh();
    } catch (caughtError: unknown) {
      setError(
        caughtError instanceof Error ? caughtError.message : "Failed to create product",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-background px-6 py-12 text-foreground">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm text-muted">Seller tools</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold">Create a listing</h1>

        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
          {error && (
            <div role="alert" className="border border-red-500/30 bg-red-500/10 p-4 text-red-700">
              {error}
            </div>
          )}

          <section className="grid gap-5 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className="text-sm font-medium">Product name</span>
              <input name="name" required className={inputClass} />
            </label>

            <label>
              <span className="text-sm font-medium">Price</span>
              <input name="price" type="number" min="0" step="0.01" required className={inputClass} />
            </label>

            <label>
              <span className="text-sm font-medium">Category</span>
              <input name="category" required className={inputClass} />
            </label>

            <label>
              <span className="text-sm font-medium">Condition</span>
              <select name="condition" required className={inputClass} defaultValue="">
                <option value="" disabled>Select condition</option>
                <option>Excellent</option>
                <option>Very Good</option>
                <option>Good</option>
                <option>Fair</option>
              </select>
            </label>

            <label>
              <span className="text-sm font-medium">Seller name</span>
              <input name="seller" required className={inputClass} />
            </label>

            <label className="sm:col-span-2">
              <span className="text-sm font-medium">Location</span>
              <input name="location" required className={inputClass} />
            </label>

            <label className="sm:col-span-2">
              <span className="text-sm font-medium">Image URL</span>
              <input name="image" type="url" required placeholder="https://example.com/product.jpg" className={inputClass} />
            </label>

            <label className="sm:col-span-2">
              <span className="text-sm font-medium">Description</span>
              <textarea name="description" required rows={5} className={inputClass} />
            </label>
          </section>

          <fieldset className="border-t border-border pt-8">
            <legend className="font-serif text-xl font-semibold">Item details</legend>
            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              <label>
                <span className="text-sm font-medium">Material</span>
                <input name="material" className={inputClass} />
              </label>
              <label>
                <span className="text-sm font-medium">Dimensions</span>
                <input name="dimensions" className={inputClass} />
              </label>
              <label>
                <span className="text-sm font-medium">Era</span>
                <input name="era" className={inputClass} />
              </label>
            </div>
          </fieldset>

          <div className="flex justify-end gap-3 border-t border-border pt-6">
            <button type="button" onClick={() => router.back()} className="px-5 py-2.5 text-muted hover:text-foreground">
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-md bg-primary px-6 py-2.5 font-medium text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Creating..." : "Create listing"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
