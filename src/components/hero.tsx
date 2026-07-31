import Image from "next/image";

export default function Hero() {
  return (
    <section className="mx-auto flex max-w-7xl gap-20 px-8 py-16">
      <div className="flex-1">
        <p className="mb-4 text-xs uppercase tracking-widest text-muted-2">
          New Vintage Collection
        </p>
        <h2 className="mb-6 text-6xl font-bold leading-tight text-foreground">
          Discover beauty in
          <br />
          the pre-loved.
        </h2>
        <p className="mb-10 max-w-lg text-muted">
          Join a community buying and selling curated second-hand treasures.
        </p>

        <div className="flex gap-4">
          <button className="rounded-full border border-border bg-surface px-6 py-3 text-foreground transition hover:bg-surface-2">
            Browse Collection
          </button>
          <button className="rounded-full bg-primary px-6 py-3 text-white transition hover:bg-primary-hover">
            Sell Your Item
          </button>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-4">
        <Image
          src="/images/chair.jpg"
          width={300}
          height={420}
          alt=""
          className="rounded-xl object-cover"
        />
        <Image
          src="/images/room.jpg"
          width={300}
          height={420}
          alt=""
          className="rounded-xl object-cover"
        />
      </div>
    </section>
  );
}