import { createHash } from "node:crypto";

import connectDB from "@/api/lib/connect-db";
import { Tale } from "@/api/Models/Tales";
import { htmlToKoboText } from "@/utils/kobo-text";

type KoboSource = {
  _id: { toString(): string };
  title?: string | null;
  type?: string | null;
  description: string;
  order?: number;
  updatedAt?: Date | string;
};

function singleLine(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function serializeWork(tale: KoboSource) {
  const id = tale._id.toString();

  const title = singleLine(htmlToKoboText(tale.title || "")) || "Senza titolo";

  const category = singleLine(htmlToKoboText(tale.type || "")) || "Scritto";

  const content = htmlToKoboText(tale.description || "");

  const order = tale.order ?? 0;

  const updatedAt = tale.updatedAt
    ? new Date(tale.updatedAt).toISOString()
    : null;

  const checksum = createHash("sha256")
    .update(
      JSON.stringify({
        title,
        category,
        content,
      }),
      "utf8"
    )
    .digest("hex");

  return {
    id,
    title,
    category,
    order,
    updatedAt,
    checksum,
    content,
  };
}

export async function getKoboWorks() {
  await connectDB();

  const tales = await Tale.find({
    published: true,
  })
    .select("_id title type description order updatedAt")
    .sort({
      order: 1,
      _id: 1,
    })
    .lean<KoboSource[]>()
    .exec();

  const works = tales.map((tale) => {
    const work = serializeWork(tale);

    return {
      id: work.id,
      title: work.title,
      category: work.category,
      order: work.order,
      updatedAt: work.updatedAt,
      checksum: work.checksum,
    };
  });

  return {
    version: 1,
    author: "Jacopo Buffetti",
    total: works.length,
    works,
  };
}

export async function getKoboWork(id: string) {
  if (!/^[a-fA-F0-9]{24}$/.test(id)) {
    return null;
  }

  await connectDB();

  const tale = await Tale.findOne({
    _id: id,
    published: true,
  })
    .select("_id title type description order updatedAt")
    .lean<KoboSource>()
    .exec();

  if (!tale) {
    return null;
  }

  return serializeWork(tale);
}
