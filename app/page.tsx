import Menu from "@/Components/Manu/Menu";
import Footer from "@/Components/Footer/Footer";
import HomeLatestWritings from "@/Components/HomeLatestWritings/HomeLatestWritings";
import PageHero from "@/Components/PageHero/PageHero";
import HomeQuoteBox from "@/Components/HomeQuoteBox/HomeQuoteBox";

import { Tale } from "@/api/Models/Tales";

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

function toHomeCard(item: any, index: number) {
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

async function getHomeCards() {
  // Fetch direttamente dal backend
  const res = await fetch(
    process.env.NEXT_PUBLIC_SITE_URL
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/tales?page=1&limit=100`
      : "http://localhost:3000/api/tales?page=1&limit=100",
    { next: { revalidate: 60 } }
  );
  const payload = await res.json();
  if (!res.ok || payload.error) {
    return [];
  }
  return Array.isArray(payload.data) ? payload.data.map(toHomeCard) : [];
}

export default async function Home() {
  const homeCards = await getHomeCards();
  return (
    <>
      <Menu />
      <PageHero />
      <HomeQuoteBox />
      <HomeLatestWritings homeCards={homeCards} />
      <Footer />
    </>
  );
}
