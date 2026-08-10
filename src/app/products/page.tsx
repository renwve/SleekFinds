import ProductCatalog from "@/components/productCatalog";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <p className="text-sm text-muted">Curated marketplace</p>
          <h1 className="mt-2 font-serif text-4xl font-semibold">Browse products</h1>
        </div>
      </header>

      <ProductCatalog />
    </main>
  );
}
