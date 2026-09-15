import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <SectionHeading
          title="Cerita dari rumah pelanggan"
          align="center"
          className="mb-14 mx-auto"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="border-t border-line pt-6">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    strokeWidth={1.5}
                    className={i < t.rating ? "fill-walnut text-walnut" : "text-line"}
                  />
                ))}
              </div>
              <p className="text-ink leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6">
                <p className="text-sm text-ink">{t.name}</p>
                <p className="text-xs text-muted mt-0.5">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
