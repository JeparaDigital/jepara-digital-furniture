"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Email atau password salah.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-serif text-2xl text-ink text-center">
          Jepara <span className="text-walnut">Digital</span> Furniture
        </h1>
        <p className="mt-2 text-sm text-muted text-center">Masuk ke panel admin</p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <div>
            <label className="text-sm text-ink block mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none focus:border-ink"
              placeholder="admin@jeparadigitalfurniture.id"
            />
          </div>

          <div>
            <label className="text-sm text-ink block mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none focus:border-ink"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-ink text-bg px-6 py-3 text-sm transition-colors hover:bg-walnut disabled:opacity-60"
          >
            {loading && <Loader2 size={16} strokeWidth={1.5} className="animate-spin" />}
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
