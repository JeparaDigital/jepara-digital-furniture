import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ContactForm } from "@/components/product/ContactForm";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Hubungi Jepara Digital Furniture untuk pertanyaan produk, pemesanan, atau kerja sama.",
};

const info = [
  {
    icon: MapPin,
    label: "Showroom",
    value: "Jl. Ukir Kayu No. 12, Jepara, Jawa Tengah",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+62 856-0065-8010",
  },
  {
    icon: Mail,
    label: "Email",
    value: "halo@jeparadigitalfurniture.id",
  },
  {
    icon: Clock,
    label: "Jam Operasional",
    value: "Senin – Sabtu, 09.00 – 17.00 WIB",
  },
];

export default function ContactPage() {
  return (
    <div className="container py-14 lg:py-20">
      <div className="max-w-xl">
        <h1 className="font-serif text-4xl text-ink tracking-tightish">Hubungi Kami</h1>
        <p className="mt-3 text-muted leading-relaxed">
          Ada pertanyaan soal ukuran, material, atau pengiriman? Isi formulir
          di bawah dan pesan Anda akan langsung terkirim ke WhatsApp tim kami.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <ContactForm />

        <div className="space-y-8 lg:pl-10 lg:border-l border-line">
          {info.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-line">
                <Icon size={18} strokeWidth={1.5} className="text-walnut" />
              </div>
              <div>
                <p className="text-xs text-muted">{label}</p>
                <p className="text-sm text-ink mt-1">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
