import Link from "next/link";
import { Search, Heart, ShoppingBag, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b border-border bg-surface text-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <h1 className="text-2xl font-bold">SleekFinds</h1>

        <div className="flex gap-8 text-sm text-muted">
          <Link href="/" className="hover:text-foreground">
            Curated
          </Link>
          <Link href="/" className="hover:text-foreground">
            Vintage
          </Link>
          <Link href="/" className="hover:text-foreground">
            Sale
          </Link>
        </div>

        <div className="flex gap-5 text-muted">
          <Search size={18} />
          <Heart size={18} />
          <ShoppingBag size={18} />
          <User size={18} />
        </div>
      </div>
    </nav>
  );
}