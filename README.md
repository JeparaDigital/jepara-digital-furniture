# Jepara Digital Furniture

Website e-commerce furniture modern bergaya Skandinavia, dibangun dengan Next.js 14 (App Router), TypeScript, Tailwind CSS, **Prisma + PostgreSQL**, dan **NextAuth** untuk panel admin.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** — dengan design token khusus (warna, font)
- **Lucide React** — icon
- **Framer Motion** — animasi ringan di Hero
- **Prisma + PostgreSQL** — database produk, kategori, dan pesanan
- **NextAuth (Credentials)** — login admin

## Fitur

### Situs publik
1. **Homepage** — Hero, Featured Products, Categories, Testimonials, Newsletter
2. **Shop / Koleksi** — filter kategori + urutkan harga/terbaru (`/shop?category=...&sort=...`)
3. **Product Detail** — galeri gambar, harga, deskripsi, tab (Detail Produk / Spesifikasi / Pengiriman & Retur), related products
4. **About** & **Contact**
5. Fully responsive

### Panel Admin (`/admin`)
- **Login** dengan email + password (NextAuth, session JWT)
- **Dashboard** — total produk, kategori, pesanan baru, stok menipis, pesanan terbaru
- **Kelola Produk** — tambah, edit, hapus, atur harga/stok/status unggulan-baru, banyak gambar (via URL)
- **Kelola Kategori** — tambah & hapus kategori
- **Riwayat Pesanan** — setiap klik "Pesan via WhatsApp" di situs otomatis tercatat di sini; admin bisa ubah status (Baru → Dikonfirmasi → Dikirim → Selesai / Dibatalkan)

Semua rute di bawah `/admin` (kecuali `/admin/login`) dilindungi middleware — otomatis redirect ke halaman login jika belum masuk.

## "Keranjang" via WhatsApp

Tombol **"Pesan via WhatsApp"** di halaman produk akan:
1. Mencatat pesanan ke database (tabel `Order`/`OrderItem`) via `/api/orders`
2. Membuka chat ke `+62 856-0065-8010` dengan pesan otomatis berisi nama produk, jumlah, harga satuan, subtotal, dan link produk

Logic link WhatsApp ada di `lib/whatsapp.ts` (`buildWhatsAppOrderLink`) — ubah `WHATSAPP_NUMBER` di sana untuk mengganti nomor tujuan.

## Struktur Folder

```
app/
  layout.tsx                # Root layout (font, session provider)
  (site)/                   # Grup halaman publik (pakai Navbar/Footer)
    layout.tsx
    page.tsx                # Homepage
    shop/page.tsx
    product/[slug]/page.tsx
    about/page.tsx
    contact/page.tsx
  admin/
    login/page.tsx           # Login (tanpa sidebar)
    (dashboard)/              # Grup halaman terproteksi (pakai sidebar)
      layout.tsx
      page.tsx                # Dashboard
      products/                # List, tambah, edit produk
      categories/page.tsx
      orders/                  # List & detail pesanan
  api/
    auth/[...nextauth]/route.ts
    products/route.ts          # GET list, POST create
    products/[id]/route.ts     # GET, PUT, DELETE
    categories/route.ts
    categories/[id]/route.ts
    orders/route.ts            # POST dipanggil dari tombol WA (publik)
    orders/[id]/route.ts       # PATCH status (admin)
components/
  layout/                   # Navbar, Footer
  ui/                       # Button, ProductCard, SectionHeading
  home/                     # Hero, FeaturedProducts, Categories, Testimonials, Newsletter
  shop/                     # ProductFilter
  product/                  # ProductGallery, AddToCartWhatsApp, ProductTabs, ContactForm
  admin/                    # AdminSidebar, ProductForm, CategoryManager, DeleteProductButton, OrderStatusSelect/Badge
  providers/                # SessionProvider wrapper
prisma/
  schema.prisma             # Admin, Category, Product, Order, OrderItem
  seed.ts                   # Isi data awal + akun admin pertama
lib/
  prisma.ts                 # Prisma client singleton
  auth.ts                   # Konfigurasi NextAuth
  session.ts                # Helper cek session di API route
  data.ts                   # Query produk/kategori untuk situs publik
  utils.ts                  # formatRupiah, cn, slugify
  whatsapp.ts                # Generator link WhatsApp
types/
  index.ts                  # Product, Category, Testimonial
  next-auth.d.ts             # Augmentasi tipe session
```

