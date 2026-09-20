import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatRupiah } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
        />
        {product.isNew && (
          <span className="absolute left-3 top-3 bg-bg/90 px-2.5 py-1 text-xs text-ink">
            Baru
          </span>
        )}
        {product.compareAtPrice && (
          <span className="absolute right-3 top-3 bg-walnut px-2.5 py-1 text-xs text-bg">
            Diskon
          </span>
        )}
      </div>
      <div className="mt-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2">
        <div>
          <h3 className="text-ink text-[15px]">{product.name}</h3>
          <p className="mt-1 text-sm text-muted">{product.category}</p>
        </div>
        <div className="sm:text-right">
          <p className="text-ink text-[15px]">{formatRupiah(product.price)}</p>
          {product.compareAtPrice && (
            <p className="text-sm text-muted line-through">
              {formatRupiah(product.compareAtPrice)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
