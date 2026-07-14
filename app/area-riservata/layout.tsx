import {
  ArrowRightStartOnRectangleIcon,
  HomeIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

export default function AreaRiservataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      <aside
        className="
    hidden
    w-64
    shrink-0
    flex-col
    border-r
    border-zinc-200
    bg-gradient-to-b
    from-white
    to-zinc-50
    px-5
    py-8
    shadow-sm
    sm:flex
  "
      >
        <div className="mb-8 px-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Area riservata
          </p>

          <h2 className="mt-2 text-lg font-bold text-zinc-800">
            Gestione scritti
          </h2>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          <a
            href="/area-riservata"
            className="
        group
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-transparent
        px-4
        py-3
        text-sm
        font-semibold
        text-zinc-600
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-sky-200
        hover:bg-sky-50
        hover:text-sky-800
        hover:shadow-sm
        no-underline
      "
          >
            <span
              className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-xl
          bg-zinc-100
          text-zinc-500
          transition-all
          duration-200
          group-hover:bg-sky-500
          group-hover:text-white
          group-hover:shadow-sm
        "
            >
              <HomeIcon className="h-5 w-5" aria-hidden="true" />
            </span>

            <span>Dashboard</span>
          </a>

          <a
            href="/area-riservata/aggiungi"
            className="
        group
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-transparent
        px-4
        py-3
        text-sm
        font-semibold
        text-zinc-600
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-emerald-200
        hover:bg-emerald-50
        hover:text-emerald-800
        hover:shadow-sm
        no-underline
      "
          >
            <span
              className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-xl
          bg-zinc-100
          text-zinc-500
          transition-all
          duration-200
          group-hover:bg-emerald-500
          group-hover:text-white
          group-hover:shadow-sm
        "
            >
              <PlusCircleIcon className="h-5 w-5" aria-hidden="true" />
            </span>

            <span>Aggiungi scritto</span>
          </a>
        </nav>

        <div className="mt-auto border-t border-zinc-200 pt-5">
          <a
            href="/login"
            className="
        group
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-transparent
        px-4
        py-3
        text-sm
        font-semibold
        text-zinc-500
        transition-all
        duration-200
        hover:border-red-200
        hover:bg-red-50
        hover:text-red-700
        no-underline
      "
          >
            <span
              className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-xl
          bg-zinc-100
          text-zinc-400
          transition-all
          duration-200
          group-hover:bg-red-500
          group-hover:text-white
        "
            >
              <ArrowRightStartOnRectangleIcon
                className="h-5 w-5"
                aria-hidden="true"
              />
            </span>

            <span>Esci</span>
          </a>
        </div>
      </aside>
      <main className="flex-1 p-6 sm:p-10">{children}</main>
    </div>
  );
}
