import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { getAssetManifest } from "@/lib/content";
import { audiences, availabilityNotes, faqItems, hero, pressLogos, proofPoints, site, steps, testimonials } from "@/lib/site";

export default function HomePage() {
  const assets = getAssetManifest();

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="bg-[radial-gradient(circle_at_top_left,_rgba(103,232,249,0.2),_transparent_28%),linear-gradient(180deg,#07111a_0%,#0d1821_100%)] text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-24 lg:py-30">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200/80">{hero.eyebrow}</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-tight text-balance md:text-7xl">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75 md:text-xl">
              {hero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href={hero.primaryCta.href}>{hero.primaryCta.label}</ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} variant="ghost">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
            <p className="mt-4 text-sm leading-6 text-white/62">
              Resonate 2.0 is currently in development. If you want updates or want to discuss your use case, contact the team now.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {proofPoints.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/6 p-5 backdrop-blur-sm">
                  <p className="text-2xl font-semibold text-cyan-200">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-white/70">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {assets.pages.index?.image ? (
              <Image
                src={assets.pages.index.image}
                alt="Riccardo playing piano with Resonate"
                width={1200}
                height={1500}
                className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
              />
            ) : null}
            <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/10 bg-black/45 p-5 backdrop-blur-md">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Why this matters</p>
              <p className="mt-2 text-sm leading-6 text-white/80">
                For many disabled pianists, the issue is not talent or discipline. It is that the instrument itself becomes inaccessible at the pedal.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/8 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Featured on</p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-slate-700">
              {pressLogos.map((logo) => (
                <span key={logo}>{logo}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="who-its-for" className="mx-auto max-w-7xl px-6 py-18 md:py-24">
        <div className="max-w-3xl">
          <p className="section-label">Who it’s for</p>
          <h2 className="section-title">Built for people who should never have been excluded from the piano in the first place.</h2>
          <p className="section-copy">
            Resonate is not a niche gimmick. It addresses a real access barrier affecting learners, professionals, families, educators, and rehabilitation settings.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {audiences.map((item) => (
            <article key={item.title} className="card h-full">
              <p className="badge">{item.badge}</p>
              <h3 className="mt-4 text-xl font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-100">
        <div className="mx-auto max-w-7xl px-6 py-18 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="section-label">Current status</p>
              <h2 className="section-title">A mission-driven product in active development.</h2>
              <p className="section-copy">
                Resonate 2.0 is being shaped around real feedback from disabled musicians, families, teachers, and therapists. The goal is not just awareness. It is a usable product that restores real musical access.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <article className="card">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Now</p>
                <p className="mt-3 text-base leading-7 text-slate-700">Collecting interest, stories, and signal from the people this could help most.</p>
              </article>
              <article className="card">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Next</p>
                <p className="mt-3 text-base leading-7 text-slate-700">Refining the product direction, validating demand, and building the strongest next version.</p>
              </article>
              <article className="card">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Best action</p>
                <p className="mt-3 text-base leading-7 text-slate-700">Join the waitlist by email and share your situation so the team can understand your needs.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-18 md:grid-cols-[0.95fr_1.05fr] md:items-start md:py-24">
          <div>
            <p className="section-label text-cyan-200/80">How it works</p>
            <h2 className="section-title text-white">A simple flow focused on restoring one critical part of piano technique.</h2>
            <p className="section-copy text-white/72">
              The goal is straightforward: make damper pedal access possible without lower limb function, so the instrument becomes expressive again.
            </p>
            <div className="mt-8 flex gap-4">
              <ButtonLink href={site.joinWaitlistEmailHref}>Join the waitlist</ButtonLink>
              <ButtonLink href={`mailto:${site.contactEmail}`} variant="ghost">
                Contact the team
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-5">
            {steps.map((step, index) => (
              <article key={step.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan-300/15 text-sm font-semibold text-cyan-200">
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/72">{step.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="section-label">The story behind it</p>
            <h2 className="section-title">Resonate started with one musician refusing to accept that paralysis meant the end of full piano expression.</h2>
            <p className="section-copy">
              After a spinal cord injury in 2019, Riccardo lost the ability to use the piano pedals. Resonate was created to recover that lost part of the instrument and turn a personal workaround into something useful for others.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/our-story">Read the full story</ButtonLink>
              <ButtonLink href={site.donateHref} variant="light" target="_blank" rel="noreferrer">
                Support accessibility
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-4 rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <div className="grid gap-4 sm:grid-cols-2">
              {assets.pages["our-story"]?.image ? (
                <Image
                  src={assets.pages["our-story"].image}
                  alt="Riccardo on stage"
                  width={900}
                  height={1200}
                  className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
                />
              ) : null}
              {assets.pages["our-why"]?.image ? (
                <Image
                  src={assets.pages["our-why"].image}
                  alt="Riccardo performing with Resonate"
                  width={900}
                  height={1200}
                  className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
                />
              ) : null}
            </div>
            <div className="rounded-[1.5rem] bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Why it stands out</p>
              <div className="mt-4 space-y-3 text-base leading-7 text-slate-700">
                {availabilityNotes.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-18 md:py-24">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="section-label">Signals of demand</p>
              <h2 className="section-title">The need is already here.</h2>
              <p className="section-copy">
                People are not asking whether this problem exists. They are asking when a real solution will be available.
              </p>
            </div>
            <Link href="/our-why" className="text-sm font-semibold text-cyan-700 transition hover:text-cyan-900">
              See more stories →
            </Link>
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

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-18 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <p className="section-label">Questions people may have</p>
              <h2 className="section-title">The site should answer the basics quickly and clearly.</h2>
              <p className="section-copy">
                Before someone joins a waiting list or reaches out, they need clarity on who this is for, what problem it solves, and what to do next.
              </p>
            </div>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <article key={item.question} className="card">
                  <h3 className="text-lg font-semibold text-slate-950">{item.question}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-700">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-18 md:py-24">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-[linear-gradient(135deg,#0f172a_0%,#164e63_100%)] px-8 py-10 text-white shadow-[0_30px_80px_rgba(8,15,29,0.25)] md:px-12 md:py-14">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Stay close to the project</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Interested in Resonate 2.0 or want to share your story?</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
                Reach out to the team, follow development progress, or explore how this could support you, your student, or your program.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 md:justify-end">
              <ButtonLink href={site.joinWaitlistEmailHref}>Join the waitlist</ButtonLink>
              <ButtonLink href={`mailto:${site.contactEmail}`} variant="ghost">
                Email the team
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
