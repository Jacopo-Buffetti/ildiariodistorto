import { NextRequest, NextResponse } from "next/server";

import { deleteTale, getTale, updateTale } from "@/api/controllers/tales-db";
import { CreateTaleSchema } from "@/schemas/tales";
import getLevel from "@/app/api/auth/authByLevel";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ taleID: string }> }
): Promise<NextResponse> {
  try {
    const { taleID } = await context.params;
    const recipe = await getTale(taleID);

    return NextResponse.json(recipe);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ taleID: string }> }
): Promise<NextResponse> {
  try {
    const { taleID } = await context.params;
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

    if (
      rawBody === null ||
      Array.isArray(rawBody) ||
      typeof rawBody !== "object"
    ) {
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
    const tale = await updateTale(taleID, parsed.data);

    if ("error" in tale) {
      return NextResponse.json({ ...tale, success: false }, { status: 500 });
    }
    return NextResponse.json(tale);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ taleID: string }> }
): Promise<NextResponse> {
  return PATCH(req, context);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ taleID: string }> }
): Promise<NextResponse> {
  try {
    const { taleID } = await context.params;
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

    if (
      rawBody === null ||
      Array.isArray(rawBody) ||
      typeof rawBody !== "object"
    ) {
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
    const tale = await deleteTale(taleID);

    if ("error" in tale) {
      return NextResponse.json({ ...tale, success: false }, { status: 500 });
    }
    return NextResponse.json(tale);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
