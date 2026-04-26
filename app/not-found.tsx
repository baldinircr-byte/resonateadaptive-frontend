import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-sm font-semibold tracking-[0.24em] text-green-700 uppercase">Not found</p>
      <h1 className="mt-3 text-4xl font-bold">This page does not exist.</h1>
      <p className="mt-4 text-black/70">The localized rebuild does not have a page for this route.</p>
      <Link href="/" className="mt-8 inline-block font-semibold text-green-700">Go home →</Link>
    </main>
  );
}
