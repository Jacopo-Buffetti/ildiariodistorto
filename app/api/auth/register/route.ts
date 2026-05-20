import { NextRequest, NextResponse } from "next/server";
import {
  errorResponse,
  internalErrorResponse,
} from "@/app/api/lib/error-response";

import { createUser } from "@/api/controllers/user-db";
import { CreateUserSchema } from "@/schemas/user";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
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

    if (rawBody === null || Array.isArray(rawBody) || typeof rawBody !== "object") {
      return errorResponse(
        400,
        "INVALID_REQUEST_BODY",
        "Request body must be a JSON object"
      );
    }

    const body = rawBody as Record<string, unknown>;
    body.role = "6551f7cc8f006751fc52a52b";
    const parsed = CreateUserSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(400, "VALIDATION_ERROR", "Invalid user payload", {
        issues: parsed.error.issues,
      });
    }
    const user = await createUser(parsed.data);

    if ("error" in user) {
      return errorResponse(500, "RESOURCE_ERROR", "Could not create user", {
        cause: user.error,
      });
    }
    return NextResponse.json(user);
  } catch (err) {
    return internalErrorResponse(err);
  }
}
