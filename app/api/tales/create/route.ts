import { NextRequest, NextResponse } from "next/server";
import getLevel from "@/app/api/auth/authByLevel";
import {
  errorResponse,
  internalErrorResponse,
} from "@/app/api/lib/error-response";
import { createTale } from "@/api/controllers/tales-db";
import { CreateTaleSchema } from "@/schemas/tales";
import { put } from "@vercel/blob";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const isAuth = await getLevel(req, "admin");
    if (!isAuth) {
      return errorResponse(401, "UNAUTHORIZED", "You are not authorised");
    }

    const contentType = req.headers.get("content-type") ?? "";
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
                !["file", "fileName", "payload", "data", "body"].includes(key)
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
      const maybeFile = formData.get("file");
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

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return errorResponse(
        500,
        "CONFIGURATION_ERROR",
        "Server misconfiguration: Missing BLOB_READ_WRITE_TOKEN"
      );
    }
    const updatedData: Record<string, unknown> = { ...body };
    if (file) {
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

    const parsed = CreateTaleSchema.safeParse(updatedData);
    if (!parsed.success) {
      return errorResponse(400, "VALIDATION_ERROR", "Invalid tale payload", {
        issues: parsed.error.issues,
      });
    }

    const tale = await createTale(parsed.data);

    if ("error" in tale) {
      return errorResponse(500, "RESOURCE_ERROR", "Could not create tale", {
        cause: tale.error,
      });
    }
    return NextResponse.json(tale);
  } catch (err) {
    return internalErrorResponse(err);
  }
}
