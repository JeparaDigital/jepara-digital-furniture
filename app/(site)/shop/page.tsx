import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductFilter } from "@/components/shop/ProductFilter";
import { ProductCard } from "@/components/ui/ProductCard";
import { getFilteredProducts, getCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Koleksi",
  description: "Jelajahi seluruh koleksi furnitur kayu Jepara Digital Furniture.",
};

export const dynamic = "force-dynamic";

interface Props {
  searchParams: { category?: string; sort?: string };
}

export default async function ShopPage({ searchParams }: Props) {
  const [products, categories] = await Promise.all([
    getFilteredProducts({
      categorySlug: searchParams.category,
      sort: searchParams.sort,
    }),
    getCategories(),
  ]);

  return (
    <div className="container py-14 lg:py-20">
      <div className="mb-10 max-w-xl">
        <h1 className="font-serif text-4xl text-ink tracking-tightish">Koleksi</h1>
        <p className="mt-3 text-muted leading-relaxed">
          Setiap produk dibuat dari kayu solid pilihan dan diselesaikan tangan
          oleh pengrajin Jepara. Saring berdasarkan ruang atau urutkan sesuai
          kebutuhan.
        </p>
      </div>

      <div className="mb-10">
        <Suspense fallback={null}>
          <ProductFilter categories={categories} />
        </Suspense>
      </div>

      {products.length === 0 ? (
        <p className="py-20 text-center text-muted">
          Belum ada produk pada kategori ini.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
