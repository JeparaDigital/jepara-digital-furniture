import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { slugify } from "@/lib/utils";

interface Params {
  params: { id: string };
}

export async function GET(_req: NextRequest, { params }: Params) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { category: true },
  });
  if (!product) return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const existing = await prisma.product.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });

  let slug = existing.slug;
  if (body.name && body.name !== existing.name) {
    const baseSlug = slugify(body.name);
    slug = baseSlug;
    let counter = 1;
    while (
      await prisma.product.findFirst({ where: { slug, NOT: { id: params.id } } })
    ) {
      slug = `${baseSlug}-${counter++}`;
    }
  }

  const product = await prisma.product.update({
    where: { id: params.id },
    data: {
      name: body.name ?? existing.name,
      slug,
      price: body.price !== undefined ? Number(body.price) : existing.price,
      compareAtPrice:
        body.compareAtPrice !== undefined
          ? body.compareAtPrice
            ? Number(body.compareAtPrice)
            : null
          : existing.compareAtPrice,
      description: body.description ?? existing.description,
      details: Array.isArray(body.details) ? body.details : existing.details,
      material: body.material ?? existing.material,
      dimensions: body.dimensions ?? existing.dimensions,
      images: Array.isArray(body.images) ? body.images : existing.images,
      stock: body.stock !== undefined ? Number(body.stock) : existing.stock,
      featured: body.featured !== undefined ? Boolean(body.featured) : existing.featured,
      isNew: body.isNew !== undefined ? Boolean(body.isNew) : existing.isNew,
      categoryId: body.categoryId ?? existing.categoryId,
    },
  });

  return NextResponse.json(product);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.product.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      {
        error:
          "Produk tidak bisa dihapus karena masih memiliki riwayat pesanan. Turunkan stok ke 0 sebagai alternatif.",
      },
      { status: 400 }
    );
  }
}
