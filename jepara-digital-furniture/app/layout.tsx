import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { AuthSessionProvider } from "@/components/providers/SessionProvider";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jepara Digital Furniture — Furnitur Kayu Jati Modern",
    template: "%s — Jepara Digital Furniture",
  },
  description:
    "Furnitur kayu jati buatan tangan pengrajin Jepara dengan desain modern minimalis bergaya Skandinavia. Sofa, kursi, meja, dan tempat tidur untuk rumah Anda.",
  keywords: [
    "furniture jepara",
    "mebel jati",
    "furnitur kayu",
    "sofa minimalis",
    "furniture skandinavia",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans bg-bg text-ink antialiased">
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
