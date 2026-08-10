import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface text-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-8 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">SleekFinds</h2>
        </div>

        <div className="flex flex-wrap gap-6 text-sm text-muted">
          <Link href="/" className="hover:text-foreground">
            Community
          </Link>
          <Link href="/" className="hover:text-foreground">
            Support
          </Link>
          <Link href="/" className="hover:text-foreground">
            Terms of Service
          </Link>
          <Link href="/" className="hover:text-foreground">
            Privacy
          </Link>
          <Link href="/" className="hover:text-foreground">
            About
          </Link>
        </div>

        <div className="flex gap-4 text-muted">
          <Link href="/" className="hover:text-foreground">
            <FaInstagram size={18} />
          </Link>
          <Link href="/" className="hover:text-foreground">
            <FaFacebookF size={18} />
          </Link>
          <Link href="/" className="hover:text-foreground">
            <FaTwitter size={18} />
          </Link>
        </div>
      </div>

      <div className="border-t border-border py-4 text-center text-sm text-muted">
        © {new Date().getFullYear()} SleekFinds. All rights reserved.
      </div>
    </footer>
  );
}
 
