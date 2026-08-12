import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { products } from "@/data/products";
import ProductActions from "../../../components/productActions";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-wrap items-center gap-2 font-serif text-sm text-muted">
          <Link href="/" className="transition hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/sells" className="transition hover:text-foreground">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
        <Link
          href="/sells"
          className="mb-8 inline-flex items-center gap-2 font-serif text-sm text-muted transition hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Back to Finds
        </Link>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            {product.gallery.map((image, index) => (
              <div
                key={image}
                className={`relative aspect-square overflow-hidden rounded-md border ${
                  index === 0 ? "border-foreground" : "border-border"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <p className="font-serif text-xs uppercase tracking-[0.2em] text-muted-2">
              {product.category}
            </p>
            <h1 className="mt-2 font-serif text-4xl font-semibold text-foreground">
              {product.name}
            </h1>
            <p className="mt-4 font-serif text-2xl font-semibold text-primary">
              ${product.price.toLocaleString()}
            </p>
            <div className="mt-4 inline-flex rounded-full border border-border px-3 py-1 font-serif text-xs text-muted">
              {product.condition} Condition
            </div>
            <div className="mt-10">
              <h2 className="font-serif text-xl font-semibold">Description</h2>
              <p className="mt-3 font-serif text-sm leading-7 text-muted">
                {product.description}
              </p>
            </div>
            <div className="mt-10">
              <h2 className="font-serif text-xl font-semibold">Details</h2>
              <div className="mt-4 divide-y divide-border border-y border-border">
                <div className="flex justify-between gap-6 py-4 font-serif text-sm">
                  <span className="text-muted">Material</span>
                  <span className="text-right">{product.details.material}</span>
                </div>
                <div className="flex justify-between gap-6 py-4 font-serif text-sm">
                  <span className="text-muted">Era</span>
                  <span className="text-right">{product.details.era}</span>
                </div>
                <div className="flex justify-between gap-6 py-4 font-serif text-sm">
                  <span className="text-muted">Dimensions</span>
                  <span className="text-right">{product.details.dimensions}</span>
                </div>
                <div className="flex justify-between gap-6 py-4 font-serif text-sm">
                  <span className="text-muted">Location</span>
                  <span className="text-right">{product.location}</span>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <ProductActions product={product} />
            </div>
            <div className="mt-10 rounded-lg border border-border bg-surface p-5">
              <p className="font-serif text-xs uppercase tracking-[0.15em] text-muted-2">
                Sold by
              </p>
              <div className="mt-3 flex items-center justify-between gap-4">
                <div>
                  <p className="font-serif font-semibold">{product.seller}</p>
                  <p className="mt-1 font-serif text-sm text-muted">{product.location}</p>
                </div>
                <Link
                  href={`/messages?seller=${encodeURIComponent(product.seller)}&item=${encodeURIComponent(product.name)}&id=${product.id}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 font-serif text-sm font-medium transition hover:bg-surface-secondary"
                >
                  <MessageCircle size={16} />
                  Message Seller
                </Link>
              </div>
            </div>
          </div>
        </div>
        <section className="mt-24 border-t border-border pt-12">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-serif text-3xl font-semibold">
                You May Also Appreciate
              </h2>
              <p className="mt-2 font-serif text-sm text-muted">
                More carefully selected pieces.
              </p>
            </div>
            <Link href="/sells" className="hidden font-serif text-sm font-medium underline sm:block">
              View Collection
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
            {products
              .filter((item) => item.id !== product.id)
              .slice(0, 4)
              .map((item) => (
                <Link key={item.id} href={`/products/${item.id}`} className="group">
                  <div className="relative aspect-square overflow-hidden rounded-md bg-surface-secondary">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-3">
                    <p className="font-serif text-[10px] uppercase tracking-wider text-muted-2">
                      {item.category}
                    </p>
                    <h3 className="mt-1 font-serif text-lg font-semibold">{item.name}</h3>
                    <p className="mt-1 font-serif text-sm font-semibold text-primary">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </section>
    </main>
  );
}