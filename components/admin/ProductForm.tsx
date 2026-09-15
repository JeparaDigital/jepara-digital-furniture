"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, Loader2 } from "lucide-react";
import { ImageUploader } from "@/components/admin/ImageUploader";

interface CategoryOption {
  id: string;
  name: string;
}

interface ProductFormValues {
  id?: string;
  name: string;
  categoryId: string;
  price: number;
  compareAtPrice?: number | null;
  description: string;
  details: string[];
  material: string;
  dimensions: string;
  images: string[];
  stock: number;
  featured: boolean;
  isNew: boolean;
}

export function ProductForm({
  categories,
  initialValues,
}: {
  categories: CategoryOption[];
  initialValues?: ProductFormValues;
}) {
  const router = useRouter();
  const isEdit = Boolean(initialValues?.id);

  const [form, setForm] = useState<ProductFormValues>(
    initialValues ?? {
      name: "",
      categoryId: categories[0]?.id ?? "",
      price: 0,
      compareAtPrice: null,
      description: "",
      details: [""],
      material: "",
      dimensions: "",
      images: [""],
      stock: 0,
      featured: false,
      isNew: false,
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function updateListItem(key: "details" | "images", index: number, value: string) {
    const list = [...form[key]];
    list[index] = value;
    update(key, list);
  }

  function addListItem(key: "details" | "images") {
    update(key, [...form[key], ""]);
  }

  function removeListItem(key: "details" | "images", index: number) {
    update(
      key,
      form[key].filter((_, i) => i !== index)
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      details: form.details.filter((d) => d.trim() !== ""),
      images: form.images.filter((i) => i.trim() !== ""),
    };

    const res = await fetch(
      isEdit ? `/api/products/${initialValues!.id}` : "/api/products",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Terjadi kesalahan, coba lagi.");
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      {error && <p className="text-sm text-red-600 border border-red-200 bg-red-50 p-3">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="text-sm text-ink block mb-2">Nama Produk</label>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="text-sm text-ink block mb-2">Kategori</label>
          <select
            required
            value={form.categoryId}
            onChange={(e) => update("categoryId", e.target.value)}
            className="w-full border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none focus:border-ink"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label className="text-sm text-ink block mb-2">Harga (Rp)</label>
          <input
            required
            type="number"
            min={0}
            value={form.price}
            onChange={(e) => update("price", Number(e.target.value))}
            className="w-full border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="text-sm text-ink block mb-2">Harga Coret (opsional)</label>
          <input
            type="number"
            min={0}
            value={form.compareAtPrice ?? ""}
            onChange={(e) =>
              update("compareAtPrice", e.target.value ? Number(e.target.value) : null)
            }
            className="w-full border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="text-sm text-ink block mb-2">Stok</label>
          <input
            required
            type="number"
            min={0}
            value={form.stock}
            onChange={(e) => update("stock", Number(e.target.value))}
            className="w-full border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none focus:border-ink"
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-ink block mb-2">Deskripsi</label>
        <textarea
          required
          rows={4}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          className="w-full border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none focus:border-ink resize-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="text-sm text-ink block mb-2">Material</label>
          <input
            required
            value={form.material}
            onChange={(e) => update("material", e.target.value)}
            className="w-full border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="text-sm text-ink block mb-2">Dimensi</label>
          <input
            required
            placeholder="mis. 180 x 90 x 75 cm"
            value={form.dimensions}
            onChange={(e) => update("dimensions", e.target.value)}
            className="w-full border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none focus:border-ink"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm text-ink">Poin Detail</label>
          <button
            type="button"
            onClick={() => addListItem("details")}
            className="text-xs text-muted hover:text-ink inline-flex items-center gap-1"
          >
            <Plus size={12} strokeWidth={1.5} /> Tambah
          </button>
        </div>
        <div className="space-y-2">
          {form.details.map((detail, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={detail}
                onChange={(e) => updateListItem("details", i, e.target.value)}
                className="flex-1 border border-line bg-transparent px-4 py-2.5 text-sm text-ink outline-none focus:border-ink"
                placeholder="mis. Rangka kayu jati solid"
              />
              <button
                type="button"
                onClick={() => removeListItem("details", i)}
                className="text-muted hover:text-red-600 px-2"
                aria-label="Hapus"
              >
                <X size={14} strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm text-ink">Gambar Produk</label>
          <button
            type="button"
            onClick={() => addListItem("images")}
            className="text-xs text-muted hover:text-ink inline-flex items-center gap-1"
          >
            <Plus size={12} strokeWidth={1.5} /> Tambah baris URL
          </button>
        </div>
        <p className="text-xs text-muted mb-3">
          Upload gambar dari komputer, atau tempel URL gambar (mis. dari Cloudinary/Imgur). Gambar pertama jadi thumbnail utama.
        </p>
        <div className="space-y-2 mb-3">
          {form.images.map((image, i) => (
            <div key={i} className="flex gap-2 items-center">
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
                onChange={(e) => updateListItem("images", i, e.target.value)}
                className="flex-1 border border-line bg-transparent px-4 py-2.5 text-sm text-ink outline-none focus:border-ink"
                placeholder="https://... atau upload di bawah"
              />
              <button
                type="button"
                onClick={() => removeListItem("images", i)}
                className="text-muted hover:text-red-600 px-2"
                aria-label="Hapus"
              >
                <X size={14} strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>
        <ImageUploader
          onUploaded={(url) => {
            const nonEmpty = form.images.filter((i) => i.trim() !== "");
            update("images", [...nonEmpty, url]);
          }}
        />
      </div>

      <div className="flex items-center gap-8">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => update("featured", e.target.checked)}
          />
          Tampilkan di Unggulan
        </label>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            checked={form.isNew}
            onChange={(e) => update("isNew", e.target.checked)}
          />
          Tandai sebagai Baru
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 bg-ink text-bg px-8 py-4 text-sm hover:bg-walnut transition-colors disabled:opacity-60"
      >
        {loading && <Loader2 size={16} strokeWidth={1.5} className="animate-spin" />}
        {isEdit ? "Simpan Perubahan" : "Tambah Produk"}
      </button>
    </form>
  );
}
