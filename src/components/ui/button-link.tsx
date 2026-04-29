import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-cyan-500 !text-slate-950 hover:bg-cyan-300 hover:!text-slate-950 visited:!text-slate-950 shadow-[0_12px_30px_rgba(6,182,212,0.25)]",
  ghost:
    "border border-white/18 bg-white/8 !text-white hover:bg-white/14 visited:!text-white",
  light:
    "border border-black/10 bg-white !text-slate-950 hover:bg-slate-50 visited:!text-slate-950",
} as const;

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "children" | "className">;

export function ButtonLink({ href, children, className, variant = "primary", ...props }: ButtonLinkProps) {
  const shared = cn(
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold tracking-[0.14em] uppercase transition duration-200",
    variants[variant],
    className,
  );

  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={shared} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={shared} {...props}>
      {children}
    </Link>
  );
}
