import Link from "next/link";
import { Instagram, MessageCircle, Mail } from "lucide-react";
import { buildWhatsAppGeneralLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="container py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link href="/" className="font-serif text-xl text-ink">
            Jepara <span className="text-walnut">Digital</span> Furniture
          </Link>
          <p className="mt-4 max-w-sm text-muted leading-relaxed">
            Furnitur kayu buatan tangan pengrajin Jepara, dirancang dengan
            garis bersih dan material jujur untuk rumah modern Anda.
          </p>
        </div>

        <div>
          <h4 className="text-ink text-sm mb-4">Navigasi</h4>
          <ul className="space-y-3 text-muted text-sm">
            <li><Link href="/shop" className="hover:text-ink">Koleksi</Link></li>
            <li><Link href="/about" className="hover:text-ink">Tentang Kami</Link></li>
            <li><Link href="/contact" className="hover:text-ink">Kontak</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-ink text-sm mb-4">Hubungi Kami</h4>
          <ul className="space-y-3 text-muted text-sm">
            <li>
              <a
                href={buildWhatsAppGeneralLink("Halo Jepara Digital Furniture!")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-ink"
              >
                <MessageCircle size={16} strokeWidth={1.5} />
                +62 856-0065-8010
              </a>
            </li>
            <li>
              <a
                href="mailto:halo@jeparadigitalfurniture.id"
                className="inline-flex items-center gap-2 hover:text-ink"
              >
                <Mail size={16} strokeWidth={1.5} />
                halo@jeparadigitalfurniture.id
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-ink"
              >
                <Instagram size={16} strokeWidth={1.5} />
                @jeparadigitalfurniture
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container py-6 flex flex-col sm:flex-row gap-2 items-center justify-between text-xs text-muted">
          <p>© {new Date().getFullYear()} Jepara Digital Furniture. Semua hak cipta dilindungi.</p>
          <p>Dibuat dengan kayu, bukan MDF.</p>
        </div>
      </div>
    </footer>
  );
}
