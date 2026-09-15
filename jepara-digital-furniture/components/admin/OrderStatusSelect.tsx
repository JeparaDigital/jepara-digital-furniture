"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Check } from "lucide-react";

const statuses = [
  { value: "PENDING", label: "Baru" },
  { value: "CONFIRMED", label: "Dikonfirmasi" },
  { value: "SHIPPED", label: "Dikirim" },
  { value: "COMPLETED", label: "Selesai" },
  { value: "CANCELLED", label: "Dibatalkan" },
];

export function OrderStatusSelect({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleChange(newStatus: string) {
    setStatus(newStatus);
    setLoading(true);
    setSaved(false);

    const res = await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    setLoading(false);

    if (res.ok) {
      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 2000);
    } else {
      alert("Gagal memperbarui status.");
    }
  }

  return (
    <div className="flex items-center gap-3">
      <select
        value={status}
        onChange={(e) => handleChange(e.target.value)}
        disabled={loading}
        className="border border-line bg-transparent px-4 py-2.5 text-sm text-ink outline-none focus:border-ink disabled:opacity-60"
      >
        {statuses.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
      {loading && <Loader2 size={14} strokeWidth={1.5} className="animate-spin text-muted" />}
      {saved && !loading && (
        <span className="inline-flex items-center gap-1 text-xs text-walnut">
          <Check size={14} strokeWidth={1.5} /> Tersimpan
        </span>
      )}
    </div>
  );
}
