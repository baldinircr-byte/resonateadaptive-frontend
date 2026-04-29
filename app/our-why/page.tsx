import type { Metadata } from "next";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/button-link";
import { getAssetManifest, getPageBySlug } from "@/lib/content";
import { site, testimonials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our why",
  description:
    "Demand signals, testimonials, and the deeper purpose behind Resonate Adaptive’s accessibility mission.",
};

export default function OurWhyPage() {
  const assets = getAssetManifest();
  const source = getPageBySlug("our-why");

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[0.95fr_1.05fr] md:items-center md:py-24">
        <div>
          <p className="section-label">Our why</p>
          <h1 className="section-title">The product exists because musicians and families keep describing the same barrier.</h1>
          <p className="section-copy">
            The strongest proof is not theoretical. It is the volume and consistency of messages from people who have been improvising around the lack of pedal access for years.
          </p>
          <p className="mt-5 text-base leading-7 text-slate-700">
            Some are students. Some are professional musicians. Some are parents, therapists, or teachers trying to keep a musical path open for someone they care about. The pattern is the same: the need is real, and it has been underserved.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href={`mailto:${site.contactEmail}`}>Send your story</ButtonLink>
            {source?.sourceUrl ? (
              <ButtonLink href={source.sourceUrl} variant="light" target="_blank" rel="noreferrer">
                View original source
              </ButtonLink>
            ) : null}
          </div>
        </div>
        {assets.pages["our-why"]?.image ? (
          <Image
            src={assets.pages["our-why"].image}
            alt="Resonate performance image"
            width={900}
            height={1200}
            className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-[0_25px_70px_rgba(15,23,42,0.18)]"
          />
        ) : null}
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-18 md:py-24">
          <div className="max-w-3xl">
            <p className="section-label">What people are saying</p>
            <h2 className="section-title">These messages point to a market need, but more importantly, a human one.</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {testimonials.map((item) => (
              <blockquote key={item.author} className="card">
                <p className="text-base leading-7 text-slate-700">“{item.quote}”</p>
                <footer className="mt-5 text-sm font-semibold text-slate-950">{item.author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18 md:py-24">
        <div className="rounded-[2rem] bg-slate-950 px-8 py-10 text-white md:px-12 md:py-14">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Why this matters</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
            These are not edge-case anecdotes. They describe a repeated access problem with emotional, educational, and artistic consequences.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-white/75">
            That is what makes Resonate compelling: it answers a precise need that people have been trying to solve on their own for years.
          </p>
        </div>
      </section>
    </main>
  );
}
