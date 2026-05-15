"use client";

import useWritings from "./useWritings";
import WritingCard from "./WritingCard";
import SketchFrame from "@/Components/SketchFrame/SketchFrame";

function WritingCardSkeleton() {
  return (
    <SketchFrame className="h-full w-full">
      <article
        className="flex h-[470px] flex-col overflow-hidden rounded-[12px] bg-white"
        aria-hidden="true"
      >
        <div className="h-[210px] animate-pulse border-b border-zinc-300 bg-zinc-200" />
        <div className="flex flex-1 flex-col items-center px-6 py-6 text-center">
          <div className="mt-3 h-10 w-3/4 animate-pulse rounded bg-zinc-200" />
          <div className="mt-4 h-6 w-5/6 animate-pulse rounded bg-zinc-200" />
          <div className="mt-3 h-6 w-2/3 animate-pulse rounded bg-zinc-200" />
          <div className="mt-3 h-6 w-4/6 animate-pulse rounded bg-zinc-200" />
        </div>
      </article>
    </SketchFrame>
  );
}

export default function HomeLatestWritings() {
  const { homeCards, loading } = useWritings();

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
          I miei scritti
        </h2>
        <div className="mx-auto mt-4 h-[2px] w-20 bg-zinc-400" />
      </header>

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <WritingCardSkeleton key={`loading-${index}`} />
            ))
          : homeCards.map((card) => <WritingCard key={card.key} card={card} />)}
      </div>

      {!loading && homeCards.length === 0 && (
        <p className="mt-6 text-center text-sm text-zinc-500">
          Nessuno scritto disponibile.
        </p>
      )}
    </section>
  );
}
