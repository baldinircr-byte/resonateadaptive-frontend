import type { Metadata } from "next";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/button-link";
import { getAssetManifest, getPageBySlug } from "@/lib/content";
import { site, storyHighlights } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "How Riccardo’s spinal cord injury led to the creation of Resonate Adaptive and a mission to restore full piano access.",
};

export default function OurStoryPage() {
  const assets = getAssetManifest();
  const source = getPageBySlug("our-story");

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[0.95fr_1.05fr] md:items-center md:py-24">
        <div>
          <p className="section-label">Our story</p>
          <h1 className="section-title">Resonate began as a way for Riccardo to get back what injury took from his musicianship.</h1>
          <p className="section-copy">
            After a spinal cord injury in 2019, playing the piano the way he always had became impossible. The problem was specific but devastating: without lower limb function, the damper pedal was gone.
          </p>
          <p className="mt-5 text-base leading-7 text-slate-700">
            Instead of accepting that limitation, Riccardo worked with mechanical design engineer Steve Bosch to create a practical adaptive solution. The result was Resonate: a device built from lived need, not theory.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href={`mailto:${site.contactEmail}`}>Share your story</ButtonLink>
            {source?.sourceUrl ? (
              <ButtonLink href={source.sourceUrl} variant="light" target="_blank" rel="noreferrer">
                View original source
              </ButtonLink>
            ) : null}
          </div>
        </div>
        {assets.pages["our-story"]?.image ? (
          <Image
            src={assets.pages["our-story"].image}
            alt="Riccardo on stage using Resonate"
            width={900}
            height={1200}
            className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-[0_25px_70px_rgba(15,23,42,0.18)]"
          />
        ) : null}
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-18 md:py-24">
          <div className="grid gap-6 md:grid-cols-2">
            {storyHighlights.map((item, index) => (
              <article key={item} className="card flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-sm font-semibold text-cyan-800">
                  0{index + 1}
                </div>
                <p className="pt-1 text-base leading-7 text-slate-700">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <article className="rounded-[2rem] bg-slate-950 p-8 text-white md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Why it matters</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">This is not just about returning to performance.</h2>
            <p className="mt-4 text-base leading-7 text-white/78">
              It is about preserving identity, access, ambition, and joy. For many musicians, losing pedal access means losing repertoire, nuance, and confidence. Resonate exists to push back against that loss.
            </p>
          </article>

          <article className="rounded-[2rem] border border-black/8 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Support the mission</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">Accessibility should not depend on income.</h2>
            <p className="mt-4 text-base leading-7 text-slate-700">
              The team is also creating a grant pathway for people with lower incomes. If you want to help widen access, donations directly support that effort.
            </p>
            <div className="mt-8">
              <ButtonLink href={site.donateHref} target="_blank" rel="noreferrer">
                Donate to the grant effort
              </ButtonLink>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
