import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";

import { products } from "@/data/products";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const product = products.find(
    (item) => item.id === id
  );

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 py-5">
        <div className="flex items-center gap-2 text-sm text-muted">
          <Link
            href="/"
            className="hover:text-foreground"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href="/"
            className="hover:text-foreground"
          >
            {product.category}
          </Link>

          <span>/</span>

          <span className="text-foreground">
            {product.name}
          </span>
        </div>
      </div>

      {/* Product */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* LEFT - Gallery */}
          <div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface-secondary">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Gallery */}
            <div className="mt-3 grid grid-cols-4 gap-3">
              {product.gallery.map(
                (image, index) => (
                  <div
                    key={image}
                    className={`relative aspect-square overflow-hidden rounded-md border ${
                      index === 0
                        ? "border-foreground"
                        : "border-border"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )
              )}
            </div>
          </div>

          {/* RIGHT - Product Information */}
          <div className="flex flex-col">
            <div>
              <p className="text-sm text-muted">
                {product.category}
              </p>

              <h1 className="mt-2 text-4xl font-bold leading-tight">
                {product.name}
              </h1>

              <p className="mt-2 text-2xl font-semibold">
                ${product.price.toLocaleString()}
              </p>

              {/* Condition */}
              <div className="mt-4">
                <span className="rounded-full bg-surface-secondary px-3 py-1 text-xs font-medium">
                  {product.condition} Condition
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8 border-t border-border pt-8">
              <h2 className="font-semibold">
                Description
              </h2>

              <p className="mt-3 text-sm leading-7 text-muted">
                {product.description}
              </p>
            </div>

            {/* Details */}
            <div className="mt-8 border-t border-border pt-8">
              <h2 className="font-semibold">
                Details
              </h2>

              <div className="mt-4 grid grid-cols-2 gap-y-5 text-sm">
                <div>
                  <p className="text-muted">
                    Material
                  </p>

                  <p className="mt-1">
                    {product.details.material}
                  </p>
                </div>

                <div>
                  <p className="text-muted">
                    Era
                  </p>

                  <p className="mt-1">
                    {product.details.era}
                  </p>
                </div>

                <div>
                  <p className="text-muted">
                    Dimensions
                  </p>

                  <p className="mt-1">
                    {product.details.dimensions}
                  </p>
                </div>

                <div>
                  <p className="text-muted">
                    Location
                  </p>

                  <p className="mt-1">
                    {product.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-4 font-medium text-white transition hover:bg-primary-hover"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface py-4 font-medium text-foreground transition hover:bg-surface-secondary"
              >
                <Heart size={18} />
                Save to Wishlist
              </button>
            </div>

            {/* Seller */}
            <div className="mt-8 rounded-lg border border-border bg-surface p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted">
                    Sold by
                  </p>

                  <p className="mt-1 font-semibold">
                    {product.seller}
                  </p>

                  <p className="mt-1 text-xs text-muted">
                    {product.location}
                  </p>
                </div>

                <button
                  type="button"
                  className="flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm"
                >
                  <MessageCircle size={16} />
                  Message Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended */}
      <section className="border-t border-border bg-surface-secondary py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                You May Also Appreciate
              </h2>

              <p className="mt-1 text-sm text-muted">
                More carefully selected pieces.
              </p>
            </div>

            <Link
              href="/"
              className="text-sm text-muted hover:text-foreground"
            >
              View Collection
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {products
              .filter(
                (item) => item.id !== product.id
              )
              .slice(0, 4)
              .map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.id}`}
                  className="group"
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-surface">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <p className="mt-3 text-xs text-muted">
                    {item.category}
                  </p>

                  <h3 className="mt-1 text-sm font-medium">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm">
                    ${item.price.toLocaleString()}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}