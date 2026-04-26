import Link from "next/link";

import { site } from "@/lib/site";
import { getAssetManifest } from "@/lib/content";

export function Header() {
  const assets = getAssetManifest();

  return (
    <header className="border-b border-white/10 bg-[#0a0a0a] text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <img src={assets.logo} alt="Resonate Adaptive" className="h-10 w-auto" />
        </Link>
        <nav className="hidden gap-6 text-sm md:flex">
          {site.nav.map((item: { href: string; label: string }) => (
            <Link key={item.href} href={item.href} className="text-white/80 transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
