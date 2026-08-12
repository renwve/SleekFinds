"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Heart,
  ShoppingBag,
  MessageSquare,
  User,
  LogOut,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState("");
  const [user, setUser] = useState<{
    email: string;
    name?: string;
  } | null>(null);

  // Check login state
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("sleekfinds_user");

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, [pathname]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = search.trim();

    if (!query) {
      router.push("/sells");
      return;
    }

    router.push(`/sells?search=${encodeURIComponent(query)}`);
  }

  const handleSignOut = () => {
    localStorage.removeItem("sleekfinds_user");
    setUser(null);
    router.push("/login");
  };

  const isSavedPage = pathname === "/saved";
  const isProfilePage = pathname === "/profile";
  const isCartPage = pathname === "/cart";

  return (
    <nav className="border-b border-border bg-surface">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-8 px-6">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 font-serif text-2xl font-semibold tracking-tight text-primary"
        >
          SleekFinds
        </Link>

        {/* Main Navigation */}
        <div className="hidden items-center gap-8 text-sm text-muted md:flex">
          <Link
            href="/"
            className="transition hover:text-foreground"
          >
            Curated
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
          <div className="flex items-center rounded-md border border-border bg-background px-3 transition focus-within:border-primary">
            <Search
              size={17}
              className="shrink-0 text-muted"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search finds..."
              aria-label="Search finds"
              className="w-full bg-transparent px-3 py-2 font-serif text-sm text-foreground outline-none placeholder:text-muted"
            />
          </div>
        </form>

        {/* Right Navigation */}
        <div className="flex shrink-0 items-center gap-5 text-muted">
          {/* Mobile Search */}
          <button
            type="button"
            aria-label="Search"
            onClick={() => router.push("/sells")}
            className="transition hover:text-foreground md:hidden"
          >
            <Search size={19} />
          </button>

          {/* Saved */}
          <Link
            href="/saved"
            aria-label="Saved items"
            className={`transition hover:text-foreground ${
              isSavedPage ? "text-primary" : ""
            }`}
          >
            <Heart
              size={19}
              fill={isSavedPage ? "currentColor" : "none"}
            />
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            aria-label="Shopping bag"
            className={`transition hover:text-foreground ${
              isCartPage ? "text-primary" : ""
            }`}
          >
            <ShoppingBag size={19} />
          </Link>

          {/* Messages */}
          <Link
            href="/messages"
            className="flex items-center gap-1.5 text-sm font-medium text-foreground transition hover:text-primary"
          >
            <MessageSquare size={18} />
            <span>Messages</span>
          </Link>

          {/* User */}
          {user ? (
            <div className="flex items-center gap-3 border-l border-border pl-4">
              <Link
                href="/profile"
                aria-label="Profile"
                className={`flex items-center gap-2 transition hover:text-foreground ${
                  isProfilePage ? "text-primary" : ""
                }`}
              >
                <User
                  size={19}
                  fill={isProfilePage ? "currentColor" : "none"}
                />

                <span className="hidden font-serif text-xs font-medium md:inline">
                  {user.name || user.email.split("@")[0]}
                </span>
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                title="Sign Out"
                aria-label="Sign Out"
                className="text-muted transition hover:text-red-500"
              >
                <LogOut size={17} />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded bg-primary px-3 py-1.5 font-serif text-xs font-medium text-white transition hover:bg-primary-hover"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}