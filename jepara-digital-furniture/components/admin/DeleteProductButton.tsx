"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

export function DeleteProductButton({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`Hapus produk "${productName}"? Tindakan ini tidak bisa dibatalkan.`)) {
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/products/${productId}`, { method: "DELETE" });
    setLoading(false);
    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error ?? "Gagal menghapus produk.");
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-muted hover:text-red-600 disabled:opacity-50"
      aria-label={`Hapus ${productName}`}
    >
      {loading ? (
        <Loader2 size={14} strokeWidth={1.5} className="animate-spin" />
      ) : (
        <Trash2 size={14} strokeWidth={1.5} />
      )}
    </button>
  );
}
