import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink">Tambah Produk</h1>
      <p className="mt-2 text-muted">Isi detail produk baru di bawah ini.</p>

      <div className="mt-8">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}
