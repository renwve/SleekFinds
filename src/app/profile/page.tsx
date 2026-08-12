"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Pencil,
  Eye,
  MoreHorizontal,
  ArrowRight,
  Plus,
} from "lucide-react";

interface Listing {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  imageUrl?: string;
  views?: number;
}

interface UserProfile {
  name: string;
  email: string;
  bio?: string;
  memberSince?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/me");

        if (response.ok) {
          const data = await response.json();
          setUser(data.user || data);
        }
      } catch (error) {
        console.error("Failed to load authenticated user:", error);
      }
    };

    const fetchUserListings = async () => {
      try {
        const response = await fetch("/api/products");

        if (response.ok) {
          const data = await response.json();

          const productsArray = Array.isArray(data)
            ? data
            : data.products || data.listings || data.data || [];

          setListings(productsArray);
        }
      } catch (error) {
        console.error("Failed to load listings from MongoDB:", error);
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchUserListings();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        {/* Profile Header */}
        <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
          <div className="h-32 bg-surface-2 sm:h-40" />

          <div className="px-6 pb-7 sm:px-8">
            <div className="-mt-12 flex flex-col gap-6 sm:-mt-14 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                {/* Avatar */}
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-surface bg-background shadow-md sm:h-28 sm:w-28">
                  <span className="font-serif text-3xl font-semibold text-primary">
                    {user?.name
                      ? user.name.substring(0, 2).toUpperCase()
                      : "SF"}
                  </span>
                </div>

                {/* User Information */}
                <div className="pb-1">
                  <h1 className="font-serif text-3xl font-semibold text-foreground">
                    {user?.name || "Your Profile"}
                  </h1>

                  {user?.email && (
                    <p className="mt-1 text-sm text-muted">
                      {user.email}
                    </p>
                  )}

                  <p className="mt-3 max-w-xl font-serif text-sm leading-6 text-muted">
                    {user?.bio ||
                      "Build your profile and start sharing your collection with the SleekFinds community."}
                  </p>
                </div>
              </div>

              {/* Profile Actions */}
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded-lg border border-border bg-background px-5 py-2.5 font-serif text-xs font-medium text-foreground transition hover:bg-surface-2"
                >
                  Edit Profile
                </button>

                <button
                  type="button"
                  aria-label="More profile options"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-foreground transition hover:bg-surface-2"
                >
                  <MoreHorizontal size={17} />
                </button>
              </div>
            </div>

            {/* User Stats */}
            <div className="mt-7 grid grid-cols-3 gap-3 border-t border-border pt-6">
              <div className="rounded-xl bg-surface-2 px-4 py-4">
                <p className="font-serif text-[9px] uppercase tracking-wider text-muted">
                  Active Listings
                </p>
                <p className="mt-1 font-serif text-xl font-semibold text-foreground">
                  {listings.length}
                </p>
              </div>

              <div className="rounded-xl bg-surface-2 px-4 py-4">
                <p className="font-serif text-[9px] uppercase tracking-wider text-muted">
                  Member Since
                </p>
                <p className="mt-1 font-serif text-xl font-semibold text-foreground">
                  {user?.memberSince || "—"}
                </p>
              </div>

              <div className="rounded-xl bg-surface-2 px-4 py-4">
                <p className="font-serif text-[9px] uppercase tracking-wider text-muted">
                  Seller Rating
                </p>
                <p className="mt-1 font-serif text-xl font-semibold text-foreground">
                  ★ 5.0
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Active Listings */}
        <section className="py-10">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="font-serif text-[10px] uppercase tracking-[0.2em] text-primary">
                Your Collection
              </p>

              <h2 className="mt-1 font-serif text-2xl font-semibold text-foreground">
                Active Listings
              </h2>

              <p className="mt-1 font-serif text-xs text-muted">
                Your current listings from MongoDB.
              </p>
            </div>

            <Link
              href="/products"
              className="hidden items-center gap-1.5 rounded-lg border border-border bg-surface px-4 py-2 font-serif text-xs text-muted transition hover:bg-surface-2 hover:text-foreground sm:flex"
            >
              View Full Catalog
              <ArrowRight size={13} />
            </Link>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-border bg-surface px-6 py-16 text-center">
              <p className="font-serif text-sm text-muted">
                Loading your listings...
              </p>
            </div>
          ) : listings.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {listings.map((listing) => (
                <div
                  key={listing._id}
                  className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Product Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
                    {listing.imageUrl ? (
                      <Image
                        src={listing.imageUrl}
                        alt={listing.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center font-serif text-xs text-muted">
                        No image available
                      </div>
                    )}

                    <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 font-serif text-[9px] font-medium text-foreground backdrop-blur-sm">
                      {listing.condition || "Excellent"}
                    </span>

                    <button
                      type="button"
                      aria-label={`Edit ${listing.title}`}
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-sm backdrop-blur-sm transition group-hover:opacity-100 hover:text-primary"
                    >
                      <Pencil size={13} />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-serif text-[9px] uppercase tracking-wider text-muted">
                          {listing.category}
                        </p>

                        <h3 className="mt-1 truncate font-serif text-base font-semibold text-foreground">
                          {listing.title}
                        </h3>
                      </div>

                      <span className="shrink-0 font-serif text-sm font-semibold text-primary">
                        ${listing.price.toLocaleString()}
                      </span>
                    </div>

                    <p className="mt-3 line-clamp-2 font-serif text-[11px] leading-5 text-muted">
                      {listing.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-border pt-3 font-serif text-[9px] text-muted">
                      <span className="flex items-center gap-1.5">
                        <Eye size={11} />
                        {listing.views || 0} Views
                      </span>

                      <span>{listing.condition}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-surface-2 text-primary">
                <Plus size={22} />
              </div>

              <p className="mt-5 font-serif text-xl font-semibold text-foreground">
                Your collection is waiting.
              </p>

              <p className="mx-auto mt-2 max-w-md font-serif text-xs leading-5 text-muted">
                Add your first listing to start selling on SleekFinds.
              </p>

              <Link
                href="/add-listing"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-serif text-xs font-medium text-white transition hover:bg-primary-hover"
              >
                <Plus size={14} />
                Add Your First Listing
              </Link>
            </div>
          )}
        </section>

        {/* Drafts */}
        <section className="border-t border-border py-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg font-semibold text-foreground">
                Drafts
              </h2>

              <p className="mt-1 font-serif text-xs text-muted">
                Unfinished listings you've started creating.
              </p>
            </div>

            <span className="rounded-full bg-surface-2 px-3 py-1 font-serif text-[10px] text-muted">
              0
            </span>
          </div>

          <div className="mt-4 rounded-xl bg-surface-2 px-5 py-4 font-serif text-xs text-muted">
            You don't have any unfinished listings.
          </div>
        </section>
      </div>
    </main>
  );
}