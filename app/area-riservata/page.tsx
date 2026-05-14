import TableWritings from "@/Components/TableWritings/TableWritings";

export default function Dashboard() {
  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-800">I MIEI SCRITTI</h1>
        <a
          href="/area-riservata/aggiungi"
          className="rounded bg-zinc-800 px-4 py-2 text-white font-semibold hover:bg-zinc-700 transition"
        >
          + NUOVO SCRITTO
        </a>
      </div>
      <TableWritings />
    </section>
  );
}
