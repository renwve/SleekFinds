/**
 * Author: SleekFinds Development Team
 * Date: August 11, 2026
 * Description: Interactive Authentication Page handling Sign In and Account Creation for SleekFinds.
 * Input: Captures user credentials including full name, email address, and password from controlled form fields.
 * Processing: Validates user input, toggles between Login and Account Creation views, and submits payload to API routes.
 * Output: Sets user session state upon successful authentication and redirects users to their dashboard.
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegistering) {
        // Register Call
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.error || "Failed to create account"
          );
        }

        // Automatically log in after register
        localStorage.setItem(
          "sleekfinds_user",
          JSON.stringify({ name, email })
        );
        window.dispatchEvent(new Event("storage"));

        router.push("/profile");
      } else {
        // Login Attempt using NextAuth primary, direct API secondary
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          // Direct API fallback test
          const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(
              data.error || "Invalid email or password"
            );
          }
        }

        // Save session locally for navbar state update
        localStorage.setItem(
          "sleekfinds_user",
          JSON.stringify({
            email,
            name: email.split("@")[0],
          })
        );
        window.dispatchEvent(new Event("storage"));

        router.push("/profile");
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Authentication error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Left Image */}
      <div
        className="relative hidden w-1/2 bg-cover bg-center lg:flex"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative flex w-full flex-col justify-between p-12 text-white">
          <h1 className="text-5xl font-bold tracking-wide">
            SleekFinds
          </h1>
          <div>
            <h2 className="text-5xl font-bold leading-tight">
              Curated Heritage <br />
              for the Conscious Collector.
            </h2>
            <p className="mt-5 max-w-md text-lg text-gray-200">
              Join our community of enthusiasts preserving craftsmanship
              through sustainable second-hand luxury.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="flex w-full items-center justify-center bg-background px-8 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Tabs */}
          <div className="mb-12 flex gap-8 border-b border-border pb-4">
            <button
              type="button"
              className="border-b-2 border-primary pb-2 font-semibold text-foreground"
            >
              Sign In
            </button>
            <Link
              href="/register"
              className="pb-2 text-muted transition hover:text-foreground"
            >
              Create Account
            </Link>
          </div>

          {/* Heading */}
          <h2 className="text-4xl font-bold text-foreground">
            {isRegistering ? "Join SleekFinds" : "Welcome Back"}
          </h2>
          <p className="mt-2 text-muted">
            {isRegistering
              ? "Create your account to start curating luxury pieces."
              : "Enter your details to access your curated collection."}
          </p>

          {error && (
            <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {isRegistering && (
              <div>
                <label className="text-sm font-medium text-foreground">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Elena Rostova"
                  className="mt-2 w-full rounded-lg border border-border bg-surface p-3 text-foreground placeholder:text-muted-light outline-none transition focus:border-primary"
                />
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-foreground">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="mt-2 w-full rounded-lg border border-border bg-surface p-3 text-foreground placeholder:text-muted-light outline-none transition focus:border-primary"
              />
            </div>

            <div>
              <div className="flex justify-between">
                <label className="text-sm font-medium text-foreground">
                  Password
                </label>
                {!isRegistering && (
                  <button
                    type="button"
                    className="text-sm text-muted transition hover:text-foreground"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-2 w-full rounded-lg border border-border bg-surface p-3 text-foreground placeholder:text-muted-light outline-none transition focus:border-primary"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary py-3 font-medium text-white transition hover:bg-primary-hover disabled:opacity-50"
            >
              {loading
                ? "Processing..."
                : isRegistering
                ? "Create Account →"
                : "Sign In →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}