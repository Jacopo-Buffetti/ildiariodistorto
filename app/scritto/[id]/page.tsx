import { notFound } from "next/navigation";

import Footer from "@/Components/Footer/Footer";
import Menu from "@/Components/Manu/Menu";
import { getTale } from "@/api/controllers/tales-db";
import { stripHtml } from "@/utils/html-text";

type TaleDetail = {
  id?: string;
  _id?: string;
  title?: string;
  description?: string;
  CoverImage?: {
    url?: string;
    path?: string;
    relativePath?: string;
  };
};

const fallbackCoverImage = "/assets/taccuino.png";

function normalizeCoverSource(value?: string): string | null {
  if (!value) {
    return null;
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  if (value.includes("/public/")) {
    const [, fromPublic] = value.split("/public/");
    return fromPublic ? `/${fromPublic.replace(/^\/+/, "")}` : null;
  }

  return value.startsWith("/") ? value : `/${value}`;
}

function resolveCoverImage(tale: TaleDetail): string {
  const cover = tale.CoverImage;
  return (
    normalizeCoverSource(cover?.url) ||
    normalizeCoverSource(cover?.relativePath) ||
    normalizeCoverSource(cover?.path) ||
    fallbackCoverImage
  );
}

function htmlToPlainText(html: string): string {
  return stripHtml(
    html
      .replaceAll(/<\s*br\s*\/?\s*>/gi, "\n")
      .replaceAll(/<\/(p|div|li|h1|h2|h3|h4|h5|h6)>/gi, "\n")
  )
    .replaceAll(/\n{3,}/g, "\n\n")
    .trim();
}

export default async function ScrittoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const taleResponse = await getTale(id);

  if (!taleResponse || "error" in taleResponse) {
    notFound();
  }

  const tale = taleResponse as unknown as TaleDetail;
  const title = (tale.title || "Senza titolo").trim();
  const text = htmlToPlainText(tale.description || "");
  const coverImageUrl = resolveCoverImage(tale);

  return (
    <>
      <Menu />
      <main className="mx-auto w-full max-w-[980px] px-6 pb-14 pt-10 sm:px-10 sm:pt-14">
        <article className="bg-white p-6 sm:p-10">
          <img
            src={coverImageUrl}
            alt={title}
            className="block w-full rounded-[10px] border border-zinc-300 object-cover"
          />

          <h1 className="blockquote mt-8 text-4xl text-zinc-900 sm:text-5xl">
            {title}
          </h1>

          <div className="mt-8 whitespace-pre-line text-lg leading-relaxed text-zinc-800">
            {text || "Contenuto non disponibile."}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
