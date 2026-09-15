import { Hero } from "@/components/Hero";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Categories } from "@/components/Categories";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";
import { prisma } from "@/lib/prisma"; // sesuaikan path-nya

export default async function HomePage() {
  const products = await prisma.product.findMany({
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Hero />
      <FeaturedProducts products={products} />
      <Categories />
      <Testimonials />
      <Newsletter />
    </>
  );
}