import type { Metadata } from "next";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/button-link";
import { getAssetManifest, getPageBySlug } from "@/lib/content";
import { demandSignals, site, testimonials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Why it matters",
  description:
    "Demand signals, testimonials, and the broader reason Resonate Adaptive matters to disabled musicians and music programs.",
};

export default function OurWhyPage() {
  const assets = getAssetManifest();
  const source = getPageBySlug("our-why");

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[0.94fr_1.06fr] md:items-center md:py-24">
        <div>
          <p className="section-label">Why it matters</p>
          <h1 className="section-title">Because the same access problem keeps showing up in different lives, different countries, and different musical contexts.</h1>
          <p className="section-copy">
            The strongest case for Resonate is not abstract inclusivity language. It is the repeated testimony of people who have already run into the pedal barrier and felt its consequences directly.
          </p>
          <p className="mt-5 text-base leading-8 text-slate-700">
            Some are injured musicians trying to return to serious playing. Some are young students and their parents. Some are teachers or therapists trying to keep musical possibility open. Together, they form a clear signal: this is an underserved need.
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
        {assets.pages["our-why"]?.image ? (
          <Image
            src={assets.pages["our-why"].image}
            alt="Performance image connected to Resonate"
            width={900}
            height={1200}
            className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-[0_25px_70px_rgba(15,23,42,0.18)]"
          />
        ) : null}
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="section-label">What demand looks like</p>
              <h2 className="section-title">This is not a one-off story.</h2>
              <p className="section-copy">
                The demand is broad enough to matter commercially and human enough to matter morally.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {demandSignals.map((item) => (
                <article key={item} className="card card-strong">
                  <p className="text-base leading-7 text-slate-700">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          <p className="section-label">Voices from the audience</p>
          <h2 className="section-title">People are not asking whether this problem exists. They are asking when help will exist.</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote key={`${item.author}-${item.role}`} className="card h-full">
              <p className="text-base leading-7 text-slate-700">“{item.quote}”</p>
              <footer className="mt-5">
                <p className="text-sm font-semibold text-slate-950">{item.author}</p>
                <p className="mt-1 text-sm text-slate-500">{item.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="rounded-[2rem] bg-slate-950 px-8 py-10 text-white md:px-12 md:py-14">
            <p className="eyebrow-light">What this means</p>
            <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight md:text-4xl">
              Resonate matters because it addresses a highly specific barrier with outsized emotional, educational, and artistic consequences.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/75">
              That is the opportunity here: a clear problem, a real community, and a meaningful path to restoring access to the instrument rather than asking people to lower their ambitions around it.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
