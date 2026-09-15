import { cn } from "@/lib/utils";

const statusLabel: Record<string, string> = {
  PENDING: "Baru",
  CONFIRMED: "Dikonfirmasi",
  SHIPPED: "Dikirim",
  COMPLETED: "Selesai",
  CANCELLED: "Dibatalkan",
};

const statusColor: Record<string, string> = {
  PENDING: "bg-surface text-ink",
  CONFIRMED: "bg-walnut/15 text-walnut-dark",
  SHIPPED: "bg-walnut/25 text-walnut-dark",
  COMPLETED: "bg-ink text-bg",
  CANCELLED: "bg-red-50 text-red-600",
};

export function OrderStatusBadge({ status }: { status: string }) {
  return (
    <span className={cn("inline-block px-2.5 py-1 text-xs", statusColor[status])}>
      {statusLabel[status] ?? status}
    </span>
  );
}
