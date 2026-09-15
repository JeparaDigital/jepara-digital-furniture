"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@/types";
import { cn } from "@/lib/utils";

const sortOptions = [
  { value: "default", label: "Rekomendasi" },
  { value: "price-asc", label: "Harga: Rendah ke Tinggi" },
  { value: "price-desc", label: "Harga: Tinggi ke Rendah" },
  { value: "newest", label: "Terbaru" },
];

export function ProductFilter({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") ?? "all";
  const activeSort = searchParams.get("sort") ?? "default";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || value === "default") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/shop${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-line pb-6">
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <button
          onClick={() => updateParam("category", "all")}
          className={cn(
            "text-sm pb-1 border-b",
            activeCategory === "all"
              ? "text-ink border-ink"
              : "text-muted border-transparent hover:text-ink"
          )}
        >
          Semua
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => updateParam("category", cat.slug)}
            className={cn(
              "text-sm pb-1 border-b",
              activeCategory === cat.slug
                ? "text-ink border-ink"
                : "text-muted border-transparent hover:text-ink"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <select
        value={activeSort}
        onChange={(e) => updateParam("sort", e.target.value)}
        className="bg-transparent border border-line px-3 py-2 text-sm text-ink outline-none"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
