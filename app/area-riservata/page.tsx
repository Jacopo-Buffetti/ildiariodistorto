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
      <div className="overflow-x-auto rounded border border-zinc-200 bg-white shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-zinc-100">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">TITOLO</th>
              <th className="px-4 py-2 text-left font-semibold">TIPO</th>
              <th className="px-4 py-2 text-left font-semibold">DATA</th>
              <th className="px-4 py-2 text-left font-semibold">AZIONI</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">La notte ascolta</td>
              <td className="px-4 py-2">Poesia</td>
              <td className="px-4 py-2">12/05/2024</td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  className="text-zinc-500 hover:text-zinc-800"
                  title="Modifica"
                >
                  ✏️
                </button>
                <button
                  className="text-zinc-500 hover:text-red-600"
                  title="Elimina"
                >
                  🗑️
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2">Il tempo sospeso</td>
              <td className="px-4 py-2">Racconto breve</td>
              <td className="px-4 py-2">08/05/2024</td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  className="text-zinc-500 hover:text-zinc-800"
                  title="Modifica"
                >
                  ✏️
                </button>
                <button
                  className="text-zinc-500 hover:text-red-600"
                  title="Elimina"
                >
                  🗑️
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2">Diario di un istante</td>
              <td className="px-4 py-2">Pensiero</td>
              <td className="px-4 py-2">01/05/2024</td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  className="text-zinc-500 hover:text-zinc-800"
                  title="Modifica"
                >
                  ✏️
                </button>
                <button
                  className="text-zinc-500 hover:text-red-600"
                  title="Elimina"
                >
                  🗑️
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
