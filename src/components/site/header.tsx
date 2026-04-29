import Image from "next/image";
import Link from "next/link";

import { site } from "@/lib/site";
import { getAssetManifest } from "@/lib/content";
import { ButtonLink } from "@/components/ui/button-link";

export function Header() {
  const assets = getAssetManifest();

  return (
    <header className="sticky top-0 z-40 border-b border-black/6 bg-[rgba(248,250,252,0.82)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-3">
              <Image src={assets.logo} alt="Resonate Adaptive" width={180} height={40} className="h-10 w-auto" />
            </Link>
            <div className="md:hidden">
              <ButtonLink href={site.joinWaitlistEmailHref} className="px-3 py-2 text-[11px]">
                Join waitlist
              </ButtonLink>
            </div>
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {site.nav.map((item) => (
                <Link key={item.href} href={item.href} className="text-slate-600 transition hover:text-slate-950">
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="hidden md:block">
              <ButtonLink href={site.joinWaitlistEmailHref} className="px-4 py-2.5 text-xs">
                Join waitlist
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
