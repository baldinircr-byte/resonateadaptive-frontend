import Image from "next/image";
import Link from "next/link";

import { getAssetManifest } from "@/lib/content";
import { site } from "@/lib/site";

export function Footer() {
  const assets = getAssetManifest();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-[1fr_auto_auto] md:items-end">
        <div>
          <Image
            src={assets.logoDark ?? assets.logo}
            alt="Resonate Adaptive"
            width={220}
            height={66}
            className="h-11 w-auto object-contain"
          />
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
            Adaptive technology focused on restoring damper pedal access and protecting the full expressive potential of the piano.
          </p>
        </div>
        <div className="grid gap-2 text-sm text-slate-600">
          <Link href="/our-story" className="transition hover:text-slate-950">Our story</Link>
          <Link href="/our-why" className="transition hover:text-slate-950">Why it matters</Link>
          <a href={site.joinWaitlistEmailHref} className="transition hover:text-slate-950">Join the waitlist</a>
        </div>
        <div className="text-sm text-slate-500 md:text-right">
          <p>© {new Date().getFullYear()} Resonate Adaptive</p>
          <p className="mt-2">For musicians, families, and programs who should not be excluded from the full instrument.</p>
        </div>
      </div>
    </footer>
  );
}
