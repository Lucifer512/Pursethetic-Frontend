"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Login failed");
        return;
      }

      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Network error — please try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-4xl border border-[rgba(155,122,67,0.14)] bg-[rgba(255,250,241,0.96)] p-8 shadow-[0_30px_80px_rgba(61,47,28,0.12)]">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-primary">
          Pursethetic
        </p>
        <h1 className="mt-2 font-serif text-2xl text-foreground">Admin</h1>
        <p className="mt-1 text-sm text-(--color-muted)">Enter your admin password to continue.</p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-(--color-muted)">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="h-12 w-full rounded-full border border-[rgba(32,26,21,0.12)] bg-white px-5 text-sm text-foreground outline-none transition placeholder:text-(--color-muted) focus:border-[rgba(155,122,67,0.5)] focus:ring-2 focus:ring-[rgba(155,122,67,0.12)]"
            />
          </div>

          {error && (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="h-12 w-full cursor-pointer rounded-full bg-primary text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#8c6e41] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
