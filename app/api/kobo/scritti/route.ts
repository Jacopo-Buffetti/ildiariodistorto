import { NextResponse } from "next/server";

import { getKoboWorks } from "@/api/controllers/kobo-db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const library = await getKoboWorks();

    return NextResponse.json(library, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[Kobo] Library error", error);

    return NextResponse.json(
      {
        error: "Library unavailable",
      },
      {
        status: 500,
      }
    );
  }
}
