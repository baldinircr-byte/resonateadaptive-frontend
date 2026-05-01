import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { getAssetManifest } from "@/lib/content";
import {
  audiences,
  demandSignals,
  faqItems,
  hero,
  pressLogos,
  proofPoints,
  site,
  solutionPillars,
  statusCards,
  steps,
  testimonials,
  urgencyPoints,
} from "@/lib/site";

export default function HomePage() {
  const assets = getAssetManifest();

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="hero-shell relative overflow-hidden text-white">
        {assets.pages.index?.image ? (
          <Image
            src={assets.pages.index.image}
            alt="Riccardo Baldini playing piano in a wheelchair"
            width={3000}
            height={2250}
            priority
            className="absolute inset-0 h-full w-full object-cover object-[62%_center]"
          />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.82)_0%,rgba(2,6,23,0.56)_38%,rgba(2,6,23,0.2)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.22)_0%,rgba(2,6,23,0.3)_45%,rgba(2,6,23,0.72)_100%)]" />
        <div className="relative mx-auto flex min-h-[88svh] max-w-7xl items-end px-6 py-16 md:min-h-[92svh] md:py-20 xl:py-24">
          <div className="max-w-3xl">
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-balance md:text-7xl md:leading-[0.95]">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
              {hero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href={hero.primaryCta.href}>{hero.primaryCta.label}</ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} variant="ghost">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/64">
              Resonate 2.0 is currently in development. This site is meant to explain the need clearly, show why the concept matters, and make it easy for interested people to raise their hand.
            </p>
            <div className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
              {proofPoints.map((item) => (
                <article key={item.label} className="glass-card">
                  <p className="text-xl font-semibold text-cyan-200 md:text-2xl">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-white/74">{item.label}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white/92">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="eyebrow-dark">Featured on</p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-slate-700">
              {pressLogos.map((logo) => (
                <span key={logo}>{logo}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="problem" className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="section-label">The problem</p>
            <h2 className="section-title">A pianist can keep their skill, taste, and discipline — and still lose access to the full instrument.</h2>
            <p className="section-copy">
              When lower limb function is limited, the damper pedal often becomes inaccessible. That one barrier can cut off phrasing, sustain, and huge sections of the repertoire.
            </p>
          </div>
          <div className="space-y-4">
            {urgencyPoints.map((item) => (
              <article key={item} className="card card-strong">
                <p className="text-base leading-7 text-slate-700">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="solution" className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-[0.94fr_1.06fr] md:items-start md:py-28">
          <div>
            <p className="eyebrow-light">The solution concept</p>
            <h2 className="section-title max-w-[12ch] text-white">An adaptive path back to damper pedal access.</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/74 md:text-lg">
              Resonate is built around a simple idea: if the standard path to the pedal is blocked, create another one. The concept focuses on restoring musical control, not just mechanical novelty.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href={site.joinWaitlistEmailHref}>Join the waitlist</ButtonLink>
              <ButtonLink href={`mailto:${site.contactEmail}`} variant="ghost">
                Contact the team
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-5">
            {solutionPillars.map((item) => (
              <article key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/72">{item.description}</p>
              </article>
            ))}
            <div className="grid gap-4 md:grid-cols-3">
              {steps.map((step, index) => (
                <article key={step.title} className="rounded-[1.5rem] border border-white/10 bg-white/4 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">0{index + 1}</p>
                  <h3 className="mt-3 text-base font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="who-its-for" className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          <p className="section-label">Who it helps</p>
          <h2 className="section-title">This is bigger than one user profile.</h2>
          <p className="section-copy">
            The need shows up in different ways, but the pattern is consistent: people want access to the full instrument, not a compromised version of it.
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

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="section-label">Current status</p>
              <h2 className="section-title">A serious mission in active development.</h2>
              <p className="section-copy">
                Resonate should be understood today as a development-stage project with a strong human case and a growing body of demand. The right next step is to collect signal, sharpen the concept, and keep building around real use cases.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {statusCards.map((item) => (
                <article key={item.label} className="card card-strong">
                  <p className="eyebrow-dark">{item.label}</p>
                  <p className="mt-3 text-base leading-7 text-slate-700">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="section-label">The story behind it</p>
            <h2 className="section-title">Resonate did not start as a brand exercise. It started as a refusal to lose the piano.</h2>
            <p className="section-copy">
              After a spinal cord injury in 2019, Riccardo lost access to the pedals and with them a core part of piano expression. Resonate grew from that precise loss into a broader accessibility mission.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/our-story">Explore the full story</ButtonLink>
              <ButtonLink href={site.donateHref} variant="light" target="_blank" rel="noreferrer">
                Support accessibility
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
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
                  alt="Performance photo connected to Resonate"
                  width={900}
                  height={1200}
                  className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
                />
              ) : null}
            </div>
            <div className="rounded-[1.5rem] bg-slate-50 p-6">
              <p className="eyebrow-dark">Why the story matters</p>
              <p className="mt-3 text-base leading-7 text-slate-700">
                When a concept comes from real lived need, the messaging becomes more honest, the problem definition gets sharper, and the mission becomes easier to trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="section-label">Signals of demand</p>
              <h2 className="section-title">People are already telling the same story from different angles.</h2>
              <p className="section-copy">
                The message is consistent: this is a real access problem, and people have been waiting a long time for a serious solution.
              </p>
            </div>
            <Link href="/our-why" className="text-sm font-semibold text-cyan-700 transition hover:text-cyan-900">
              Read more demand context →
            </Link>
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
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {demandSignals.map((item) => (
              <article key={item} className="rounded-[1.5rem] bg-slate-50 p-5">
                <p className="text-sm leading-7 text-slate-700">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="section-label">Questions and next steps</p>
            <h2 className="section-title">People need clarity before they commit attention.</h2>
            <p className="section-copy">
              A strong accessibility product site should quickly answer the practical questions: who it is for, what stage it is at, and what someone should do if they care.
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
      </section>

      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-[linear-gradient(135deg,#082032_0%,#164e63_100%)] px-8 py-10 text-white shadow-[0_30px_80px_rgba(8,15,29,0.22)] md:px-12 md:py-14">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="eyebrow-light">Get involved</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">If this could help you, your child, your students, or your program, say so now.</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
                The strongest next version of Resonate will come from real stories, real demand, and real contexts of use. Joining the waitlist is the clearest way to be part of that.
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
