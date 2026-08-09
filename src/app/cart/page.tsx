"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
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
    <main className="min-h-screen">
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <p className="font-serif text-xs uppercase tracking-[0.2em] text-muted-2">
            Shopping Bag
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold">Your Selection</h1>
          <p className="mt-2 font-serif text-sm text-muted">
            Review your selected pieces before checkout.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          <div>
            {cartItems.length === 0 ? (
              <div className="rounded-lg border border-border bg-surface p-12 text-center">
                <ShoppingBag size={36} className="mx-auto text-muted" />
                <h2 className="mt-5 font-serif text-xl font-semibold">
                  Your selection is empty
                </h2>
                <p className="mt-2 font-serif text-sm text-muted">
                  Find something you love and add it to your selection.
                </p>
                <Link
                  href="/"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-serif text-sm font-medium text-white hover:bg-primary-hover"
                >
                  Browse Collection
                  <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-5 rounded-lg border border-border bg-surface p-4"
                  >
                    <Link
                      href={`/products/${item.product.id}`}
                      className="relative h-28 w-28 shrink-0 overflow-hidden rounded-md bg-surface-secondary"
                    >
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div className="flex justify-between gap-4">
                        <div>
                          <p className="font-serif text-xs uppercase tracking-wide text-muted">
                            {item.product.category}
                          </p>
                          <Link
                            href={`/products/${item.product.id}`}
                            className="mt-1 block font-serif font-semibold hover:underline"
                          >
                            {item.product.name}
                          </Link>
                          <p className="mt-1 font-serif text-xs text-muted">
                            {item.product.condition} condition
                          </p>
                        </div>
                        <p className="font-serif font-semibold">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center rounded-md border border-border">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item.product.id)}
                            className="p-2 hover:bg-surface-secondary"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="min-w-8 text-center font-serif text-sm">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => increaseQuantity(item.product.id)}
                            className="p-2 hover:bg-surface-secondary"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          className="flex items-center gap-1 font-serif text-xs text-muted hover:text-foreground"
                        >
                          <Trash2 size={14} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <aside className="h-fit rounded-lg border border-border bg-surface p-6">
            <h2 className="font-serif text-lg font-semibold">Order Summary</h2>
            <div className="mt-6 space-y-4 font-serif text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Shipping</span>
                <span>{shipping === 0 ? "Complimentary" : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Delivery</span>
                <span>3–7 days</span>
              </div>
            </div>
            <div className="my-6 border-t border-border" />
            <div className="flex items-center justify-between">
              <span className="font-serif font-semibold">Total</span>
              <span className="font-serif text-xl font-bold">
                ${total.toLocaleString()}
              </span>
            </div>
            <button
              type="button"
              disabled={cartItems.length === 0}
              onClick={() => {
                alert("Checkout will be connected to your payment system here.");
              }}
              className="mt-6 w-full rounded-lg bg-primary py-3 font-serif font-medium text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
              Proceed to Checkout
            </button>
            <p className="mt-4 text-center font-serif text-xs leading-5 text-muted">
              Secure checkout. Payment and shipping information will be collected during
              checkout.
            </p>
          </aside>
        </div>
        <section className="mt-16 border-t border-border pt-10">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-serif text-2xl font-bold">Saved Items</h2>
              <p className="mt-1 font-serif text-sm text-muted">
                Pieces you've saved for later.
              </p>
            </div>
            {savedItems.length > 0 && (
              <span className="font-serif text-xs text-muted">
                {savedItems.length} saved
              </span>
            )}
          </div>
          {savedItems.length === 0 ? (
            <div className="mt-6 rounded-lg border border-border bg-surface p-8 text-center">
              <p className="font-serif text-sm text-muted">
                You don't have any saved items yet.
              </p>
              <Link href="/" className="mt-4 inline-block font-serif text-sm font-medium underline">
                Browse products
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {savedItems.map((product) => (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-lg border border-border bg-surface"
                >
                  <Link
                    href={`/products/${product.id}`}
                    className="relative block aspect-square overflow-hidden bg-surface-secondary"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition duration-300 hover:scale-105"
                    />
                  </Link>
                  <div className="p-3">
                    <p className="font-serif text-xs text-muted">{product.category}</p>
                    <Link
                      href={`/products/${product.id}`}
                      className="mt-1 block font-serif text-sm font-medium"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 font-serif text-sm font-semibold">
                      ${product.price.toLocaleString()}
                    </p>
                    <button
                      type="button"
                      onClick={() => moveSavedToCart(product)}
                      className="mt-3 w-full rounded-md border border-border py-2 font-serif text-xs font-medium hover:bg-surface-secondary"
                    >
                      Move to Cart
                    </button>
                    <button
                      type="button"
                      onClick={() => removeSavedItem(product.id)}
                      className="mt-2 w-full font-serif text-xs text-muted hover:text-foreground"
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