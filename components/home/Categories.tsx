import Image from "next/image";
import Link from "next/link";
import { Category } from "@/types";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Categories({ categories }: { categories: Category[] }) {
  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="container">
        <SectionHeading
          title="Jelajahi berdasarkan ruang"
          description="Mulai dari satu kategori, atau kombinasikan beberapa untuk melengkapi satu ruangan penuh."
          className="mb-12"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(min-width: 1024px) 16vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.06]"
                />
              </div>
              <p className="mt-3 text-ink text-sm">{category.name}</p>
              <p className="text-xs text-muted">{category.count} produk</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
