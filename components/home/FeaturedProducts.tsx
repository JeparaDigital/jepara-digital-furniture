import { Product } from "@/types";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { Product } from "@prisma/client";
interface FeaturedProductsProps {
  products: Product[];
}
export function FeaturedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <SectionHeading
            title="Pilihan utama musim ini"
            description="Sebagian karya yang paling banyak dicari — dari sofa ruang tamu hingga meja makan keluarga."
          />
          <LinkButton href="/shop" variant="outline" className="shrink-0">
            Lihat semua produk
          </LinkButton>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
