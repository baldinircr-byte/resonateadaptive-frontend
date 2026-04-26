import { ButtonLink } from "@/components/ui/button-link";
import { getAssetManifest, getPageBySlug } from "@/lib/content";

export function ContentPage({ slug }: { slug: string }) {
  const page = getPageBySlug(slug);
  if (!page) return null;
  const assets = getAssetManifest();
  const image = assets.pages[slug]?.image;

  return (
    <main className="bg-white">
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1fr_0.85fr] md:items-start md:py-20">
        <div>
          <p className="text-sm font-semibold tracking-[0.24em] text-green-700 uppercase">Resonate Adaptive</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">{page.title}</h1>
          <div className="prose-resonate mt-8 max-w-3xl">
            {page.body.split("\n").map((line: string, index: number) => {
              const trimmed = line.trim();
              if (!trimmed) return <div key={index} className="h-3" />;
              if (trimmed.startsWith("### ")) return <h3 key={index}>{trimmed.slice(4)}</h3>;
              if (trimmed.startsWith("## ")) return <h2 key={index}>{trimmed.slice(3)}</h2>;
              if (trimmed.startsWith("# ")) return <h1 key={index}>{trimmed.slice(2)}</h1>;
              if (trimmed.startsWith("- ")) return <p key={index}>• {trimmed.slice(2)}</p>;
              if (trimmed.startsWith("> ")) return <blockquote key={index}>{trimmed.slice(2)}</blockquote>;
              return <p key={index}>{trimmed}</p>;
            })}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/">Back home</ButtonLink>
            <ButtonLink href={page.sourceUrl} variant="secondary">Open live source</ButtonLink>
          </div>
        </div>
        {image ? <img src={image} alt={page.title} className="w-full rounded-3xl object-cover shadow-xl" /> : null}
      </section>
    </main>
  );
}
