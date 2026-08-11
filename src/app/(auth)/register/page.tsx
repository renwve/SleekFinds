/**
 * Author: SleekFinds Development Team
 * Date: August 11, 2026
 * Description: Registration page component for creating new SleekFinds user accounts.
 * Input: Collects registration details including username, email address, and password from form controls.
 * Processing: Validates fields, sends a POST payload to /api/auth/register, and establishes a user session upon creation.
 * Output: Dispatches local storage auth events, updates navigation bar state, and navigates users to their profile.
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to register");
      }

      // Automatically store session so navbar and profile update
      const userSession = {
        name: username,
        email: email,
      };
      localStorage.setItem("sleekfinds_user", JSON.stringify(userSession));
      window.dispatchEvent(new Event("storage"));

      // Redirect directly to user profile dashboard
      router.push("/profile");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to register");
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
          backgroundImage: "url('/images/banana.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative flex w-full flex-col justify-between p-12 text-white">
          <h1 className="text-5xl font-bold tracking-wide">SleekFinds</h1>

          <div>
            <h2 className="text-5xl font-bold leading-tight">
              Discover
              <br />
              Timeless Finds.
            </h2>

            <p className="mt-5 max-w-md text-lg text-gray-200">
              Create your account and start buying and selling quality
              second-hand items.
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
              onClick={() => router.push("/login")}
              className="pb-2 text-muted transition hover:text-foreground"
            >
              Sign In
            </button>

            <button
              type="button"
              className="border-b-2 border-primary pb-2 font-semibold text-foreground"
            >
              Create Account
            </button>
          </div>

          {/* Heading */}
          <h2 className="text-4xl font-bold text-foreground">
            Create Account
          </h2>

          <p className="mt-2 text-muted">
            Join the SleekFinds community today.
          </p>

          {error && (
            <div className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Username
              </label>

              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full rounded-lg border border-border bg-surface p-3 text-foreground placeholder:text-muted-light outline-none transition focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Email Address
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-lg border border-border bg-surface p-3 text-foreground placeholder:text-muted-light outline-none transition focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Password
              </label>

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-border bg-surface p-3 text-foreground placeholder:text-muted-light outline-none transition focus:border-primary"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary py-3 font-medium text-white transition hover:bg-primary-hover disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}