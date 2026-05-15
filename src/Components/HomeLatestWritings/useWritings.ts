import { useEffect, useMemo, useState } from "react";

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
  taleId: string;
  imageUrl: string;
  typeText: string;
  titleText: string;
};

const fallbackImages = [
  "/assets/piuma_tavolo.png",
  "/assets/taccuino.png",
  "/assets/candela.png",
];

function truncateText(value: string, maxLength: number = 140) {
  if (value.length <= maxLength) {
    return value;
  }

  let truncated = value.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  if (lastSpaceIndex > 0) {
    truncated = truncated.slice(0, lastSpaceIndex);
  }

  return `${truncated.trim()}...`;
}

function toHomeCard(item: Tale, index: number): HomeCard {
  const imageUrl =
    item.CoverImage?.url || fallbackImages[index % fallbackImages.length];
  const typeText = item.description || "Scritto";
  const titleText = truncateText(item.title?.trim() || "Senza titolo", 44);
  const taleId = item.id ?? item._id ?? `card-${index}`;
  const key = taleId;

  return {
    key,
    taleId,
    imageUrl,
    typeText,
    titleText,
  };
}

export default function useWritings() {
  const [writings, setWritings] = useState<Tale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const res = await fetch("/api/tales?page=1&limit=100", {
          method: "GET",
          credentials: "include",
        });
        const payload = (await res.json()) as TalesResponse;
        if (!res.ok || payload.error) {
          if (isMounted) {
            setWritings([]);
          }
          return;
        }
        if (isMounted) {
          setWritings(Array.isArray(payload.data) ? payload.data : []);
        }
      } catch {
        if (isMounted) {
          setWritings([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      isMounted = false;
    };
  }, []);

  const homeCards = useMemo(() => writings.map(toHomeCard), [writings]);

  return { homeCards, loading };
}
