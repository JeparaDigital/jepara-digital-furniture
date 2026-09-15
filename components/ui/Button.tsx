import Link from "next/link";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary: "bg-ink text-bg hover:bg-walnut",
  secondary: "bg-walnut text-bg hover:bg-walnut-dark",
  outline: "border border-ink text-ink hover:bg-ink hover:text-bg",
  ghost: "text-ink hover:text-walnut",
};

const base =
  "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm tracking-tight transition-colors duration-300 ease-out-soft disabled:opacity-40 disabled:pointer-events-none";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button className={cn(base, variantClasses[variant], className)} {...props} />
  );
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  external?: boolean;
}

export function LinkButton({
  href,
  variant = "primary",
  className,
  external,
  children,
  ...props
}: LinkButtonProps) {
  const classes = cn(base, variantClasses[variant], className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
