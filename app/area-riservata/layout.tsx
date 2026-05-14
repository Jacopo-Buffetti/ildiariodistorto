export default function AreaRiservataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      <aside className="hidden w-56 flex-col border-r border-zinc-200 bg-white px-4 py-8 sm:flex">
        <nav className="flex flex-col gap-4 text-zinc-700 font-semibold text-sm">
          <a href="/area-riservata" className="hover:text-zinc-900">
            DASHBOARD
          </a>
          <a href="/area-riservata/aggiungi" className="hover:text-zinc-900">
            AGGIUNGI SCRITTO
          </a>
          <a href="/login" className="mt-8 text-zinc-400 hover:text-zinc-700">
            ESCI
          </a>
        </nav>
      </aside>
      <main className="flex-1 p-6 sm:p-10">{children}</main>
    </div>
  );
}
