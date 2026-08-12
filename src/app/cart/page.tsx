"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Heart,
} from "lucide-react";

import { useCart } from "@/context/cartcontext";

export default function CartPage() {
  const {
    cartItems,
    savedItems,
    subtotal,
    total,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    moveSavedToCart,
    removeSavedItem,
  } = useCart();

  const shipping = 0;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* HEADER */}
        <div className="mb-12 border-b border-border pb-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted">
            Your Collection
          </p>

          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight">
            Shopping Bag
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            Review the pieces you've selected before continuing
            to checkout.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* CART */}
          <div>
            {cartItems.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-surface px-6 py-20 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface-secondary">
                  <ShoppingBag
                    size={28}
                    className="text-muted"
                    strokeWidth={1.5}
                  />
                </div>

                <h2 className="mt-6 font-serif text-2xl font-semibold">
                  Your bag is empty
                </h2>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted">
                  Discover something exceptional and add it
                  to your collection.
                </p>

                <Link
                  href="/"
                  className="mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition hover:bg-primary-hover"
                >
                  Browse Collection
                  <ArrowRight size={15} />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="group flex gap-5 rounded-xl border border-border bg-surface p-4 transition hover:shadow-md"
                  >
                    {/* IMAGE */}
                    <Link
                      href={`/products/${item.product.id}`}
                      className="relative h-32 w-28 shrink-0 overflow-hidden rounded-lg bg-surface-secondary sm:h-36 sm:w-32"
                    >
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        unoptimized
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    </Link>

                    {/* INFORMATION */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                      <div className="flex justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase tracking-[0.15em] text-muted">
                            {item.product.category}
                          </p>

                          <Link
                            href={`/products/${item.product.id}`}
                            className="mt-1 block truncate font-serif text-base font-semibold hover:underline"
                          >
                            {item.product.name}
                          </Link>

                          <p className="mt-1 text-xs text-muted">
                            {item.product.condition} condition
                          </p>
                        </div>

                        <p className="shrink-0 font-serif font-semibold">
                          $
                          {(
                            item.product.price *
                            item.quantity
                          ).toLocaleString()}
                        </p>
                      </div>

                      <div className="mt-5 flex items-center justify-between">
                        {/* QUANTITY */}
                        <div className="flex items-center overflow-hidden rounded-lg border border-border">
                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(
                                item.product.id
                              )
                            }
                            className="p-2.5 transition hover:bg-surface-secondary"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>

                          <span className="min-w-9 text-center text-sm">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(
                                item.product.id
                              )
                            }
                            className="p-2.5 transition hover:bg-surface-secondary"
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        {/* REMOVE */}
                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(
                              item.product.id
                            )
                          }
                          className="flex items-center gap-1.5 text-xs text-muted transition hover:text-red-500"
                        >
                          <Trash2 size={13} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SUMMARY */}
          <aside className="h-fit rounded-xl border border-border bg-surface p-7 lg:sticky lg:top-24">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
              Summary
            </p>

            <h2 className="mt-2 font-serif text-xl font-semibold">
              Order Summary
            </h2>

            <div className="mt-7 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">
                  Subtotal
                </span>

                <span>
                  ${subtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted">
                  Shipping
                </span>

                <span>
                  {shipping === 0
                    ? "Complimentary"
                    : `$${shipping}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted">
                  Estimated delivery
                </span>

                <span>3–7 days</span>
              </div>
            </div>

            <div className="my-7 border-t border-border" />

            <div className="flex items-center justify-between">
              <span className="font-serif font-semibold">
                Total
              </span>

              <span className="font-serif text-2xl font-bold">
                ${total.toLocaleString()}
              </span>
            </div>

            <button
              type="button"
              disabled={cartItems.length === 0}
              onClick={() => {
                alert(
                  "Checkout will be connected to your payment system here."
                );
              }}
              className="mt-7 w-full rounded-lg bg-primary py-3.5 text-sm font-medium text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
              Proceed to Checkout
            </button>

            <p className="mt-4 text-center text-[11px] leading-5 text-muted">
              Secure checkout. Payment and shipping
              information will be collected during checkout.
            </p>
          </aside>
        </div>

        {/* SAVED ITEMS */}
        <section className="mt-20 border-t border-border pt-12">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Heart size={17} strokeWidth={1.5} />

                <h2 className="font-serif text-2xl font-semibold">
                  Saved Items
                </h2>
              </div>

              <p className="mt-2 text-sm text-muted">
                Pieces you've saved for later.
              </p>
            </div>

            {savedItems.length > 0 && (
              <span className="text-xs text-muted">
                {savedItems.length} saved
              </span>
            )}
          </div>

          {savedItems.length === 0 ? (
            <div className="mt-7 rounded-xl border border-dashed border-border bg-surface px-6 py-12 text-center">
              <Heart
                size={25}
                className="mx-auto text-muted"
                strokeWidth={1.5}
              />

              <p className="mt-4 font-serif text-base font-medium">
                Nothing saved yet
              </p>

              <p className="mt-2 text-sm text-muted">
                Tap the heart on any piece you want to
                keep an eye on.
              </p>

              <Link
                href="/"
                className="mt-5 inline-block text-sm font-medium underline underline-offset-4"
              >
                Browse products
              </Link>
            </div>
          ) : (
            <div className="mt-7 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {savedItems.map((product) => (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-xl border border-border bg-surface"
                >
                  <Link
                    href={`/products/${product.id}`}
                    className="relative block aspect-[4/5] overflow-hidden bg-surface-secondary"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      unoptimized
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  </Link>

                  <div className="p-4">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-muted">
                      {product.category}
                    </p>

                    <Link
                      href={`/products/${product.id}`}
                      className="mt-2 block font-serif text-sm font-semibold"
                    >
                      {product.name}
                    </Link>

                    <p className="mt-2 font-serif text-sm font-semibold">
                      ${product.price.toLocaleString()}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        moveSavedToCart(product)
                      }
                      className="mt-4 w-full rounded-lg bg-primary py-2.5 text-xs font-medium text-white transition hover:bg-primary-hover"
                    >
                      Move to Cart
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        removeSavedItem(product.id)
                      }
                      className="mt-3 w-full text-xs text-muted transition hover:text-foreground"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}