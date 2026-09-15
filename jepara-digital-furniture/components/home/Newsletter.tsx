"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    // Dummy submit — sambungkan ke provider email pilihan Anda di sini.
    setSubmitted(true);
  }

  return (
    <section className="bg-ink">
      <div className="container py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-bg tracking-tightish text-balance">
            Dapat kabar koleksi baru lebih dulu
          </h2>
          <p className="mt-3 text-bg/60 max-w-sm leading-relaxed">
            Satu email singkat setiap bulan: produk baru, sisa stok terbatas,
            dan sedikit cerita dari bengkel kayu Jepara.
          </p>
        </div>

        <div>
          {submitted ? (
            <p className="inline-flex items-center gap-2 text-bg">
              <Check size={18} strokeWidth={1.5} />
              Terima kasih, email Anda sudah tercatat.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex max-w-md border-b border-bg/30 pb-2">
              <input
                type="email"
                required
                placeholder="Alamat email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent text-bg placeholder:text-bg/40 outline-none text-sm"
              />
              <button
                type="submit"
                aria-label="Kirim"
                className="text-bg shrink-0 hover:text-walnut-light transition-colors"
              >
                <ArrowRight size={20} strokeWidth={1.5} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
