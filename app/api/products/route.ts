import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { slugify } from "@/lib/utils";

export async function GET() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const required = ["name", "categoryId", "price", "description", "material", "dimensions"];
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json({ error: `Field ${field} wajib diisi` }, { status: 400 });
    }
  }

  const baseSlug = slugify(body.name);
  let slug = baseSlug;
  let counter = 1;
  while (await prisma.product.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter++}`;
  }

  const product = await prisma.product.create({
    data: {
      name: body.name,
      slug,
      price: Number(body.price),
      compareAtPrice: body.compareAtPrice ? Number(body.compareAtPrice) : null,
      description: body.description,
      details: Array.isArray(body.details) ? body.details : [],
      material: body.material,
      dimensions: body.dimensions,
      images: Array.isArray(body.images) ? body.images : [],
      stock: Number(body.stock ?? 0),
      featured: Boolean(body.featured),
      isNew: Boolean(body.isNew),
      categoryId: body.categoryId,
    },
  });

  return NextResponse.json(product, { status: 201 });
}
