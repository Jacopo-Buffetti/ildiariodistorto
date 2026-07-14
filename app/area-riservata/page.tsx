import TableWritings from "@/Components/TableWritings/TableWritings";
import { PlusIcon } from "@heroicons/react/24/outline";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Dashboard() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-zinc-800">I MIEI SCRITTI</h1>
        <a
          href="/area-riservata/aggiungi"
          className="
    group
    inline-flex
    items-center
    gap-3
    rounded-2xl
    bg-white
    border
    border-zinc-200
    px-5
    py-3
    text-zinc-800
    font-semibold
    shadow-sm
    hover:shadow-md
    hover:border-sky-300
    transition-all
    duration-200
    active:scale-95
    no-underline
  "
        >
          <div
            className="
      flex
      h-9
      w-9
      items-center
      justify-center
      rounded-xl
      bg-sky-500
      text-white
      transition-all
      duration-300
      group-hover:rotate-90
      group-hover:scale-110
      group-hover:bg-sky-600
    "
          >
            <PlusIcon className="h-5 w-5" />
          </div>

          <span>Nuovo scritto</span>
        </a>{" "}
      </div>
      <TableWritings />
    </section>
  );
}
