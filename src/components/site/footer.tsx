import Link from "next/link";

import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-black/8 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-[1fr_auto_auto] md:items-end">
        <div>
          <p className="text-lg font-semibold text-slate-950">{site.name}</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
            Adaptive technology focused on restoring damper pedal access for disabled pianists.
          </p>
        </div>
        <div className="grid gap-2 text-sm text-slate-600">
          <Link href="/our-story" className="transition hover:text-slate-950">Our story</Link>
          <Link href="/our-why" className="transition hover:text-slate-950">Our why</Link>
          <Link href={site.waitlistHref} className="transition hover:text-slate-950">Waiting list</Link>
        </div>
        <div className="text-sm text-slate-500 md:text-right">
          <p>© {new Date().getFullYear()} Resonate Adaptive</p>
          <p className="mt-2">Adaptive access for the full expressive potential of piano.</p>
        </div>
      </div>
    </footer>
  );
}
