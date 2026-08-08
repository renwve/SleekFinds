import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Leaf,
  Gem,
  Clock3,
} from "lucide-react";

export default function HeritagePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">

      <section className="relative min-h-[560px] overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/heritage-hero.jpg"
          alt="Craftsman restoring a vintage piece"
          fill
          priority
          className="object-cover"
        />

        {/* Light overlay */}
        <div className="absolute inset-0 bg-background/55" />

        {/* Hero Content */}
        <div className="relative z-10 flex min-h-[560px] items-center justify-center px-6 text-center">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-muted">
              The SleekFinds Journal
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              The Future of Heritage
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted sm:text-base">
              We believe the most meaningful objects are not the ones
              that are made to be replaced. They are the ones that
              carry stories, craftsmanship, and character from one
              generation to the next.
            </p>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted">
              SleekFinds brings these pieces back into circulation,
              giving exceptional pre-loved objects another chapter.
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-white transition hover:bg-primary-hover"
            >
              Explore Our Collection
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-muted">
            What We Believe
          </p>

          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            Our Philosophy
          </h2>

          <div className="mx-auto mt-4 h-px w-12 bg-border" />
        </div>

        {/* Philosophy Grid */}
        <div className="grid gap-6 lg:grid-cols-[1.6fr_0.7fr]">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">
            {/* Authenticity */}
            <article className="relative min-h-[300px] overflow-hidden rounded-lg border border-border">
              <Image
                src="/images/heritage-watch.jpg"
                alt="Vintage mechanical watch"
                fill
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/35" />

              <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                <Gem
                  size={20}
                  strokeWidth={1.5}
                />

                <h3 className="mt-3 text-xl font-semibold">
                  Authenticity
                </h3>

                <p className="mt-2 max-w-lg text-sm leading-6 text-white/85">
                  Every piece has a story. We value genuine
                  craftsmanship, distinctive character, and
                  objects that have stood the test of time.
                </p>
              </div>
            </article>

            {/* Consciousness */}
            <article className="rounded-lg border border-border bg-surface p-7">
              <Leaf
                size={20}
                strokeWidth={1.5}
                className="text-primary"
              />

              <h3 className="mt-4 text-xl font-semibold">
                Consciousness
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
                The way we consume matters. By extending the
                lifespan of pre-loved pieces, we help reduce
                unnecessary production while keeping beautiful
                objects in circulation.
              </p>
            </article>
          </div>

          {/* RIGHT COLUMN */}
          <article className="relative min-h-[540px] overflow-hidden rounded-lg border border-border">
            <Image
              src="/images/heritage-craft.jpg"
              alt="Vintage leather craftsmanship"
              fill
              className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute inset-x-0 bottom-0 p-7 text-white">
              <Clock3
                size={20}
                strokeWidth={1.5}
              />

              <h3 className="mt-3 text-xl font-semibold">
                Longevity
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/85">
                Quality should never be disposable. We seek
                pieces created with materials and techniques
                that allow them to remain relevant for years
                to come.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="border-y border-border bg-surface-secondary">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center lg:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Preserve. Reuse. Rediscover.
          </p>

          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
            Objects with a past deserve a future.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted">
            From vintage watches to carefully made leather goods,
            every piece on SleekFinds is an opportunity to keep
            craftsmanship alive.
          </p>

          <Link
            href="/"
            className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4 transition hover:text-muted"
          >
            Discover the collection
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}