"use client";

import { useMemo, useState, useEffect } from "react";
import WritingCard from "./WritingCard";
import SketchFrame from "@/Components/SketchFrame/SketchFrame";
import Spinner from "@/Components/Spinner/Spinner";

type HomeCard = {
  key: string;
  taleId: string;
  imageUrl: string;
  typeText: string;
  type?: string | null;
  titleText: string;
};

interface HomeLatestWritingsProps {
  homeCards: HomeCard[];
}

export default function HomeLatestWritings({
  homeCards,
}: HomeLatestWritingsProps) {
  const [filterType, setFilterType] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredCards, setFilteredCards] = useState<HomeCard[]>(
    () => homeCards ?? []
  );

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const t = params.get("type");
      if (t) setFilterType(t);
    } catch (e) {
      /* ignore in non-browser env */
    }
  }, []);

  useEffect(() => {
    // Debounced filtering to allow showing a loading spinner
    setLoading(true);
    const handle = setTimeout(() => {
      const q = query.trim().toLowerCase();
      const result = homeCards.filter((card) => {
        if (filterType && filterType !== "") {
          const cardType = (card.type || card.typeText || "").toLowerCase();
          if (cardType !== filterType.toLowerCase()) return false;
        }
        if (q.length >= 3) {
          const title = (card.titleText || "").toLowerCase();
          if (!title.includes(q)) return false;
        }
        return true;
      });
      setFilteredCards(result);
      setLoading(false);
    }, 200);
    return () => clearTimeout(handle);
  }, [homeCards, filterType, query]);

  return (
    <section
      className="px-6 pb-12 pt-10 sm:px-10 sm:pb-16 sm:pt-14"
      aria-labelledby="ultimi-scritti"
    >
      <header className="mb-8 text-center">
        <h2
          id="ultimi-scritti"
          className="blockquote text-4xl font-semibold uppercase tracking-[0.18em] text-zinc-800"
        >
          Grovigli di parole
        </h2>
        <div className="mx-auto mt-4 h-[2px] w-20 bg-zinc-400" />
      </header>

      <div className="mx-auto max-w-[1200px] mb-6">
        <SketchFrame className="h-full w-full">
          <div className="rounded-xl bg-white border border-zinc-200 p-6 shadow-sm">
            <div className="flex justify-center">
              <div className="flex w-full max-w-[760px] items-center gap-6">
                <div className="flex flex-col">
                  <label
                    htmlFor="filter-type"
                    className="mb-2 text-sm text-zinc-600"
                  >
                    Tipo
                  </label>
                  <select
                    id="filter-type"
                    value={filterType}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFilterType(val);
                      try {
                        const u = new URL(window.location.href);
                        if (val) u.searchParams.set("type", val);
                        else u.searchParams.delete("type");
                        history.replaceState(null, "", u.toString());
                      } catch (err) {
                        /* ignore */
                      }
                    }}
                    className="w-[220px] rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700"
                  >
                    <option value="">Tutti i tipi</option>
                    <option value="Pensiero">Pensiero</option>
                    <option value="Poesia">Poesia</option>
                    <option value="Racconto breve">Racconto breve</option>
                  </select>
                </div>

                <div className="flex-1 flex flex-col">
                  <label
                    htmlFor="search-title"
                    className="mb-2 text-sm text-zinc-600"
                  >
                    Titolo
                  </label>
                  <input
                    id="search-title"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cerca titolo (min 3 lettere)"
                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700"
                  />
                </div>
              </div>
            </div>

            <div className="mt-3 text-center text-sm text-zinc-500">
              {query.trim().length > 0 && query.trim().length < 3 ? (
                <span>Digita almeno 3 lettere per avviare la ricerca</span>
              ) : null}
            </div>
          </div>
        </SketchFrame>
      </div>

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-fr">
        {loading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60">
            <Spinner size={48} />
          </div>
        )}
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <WritingCard key={card.key} card={card as any} />
          ))
        ) : (
          <p className="mt-6 text-center text-sm text-zinc-500 w-full col-span-full">
            Nessuno scritto disponibile.
          </p>
        )}
      </div>
    </section>
  );
}
