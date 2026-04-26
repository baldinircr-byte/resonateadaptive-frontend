import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { getAssetManifest, getPageBySlug } from "@/lib/content";

export default function HomePage() {
  const home = getPageBySlug("index");
  const assets = getAssetManifest();

  return (
    <main>
      <section className="bg-[#0a0a0a] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-24">
          <div>
            <p className="text-sm font-semibold tracking-[0.24em] text-white/60 uppercase">Adaptive piano technology</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">Unleash the full potential of the piano</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
              Resonate makes it possible for disabled individuals to press the damper pedal without the need for lower limb function.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/our-story">Read our story</ButtonLink>
              <ButtonLink href="/our-why" variant="secondary">Why this matters</ButtonLink>
            </div>
          </div>
          {assets.pages.index?.image ? (
            <img
              src={assets.pages.index.image}
              alt="Resonate Adaptive founder playing piano with the device"
              className="w-full rounded-3xl object-cover shadow-2xl"
            />
          ) : null}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.24em] text-green-700 uppercase">Source capture</p>
            <h2 className="mt-3 text-3xl font-bold">Localized rebuild of the current live site</h2>
            <p className="mt-4 text-lg leading-8 text-black/70">
              This frontend preserves the current Resonate Adaptive public content in local source files and assets so the site can be maintained, iterated on, and deployed without depending on the current WordPress stack.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-zinc-50 p-6">
              <h3 className="text-lg font-semibold">Our Story</h3>
              <p className="mt-3 text-black/70">Founder story, injury context, and why the product exists.</p>
              <Link href="/our-story" className="mt-4 inline-block font-semibold text-green-700">Open page →</Link>
            </div>
            <div className="rounded-2xl border border-black/10 bg-zinc-50 p-6">
              <h3 className="text-lg font-semibold">Our Why</h3>
              <p className="mt-3 text-black/70">Community need, testimonials, and evidence of demand.</p>
              <Link href="/our-why" className="mt-4 inline-block font-semibold text-green-700">Open page →</Link>
            </div>
            <div className="rounded-2xl border border-black/10 bg-zinc-50 p-6">
              <h3 className="text-lg font-semibold">Waiting List</h3>
              <p className="mt-3 text-black/70">Confirmation state for people joining the Resonate 2.0 waiting list.</p>
              <Link href="/waiting-list-confirmation" className="mt-4 inline-block font-semibold text-green-700">Open page →</Link>
            </div>
          </div>
          {home ? (
            <div className="prose-resonate mt-14 max-w-4xl">
              {home.body.split('\n\n').slice(0, 4).map((paragraph: string, index: number) => (
                <p key={index}>{paragraph.replace(/^#+\s*/, "")}</p>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
