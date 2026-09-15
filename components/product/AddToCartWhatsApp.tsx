"use client";

import { useState } from "react";
import { Minus, Plus, MessageCircle, Loader2 } from "lucide-react";
import { Product } from "@/types";
import { buildWhatsAppOrderLink } from "@/lib/whatsapp";

export function AddToCartWhatsApp({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  function decrease() {
    setQuantity((q) => Math.max(1, q - 1));
  }

  function increase() {
    setQuantity((q) => Math.min(product.stock, q + 1));
  }

  async function handleOrder() {
    setLoading(true);
    const link = buildWhatsAppOrderLink({ product, quantity });

    try {
      // Catat pesanan ke riwayat order (untuk dilihat admin), lalu buka WhatsApp.
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          quantity,
        }),
      });
    } catch {
      // Jika pencatatan gagal, tetap lanjutkan ke WhatsApp — jangan blokir pelanggan.
    } finally {
      setLoading(false);
      window.open(link, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted">Jumlah</span>
        <div className="flex items-center border border-line">
          <button
            onClick={decrease}
            className="p-3 text-ink hover:bg-surface transition-colors"
            aria-label="Kurangi jumlah"
          >
            <Minus size={14} strokeWidth={1.5} />
          </button>
          <span className="w-10 text-center text-sm text-ink">{quantity}</span>
          <button
            onClick={increase}
            className="p-3 text-ink hover:bg-surface transition-colors"
            aria-label="Tambah jumlah"
          >
            <Plus size={14} strokeWidth={1.5} />
          </button>
        </div>
        <span className="text-xs text-muted">Stok: {product.stock}</span>
      </div>

      <button
        onClick={handleOrder}
        disabled={loading || product.stock === 0}
        className="flex items-center justify-center gap-2 w-full sm:w-auto bg-ink text-bg px-8 py-4 text-sm transition-colors hover:bg-walnut disabled:opacity-50"
      >
        {loading ? (
          <Loader2 size={18} strokeWidth={1.5} className="animate-spin" />
        ) : (
          <MessageCircle size={18} strokeWidth={1.5} />
        )}
        {product.stock === 0 ? "Stok habis" : "Pesan via WhatsApp"}
      </button>
      <p className="text-xs text-muted max-w-sm">
        Anda akan diarahkan ke WhatsApp dengan pesan yang sudah berisi detail
        produk, jumlah, dan total harga — tim kami akan membalas untuk
        konfirmasi stok dan ongkos kirim.
      </p>
    </div>
  );
}
