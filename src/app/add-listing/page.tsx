"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ImagePlus } from "lucide-react";

export default function AddListingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "", 
    description: "",
    price: "",
    category: "Furniture",
    condition: "Excellent",
    location: "Calgary, AB", // Added location state
    imageUrl: "",
  });
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Fallback placeholder image if none provided to satisfy the required 'image' schema field
    const defaultImage =
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800";
    const imageToSubmit = formData.imageUrl.trim() || defaultImage;

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          name: formData.title,
          description: formData.description,
          price: Number(formData.price),
          category: formData.category,
          condition: formData.condition,
          location: formData.location || "Calgary, AB", // Satisfies 'location'
          seller: "Member Seller",                     // Satisfies 'seller'
          image: imageToSubmit,                        // Satisfies 'image'
          imageUrl: imageToSubmit,
        }),
      });

      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.error || "Failed to create listing");
      }

      // Redirect back to profile page on success
      router.push("/profile");
      router.refresh(); 
      
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Make sure you are logged in."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background px-6 py-12 text-foreground">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/profile"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition hover:text-foreground"
        >
          <ArrowLeft size={16} /> Back to Profile
        </Link>

        <h1 className="mb-2 font-serif text-3xl font-bold">Add New Listing</h1>
        <p className="mb-8 text-sm text-muted">
          List a curated piece from your collection to sell on SleekFinds.
        </p>

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium">Item Title *</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Mid-Century Modern Leather Lounge Chair"
              className="w-full rounded-lg border border-border bg-surface p-3 text-sm outline-none focus:border-primary"
            />
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-surface p-3 text-sm outline-none focus:border-primary"
              >
                <option value="Furniture">Furniture</option>
                <option value="Lighting">Lighting</option>
                <option value="Art & Decor">Art & Decor</option>
                <option value="Apparel">Apparel</option>
                <option value="Watches & Jewelry">Watches & Jewelry</option>
                <option value="Collectibles">Collectibles</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Price ($) *</label>
              <input
                type="number"
                name="price"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="450.00"
                className="w-full rounded-lg border border-border bg-surface p-3 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Location & Condition */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Condition *</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-surface p-3 text-sm outline-none focus:border-primary"
              >
                <option value="Mint / New">Mint / New</option>
                <option value="Excellent">Excellent</option>
                <option value="Very Good">Very Good</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Location *</label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Calgary, AB"
                className="w-full rounded-lg border border-border bg-surface p-3 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="mb-2 block text-sm font-medium">Image URL</label>
            <div className="relative">
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full rounded-lg border border-border bg-surface p-3 pl-10 text-sm outline-none focus:border-primary"
              />
              <ImagePlus
                size={16}
                className="absolute left-3 top-3.5 text-muted"
              />
            </div>
            <p className="mt-1 text-[11px] text-muted">
              Leave blank to auto-use a luxury interior placeholder image.
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium">Description *</label>
            <textarea
              name="description"
              required
              rows={5}
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide context, materials, and overall condition details..."
              className="w-full rounded-lg border border-border bg-surface p-3 text-sm outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary py-4 font-medium text-white transition hover:bg-opacity-90 disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish Listing"}
          </button>
        </form>
      </div>
    </main>
  );
}