"use client";

import { useState } from "react";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

const tabs = ["Detail Produk", "Spesifikasi", "Pengiriman & Retur"] as const;
type Tab = (typeof tabs)[number];

export function ProductTabs({ product }: { product: Product }) {
  const [active, setActive] = useState<Tab>("Detail Produk");

  return (
    <div className="mt-16 lg:mt-20">
      <div className="flex gap-8 border-b border-line">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={cn(
              "pb-4 text-sm transition-colors -mb-px border-b",
              active === tab
                ? "text-ink border-ink"
                : "text-muted border-transparent hover:text-ink"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="py-8 max-w-2xl">
        {active === "Detail Produk" && (
          <div className="space-y-4 text-muted leading-relaxed">
            <p>{product.description}</p>
            <ul className="space-y-2">
              {product.details.map((detail) => (
                <li key={detail} className="text-ink text-sm">
                  — {detail}
                </li>
              ))}
            </ul>
          </div>
        )}

        {active === "Spesifikasi" && (
          <dl className="divide-y divide-line">
            <div className="flex justify-between py-3 text-sm">
              <dt className="text-muted">Material</dt>
              <dd className="text-ink">{product.material}</dd>
            </div>
            <div className="flex justify-between py-3 text-sm">
              <dt className="text-muted">Dimensi</dt>
              <dd className="text-ink">{product.dimensions}</dd>
            </div>
            <div className="flex justify-between py-3 text-sm">
              <dt className="text-muted">Kategori</dt>
              <dd className="text-ink">{product.category}</dd>
            </div>
            <div className="flex justify-between py-3 text-sm">
              <dt className="text-muted">Stok tersedia</dt>
              <dd className="text-ink">{product.stock} unit</dd>
            </div>
            <div className="flex justify-between py-3 text-sm">
              <dt className="text-muted">Perawatan</dt>
              <dd className="text-ink">Lap kering, hindari sinar matahari langsung</dd>
            </div>
          </dl>
        )}

        {active === "Pengiriman & Retur" && (
          <div className="space-y-4 text-muted leading-relaxed text-sm">
            <p>
              Setiap produk dikirim dengan pengemasan kayu tambahan pada
              titik rawan benturan. Estimasi pengiriman 3–10 hari kerja
              tergantung lokasi tujuan dari Jepara.
            </p>
            <p>
              Ongkos kirim dihitung berdasarkan berat, dimensi, dan kota
              tujuan — akan diinfokan tim kami saat konfirmasi pesanan via
              WhatsApp.
            </p>
            <p>
              Retur dapat diajukan maksimal 2x24 jam setelah barang diterima
              apabila terdapat cacat produksi atau kerusakan saat pengiriman,
              disertai foto/video sebagai bukti.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
