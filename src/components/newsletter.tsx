export default function Newsletter() {
  return (
    <section className="border-y border-border bg-surface py-16 text-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8">
        <div>
          <h2 className="text-3xl font-bold">The Heritage Report</h2>
          <p className="mt-2 text-muted">Weekly updates from the marketplace.</p>
        </div>

        <div className="flex gap-3">
          <input
            type="email"
            placeholder="Email Address"
            className="rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted outline-none focus:border-primary"
          />
          <button className="rounded-lg bg-primary px-6 py-3 text-white transition hover:bg-primary-hover">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}