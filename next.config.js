/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Vercel Blob (hasil upload dari panel admin)
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        // Admin bisa tempel URL gambar dari domain manapun (Cloudinary, Imgur, dll).
        // Aman karena hanya admin yang login yang bisa mengisi field ini, bukan input publik.
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
