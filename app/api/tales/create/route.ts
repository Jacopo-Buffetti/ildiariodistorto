import { NextRequest, NextResponse } from "next/server";
import getLevel from "@/app/api/auth/authByLevel";
import { createTale } from "@/api/controllers/tales-db";
import { CreateTaleSchema } from "@/schemas/tales";
import { put } from "@vercel/blob";

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
    const formData = await req.formData();
    const file: Blob | null = formData.get("file") as Blob | null;
    const fileName = formData.get("fileName") || "";

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: "Server misconfiguration: Missing BLOB_READ_WRITE_TOKEN" },
        { status: 500 }
      );
    }

    if (file) {
      const fileBlob = new Blob([file], { type: file.type });
      if (typeof fileName === "string") {
        const { url } = await put(fileName, fileBlob, {
          access: "public",
          token,
          allowOverwrite: true,
        });
        body.CoverImage = {
          url: url,
          path: "",
          relativePath: "",
          name: fileName,
        };
      }
    }

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
