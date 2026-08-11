"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Pencil, Eye, MoreHorizontal, ArrowRight } from "lucide-react";

// Interface matching your MongoDB Product Model
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
    // 1. Fetch authenticated user details from session / localStorage
    const storedUser = localStorage.getItem("sleekfinds_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Default fallback if no active login state found
      setUser({
        name: "Elena M.",
        email: "elena@example.com",
        bio: "Curator of mid-century minimalist pieces. I believe in preserving the heritage of well-crafted timeless objects.",
        memberSince: "2021",
      });
    }

    // 2. Fetch live listings from MongoDB Atlas via API route
    const fetchUserListings = async () => {
      try {
        const response = await fetch("/api/products");
        if (response.ok) {
          const data = await response.json();
          // SAFELY EXTRACT THE ARRAY:
          const productsArray = Array.isArray(data) 
            ? data 
            : data.products || data.listings || data.data || [];
            
          setListings(productsArray);
        }
      } catch (error) {
        console.error("Failed to load listings from MongoDB:", error);
        setListings([]); // Fallback to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchUserListings();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* User Header Section */}
        <section className="border-b border-border pb-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface-2">
              <span className="font-serif text-3xl text-primary">
                {user?.name ? user.name.substring(0, 2).toUpperCase() : "SF"}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h1 className="font-serif text-3xl font-semibold text-foreground">
                    {user?.name || "Member Profile"}
                  </h1>
                  <p className="mt-1 text-xs text-muted-2">{user?.email}</p>
                  <p className="mt-2 max-w-xl font-serif text-sm leading-6 text-muted">
                    {user?.bio || "SleekFinds luxury collector and vintage enthusiast."}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="border border-border bg-surface px-4 py-2 font-serif text-xs font-medium text-foreground transition hover:bg-background"
                  >
                    Edit Profile
                  </button>
                  <button
                    type="button"
                    aria-label="More profile options"
                    className="flex h-9 w-9 items-center justify-center border border-border bg-surface text-foreground transition hover:bg-background"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
              
              {/* User Stats Bar */}
              <div className="mt-5 flex flex-wrap gap-3">
                <div className="min-w-[100px] bg-surface-2 px-4 py-2">
                  <p className="font-serif text-[9px] uppercase tracking-wider text-muted">Active Listings</p>
                  <p className="mt-1 font-serif text-lg font-semibold text-foreground">{listings.length}</p>
                </div>
                <div className="min-w-[100px] bg-surface-2 px-4 py-2">
                  <p className="font-serif text-[9px] uppercase tracking-wider text-muted">Member Since</p>
                  <p className="mt-1 font-serif text-lg font-semibold text-foreground">{user?.memberSince || "2026"}</p>
                </div>
                <div className="min-w-[100px] bg-surface-2 px-4 py-2">
                  <p className="font-serif text-[9px] uppercase tracking-wider text-muted">Seller Rating</p>
                  <p className="mt-1 font-serif text-lg font-semibold text-foreground">★ 5.0</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Active Listings Grid */}
        <section className="py-8">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground">Active Listings</h2>
              <p className="mt-1 font-serif text-xs text-muted">Items currently pulled directly from MongoDB database.</p>
            </div>
            <Link
              href="/products"
              className="hidden items-center gap-1 font-serif text-xs text-muted transition hover:text-foreground sm:flex"
            >
              View Full Catalog
              <ArrowRight size={13} />
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center font-serif text-xs text-muted">
              Loading listings from database...
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {/* Add New Item Button */}
              <Link
                href="/add-listing"
                className="group flex min-h-[270px] flex-col items-center justify-center border border-border bg-surface p-6 text-center transition hover:border-primary hover:shadow-sm"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white transition group-hover:bg-primary-hover">
                  <Plus size={20} />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground">Add a Listing</h3>
                <p className="mt-2 max-w-[180px] font-serif text-xs leading-5 text-muted">
                  Share another piece of your collection with the community.
                </p>
              </Link>
              
              {/* Render MongoDB Products */}
              {Array.isArray(listings) && listings.map((listing) => (
                <div
                  key={listing._id}
                  className="overflow-hidden border border-border bg-surface shadow-sm transition hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
                    {listing.imageUrl ? (
                      <Image
                        src={listing.imageUrl}
                        alt={listing.title}
                        fill
                        className="object-cover transition duration-300 hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center font-serif text-xs text-muted">
                        No image available
                      </div>
                    )}
                    <span className="absolute left-3 top-3 bg-amber-600/90 px-2 py-1 font-serif text-[9px] text-white">
                      {listing.condition || "Excellent"}
                    </span>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-serif text-[9px] uppercase tracking-wider text-muted-2">
                          {listing.category}
                        </p>
                        <h3 className="mt-1 truncate font-serif text-base font-semibold text-foreground">
                          {listing.title}
                        </h3>
                      </div>
                      <span className="shrink-0 font-serif text-xs font-semibold text-primary">
                        ${listing.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 font-serif text-[10px] leading-4 text-muted">
                      {listing.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-3 font-serif text-[9px] text-muted">
                      <span className="flex items-center gap-1">
                        <Eye size={11} />
                        {listing.views || 0} Views
                      </span>
                      <button
                        type="button"
                        aria-label={`Edit ${listing.title}`}
                        className="transition hover:text-primary"
                      >
                        <Pencil size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && listings.length === 0 && (
            <div className="mt-5 border border-dashed border-border bg-surface px-6 py-10 text-center">
              <p className="font-serif text-lg font-semibold text-foreground">
                Your collection is waiting.
              </p>
              <p className="mt-2 font-serif text-xs text-muted">
                Add your first listing to start selling on SleekFinds.
              </p>
              <Link
                href="/add-listing"
                className="mt-5 inline-flex items-center gap-2 bg-primary px-5 py-2.5 font-serif text-xs font-medium text-white transition hover:bg-primary-hover"
              >
                <Plus size={14} />
                Add Your First Listing
              </Link>
            </div>
          )}
        </section>

        {/* Unfinished Drafts Section */}
        <section className="border-t border-border py-8">
          <h2 className="font-serif text-lg font-semibold text-foreground">Drafts (0)</h2>
          <div className="mt-4 bg-surface-2 px-5 py-4 font-serif text-xs text-muted">
            You don't have any unfinished listings.
          </div>
        </section>
      </div>
    </main>
  );
}