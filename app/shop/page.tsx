import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductFilter } from "@/components/shop/ProductFilter";
import { ProductGrid } from "@/components/shop/ProductGrid";

export const metadata: Metadata = {
  title: "Koleksi",
  description: "Jelajahi seluruh koleksi furnitur kayu Jepara Digital Furniture.",
};

export default function ShopPage() {
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

      <Suspense fallback={null}>
        <div className="mb-10">
          <ProductFilter />
        </div>
        <ProductGrid />
      </Suspense>
    </div>
  );
}
