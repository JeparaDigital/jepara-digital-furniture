"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle } from "lucide-react";
import { buildWhatsAppGeneralLink } from "@/lib/whatsapp";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/shop", label: "Koleksi" },
  { href: "/about", label: "Tentang" },
  { href: "/contact", label: "Kontak" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="font-serif text-xl text-ink">
          Jepara <span className="text-walnut">Digital</span> Furniture
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? "text-ink"
                  : "text-muted hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={buildWhatsAppGeneralLink(
              "Halo Jepara Digital Furniture, saya ingin bertanya tentang produk."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 border border-ink px-4 py-2 text-sm text-ink transition-colors hover:bg-ink hover:text-bg"
          >
            <MessageCircle size={16} strokeWidth={1.5} />
            Chat WhatsApp
          </a>

          <button
            className="md:hidden text-ink"
            onClick={() => setOpen((v) => !v)}
            aria-label="Buka menu"
          >
            {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-bg">
          <nav className="container flex flex-col py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-ink border-b border-line last:border-none"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={buildWhatsAppGeneralLink(
                "Halo Jepara Digital Furniture, saya ingin bertanya tentang produk."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 bg-ink text-bg px-4 py-3 text-sm"
            >
              <MessageCircle size={16} strokeWidth={1.5} />
              Chat WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
