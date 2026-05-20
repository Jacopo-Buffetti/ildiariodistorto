import { NextRequest, NextResponse } from "next/server";

import { deleteTale, getTale, updateTale } from "@/api/controllers/tales-db";
import { CreateTaleRequestSchema } from "@/schemas/tales";
import getLevel from "@/app/api/auth/authByLevel";
import {
  errorResponse,
  internalErrorResponse,
} from "@/app/api/lib/error-response";
import { del, put } from "@vercel/blob";

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
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  try {
    const { taleID } = await context.params;
    const contentType = req.headers.get("content-type") ?? "";

    const isAuth = await getLevel(req, "admin");
    if (!isAuth) {
      return errorResponse(401, "UNAUTHORIZED", "You are not authorised");
    }

    const currentTale = await getTale(taleID);
    if ("error" in currentTale) {
      return errorResponse(404, "RESOURCE_ERROR", "Tale not found", {
        cause: currentTale.error,
      });
    }

    let body: Record<string, unknown>;
    let file: File | null = null;
    let fileName = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      const payloadField =
        formData.get("payload") ?? formData.get("data") ?? formData.get("body");

      let rawBody: unknown;
      if (typeof payloadField === "string" && payloadField.trim().length > 0) {
        try {
          rawBody = JSON.parse(payloadField);
        } catch {
          return errorResponse(400, "MALFORMED_JSON", "Malformed JSON body");
        }
      } else {
        rawBody = Object.fromEntries(
          [...formData.entries()]
            .filter(
              ([key]) =>
                ![
                  "file",
                  "fileName",
                  "CoverImage",
                  "payload",
                  "data",
                  "body",
                ].includes(key)
            )
            .map(([key, value]) => [
              key,
              typeof value === "string" ? value : value.name,
            ])
        );
      }

      if (
        rawBody === null ||
        Array.isArray(rawBody) ||
        typeof rawBody !== "object"
      ) {
        return errorResponse(
          400,
          "INVALID_REQUEST_BODY",
          "Request body must be a JSON object"
        );
      }

      body = rawBody as Record<string, unknown>;
      const maybeFile = formData.get("CoverImage");
      file = maybeFile instanceof File ? maybeFile : null;
      const maybeFileName = formData.get("fileName");
      fileName =
        typeof maybeFileName === "string" ? maybeFileName : (file?.name ?? "");
    } else if (contentType.includes("application/json")) {
      let rawBody: unknown;
      try {
        rawBody = await req.json();
      } catch {
        return errorResponse(400, "MALFORMED_JSON", "Malformed JSON body");
      }

      if (
        rawBody === null ||
        Array.isArray(rawBody) ||
        typeof rawBody !== "object"
      ) {
        return errorResponse(
          400,
          "INVALID_REQUEST_BODY",
          "Request body must be a JSON object"
        );
      }

      body = rawBody as Record<string, unknown>;
    } else {
      return errorResponse(
        415,
        "UNSUPPORTED_CONTENT_TYPE",
        "Unsupported content type. Use application/json or multipart/form-data"
      );
    }

    const updatedData: Record<string, unknown> = { ...body };
    if (file) {
      if (!token) {
        return errorResponse(
          500,
          "CONFIGURATION_ERROR",
          "Server misconfiguration: Missing BLOB_READ_WRITE_TOKEN"
        );
      }
      const uploadName = fileName || file.name || `upload-${Date.now()}`;
      const { url } = await put(uploadName, file, {
        access: "public",
        token,
        allowOverwrite: true,
      });

      updatedData.CoverImage = {
        url,
        path: "",
        relativePath: "",
        name: uploadName,
      };
    }

    const parsed = CreateTaleRequestSchema.safeParse(updatedData);
    if (!parsed.success) {
      return errorResponse(400, "VALIDATION_ERROR", "Invalid tale payload", {
        issues: parsed.error.issues,
      });
    }
    const tale = await updateTale(taleID, parsed.data);

    if (currentTale.CoverImage?.name && token) {
      await del(currentTale?.CoverImage?.name, { token });
    }

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
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const { taleID } = await context.params;

    const isAuth = await getLevel(req, "admin");
    if (!isAuth) {
      return errorResponse(401, "UNAUTHORIZED", "You are not authorised");
    }

    const currentTale = await getTale(taleID);
    if ("error" in currentTale) {
      return errorResponse(404, "RESOURCE_ERROR", "Tale not found", {
        cause: currentTale.error,
      });
    }
    if (currentTale.CoverImage?.name && token) {
      await del(currentTale?.CoverImage?.name, { token });
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
