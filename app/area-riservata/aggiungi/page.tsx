export default function AggiungiScritto() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-bold text-zinc-800">
        Aggiungi nuovo scritto
      </h1>
      <form className="space-y-6 max-w-xl">
        <div>
          <label
            htmlFor="tipo"
            className="block text-sm font-medium text-zinc-700"
          >
            Tipo
          </label>
          <select
            id="tipo"
            name="tipo"
            className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-zinc-800 focus:border-zinc-500 focus:outline-none"
          >
            <option>Poesia</option>
            <option>Racconto breve</option>
            <option>Pensiero</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="titolo"
            className="block text-sm font-medium text-zinc-700"
          >
            Titolo
          </label>
          <input
            id="titolo"
            name="titolo"
            type="text"
            className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-zinc-800 focus:border-zinc-500 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="contenuto"
            className="block text-sm font-medium text-zinc-700"
          >
            Contenuto
          </label>
          <textarea
            id="contenuto"
            name="contenuto"
            rows={6}
            className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-zinc-800 focus:border-zinc-500 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="copertina"
            className="block text-sm font-medium text-zinc-700"
          >
            Copertina (facoltativa)
          </label>
          <input
            id="copertina"
            name="copertina"
            type="file"
            className="mt-1 w-full text-sm"
          />
        </div>
        <button
          type="submit"
          className="rounded bg-zinc-800 px-6 py-2 text-white font-semibold hover:bg-zinc-700 transition"
        >
          Pubblica
        </button>
      </form>
    </section>
  );
}
