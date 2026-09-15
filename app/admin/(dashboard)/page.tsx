import Link from "next/link";
import { Package, Tags, ClipboardList, AlertTriangle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatRupiah } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const [productCount, categoryCount, pendingOrders, lowStock, recentOrders] =
    await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.order.count({ where: { status: "PENDING" } }),
      prisma.product.findMany({ where: { stock: { lte: 3 } }, take: 5, orderBy: { stock: "asc" } }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { items: true },
      }),
    ]);

  const stats = [
    { label: "Total Produk", value: productCount, icon: Package, href: "/admin/products" },
    { label: "Kategori", value: categoryCount, icon: Tags, href: "/admin/categories" },
    { label: "Pesanan Baru", value: pendingOrders, icon: ClipboardList, href: "/admin/orders" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink">Dashboard</h1>
      <p className="mt-2 text-muted">Ringkasan toko Jepara Digital Furniture.</p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="border border-line p-6 hover:border-ink transition-colors bg-bg"
          >
            <stat.icon size={18} strokeWidth={1.5} className="text-walnut" />
            <p className="mt-4 font-serif text-3xl text-ink">{stat.value}</p>
            <p className="text-sm text-muted mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="border border-line bg-bg">
          <div className="p-5 border-b border-line flex items-center justify-between">
            <h2 className="text-ink text-sm">Pesanan Terbaru</h2>
            <Link href="/admin/orders" className="text-xs text-muted hover:text-ink">
              Lihat semua
            </Link>
          </div>
          <div className="divide-y divide-line">
            {recentOrders.length === 0 && (
              <p className="p-5 text-sm text-muted">Belum ada pesanan.</p>
            )}
            {recentOrders.map((order) => (
              <div key={order.id} className="p-5 flex items-center justify-between text-sm">
                <div>
                  <p className="text-ink">{order.items[0]?.productName ?? "-"}</p>
                  <p className="text-xs text-muted mt-1">
                    {new Date(order.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <p className="text-ink">{formatRupiah(order.total)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-line bg-bg">
          <div className="p-5 border-b border-line flex items-center gap-2">
            <AlertTriangle size={15} strokeWidth={1.5} className="text-walnut" />
            <h2 className="text-ink text-sm">Stok Menipis</h2>
          </div>
          <div className="divide-y divide-line">
            {lowStock.length === 0 && (
              <p className="p-5 text-sm text-muted">Semua stok aman.</p>
            )}
            {lowStock.map((product) => (
              <Link
                key={product.id}
                href={`/admin/products/${product.id}/edit`}
                className="p-5 flex items-center justify-between text-sm hover:bg-surface transition-colors"
              >
                <p className="text-ink">{product.name}</p>
                <p className="text-walnut">{product.stock} tersisa</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
