"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { ImageUploader } from "@/components/admin/ImageUploader";

interface CategoryItem {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

export function CategoryManager({
  initialCategories,
}: {
  initialCategories: CategoryItem[];
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError("");

    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, image }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Gagal menambah kategori.");
      return;
    }

    setName("");
    setImage("");
    router.refresh();
  }

  async function handleDelete(id: string, name: string, productCount: number) {
    if (productCount > 0) {
      alert(`Kategori "${name}" masih memiliki ${productCount} produk. Pindahkan produknya dulu.`);
      return;
    }
    if (!confirm(`Hapus kategori "${name}"?`)) return;

    setDeletingId(id);
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    setDeletingId(null);

    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error ?? "Gagal menghapus kategori.");
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <form onSubmit={handleAdd} className="space-y-4 lg:col-span-1">
        <h2 className="text-sm text-ink">Tambah Kategori</h2>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div>
          <label className="text-xs text-muted block mb-2">Nama Kategori</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-line bg-transparent px-4 py-2.5 text-sm text-ink outline-none focus:border-ink"
            placeholder="mis. Lampu"
          />
        </div>
        <div>
          <label className="text-xs text-muted block mb-2">Gambar Kategori (opsional)</label>
          <div className="flex items-center gap-3 mb-2">
            <div className="relative w-11 h-11 shrink-0 bg-surface border border-line overflow-hidden">
              {image.trim() !== "" && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
                  }}
                />
              )}
            </div>
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="flex-1 border border-line bg-transparent px-4 py-2.5 text-sm text-ink outline-none focus:border-ink"
              placeholder="https://... atau upload di bawah"
            />
          </div>
          <ImageUploader onUploaded={(url) => setImage(url)} label="Upload Gambar" />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-ink text-bg px-5 py-2.5 text-sm hover:bg-walnut transition-colors disabled:opacity-60"
        >
          {loading ? (
            <Loader2 size={14} strokeWidth={1.5} className="animate-spin" />
          ) : (
            <Plus size={14} strokeWidth={1.5} />
          )}
          Tambah
        </button>
      </form>

      <div className="lg:col-span-2 border border-line bg-bg divide-y divide-line">
        {initialCategories.map((cat) => (
          <div key={cat.id} className="p-4 flex items-center justify-between text-sm">
            <div>
              <p className="text-ink">{cat.name}</p>
              <p className="text-xs text-muted mt-0.5">{cat.productCount} produk</p>
            </div>
            <button
              onClick={() => handleDelete(cat.id, cat.name, cat.productCount)}
              disabled={deletingId === cat.id}
              className="text-muted hover:text-red-600 disabled:opacity-50"
              aria-label={`Hapus ${cat.name}`}
            >
              {deletingId === cat.id ? (
                <Loader2 size={14} strokeWidth={1.5} className="animate-spin" />
              ) : (
                <Trash2 size={14} strokeWidth={1.5} />
              )}
            </button>
          </div>
        ))}
        {initialCategories.length === 0 && (
          <p className="p-6 text-center text-muted text-sm">Belum ada kategori.</p>
        )}
      </div>
    </div>
  );
}
