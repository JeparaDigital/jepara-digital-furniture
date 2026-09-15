import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <h2 className="font-serif text-3xl md:text-4xl text-ink tracking-tightish text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-muted leading-relaxed">{description}</p>
      )}
    </div>
  );
}
