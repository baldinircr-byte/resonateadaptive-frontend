import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-cyan-400 !text-slate-950 hover:bg-cyan-300 hover:!text-slate-950 visited:!text-slate-950 shadow-[0_12px_30px_rgba(34,211,238,0.24)]",
  ghost:
    "border border-white/18 bg-white/8 !text-white hover:bg-white/14 visited:!text-white",
  light:
    "border border-slate-200 bg-white !text-slate-950 hover:bg-slate-50 visited:!text-slate-950",
  subtle:
    "border border-white/12 bg-transparent !text-white/88 hover:bg-white/8 hover:!text-white visited:!text-white/88",
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
