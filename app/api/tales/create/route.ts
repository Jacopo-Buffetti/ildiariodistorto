import { NextRequest, NextResponse } from "next/server";

import { createTale } from "@/api/controllers/tales-db";
import { CreateTaleSchema } from "@/schemas/tales";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    console.log(body)
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
