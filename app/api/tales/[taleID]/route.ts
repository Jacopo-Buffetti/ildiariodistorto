import { NextRequest, NextResponse } from "next/server";

import { deleteTale, getTale, updateTale } from "@/api/controllers/tales-db";
import { CreateTaleSchema } from "@/schemas/tales";
import getLevel from "@/app/api/auth/authByLevel";
import {
  errorResponse,
  internalErrorResponse,
} from "@/app/api/lib/error-response";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ taleID: string }> }
): Promise<NextResponse> {
  try {
    const { taleID } = await context.params;
    const tale = await getTale(taleID);

    if ("error" in tale) {
      return errorResponse(404, "RESOURCE_ERROR", "Tale not found", {
        cause: tale.error,
      });
    }

    return NextResponse.json(tale);
  } catch (err) {
    return internalErrorResponse(err);
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
      return errorResponse(
        415,
        "UNSUPPORTED_CONTENT_TYPE",
        "Unsupported content type. Use application/json"
      );
    }

    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      return errorResponse(400, "MALFORMED_JSON", "Malformed JSON body");
    }

    const isAuth = await getLevel(req, "admin");
    if (!isAuth) {
<<<<<<< HEAD
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
=======
      return errorResponse(401, "UNAUTHORIZED", "You are not authorised");
    }

    if (rawBody === null || Array.isArray(rawBody) || typeof rawBody !== "object") {
      return errorResponse(
        400,
        "INVALID_REQUEST_BODY",
        "Request body must be a JSON object"
>>>>>>> origin/uploadImage
      );
    }

    const body = rawBody as Record<string, unknown>;
    const parsed = CreateTaleSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(400, "VALIDATION_ERROR", "Invalid tale payload", {
        issues: parsed.error.issues,
      });
    }
    const tale = await updateTale(taleID, parsed.data);

    if ("error" in tale) {
      return errorResponse(500, "RESOURCE_ERROR", "Could not update tale", {
        cause: tale.error,
      });
    }
    return NextResponse.json(tale);
  } catch (err) {
    return internalErrorResponse(err);
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
<<<<<<< HEAD
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
=======

    const isAuth = await getLevel(req, "admin");
    if (!isAuth) {
      return errorResponse(401, "UNAUTHORIZED", "You are not authorised");
>>>>>>> origin/uploadImage
    }
    const tale = await deleteTale(taleID);

    if ("error" in tale) {
      return errorResponse(500, "RESOURCE_ERROR", "Could not delete tale", {
        cause: tale.error,
      });
    }
    return NextResponse.json(tale);
  } catch (err) {
    return internalErrorResponse(err);
  }
}
