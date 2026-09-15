import { Product } from "@/types";
import { formatRupiah } from "./utils";

// Nomor WhatsApp tujuan (format internasional tanpa "+" dan tanpa spasi)
export const WHATSAPP_NUMBER = "6285600658010";

interface OrderDetail {
  product: Product;
  quantity: number;
}

/**
 * Membuat link wa.me dengan pesan otomatis berisi detail produk.
 * Menggantikan fungsi "keranjang" konvensional — klik tombol langsung
 * membuka chat WhatsApp dengan pesan siap kirim.
 */
export function buildWhatsAppOrderLink({ product, quantity }: OrderDetail): string {
  const productUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/product/${product.slug}`
      : `/product/${product.slug}`;

  const subtotal = product.price * quantity;

  const lines = [
    `Halo Jepara Digital Furniture, saya ingin memesan produk berikut:`,
    ``,
    `Produk: ${product.name}`,
    `Kategori: ${product.category}`,
    `Jumlah: ${quantity} pcs`,
    `Harga satuan: ${formatRupiah(product.price)}`,
    `Subtotal: ${formatRupiah(subtotal)}`,
    `Link produk: ${productUrl}`,
    ``,
    `Mohon info ketersediaan dan ongkos kirimnya. Terima kasih.`,
  ];

  const message = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

export function buildWhatsAppGeneralLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
