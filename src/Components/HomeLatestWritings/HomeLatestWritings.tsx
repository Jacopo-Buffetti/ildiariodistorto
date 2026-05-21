import WritingCard from "./WritingCard";

type HomeCard = {
  key: string;
  taleId: string;
  imageUrl: string;
  typeText: string;
  titleText: string;
};

interface HomeLatestWritingsProps {
  homeCards: HomeCard[];
}

export default function HomeLatestWritings({
  homeCards,
}: HomeLatestWritingsProps) {
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
        {homeCards.length > 0 ? (
          homeCards.map((card) => <WritingCard key={card.key} card={card} />)
        ) : (
          <p className="mt-6 text-center text-sm text-zinc-500 w-full col-span-full">
            Nessuno scritto disponibile.
          </p>
        )}
      </div>
    </section>
  );
}
