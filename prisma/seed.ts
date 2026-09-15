import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const categoriesData = [
  { name: "Sofa", slug: "sofa", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=900&auto=format&fit=crop" },
  { name: "Kursi", slug: "kursi", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=900&auto=format&fit=crop" },
  { name: "Meja", slug: "meja", image: "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?q=80&w=900&auto=format&fit=crop" },
  { name: "Tempat Tidur", slug: "tempat-tidur", image: "https://images.unsplash.com/photo-1554295405-abb8fd54f153?q=80&w=900&auto=format&fit=crop" },
  { name: "Penyimpanan", slug: "penyimpanan", image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=900&auto=format&fit=crop" },
  { name: "Dekorasi", slug: "dekorasi", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=900&auto=format&fit=crop" },
];

const img = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=1200&auto=format&fit=crop`;

const productsData = [
  {
    slug: "sofa-linen-arden", name: "Sofa Linen Arden", category: "Sofa",
    price: 8750000, compareAtPrice: 10500000,
    description: "Sofa tiga dudukan dengan rangka kayu jati Jepara dan pelapis linen alami. Dibuat untuk menopang tubuh dengan lembut sekaligus tampil rapi di ruang tamu bergaya Skandinavia.",
    details: ["Rangka kayu jati solid, diproses kering oven", "Busa HD density tinggi, tidak cepat kempis", "Pelapis linen alami, mudah dilepas untuk dicuci", "Kaki kayu bulat finishing walnut"],
    material: "Kayu jati & linen", dimensions: "210 x 88 x 80 cm",
    images: [img("photo-1555041469-a586c61ea9bc"), img("photo-1550254478-ead40cc54513")],
    featured: true, isNew: true, stock: 6,
  },
  {
    slug: "kursi-santai-noor", name: "Kursi Santai Noor", category: "Kursi",
    price: 3250000,
    description: "Kursi santai berlengan dengan bentuk melengkung yang nyaman untuk sudut baca. Diukir tangan oleh pengrajin Jepara dengan detail sambungan tanpa paku ekspos.",
    details: ["Konstruksi sambungan pasak kayu tradisional", "Dudukan rotan sintetis tahan cuaca ringan", "Cocok untuk indoor maupun teras tertutup"],
    material: "Kayu mahoni & rotan", dimensions: "68 x 72 x 78 cm",
    images: [img("photo-1567538096630-e0c55bd6374c"), img("photo-1493663284031-b7e3aefcae8e")],
    featured: true, stock: 12,
  },
  {
    slug: "meja-makan-kaya", name: "Meja Makan Kaya", category: "Meja",
    price: 12500000,
    description: "Meja makan enam kursi dengan permukaan kayu solid bertekstur urat alami. Setiap papan dipilih tangan untuk memastikan pola serat yang menyatu.",
    details: ["Permukaan kayu jati solid tebal 3.8 cm", "Finishing natural oil, aman untuk makanan", "Menampung 6 orang dengan nyaman"],
    material: "Kayu jati solid", dimensions: "180 x 90 x 75 cm",
    images: [img("photo-1567016376408-0226e4d0c1ea"), img("photo-1586105251261-72a756497a11")],
    featured: true, stock: 4,
  },
  {
    slug: "rak-dinding-lova", name: "Rak Dinding Lova", category: "Penyimpanan",
    price: 1950000,
    description: "Rak dinding minimalis dua tingkat untuk menyimpan buku dan pajangan kecil. Desain ramping yang tidak memakan banyak ruang visual.",
    details: ["Braket besi hitam matte", "Papan kayu mindi solid", "Termasuk dudukan pemasangan dinding"],
    material: "Kayu mindi & besi", dimensions: "80 x 20 x 45 cm",
    images: [img("photo-1519710164239-da123dc03ef4"), img("photo-1524758631624-e2822e304c36")],
    stock: 20,
  },
  {
    slug: "tempat-tidur-hana", name: "Tempat Tidur Hana", category: "Tempat Tidur",
    price: 6800000,
    description: "Ranjang ukuran queen dengan headboard melengkung berlapis kain bouclé. Rangka kayu tersembunyi memberi kesan headboard yang mengambang.",
    details: ["Ukuran queen (160 x 200 cm)", "Headboard bouclé, empuk dan hangat", "Rangka penyangga kayu jati"],
    material: "Kayu jati & bouclé", dimensions: "170 x 210 x 110 cm",
    images: [img("photo-1554295405-abb8fd54f153"), img("photo-1505693416388-ac5ce068fe85")],
    featured: true, stock: 5,
  },
  {
    slug: "kursi-makan-elan", name: "Kursi Makan Elan", category: "Kursi",
    price: 1450000,
    description: "Kursi makan dengan sandaran kayu melengkung dan dudukan empuk. Dijual per unit, cocok dipadukan dengan Meja Makan Kaya.",
    details: ["Sandaran kayu jati laminasi lengkung", "Dudukan busa dilapis kain katun tebal", "Kaki anti gores untuk lantai kayu"],
    material: "Kayu jati & katun", dimensions: "48 x 55 x 82 cm",
    images: [img("photo-1503602642458-232111445657"), img("photo-1567538096630-e0c55bd6374c")],
    isNew: true, stock: 24,
  },
  {
    slug: "meja-kopi-doma", name: "Meja Kopi Doma", category: "Meja",
    price: 2450000,
    description: "Meja kopi bulat dengan kaki tripod kayu solid. Ukuran ringkas, pas untuk sofa dua hingga tiga dudukan.",
    details: ["Bentuk bulat diameter 70 cm", "Kaki tripod kayu jati solid", "Finishing natural matte"],
    material: "Kayu jati solid", dimensions: "70 x 70 x 42 cm",
    images: [img("photo-1533090161767-e6ffed986c88"), img("photo-1586023492125-27b2c045efd7")],
    stock: 10,
  },
  {
    slug: "lemari-pakaian-sena", name: "Lemari Pakaian Sena", category: "Penyimpanan",
    price: 9200000,
    description: "Lemari pakaian tiga pintu dengan pegangan kuningan dan interior tertata untuk gantungan serta rak lipat.",
    details: ["Tiga pintu dengan engsel soft-close", "Interior: 1 rak gantung + 4 rak lipat", "Pegangan kuningan solid"],
    material: "Kayu jati & kuningan", dimensions: "150 x 60 x 200 cm",
    images: [img("photo-1595428774223-ef52624120d2"), img("photo-1519710164239-da123dc03ef4")],
    stock: 3,
  },
  {
    slug: "nakas-orin", name: "Nakas Orin", category: "Penyimpanan",
    price: 1650000,
    description: "Nakas satu laci dengan rak terbuka di bagian bawah, ukuran ramping untuk sisi ranjang.",
    details: ["Satu laci dengan rel penuh", "Rak terbuka untuk buku atau lampu", "Kayu solid dengan sambungan ekor burung"],
    material: "Kayu mindi solid", dimensions: "45 x 38 x 55 cm",
    images: [img("photo-1505693314120-0d443867891c"), img("photo-1554295405-abb8fd54f153")],
    stock: 15,
  },
  {
    slug: "sofa-tunggal-brisa", name: "Sofa Tunggal Brisa", category: "Sofa",
    price: 4100000,
    description: "Armchair satu dudukan dengan bentuk membulat lembut, dilapis bouclé krem yang hangat di mata dan sentuhan.",
    details: ["Rangka kayu jati dalam, dilapis busa dingin", "Pelapis bouclé warna krem netral", "Kaki kayu meruncing gaya Skandinavia"],
    material: "Kayu jati & bouclé", dimensions: "78 x 80 x 76 cm",
    images: [img("photo-1550254478-ead40cc54513"), img("photo-1567538096630-e0c55bd6374c")],
    isNew: true, stock: 8,
  },
  {
    slug: "meja-kerja-tera", name: "Meja Kerja Tera", category: "Meja",
    price: 3600000,
    description: "Meja kerja dengan satu laci dan kaki miring khas mid-century. Permukaan cukup luas untuk laptop dan buku catatan.",
    details: ["Satu laci dengan kunci", "Kaki miring kayu jati solid", "Permukaan finishing anti gores"],
    material: "Kayu jati solid", dimensions: "120 x 60 x 75 cm",
    images: [img("photo-1519710164239-da123dc03ef4"), img("photo-1586105251261-72a756497a11")],
    stock: 9,
  },
  {
    slug: "cermin-lantai-arum", name: "Cermin Lantai Arum", category: "Dekorasi",
    price: 1250000,
    description: "Cermin lantai dengan bingkai kayu melengkung alami, menjadi aksen hangat di sudut kamar atau lorong.",
    details: ["Bingkai kayu jati bentuk organik", "Cermin tebal 5mm anti buram", "Dudukan kaki stabil di dua titik"],
    material: "Kayu jati & kaca", dimensions: "50 x 4 x 160 cm",
    images: [img("photo-1586023492125-27b2c045efd7"), img("photo-1524758631624-e2822e304c36")],
    stock: 11,
  },
];

async function main() {
  console.log("Seeding categories...");
  const categoryMap = new Map<string, string>();
  for (const cat of categoriesData) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, image: cat.image },
      create: cat,
    });
    categoryMap.set(cat.name, created.id);
  }

  console.log("Seeding products...");
  for (const p of productsData) {
    const categoryId = categoryMap.get(p.category);
    if (!categoryId) continue;
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        description: p.description,
        details: p.details,
        material: p.material,
        dimensions: p.dimensions,
        images: p.images,
        featured: p.featured ?? false,
        isNew: p.isNew ?? false,
        stock: p.stock,
        categoryId,
      },
      create: {
        slug: p.slug,
        name: p.name,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        description: p.description,
        details: p.details,
        material: p.material,
        dimensions: p.dimensions,
        images: p.images,
        featured: p.featured ?? false,
        isNew: p.isNew ?? false,
        stock: p.stock,
        categoryId,
      },
    });
  }

  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@jeparadigitalfurniture.id";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ubah-password-ini";
  const hashed = await bcrypt.hash(adminPassword, 10);

  console.log(`Seeding admin account (${adminEmail})...`);
  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashed,
      name: "Admin Jepara Digital Furniture",
    },
  });

  console.log("Seed selesai.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
