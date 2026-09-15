import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";

interface Props {
  params: { id: string };
}

export default async function EditProductPage({ params }: Props) {
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id: params.id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) notFound();

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink">Edit Produk</h1>
      <p className="mt-2 text-muted">{product.name}</p>

      <div className="mt-8">
        <ProductForm
          categories={categories}
          initialValues={{
            id: product.id,
            name: product.name,
            categoryId: product.categoryId,
            price: product.price,
            compareAtPrice: product.compareAtPrice,
            description: product.description,
            details: product.details.length ? product.details : [""],
            material: product.material,
            dimensions: product.dimensions,
            images: product.images.length ? product.images : [""],
            stock: product.stock,
            featured: product.featured,
            isNew: product.isNew,
          }}
        />
      </div>
    </div>
  );
}
