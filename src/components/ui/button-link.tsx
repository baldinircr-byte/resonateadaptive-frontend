import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-[#16a34a] !text-white hover:bg-[#15803d] hover:!text-white visited:!text-white",
  secondary:
    "border border-white/20 bg-white/5 !text-white hover:bg-white/10 visited:!text-white",
} as const;

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "children" | "className">;

export function ButtonLink({ href, children, className, variant = "primary", ...props }: ButtonLinkProps) {
  const shared = cn(
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold tracking-[0.14em] uppercase transition",
    variants[variant],
    className,
  );

  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return <a href={href} className={shared} {...props}>{children}</a>;
  }

  return <Link href={href} className={shared} {...props}>{children}</Link>;
}
