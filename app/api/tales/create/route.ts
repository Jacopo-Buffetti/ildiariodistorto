import { NextRequest, NextResponse } from "next/server";
import getLevel from "@/app/api/auth/authByLevel";
import { createTale } from "@/api/controllers/tales-db";
import { CreateTaleSchema } from "@/schemas/tales";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const contentType = req.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        {
          error: "Unsupported content type. Use application/json",
          success: false,
        },
        { status: 415 }
      );
    }

    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Malformed JSON body", success: false },
        { status: 400 }
      );
    }

    const isAuth = await getLevel(req, "admin");
    if (!isAuth) {
      return NextResponse.json(
          { error: "You are not authorised" },
          { status: 401 }
      );
    }

    if (rawBody === null || Array.isArray(rawBody) || typeof rawBody !== "object") {
      return NextResponse.json(
        { error: "Request body must be a JSON object", success: false },
        { status: 400 }
      );
    }

    const body = rawBody as Record<string, unknown>;
    const parsed = CreateTaleSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues, success: false },
        { status: 400 }
      );
    }
    const tale = await createTale(parsed.data);

    if ("error" in tale) {
      return NextResponse.json({ ...tale, success: false }, { status: 500 });
    }
    return NextResponse.json(tale);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
