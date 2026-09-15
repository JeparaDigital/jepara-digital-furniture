"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { buildWhatsAppGeneralLink } from "@/lib/whatsapp";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = [
      `Halo Jepara Digital Furniture, saya ingin menghubungi tim Anda.`,
      ``,
      `Nama: ${form.name}`,
      `Email: ${form.email}`,
      `Pesan: ${form.message}`,
    ].join("\n");

    window.open(buildWhatsAppGeneralLink(text), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      <div>
        <label className="text-sm text-ink block mb-2" htmlFor="name">
          Nama
        </label>
        <input
          id="name"
          required
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none focus:border-ink"
          placeholder="Nama lengkap Anda"
        />
      </div>

      <div>
        <label className="text-sm text-ink block mb-2" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none focus:border-ink"
          placeholder="nama@email.com"
        />
      </div>

      <div>
        <label className="text-sm text-ink block mb-2" htmlFor="message">
          Pesan
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className="w-full border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none focus:border-ink resize-none"
          placeholder="Ceritakan kebutuhan furnitur Anda..."
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 bg-ink text-bg px-8 py-4 text-sm transition-colors hover:bg-walnut"
      >
        <Send size={16} strokeWidth={1.5} />
        Kirim via WhatsApp
      </button>
    </form>
  );
}
