import Link from "next/link";
import SketchFrame from "@/Components/SketchFrame/SketchFrame";
import { stripHtml } from "@/utils/html-text";

type HomeCard = {
  key: string;
  taleId: string;
  imageUrl: string;
  typeText: string;
  titleText: string;
};

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength).trim()}...`;
}

export default function WritingCard({ card }: { card: HomeCard }) {
  return (
    <Link href={`/scritto/${card.taleId}`} className="block no-underline">
      <SketchFrame className="w-full">
        <article className="flex h-full min-h-[430px] flex-col overflow-hidden rounded-[12px] bg-white">
          <div className="h-[210px] border-b border-zinc-300 bg-zinc-50">
            <div
              role="img"
              aria-label={card.titleText}
              className="h-full w-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${card.imageUrl})` }}
            />
          </div>

          <div className="flex flex-1 flex-col items-center px-6 py-6 text-center">
            <h3 className="blockquote mt-3 text-4xl text-zinc-900">
              {card.titleText}
            </h3>
            <div className="text-xl text-zinc-800">
              {truncate(stripHtml(card.typeText), 140)}
            </div>
          </div>
        </article>
      </SketchFrame>
    </Link>
  );
}
