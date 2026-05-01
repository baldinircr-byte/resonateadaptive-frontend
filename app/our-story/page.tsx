import type { Metadata } from "next";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/button-link";
import { getAssetManifest, getPageBySlug } from "@/lib/content";
import { site, storyPrinciples, storyTimeline } from "@/lib/site";

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
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[0.94fr_1.06fr] md:items-center md:py-24">
        <div>
          <p className="section-label">Our story</p>
          <h1 className="section-title">Resonate began with one musician trying to recover a part of the piano that suddenly became unreachable.</h1>
          <p className="section-copy">
            After a spinal cord injury in 2019, Riccardo could still play — but not with full access to the damper pedal. That missing piece had major musical consequences.
          </p>
          <p className="mt-5 text-base leading-8 text-slate-700">
            Instead of treating that loss as permanent, he began working with mechanical design engineer Steve Bosch to create an adaptive path back to pedal access. Resonate grew from that collaboration: a focused response to a specific barrier with a much wider human relevance.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href={site.joinWaitlistEmailHref}>Join the waitlist</ButtonLink>
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
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="section-label">Timeline</p>
            <h2 className="section-title">The project has a clear origin, a clear problem, and a clear reason to exist.</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {storyTimeline.map((item) => (
              <article key={`${item.year}-${item.title}`} className="card h-full">
                <p className="eyebrow-dark">{item.year}</p>
                <h3 className="mt-4 text-xl font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <article className="rounded-[2rem] bg-slate-950 p-8 text-white md:p-10">
            <p className="eyebrow-light">Why this matters</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">This is not just about getting back on stage.</h2>
            <p className="mt-4 text-base leading-7 text-white/76">
              It is about preserving artistic identity, dignity, ambition, and the right to pursue the full instrument. Losing pedal access is not a minor inconvenience for a pianist. It changes what feels musically possible.
            </p>
          </article>

          <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:p-10">
            <p className="eyebrow-dark">What defines the project</p>
            <div className="mt-5 space-y-4">
              {storyPrinciples.map((item) => (
                <p key={item} className="text-base leading-7 text-slate-700">
                  {item}
                </p>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="rounded-[2rem] bg-[linear-gradient(135deg,#082032_0%,#164e63_100%)] px-8 py-10 text-white md:px-12 md:py-14">
            <p className="eyebrow-light">Support wider access</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
              Accessibility should not become available only to people who can afford every extra layer of adaptation.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/75">
              The grant effort exists because the mission is bigger than product development alone. If you want to help expand access for lower-income users, you can support that work directly.
            </p>
            <div className="mt-8">
              <ButtonLink href={site.donateHref} target="_blank" rel="noreferrer">
                Support the grant effort
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
