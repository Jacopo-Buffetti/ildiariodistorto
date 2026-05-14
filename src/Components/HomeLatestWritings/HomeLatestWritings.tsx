"use client";

import { useEffect, useState } from "react";

import useWritings from "./useWritings";
import WritingCard from "./WritingCard";

type Tale = {
  id?: string;
  _id?: string;
  title?: string | null;
  description: string;
  CoverImage?: {
    url: string;
    path: string;
    relativePath: string;
    name: string;
    _id?: string;
  };
};

type TalesResponse = {
  data?: Tale[];
  error?: unknown;
};

type HomeCard = {
  key: string;
  imageUrl: string;
  typeText: string;
  titleText: string;
};

const fallbackImages = [
  "/assets/piuma_tavolo.png",
  "/assets/taccuino.png",
  "/assets/candela.png",
];

const fallbackCards: Tale[] = [
  {
    id: "fallback-1",
    title: "La notte ascolta",
    description: "Poesia",
  },
  {
    id: "fallback-2",
    title: "Il tempo sospeso",
    description: "Racconto breve",
  },
  {
    id: "fallback-3",
    title: "Diario di un istante",
    description: "Pensiero",
  },
];

function truncateText(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, maxLength).trim()}...`;
}

function toHomeCard(item: Tale, index: number): HomeCard {
  const imageUrl =
    item.CoverImage?.url || fallbackImages[index % fallbackImages.length];
  const typeText = truncateText(item.description || "Scritto", 28);
  const titleText = truncateText(item.title?.trim() || "Senza titolo", 44);
  const key = item.id ?? item._id ?? `card-${index}`;

  return {
    key,
    imageUrl,
    typeText,
    titleText,
  };
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
        {homeCards.map((card) => (
          <WritingCard key={card.key} card={card} />
        ))}
      </div>

      {loading && (
        <p className="mt-6 text-center text-sm text-zinc-500">
          Caricamento scritti...
        </p>
      )}
    </section>
  );
}
