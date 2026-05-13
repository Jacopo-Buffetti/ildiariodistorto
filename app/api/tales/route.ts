import {NextRequest, NextResponse} from "next/server";
import {getTales} from "@/api/controllers/tales-db";

export async function GET(
    req: NextRequest
): Promise<NextResponse> {
    try {
        const url = new URL(req.url);
        const page = Number(url.searchParams.get("page") ?? 1);
        const limit = Number(url.searchParams.get("limit") ?? 25);
        const tales = await getTales({ page, limit });
        return NextResponse.json(tales);
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}