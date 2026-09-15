import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(orders);
}

// Dipanggil dari tombol "Pesan via WhatsApp" di halaman produk (publik, tanpa login)
// untuk mencatat riwayat pesanan sebelum membuka chat WhatsApp.
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { productId, quantity } = body;

  if (!productId || !quantity || quantity < 1) {
    return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });
  }

  const subtotal = product.price * Number(quantity);

  const order = await prisma.order.create({
    data: {
      total: subtotal,
      items: {
        create: [
          {
            productId: product.id,
            productName: product.name,
            quantity: Number(quantity),
            price: product.price,
            subtotal,
          },
        ],
      },
    },
    include: { items: true },
  });

  return NextResponse.json(order, { status: 201 });
}
