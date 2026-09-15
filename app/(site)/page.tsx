import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Categories } from "@/components/home/Categories";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";
import { getFeaturedProducts, getCategories } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  return (
    <>
      <Hero />
      <FeaturedProducts products={featuredProducts} />
      <Categories categories={categories} />
      <Testimonials />
      <Newsletter />
    </>
  );
}
