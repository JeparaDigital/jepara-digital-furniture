import { Category } from "@/types";

const img = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=900&auto=format&fit=crop`;

export const categories: Category[] = [
  {
    id: "1",
    name: "Sofa",
    slug: "sofa",
    image: img("photo-1555041469-a586c61ea9bc"),
    count: 2,
  },
  {
    id: "2",
    name: "Kursi",
    slug: "kursi",
    image: img("photo-1567538096630-e0c55bd6374c"),
    count: 2,
  },
  {
    id: "3",
    name: "Meja",
    slug: "meja",
    image: img("photo-1567016376408-0226e4d0c1ea"),
    count: 3,
  },
  {
    id: "4",
    name: "Tempat Tidur",
    slug: "tempat-tidur",
    image: img("photo-1554295405-abb8fd54f153"),
    count: 1,
  },
  {
    id: "5",
    name: "Penyimpanan",
    slug: "penyimpanan",
    image: img("photo-1519710164239-da123dc03ef4"),
    count: 3,
  },
  {
    id: "6",
    name: "Dekorasi",
    slug: "dekorasi",
    image: img("photo-1586023492125-27b2c045efd7"),
    count: 1,
  },
];
