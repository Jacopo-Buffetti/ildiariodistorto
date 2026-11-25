import { NextRequest, NextResponse } from "next/server";

import { getKoboWork } from "@/api/controllers/kobo-db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    if (!/^[a-fA-F0-9]{24}$/.test(id)) {
      return NextResponse.json(
        {
          error: "Invalid writing ID",
        },
        {
          status: 400,
        }
      );
    }

    const work = await getKoboWork(id);

    if (!work) {
      return NextResponse.json(
        {
          error: "Writing not found",
        },
        {
          status: 404,
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
    }

    return NextResponse.json(work, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[Kobo] Writing error", error);

    return NextResponse.json(
      {
        error: "Writing unavailable",
      },
      {
        status: 500,
      }
    );
  }
}
