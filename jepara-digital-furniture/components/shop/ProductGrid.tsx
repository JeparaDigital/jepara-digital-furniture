"use client";

import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { ProductCard } from "@/components/ui/ProductCard";

export function ProductGrid() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category");
  const sort = searchParams.get("sort") ?? "default";

  const categoryName = categories.find((c) => c.slug === categorySlug)?.name;

  let list = categorySlug
    ? products.filter((p) => p.category === categoryName)
    : products;

  list = [...list];
  if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
  if (sort === "newest") list.sort((a, b) => Number(b.isNew) - Number(a.isNew));

  if (list.length === 0) {
    return (
      <p className="py-20 text-center text-muted">
        Belum ada produk pada kategori ini.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
      {list.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
