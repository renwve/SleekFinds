import Hero from "@/components/hero";
import Filters from "@/components/filters";
import ProductGrid from "@/components/productgrid";
import Newsletter from "@/components/newsletter";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <section className="mx-auto flex max-w-7xl gap-10 px-6 py-12 lg:px-8">
        <div className="hidden lg:block">
          <Filters />
        </div>
        <div className="flex-1">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs font-serif uppercase tracking-wide text-muted">
                Curated Marketplace
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold">
                Timeless pieces worth collecting
              </h2>
            </div>
          </div>
          <ProductGrid />
        </div>
      </section>
      <Newsletter />
    </main>
  );
}