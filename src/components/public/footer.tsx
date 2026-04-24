export function PublicFooter() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-900 py-12 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-3">
        <section>
          <h2 className="text-lg font-bold">Divinerock Engineering Services</h2>
          <p className="mt-3 text-sm text-slate-300">Delivering resilient engineering solutions across infrastructure, energy, and industrial sectors.</p>
        </section>
        <section>
          <h3 className="font-semibold">Office</h3>
          <p className="mt-2 text-sm text-slate-300">123 Industrial Avenue, Houston, TX</p>
          <p className="text-sm text-slate-300">+1 (713) 555-0199</p>
        </section>
        <section>
          <h3 className="font-semibold">Email</h3>
          <p className="mt-2 text-sm text-slate-300">info@divinerockes.com</p>
          <p className="text-sm text-slate-300">© {new Date().getFullYear()} Divinerock ES</p>
        </section>
      </div>
    </footer>
  );
}
