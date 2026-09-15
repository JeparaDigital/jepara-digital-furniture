"use client";

import { ChangeEvent, useRef, useState } from "react";
import { Upload, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  onUploaded: (url: string) => void;
  label?: string;
}

export function ImageUploader({ onUploaded, label = "Upload dari Komputer" }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error ?? "Upload gagal, coba lagi.");
        return;
      }

      onUploaded(data.url);
    } catch {
      setError("Upload gagal. Periksa koneksi Anda.");
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className="inline-flex items-center gap-2 border border-line px-4 py-2.5 text-sm text-ink hover:border-ink transition-colors disabled:opacity-60"
      >
        {loading ? (
          <Loader2 size={14} strokeWidth={1.5} className="animate-spin" />
        ) : (
          <Upload size={14} strokeWidth={1.5} />
        )}
        {loading ? "Mengunggah..." : label}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
    </div>
  );
}
