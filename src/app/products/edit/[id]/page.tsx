"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface ProductForm {
  name: string;
  price: number;
  category: string;
  condition: string;
  description: string;
  seller: string;
  location: string;
  image: string;
  details?: {
    material?: string;
    dimensions?: string;
    era?: string;
  };
}

const inputClass =
  "mt-2 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-foreground outline-none focus:border-primary";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<ProductForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await fetch(`/api/products/${id}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to load product");
        }

        setProduct(result.data);
      } catch (caughtError: unknown) {
        setError(caughtError instanceof Error ? caughtError.message : "Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    void loadProduct();
  }, [id]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const form = new FormData(event.currentTarget);
    const updates = {
      name: form.get("name"),
      price: Number(form.get("price")),
      category: form.get("category"),
      condition: form.get("condition"),
      description: form.get("description"),
      seller: form.get("seller"),
      location: form.get("location"),
      image: form.get("image"),
      details: {
        material: form.get("material"),
        dimensions: form.get("dimensions"),
        era: form.get("era"),
      },
    };

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update product");
      }

      router.push("/products");
      router.refresh();
    } catch (caughtError: unknown) {
      setError(caughtError instanceof Error ? caughtError.message : "Failed to update product");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <main className="min-h-screen bg-background px-6 py-16 text-center text-muted">Loading product...</main>;
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-background px-6 py-16 text-center">
        <h1 className="font-serif text-3xl font-semibold">Product unavailable</h1>
        <p className="mt-3 text-red-700">{error}</p>
        <button onClick={() => router.push("/products")} className="mt-6 rounded-md bg-primary px-5 py-2.5 text-white">
          Back to products
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-12 text-foreground">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm text-muted">Seller tools</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold">Edit listing</h1>

        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
          {error && <div role="alert" className="border border-red-500/30 bg-red-500/10 p-4 text-red-700">{error}</div>}

          <section className="grid gap-5 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className="text-sm font-medium">Product name</span>
              <input name="name" defaultValue={product.name} required className={inputClass} />
            </label>
            <label>
              <span className="text-sm font-medium">Price</span>
              <input name="price" type="number" min="0" step="0.01" defaultValue={product.price} required className={inputClass} />
            </label>
            <label>
              <span className="text-sm font-medium">Category</span>
              <input name="category" defaultValue={product.category} required className={inputClass} />
            </label>
            <label>
              <span className="text-sm font-medium">Condition</span>
              <select name="condition" defaultValue={product.condition} required className={inputClass}>
                <option>Excellent</option>
                <option>Very Good</option>
                <option>Good</option>
                <option>Fair</option>
              </select>
            </label>
            <label>
              <span className="text-sm font-medium">Seller name</span>
              <input name="seller" defaultValue={product.seller} required className={inputClass} />
            </label>
            <label className="sm:col-span-2">
              <span className="text-sm font-medium">Location</span>
              <input name="location" defaultValue={product.location} required className={inputClass} />
            </label>
            <label className="sm:col-span-2">
              <span className="text-sm font-medium">Image URL</span>
              <input name="image" type="url" defaultValue={product.image} required className={inputClass} />
            </label>
            <label className="sm:col-span-2">
              <span className="text-sm font-medium">Description</span>
              <textarea name="description" defaultValue={product.description} required rows={5} className={inputClass} />
            </label>
          </section>

          <fieldset className="border-t border-border pt-8">
            <legend className="font-serif text-xl font-semibold">Item details</legend>
            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              <label><span className="text-sm font-medium">Material</span><input name="material" defaultValue={product.details?.material} className={inputClass} /></label>
              <label><span className="text-sm font-medium">Dimensions</span><input name="dimensions" defaultValue={product.details?.dimensions} className={inputClass} /></label>
              <label><span className="text-sm font-medium">Era</span><input name="era" defaultValue={product.details?.era} className={inputClass} /></label>
            </div>
          </fieldset>

          <div className="flex justify-end gap-3 border-t border-border pt-6">
            <button type="button" onClick={() => router.back()} className="px-5 py-2.5 text-muted hover:text-foreground">Cancel</button>
            <button type="submit" disabled={submitting} className="rounded-md bg-primary px-6 py-2.5 font-medium text-white hover:bg-primary-hover disabled:opacity-50">
              {submitting ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
