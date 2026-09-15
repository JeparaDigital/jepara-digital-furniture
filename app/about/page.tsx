import type { Metadata } from "next";
import Image from "next/image";
import { Hammer, Leaf, Truck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Kenali proses dan nilai di balik Jepara Digital Furniture — dari bengkel kayu hingga ruang tamu Anda.",
};

const values = [
  {
    icon: Hammer,
    title: "Diukir tangan",
    description:
      "Setiap sambungan dikerjakan pengrajin dengan teknik yang diwariskan turun-temurun di Jepara, bukan produksi massal mesin.",
  },
  {
    icon: Leaf,
    title: "Kayu bertanggung jawab",
    description:
      "Kami menggunakan kayu jati dan mindi dari sumber legal, dipilih satu per satu untuk pola serat terbaik.",
  },
  {
    icon: Truck,
    title: "Dikirim hati-hati",
    description:
      "Dikemas dengan bantalan kayu tambahan pada titik rawan, lalu dipantau sampai tiba di rumah Anda.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-line">
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-10 py-14 lg:py-20 items-center">
          <div className="lg:col-span-5">
            <h1 className="font-serif text-4xl md:text-5xl text-ink tracking-tightish text-balance">
              Dari bengkel kayu Jepara ke ruang duduk Anda.
            </h1>
            <p className="mt-6 text-muted leading-relaxed">
              Jepara Digital Furniture berangkat dari satu pertanyaan
              sederhana: bagaimana membawa keahlian ukir kayu Jepara yang
              sudah berumur ratusan tahun ke rumah modern, tanpa kehilangan
              karakter aslinya. Kami bekerja langsung dengan pengrajin lokal,
              menerjemahkan teknik mereka ke dalam bentuk yang bersih dan
              fungsional.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10]">
              <Image
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1600&auto=format&fit=crop"
                alt="Pengrajin kayu Jepara sedang bekerja"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container">
          <SectionHeading
            title="Nilai yang kami pegang"
            align="center"
            className="mx-auto mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center border border-line">
                  <Icon size={20} strokeWidth={1.5} className="text-walnut" />
                </div>
                <h3 className="mt-5 text-ink">{title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed max-w-xs mx-auto">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="container py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[4/3]">
            <Image
              src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1400&auto=format&fit=crop"
              alt="Detail ukiran kayu"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-ink tracking-tightish text-balance">
              Kualitas yang terlihat dari dekat
            </h2>
            <p className="mt-4 text-muted leading-relaxed max-w-md">
              Kami percaya furnitur yang baik terasa jujur — kayunya
              memperlihatkan urat aslinya, sambungannya rapi tanpa perlu
              ditutupi, dan bentuknya bertahan lama tanpa harus mengikuti
              tren yang cepat berganti.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
