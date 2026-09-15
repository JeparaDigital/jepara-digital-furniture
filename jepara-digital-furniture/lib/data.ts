import { prisma } from "@/lib/prisma";
import { Product, Category } from "@/types";

type DbProduct = Awaited<ReturnType<typeof prisma.product.findFirstOrThrow>> & {
  category: { name: string };
};

function mapProduct(p: DbProduct): Product {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category.name,
    price: p.price,
    compareAtPrice: p.compareAtPrice ?? undefined,
    description: p.description,
    details: p.details,
    material: p.material,
    dimensions: p.dimensions,
    images: p.images,
    featured: p.featured,
    isNew: p.isNew,
    stock: p.stock,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  return products.map(mapProduct);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { featured: true },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });
  return products.map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
  return product ? mapProduct(product) : null;
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: {
      category: { name: product.category },
      id: { not: product.id },
    },
    include: { category: true },
    take: limit,
  });
  return products.map(mapProduct);
}

export async function getFilteredProducts(options: {
  categorySlug?: string;
  sort?: string;
}): Promise<Product[]> {
  const { categorySlug, sort } = options;

  const orderBy =
    sort === "price-asc"
      ? { price: "asc" as const }
      : sort === "price-desc"
      ? { price: "desc" as const }
      : sort === "newest"
      ? { createdAt: "desc" as const }
      : { featured: "desc" as const };

  const products = await prisma.product.findMany({
    where: categorySlug ? { category: { slug: categorySlug } } : undefined,
    include: { category: true },
    orderBy,
  });
  return products.map(mapProduct);
}

export async function getCategories(): Promise<Category[]> {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" },
  });
  return categories.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    image: c.image ?? "",
    count: c._count.products,
  }));
}
