import {
  ArrowRightStartOnRectangleIcon,
  HomeIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function AreaRiservataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-50 flex-col sm:flex-row">
      <header className="sm:hidden w-full border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
          <div>
            <Link href="/" aria-label="Home">
              <Image
                src="/assets/logo_il_diario_distorto.png"
                alt="Il Diario Distorto"
                width={140}
                height={40}
                className="h-auto w-[120px] object-contain"
              />
            </Link>
          </div>

          <details className="relative">
            <summary className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-semibold text-zinc-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5h14a1 1 0 010 2H3a1 1 0 110-2zm0 4h14a1 1 0 010 2H3a1 1 0 110-2zm0 4h14a1 1 0 010 2H3a1 1 0 110-2z"
                  clipRule="evenodd"
                />
              </svg>
              Menu
            </summary>

            <nav className="mt-2 w-64 rounded-md border border-zinc-200 bg-white p-3 shadow-sm">
              <div className="mb-3 px-1">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400">
                  Area riservata
                </p>
                <h3 className="mt-1 text-sm font-bold text-zinc-800">
                  Gestione scritti
                </h3>
              </div>
              <a
                href="/area-riservata"
                className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-zinc-600 hover:bg-sky-50 hover:text-sky-800 no-underline"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-100 text-zinc-500 group-hover:bg-sky-500 group-hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M3 9.5L12 3l9 6.5v8A2.5 2.5 0 0118.5 21h-13A2.5 2.5 0 013 17.5v-8z" />
                  </svg>
                </span>
                <span>Dashboard</span>
              </a>

              <a
                href="/area-riservata/aggiungi"
                className="group mt-2 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-zinc-600 hover:bg-emerald-50 hover:text-emerald-800 no-underline"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-100 text-zinc-500 group-hover:bg-emerald-500 group-hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
                <span>Aggiungi scritto</span>
              </a>

              <div className="mt-3 border-t border-zinc-100 pt-3">
                <a
                  href="/login"
                  className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-zinc-500 hover:bg-red-50 hover:text-red-700 no-underline"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-100 text-zinc-400 group-hover:bg-red-500 group-hover:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M10 17l5-5-5-5M19 12H5" />
                    </svg>
                  </span>
                  <span>Esci</span>
                </a>
              </div>
            </nav>
          </details>
        </div>
      </header>
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
