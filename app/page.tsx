import { Hero } from "@/components//home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Categories } from "@/components/home/Categories";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";
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