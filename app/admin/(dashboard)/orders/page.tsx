import { prisma } from "@/lib/prisma";
import { formatRupiah } from "@/lib/utils";
import { OrderStatusBadge } from "@/components/admin/OrderStatusBadge";
import Link from "next/link";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink">Pesanan</h1>
      <p className="mt-2 text-muted">
        Tercatat otomatis setiap ada pelanggan klik &ldquo;Pesan via WhatsApp&rdquo;.
      </p>

      <div className="mt-8 border border-line bg-bg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-muted">
              <th className="p-4 font-normal">Tanggal</th>
              <th className="p-4 font-normal">Produk</th>
              <th className="p-4 font-normal">Jumlah</th>
              <th className="p-4 font-normal">Total</th>
              <th className="p-4 font-normal">Status</th>
              <th className="p-4 font-normal text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-line last:border-none">
                <td className="p-4 text-muted whitespace-nowrap">
                  {new Date(order.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="p-4 text-ink">
                  {order.items.map((i) => i.productName).join(", ")}
                </td>
                <td className="p-4 text-muted">
                  {order.items.reduce((sum, i) => sum + i.quantity, 0)}
                </td>
                <td className="p-4 text-ink">{formatRupiah(order.total)}</td>
                <td className="p-4">
                  <OrderStatusBadge status={order.status} />
                </td>
                <td className="p-4 text-right">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="text-muted hover:text-ink text-xs"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <p className="p-8 text-center text-muted text-sm">Belum ada pesanan.</p>
        )}
      </div>
    </div>
  );
}
