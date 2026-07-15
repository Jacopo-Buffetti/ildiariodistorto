import Menu from "@/Components/Manu/Menu";
import Footer from "@/Components/Footer/Footer";
import HomeLatestWritings from "@/Components/HomeLatestWritings/HomeLatestWritings";
import PageHero from "@/Components/PageHero/PageHero";
import HomeQuoteBox from "@/Components/HomeQuoteBox/HomeQuoteBox";
import mongoose from "mongoose";
import { getTales } from "@/api/controllers/tales-db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

type HomeTale = {
  id?: string;
  _id?: string | mongoose.Types.ObjectId;
  title?: string | null;
  description?: string;
  CoverImage?: {
    url?: string;
  };
};

function resolveTaleId(
  item: HomeTale,
  index: number
): { taleId: string; key: string } {
  const idFromField = typeof item.id === "string" ? item.id.trim() : "";
  const idFromMongo =
    typeof item._id === "string"
      ? item._id.trim()
      : (item._id?.toString().trim() ?? "");

  const stableId = idFromMongo || idFromField;
  const taleId = stableId || `card-${index}`;

  // Include the index to avoid React key collisions when legacy data has duplicate/empty ids.
  const key = `${taleId}-${index}`;

  return { taleId, key };
}

function toHomeCard(item: HomeTale, index: number) {
  const imageUrl =
    item.CoverImage?.url || fallbackImages[index % fallbackImages.length];
  const typeText = item.description || "Scritto";
  const titleText = truncateText(item.title?.trim() || "Senza titolo", 44);
  const { taleId, key } = resolveTaleId(item, index);
  return {
    key,
    taleId,
    imageUrl,
    typeText,
    titleText,
  };
}

async function getHomeCards() {
  const tales = await getTales({
    page: 1,
    limit: 100,
    sortBy: "order",
    sort: "asc",
  });

  if ("error" in tales) {
    return [];
  }

  return Array.isArray(tales.data) ? tales.data.map(toHomeCard) : [];
}

export default async function IMieiScrittiPage() {
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
