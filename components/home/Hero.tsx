"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LinkButton } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="border-b border-line">
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 py-14 lg:py-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 order-2 lg:order-1"
        >
          <p className="text-muted text-sm mb-5">Kerajinan kayu Jepara, dirancang ulang</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] text-ink tracking-tightish text-balance">
            Furnitur yang dibuat untuk ditinggali, bukan sekadar dipajang.
          </h1>
          <p className="mt-6 text-muted leading-relaxed max-w-md">
            Setiap potong kayu diukir tangan oleh pengrajin Jepara, lalu
            digambar ulang dengan garis yang bersih dan tenang — supaya
            betah dipakai bertahun-tahun, bukan sekadar tren musiman.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <LinkButton href="/shop" variant="primary">
              Lihat Koleksi
            </LinkButton>
            <LinkButton href="/about" variant="ghost" className="px-2">
              Kenali proses kami
            </LinkButton>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-md border-t border-line pt-8">
            <div>
              <p className="font-serif text-2xl text-ink">12+</p>
              <p className="text-xs text-muted mt-1">Tahun menganyam kayu</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-ink">400+</p>
              <p className="text-xs text-muted mt-1">Rumah terisi</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-ink">100%</p>
              <p className="text-xs text-muted mt-1">Kayu solid pilihan</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 order-1 lg:order-2"
        >
          <div className="relative aspect-[6/5] lg:aspect-[4/3]">
            <div className="absolute -inset-4 lg:-inset-6 bg-surface -z-10" />
            <Image
              src="https://nqyraajklsqxyido.public.blob.vercel-storage.com/Gemini_Generated_Image_50f32j50f.jpg"
              alt="Ruang tamu dengan sofa dan meja kayu Jepara"
              fill
              priority
              sizes="(min-width: 1024px) 60vw, 90vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
