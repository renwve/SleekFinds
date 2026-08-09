"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  function handleSearch(event: FormEvent) {
    event.preventDefault();
    const query = search.trim();
    if (!query) {
      router.push("/sells");
      return;
    }
    router.push(`/sells?search=${encodeURIComponent(query)}`);
  }

  const isSavedPage = pathname === "/saved";
  const isProfilePage = pathname === "/profile";
  const isCartPage = pathname === "/cart";

  return (
    <nav className="border-b border-border bg-surface">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-8 px-6">
        <Link href="/" className="shrink-0 font-serif text-2xl font-semibold tracking-tight text-primary">
          SleekFinds
        </Link>
        <div className="hidden items-center gap-8 text-sm text-muted md:flex">
          <Link href="/" className="transition hover:text-foreground">
            Curated
          </Link>
          <Link href="/sells" className="transition hover:text-foreground">
            Sale
          </Link>
        </div>
        <form onSubmit={handleSearch} className="ml-auto hidden w-full max-w-xs md:block">
          <div className="flex items-center rounded-md border border-border bg-background px-3">
            <Search size={17} className="shrink-0 text-muted" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search finds..."
              className="w-full bg-transparent px-3 py-2 font-serif text-sm text-foreground outline-none placeholder:text-muted"
            />
          </div>
        </form>
        <div className="flex shrink-0 items-center gap-5 text-muted">
          <button
            type="button"
            aria-label="Search"
            onClick={() => router.push("/sells")}
            className="transition hover:text-foreground md:hidden"
          >
            <Search size={19} />
          </button>
          <Link
            href="/saved"
            aria-label="Saved items"
            className={`transition hover:text-foreground ${isSavedPage ? "text-primary" : ""}`}
          >
            <Heart size={19} fill={isSavedPage ? "currentColor" : "none"} />
          </Link>
          <Link
            href="/cart"
            aria-label="Shopping bag"
            className={`transition hover:text-foreground ${isCartPage ? "text-primary" : ""}`}
          >
            <ShoppingBag size={19} />
          </Link>
          <Link
            href="/profile"
            aria-label="Profile"
            className={`transition hover:text-foreground ${isProfilePage ? "text-primary" : ""}`}
          >
            <User size={19} fill={isProfilePage ? "currentColor" : "none"} />
          </Link>
        </div>
      </div>
    </nav>
  );
}