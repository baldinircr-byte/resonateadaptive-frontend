import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { getAssetManifest } from "@/lib/content";
import { site } from "@/lib/site";

export function Header() {
  const assets = getAssetManifest();

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[rgba(7,18,28,0.72)] text-white backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={assets.logoLight ?? assets.logo}
                alt="Resonate Adaptive"
                width={220}
                height={66}
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>
            <div className="lg:hidden">
              <ButtonLink href={site.joinWaitlistEmailHref} className="px-3 py-2 text-[11px]">
                Join waitlist
              </ButtonLink>
            </div>
          </div>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-6">
            <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/72">
              {site.nav.map((item) => (
                <Link key={item.href} href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="hidden lg:block">
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