## Setup Database & Admin (WAJIB sebelum menjalankan)

1. **Siapkan database PostgreSQL.** Paling mudah pakai layanan gratis:
   - [Supabase](https://supabase.com) → New Project → Settings → Database → Connection string (pilih mode "Session" atau "Transaction pooler")
   - atau [Neon](https://neon.tech), atau Vercel Postgres

2. **Salin `.env.example` jadi `.env`** dan isi:
   ```bash
   cp .env.example .env
   ```
   - `DATABASE_URL` — connection string dari langkah 1
   - `NEXTAUTH_SECRET` — generate dengan `openssl rand -base64 32`
   - `NEXTAUTH_URL` — `http://localhost:3000` untuk lokal, ganti ke domain Vercel saat deploy
   - `ADMIN_EMAIL` & `ADMIN_PASSWORD` — kredensial admin pertama (hanya dipakai saat seeding)

3. **Install dependency, buat tabel, dan isi data awal:**
   ```bash
   npm install
   npm run db:push     # membuat tabel di database sesuai schema.prisma
   npm run db:seed     # isi 12 produk contoh + 6 kategori + 1 akun admin
   ```

4. **Jalankan:**
   ```bash
   npm run dev
   ```
   - Situs: [http://localhost:3000](http://localhost:3000)
   - Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login) — masuk dengan `ADMIN_EMAIL` / `ADMIN_PASSWORD` dari `.env`

   Setelah berhasil seed & login pertama kali, `ADMIN_PASSWORD` di `.env` boleh dihapus (password sudah tersimpan ter-hash di database). Untuk menambah admin lain atau reset password, edit langsung lewat `npm run db:studio` (Prisma Studio) atau buat script kecil terpisah.

## Build Production

```bash
npm run build
npm start
```

`npm run build` otomatis menjalankan `prisma generate` lebih dulu (lihat `scripts.build` di `package.json`).

## Deploy ke Vercel

1. Push project ke GitHub.
2. Buka [vercel.com/new](https://vercel.com/new), import repository.
3. Di **Environment Variables**, isi `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` (isi dengan URL produksi Vercel, mis. `https://toko-anda.vercel.app`), `ADMIN_EMAIL`, `ADMIN_PASSWORD`.
4. Deploy.
5. Setelah deploy pertama berhasil, jalankan seed sekali dari lokal dengan `DATABASE_URL` produksi (atau lewat `vercel env pull` lalu `npm run db:seed`) untuk membuat akun admin & data awal di database produksi.

## Mengganti Data Produk

Produk sekarang dikelola sepenuhnya lewat **panel admin** (`/admin/products`) — tidak perlu edit kode lagi:
- Tambah/edit produk: isi nama, kategori, harga, stok, deskripsi, material, dimensi, poin detail, dan URL gambar.
- Gambar memakai **URL**, bukan upload file — unggah dulu ke layanan seperti Cloudinary/ImageKit/Vercel Blob, lalu tempel URL-nya. (Upload file langsung dari admin bisa ditambahkan kalau diperlukan — perlu koneksi ke storage eksternal.)
- Kategori dikelola di `/admin/categories`.

`prisma/seed.ts` hanya dipakai untuk **data awal** saat setup pertama kali — setelah itu semua perubahan lewat admin panel, bukan edit file.

## Catatan

- Newsletter dan form kontak di situs publik masih dummy (tidak terhubung ke email provider). Sambungkan ke layanan seperti Resend atau Mailchimp sesuai kebutuhan.
- Testimonial di homepage masih data statis (`data/testimonials.ts`) — belum dipindah ke database karena di luar cakupan awal; bisa ditambahkan kalau perlu.
- Warna dan font sudah didefinisikan sebagai design token di `tailwind.config.ts` — ubah di satu tempat untuk rebrand.
- Login admin sengaja dibuat ringan: satu akun admin tanpa sistem role/permission bertingkat. Kalau ke depannya butuh multi-admin dengan hak akses berbeda, tabel `Admin` dan `authOptions` di `lib/auth.ts` adalah titik awal yang tepat untuk dikembangkan.

