import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatRupiah } from "@/lib/utils";
import { OrderStatusSelect } from "@/components/admin/OrderStatusSelect";

interface Props {
  params: { id: string };
}

export default async function OrderDetailPage({ params }: Props) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { items: true },
  });

  if (!order) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-3xl text-ink">Detail Pesanan</h1>
      <p className="mt-2 text-muted">
        {new Date(order.createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>

      <div className="mt-8 border border-line bg-bg divide-y divide-line">
        {order.items.map((item) => (
          <div key={item.id} className="p-5 flex items-center justify-between text-sm">
            <div>
              <p className="text-ink">{item.productName}</p>
              <p className="text-xs text-muted mt-1">
                {item.quantity} x {formatRupiah(item.price)}
              </p>
            </div>
            <p className="text-ink">{formatRupiah(item.subtotal)}</p>
          </div>
        ))}
        <div className="p-5 flex items-center justify-between text-sm">
          <p className="text-ink">Total</p>
          <p className="text-ink">{formatRupiah(order.total)}</p>
        </div>
      </div>

      <div className="mt-8">
        <label className="text-sm text-ink block mb-2">Status Pesanan</label>
        <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
      </div>
    </div>
  );
}
