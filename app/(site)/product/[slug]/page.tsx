import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getRelatedProducts } from "@/lib/data";
import { formatRupiah } from "@/lib/utils";
import { ProductGallery } from "@/components/product/ProductGallery";
import { AddToCartWhatsApp } from "@/components/product/AddToCartWhatsApp";
import { ProductTabs } from "@/components/product/ProductTabs";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Props {
  params: { slug: string };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product);

  return (
    <div className="container py-14 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          <p className="text-muted text-sm">{product.category}</p>
          <h1 className="mt-2 font-serif text-3xl md:text-4xl text-ink tracking-tightish">
            {product.name}
          </h1>

          <div className="mt-4 flex items-baseline gap-3">
            <p className="text-xl text-ink">{formatRupiah(product.price)}</p>
            {product.compareAtPrice && (
              <p className="text-muted line-through text-sm">
                {formatRupiah(product.compareAtPrice)}
              </p>
            )}
          </div>

          <p className="mt-6 text-muted leading-relaxed max-w-md">
            {product.description}
          </p>

          <p className="mt-4 text-xs text-muted">
            {product.material} · {product.dimensions}
          </p>

          <AddToCartWhatsApp product={product} />
        </div>
      </div>

      <ProductTabs product={product} />

      {related.length > 0 && (
        <div className="mt-24 lg:mt-32">
          <SectionHeading title="Produk terkait" className="mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
