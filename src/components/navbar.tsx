"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = search.trim();

    if (!query) {
      router.push("/sells");
      return;
    }

    router.push(`/sells?search=${encodeURIComponent(query)}`);
  }

  return (
    <nav className="border-b border-border bg-background text-foreground">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-xl font-bold tracking-tight"
        >
          SleekFinds
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 text-sm text-muted md:flex">
          <Link
            href="/"
            className="transition hover:text-foreground"
          >
            Curated
          </Link>

          <Link
            href="/heritage"
            className="transition hover:text-foreground"
          >
            Heritage
          </Link>

          <Link
            href="/sells"
            className="transition hover:text-foreground"
          >
            Sale
          </Link>
        </div>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="ml-auto hidden w-full max-w-xs md:block"
        >
          <div className="flex items-center rounded-md border border-border bg-surface px-3">
            <Search
              size={17}
              className="shrink-0 text-muted"
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search finds..."
              className="w-full bg-transparent px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted"
            />
          </div>
        </form>

        {/* Icons */}
        <div className="flex shrink-0 items-center gap-5 text-muted">
          <button
            type="button"
            aria-label="Search"
            onClick={() => router.push("/sells")}
            className="transition hover:text-foreground md:hidden"
          >
            <Search size={18} />
          </button>

          <Link
            href="/"
            aria-label="Wishlist"
            className="transition hover:text-foreground"
          >
            <Heart size={18} />
          </Link>

          <Link
            href="/cart"
            aria-label="Shopping bag"
            className="transition hover:text-foreground"
          >
            <ShoppingBag size={18} />
          </Link>

          <Link
            href="/"
            aria-label="Account"
            className="transition hover:text-foreground"
          >
            <User size={18} />
          </Link>
        </div>
      </div>
    </nav>
  );
}