"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";

interface ProductSummary {
  _id: string;
  name: string;
  category: string;
  condition: string;
  price: number;
}

export default function AdminListingsPage() {
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/products")
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Failed to load listings");
        return result.data as ProductSummary[];
      })
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch((caughtError: unknown) => {
        if (!cancelled) {
          setError(caughtError instanceof Error ? caughtError.message : "Failed to load listings");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function deleteProduct(product: ProductSummary) {
    const confirmed = window.confirm(`Delete "${product.name}"? This cannot be undone.`);
    if (!confirmed) return;

    try {
      setDeletingId(product._id);
      setError("");
      const response = await fetch(`/api/products/${product._id}`, { method: "DELETE" });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete listing");
      }

      setProducts((current) => current.filter((item) => item._id !== product._id));
    } catch (caughtError: unknown) {
      setError(caughtError instanceof Error ? caughtError.message : "Failed to delete listing");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-background px-6 py-12 text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-border pb-6">
          <div>
            <p className="text-sm text-muted">Administration</p>
            <h1 className="mt-2 font-serif text-4xl font-semibold">Listings</h1>
          </div>
          <Link href="/products/new" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 font-medium text-white hover:bg-primary-hover">
            <Plus size={18} /> New listing
          </Link>
        </div>

        {error && <div role="alert" className="mt-6 border border-red-500/30 bg-red-500/10 p-4 text-red-700">{error}</div>}

        {loading ? (
          <p className="py-16 text-center text-muted">Loading listings...</p>
        ) : products.length === 0 ? (
          <div className="py-16 text-center">
            <h2 className="font-serif text-2xl font-semibold">No listings yet</h2>
            <p className="mt-2 text-muted">Create the first product listing.</p>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto border-y border-border">
            <table className="w-full min-w-3xl text-left">
              <thead className="bg-surface text-sm text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Condition</th>
                  <th className="px-4 py-3 text-right font-medium">Price</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="px-4 py-4 font-medium">{product.name}</td>
                    <td className="px-4 py-4 text-muted">{product.category}</td>
                    <td className="px-4 py-4 text-muted">{product.condition}</td>
                    <td className="px-4 py-4 text-right">${product.price.toLocaleString()}</td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <Link href={`/products/edit/${product._id}`} aria-label={`Edit ${product.name}`} title="Edit listing" className="rounded-md border border-border p-2 hover:bg-surface">
                          <Pencil size={17} />
                        </Link>
                        <button type="button" onClick={() => deleteProduct(product)} disabled={deletingId === product._id} aria-label={`Delete ${product.name}`} title="Delete listing" className="rounded-md border border-red-500/30 p-2 text-red-700 hover:bg-red-500/10 disabled:opacity-50">
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
