import Link from "next/link";
import SketchFrame from "@/Components/SketchFrame/SketchFrame";
import { stripHtml } from "@/utils/html-text";
import { truncate } from "@/Helpers/helpers";

type HomeCard = {
  key: string;
  taleId: string;
  imageUrl: string;
  typeText: string;
  titleText: string;
};

export default function WritingCard({ card }: { card: HomeCard }) {
  return (
    <Link
      href={`/scritto/${card.taleId}`}
      className="block h-full no-underline"
    >
      <SketchFrame className="h-full w-full">
        <article className="flex h-[470px] flex-col overflow-hidden rounded-[12px] bg-white">
          <div className="h-[210px] border-b border-zinc-300 bg-zinc-50">
            <div
              role="img"
              aria-label={card.titleText}
              className="h-full w-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${card.imageUrl})` }}
            />
          </div>

          <div className="flex flex-1 flex-col items-center px-6 py-6 text-center">
            <h3 className="blockquote mt-3 overflow-hidden text-4xl leading-tight text-zinc-900 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
              {card.titleText}
            </h3>
            <div className="mt-3 overflow-hidden text-xl leading-relaxed text-zinc-800 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4]">
              {truncate(stripHtml(card.typeText), 140)}
            </div>
          </div>
        </article>
      </SketchFrame>
    </Link>
  );
}
