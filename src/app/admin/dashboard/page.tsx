import Link from "next/link";
import { FileWarning, Package, Users } from "lucide-react";
import { auth } from "@/auth";

const sections = [
  {
    title: "Listings",
    description: "Create, edit, and remove marketplace products.",
    href: "/admin/listings",
    action: "Manage listings",
    icon: Package,
  },
  {
    title: "Users",
    description: "Review registered accounts and access levels.",
    href: "/admin/users",
    action: "Manage users",
    icon: Users,
  },
  {
    title: "Reports",
    description: "Review content reported by marketplace users.",
    href: "/admin/reports",
    action: "View reports",
    icon: FileWarning,
  },
];

export default async function AdminDashboardPage() {
  const session = await auth();

  return (
    <main className="min-h-screen bg-background px-6 py-12 text-foreground">
      <div className="mx-auto max-w-6xl">
        <header className="border-b border-border pb-7">
          <p className="text-sm text-muted">Administration</p>
          <h1 className="mt-2 font-serif text-4xl font-semibold">Dashboard</h1>
          <p className="mt-3 text-muted">
            Signed in as {session?.user.name || session?.user.email}.
          </p>
        </header>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {sections.map(({ title, description, href, action, icon: Icon }) => (
            <article key={href} className="border-t border-border bg-surface p-6">
              <Icon size={24} aria-hidden="true" />
              <h2 className="mt-6 font-serif text-2xl font-semibold">{title}</h2>
              <p className="mt-2 min-h-12 text-sm leading-6 text-muted">{description}</p>
              <Link href={href} className="mt-6 inline-block font-medium text-foreground underline underline-offset-4">
                {action}
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
