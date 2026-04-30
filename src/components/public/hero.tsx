import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="rounded-2xl bg-gradient-to-r from-brand-900 to-brand-700 p-10 text-white">
      <p className="text-sm uppercase tracking-[0.2em] text-cyan-100">Engineering excellence</p>
      <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight">Delivering mission-critical engineering solutions from concept to commissioning.</h1>
      <p className="mt-4 max-w-2xl text-base text-cyan-50">Divinerock helps organizations execute capital projects safely, quickly, and sustainably.</p>
      <div className="mt-8 flex gap-4">
        <Link href="/quote" className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-brand-700">Request Quote</Link>
        <Link href="/projects" className="rounded-md border border-white px-4 py-2 text-sm font-semibold">View Projects</Link>
      </div>
    </section>
  );
}
