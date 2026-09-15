import { prisma } from "@/lib/prisma";
import { CategoryManager } from "@/components/admin/CategoryManager";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink">Kategori</h1>
      <p className="mt-2 text-muted">Kelola kategori untuk mengelompokkan produk.</p>

      <div className="mt-8">
        <CategoryManager
          initialCategories={categories.map((c) => ({
            id: c.id,
            name: c.name,
            image: c.image ?? "",
            productCount: c._count.products,
          }))}
        />
      </div>
    </div>
  );
}
