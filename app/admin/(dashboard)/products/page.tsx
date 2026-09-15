import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatRupiah } from "@/lib/utils";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-ink">Produk</h1>
          <p className="mt-2 text-muted">{products.length} produk terdaftar.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-ink text-bg px-5 py-3 text-sm hover:bg-walnut transition-colors"
        >
          <Plus size={16} strokeWidth={1.5} />
          Tambah Produk
        </Link>
      </div>

      <div className="mt-8 border border-line bg-bg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-muted">
              <th className="p-4 font-normal">Produk</th>
              <th className="p-4 font-normal">Kategori</th>
              <th className="p-4 font-normal">Harga</th>
              <th className="p-4 font-normal">Stok</th>
              <th className="p-4 font-normal">Status</th>
              <th className="p-4 font-normal text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-line last:border-none">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 shrink-0 bg-surface">
                      {product.images[0] && (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <span className="text-ink">{product.name}</span>
                  </div>
                </td>
                <td className="p-4 text-muted">{product.category.name}</td>
                <td className="p-4 text-ink">{formatRupiah(product.price)}</td>
                <td className="p-4">
                  <span className={product.stock <= 3 ? "text-walnut" : "text-ink"}>
                    {product.stock}
                  </span>
                </td>
                <td className="p-4">
                  {product.featured && (
                    <span className="text-xs bg-surface px-2 py-1 mr-1">Unggulan</span>
                  )}
                  {product.isNew && (
                    <span className="text-xs bg-surface px-2 py-1">Baru</span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-muted hover:text-ink text-xs"
                    >
                      Edit
                    </Link>
                    <DeleteProductButton productId={product.id} productName={product.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="p-8 text-center text-muted text-sm">Belum ada produk.</p>
        )}
      </div>
    </div>
  );
}
