"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutGrid,
  Package,
  Tags,
  ClipboardList,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutGrid },
  { href: "/admin/products", label: "Produk", icon: Package },
  { href: "/admin/categories", label: "Kategori", icon: Tags },
  { href: "/admin/orders", label: "Pesanan", icon: ClipboardList },
];

export function AdminSidebar({ adminName }: { adminName: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-line bg-surface/40">
      <div className="p-6">
        <p className="font-serif text-lg text-ink">
          Jepara <span className="text-walnut">Admin</span>
        </p>
        <p className="mt-1 text-xs text-muted truncate">{adminName}</p>
      </div>

      <nav className="px-3 space-y-1">
        {links.map((link) => {
          const active =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-sm transition-colors",
                active ? "bg-ink text-bg" : "text-ink hover:bg-surface"
              )}
            >
              <link.icon size={16} strokeWidth={1.5} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 mt-4 border-t border-line space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted hover:text-ink transition-colors"
        >
          <ExternalLink size={16} strokeWidth={1.5} />
          Lihat situs
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-muted hover:text-ink transition-colors"
        >
          <LogOut size={16} strokeWidth={1.5} />
          Keluar
        </button>
      </div>
    </aside>
  );
}
