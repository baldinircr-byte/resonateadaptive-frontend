import type { Metadata } from "next";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/button-link";
import { getAssetManifest } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Waiting list confirmation",
  description:
    "Confirmation page for people who joined the Resonate Adaptive waiting list.",
};

export default function WaitingListConfirmationPage() {
  const assets = getAssetManifest();

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1fr_0.9fr] md:items-center md:py-24">
        <div>
          <p className="section-label">Waiting list</p>
          <h1 className="section-title">You’re on the list.</h1>
          <p className="section-copy">
            Thanks for joining the Resonate waiting list. You should receive an email from <strong>{site.contactEmail}</strong> with confirmation and future updates.
          </p>
          <div className="mt-8 rounded-[1.5rem] border border-black/8 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Next steps</p>
            <ul className="mt-4 space-y-3 text-base leading-7 text-slate-700">
              <li>Check your inbox for the confirmation email.</li>
              <li>If you don’t see it, check spam or promotions.</li>
              <li>If it still doesn’t appear, email the team directly.</li>
            </ul>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href={`mailto:${site.contactEmail}`}>Email the team</ButtonLink>
            <ButtonLink href="/" variant="light">
              Back to homepage
            </ButtonLink>
          </div>
        </div>

        {assets.pages["waiting-list-confirmation"]?.image ? (
          <Image
            src={assets.pages["waiting-list-confirmation"].image}
            alt="Riccardo performing"
            width={1200}
            height={900}
            className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-[0_25px_70px_rgba(15,23,42,0.18)]"
          />
        ) : null}
      </section>
    </main>
  );
}
